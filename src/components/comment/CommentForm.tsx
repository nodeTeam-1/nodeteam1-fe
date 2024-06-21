import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './comment.scss';

interface ICommentFormInput {
    comment: string;
}

interface CommentFormProps {
    onAddComment: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ICommentFormInput>();

    const onSubmit: SubmitHandler<ICommentFormInput> = (data) => {
        onAddComment(data.comment);
        reset(); // 제출 후 폼 초기화
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-container-comment'>
            <div>
                <label htmlFor='comment'>댓글</label>
                <textarea id='comment' {...register('comment', { required: '댓글이 입력되지 않았습니다.' })} />
                {errors.comment && <p>{errors.comment.message}</p>}
            </div>

            <button type='submit' className='btn btn-submit'>
                댓글 작성
            </button>
        </form>
    );
};

export default CommentForm;
