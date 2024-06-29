import React from 'react';
import { useLocation } from 'react-router-dom';
import CommnetContainer from '../../components/comment/CommnetContainer';
import './feed.scss';
import PostCard from '../../components/postCard/PostCard';

const FeedDetailPage: React.FC = () => {
    const location = useLocation();
    const { post } = location.state;

    return (
        <div className='feed-detail-page'>
            <div className='feed-content'>
                <PostCard post={post} />
            </div>
            <div className='feed-comment'>
                <CommnetContainer />
            </div>
        </div>
    );
};

export default FeedDetailPage;
