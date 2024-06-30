/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginMutation } from '../../hooks/useLoginHook';
import { useUserStore } from '../../store/userStore';
import { tokenLoginQuery } from '../../hooks/useLoginHook';
import './user.scss';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId, setUserId, setUserName, setUserProfileImage, setUserBio, setPostLike } = useUserStore();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // token으로 로그인 시도
    const { data, isLoading } = tokenLoginQuery('/user/profile');

    // 사용자 로그인 뮤테이션 훅 호출
    const mutation = userLoginMutation('/auth/login');

    useEffect(() => {
        console.log('data', data, 'isLoading', isLoading);
        if (!isLoading && data) {
            setUserId(data?.data.user._id);
            setUserName(data?.data.user.name);
            setUserProfileImage(data?.data.user.profileImage);
            setUserBio(data?.data.user.bio);
            setPostLike(data?.data.user.postLike);
            navigate('/');
        } else if (mutation.isSuccess && mutation.data && mutation.data.status === 200) { // 뮤테이션 성공 시 메인 페이지로 이동
            console.log('Mutation successful:', mutation.data);
            setUserId(mutation.data.data.user._id);
            setUserName(mutation.data.data.user.name);
            setUserProfileImage(mutation.data.data.user.profileImage);
            setUserBio(mutation.data.data.user.bio);
            setPostLike(mutation.data.data.user.postLike);
            sessionStorage.setItem("token", mutation.data.data.token);
            navigate('/');
        }
    }, [data, isLoading, mutation.isSuccess, mutation.data, userId, navigate]);


    // 입력 필드 변경 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // 폼 제출 핸들러
    const formSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        mutation.mutate(formData, {
            onError: (error: any) => {
                console.error('뮤테이션 에러:', error);

                // 에러 메시지 설정
                if (error.response?.data?.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('알 수 없는 오류가 발생했습니다');
                }
            }
        });
    };

    return (
        <div className='user-page'>
            <form onSubmit={formSubmit} className='form-container'>
                <div className='form-title'>로그인</div>
                <div className='input-wrap'>
                    <input
                        type='email'
                        name='email'
                        placeholder='이메일'
                        onChange={handleChange}
                    />
                </div>
                <div className='input-wrap'>
                    <input
                        type='password'
                        name='password'
                        placeholder='비밀번호'
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='btn btn-submit w-100'>로그인</button>
                {errorMessage && <p>{errorMessage}</p>}
                <div className='notice-wrap'>
                    계정이 없으신가요?
                    <Link to='/user/register'>회원가입</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
