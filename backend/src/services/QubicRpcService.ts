import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Qubic RPC Service
 * Handles all interactions with the Qubic blockchain via RPC endpoints
 * 
 * Official Documentation:
 * - Live Tree RPC: https://qubic.github.io/integration/Partners/swagger/qubic-rpc-doc.html
 * - Mainnet: https://rpc.qubic.org
 * - Testnet: https://testnet-rpc.qubic.org
 */

export interface QubicStatus {
    lastProcessedTick: {
        tickNumber: number;
        epoch: number;
    };
    lastProcessedTicksPerEpoch: Record<string, number>;
    skippedTicks: any[];
    processedTickIntervalsPerEpoch: any[];
    emptyTicksPerEpoch: Record<string, number>;
}

export interface SmartContractQueryRequest {
    contractIndex: number;
    inputType: number;
    inputSize: number;
    requestData: string; // base64 encoded
}

export interface SmartContractQueryResponse {
    responseData: string; // base64 encoded
}

export class QubicRpcService {
    private client: AxiosInstance;
    private endpoint: string;
    private network: 'mainnet' | 'testnet' | 'staging';

    constructor(network: 'mainnet' | 'testnet' | 'staging' = 'mainnet') {
        this.network = network;

        // Select RPC endpoint based on network
        switch (network) {
            case 'testnet':
                this.endpoint = process.env.QUBIC_TESTNET_RPC || 'https://testnet-rpc.qubic.org';
                break;
            case 'staging':
                this.endpoint = process.env.QUBIC_STAGING_RPC || 'https://rpc-staging.qubic.org';
                break;
            case 'mainnet':
            default:
                this.endpoint = process.env.QUBIC_MAINNET_RPC || 'https://rpc.qubic.org';
                break;
        }

        // Initialize axios client
        this.client = axios.create({
            baseURL: this.endpoint,
            timeout: 10000, // 10 second timeout
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`🔗 Qubic RPC Service initialized for ${network} at ${this.endpoint}`);
    }

    /**
     * Get the current status of the Qubic blockchain
     * Endpoint: GET /v1/status
     */
    async getStatus(): Promise<QubicStatus> {
        try {
            const response = await this.client.get<QubicStatus>('/v1/status');
            return response.data;
        } catch (error) {
            console.error('❌ Failed to get Qubic status:', error);
            throw new Error(`Qubic RPC error: ${error}`);
        }
    }

    /**
     * Query a smart contract
     * Endpoint: POST /v1/querySmartContract
     * 
     * @param contractIndex - The index of the smart contract
     * @param inputType - The input type identifier
     * @param inputSize - Size of the input data
     * @param requestData - Base64 encoded request data
     */
    async querySmartContract(
        contractIndex: number,
        inputType: number,
        inputSize: number,
        requestData: string
    ): Promise<SmartContractQueryResponse> {
        try {
            const payload: SmartContractQueryRequest = {
                contractIndex,
                inputType,
                inputSize,
                requestData,
            };

            const response = await this.client.post<SmartContractQueryResponse>(
                '/v1/querySmartContract',
                payload
            );

            return response.data;
        } catch (error) {
            console.error('❌ Failed to query smart contract:', error);
            throw new Error(`Smart contract query error: ${error}`);
        }
    }

    /**
     * Health check - verifies RPC connectivity
     * Returns true if the RPC endpoint is accessible
     */
    async healthCheck(): Promise<boolean> {
        try {
            const status = await this.getStatus();
            const isHealthy = status.lastProcessedTick?.tickNumber > 0;

            if (isHealthy) {
                console.log(`✅ Qubic RPC ${this.network} is healthy`);
                console.log(`   Last processed tick: ${status.lastProcessedTick.tickNumber}`);
                console.log(`   Epoch: ${status.lastProcessedTick.epoch}`);
            }

            return isHealthy;
        } catch (error) {
            console.error(`❌ Qubic RPC ${this.network} health check failed:`, error);
            return false;
        }
    }

    /**
     * Get the current RPC endpoint URL
     */
    getEndpoint(): string {
        return this.endpoint;
    }

    /**
     * Get the current network
     */
    getNetwork(): string {
        return this.network;
    }

    /**
     * Decode base64 response data
     */
    decodeResponseData(base64Data: string): string {
        try {
            return Buffer.from(base64Data, 'base64').toString('utf-8');
        } catch (error) {
            console.error('❌ Failed to decode response data:', error);
            throw new Error(`Decode error: ${error}`);
        }
    }

    /**
     * Encode request data to base64
     */
    encodeRequestData(data: string): string {
        try {
            return Buffer.from(data, 'utf-8').toString('base64');
        } catch (error) {
            console.error('❌ Failed to encode request data:', error);
            throw new Error(`Encode error: ${error}`);
        }
    }
}

// Export singleton instance for mainnet (default)
export const qubicRpc = new QubicRpcService('mainnet');

// Export factory function for custom network
export const createQubicRpcService = (network: 'mainnet' | 'testnet' | 'staging') => {
    return new QubicRpcService(network);
};
