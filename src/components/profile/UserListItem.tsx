import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import { IoIosMore } from 'react-icons/io';

interface UserInfo {
    _id: string;
    name: string;
    profileImage: string;
    bio: string;
}

interface UserListItemProps {
    user: UserInfo;
    userId: string;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, userId }) => {
    const navigate = useNavigate();

    const postClick = (id: string) => {
        navigate(`/dm/${id}`);
    };

    if (user._id === userId) {
        return null;
    }

    return (
        <div className='user-head' key={user._id}>
            <ProfileImage userId={user._id} name={user.name} profileImageSrc={user.profileImage} />
            <ul className='user-info' onClick={() => postClick(user._id)}>
                <li className='user-name'>{user.name}</li>
            </ul>
            <IoIosMore />
        </div>
    );
};

export default UserListItem;
