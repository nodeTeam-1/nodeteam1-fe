import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deletePost = async (postId: string) => {
    const { data } = await axios.delete(`/post/${postId}`);
    return data;
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation(deletePost, {
        onSuccess: () => {
            // 포스트 삭제 후 포스트 목록을 다시 가져오기 위해 캐시를 무효화
            queryClient.invalidateQueries('posts');
        }
    });
};
