import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';

export const useContractScore = (projectId: string) => {
    return useQuery({
        queryKey: ['contract', 'score', projectId],
        queryFn: async () => {
            const { data } = await api.get(`/contract/score/${projectId}`);
            // Data structure depends on backend implementation. 
            // In Task 2.12 I returned { success: true, data: { raw: ... } }
            // So data.data is the payload.
            return data.data;
        },
        enabled: !!projectId,
        retry: 1, // Don't retry too much if contract is offline
    });
};
