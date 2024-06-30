import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../../components/profile/ProfileCard';
import PostImageContainer from '../../components/postImage/PostImageContainer';
import { getProfileQuery } from '../../hooks/useProfileHook';
import { getPostsByUserIdQuery, PostData } from '../../hooks/usePostHook';
import './feed.scss';

const FeedPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const pageSize = 12;
    const [page, setPage] = useState<number>(1);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    const handleTabClick = (index: number) => {
        setSelectedTab(index);
    };

    const { id } = useParams();
    const { data: profileData, isLoading: profileLoading, isError: profileError } = getProfileQuery(id || '');

    const {
        data: postsData,
        isLoading: postsLoading,
        isError: postsError
    } = getPostsByUserIdQuery(id || '', page, pageSize);

    useEffect(() => {
        if (postsData?.data.data) {
            setPosts(() => [...postsData.data.data]);
            if (page >= (postsData.data.totalPageNum || 0)) {
                setHasMore(false);
            }
        }
    }, [postsData, page]);

    const lastPostElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (postsLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [postsLoading, hasMore]
    );

    if (profileLoading || postsLoading) {
        return <div className='profile-image'>Loading...</div>;
    }

    if (profileError || !profileData || postsError || !postsData) {
        return <div className='profile-image'>Error loading data</div>;
    }

    const renderTabContent = (posts: PostData[]) => (
        <PostImageContainer posts={posts} lastPostElementRef={lastPostElementRef} />
    );

    const tabs = [
        { title: '게시글', content: renderTabContent(posts) },
        { title: '저장됨', content: renderTabContent(posts) },
        { title: '태그됨', content: renderTabContent(posts) }
    ];

    return (
        <div className='my-feed-page'>
            <ProfileCard profileData={profileData.data.user} />
            <div className='tab-menu'>
                <ul className='tabs'>
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={selectedTab === index ? 'active' : ''}
                            onClick={() => handleTabClick(index)}>
                            {tab.title}
                        </li>
                    ))}
                </ul>
                <div className='tab-content'>{tabs[selectedTab].content}</div>
            </div>
        </div>
    );
};

export default FeedPage;
