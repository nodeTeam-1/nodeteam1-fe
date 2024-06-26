import React from 'react';
import { useUserStore } from '../store/userStore';
import { useLocation } from 'react-router';
import { MdHomeFilled } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { MdOutlinePlace } from 'react-icons/md';
import { MdOutlineAddBox } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';
import { MdOutlineLogout } from 'react-icons/md';
import ProfileImage from './profile/ProfileImage';

const Navbar: React.FC = () => {
    const { userId, setUserId } = useUserStore();
    console.log('userId', userId);

    const logoutClick = () => {
        setUserId('');
        sessionStorage.removeItem('token');
    };

    //메인 페이지를 제외한 곳에선 보이지 않음. ex)로그인 페이지, 회원가입 페이지
    const location = useLocation();
    const excludePaths = /^\/user(\/|$)/;
    // if (location.pathname === '/user/*') {
    if (excludePaths.test(location.pathname)) {
        return <></>;
    }
    return (
        <nav className='navbar'>
            <ul className='nav-list'>
                <li className='nav-item'>
                    홈
                    <MdHomeFilled />
                </li>
                <li className='nav-item'>
                    검색
                    <IoIosSearch />
                </li>
                <li className='nav-item'>
                    위치
                    <MdOutlinePlace />
                </li>
                <li className='nav-item'>
                    게시글
                    <MdOutlineAddBox />
                </li>
                <li className='nav-item'>
                    메세지
                    <LuSend />
                </li>
                <li className='nav-item' onClick={logoutClick}>
                    로그아웃
                    <MdOutlineLogout />
                </li>
                <li className='nav-item'>
                    <ProfileImage userId={''} />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
