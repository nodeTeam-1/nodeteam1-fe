/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaCircleUser } from 'react-icons/fa6';
import './comment.scss';

interface ICommentFormInput {
    comment: string;
}

interface CommentFormProps {
    onAddComment: (comment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
    const { register, handleSubmit, reset, watch } = useForm<ICommentFormInput>();

    const commentValue = watch('comment', '');

    useEffect(() => {
        autoResizeTextarea();
    }, [commentValue]);

    const onSubmit: SubmitHandler<ICommentFormInput> = (data) => {
        onAddComment(data.comment);
        reset(); // 제출 후 폼 초기화
    };

    const autoResizeTextarea = () => {
        const textarea: HTMLTextAreaElement = document.getElementById('comment') as HTMLTextAreaElement;

        if (textarea) {
            textarea.style.height = '40px';
            const height = textarea.scrollHeight; // 높이
            if (height + 8 >= 88) return (textarea.style.height = `${88}px`);
            textarea.style.height = `${height + 8}px`;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-wrapper'>
            <div className='form-inner-section'>
                <FaCircleUser size={40} color={'#e8e8e8'} />
                <textarea
                    id='comment'
                    {...register('comment', { required: '댓글이 입력되지 않았습니다.' })}
                    placeholder='댓글 달기...'
                />
                {commentValue && (
                    <button type='submit' className='form-textarea-submit'>
                        게시
                    </button>
                )}
            </div>
        </form>
    );
};

export default CommentForm;
