import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteDmMutation, getDmListenerQuery, sendDmMutation } from '../../hooks/useDmHook';
import { getProfileQuery } from '../../hooks/useProfileHook';
import { useDmStore } from '../../store/dmStore';
import { useUserStore } from '../../store/userStore';
import './dm.scss';

interface User {
    _id: string;
    name: string;
}
// DM 데이터 타입 정의
interface Message {
    userId: User;
    message: string;
    messageIndex: number;
    isDeleted: boolean;
}

export const DmPage = () => {
    const { userId, userName } = useUserStore();
    const { currentMessage, deleteIndex } = useDmStore();
    const [sendMsg, setSendMsg] = useState<string>('');
    const [msgStorage, setMsgStorage] = useState<Message[]>([]);
    const { id } = useParams();

    const [queryStat, setQueryStat] = useState<boolean>(true);
    const dmResponse = getDmListenerQuery(id || '', queryStat);
    const userResponse = getProfileQuery(id || '');
    const sendMutation = sendDmMutation();
    const deleteMutation = deleteDmMutation();

    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // msg 전송 로직
        if (id) {
            sendMutation.mutate({ reciveId: id, message: sendMsg, messageIndex: msgStorage.length });
        }
        setMsgStorage([
            ...msgStorage,
            {
                userId: {
                    _id: userId,
                    name: userName
                },
                message: sendMsg,
                messageIndex: msgStorage.length,
                isDeleted: false
            }
        ]);
        setSendMsg('');
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSendMsg(event.target.value);
    };

    const chattingDeleteClick = (user: User, msg: string, messageIndex: number) => {
        if (window.confirm(`[${user.name}님] ${msg}\n해당 대화를 삭제하시겠습니까?`) && id) {
            deleteMutation.mutate({ reciveId: id, messageIndex });

            setMsgStorage((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.messageIndex === messageIndex ? { ...msg, isDeleted: true, message: '삭제되었습니다.' } : msg
                )
            );
        }
    };

    useEffect(() => {
        if (dmResponse.isLoading || !dmResponse.data) return;

        console.log(dmResponse.isLoading, dmResponse.data.data.dm);
        setMsgStorage(dmResponse.data.data.dm.messages);
        setQueryStat(false);
    }, [dmResponse.isLoading, dmResponse.data]);

    useEffect(() => {
        console.log(currentMessage);
        setMsgStorage([...msgStorage, { ...currentMessage, isDeleted: false }]);
    }, [currentMessage]);

    useEffect(() => {
        if (deleteIndex !== undefined || null) {
            setMsgStorage((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.messageIndex === deleteIndex ? { ...msg, isDeleted: true, message: '삭제되었습니다.' } : msg
                )
            );
        }
    }, [deleteIndex]);

    return (
        <div className='page-container dm-page'>
            <h2 className='page-title'>{userResponse?.data?.data.user.name}님과의 대화</h2>
            <ul>
                {msgStorage?.map((msg: Message, index: number) => (
                    <li key={index} onClick={() => chattingDeleteClick(msg.userId, msg.message, msg.messageIndex)}>
                        <b>[{msg.userId.name} 님]</b> {msg.message}
                    </li>
                ))}
            </ul>
            <form onSubmit={formSubmit} className='form-container'>
                <div className='input-wrap'>
                    <input type='text' placeholder='전송 할 메시지' value={sendMsg} onChange={handleChange} />
                </div>
                <button type='submit' className='btn btn-submit'>
                    전송
                </button>
            </form>
        </div>
    );
};
