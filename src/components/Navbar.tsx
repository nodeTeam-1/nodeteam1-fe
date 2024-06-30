import React from 'react';
import { useUserStore } from '../store/userStore'; // 사용자 상태 관리
import { useLocation } from 'react-router'; // 현재 경로 정보를 얻기 위해 사용
import { useNavigate } from 'react-router-dom'; // 경로 이동을 위해 사용
import ProfileImage from './profile/ProfileImage';
import { MdHomeFilled } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
// import { MdOutlinePlace } from 'react-icons/md';
import { MdOutlineAddBox } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';
import { MdOutlineLogout } from 'react-icons/md';

// NavbarProps 인터페이스 정의
interface NavbarProps {
    setIsModalOpen: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsModalOpen }) => {
    const navigate = useNavigate();
    const { userId, userName, userProfileImage, userDelete } = useUserStore();

    // 로그아웃 클릭 시 사용자 상태 삭제 및 토큰 제거
    const logoutClick = () => {
        userDelete();
        sessionStorage.removeItem('token');
        navigate('/user/login');
    };

    // 메세지 클릭 시 사용자 리스트 페이지로 이동
    const dmClick = () => {
        navigate('/follow');
    };

    const location = useLocation(); // 현재 경로 정보
    const excludePaths = /^\/user(\/|$)/; // 제외할 경로 패턴

    // 특정 경로에서는 네비게이션 바를 표시하지 않음
    if (excludePaths.test(location.pathname)) {
        return <></>;
    }

    // 프로필 이미지 클릭 시 피드 페이지로 이동
    const goToMyFeedPage = () => {
        navigate(`/feed/${userId}`);
    };

    // 게시글 아이콘 클릭 시 모달 열기
    const openPostModal = () => {
        setIsModalOpen(true);
    };

    return (
        <nav className='navbar'>
            <ul className='nav-list'>
                <li className='nav-item' onClick={() => navigate('/')}>
                    홈
                    <MdHomeFilled />
                </li>
                <li className='nav-item'>
                    검색
                    <IoIosSearch />
                </li>
                {/* <li className='nav-item'>
                    위치
                    <MdOutlinePlace />
                </li> */}
                <li className='nav-item' onClick={openPostModal}>
                    게시글
                    <MdOutlineAddBox />
                </li>
                <li className='nav-item' onClick={dmClick}>
                    메세지
                    <LuSend />
                </li>
                <li className='nav-item' onClick={logoutClick}>
                    로그아웃
                    <MdOutlineLogout />
                </li>
                <li className='nav-item' onClick={goToMyFeedPage}>
                    <ProfileImage name={userName} profileImageSrc={userProfileImage} />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
