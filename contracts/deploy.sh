#!/bin/bash

###############################################################################
# Guardian Score Contract Deployment Script
# 
# This script automates the deployment of the Guardian Score smart contract
# to Qubic testnet or mainnet.
#
# Usage:
#   ./deploy.sh testnet   # Deploy to testnet
#   ./deploy.sh mainnet   # Deploy to mainnet
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
CONTRACT_FILE="GuardianScore.cpp"
COMPILED_FILE="GuardianScore.qubic"

# Functions
print_header() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}========================================${NC}"
}

print_info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check if qubic-compile exists
    if ! command -v qubic-compile &> /dev/null; then
        print_error "qubic-compile not found. Please install Qubic SDK."
        exit 1
    fi
    print_info "✅ Qubic SDK found"
    
    # Check if contract file exists
    if [ ! -f "$CONTRACT_FILE" ]; then
        print_error "Contract file $CONTRACT_FILE not found"
        exit 1
    fi
    print_info "✅ Contract file found"
    
    # Check environment variables
    if [ -z "$QUBIC_WALLET_SEED" ]; then
        print_error "QUBIC_WALLET_SEED not set"
        exit 1
    fi
    print_info "✅ Wallet seed configured"
}

compile_contract() {
    print_header "Compiling Contract"
    
    print_info "Compiling $CONTRACT_FILE..."
    qubic-compile $CONTRACT_FILE -o $COMPILED_FILE
    
    if [ ! -f "$COMPILED_FILE" ]; then
        print_error "Compilation failed"
        exit 1
    fi
    
    print_info "✅ Contract compiled successfully"
    
    # Show contract size
    SIZE=$(ls -lh $COMPILED_FILE | awk '{print $5}')
    print_info "Contract size: $SIZE"
}

validate_contract() {
    print_header "Validating Contract"
    
    print_info "Running validation..."
    qubic-validate $COMPILED_FILE
    
    print_info "✅ Contract validation passed"
}

deploy_to_testnet() {
    print_header "Deploying to Testnet"
    
    export QUBIC_RPC_URL="https://testnet-rpc.qubicdev.com"
    
    print_info "Network: Testnet"
    print_info "RPC: $QUBIC_RPC_URL"
    
    print_warning "Deploying contract..."
    
    # Deploy contract
    CONTRACT_ADDRESS=$(qubic-deploy $COMPILED_FILE \
        --network testnet \
        --wallet $QUBIC_WALLET_SEED \
        --gas-limit 1000000 \
        --output json | jq -r '.contractAddress')
    
    if [ -z "$CONTRACT_ADDRESS" ]; then
        print_error "Deployment failed"
        exit 1
    fi
    
    print_info "✅ Contract deployed successfully"
    print_info "Contract Address: $CONTRACT_ADDRESS"
    
    # Save contract address
    echo $CONTRACT_ADDRESS > testnet-contract-address.txt
    print_info "Address saved to testnet-contract-address.txt"
    
    # Verify deployment
    print_info "Verifying deployment..."
    qubic-query $CONTRACT_ADDRESS getState
    
    print_info "✅ Deployment verified"
}

deploy_to_mainnet() {
    print_header "Deploying to Mainnet"
    
    export QUBIC_RPC_URL="https://rpc.qubic.org"
    
    print_warning "⚠️  WARNING: Deploying to MAINNET"
    print_warning "This will use real QUBIC tokens"
    
    # Confirmation prompt
    read -p "Are you sure you want to deploy to mainnet? (yes/no): " CONFIRM
    if [ "$CONFIRM" != "yes" ]; then
        print_info "Deployment cancelled"
        exit 0
    fi
    
    print_info "Network: Mainnet"
    print_info "RPC: $QUBIC_RPC_URL"
    
    print_warning "Deploying contract..."
    
    # Deploy contract
    CONTRACT_ADDRESS=$(qubic-deploy $COMPILED_FILE \
        --network mainnet \
        --wallet $QUBIC_WALLET_SEED \
        --gas-limit 1000000 \
        --confirm \
        --output json | jq -r '.contractAddress')
    
    if [ -z "$CONTRACT_ADDRESS" ]; then
        print_error "Deployment failed"
        exit 1
    fi
    
    print_info "✅ Contract deployed successfully"
    print_info "Contract Address: $CONTRACT_ADDRESS"
    
    # Save contract address
    echo $CONTRACT_ADDRESS > mainnet-contract-address.txt
    print_info "Address saved to mainnet-contract-address.txt"
    
    # Verify deployment
    print_info "Verifying deployment..."
    qubic-query $CONTRACT_ADDRESS getState
    
    print_info "✅ Deployment verified"
    
    # Update backend .env
    print_info "Update your backend/.env with:"
    echo "GUARDIAN_CONTRACT_ADDRESS=$CONTRACT_ADDRESS"
}

# Main script
main() {
    print_header "Guardian Score Contract Deployment"
    
    # Check network argument
    if [ $# -eq 0 ]; then
        print_error "Usage: ./deploy.sh [testnet|mainnet]"
        exit 1
    fi
    
    NETWORK=$1
    
    # Run deployment steps
    check_prerequisites
    compile_contract
    validate_contract
    
    case $NETWORK in
        testnet)
            deploy_to_testnet
            ;;
        mainnet)
            deploy_to_mainnet
            ;;
        *)
            print_error "Invalid network: $NETWORK"
            print_error "Use 'testnet' or 'mainnet'"
            exit 1
            ;;
    esac
    
    print_header "Deployment Complete"
    print_info "🎉 Guardian Score contract is live!"
}

# Run main function
main "$@"
