/* eslint-disable */
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { postAsync } from '../api/methodsTS';

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    level: string;
};

export const usePostMutation = (
    path: string
): UseMutationResult<AxiosResponse<any>, unknown, RegisterData, unknown> => {
    return useMutation<AxiosResponse<any>, unknown, RegisterData>({
            mutationFn: (data: RegisterData) => postAsync(path, data)
        }
    );
};
