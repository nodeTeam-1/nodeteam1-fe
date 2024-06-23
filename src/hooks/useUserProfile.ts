import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserProfile = async (userId: string) => {
    const { data } = await axios.get(`/user/${userId}`);
    return data;
};

export const useUserProfile = (userId: string) => {
    return useQuery(['userProfile', userId], () => fetchUserProfile(userId), {
        enabled: !!userId // userId가 있을 때만 쿼리를 실행
    });
};
