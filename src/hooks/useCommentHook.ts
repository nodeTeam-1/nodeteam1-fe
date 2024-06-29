import { useQuery, useMutation, useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import { getAsync, postAsync } from '../utils/api/methods';

interface CommentType {
    postId: string;
    content: string;
}

interface ReplyCommentType {
    commentId: string;
    content: string;
}

export const useCommentRegister = (postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, content }: CommentType) => postAsync(`/comment`, { postId, content }),
        onSuccess: () => {
            queryClient.invalidateQueries(postId as InvalidateQueryFilters);
        },
        retry: 0
    });
};

export const useReplyCommentRegister = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ commentId, content }: ReplyCommentType) => postAsync(`/comment/${commentId}`, { content }),
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
