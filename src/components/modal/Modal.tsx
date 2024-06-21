import React from 'react';
import './modal.scss';

interface ModalProps {
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
    return (
        <div className='modal-container'>
            <div className='modal-wrap'>
                <h2 className='modal-title'>{title}</h2>
                <div className='modal-content'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
