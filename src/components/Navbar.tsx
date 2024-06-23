import React from 'react';
import { useUserStore } from '../store/userStore';
import { useLocation } from 'react-router';

const Navbar: React.FC = () => {
    const { user, setUser } = useUserStore();
    const logoutClick = () => {
        setUser('');
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
        <div className='flex-container'>
            <div className='navbar-text'>
                {'[Navbar]'} 이름: {`"` + user + `"`} 님 로그인 중!
            </div>
            <div className='flex-item'>
                <button className='logout-button' onClick={logoutClick}>
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default Navbar;
