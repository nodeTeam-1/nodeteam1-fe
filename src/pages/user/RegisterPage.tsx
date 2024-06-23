/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './user.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { userRegisterMutation } from '../../hooks/loginHook';

interface FormData {
    email: string;
    name: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        name: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const mutation = userRegisterMutation('/user/register');
    const formSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { email, name, password } = formData;
        mutation.mutate({ email, password, name }, {
            onError: (error: any) => {
                if (error.response?.data?.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An unknown error occurred');
                }
            }
        });
        /*
            //성공하면
            mutation.data.status에 백엔드가 200이 들어옴
            mutation.data.data에 백엔드가 보내준 데이터가 들어옴

            //에러시
            mutation.error.response.status에 백엔드가 보내준 500이 들어옴
            mutation.error.response.data에 백엔드가 보내준 데이터가 들어옴
            mutation.error.response.data.message에 백엔드가 보내준 에러 메시지가 들어옴
        */
    };

    useEffect(() => {
        if (mutation.isSuccess && mutation.data.status === 200) {
            navigate('/user/login');
        }
    });
    return (
        <div className='user-page'>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => formSubmit(event)} className='form-container'>
            <div className="form-title">회원가입</div>
                <div>친구들의 사진과 동영상을 보려면 가입하세요.</div>
                <div className='input-wrap'>
                    <input type='text' name='name' placeholder='이름' onChange={handleChange} />
                </div>
                <div className='input-wrap'>
                    <input type='email' name='email' placeholder='이메일 주소' onChange={handleChange} />
                </div>
                <div className='input-wrap'>
                    <input type='password' name='password' placeholder='비밀번호' onChange={handleChange} />
                </div>
                <button type='submit' className='btn btn-submit w-100'>회원가입</button>

            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {mutation.isError && <p>다시 시도해주세요.</p>}
            {mutation.isSuccess && mutation.data && (
                <p>성공적으로 가입되었습니다! 환영합니다, {mutation.data.data.status}</p>
            )}

            <div>
                계정이 있으신가요?
                <Link to={'/user/login'}>로그인</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
