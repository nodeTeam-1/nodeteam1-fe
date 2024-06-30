import React from 'react';
import './profile.scss';
import { useNavigate } from 'react-router-dom';

interface ProfileImageProps {
    userId: string;
    name: string;
    profileImageSrc: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId, name, profileImageSrc }) => {
    const navigate = useNavigate();
    return (
        <div className='profile-image' onClick={() => navigate(`/feed/${userId}`)}>
            <img src={profileImageSrc} alt={`${name}'s profile`} />
        </div>
    );
};

export default ProfileImage;
