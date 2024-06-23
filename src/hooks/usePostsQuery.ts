import { useQuery } from 'react-query';
import axios from 'axios';

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
    location: string;
    createdAt: string;
}

const fetchPosts = async (): Promise<{ data: Post[] }> => {
    const { data } = await axios.get('/post');
    return data;
};

export const usePostsQuery = () => {
    return useQuery<{ data: Post[] }, Error>('posts', fetchPosts);
};
