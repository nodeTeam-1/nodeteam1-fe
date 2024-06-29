import React from 'react';
import { getUserListQuery } from '../../hooks/useUserHook';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../components/profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
import { useUserStore } from '../../store/userStore';
import './follow.scss';

interface UserInfo {
    _id: string;
    name: string;
    profileImage: string;
    bio: string;
}

const FollowListPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useUserStore();
    const { data } = getUserListQuery();
    console.log(data);

    const postClick = (id: string) => {
        navigate(`/dm/${id}`);
    };
    return (
        <div className='page-container'>
            <h2 className='page-title'>리스트</h2>
            {data?.data.user.map((element: UserInfo, index: number) =>
                element._id !== userId ? (
                    <div className='user-head' key={index}>
                        <ProfileImage name={element.name} profileImageSrc={element.profileImage} />
                        <ul className='user-info' onClick={() => postClick(element._id)}>
                            <li className='user-name'>{element.name}</li>
                        </ul>
                        <IoIosMore />
                    </div>
                ) : null
            )}
        </div>
    );
};

export default FollowListPage;
