/* eslint-disable */
import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getAsync, postAsync } from '../utils/api/methods';

// formData 인터페이스 정의
export interface formData {
    email: string;
    password: string;
    name: string;
}

// VerifyData 인터페이스 정의
export interface VerifyData {
    email: string;
    verificationCode: string;
}


// LoginPage: 로그인 시 사용
export const userLoginMutation = (path: string) => {
    return useMutation<AxiosResponse<any>, unknown, Omit<formData, 'name'>>({
        // mutationFn은 로그인 요청을 보내는 함수 (name 속성을 제외한 formData 타입을 사용)
        // mutationFn: (data: Omit<formData, 'name' | 'level'>) => postAsync(path, data)
        mutationFn: (data: Omit<formData, 'name'>) => postAsync(path, data),
    });
};

// AppLayout.tsx: token 확인 후 token 로그인 시 사용
export const tokenLoginQuery = (path: string) => {
    console.log('tokenLoginQuery');
    return useQuery<AxiosResponse<any>>({
        queryKey: ['tokenLogin'],
        queryFn: () => getAsync(path),
        retry: 0, // 실패 시 재시도하지 않음
    });
};

// RegisterPage: 회원가입 시 사용
export const userRegisterMutation = (
    path: string
): UseMutationResult<AxiosResponse<any>, unknown, formData, unknown> => {
    return useMutation<AxiosResponse<any>, unknown, formData>({
        mutationFn: (data: formData) => postAsync(path, data),
    });
};

// VerifyPage: 사용자 인증 시 사용
export const userVerifyMutation = (
    path: string
): UseMutationResult<AxiosResponse<any>, unknown, VerifyData, unknown> => {
    return useMutation<AxiosResponse<any>, unknown, VerifyData>({
        mutationFn: (data: VerifyData) => postAsync(path, data),
    });
};