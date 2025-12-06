import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { AnalyticsResponse } from '../types';

export const useAnalytics = () => {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            const { data } = await api.get<{ success: boolean; data: AnalyticsResponse }>('/analytics');
            return data.data;
        },
    });
};
