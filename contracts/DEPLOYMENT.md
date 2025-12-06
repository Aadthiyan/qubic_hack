# Guardian Score Contract Deployment Guide

## Prerequisites

### 1. Install Qubic SDK
```bash
# Clone Qubic core repository
git clone https://github.com/qubic/core.git
cd core

# Follow Qubic SDK installation instructions
# https://github.com/qubic/core
```

### 2. Set Up Development Environment
- C++ compiler (GCC 11+ or Clang 14+)
- Qubic wallet with sufficient QUBIC for deployment
- Access to Qubic testnet or mainnet RPC

## Compilation

### Step 1: Prepare Contract File
```bash
# Copy contract to Qubic contracts directory
cp GuardianScore.cpp /path/to/qubic/core/contracts/

# Navigate to contracts directory
cd /path/to/qubic/core/contracts/
```

### Step 2: Compile Contract
```bash
# Compile using Qubic compiler
qubic-compile GuardianScore.cpp -o GuardianScore.qubic

# Verify compilation
ls -lh GuardianScore.qubic
```

### Step 3: Validate Contract
```bash
# Check contract size (should be reasonable)
qubic-validate GuardianScore.qubic

# Expected output: Contract size, function count, etc.
```

## Deployment to Testnet

### Step 1: Configure Testnet Connection
```bash
# Set testnet RPC endpoint
export QUBIC_RPC_URL="https://testnet-rpc.qubic.org"

# Set deployer wallet
export QUBIC_WALLET_SEED="your-testnet-wallet-seed"
```

### Step 2: Deploy Contract
```bash
# Deploy to testnet
qubic-deploy GuardianScore.qubic \
  --network testnet \
  --wallet $QUBIC_WALLET_SEED \
  --gas-limit 1000000

# Save contract address
export CONTRACT_ADDRESS="<returned-contract-address>"
```

### Step 3: Verify Deployment
```bash
# Query contract state
qubic-query $CONTRACT_ADDRESS getState

# Expected: Contract initialized with owner set
```

## Deployment to Mainnet

### Step 1: Final Testing
Before mainnet deployment, ensure:
- ✅ All testnet tests passed
- ✅ Contract audited (if applicable)
- ✅ Sufficient QUBIC for deployment fees
- ✅ Backup of wallet seed phrase

### Step 2: Configure Mainnet Connection
```bash
# Set mainnet RPC endpoint
export QUBIC_RPC_URL="https://rpc.qubic.org"

# Set deployer wallet (PRODUCTION WALLET)
export QUBIC_WALLET_SEED="your-mainnet-wallet-seed"
```

### Step 3: Deploy to Mainnet
```bash
# Deploy to mainnet
qubic-deploy GuardianScore.qubic \
  --network mainnet \
  --wallet $QUBIC_WALLET_SEED \
  --gas-limit 1000000 \
  --confirm

# Save contract address
export CONTRACT_ADDRESS="<returned-contract-address>"
echo $CONTRACT_ADDRESS > contract-address.txt
```

### Step 4: Initialize Contract
```bash
# Contract is auto-initialized on deployment
# Deployer is set as owner and first authorized scorer
```

## Post-Deployment Configuration

### Add Additional Authorized Scorers
```bash
# Prepare input
cat > add-scorer.json << EOF
{
  "scorerAddress": "<scorer-wallet-address>"
}
EOF

# Call AddAuthorizedScorer
qubic-call $CONTRACT_ADDRESS AddAuthorizedScorer \
  --input add-scorer.json \
  --wallet $QUBIC_WALLET_SEED
```

### Set Initial Scores (Optional)
```bash
# Prepare input
cat > set-score.json << EOF
{
  "projectId": "<project-id>",
  "score": 85,
  "grade": 2
}
EOF

# Call SetGuardianScore
qubic-call $CONTRACT_ADDRESS SetGuardianScore \
  --input set-score.json \
  --wallet $QUBIC_WALLET_SEED
```

## Integration with Backend

### Update Backend Environment Variables
```bash
# Add to backend/.env
GUARDIAN_CONTRACT_ADDRESS=<contract-address>
GUARDIAN_SCORER_WALLET_SEED=<authorized-scorer-seed>
```

### Backend Integration Code
```typescript
// backend/src/services/GuardianContractService.ts
import { qubicRpc } from './QubicRpcService';

export class GuardianContractService {
  private contractAddress = process.env.GUARDIAN_CONTRACT_ADDRESS;
  
  async setScore(projectId: string, score: number, grade: number) {
    const input = {
      projectId,
      score,
      grade
    };
    
    return await qubicRpc.querySmartContract(
      this.contractAddress,
      'SetGuardianScore',
      input
    );
  }
  
  async getScore(projectId: string) {
    const input = { projectId };
    
    return await qubicRpc.querySmartContract(
      this.contractAddress,
      'GetGuardianScore',
      input
    );
  }
}
```

## Verification

### Test Contract Functions

#### 1. Set a Score
```bash
qubic-call $CONTRACT_ADDRESS SetGuardianScore \
  --input '{"projectId":"test-project-1","score":85,"grade":2}' \
  --wallet $QUBIC_WALLET_SEED
```

#### 2. Get a Score
```bash
qubic-query $CONTRACT_ADDRESS GetGuardianScore \
  --input '{"projectId":"test-project-1"}'
```

#### 3. Check Launch Eligibility
```bash
qubic-query $CONTRACT_ADDRESS CanLaunchIDO \
  --input '{"projectId":"test-project-1"}'
```

#### 4. Get Recommended Config
```bash
qubic-query $CONTRACT_ADDRESS GetRecommendedConfig \
  --input '{"projectId":"test-project-1"}'
```

## Monitoring

### Contract State
```bash
# Get current state
qubic-query $CONTRACT_ADDRESS getState

# Monitor events
qubic-events $CONTRACT_ADDRESS --follow
```

### Score Count
```bash
# Query scoreCount from state
qubic-query $CONTRACT_ADDRESS getState | jq '.scoreCount'
```

## Emergency Procedures

### Pause Contract
```bash
# Only owner can pause
qubic-call $CONTRACT_ADDRESS SetPauseState \
  --input '{"paused":true}' \
  --wallet $QUBIC_WALLET_SEED
```

### Resume Contract
```bash
qubic-call $CONTRACT_ADDRESS SetPauseState \
  --input '{"paused":false}' \
  --wallet $QUBIC_WALLET_SEED
```

## Troubleshooting

### Compilation Errors
- Ensure Qubic SDK is up to date
- Check C++ compiler version
- Verify qpi.h is accessible

### Deployment Failures
- Check wallet balance
- Verify RPC endpoint is accessible
- Ensure gas limit is sufficient

### Authorization Errors
- Verify caller is authorized scorer
- Check contract is not paused
- Confirm wallet seed is correct

## Cost Estimates

### Deployment
- **Testnet**: Free (testnet QUBIC)
- **Mainnet**: ~1000-5000 QUBIC (estimate)

### Function Calls
- **SetGuardianScore**: ~100-500 QUBIC per call
- **Read Functions**: Free (queries)

## Security Checklist

Before mainnet deployment:
- [ ] Contract code reviewed
- [ ] All functions tested on testnet
- [ ] Authorization system verified
- [ ] Pause mechanism tested
- [ ] Input validation confirmed
- [ ] Edge cases handled
- [ ] Wallet seed backed up securely
- [ ] Contract address documented
- [ ] Integration tested with backend

## Support

For deployment issues:
- Qubic Discord: https://discord.gg/qubic
- Qubic Documentation: https://docs.qubic.org
- GitHub Issues: https://github.com/qubic/core/issues

---

**Deployment Guide Version**: 1.0.0  
**Last Updated**: December 5, 2025  
**Maintainer**: Nostromo Guardian Team
