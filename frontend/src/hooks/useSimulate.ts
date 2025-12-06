import { useMutation } from '@tanstack/react-query';
import { api } from '../utils/api';
import { SimulateRequest, SimulateResponse } from '../types';

export const useSimulate = () => {
    return useMutation({
        mutationFn: async (data: SimulateRequest) => {
            const response = await api.post<any>('/simulate', data);
            // Backend returns { success: true, data: { score, grade, breakdown, flags, recommendation } }
            // Wait, let's verify backend response structure for /simulate.
            return response.data.data as SimulateResponse;
        },
    });
};
