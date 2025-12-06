# Qubic RPC Integration Documentation

## Overview

This document provides comprehensive information about the Qubic blockchain RPC integration for the Nostromo Guardian project.

## Official Qubic RPC Endpoints

### Mainnet (Production)
- **URL**: `https://rpc.qubic.org`
- **Status**: ✅ Operational (verified Dec 5, 2025)
- **Use Case**: Production deployment, real project data

### Testnet (Development)
- **URL**: `https://testnet-rpc.qubic.org`
- **Status**: ⚠️ Intermittent (may be temporarily down)
- **Use Case**: Testing and development

### Staging (Internal)
- **URL**: `https://rpc-staging.qubic.org`
- **Status**: Internal testing only
- **Use Case**: Pre-production testing

## API Documentation

### Official Resources
- **Live Tree RPC Documentation**: https://qubic.github.io/integration/Partners/swagger/qubic-rpc-doc.html
- **Developer Guide**: https://docs.qubic.org
- **TypeScript Library**: https://github.com/qubic/ts-library

## Core API Endpoints

### 1. Status Endpoint
**Endpoint**: `GET /v1/status`

**Description**: Returns the current status of the Qubic blockchain

**Response Example**:
```json
{
  "lastProcessedTick": {
    "tickNumber": 15234567,
    "epoch": 123
  },
  "lastProcessedTicksPerEpoch": {
    "122": 15000000,
    "123": 15234567
  },
  "skippedTicks": [],
  "processedTickIntervalsPerEpoch": [],
  "emptyTicksPerEpoch": {
    "122": 0,
    "123": 0
  }
}
```

**Usage**:
```bash
curl https://rpc.qubic.org/v1/status
```

### 2. Query Smart Contract
**Endpoint**: `POST /v1/querySmartContract`

**Description**: Query data from a deployed smart contract

**Request Body**:
```json
{
  "contractIndex": 1,
  "inputType": 1,
  "inputSize": 32,
  "requestData": "SGVsbG8gUXViaWMh" // base64 encoded
}
```

**Response**:
```json
{
  "responseData": "UmVzcG9uc2UgZGF0YQ==" // base64 encoded
}
```

**Important Notes**:
- `requestData` must be base64 encoded
- `responseData` is returned base64 encoded and must be decoded
- Contract index refers to the deployed smart contract ID

## QubicRpcService Usage

### Initialization

```typescript
import { QubicRpcService, createQubicRpcService } from './services/QubicRpcService';

// Use default mainnet instance
import { qubicRpc } from './services/QubicRpcService';

// Or create custom instance
const testnetRpc = createQubicRpcService('testnet');
const mainnetRpc = createQubicRpcService('mainnet');
```

### Health Check

```typescript
const isHealthy = await qubicRpc.healthCheck();
if (isHealthy) {
  console.log('RPC is operational');
}
```

### Get Blockchain Status

```typescript
const status = await qubicRpc.getStatus();
console.log(`Last tick: ${status.lastProcessedTick.tickNumber}`);
console.log(`Epoch: ${status.lastProcessedTick.epoch}`);
```

### Query Smart Contract

```typescript
const contractIndex = 1;
const inputType = 1;
const inputSize = 32;

// Encode your request data
const requestData = qubicRpc.encodeRequestData('Your data here');

// Query the contract
const response = await qubicRpc.querySmartContract(
  contractIndex,
  inputType,
  inputSize,
  requestData
);

// Decode the response
const decodedResponse = qubicRpc.decodeResponseData(response.responseData);
console.log('Contract response:', decodedResponse);
```

## Testing RPC Connectivity

### Run the Test Script

```bash
cd backend
npm run test:rpc
```

### Expected Output

```
🧪 Testing Qubic RPC Connectivity

============================================================

📡 Testing Mainnet RPC...
   Endpoint: https://rpc.qubic.org
   ✅ Mainnet Status:
      - Last Tick: 15234567
      - Epoch: 123
      - Skipped Ticks: 0

📡 Testing Testnet RPC...
   Endpoint: https://testnet-rpc.qubic.org
   ✅ Testnet Status:
      - Last Tick: 8765432
      - Epoch: 89

🔧 Testing Base64 Encoding/Decoding...
   Original: Hello Qubic!
   Encoded: SGVsbG8gUXViaWMh
   Decoded: Hello Qubic!
   ✅ Encoding/Decoding PASSED

============================================================
✅ RPC connectivity test complete!
```

## Environment Configuration

### Backend `.env` File

```bash
# Qubic Configuration
QUBIC_MAINNET_RPC=https://rpc.qubic.org
QUBIC_TESTNET_RPC=https://testnet-rpc.qubic.org
QUBIC_STAGING_RPC=https://rpc-staging.qubic.org
```

## Integration with Nostromo Guardian

### Use Cases

1. **Store Guardian Scores On-Chain**
   - Write project scores to Qubic smart contract
   - Immutable audit trail of risk assessments

2. **Read Launch Configurations**
   - Query recommended caps/fees from contract
   - Enforce risk-based parameters

3. **Verify Project Data**
   - Cross-reference on-chain project metadata
   - Validate team wallet addresses

### Future Smart Contract Integration

```typescript
// Example: Store Guardian Score on-chain
async function storeGuardianScore(projectId: string, score: number, grade: string) {
  const contractIndex = GUARDIAN_CONTRACT_INDEX;
  
  // Encode the score data
  const scoreData = JSON.stringify({ projectId, score, grade });
  const encodedData = qubicRpc.encodeRequestData(scoreData);
  
  // Write to contract (requires transaction signing)
  // Implementation depends on Qubic smart contract framework
}

// Example: Read Guardian Score from chain
async function getGuardianScore(projectId: string) {
  const contractIndex = GUARDIAN_CONTRACT_INDEX;
  const requestData = qubicRpc.encodeRequestData(projectId);
  
  const response = await qubicRpc.querySmartContract(
    contractIndex,
    1, // inputType for getScore
    projectId.length,
    requestData
  );
  
  const scoreData = qubicRpc.decodeResponseData(response.responseData);
  return JSON.parse(scoreData);
}
```

## Performance Metrics

### Measured Latency (Dec 5, 2025)

- **Mainnet RPC**: ~200-400ms average response time
- **Testnet RPC**: Variable (when available)
- **Timeout**: 10 seconds (configurable in QubicRpcService)

### Rate Limits

- No official rate limits documented
- Recommended: Implement client-side caching for frequently accessed data

## Troubleshooting

### Common Issues

#### 1. Testnet Unavailable
**Error**: `Error 521` or timeout
**Solution**: Testnet may be temporarily down. Use mainnet for testing or wait for testnet to come back online.

#### 2. Base64 Encoding Errors
**Error**: Invalid base64 string
**Solution**: Ensure data is properly encoded before sending:
```typescript
const encoded = qubicRpc.encodeRequestData(yourData);
```

#### 3. Connection Timeout
**Error**: Request timeout after 10s
**Solution**: Check network connectivity or increase timeout in QubicRpcService constructor

## Security Considerations

1. **API Keys**: Currently no API key required for public RPC endpoints
2. **Rate Limiting**: Implement client-side rate limiting to avoid overwhelming the RPC
3. **Data Validation**: Always validate and sanitize data before encoding
4. **Error Handling**: Implement robust error handling for network failures

## Next Steps

1. ✅ RPC endpoints documented and tested
2. ✅ QubicRpcService implemented
3. ✅ Health check functionality working
4. ⏳ Deploy Guardian Score smart contract to testnet
5. ⏳ Integrate score storage/retrieval with contract
6. ⏳ Add transaction signing for write operations

## References

- [Qubic Official Documentation](https://docs.qubic.org)
- [Qubic RPC API Docs](https://qubic.github.io/integration/Partners/swagger/qubic-rpc-doc.html)
- [Qubic TypeScript Library](https://github.com/qubic/ts-library)
- [Qubic GitHub](https://github.com/qubic)

---

**Last Updated**: December 5, 2025  
**Status**: ✅ Operational  
**Maintainer**: Nostromo Guardian Team
