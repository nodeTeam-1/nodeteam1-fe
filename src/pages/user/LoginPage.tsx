import React from 'react';
import './user.scss';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const formSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('submit');
    };
    return (
        <div>
            LoginPage
            <div>
                <div>LOGO</div>
                <div>
                    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => formSubmit(event)}>
                        <div>
                            <input type='email' placeholder='email' />
                        </div>
                        <div>
                            <input type='password' placeholder='password' />
                        </div>
                        <div>
                            <button type='submit'>로그인</button>
                        </div>
                    </form>
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
