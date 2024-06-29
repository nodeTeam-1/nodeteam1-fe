import { create } from 'zustand';

interface UserStoreType {
    userId: string; // 사용자 ID
    userName: string; // 사용자 이름
    userProfileImage: string; // 사용자 프로필 사진
    userBio: string; // 사용개 간단 소개
    setUserId: (value: string) => void; // 사용자 ID 설정 함수
    setUserName: (value: string) => void; // 사용자 이름 설정 함수
    setUserProfileImage: (value: string) => void; // 사용자 프로필 사진 설정 함수
    setUserBio: (value: string) => void; // 사용자 간단 소개 설정 함수
    userDelete: () => void; // 사용자 상태 초기화 함수
}

// zustand를 사용하여 사용자 상태 관리 스토어 생성
export const useUserStore = create<UserStoreType>((set) => ({
    userId: '',
    userName: '',
    userProfileImage: '',
    userBio: '',
    setUserId: (value) => {
        set(() => ({ userId: value }));
    },
    setUserName: (value) => {
        set(() => ({ userName: value }));
    },
    setUserProfileImage: (value) => {
        set(() => ({ userProfileImage: value }));
    },
    setUserBio: (value) => {
        set(() => ({ userBio: value }));
    },
    userDelete: () => {
        set(() => ({ userId: '', userName: '', userProfileImage: '', userBio: '' }));
    }
}));
