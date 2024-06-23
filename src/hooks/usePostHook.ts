/* eslint-disable */
import {
    useMutation,
    useQueryClient,
    MutationFunction,
    UseMutationResult,
    UseQueryResult,
    useQuery
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getAsync, postAsync, putAsync, deleteAsync } from '../utils/api/methods';

interface User {
    _id: string;
    name: string;
    profileImage: string;
}

interface Post {
    _id: string;
    userId: User;
    title: string;
    content: string;
    images: string[];
    category: string;
    tags: string[];
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
}

interface CreatePostData {
    userId: string;
    title: string;
    content: string;
    images: string[];
    category: string;
    tags: string[];
}

interface UpdatePostData {
    _id: string;
    title?: string;
    content?: string;
    images?: string[];
    category?: string;
    tags?: string[];
}

// 포스트 가져오기
export const useGetPosts = (): UseQueryResult<AxiosResponse<Post[]>, unknown> => {
    return useQuery<AxiosResponse<Post[]>, unknown>({
        queryKey: ['posts'],
        queryFn: () => getAsync('/post'),
        retry: 0
    });
};

// 포스트 생성
const createPost: MutationFunction<AxiosResponse<any>, CreatePostData> = async (postData: CreatePostData) => {
    return await postAsync('/post', postData);
};

export const useCreatePost = (): UseMutationResult<AxiosResponse<any>, unknown, CreatePostData, unknown> => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<any>, unknown, CreatePostData>({
        mutationFn: createPost,
        // onSuccess: () => {
        //     queryClient.invalidateQueries('posts'); // 'posts'로 변경
        // }
    });
};

// 포스트 업데이트
const updatePost: MutationFunction<AxiosResponse<any>, UpdatePostData> = async (postData: UpdatePostData) => {
    return await putAsync(`/post/${postData._id}`, postData);
};

export const useUpdatePost = (): UseMutationResult<AxiosResponse<any>, unknown, UpdatePostData, unknown> => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<any>, unknown, UpdatePostData>({
        mutationFn: updatePost,
    });
};

// 포스트 삭제
const deletePost: MutationFunction<AxiosResponse<any>, string> = async (postId: string) => {
    return await deleteAsync(`/post/${postId}`);
};

export const useDeletePost = (): UseMutationResult<AxiosResponse<any>, unknown, string, unknown> => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<any>, unknown, string>({
        mutationFn: deletePost,
    });
};
