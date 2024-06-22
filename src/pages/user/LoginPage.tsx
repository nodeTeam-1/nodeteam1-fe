/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './user.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { userLoginMutation } from '../../hooks/loginHook';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
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
            navigate('/');
        }
    });
    return (
        <div>
            LoginPage
            <div>
                <div>LOGO</div>
                <div>
                    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => formSubmit(event)}>
                        <div>
                            <input type='email' name='email' placeholder='email' onChange={handleChange} />
                        </div>
                        <div>
                            <input type='password' name='password' placeholder='password' onChange={handleChange} />
                        </div>
                        <div>
                            <button type='submit'>로그인</button>
                        </div>
                    </form>
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
            <div>
                계정이없으신가요?
                <Link to={'/user/register'}>가입하기</Link>
            </div>
        </div>
    );
};

export default LoginPage;
