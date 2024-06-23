import React from 'react';
import ProfileImage from './ProfileImage';
import ProfileContent from './ProfileContent';
import './profile.scss';

const ProfileCard: React.FC = () => {
    return (
        <div className='profile-card'>
            <ProfileImage userId={''} />
            <ProfileContent />
        </div>
    );
};

export default ProfileCard;
