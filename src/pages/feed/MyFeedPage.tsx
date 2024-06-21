import React, { useState } from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import PostImageContainer from './../../components/postImage/PostImageContainer';
import './feed.scss';

const MyFeedPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabClick = (index: number) => {
        setSelectedTab(index);
    };

    const tabs = [
        { title: '게시글', content: <PostImageContainer /> },
        { title: '저장됨', content: <PostImageContainer /> },
        { title: '태그됨', content: <PostImageContainer /> }
    ];

    return (
        <div className='my-feed-page'>
            <ProfileCard />
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

export default MyFeedPage;
