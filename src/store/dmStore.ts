import { create } from 'zustand';

interface UserId {
    _id: string;
    name: string;
}

interface Message {
    userId: UserId;
    message: string;
}

interface DmStoreType {
    currentMessage: Message;
    setCurrentMessage: (value: Message) => void;
}

export const useDmStore = create<DmStoreType>((set) => ({
    currentMessage: {
        userId: {
            _id: '',
            name: ''
        },
        message: ''
    },
    setCurrentMessage: (value) => {
        set(() => ({ currentMessage: value }));
    }
}));
