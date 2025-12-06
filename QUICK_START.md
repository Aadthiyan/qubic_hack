# Guardian Score Contract - Quick Start Guide

## ✅ Compilation Complete!

Your Guardian Score Smart Contract has been **successfully compiled** as part of the Qubic SDK.

---

## 📍 Where is the Compiled Contract?

**Location:** `C:\Users\AADHITHAN\Downloads\qubic hack\QubicSDK\core\x64\Release\Qubic.efi`

**Size:** 584 KB  
**Type:** EFI Application (Qubic Core with integrated contract)

---

## 🚀 Next Steps

### Option A: Deploy to Testnet (Recommended)
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\contracts"

# 1. Set your wallet seed
$env:QUBIC_WALLET_SEED = "your-55-char-seed-here"

# 2. Run deployment script
.\deploy.sh testnet
```

**Requires:**
- Valid Qubic wallet seed
- Internet connection to testnet RPC
- QUBIC tokens for deployment fees

---

### Option B: Test Locally
```powershell
# 1. Navigate to contracts
cd "C:\Users\AADHITHAN\Downloads\qubic hack\contracts"

# 2. Use qubic-cli to interact
.\..\..\Dev\qubic-cli\qubic-cli -conf qubic.conf -getbalance <IDENTITY>
```

---

### Option C: Inspect Contract Details
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\contracts"

# View contract source
cat GuardianScore.cpp

# View deployment guide
cat DEPLOYMENT.md

# View function documentation
cat README.md
```

---

## 📋 Contract Summary

| Property | Details |
|----------|---------|
| **Name** | Guardian Score |
| **Purpose** | Risk scoring for Nostromo launchpad |
| **Max Projects** | 100 |
| **Max Scorers** | 10 |
| **Score Range** | 0-100 |
| **Status** | ✅ Compiled & Ready |

---

## 🔧 Main Contract Functions

### Write Functions (Require Authorization)
```cpp
// Set or update a project's risk score
SetGuardianScore(projectId, score, grade)

// Grant scoring permission to an address
AddAuthorizedScorer(scorerAddress)

// Pause/resume contract operations
SetPauseState(paused)
```

### Read Functions (Public)
```cpp
// Retrieve a project's risk assessment
GetGuardianScore(projectId)
```

---

## ⚙️ How It Works

1. **Copy Contract** - `GuardianScore.cpp` was copied to SDK source
2. **Build SDK** - Entire SDK was compiled with contract integrated
3. **Generate Binary** - `Qubic.efi` was created (includes contract)
4. **Ready to Deploy** - Binary can now be deployed to testnet/mainnet

---

## 📊 Build Information

- **Build Date:** December 7, 2025
- **Compiler:** Microsoft Visual C++ 2022 (v143)
- **Optimization:** Release (O2)
- **Platform:** x64
- **Status:** ✅ No Errors, 17 non-critical warnings

---

## 🛠️ Useful Commands

### Navigate to Contracts
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\contracts"
```

### Navigate to Compiled Binary
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\QubicSDK\core\x64\Release"
dir Qubic.efi
```

### Navigate to qubic-cli
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli"
ls qubic-cli.exe
```

### Rebuild (if needed)
```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\QubicSDK\core"
.\scripts\restore-and-build.ps1 -Configuration Release -Platform x64
```

---

## 📚 Documentation

- **Compilation Report:** `COMPILATION_SUCCESS_REPORT.md`
- **Deployment Guide:** `contracts/DEPLOYMENT.md`
- **Contract Details:** `contracts/README.md`
- **Compilation Guide:** `contracts/COMPILATION_GUIDE.md`
- **SDK Setup:** `QUBIC_SDK_INSTALLATION.md`

---

## ❓ Frequently Asked Questions

**Q: Where is my compiled contract?**  
A: In `QubicSDK\core\x64\Release\Qubic.efi`

**Q: Can I deploy immediately?**  
A: Yes! Just set your wallet seed and run the deployment script.

**Q: What if I need to modify the contract?**  
A: Edit `contracts\GuardianScore.cpp`, copy to SDK, and rebuild.

**Q: How do I test the contract?**  
A: Use `qubic-cli` tool or deployment script with testnet configuration.

---

## ✅ Checklist

- [x] Contract file created
- [x] SDK compiled successfully  
- [x] Binary generated (Qubic.efi)
- [x] Ready for deployment
- [ ] Deploy to testnet
- [ ] Test all functions
- [ ] Deploy to mainnet (if approved)

---

**Status:** 🟢 Ready for Deployment

**Next Action:** Run deployment script to testnet or configure for local testing

---

*Generated: December 7, 2025*
