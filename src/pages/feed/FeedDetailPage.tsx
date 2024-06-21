import React from 'react';
import PostImage from '../../components/postImage/PostImage';
import CommnetContainer from '../../components/comment/CommnetContainer';
import './feed.scss';

const FeedDetailPage: React.FC = () => {
    return (
        <div className='feed-detail-page'>
            <div className='feed-image'>
                <PostImage />
            </div>
            <div className='feed-comment'>
                <CommnetContainer />
            </div>
        </div>
    );
};

export default FeedDetailPage;
