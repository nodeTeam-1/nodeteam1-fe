import { create } from 'zustand';

interface TargetType {
    commentId: string;
    userId: string;
    userName: string;
}

interface CommentStoreType extends TargetType {
    setTarget: ({ commentId, userId, userName }: TargetType) => void;
    reset: () => void;
}

const initialState = {
    commentId: '',
    userId: '',
    userName: ''
};

export const useCommentStore = create<CommentStoreType>((set) => ({
    ...initialState,
    setTarget: (target: TargetType) =>
        set(() => ({
            ...target
        })),
    reset: () => set(initialState)
}));
