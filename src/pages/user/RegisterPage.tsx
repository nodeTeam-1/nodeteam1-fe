/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './user.scss';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterMutation } from './../../hooks/loginHook';

interface FormData {
    email: string;
    name: string;
    password: string;
    level: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        name: '',
        level: 'public'
    });

    // 에러 메시지 상태 관리
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 입력 필드 변경 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // 사용자 등록 뮤테이션 훅 호출
    const mutation = userRegisterMutation('/user/register');

    // 폼 제출 핸들러
    const formSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const { email, name, password } = formData;
        mutation.mutate(
            { email, password, name },
            {
                onError: (error: any) => {
                    console.error('뮤테이션 에러:', error);

                    // 에러 메시지 설정
                    if (error.response) {
                        if (error.response.data?.message) {
                            setErrorMessage(error.response.data.message);
                        } else {
                            setErrorMessage(`서버 응답 오류: ${error.response.status}`);
                        }
                    } else if (error.request) {
                        setErrorMessage('서버 응답 없음. 네트워크 상태를 확인해주세요.');
                    } else {
                        setErrorMessage(`에러 발생: ${error.message}`);
                    }
                },
            }
        );
    };

    // 뮤테이션 성공 시 로그인 페이지로 이동
    useEffect(() => {
        if (mutation.isSuccess && mutation.data && mutation.data.status === 200) {
            console.log('Mutation successful:', mutation.data);
            navigate('/user/login');
        }
    }, [mutation.isSuccess, mutation.data, navigate]);


    return (
        <div className='user-page'>
            <form onSubmit={formSubmit} className='form-container'>
                <div className='form-title'>회원가입</div>
                <div className='text-area'>친구들의 사진과 동영상을 보려면 가입하세요.</div>
                <div className='input-wrap'>
                    <input
                        type='text'
                        name='name'
                        placeholder='이름'
                        onChange={handleChange}
                    />
                </div>
                <div className='input-wrap'>
                    <input
                        type='email'
                        name='email'
                        placeholder='이메일 주소'
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
                <button type='submit' className='btn btn-submit w-100'>회원가입</button>
                {errorMessage && <p>{errorMessage}</p>}
                {mutation.isError && <p>다시 시도해주세요.</p>}
                {mutation.isSuccess && mutation.data && mutation.data.data && (
                    <p>성공적으로 가입되었습니다! 환영합니다, {mutation.data.data.status}</p>
                )}
                <div className='notice-wrap'>
                    계정이 있으신가요?
                    <Link to='/user/login'>로그인</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
