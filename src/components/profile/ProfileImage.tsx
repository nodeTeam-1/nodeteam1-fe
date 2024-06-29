import React from 'react';
import './profile.scss';

interface ProfileImageProps {
    name: string;
    profileImageSrc: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ name, profileImageSrc }) => {
    return (
        <div className='profile-image'>
            <img src={profileImageSrc} alt={`${name}'s profile`} />
        </div>
    );
};

export default ProfileImage;
