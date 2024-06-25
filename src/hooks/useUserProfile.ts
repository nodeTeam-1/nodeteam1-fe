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

// const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
//     const { data } = await axios.get(`/user/${userId}`);
//     return data;
// };

export const useUserProfile = (userId: string) => {
    return useQuery<AxiosResponse<UserProfile>>({
        queryKey: ['tokenLogin', userId],
        queryFn: () => getAsync(`/user/${userId}`),
        retry: 0
    });
};
