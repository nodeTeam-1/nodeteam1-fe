/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './user.scss';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterMutation, userVerifyMutation } from '../../hooks/useLoginHook';

interface FormData {
    email: string;
    name: string;
    password: string;
    passwordCheck: string;
    level: string;
    verificationCode?: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        passwordCheck: '',
        name: '',
        level: 'public',
        verificationCode: ''
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [verificationStep, setVerificationStep] = useState(false);

    // 입력 필드 변경 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const registerMutation = userRegisterMutation('/user/register');
    const verifyMutation = userVerifyMutation('/user/verify');

    const formSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (verificationStep) {
            // 인증 코드 제출 로직
            verifyMutation.mutate(
                { email: formData.email, verificationCode: formData.verificationCode! },
                {
                    onSuccess: (data: any) => {
                        if (data.status === 200) {
                            // 인증 성공 시, 로그인 페이지로 이동
                            console.log('인증 성공:', data);
                            navigate('/user/login');
                        }
                    },
                    onError: (error: any) => {
                        console.error('인증 실패:', error);
                        if (error.response?.data?.message) {
                            setErrorMessage(error.response.data.message);
                        } else {
                            setErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');
                        }
                    }
                }
            );
        } else {
            // 비밀번호 확인 로직
            const { passwordCheck, ...newFormData } = formData;
            if(formData.password !== passwordCheck)
                return setErrorMessage('비밀번호 일치하지가 않습니다.');
            setErrorMessage('');
    
            // 회원가입 제출 로직
            registerMutation.mutate(
                newFormData,
                {
                    // onSuccess: (data: any) => {
                    //     if (data.status === 200) {
                    //         console.log('회원가입 성공:', data);
                    //         setVerificationStep(true);
                    //     }
                    // },
                    onError: (error: any) => {
                        console.error('회원가입 실패:', error);
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
        }
    };

    useEffect(() => {
        if (registerMutation.isSuccess && registerMutation.data?.status === 200) {
            console.log('회원가입 성공:', registerMutation.data);
            setVerificationStep(true);
        }
    }, [registerMutation.isSuccess, registerMutation.data]);

    return (
        <div className='user-page'>
            <form onSubmit={formSubmit} className='form-container'>
                <div className='form-title'>{verificationStep ? '인증번호 입력' : '회원가입'}</div>
                {!verificationStep ? (
                    <>
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
                        <div className='input-wrap'>
                            <input
                                type='password'
                                name='passwordCheck'
                                placeholder='비밀번호 확인'
                                onChange={handleChange}
                            />
                        </div>
                    </>
                ) : (
                    <div className='input-wrap'>
                        <input
                            type='text'
                            name='verificationCode'
                            placeholder='인증번호'
                            onChange={handleChange}
                        />
                    </div>
                )}
                <button type='submit' className='btn btn-submit w-100'>
                    {verificationStep ? '인증번호 제출' : '회원가입'}
                </button>
                {errorMessage && <p>{errorMessage}</p>}
                {registerMutation.isError && <p>다시 시도해주세요.</p>}
                {registerMutation.isSuccess && !verificationStep && (
                    <p>성공적으로 가입되었습니다! 인증번호를 확인해주세요.</p>
                )}
                {!verificationStep && (
                    <div className='notice-wrap'>
                        계정이 있으신가요?
                        <Link to='/user/login'>로그인</Link>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegisterPage;
