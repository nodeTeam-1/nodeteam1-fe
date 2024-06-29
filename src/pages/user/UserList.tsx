import React from 'react';
import { getUserListQuery } from '../../hooks/useUserHook';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../components/profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
import { useUserStore } from '../../store/userStore';

interface UserInfo {
    _id: string;
    name: string;
    profileImage: string;
    bio: string;
}

export const UserList: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useUserStore();
    const { data } = getUserListQuery();
    console.log(data);

    const postClick = (id: string) => {
        navigate(`/dm/${id}`);
    };
    return (
        <div className='user-list-container'>
            {data?.data.user.map((element: UserInfo, index: number) =>
                element._id !== userId ? (
                    <div className='user-list-wrap' key={index}>
                        <div className='user-list'>
                            <ProfileImage name={element.name} profileImageSrc={element.profileImage} />
                            <ul className='user-info' onClick={() => postClick(element._id)}>
                                <li className='user-name'>{element.name}</li>
                                <li className='user-bio'>BIO : {element.bio || 'bio'}</li>
                                {/* <li className='post-location'>{post.location}</li> */}
                            </ul>
                            <IoIosMore />
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
};
