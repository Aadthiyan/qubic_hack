# Guardian Score Contract - Manual Deployment Guide (Windows)

**Date:** December 7, 2025  
**Wallet Seed Status:** ✅ Stored  
**Contract Status:** ✅ Compiled

---

## Current Situation

The bash deployment script (`deploy.sh`) cannot run on Windows PowerShell directly because:
- It requires `qubic-compile` tool (not installed)
- Uses bash-specific commands
- Designed for Linux/Mac environments

**Solution:** Manual deployment using HTTP API calls

---

## Prerequisites Checklist

- [x] Qubic wallet seed: `elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn`
- [x] Compiled contract: `QubicSDK\core\x64\Release\Qubic.efi`
- [ ] Testnet RPC endpoint
- [ ] QUBIC tokens for gas fees
- [ ] Understanding of contract address format

---

## What You Need to Do

### Step 1: Build qubic-cli (Required for Deployment)

The qubic-cli source files are in `Dev\qubic-cli\` but need to be compiled first.

**Option A: Compile qubic-cli with CMake**
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli"

# Create build directory
mkdir build
cd build

# Configure build
cmake ..

# Compile
cmake --build . --config Release

# qubic-cli.exe will be in Release folder
```

**Option B: Use Pre-built Binary**
If you have access to a pre-built `qubic-cli.exe`, place it in:
```
C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli\
```

---

### Step 2: Locate Compiled Contract

Your compiled contract is part of the main Qubic application:

**Location:** 
```
C:\Users\AADHITHAN\Downloads\qubic hack\QubicSDK\core\x64\Release\Qubic.efi
```

**What this file contains:**
- Complete Qubic core application
- Integrated Guardian Score contract
- All smart contracts from Qubic SDK

---

### Step 3: Deploy Contract (Manual Method)

Once you have `qubic-cli` compiled, use these commands:

#### Get Your Identity from Seed
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli"

# Show your public key and identity
.\qubic-cli.exe -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" -showkeys
```

**Expected Output:**
```
Identity:      [your-qubic-address]
Public Key:    [your-public-key]
Private Key:   [your-private-key]
```

#### Check Balance
```powershell
.\qubic-cli.exe `
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" `
  -nodeip "your-testnet-rpc-ip" `
  -nodeport 21841 `
  -getbalance "your-qubic-address"
```

#### Deploy Contract (Using Smart Contract Deployment)
```powershell
$seed = "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn"
$rpcIP = "your-testnet-rpc-ip"
$rpcPort = 21841

.\qubic-cli.exe `
  -seed $seed `
  -nodeip $rpcIP `
  -nodeport $rpcPort `
  -sendcustomtransaction "your-identity" 1 0 0 ""
```

---

## Alternative: Use Online Testnet

### Access Qubic Testnet Portal

1. Visit: https://testnet.qubic.org (or check Qubic Discord for testnet RPC)
2. Connect your wallet (use seed: `elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn`)
3. Deploy contract through web interface
4. Copy resulting contract address

---

## Getting Testnet RPC Endpoint

Check the Qubic Discord for testnet details:
- **Discord:** https://discord.gg/qubic
- **Channel:** #testnet or #node-operators
- **Ask for:** Testnet RPC endpoint (IP and port)

Common testnet endpoint format:
```
IP: [testnet-node-ip]
Port: 21841 (or 21842)
```

---

## Step-by-Step Deployment Process

### Phase 1: Prepare
1. [ ] Get testnet RPC endpoint from Discord/community
2. [ ] Compile qubic-cli (follow Step 1 above)
3. [ ] Verify your wallet seed works
4. [ ] Check balance has QUBIC tokens

### Phase 2: Deploy
1. [ ] Show keys to confirm identity
2. [ ] Check balance
3. [ ] Send deployment transaction
4. [ ] Wait for confirmation (5-10 minutes)

### Phase 3: Verify
1. [ ] Query contract state
2. [ ] Test SetGuardianScore function
3. [ ] Test GetGuardianScore function
4. [ ] Confirm all functions work

---

## What Happens After Deployment

| Step | Time | Action |
|------|------|--------|
| 1 | Immediate | Transaction submitted to mempool |
| 2 | 1-5 min | Validator includes in next tick |
| 3 | 5-10 min | Block finalized on testnet |
| 4 | 10+ min | Contract state accessible |

---

## Testing Your Contract

Once deployed, you can test functions:

### Test 1: Set a Guardian Score
```powershell
$contractAddr = "your-deployed-contract-address"
$projectId = "test-project-123"
$score = 75
$grade = 1  # YELLOW

.\qubic-cli.exe `
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" `
  -nodeip "testnet-ip" `
  -invokecontractprocedure $contractAddr "SetGuardianScore" `
  -input "$projectId,75,1"
```

### Test 2: Get a Guardian Score
```powershell
$contractAddr = "your-deployed-contract-address"
$projectId = "test-project-123"

.\qubic-cli.exe `
  -nodeip "testnet-ip" `
  -callcontractfunction $contractAddr "GetGuardianScore" `
  -input "$projectId"
```

---

## Troubleshooting

### "qubic-cli not found"
**Solution:** Build it or download pre-built binary
```powershell
# Check if compiled
dir "C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli\qubic-cli.exe"
```

### "Connection refused"
**Solution:** Wrong RPC IP/port or network unavailable
```powershell
# Test connection
Test-NetConnection -ComputerName "testnet-rpc-ip" -Port 21841
```

### "Insufficient balance"
**Solution:** Request testnet QUBIC from faucet
- Ask in Discord #testnet channel
- Mention your address from -showkeys output

### "Invalid seed format"
**Solution:** Your seed might have extra characters
- Length must be exactly 55 characters
- Only alphanumeric characters (a-z, 0-9)

---

## Resources

| Resource | Link |
|----------|------|
| **Qubic Discord** | https://discord.gg/qubic |
| **Testnet Info** | Ask in #testnet channel |
| **qubic-cli README** | `Dev\qubic-cli\README.md` |
| **Contract Source** | `contracts\GuardianScore.cpp` |
| **Contract Docs** | `contracts\README.md` |

---

## Next Actions (Priority Order)

1. **Compile qubic-cli**
   ```powershell
   cd "C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli"
   mkdir build; cd build
   cmake ..; cmake --build . --config Release
   ```

2. **Join Qubic Discord and ask for testnet RPC endpoint**
   - Channel: #testnet or #node-operators
   - What to ask: "What is the testnet RPC IP and port?"

3. **Once you have RPC endpoint, run:**
   ```powershell
   .\qubic-cli.exe `
     -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" `
     -nodeip "RPC-IP-HERE" `
     -showkeys
   ```

4. **Deploy the contract** using the commands above

---

## Summary

✅ **Your contract is compiled and ready**  
⏳ **Next:** Build qubic-cli and get testnet RPC endpoint  
🚀 **Then:** Deploy using provided commands  
✔️ **Finally:** Test all functions on testnet

---

**Status:** Ready for deployment (awaiting qubic-cli compilation and testnet RPC)

*Generated: December 7, 2025*
