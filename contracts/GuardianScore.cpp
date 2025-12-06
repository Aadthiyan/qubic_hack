/**
 * Guardian Score Smart Contract
 * 
 * Purpose: Store and manage risk scores for projects launching on Nostromo
 * Network: Qubic Blockchain
 * Language: C++
 * 
 * This contract provides on-chain storage and verification of Guardian risk scores,
 * enabling transparent, immutable risk assessment for the Qubic ecosystem.
 */

#pragma once

#include "qpi.h"

// ============================================================================
// CONSTANTS
// ============================================================================

#define MAX_PROJECTS 100
#define MAX_AUTHORIZED_SCORERS 10
#define MIN_SCORE 0
#define MAX_SCORE 100

// Grade enumeration
enum Grade : uint8 {
    RED = 0,      // High risk (score < 60)
    YELLOW = 1,   // Medium risk (score 60-79)
    GREEN = 2     // Low risk (score >= 80)
};

// ============================================================================
// DATA STRUCTURES
// ============================================================================

/**
 * Guardian Score Data
 * Stores the risk assessment for a single project
 */
struct GuardianScoreData {
    id projectId;           // Unique project identifier (32 bytes)
    uint8 score;            // Risk score (0-100)
    uint8 grade;            // Risk grade (0=Red, 1=Yellow, 2=Green)
    uint32 timestamp;       // When score was set
    uint16 capMin;          // Minimum recommended cap (in thousands)
    uint16 capMax;          // Maximum recommended cap (in thousands)
    uint16 feeTierBps;      // Fee tier in basis points (e.g., 250 = 2.5%)
    uint8 accessTier;       // 0=accredited, 1=mid-tier, 2=public
    bool isActive;          // Whether this score is active
};

/**
 * Contract State
 * Persistent storage for the Guardian Score contract
 */
struct STATE {
    GuardianScoreData scores[MAX_PROJECTS];
    id authorizedScorers[MAX_AUTHORIZED_SCORERS];
    uint32 scoreCount;
    uint32 authorizedScorerCount;
    bool isPaused;
    id contractOwner;
};

#ifdef MOCK_QPI
STATE state;
#endif

// ============================================================================
// INPUT/OUTPUT STRUCTURES
// ============================================================================

/**
 * Input: Set Guardian Score
 * Updates or creates a risk score for a project
 */
struct SetGuardianScore_input {
    id projectId;
    uint8 score;
    uint8 grade;
};

struct SetGuardianScore_output {
    bool success;
    uint32 index;
};

/**
 * Input: Get Guardian Score
 * Retrieves the risk score for a project
 */
struct GetGuardianScore_input {
    id projectId;
};

struct GetGuardianScore_output {
    bool found;
    uint8 score;
    uint8 grade;
    uint32 timestamp;
    uint16 capMin;
    uint16 capMax;
    uint16 feeTierBps;
    uint8 accessTier;
};

/**
 * Input: Can Launch IDO
 * Checks if a project meets minimum score requirements
 */
struct CanLaunchIDO_input {
    id projectId;
};

struct CanLaunchIDO_output {
    bool canLaunch;
    uint8 score;
    uint8 grade;
};

/**
 * Input: Add Authorized Scorer
 * Adds a new address authorized to set scores
 */
struct AddAuthorizedScorer_input {
    id scorerAddress;
};

struct AddAuthorizedScorer_output {
    bool success;
};

/**
 * Input: Pause/Resume Scoring
 * Emergency pause mechanism
 */
struct SetPauseState_input {
    bool paused;
};

struct SetPauseState_output {
    bool success;
    bool newState;
};

/**
 * Input: Get Recommended Config
 * Returns launch parameters based on risk score
 */
struct GetRecommendedConfig_input {
    id projectId;
};

struct GetRecommendedConfig_output {
    bool found;
    uint16 capMin;
    uint16 capMax;
    uint16 feeTierBps;
    uint8 accessTier;
};

// ============================================================================
// CONTRACT IMPLEMENTATION
// ============================================================================

/**
 * Initialize contract state
 * Called once when contract is deployed
 */
INITIALIZE {
    // Set contract owner to deployer
    state.contractOwner = qpi.invocator();
    
    // Initialize counters
    state.scoreCount = 0;
    state.authorizedScorerCount = 1;
    state.isPaused = false;
    
    // Add deployer as first authorized scorer
    state.authorizedScorers[0] = qpi.invocator();
    
    // Initialize all scores as inactive
    for (uint32 i = 0; i < MAX_PROJECTS; i++) {
        state.scores[i].isActive = false;
    }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if caller is authorized to set scores
 */
bool isAuthorizedScorer(const id& caller) {
    for (uint32 i = 0; i < state.authorizedScorerCount; i++) {
        if (state.authorizedScorers[i] == caller) {
            return true;
        }
    }
    return false;
}

/**
 * Find project index by ID
 * Returns MAX_PROJECTS if not found
 */
uint32 findProjectIndex(const id& projectId) {
    for (uint32 i = 0; i < state.scoreCount; i++) {
        if (state.scores[i].projectId == projectId && state.scores[i].isActive) {
            return i;
        }
    }
    return MAX_PROJECTS;
}

/**
 * Calculate launch parameters based on score and grade
 */
void calculateLaunchParams(uint8 score, uint8 grade, uint16& capMin, uint16& capMax, uint16& feeTierBps, uint8& accessTier) {
    if (grade == GREEN) {
        // Green: Safe for launch
        capMin = 100;      // 100k QUBIC
        capMax = 500;      // 500k QUBIC
        feeTierBps = 250;  // 2.5%
        accessTier = 2;    // Public
    } else if (grade == YELLOW) {
        // Yellow: Proceed with caution
        capMin = 50;       // 50k QUBIC
        capMax = 200;      // 200k QUBIC
        feeTierBps = 400;  // 4.0%
        accessTier = 1;    // Mid-tier
    } else {
        // Red: High risk
        capMin = 10;       // 10k QUBIC
        capMax = 50;       // 50k QUBIC
        feeTierBps = 600;  // 6.0%
        accessTier = 0;    // Accredited only
    }
}

/**
 * Validate score is within bounds
 */
bool isValidScore(uint8 score) {
    return score >= MIN_SCORE && score <= MAX_SCORE;
}

/**
 * Validate grade is valid
 */
bool isValidGrade(uint8 grade) {
    return grade <= GREEN;
}

// ============================================================================
// PUBLIC FUNCTIONS (WRITE)
// ============================================================================

/**
 * Set Guardian Score
 * Updates or creates a risk score for a project
 * 
 * @param input.projectId - Unique project identifier
 * @param input.score - Risk score (0-100)
 * @param input.grade - Risk grade (0=Red, 1=Yellow, 2=Green)
 * @return success - Whether operation succeeded
 * @return index - Index where score was stored
 */
PUBLIC_FUNCTION(SetGuardianScore) {
    // Authorization check
    if (!isAuthorizedScorer(qpi.invocator())) {
        output.success = false;
        output.index = 0;
        return;
    }
    
    // Pause check
    if (state.isPaused) {
        output.success = false;
        output.index = 0;
        return;
    }
    
    // Input validation
    if (!isValidScore(input.score) || !isValidGrade(input.grade)) {
        output.success = false;
        output.index = 0;
        return;
    }
    
    // Find existing project or create new
    uint32 index = findProjectIndex(input.projectId);
    
    if (index == MAX_PROJECTS) {
        // New project - check capacity
        if (state.scoreCount >= MAX_PROJECTS) {
            output.success = false;
            output.index = 0;
            return;
        }
        index = state.scoreCount;
        state.scoreCount++;
    }
    
    // Calculate launch parameters
    uint16 capMin, capMax, feeTierBps;
    uint8 accessTier;
    calculateLaunchParams(input.score, input.grade, capMin, capMax, feeTierBps, accessTier);
    
    // Update score data
    state.scores[index].projectId = input.projectId;
    state.scores[index].score = input.score;
    state.scores[index].grade = input.grade;
    state.scores[index].timestamp = qpi.tick();
    state.scores[index].capMin = capMin;
    state.scores[index].capMax = capMax;
    state.scores[index].feeTierBps = feeTierBps;
    state.scores[index].accessTier = accessTier;
    state.scores[index].isActive = true;
    
    output.success = true;
    output.index = index;
}

/**
 * Add Authorized Scorer
 * Grants scoring permission to a new address
 * Only contract owner can call this
 * 
 * @param input.scorerAddress - Address to authorize
 * @return success - Whether operation succeeded
 */
PUBLIC_FUNCTION(AddAuthorizedScorer) {
    // Only owner can add scorers
    if (qpi.invocator() != state.contractOwner) {
        output.success = false;
        return;
    }
    
    // Check capacity
    if (state.authorizedScorerCount >= MAX_AUTHORIZED_SCORERS) {
        output.success = false;
        return;
    }
    
    // Check if already authorized
    if (isAuthorizedScorer(input.scorerAddress)) {
        output.success = false;
        return;
    }
    
    // Add new scorer
    state.authorizedScorers[state.authorizedScorerCount] = input.scorerAddress;
    state.authorizedScorerCount++;
    
    output.success = true;
}

/**
 * Set Pause State
 * Emergency pause/resume mechanism
 * Only contract owner can call this
 * 
 * @param input.paused - True to pause, false to resume
 * @return success - Whether operation succeeded
 * @return newState - New pause state
 */
PUBLIC_FUNCTION(SetPauseState) {
    // Only owner can pause/resume
    if (qpi.invocator() != state.contractOwner) {
        output.success = false;
        output.newState = state.isPaused;
        return;
    }
    
    state.isPaused = input.paused;
    
    output.success = true;
    output.newState = state.isPaused;
}

// ============================================================================
// PUBLIC FUNCTIONS (READ)
// ============================================================================

/**
 * Get Guardian Score
 * Retrieves the risk score for a project
 * 
 * @param input.projectId - Project to query
 * @return found - Whether project was found
 * @return score - Risk score (0-100)
 * @return grade - Risk grade
 * @return timestamp - When score was set
 * @return capMin/capMax - Recommended caps
 * @return feeTierBps - Recommended fee
 * @return accessTier - Recommended access level
 */
PUBLIC_FUNCTION(GetGuardianScore) {
    uint32 index = findProjectIndex(input.projectId);
    
    if (index == MAX_PROJECTS) {
        output.found = false;
        output.score = 0;
        output.grade = 0;
        output.timestamp = 0;
        output.capMin = 0;
        output.capMax = 0;
        output.feeTierBps = 0;
        output.accessTier = 0;
        return;
    }
    
    output.found = true;
    output.score = state.scores[index].score;
    output.grade = state.scores[index].grade;
    output.timestamp = state.scores[index].timestamp;
    output.capMin = state.scores[index].capMin;
    output.capMax = state.scores[index].capMax;
    output.feeTierBps = state.scores[index].feeTierBps;
    output.accessTier = state.scores[index].accessTier;
}

/**
 * Can Launch IDO
 * Checks if project meets minimum score requirements
 * 
 * @param input.projectId - Project to check
 * @return canLaunch - True if score >= 60 (Yellow or Green)
 * @return score - Current score
 * @return grade - Current grade
 */
PUBLIC_FUNCTION(CanLaunchIDO) {
    uint32 index = findProjectIndex(input.projectId);
    
    if (index == MAX_PROJECTS) {
        output.canLaunch = false;
        output.score = 0;
        output.grade = 0;
        return;
    }
    
    output.score = state.scores[index].score;
    output.grade = state.scores[index].grade;
    
    // Can launch if score >= 60 (Yellow or Green)
    output.canLaunch = (output.score >= 60);
}

/**
 * Get Recommended Config
 * Returns launch parameters based on risk assessment
 * 
 * @param input.projectId - Project to query
 * @return found - Whether project was found
 * @return capMin/capMax - Recommended caps (in thousands)
 * @return feeTierBps - Recommended fee in basis points
 * @return accessTier - Recommended access level
 */
PUBLIC_FUNCTION(GetRecommendedConfig) {
    uint32 index = findProjectIndex(input.projectId);
    
    if (index == MAX_PROJECTS) {
        output.found = false;
        output.capMin = 0;
        output.capMax = 0;
        output.feeTierBps = 0;
        output.accessTier = 0;
        return;
    }
    
    output.found = true;
    output.capMin = state.scores[index].capMin;
    output.capMax = state.scores[index].capMax;
    output.feeTierBps = state.scores[index].feeTierBps;
    output.accessTier = state.scores[index].accessTier;
}
