import { create } from 'zustand';

interface TargetType {}

interface CommentStoreType extends TargetType {
    postRefetch: (value: ()=>void) => void;
}

const initialState = {};

export const usePostStore = create<CommentStoreType>((set) => ({
    postRefetch: (value) => {
        value();
        // set(() => ({postRefetch: value}));
    }
    // set(() => ({ postLike: value }));
}));
