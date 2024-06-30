import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStoreType {
    userId: string; // 사용자 ID
    userName: string; // 사용자 이름
    userProfileImage: string; // 사용자 프로필 사진
    userBio: string; // 사용개 간단 소개
    postLike: string[]; // postLikeList. 값들은 postId
    setUserId: (value: string) => void; // 사용자 ID 설정 함수
    setUserName: (value: string) => void; // 사용자 이름 설정 함수
    setUserProfileImage: (value: string) => void; // 사용자 프로필 사진 설정 함수
    setUserBio: (value: string) => void; // 사용자 간단 소개 설정 함수
    setPostLike: (valuse: string[]) => void;
    userDelete: () => void; // 사용자 상태 초기화 함수
}

// zustand를 사용하여 사용자 상태 관리 스토어 생성
export const useUserStore = create<UserStoreType>()(
    persist(
        (set) => ({
            userId: '',
            userName: '',
            userProfileImage: '',
            userBio: '',
            postLike: [],
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
            setPostLike: (value) => {
                set(() => ({ postLike: value }));
            },
            userDelete: () => {
                set(() => ({ userId: '', userName: '', userProfileImage: '', userBio: '' }));
            }
        }),
        {
            name: 'userStore'
        }
    )
);
