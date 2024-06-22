import React from 'react';
import { useUserStore } from '../store/userStore';
import { useLocation } from 'react-router';

const Navbar: React.FC = () => {
    const { user } = useUserStore();

    //메인 페이지를 제외한 곳에선 보이지 않음. ex)로그인 페이지, 회원가입 페이지
    const location = useLocation();
    if (location.pathname !== '/') {
        return <></>;
    }
    return (
        <div>
            {'[Navbar]'} 이름: {`"` + user + `"`} 님 로그인 중!
        </div>
    );
};

export default Navbar;
