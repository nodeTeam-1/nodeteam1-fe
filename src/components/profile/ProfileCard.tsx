import React from 'react';
import ProfileImage from './ProfileImage';
import ProfileContent from './ProfileContent';
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

interface ProfileCardProps {
    profileData: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
    return (
        <div className='profile-card'>
            <ProfileImage userId={''} />
            <ProfileContent profileData={profileData} />
        </div>
    );
};

export default ProfileCard;
