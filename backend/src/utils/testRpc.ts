import { QubicRpcService, createQubicRpcService } from '../services/QubicRpcService';

/**
 * Test script for Qubic RPC connectivity
 * Run with: npm run test:rpc
 */

async function testQubicRpc() {
    console.log('🧪 Testing Qubic RPC Connectivity\n');
    console.log('='.repeat(60));

    // Test Mainnet
    console.log('\n📡 Testing Mainnet RPC...');
    const mainnetRpc = new QubicRpcService('mainnet');
    console.log(`   Endpoint: ${mainnetRpc.getEndpoint()}`);

    try {
        const mainnetHealthy = await mainnetRpc.healthCheck();
        if (mainnetHealthy) {
            const status = await mainnetRpc.getStatus();
            console.log(`   ✅ Mainnet Status:`);
            console.log(`      - Last Tick: ${status.lastProcessedTick.tickNumber}`);
            console.log(`      - Epoch: ${status.lastProcessedTick.epoch}`);
            console.log(`      - Skipped Ticks: ${status.skippedTicks.length}`);
        } else {
            console.log('   ❌ Mainnet health check failed');
        }
    } catch (error) {
        console.log(`   ❌ Mainnet error: ${error}`);
    }

    // Test Testnet
    console.log('\n📡 Testing Testnet RPC...');
    const testnetRpc = createQubicRpcService('testnet');
    console.log(`   Endpoint: ${testnetRpc.getEndpoint()}`);

    try {
        const testnetHealthy = await testnetRpc.healthCheck();
        if (testnetHealthy) {
            const status = await testnetRpc.getStatus();
            console.log(`   ✅ Testnet Status:`);
            console.log(`      - Last Tick: ${status.lastProcessedTick.tickNumber}`);
            console.log(`      - Epoch: ${status.lastProcessedTick.epoch}`);
        } else {
            console.log('   ⚠️  Testnet health check failed (may be temporarily down)');
        }
    } catch (error) {
        console.log(`   ⚠️  Testnet error: ${error}`);
        console.log('   Note: Testnet may be temporarily unavailable');
    }

    // Test encoding/decoding
    console.log('\n🔧 Testing Base64 Encoding/Decoding...');
    const testData = 'Hello Qubic!';
    const encoded = mainnetRpc.encodeRequestData(testData);
    const decoded = mainnetRpc.decodeResponseData(encoded);
    console.log(`   Original: ${testData}`);
    console.log(`   Encoded: ${encoded}`);
    console.log(`   Decoded: ${decoded}`);
    console.log(`   ✅ Encoding/Decoding ${decoded === testData ? 'PASSED' : 'FAILED'}`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ RPC connectivity test complete!\n');
}

// Run the test
testQubicRpc().catch(console.error);
