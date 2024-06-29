import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getAsync, postAsync } from '../utils/api/methods';

// User 데이터 인터페이스 정의
interface User {
    _id: string;
    name: string;
    profileImage: string;
}

// Post 데이터 인터페이스 정의
export interface PostData {
    _id: string;
    userId: User;
    title: string;
    content: string;
    images: string;
    category: string;
    tags: string[];
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
}

// CreatePostData 데이터 인터페이스 정의
export interface CreatePostData {
    title: string;
    category: string;
    images: string;
    content: string;
    location: string;
    tags: string[];
}

export interface PostResponse {
    data: PostData[];
    totalPageNum?: number;
}

// Posts 목록 가져오기
export const getPostsQuery = (page: number, name: string, pageSize: number) => {
    const path = `/post`;
    return useQuery<AxiosResponse<PostResponse>>({
        queryKey: ['getPosts', page, name, pageSize],
        queryFn: () => getAsync(`${path}?page=${page}&name=${name}&pageSize=${pageSize}`)
    });
};

// Posts Id별 목록 가져오기
export const getPostsByUserIdQuery = (userId: string) => {
    const path = `/post/${userId}`;
    return useQuery<AxiosResponse<PostResponse>>({
        queryKey: ['getPostsByUserId', userId],
        queryFn: () => getAsync(path)
    });
};

// Post 상세 정보 가져오기
export const getPostDetailQuery = (postId: string) => {
    const path = `/post/${postId}`;
    return useQuery<AxiosResponse<PostData>>({
        queryKey: ['getPostDetail', postId],
        queryFn: () => getAsync(path)
    });
};

// Post 생성
export const createPostMutation = (): UseMutationResult<AxiosResponse<PostData>, unknown, CreatePostData, unknown> => {
    const path = `/post`;
    return useMutation<AxiosResponse<PostData>, unknown, CreatePostData>({
        mutationFn: (data: CreatePostData) => postAsync(path, data)
    });
};

// Post 업데이트
export const updatePostMutation = (): UseMutationResult<AxiosResponse<PostData>, unknown, PostData, unknown> => {
    const path = `/post`;
    return useMutation<AxiosResponse<PostData>, unknown, PostData>({
        mutationFn: (data: PostData) => postAsync(path, data)
    });
};

// Post 삭제
export const deletePostMutation = (postId: string): UseMutationResult<AxiosResponse<void>, unknown, void, unknown> => {
    const path = `/post/${postId}`;
    return useMutation<AxiosResponse<void>, unknown, void>({
        mutationFn: () => postAsync(path, {})
    });
};

// Post Like 생성
export const createPostLikeMutation = (
    postId: string
): UseMutationResult<AxiosResponse<void>, unknown, void, unknown> => {
    const path = `/post/like/${postId}`;
    return useMutation<AxiosResponse<void>, unknown, void>({
        mutationFn: () => postAsync(path, {})
    });
};

// Post Like 삭제
export const deletePostLikeMutation = (
    postId: string
): UseMutationResult<AxiosResponse<void>, unknown, void, unknown> => {
    const path = `/post/like/${postId}`;
    return useMutation<AxiosResponse<void>, unknown, void>({
        mutationFn: () => postAsync(path, {})
    });
};
