import React, { useState } from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import PostImageContainer from './../../components/postImage/PostImageContainer';
import AddPostForm from '../../components/addPostForm/AddPostForm';
import Modal from '../../components/modal/Modal';
import './feed.scss';

const MyFeedPage: React.FC = () => {
    const [close, setClose] = useState(false);
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
            <div className='btn btn-add-post' onClick={() => setClose(true)}>
                포스트 올리기
            </div>
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
            {close && (
                <Modal title='포스트 업로드'>
                    <AddPostForm setClose={setClose} close={close} />
                </Modal>
            )}
        </div>
    );
};

export default MyFeedPage;
