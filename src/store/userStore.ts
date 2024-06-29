import { create } from 'zustand';

interface UserStoreType {
    userId: string; // 사용자 ID
    userName: string; // 사용자 이름
    setUserId: (value: string) => void; // 사용자 ID 설정 함수
    setUserName: (value: string) => void; // 사용자 이름 설정 함수
    userDelete: () => void; // 사용자 상태 초기화 함수
}

// zustand를 사용하여 사용자 상태 관리 스토어 생성
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
