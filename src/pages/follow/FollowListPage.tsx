import React from 'react';
import { getUserListQuery } from '../../hooks/useUserHook';
import { useUserStore } from '../../store/userStore';
import UserListItem from './../../components/profile/UserListItem';
import './follow.scss';

interface UserInfo {
    _id: string;
    name: string;
    profileImage: string;
    bio: string;
}

const FollowListPage: React.FC = () => {
    const { userId } = useUserStore();
    const { data } = getUserListQuery();
    console.log(data);

    return (
        <div className='page-container follow-page'>
            <h2 className='page-title'>리스트</h2>
            {data?.data.user.map((element: UserInfo) => (
                <UserListItem key={element._id} user={element} userId={userId} />
            ))}
        </div>
    );
};

export default FollowListPage;
