import { useQuery } from '@tanstack/react-query';
import { getAsync } from '../utils/api/methods';
import { AxiosResponse } from 'axios';

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

interface UserProfileResponse {
    user: UserProfile;
}

// 프로필 정보 가져오기
export const getProfileQuery = (userId: string) => {
    return useQuery<AxiosResponse<UserProfileResponse>>({
        queryKey: ['getProfile', userId],
        queryFn: () => getAsync(`/user/profile/${userId}`),
        retry: 0
    });
};

// 내 프로필 정보 가져오기
export const getMyProfile = () => {
    return useQuery<AxiosResponse<UserProfileResponse>>({
        queryKey: ['getMyProfile'],
        queryFn: () => getAsync(`/user/profile`),
        retry: 0
    });
};
