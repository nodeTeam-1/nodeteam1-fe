import { create } from 'zustand';

interface UserStoreType {
    user: string;
    setUser: (value: string) => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
    user: '',
    setUser: (value) => {
        set(() => ({ user: value }));
    }
}));
