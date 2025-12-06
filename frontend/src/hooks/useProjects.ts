import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { Project } from '../types';

interface ProjectsResponse {
    success: boolean;
    data: {
        projects: Project[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}

export const useProjects = (page = 1, status?: string) => {
    return useQuery({
        queryKey: ['projects', page, status],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            if (status) params.append('status', status);

            const { data } = await api.get<ProjectsResponse>(`/projects?${params.toString()}`);
            return data.data;
        },
    });
};

export const useProject = (id: string) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const { data } = await api.get(`/projects/${id}`);
            return data.data;
        },
        enabled: !!id,
    });
};
