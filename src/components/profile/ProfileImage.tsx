import React from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import './profile.scss';

interface ProfileImageProps {
    userId: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId }) => {
    const { data, isLoading, isError } = useUserProfile(userId);
    console.log(data, isLoading, isError);
    /*
    if (isLoading) {
        return <div className='profile-image'>Loading...</div>;
    }

    if (isError || !data) {
        return <div className='profile-image'>Error loading profile image</div>;
    }

    const profileImageSrc = data.profileImage; // 프로필 이미지 URL 경로
    */
    return (
        <></>
        // <div className='profile-image'>
        //     <img src={profileImageSrc} alt={`${data.name}'s profile`} />
        // </div>
    );
};

export default ProfileImage;
