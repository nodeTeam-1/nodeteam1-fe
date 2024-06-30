import React, { useEffect } from 'react';
// import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './ModifyProfileForm.scss';
import { updateProfileMutation } from '../../../hooks/useProfileHook';
import { useUserStore } from '../../../store/userStore';

// 폼 데이터 인터페이스
interface ProfileFormInput {
    profileImage: string;
    bio: string;
}

// 컴포넌트 props 인터페이스 정의
interface ModifyProfileForm {
    setOpenModal: (value: boolean) => void;
    openModal: boolean;
}

const ModifyProfileForm: React.FC<ModifyProfileForm> = ({ setOpenModal, openModal }) => {
    const { setUserProfileImage, setUserBio } = useUserStore();

    // react-hook-form 훅 사용
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ProfileFormInput>();

    const updateMutatuon = updateProfileMutation();

    // 뮤테이션 성공 시 폼 리셋 및 모달 닫기
    useEffect(() => {
        if (updateMutatuon.isSuccess) {
            console.log(updateMutatuon);
            setOpenModal(false);
            reset();
            setUserProfileImage(updateMutatuon.data?.data.user.profileImage);
            setUserBio(updateMutatuon.data?.data.user.bio);
        }
    }, [updateMutatuon.isSuccess]);

    // 폼 제출 핸들러
    const onSubmit: SubmitHandler<ProfileFormInput> = async (data) => {
        const profileData = {
            profileImage: data.profileImage, // 사진을 텍스트로 입력 (임시)
            bio: data.bio
        };

        // 뮤테이션 실행
        updateMutatuon.mutate(profileData, {
            /* 32~41에 정의 되어있음. 여기서 로직을 넣으면 isSuccess가 true가 되기전 실행하여서 데이터가 제대로 들어가지가 않음.
            onSuccess: () => {
                console.log(updateMutatuon);
                setOpenModal(false);
                reset();
                setUserProfileImage(updateMutatuon.data?.data.user.profileImage);
                setUserBio(updateMutatuon.data?.data.user.bio);
            },
            */
            onError: (error) => {
                console.error('Error uploading post:', error);
            }
        });
    };

    // 취소 버튼 핸들러
    const handleCancel = () => {
        setOpenModal(false);
        reset();
    };

    // 모달이 닫혀있으면 null 반환
    if (!openModal) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-container-post'>
            <div className='input-wrap content-input'>
                <label htmlFor='content'>자기 소개 내용</label>
                <textarea id='content' {...register('bio')} />
                {errors.bio && <p>{errors.bio.message}</p>}
            </div>

            <div className='input-wrap photo-input'>
                <label htmlFor='profileImage'>프로필 사진</label>
                <input type='text' id='photo' {...register('profileImage')} />
                {errors.profileImage && <p>{errors.profileImage.message}</p>}
            </div>

            {/* <div className='input-wrap location-input'>
                <label htmlFor='location'>위치</label>
                <input
                    type='text'
                    id='location'
                    {...register('location', { required: '해당 위치가 존재하지 않습니다.' })}
                />
                {errors.location && <p>{errors.location.message}</p>}
            </div> */}

            <div className='btn-wrap gap'>
                <button type='button' className='btn btn-cancel' onClick={handleCancel}>
                    변경 취소
                </button>
                <button type='submit' className='btn btn-submit'>
                    프로필 변경
                </button>
            </div>
        </form>
    );
};

export default ModifyProfileForm;
