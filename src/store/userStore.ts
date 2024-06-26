import { create } from 'zustand';

interface UserStoreType {
    userId: string;
    setUserId: (value: string) => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
    userId: '',
    setUserId: (value) => {
        set(() => ({ userId: value }));
    }
}));
