/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './user.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { usePostMutation } from '../../hooks/loginHook';

interface FormData {
    email: string;
    name: string;
    nickName: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        name: '',
        nickName: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const mutation = usePostMutation('/user/register');
    const formSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { email, name, nickName, password } = formData;
        mutation.mutate({ email, password, name, level: nickName }, {
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
        <div>
            Register_Page
            <div>
                <div>LOGO</div>
                <div>
                    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => formSubmit(event)}>
                        <div>친구들의 사진과 동영상을 보려면 가입하세요.</div>
                        <div>
                            <input type='email' name='email' placeholder='이메일 주소' onChange={handleChange} />
                        </div>
                        <div>
                            <input type='text' name='name' placeholder='이름' onChange={handleChange} />
                        </div>
                        <div>
                            <input type='text' name='nickName' placeholder='사용자 이름' onChange={handleChange} />
                        </div>
                        <div>
                            <input type='password' name='password' placeholder='비밀번호' onChange={handleChange} />
                        </div>
                        <div>
                            <button type='submit'>가입</button>
                        </div>
                    </form>
                    {errorMessage && <p>{errorMessage}</p>}
                    {mutation.isError && <p>다시 시도해주세요.</p>}
                    {mutation.isSuccess && mutation.data && (
                        <p>성공적으로 가입되었습니다! 환영합니다, {mutation.data.data.status}</p>
                    )}
                </div>
            </div>
            <div>
                계정이 있으신가요?
                <Link to={'/user/login'}>로그인</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
