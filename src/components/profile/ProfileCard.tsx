import React from 'react';
import ProfileImage from './ProfileImage';
import ProfileContent from './ProfileContent';

const ProfileCard: React.FC = () => {
    return (
        <div className='profile-card'>
            <ProfileImage />
            <ProfileContent />
        </div>
    );
};

export default ProfileCard;
