import { useQuery, useMutation, useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import { getAsync, postAsync } from '../utils/api/methods';

interface CommentType {
    postId: string;
    message: string;
}

interface ReplyCommentType {
    commentId: string;
    message: string;
}

export const useCommentRegister = (postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, message }: CommentType) => postAsync(`/comment`, { postId, message }),
        onSuccess: () => {
            queryClient.invalidateQueries(postId as InvalidateQueryFilters);
        },
        retry: 0
    });
};

export const useReplyCommentRegister = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ commentId, message }: ReplyCommentType) => postAsync(`/comment/${commentId}`, { message }),
        onSuccess: () => {
            queryClient.invalidateQueries(postId as InvalidateQueryFilters);
        },
        retry: 0
    });
};

export const useGetComment = (postId: string) => {
    return useQuery({
        queryKey: [postId],
        queryFn: () => getAsync(`/comment/${postId}`),
        enabled: postId !== '',
        select: (res) => res.data.comments
    });
};
