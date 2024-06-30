import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';
import Modal from '../components/modal/Modal';
import AddPostForm from '../components/addPostForm/AddPostForm';
import { useUserStore } from '../store/userStore'; // 사용자 상태 관리
import { useDmStore } from '../store/dmStore'; // DM 상태 관리
import './appLayout.scss';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    let sseEventSource: EventSource; // SSE 이벤트 소스
    const { userId, userDelete } = useUserStore();
    const { setCurrentMessage, setDeleteIndex } = useDmStore();
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 사용자 ID가 변경될 때마다 SSE 연결 및 이벤트 처리
    useEffect(() => {
        if (userId) {
            // SSE 연결 설정
            sseEventSource = new EventSource(`http://localhost:5002/events/${userId}`);

            // SSE 메시지 수신 핸들러
            sseEventSource.onmessage = (event) => {
                const newMessage = JSON.parse(event.data);
                console.log(newMessage);
                // 메시지 타입에 따라 상태 업데이트
                if (newMessage.type === 'send') {
                    setCurrentMessage(newMessage);
                } else if (newMessage.type === 'delete') {
                    setDeleteIndex(newMessage.messageIndex);
                }
            };

            // SSE 오류 핸들러
            sseEventSource.onerror = (error) => {
                console.error('EventSource failed:', error);
                sseEventSource.close();
            };

            // 컴포넌트 언마운트 시 SSE 연결 종료
            return () => {
                sseEventSource.close();
                userDelete();
            };
        }
    }, [userId, setCurrentMessage, setDeleteIndex, userDelete]);

    // 메인페이지 이동
    const goToMain = () => {
        navigate('/');
    };

    return (
        <div className='layout'>
            <ToastMessage />
            <Navbar setIsModalOpen={setIsModalOpen} />
            <header>
                <h1 className='page-logo' onClick={goToMain}>
                    <img src='/picktalk.png' alt='logo' />
                </h1>
            </header>
            <div className='layout-children'>{children}</div>
            {isModalOpen && (
                <Modal title='포스트 업로드'>
                    <AddPostForm setClose={setIsModalOpen} close={isModalOpen} />
                </Modal>
            )}
        </div>
    );
};

export default AppLayout;
