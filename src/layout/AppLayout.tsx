// import React, { ReactNode, useEffect } from 'react';
import React, { ReactNode, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';
import { useUserStore } from '../store/userStore';
import { useDmStore } from '../store/dmStore';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    let sseEventSource: EventSource;
    const { userId, userDelete } = useUserStore();
    const { setCurrentMessage, setDeleteIndex } = useDmStore();
    useEffect(() => {
        console.log(userId);
        if (userId) {
            sseEventSource = new EventSource(`http://localhost:5002/events/${userId}`);
            sseEventSource.onmessage = (event) => {
                const newMessage = JSON.parse(event.data);
                console.log(newMessage);
                if (newMessage.type === 'send') {
                    setCurrentMessage(newMessage);
                } else if (newMessage.type === 'delete') {
                    setDeleteIndex(newMessage.messageIndex);
                }
            };

            sseEventSource.onerror = (error) => {
                console.error('EventSource failed:', error);
                sseEventSource.close();
            };

            //컴포넌트가 종료되면 실행
            return () => {
                sseEventSource.close();
                userDelete();
            };
        }
    }, [userId]);

    return (
        <>
            <ToastMessage />
            {children}
            <Navbar />
        </>
    );
};

export default AppLayout;
