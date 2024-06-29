import React, { useState } from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import PostImageContainer from '../../components/postImage/PostImageContainer';
import { getProfileQuery } from '../../hooks/useProfileHook';
import { getPostsByUserIdQuery } from '../../hooks/usePostHook';
import { useUserStore } from '../../store/userStore';
import './feed.scss';

const FeedPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0); // 선택된 탭의 인덱스 상태
    const { userId } = useUserStore(); // 사용자 ID 상태 가져오기

    const handleTabClick = (index: number) => {
        setSelectedTab(index); // 탭 클릭 시 선택된 탭 인덱스 업데이트
    };

    const { data: profileData, isLoading: profileLoading, isError: profileError } = getProfileQuery(userId);
    const { data: postsData, isLoading: postsLoading, isError: postsError } = getPostsByUserIdQuery(userId);

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
