import React from 'react';
import './feed.scss';
import PostImage from '../../components/postImage/PostImage';

const FeedDetailPage: React.FC = () => {
    return (
        <div className='feed-detail-page'>
            <div className='feed-image'>
                <PostImage />
            </div>
            <div className='feed-comment'>댓글영역</div>
        </div>
    );
};
export default FeedDetailPage;
