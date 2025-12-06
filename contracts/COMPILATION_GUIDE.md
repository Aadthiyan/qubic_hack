# Guardian Score Contract - Compilation Guide for Windows

## Current Status
The Guardian Score Contract is a Qubic smart contract written in C++ that requires the Qubic SDK to compile.

## Compilation Methods

### Method 1: Using Qubic SDK Build System (Recommended)

The proper way to compile Qubic smart contracts is to integrate them into the SDK's source tree.

#### Steps:

1. **Copy contract to SDK source tree:**
```powershell
# Copy the contract file to Qubic SDK source directory
Copy-Item "C:\Users\AADHITHAN\Downloads\qubic hack\contracts\GuardianScore.cpp" `
    "C:\Dev\qubic-core\src\GuardianScore.cpp"
```

2. **Build SDK with contract:**
```powershell
# Navigate to SDK directory
cd "C:\Dev\qubic-core"

# Run the build script
.\scripts\restore-and-build.ps1
```

The build system will compile the contract as part of the core build process.

### Method 2: Using Direct Qubic Compiler (If Available)

If you have the `qubic-compile` tool installed:

```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\contracts"
qubic-compile GuardianScore.cpp -o GuardianScore.qubic
```

**Note:** `qubic-compile` is typically included with the Qubic SDK after installation. If the command is not found, you need to add the SDK binary path to your system PATH.

### Method 3: Using qubic-cli (If Compiled)

The `qubic-cli` can also be used to interact with contracts once compiled:

```powershell
cd "C:\Users\AADHITHAN\Downloads\qubic hack\Dev\qubic-cli"
# Use qubic-cli to deploy the compiled contract
./qubic-cli -conf qubic.conf -invokecontractprocedure <CONTRACT_INDEX> <FUNCTION_NAME>
```

---

## Contract Details

**File:** `GuardianScore.cpp`  
**Purpose:** Store and manage risk scores for projects on Nostromo launchpad  
**Network:** Qubic Blockchain  
**Language:** C++ with Qubic SDK (qpi.h)  
**Size:** ~13KB

### Key Components:
- **MAX_PROJECTS:** 100
- **MAX_AUTHORIZED_SCORERS:** 10
- **Score Range:** 0-100

### Main Functions:
- `SetGuardianScore()` - Update/create risk score
- `GetGuardianScore()` - Retrieve risk score
- `AddAuthorizedScorer()` - Grant scoring permission
- `SetPauseState()` - Emergency pause mechanism

---

## What's Needed to Compile

1. ✅ Qubic SDK installed (`C:\Dev\qubic-core`)
2. ✅ Visual Studio 2022 with C++ workload
3. ✅ MSBuild (comes with Visual Studio)
4. ⚠️  `qubic-compile` tool (may need to be built or added to PATH)

---

## Next Steps

### Option A: Quick Test (No Full Compilation)
1. Check your Qubic SDK installation
2. Verify you have the compiler tools
3. Use the qubic-cli to test contract interaction

### Option B: Full SDK Build
1. Copy `GuardianScore.cpp` to SDK source
2. Modify SDK CMakeLists.txt or project files to include contract
3. Run `restore-and-build.ps1` script
4. Verify compilation in `x64\Release\`

### Option C: Deploy to Testnet
1. Get compiled contract binary
2. Set up wallet seed
3. Use deployment script to deploy to testnet

---

## Troubleshooting

### Error: "qubic-compile not found"
- **Solution:** `qubic-compile` is not in your PATH
- **Fix:** Add SDK binary directory to PATH or use full path
- **Alternative:** Use SDK build system instead

### Error: "qpi.h not found"
- **Solution:** Compiler can't find Qubic SDK headers
- **Fix:** Ensure SDK is properly installed and include paths are set

### Compilation fails on Windows
- **Cause:** Missing Visual Studio components
- **Solution:** 
  1. Open Visual Studio Installer
  2. Modify installation
  3. Add "C++ CMake tools for Windows"
  4. Rebuild

---

## Recommended Workflow

For Windows development:

```powershell
# 1. Prepare SDK
cd "C:\Dev\qubic-core"

# 2. Copy your contract
Copy-Item "..\..\contracts\GuardianScore.cpp" ".\src\"

# 3. Build SDK (includes contract)
.\scripts\restore-and-build.ps1

# 4. Check output
dir ".\x64\Release\GuardianScore.*"

# 5. If successful, deploy using qubic-cli
cd "..\..\contracts"
./deploy.sh testnet
```

---

## Resources

- Qubic GitHub: https://github.com/qubic
- Qubic Docs: https://docs.qubic.org
- Qubic Discord: https://discord.gg/qubic

---

**Last Updated:** December 7, 2025  
**Status:** Awaiting SDK compiler tools
