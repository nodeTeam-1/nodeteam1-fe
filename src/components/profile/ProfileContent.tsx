import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosSettings } from 'react-icons/io';
import './profile.scss';
import Modal from '../modal/Modal';
import ModifyProfileForm from './modifyProfileForm/ModifyProfileForm';
import { useUserStore } from '../../store/userStore';

interface Profile {
    _id: string;
    email: string;
    name: string;
    level: string;
    // isVerify: boolean;
    // verificationCode: string;
    // timerId: string;
    profileImage: string;
    bio: string;
    followers: string[];
    followings: string[];
    postLike: string[];
    commentLike: string[];
    bookMark: string[];
    // createdAt: string;
    // updatedAt: string;
}

interface ProfileContentProps {
    profileData: Profile;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profileData }) => {
    // console.log('profileData', profileData);
    const { id } = useParams();
    const { userId, userName, userBio } = useUserStore();
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <div className='profile-content'>
            <ul className='profile-actions'>
                <li>{userId === id ? userName : profileData.name}님</li>
                {userId === id ? (
                    <>
                        <li onClick={() => setOpenModal(true)}>프로필 편집</li>
                        {/* <li>보관된 스토리 보기</li> */}
                        <li>
                            <IoIosSettings />
                        </li>
                    </>
                ) : null}
            </ul>
            <ul className='profile-stats'>
                <li>게시물 {profileData.postLike.length}</li>
                <li>팔로워 {profileData.followers.length}</li>
                <li>팔로우 {profileData.followings.length}</li>
            </ul>
            <div className='profile-bio'>{userId === id ? userBio : profileData.bio}</div>
            {openModal && (
                <Modal title='프로필 편집'>
                    <ModifyProfileForm openModal={openModal} setOpenModal={setOpenModal} />
                </Modal>
            )}
        </div>
    );
};

export default ProfileContent;
