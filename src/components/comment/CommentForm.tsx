/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
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
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<ICommentFormInput>();

    const commentValue = watch('comment', '');

    const onSubmit: SubmitHandler<ICommentFormInput> = (data) => {
        onAddComment(data.comment);
        reset(); // 제출 후 폼 초기화
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-container-comment'>
            <section className='comment-profile-section'>
                <div className='comment-none-profile'>
                    <FaCircleUser size={36} color={'#e8e8e8'} />
                </div>
            </section>
            <div className='comment-textarea'>
                <textarea
                    id='comment'
                    {...register('comment', { required: '댓글이 입력되지 않았습니다.' })}
                    placeholder='댓글 달기...'
                />
                {errors.comment && <p>{errors.comment.message}</p>}
            </div>
            {commentValue && (
                <button type='submit' className='btn btn-submit'>
                    게시
                </button>
            )}
        </form>
    );
};

export default CommentForm;
