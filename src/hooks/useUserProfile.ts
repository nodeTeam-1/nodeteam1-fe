import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UserProfile {
    user: any;
    // 사용자 프로필 정보에 대한 인터페이스 정의
}

const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    const { data } = await axios.get(`/user/${userId}`);
    return data;
};

export const useUserProfile = (userId: string) => {
    return useQuery({
        queryKey: ['tokenLogin', userId],
        queryFn: () => fetchUserProfile(userId)
    });
};
