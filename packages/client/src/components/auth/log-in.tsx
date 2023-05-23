import React, { useState } from 'react';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './log-in.module.scss';
import { userLogIn } from '../../api/users';
import { setUserData } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';
import FloatingLabelTextInput from '../ui/floating-label-text-input';

type Props = {
  onLogInLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
};

function LogIn({ onLogInLabelClick }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [error, setError] = useState('');

    const onSubmit = async (credentials: { email: string; password: string }) => {
        try {
            const data = await userLogIn(credentials);

            const { sub, ...userData } = jwtDecode<{
                sub: string;
                firstName: string;
                lastName: string;
                email: string;
                photo: string;
            }>(data['access_token']);

            localStorage.setItem('token', data['access_token']);
            localStorage.setItem('refresh_token', data['refresh_token']);

            dispatch(
                setUserData({
                    userId: sub,
                    ...userData,
                })
            );
            navigate('/');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            setError(e.response.data.message);
        }
    };

    return (
        <div className={ styles.logInLayout }>
            <h1 className={ styles.logInHeader }>Log In</h1>
            <form className={ styles.logInForm } onSubmit={ handleSubmit(onSubmit) }>
                <FloatingLabelTextInput
                    className={ styles.logInFormInput }
                    type="email"
                    placeholder="E-mail"
                    { 
                        ...register('email', {
                            required: true,
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'please enter an email address',
                            },
                        }) 
                    }
                />
                {
                    errors.email && (
                        <label className={ styles.logInMessageLabel }>
                            {errors.email.message}
                        </label>
                    )
                }
                <FloatingLabelTextInput
                    className={ styles.logInFormInput }
                    type="password"
                    placeholder="Password"
                    {
                        ...register('password', {
                            required: true,
                            minLength: {
                                value: 8,
                                message: 'Password should contain at least 8 characters',
                            },
                        }) 
                    }
                />
                {
                    errors.password && (
                        <label className={ styles.logInMessageLabel }>
                            {errors.password.message}
                        </label>
                    )
                }
                {error && <label className={ styles.logInMessageLabel }>{ error }</label>}
                <label className={ styles.logInLabel } onClick={ onLogInLabelClick }>
                    {'Sign Up if you don\'t have an account '}
                    <FontAwesomeIcon icon={ faArrowRight } size="sm" />
                </label>              
                <button className={ styles.logInButton } type="submit">
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LogIn;
