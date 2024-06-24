/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './user.scss';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginMutation } from '../../hooks/loginHook';
import { useUserStore } from '../../store/userStore';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUserStore();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 입력 필드 변경 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // 사용자 로그인 뮤테이션 훅 호출
    const mutation = userLoginMutation('/auth/login');

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

    // 뮤테이션 성공 시 메인 페이지로 이동
    useEffect(() => {
        if (mutation.isSuccess && mutation.data && mutation.data.status === 200) {
            console.log('Mutation successful:', mutation.data);
            setUser(mutation.data.data.user.name);
            sessionStorage.setItem("token", mutation.data.data.token);
            navigate('/');
        }
        if (user) {
            navigate('/');
        }
    }, [mutation.isSuccess, mutation.data, user, navigate]);

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
