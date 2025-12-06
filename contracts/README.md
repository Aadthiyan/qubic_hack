# Guardian Score Smart Contract

## Overview

The Guardian Score smart contract provides on-chain storage and verification of risk scores for projects launching on the Nostromo launchpad. It enables transparent, immutable risk assessment for the Qubic ecosystem.

## Contract Details

- **Language**: C++
- **Network**: Qubic Blockchain
- **Max Projects**: 100
- **Max Authorized Scorers**: 10
- **Score Range**: 0-100

## Data Structures

### GuardianScoreData
Stores the risk assessment for a single project:
- `projectId` (id): Unique project identifier (32 bytes)
- `score` (uint8): Risk score (0-100)
- `grade` (uint8): Risk grade (0=Red, 1=Yellow, 2=Green)
- `timestamp` (uint32): When score was set
- `capMin` (uint16): Minimum recommended cap (in thousands)
- `capMax` (uint16): Maximum recommended cap (in thousands)
- `feeTierBps` (uint16): Fee tier in basis points
- `accessTier` (uint8): Access level (0=accredited, 1=mid-tier, 2=public)
- `isActive` (bool): Whether this score is active

### Grade Enum
```cpp
enum Grade : uint8 {
    RED = 0,      // High risk (score < 60)
    YELLOW = 1,   // Medium risk (score 60-79)
    GREEN = 2     // Low risk (score >= 80)
};
```

## Public Functions

### Write Functions (Require Authorization)

#### SetGuardianScore
Updates or creates a risk score for a project.

**Input**:
- `projectId` (id): Unique project identifier
- `score` (uint8): Risk score (0-100)
- `grade` (uint8): Risk grade (0-2)

**Output**:
- `success` (bool): Whether operation succeeded
- `index` (uint32): Index where score was stored

**Authorization**: Must be authorized scorer  
**Validation**:
- Caller must be authorized
- Contract must not be paused
- Score must be 0-100
- Grade must be 0-2
- Must have capacity for new projects

#### AddAuthorizedScorer
Grants scoring permission to a new address.

**Input**:
- `scorerAddress` (id): Address to authorize

**Output**:
- `success` (bool): Whether operation succeeded

**Authorization**: Only contract owner

#### SetPauseState
Emergency pause/resume mechanism.

**Input**:
- `paused` (bool): True to pause, false to resume

**Output**:
- `success` (bool): Whether operation succeeded
- `newState` (bool): New pause state

**Authorization**: Only contract owner

### Read Functions (Public)

#### GetGuardianScore
Retrieves the risk score for a project.

**Input**:
- `projectId` (id): Project to query

**Output**:
- `found` (bool): Whether project was found
- `score` (uint8): Risk score
- `grade` (uint8): Risk grade
- `timestamp` (uint32): When score was set
- `capMin` (uint16): Minimum recommended cap
- `capMax` (uint16): Maximum recommended cap
- `feeTierBps` (uint16): Recommended fee in basis points
- `accessTier` (uint8): Recommended access level

#### CanLaunchIDO
Checks if project meets minimum score requirements.

**Input**:
- `projectId` (id): Project to check

**Output**:
- `canLaunch` (bool): True if score >= 60
- `score` (uint8): Current score
- `grade` (uint8): Current grade

**Logic**: Projects with score >= 60 (Yellow or Green) can launch

#### GetRecommendedConfig
Returns launch parameters based on risk assessment.

**Input**:
- `projectId` (id): Project to query

**Output**:
- `found` (bool): Whether project was found
- `capMin` (uint16): Recommended minimum cap (in thousands)
- `capMax` (uint16): Recommended maximum cap (in thousands)
- `feeTierBps` (uint16): Recommended fee in basis points
- `accessTier` (uint8): Recommended access level

## Launch Parameters by Grade

### Green (Score 80-100)
- **Cap Range**: 100k - 500k QUBIC
- **Fee**: 2.5% (250 bps)
- **Access**: Public

### Yellow (Score 60-79)
- **Cap Range**: 50k - 200k QUBIC
- **Fee**: 4.0% (400 bps)
- **Access**: Mid-tier

### Red (Score < 60)
- **Cap Range**: 10k - 50k QUBIC
- **Fee**: 6.0% (600 bps)
- **Access**: Accredited only

## Security Features

1. **Authorization System**: Only authorized addresses can set scores
2. **Owner Controls**: Contract owner can add scorers and pause contract
3. **Emergency Pause**: Owner can pause all scoring operations
4. **Input Validation**: All inputs are validated before processing
5. **Bounds Checking**: Score and grade values are validated
6. **Capacity Limits**: Maximum 100 projects, 10 authorized scorers

## Usage Examples

### Setting a Score (Authorized Scorer)
```cpp
SetGuardianScore_input input;
input.projectId = <project_id>;
input.score = 85;
input.grade = GREEN;

// Call contract function
SetGuardianScore_output output = SetGuardianScore(input);

if (output.success) {
    // Score set successfully at index output.index
}
```

### Querying a Score (Anyone)
```cpp
GetGuardianScore_input input;
input.projectId = <project_id>;

GetGuardianScore_output output = GetGuardianScore(input);

if (output.found) {
    // Use output.score, output.grade, etc.
}
```

### Checking Launch Eligibility (Anyone)
```cpp
CanLaunchIDO_input input;
input.projectId = <project_id>;

CanLaunchIDO_output output = CanLaunchIDO(input);

if (output.canLaunch) {
    // Project can launch IDO
}
```

## Deployment

See `DEPLOYMENT.md` for deployment instructions.

## Integration with Backend

The backend API will interact with this contract to:
1. Store Guardian scores on-chain after calculation
2. Verify scores before allowing project launches
3. Retrieve recommended launch parameters
4. Provide transparent, immutable audit trail

## Testing

Before deployment:
1. Compile contract with Qubic SDK
2. Test all functions with various inputs
3. Verify authorization checks
4. Test pause/resume functionality
5. Validate edge cases (max capacity, invalid inputs)

## Limitations

- Maximum 100 projects can be stored
- Maximum 10 authorized scorers
- Scores cannot be deleted, only updated
- Contract owner cannot be changed after deployment

## Future Enhancements

- Add score history tracking
- Implement score expiration
- Add multi-signature authorization
- Support for score appeals
- Integration with DAO governance

---

**Contract Version**: 1.0.0  
**Last Updated**: December 5, 2025  
**Maintainer**: Nostromo Guardian Team
