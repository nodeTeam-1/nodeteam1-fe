/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './user.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    //api.post == react-query: mutation
    const mutation = userLoginMutation('/auth/login');
    const formSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { email, password } = formData;
        mutation.mutate({ email, password }, {
            onError: (error: any) => {
                if (error.response?.data?.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An unknown error occurred');
                }
            }
        });
    };

    useEffect(() => {
        if (mutation.isSuccess && mutation.data.status === 200) {
            setUser(mutation.data.data.user.name);
            sessionStorage.setItem("token", mutation.data.data.token);
            navigate('/');
        }
        if (user) {
            navigate('/');
        }
    }, [mutation.isSuccess, mutation.data, user]);
    return (
        <div className='user-page'>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => formSubmit(event)} className='form-container'>
                <div className="form-title">로그인</div>
                <div className='input-wrap'>
                    <input type='email' name='email' placeholder='email' onChange={handleChange} />
                </div>
                <div className='input-wrap'>
                    <input type='password' name='password' placeholder='password' onChange={handleChange} />
                </div>
                <button type='submit' className='btn btn-submit w-100'>로그인</button>

                {errorMessage && <p>{errorMessage}</p>}
            </form>
            <div>
                계정이없으신가요?
                <Link to={'/user/register'}>가입하기</Link>
            </div>
        </div>
    );
};

export default LoginPage;
