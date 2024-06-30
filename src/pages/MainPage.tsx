import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCardContainer from '../components/postCard/PostCardContainer';
import { getPostsQuery, PostData } from './../hooks/usePostHook';
import './MainPage.scss';
import { useUserStore } from '../store/userStore';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId, userName } = useUserStore();
    const [page, setPage] = useState(1); // 현재 페이지 번호
    const [posts, setPosts] = useState<PostData[]>([]); // 포스트 목록
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const { data, isLoading, isError } = getPostsQuery(page, '', 10);

    useEffect(() => {
        if (data?.data.data) {
            setPosts((prevPosts) => [...prevPosts, ...data.data.data]);
            if (page >= (data.data.totalPageNum || 0)) {
                setHasMore(false);
            }
        }
    }, [data, page]);

    useEffect(() => {
        if (!userId) {
            navigate('/user/login');
        }
    }, [userId, navigate]);

    const lastPostElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isLoading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    if (isLoading && page === 1) {
        return <div>Loading...</div>;
    }

    if (isError || !posts) {
        return <div>Error loading posts</div>;
    }

    if (posts.length === 0) {
        return <div>No posts available</div>;
    }

    return (
        <div className='main-page'>
            <h1>
                {userId} | {userName}
            </h1>
            <PostCardContainer posts={posts} />
            <div ref={lastPostElementRef} className='loading'>
                {isLoading && <div>Loading more posts...</div>}
            </div>
        </div>
    );
};

export default MainPage;
