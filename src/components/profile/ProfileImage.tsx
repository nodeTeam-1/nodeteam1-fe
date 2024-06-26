import React from 'react';
import { getProfile } from '../../hooks/useUserProfile';
import './profile.scss';

interface ProfileImageProps {
    userId: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId }) => {
    const { data, isLoading, isError } = getProfile(userId);
    console.log('getProfile data', data?.data.user, isLoading, isError);

    if (isLoading) {
        return <div className='profile-image'>Loading...</div>;
    }

    if (isError || !data) {
        return <div className='profile-image'>Error loading profile image</div>;
    }

    const profileImageSrc = data?.data.user.profileImage;

    return (
        <div className='profile-image'>
            <img src={profileImageSrc} alt={`${data?.data.user.name}'s profile`} />
        </div>
    );
};

export default ProfileImage;
