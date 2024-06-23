/* eslint-disable */
import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getAsync, postAsync } from '../utils/api/methods';

export interface formData {
    email: string;
    password: string;
    name: string;
    level: string;
};

//LoginPage: 로그인시 사용.
export const userLoginMutation = (path: string) => {
    return useMutation({
        mutationFn: (data: Omit<formData, 'name' | 'level'>) => postAsync(path, data)
    });
};

//MainPage: token확인 후 token 로그인시 사용.
export const tokenLoginQuery = (path: string) => {
    return useQuery({
        queryKey: ["tokenLogin"],
        queryFn: () => getAsync(path),
        retry: 0
    });
};

//RegisterPage: 회원가입시 사용
export const userRegisterMutation = (
    path: string
): UseMutationResult<AxiosResponse<any>, unknown, formData, unknown> => {
    return useMutation<AxiosResponse<any>, unknown, formData>({
            mutationFn: (data: formData) => postAsync(path, data)
        }
    );
};
