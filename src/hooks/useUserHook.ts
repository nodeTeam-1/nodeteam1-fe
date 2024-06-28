/* eslint-disable */
import { useQuery } from '@tanstack/react-query';
import { getAsync } from '../utils/api/methods';
import { AxiosResponse } from 'axios';

// 전체 유저 리스트 가져오기
export const getUserListQuery = () => {
    return useQuery<AxiosResponse<any>>({
        queryKey: ['userList'],
        queryFn: () => getAsync(`/user/list`),
        retry: 0
    });
};