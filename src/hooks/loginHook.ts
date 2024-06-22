/* eslint-disable */
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { postAsync } from '../api/methodsTS';

export interface formData {
    email: string;
    password: string;
    name: string;
    level: string;
};

export const userLoginMutation = (path: string) => {
    return useMutation({
        mutationFn: (data: Omit<formData, 'name' | 'level'>) => postAsync(path, data)
    });
}

export const userRegisterMutation = (
    path: string
): UseMutationResult<AxiosResponse<any>, unknown, formData, unknown> => {
    return useMutation<AxiosResponse<any>, unknown, formData>({
            mutationFn: (data: formData) => postAsync(path, data)
        }
    );
};
