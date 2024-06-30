// import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import PostImageContainer from '../../components/postImage/PostImageContainer';
import { getProfileQuery } from '../../hooks/useProfileHook';
import { getPostsQuery } from '../../hooks/usePostHook';
// import { getPostsByUserIdQuery } from '../../hooks/usePostHook';

import { useUserStore } from '../../store/userStore';
import './feed.scss';

const FeedPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0); // 선택된 탭의 인덱스 상태
    const { userId } = useUserStore(); // 사용자 ID 상태 가져오기
    const [page] = useState<number>(1); // 현재 페이지 번호 상태
    const [pageSize] = useState<number>(10); // 페이지 크기 상태

    const handleTabClick = (index: number) => {
        setSelectedTab(index); // 탭 클릭 시 선택된 탭 인덱스 업데이트
    };

    const {
        data: profileData,
        isLoading: profileLoading,
        isError: profileError,
        refetch: refetchProfile
    } = getProfileQuery(userId);
    const {
        data: postsData,
        isLoading: postsLoading,
        isError: postsError,
        refetch: refetchPosts
    } = getPostsQuery(page, '', pageSize);
    // const { data: postsData, isLoading: postsLoading, isError: postsError } = getPostsByUserIdQuery(userId);

    // 데이터 업데이트시 새로운 데이터로 바꿈
    useEffect(() => {
        refetchProfile();
        refetchPosts();
    }, [userId, refetchProfile, refetchPosts]);

    // 로딩 상태 처리
    if (profileLoading || postsLoading) {
        return <div className='profile-image'>Loading...</div>;
    }

    // 에러 상태 처리
    if (profileError || !profileData || postsError || !postsData) {
        return <div className='profile-image'>Error loading data</div>;
    }

    // 탭 구성
    const tabs = [
        {
            title: '게시글',
            content: <PostImageContainer posts={postsData.data.data} />
        },
        {
            title: '저장됨',
            content: <PostImageContainer posts={postsData.data.data} />
        },
        {
            title: '태그됨',
            content: <PostImageContainer posts={postsData.data.data} />
        }
    ];

    console.log('#### postsData', postsData);
    console.log('#### profileData', profileData);

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
