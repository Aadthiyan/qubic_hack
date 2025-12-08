import { createQubicRpcService, QubicRpcService } from './QubicRpcService';

// Constants
const CONTRACT_INDEX = 1; // Retrieve this from config/env in real app
const READ_FUNCTION_GET_SCORE = 2; // Index of the function in the contract

export class QubicService {
    private rpc: QubicRpcService;

    constructor() {
        this.rpc = createQubicRpcService('testnet');
    }

    /**
     * Get Guardian Score from Smart Contract
     * @param projectId - The project ID to query
     */
    async getGuardianScore(projectId: string): Promise<any> {
        try {
            console.log(`📡 Querying Qubic Contract for Project: ${projectId}`);

            // Encode the project ID (assuming simple string encoding for prototype)
            // In production, this needs proper binary struct serialization
            const requestData = this.rpc.encodeRequestData(projectId);

            const response = await this.rpc.querySmartContract(
                CONTRACT_INDEX,
                READ_FUNCTION_GET_SCORE,
                projectId.length, // Input size
                requestData
            );

            const decodedResponse = this.rpc.decodeResponseData(response.responseData);
            console.log(`✅ Contract Response: ${decodedResponse}`);

            // Mock parsing the response struct
            // struct Output { bool found; uint8 score; uint8 grade; ... }
            // We just return the raw string for now
            return { raw: decodedResponse };

        } catch (error) {
            console.error('❌ Qubic Contract Read Failed (Returning Null):', error);
            // Return null to indicate "Not On-Chain" or "Read Failed" without crashing API
            return null;
        }
    }

    /**
     * Set Guardian Score (Mock Write)
     * In a real implementation, this would:
     * 1. Create a transaction
     * 2. Sign it with the Oracle's private key
     * 3. Broadcast to the network
     */
    async setGuardianScore(projectId: string, score: number, grade: number): Promise<boolean> {
        console.log(`📝 [MOCK] Sending Transaction to Qubic:`);
        console.log(`   Function: SetGuardianScore`);
        console.log(`   Project: ${projectId}`);
        console.log(`   Score: ${score}`);
        console.log(`   Grade: ${grade}`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('✅ Transaction Broadcasted! (Mock ID: tx_mock_12345)');
        return true;
    }
}

export const qubicService = new QubicService();
