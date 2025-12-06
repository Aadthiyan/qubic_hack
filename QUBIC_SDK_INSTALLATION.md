# Qubic SDK Installation Guide for Windows

## Overview

This guide will help you install the Qubic SDK for smart contract development on Windows.

## Prerequisites

### System Requirements
- Windows 10 or Windows 11 (64-bit)
- At least 4GB RAM (8GB recommended)
- At least 10GB free disk space
- Internet connection

### Required Software
1. **Visual Studio 2022** (Community Edition is free)
2. **Git for Windows**
3. **C++ Build Tools**

---

## Step 1: Install Visual Studio 2022

### Download Visual Studio
1. Visit: https://visualstudio.microsoft.com/downloads/
2. Download **Visual Studio 2022 Community** (free)

### Install with C++ Workload
1. Run the installer
2. Select **"Desktop development with C++"** workload
3. In the installation details, ensure these are checked:
   - MSVC v143 - VS 2022 C++ x64/x86 build tools
   - Windows 10/11 SDK
   - C++ CMake tools for Windows
   - C++ ATL for latest build tools
4. Click **Install** (this may take 30-60 minutes)

---

## Step 2: Install Git for Windows

### Download Git
1. Visit: https://git-scm.com/download/win
2. Download the 64-bit installer
3. Run the installer with default settings

### Verify Installation
```powershell
git --version
# Should output: git version 2.x.x
```

---

## Step 3: Clone Qubic Core Repository

### Option A: Using Visual Studio

1. Open **Visual Studio 2022**
2. Click **"Clone a repository"**
3. Enter repository URL:
   ```
   https://github.com/qubic/core.git
   ```
4. Choose a local path (e.g., `C:\Dev\qubic-core`)
5. Click **Clone**

### Option B: Using Command Line

```powershell
# Navigate to your development directory
cd C:\Dev

# Clone the repository
git clone https://github.com/qubic/core.git

# Navigate into the directory
cd qubic-core
```

---

## Step 4: Build Qubic Core

### Using Visual Studio

1. Open `Qubic.sln` from the cloned repository
2. Select **Release** configuration (top toolbar)
3. Select **x64** platform
4. Right-click the solution in Solution Explorer
5. Click **Build Solution** (Ctrl+Shift+B)
6. Wait for build to complete (5-10 minutes)

### Verify Build
- Check the Output window for "Build succeeded"
- Compiled binaries will be in `x64\Release\`

---

## Step 5: Install Qubic CLI (Optional)

### Clone Qubic CLI Repository
```powershell
cd C:\Dev
git clone https://github.com/qubic/qubic-cli.git
cd qubic-cli
```

### Build CLI
Follow the build instructions in the repository's README.md

---

## Step 6: Set Up Environment Variables

### Add Qubic to PATH

1. Open **System Properties**:
   - Press `Win + R`
   - Type `sysdm.cpl`
   - Press Enter

2. Click **Environment Variables**

3. Under **User variables**, select **Path**, click **Edit**

4. Click **New** and add:
   ```
   C:\Dev\qubic-core\x64\Release
   ```

5. Click **OK** on all dialogs

### Verify PATH
```powershell
# Restart PowerShell, then:
where qubic
# Should show the path to qubic.exe
```

---

## Step 7: Verify Installation

### Test Compilation
```powershell
# Navigate to qubic-core
cd C:\Dev\qubic-core

# Try to build a test contract
# (Specific commands depend on Qubic SDK version)
```

---

## Alternative: Qubic Core Lite (Recommended for Development)

For easier local testnet setup, use **Qubic Core Lite**:

```powershell
# Clone Core Lite
git clone https://github.com/qubic/core-lite.git
cd core-lite

# Follow build instructions in repository
```

**Benefits**:
- Lighter weight
- Easier local testnet setup
- No VM required
- Faster compilation

---

## Troubleshooting

### Issue: Visual Studio won't open .sln file
**Solution**: Ensure you installed the "Desktop development with C++" workload

### Issue: Build fails with missing headers
**Solution**: 
1. Update Visual Studio to latest version
2. Ensure Windows SDK is installed
3. Check that all C++ components are installed

### Issue: Git clone fails
**Solution**:
1. Check internet connection
2. Try using HTTPS instead of SSH
3. Disable antivirus temporarily

### Issue: PATH not working
**Solution**:
1. Restart PowerShell/Command Prompt
2. Restart computer
3. Verify PATH was added correctly

---

## Next Steps

After installation:

1. **Compile Guardian Score Contract**:
   ```powershell
   cd "C:\Users\AADHITHAN\Downloads\qubic hack\contracts"
   # Use Qubic compiler to compile GuardianScore.cpp
   ```

2. **Test on Local Testnet**:
   - Set up local Qubic node
   - Deploy contract locally
   - Test all functions

3. **Deploy to Testnet**:
   - Follow deployment guide in `contracts/DEPLOYMENT.md`
   - Use testnet RPC endpoint

---

## Resources

- **Qubic Documentation**: https://docs.qubic.org
- **Qubic GitHub**: https://github.com/qubic
- **Qubic Discord**: https://discord.gg/qubic
- **Developer Guide**: https://qubic.org/developers

---

## Quick Reference

### Common Commands
```powershell
# Clone repository
git clone https://github.com/qubic/core.git

# Build in Visual Studio
# Open Qubic.sln → Build → Build Solution

# Update repository
git pull origin main

# Check build output
dir x64\Release
```

### Important Paths
- Qubic Core: `C:\Dev\qubic-core`
- Build Output: `C:\Dev\qubic-core\x64\Release`
- Contracts: `C:\Users\AADHITHAN\Downloads\qubic hack\contracts`

---

**Installation Guide Version**: 1.0.0  
**Last Updated**: December 5, 2025  
**Platform**: Windows 10/11
