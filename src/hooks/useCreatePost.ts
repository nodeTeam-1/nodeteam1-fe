import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    profileImage: string;
}

interface CreatePostData {
    _id: string;
    userId: User;
    title: string;
    content: string;
    images: string[];
    category: string;
    // location: string;
    tags: string[];
    likeCount: number;
    // createdAt: string;
}

const createPost = async (postData: CreatePostData) => {
    const { data } = await axios.post('/post', postData);
    return data;
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation(createPost, {
        onSuccess: () => {
            // 포스트 생성 후 포스트 목록을 다시 가져오기 위해 캐시를 무효화
            queryClient.invalidateQueries('posts');
        },
    });
};
