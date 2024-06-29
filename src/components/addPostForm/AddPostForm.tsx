import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createPostMutation } from './../../hooks/usePostHook';
import './addPostForm.scss';

// 폼 데이터 인터페이스
interface PostFormInput {
    title: string;
    category: string;
    photo: string;
    content: string;
    location: string;
    tags: string;
}

// 컴포넌트 props 인터페이스 정의
interface AddPostFormProps {
    setClose: (value: boolean) => void;
    close: boolean;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ setClose, close }) => {
    // react-hook-form 훅 사용
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PostFormInput>();

    // createPostMutation 훅 사용
    const mutation = createPostMutation();

    // 뮤테이션 성공 시 폼 리셋 및 모달 닫기
    useEffect(() => {
        if (mutation.isSuccess) {
            setClose(false);
            reset();
        }
    }, [mutation.isSuccess, setClose, reset]);

    // 폼 제출 핸들러
    const onSubmit: SubmitHandler<PostFormInput> = async (data) => {
        const postData = {
            title: data.title,
            category: data.category,
            images: data.photo, // 사진을 텍스트로 입력 (임시)
            content: data.content,
            location: data.location,
            tags: data.tags.split(',').map((tag) => tag.trim()) // 태그를 쉼표로 구분된 문자열에서 배열로 변환
        };

        // 뮤테이션 실행
        mutation.mutate(postData, {
            onError: (error) => {
                console.error('Error uploading post:', error);
            }
        });
    };

    // 취소 버튼 핸들러
    const handleCancel = () => {
        setClose(false);
        reset();
    };

    // 모달이 닫혀있으면 null 반환
    if (!close) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-container-post'>
            <div className='input-wrap title-input'>
                <label htmlFor='title'>제목</label>
                <input type='text' id='title' {...register('title', { required: '제목을 입력해 주세요.' })} />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div className='input-wrap category-input'>
                <label htmlFor='category'>카테고리</label>
                <input type='text' id='category' {...register('category', { required: '카테고리를 입력해 주세요.' })} />
                {errors.category && <p>{errors.category.message}</p>}
            </div>

            <div className='input-wrap photo-input'>
                <label htmlFor='photo'>사진</label>
                <input type='text' id='photo' {...register('photo')} />
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
                <input type='text' id='tags' {...register('tags')} />
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
