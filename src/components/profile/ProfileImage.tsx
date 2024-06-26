import React from 'react';
import { getProfile } from '../../hooks/useUserProfile';
import './profile.scss';

interface ProfileImageProps {
    userId: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId }) => {
    const { data, isLoading, isError } = getProfile(userId);
    console.log('getProfile data', data?.data, isLoading, isError);
    console.log('profileImage', data?.data.user);

    if (isLoading) {
        return <div className='profile-image'>Loading...</div>;
    }

    if (isError || !data) {
        return <div className='profile-image'>Error loading profile image</div>;
    }

    const profileImageSrc = data?.data.user.profileImage; // 프로필 이미지 URL 경로

    return (
        <div className='profile-image'>
            <img src={profileImageSrc} alt={`${data?.data.user.name}'s profile`} />
        </div>
    );
};

export default ProfileImage;
