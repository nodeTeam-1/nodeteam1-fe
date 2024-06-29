import { useMutation } from '@tanstack/react-query';
import { postAsync } from '../utils/api/methods';

interface CommentType {
    postId: string;
    content: string;
}

interface ReplyCommentType {
    commentId: string;
    content: string;
}

export const useCommentRegister = () => {
    return useMutation({
        mutationFn: ({ postId, content }: CommentType) => postAsync(`/comment`, { postId, content }),
        retry: 0
    });
};

export const useReplyCommentRegister = () => {
    return useMutation({
        mutationFn: ({ commentId, content }: ReplyCommentType) => postAsync(`/comment/${commentId}`, { content }),
        retry: 0
    });
};
