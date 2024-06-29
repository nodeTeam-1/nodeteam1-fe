/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaCircleUser } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useCommentStore } from '../../store/commentStroe';
import { useCommentRegister, useReplyCommentRegister } from '../../hooks/useCommentHook';
import './comment.scss';

interface ICommentFormInput {
    comment: string;
}

const CommentForm: React.FC = () => {
    const { postId } = useParams();
    const { register, handleSubmit, reset, watch, setValue } = useForm<ICommentFormInput>();
    const { commentId, userName: targetUser, reset: targetReset } = useCommentStore();
    const { mutate: replyRegister } = useReplyCommentRegister();
    const { mutate: commentRegister } = useCommentRegister();

    const commentValue = watch('comment', '');

    useEffect(() => {
        autoResizeTextarea();
    }, [commentValue]);

    useEffect(() => {
        if (targetUser) {
            setValue('comment', `@${targetUser} `);
        }
    }, [targetUser, setValue]);

    const onSubmit: SubmitHandler<ICommentFormInput> = ({ comment }) => {
        targetUser
            ? replyRegister({ commentId, content: comment })
            : commentRegister({ postId: postId!, content: comment });
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

    // card와 연동데잍 필요 답글을 눌렀을때
    // 답글 취소
    // zustand로 작성 name, userId, commentId

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-wrapper'>
            <div className='form-inner-section'>
                <FaCircleUser size={36} color={'#e8e8e8'} />
                <div className='form-middle-area'>
                    {targetUser && (
                        <div className='form-middle-reply'>
                            {targetUser} 님에게 답글 남기는 중 <IoClose size={16} onClick={targetReset} />
                        </div>
                    )}
                    <textarea
                        id='comment'
                        {...register('comment', { required: '댓글이 입력되지 않았습니다.' })}
                        placeholder='댓글 달기...'
                    />
                </div>
                <div className='form-textarea-submit-area'>
                    {commentValue && (
                        <button type='submit' className='form-textarea-submit'>
                            게시
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
