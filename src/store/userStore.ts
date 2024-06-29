import { create } from 'zustand';

interface UserStoreType {
    userId: string;
    userName: string;
    setUserId: (value: string) => void;
    setUserName: (value: string) => void;
    userDelete: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
    userId: '',
    userName: '',
    setUserId: (value) => {
        set(() => ({ userId: value }));
    },
    setUserName: (value) => {
        set(() => ({ userName: value }));
    },
    userDelete: () => {
        set(() => ({ userId: '', userName: '' }));
    }
}));
