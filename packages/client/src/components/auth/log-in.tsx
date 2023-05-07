import React, { useState } from 'react';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './log-in.module.scss';
import { setUserData } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';
import FloatingLabelTextInputDiv from '../styled-component/complex/FloatingLabelTextInputDiv';

type Props = {
    onLogInLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
};

function LogIn({ onLogInLabelClick }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/login', credentials);
            dispatch(setUserData(data));
            navigate('/');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            setError(e.response.data.message);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const { email, password } = credentials;

    return (
        <div className={ styles.logInLayout }>
            <h1 className={ styles.logInHeader }>Log In</h1>
            <form className={ styles.logInForm } onSubmit={ onSubmit }>
                <FloatingLabelTextInputDiv
                    className={ styles.logInFormInput }
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={ email }
                    onChange={ onChange }
                />
                <FloatingLabelTextInputDiv
                    className={ styles.logInFormInput }
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={ password }
                    onChange={ onChange }
                />
                <label className={ styles.logInLabel } onClick={ onLogInLabelClick }>
                    {'Sign Up if you don\'t have an account '}
                    <FontAwesomeIcon icon={ faArrowRight } size="sm" />
                </label>
                {error && <label className={ styles.logInMessageLabel }>{error}</label>}
                <button className={ styles.logInButton } type="submit">
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LogIn;
