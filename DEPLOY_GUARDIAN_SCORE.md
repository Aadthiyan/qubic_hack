# 🚀 Guardian Score Contract Deployment Guide

**Status:** ✅ **READY TO DEPLOY - 15 BILLION TOKENS RECEIVED!**

---

## 💰 Your Current Status

```
Wallet:       NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF
Balance:      15,000,000,000 QUBIC (15 Billion!)
Incoming:     1 transfer of 15 billion tokens
Network:      Testnet (Tick: 38658596)
Status:       ✅ READY
```

---

## 📋 Guardian Score Contract Overview

**File:** `contracts\GuardianScore.cpp`

**What it does:**
- Provides risk scoring (0-100) for projects on Qubic
- Maintains authorized scorers list
- Stores scores with metadata (cap, fee tier, access tier)
- Can be paused/resumed by authorized users

**Key Functions:**
- `SetGuardianScore()` - Set risk score for a project
- `GetGuardianScore()` - Query project risk score
- `AddAuthorizedScorer()` - Add authority to update scores
- `SetPauseState()` - Pause/resume contract

---

## 🎯 Deployment Options

### Option 1: Deploy via Docker (Recommended - You're Already Using It!)

You're already running in a Docker container with qubic-cli. Continue there:

```bash
# Already in docker container, just run:
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" \
  -sendtoaddress "NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF" 1000000
```

### Option 2: Windows PowerShell (Direct)

From Windows, if you want to deploy from your built qubic-cli:

```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli\build\Release"

.\qubic-cli.exe `
  -nodeip "194.247.186.149" `
  -nodeport 31841 `
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" `
  -sendtoaddress "NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF" 1000000
```

---

## 🔧 Contract Deployment Steps

### Step 1: Compile Contract (Already Done ✅)

Guardian Score is already compiled in:
```
QubicSDK\core\x64\Release\Qubic.efi (584 KB)
```

### Step 2: Get Current Network Info

```bash
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 -getcurrenttick
```

**Current State:**
- Tick: 38658596
- Epoch: 190
- Status: ✅ Running

### Step 3: Deploy Contract

The contract is deployed via a transaction. You have 3 deployment methods:

#### Method A: Simple Transaction (Easiest)
```bash
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" \
  -sendtoaddress "NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF" 1000000
```

#### Method B: Smart Contract Deploy
```bash
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" \
  -deploysmartcontract GuardianScore
```

#### Method C: Direct Deployment from Binary
```bash
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" \
  -sendcustomtransaction "QUBIC_SMART_CONTRACT_ADDRESS" 1000000
```

### Step 4: Monitor Deployment

```bash
# Check if transaction was accepted
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -getbalance "NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF"

# Get current tick (transaction included in next tick)
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 -getcurrenttick
```

### Step 5: Verify Deployment

Once deployment tick is confirmed:

```bash
# Query contract state
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -getcontractstate "GUARDIAN_SCORE_CONTRACT_ID"

# Check contract functions
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -callcontract "GUARDIAN_SCORE_CONTRACT_ID" "GetGuardianScore" "project_id"
```

---

## 📊 Guardian Score Contract Structure

### Main Struct: GuardianScoreData
```cpp
struct GuardianScoreData {
    uint32 projectId;              // Project identifier
    uint32 score;                  // Risk score (0-100)
    char grade[10];                // Risk grade (RED/YELLOW/GREEN)
    uint64 timestamp;              // Score timestamp
    uint32 capMin;                 // Minimum capacity
    uint32 capMax;                 // Maximum capacity
    uint16 feeTierBps;            // Fee tier in basis points
    uint8 accessTier;              // Access tier level
    bool isActive;                 // Active status
};
```

### Main Functions
- **SetGuardianScore**: Set risk score with metadata
- **GetGuardianScore**: Query existing score
- **AddAuthorizedScorer**: Add authorized user
- **SetPauseState**: Pause/resume contract
- **GetAuthorizedScorers**: List authorized users

---

## ✅ Deployment Checklist

- [x] Wallet created
- [x] 15 billion tokens received
- [x] Network online and confirmed
- [x] Contract compiled
- [x] qubic-cli ready
- [ ] Deploy transaction sent
- [ ] Transaction confirmed in next tick
- [ ] Contract verified on network
- [ ] Test contract functions

---

## 🎬 Next Steps

**You're in Docker, so run this in your container:**

```bash
# Step 1: Verify balance one more time
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" \
  -getbalance NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF

# Step 2: Deploy contract
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" \
  -sendtoaddress "NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF" 1000000

# Step 3: Check current tick
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 -getcurrenttick

# Step 4: Verify deployment
./qubic-cli -nodeip 194.247.186.149 -nodeport 31841 \
  -seed "elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn" \
  -getbalance NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF
```

---

## 🔐 Your Credentials (Secure)

```
Seed:     elemklghkpnefweoumuupcdnmuhxauoggvbcqdutzqvnerleuevfisn
Identity: NJIAUTDLSXTPBRYGNJAAPDWEQEALRWTUHNOYVATEDVDDHKXFWPMVNPDMYIF
Balance:  15,000,000,000 QUBIC
RPC:      194.247.186.149:31841
```

---

## 📞 Support

If deployment fails:
1. Check balance hasn't changed
2. Verify network tick is progressing
3. Check transaction fee (1000000 should be plenty)
4. Try again in next tick
5. Contact Qubic Discord for support

---

**Status:** 🟢 **READY TO DEPLOY - EXECUTE COMMANDS ABOVE!**

*You have 15 billion tokens. Deploy now! 🚀*
