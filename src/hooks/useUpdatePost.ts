import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    profileImage: string;
}

interface UpdatePostData {
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

const updatePost = async (postData: UpdatePostData) => {
    const { data } = await axios.put(`/post/${postData._id}`, postData);
    return data;
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation(updatePost, {
        onSuccess: () => {
            // 포스트 수정 후 포스트 목록을 다시 가져오기 위해 캐시를 무효화
            queryClient.invalidateQueries('posts');
        }
    });
};
