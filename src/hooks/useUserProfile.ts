import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

interface UserProfile {
    _id: string;
    email: string;
    // password: string;
    name: string;
    level: string;
    profileImage: string;
    bio: string;
    followers: string[];
    followings: string[];
    postLike: string[];
    commentLike: string[];
    bookMark: string[];
    createdAt: Date;
    updatedAt: Date;
}

const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    const { data } = await axios.get(`/user/${userId}`);
    return data;
};

export const useUserProfile = (userId: string): UseQueryResult<UserProfile, unknown> => {
    return useQuery<UserProfile, unknown>({
        queryKey: ['tokenLogin', userId],
        queryFn: () => fetchUserProfile(userId)
    });
};
