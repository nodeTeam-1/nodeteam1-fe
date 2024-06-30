import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosSettings } from 'react-icons/io';
import './profile.scss';
import Modal from '../modal/Modal';
import ModifyProfileForm from './modifyProfileForm/ModifyProfileForm';
import { useUserStore } from '../../store/userStore';
import { getUserListQuery } from '../../hooks/useUserHook';
import UserListItem from '../profile/UserListItem';

interface Profile {
    _id: string;
    email: string;
    name: string;
    level: string;
    profileImage: string;
    bio: string;
    followers: string[];
    followings: string[];
    postLike: string[];
    commentLike: string[];
    bookMark: string[];
}

interface UserInfo {
    _id: string;
    name: string;
    profileImage: string;
    bio: string;
}

interface ProfileContentProps {
    profileData: Profile;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profileData }) => {
    const { id } = useParams();
    const { userId, userBio } = useUserStore();
    const [showProfileFormModal, setShowProfileFormModal] = useState<boolean>(false);
    const [showFollowingsModal, setShowFollowingsModal] = useState<boolean>(false);
    const [showFollowersModal, setShowFollowersModal] = useState<boolean>(false);
    const { data } = getUserListQuery();

    return (
        <div className='profile-content'>
            {userId === id ? (
                <div className='profile-edit' onClick={() => setShowProfileFormModal(true)}>
                    프로필 편집
                    <IoIosSettings />
                </div>
            ) : null}
            <ul className='profile-stats'>
                <li>게시물 {profileData.postLike.length}</li>
                <li onClick={() => setShowFollowersModal(true)}>팔로워 {profileData.followers.length}</li>
                <li onClick={() => setShowFollowingsModal(true)}>팔로우 {profileData.followings.length}</li>
            </ul>
            <div className='profile-bio'>{userId === id ? userBio : profileData.bio}</div>
            {showProfileFormModal && (
                <Modal title='프로필 편집'>
                    <ModifyProfileForm openModal={showProfileFormModal} setOpenModal={setShowProfileFormModal} />
                </Modal>
            )}

            {showFollowingsModal && (
                <Modal title='팔로잉 목록'>
                    {data?.data.user.map((element: UserInfo) => (
                        <UserListItem key={element._id} user={element} userId={userId} />
                    ))}
                    <div className='btn-wrap'>
                        <button type='button' className='btn btn-default' onClick={() => setShowFollowingsModal(false)}>
                            확인
                        </button>
                    </div>
                </Modal>
            )}

            {showFollowersModal && (
                <Modal title='팔로워 목록'>
                    {data?.data.user.map((element: UserInfo) => (
                        <UserListItem key={element._id} user={element} userId={userId} />
                    ))}
                    <div className='btn-wrap'>
                        <button type='button' className='btn btn-default' onClick={() => setShowFollowersModal(false)}>
                            확인
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ProfileContent;
