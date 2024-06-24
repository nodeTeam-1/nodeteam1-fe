import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getAsync, postAsync } from '../utils/api/methods';

// Post 데이터 인터페이스 정의
export interface PostData {
    userId: string;
    title: string;
    content: string;
    images: string[];
    category: string;
    tags: string[];
    likeCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface PostResponse {
    data: PostData[];
    totalPageNum?: number;
}

// Posts 목록 가져오기
export const getPostsQuery = (page: number, name: string, pageSize: number) => {
    const path = `/api/posts`;
    return useQuery<AxiosResponse<PostResponse>>({
        queryKey: ['getPosts', page, name, pageSize],
        queryFn: () => getAsync(`${path}?page=${page}&name=${name}&pageSize=${pageSize}`)
    });
};

// Post 상세 정보 가져오기
export const getPostDetailQuery = (postId: string) => {
    const path = `/api/posts/${postId}`;
    return useQuery<AxiosResponse<PostData>>({
        queryKey: ['getPostDetail', postId],
        queryFn: () => getAsync(path)
    });
};

// Post 생성
export const createPostMutation = (): UseMutationResult<AxiosResponse<PostData>, unknown, PostData, unknown> => {
    const path = `/api/posts`;
    return useMutation<AxiosResponse<PostData>, unknown, PostData>({
        mutationFn: (data: PostData) => postAsync(path, data)
    });
};

// Post 업데이트
export const updatePostMutation = (): UseMutationResult<AxiosResponse<PostData>, unknown, PostData, unknown> => {
    const path = `/api/posts`;
    return useMutation<AxiosResponse<PostData>, unknown, PostData>({
        mutationFn: (data: PostData) => postAsync(path, data)
    });
};

// Post 삭제
export const deletePostMutation = (postId: string): UseMutationResult<AxiosResponse<void>, unknown, void, unknown> => {
    const path = `/api/posts/${postId}`;
    return useMutation<AxiosResponse<void>, unknown, void>({
        mutationFn: () => postAsync(path, {})
    });
};

// Post Like 생성
export const createPostLikeMutation = (
    postId: string
): UseMutationResult<AxiosResponse<void>, unknown, void, unknown> => {
    const path = `/api/posts/like/${postId}`;
    return useMutation<AxiosResponse<void>, unknown, void>({
        mutationFn: () => postAsync(path, {})
    });
};

// Post Like 삭제
export const deletePostLikeMutation = (
    postId: string
): UseMutationResult<AxiosResponse<void>, unknown, void, unknown> => {
    const path = `/api/posts/like/${postId}`;
    return useMutation<AxiosResponse<void>, unknown, void>({
        mutationFn: () => postAsync(path, {})
    });
};
