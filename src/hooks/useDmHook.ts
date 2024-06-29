/* eslint-disable */
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAsync, postAsync, putAsync } from '../utils/api/methods';
import { AxiosResponse } from 'axios';

// SendData 인터페이스 정의
export interface SendData {
    reciveId: string;
    message: string;
    messageIndex: number;
}

// SendData 인터페이스 정의
export interface DeleteData {
    reciveId: string;
    messageIndex: number;
}

// DmPage: DM 내역 가져오기
export const getDmListenerQuery = (id: string, enabled: boolean) => {
    return useQuery<AxiosResponse<any>>({
        queryKey: ['DmListener'],
        queryFn: () => getAsync(`/dm/${id}`),
        retry: 0,
        enabled
    });
};

// DmPage: DM 전송
export const sendDmMutation = () => {
    return useMutation<AxiosResponse<any>, unknown, SendData>({
        mutationFn: (data: SendData) => postAsync(`/dm`, data),
    });
};

// DmPage: DM 삭제
export const deleteDmMutation = () => {
    return useMutation<AxiosResponse<any>, unknown, DeleteData>({
        mutationFn: (data: DeleteData) => putAsync(`/dm`, data),
    });
};