import React from 'react';
import { IoIosSettings } from 'react-icons/io';
import './profile.scss';

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
    return (
        <div className='profile-content'>
            <ul className='profile-actions'>
                <li>{profileData.name}</li>
                <li>프로필 편집</li>
                <li>보관된 스토리 보기</li>
                <li>
                    <IoIosSettings />
                </li>
            </ul>
            <ul className='profile-stats'>
                <li>게시물 {profileData.postLike.length}</li>
                <li>팔로워 {profileData.followers.length}</li>
                <li>팔로우 {profileData.followings.length}</li>
            </ul>
            <div className='profile-bio'>{profileData.bio}</div>
        </div>
    );
};

export default ProfileContent;
