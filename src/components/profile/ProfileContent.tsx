import React from 'react';
import { IoIosSettings } from 'react-icons/io';
import './profile.scss';

const ProfileContent: React.FC = () => {
    return (
        <div className='profile-content'>
            <ul className='profile-actions'>
                <li>아이디</li>
                <li>프로필 편집</li>
                <li>보관된 스토리 보기</li>
                <li>
                    <IoIosSettings />
                </li>
            </ul>
            <ul className='profile-stats'>
                <li>게시물 220</li>
                <li>팔로워 220</li>
                <li>팔로우 220</li>
            </ul>
            <div className='profile-bio'>프로필 소개문구</div>
        </div>
    );
};

export default ProfileContent;
