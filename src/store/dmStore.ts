import { create } from 'zustand';

interface UserId {
    _id: string;
    name: string;
}

interface Message {
    userId: UserId;
    message: string;
    messageIndex: number;
}

interface DmStoreType {
    currentMessage: Message;
    deleteIndex: number | null;
    setCurrentMessage: (value: Message) => void;
    setDeleteIndex: (value: number) => void;
}

export const useDmStore = create<DmStoreType>((set) => ({
    currentMessage: {
        userId: {
            _id: '',
            name: ''
        },
        message: '',
        messageIndex: 0
    },
    deleteIndex: null,
    setCurrentMessage: (value) => {
        set(() => ({ currentMessage: value }));
    },
    setDeleteIndex: (value) => {
        set(() => ({ deleteIndex: value }));
    }
}));
