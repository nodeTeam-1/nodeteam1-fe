import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './addPostForm.scss';

interface IFormInput {
    photo: FileList;
    content: string;
    location: string;
    tags: string;
}

interface AddPostFormProps {
    setClose: (value: boolean) => void;
    close: boolean;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ setClose, close }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        // API
        setClose(false);
        reset();
    };

    const handleCancel = () => {
        setClose(false);
        reset();
    };

    if (!close) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-container-post'>
            <div className='input-wrap photo-input'>
                <label htmlFor='photo'>사진</label>
                <input type='file' id='photo' {...register('photo', { required: '사진을 등록해 주세요' })} />
                {errors.photo && <p>{errors.photo.message}</p>}
            </div>

            <div className='input-wrap content-input'>
                <label htmlFor='content'>내용</label>
                <textarea id='content' {...register('content', { required: '내용을 입력해 주세요.' })} />
                {errors.content && <p>{errors.content.message}</p>}
            </div>

            <div className='input-wrap location-input'>
                <label htmlFor='location'>위치</label>
                <input
                    type='text'
                    id='location'
                    {...register('location', { required: '해당 위치가 존재하지 않습니다.' })}
                />
                {errors.location && <p>{errors.location.message}</p>}
            </div>

            <div className='input-wrap tags-input'>
                <label htmlFor='tags'>태그(선택)</label>
                <input type='text' id='tags' />
            </div>
            <div className='btn-wrap gap'>
                <button type='button' className='btn btn-cancel' onClick={handleCancel}>
                    취소
                </button>
                <button type='submit' className='btn btn-submit'>
                    업로드
                </button>
            </div>
        </form>
    );
};

export default AddPostForm;
