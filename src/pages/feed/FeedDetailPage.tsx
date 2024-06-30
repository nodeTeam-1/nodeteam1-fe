import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommnetContainer from '../../components/comment/CommnetContainer';
import './feed.scss';
import PostCard from '../../components/postCard/PostCard';
import { useUserStore } from '../../store/userStore';
import { deletePostMutation, getPostDetailQuery } from '../../hooks/usePostHook';

const FeedDetailPage: React.FC = () => {
    const { userId } = useUserStore();
    const navigate = useNavigate();

    const { id } = useParams();
    const { data, isLoading, refetch } = getPostDetailQuery(id || '');
    const deletePost = deletePostMutation(id || '');

    const handleDelete = () => {
        // deletePost mutation의 mutate 메서드를 인수 없이 호출
        deletePost.mutate(undefined, {
            // mutation이 성공 시
            onSuccess: () => {
                navigate(-1); // 바로 직전 페이지 이동
            },
            // mutation 중 오류 발생
            onError: (error) => {
                console.error('게시물 삭제 중 오류 발생:', error);
                alert('게시물 삭제에 실패했습니다.');
            }
        });
    };

    if (isLoading) {
        return <></>;
    }

    console.log(data);
    return (
        <div className='feed-detail-page'>
            <div className='feed-content'>
                {/* <PostCard post={post} /> */}
                <PostCard post={data!.data.post} refetch={refetch} />
            </div>
            <div className='feed-comment'>
                <CommnetContainer />
            </div>
            {/* {userId === post.userId._id ? ( */}
            {userId === data?.data.post.userId._id ? (
                <div className='btn btn-delete' onClick={handleDelete}>
                    삭제
                </div>
            ) : null}
        </div>
    );
};

export default FeedDetailPage;
