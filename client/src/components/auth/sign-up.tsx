import React, { useRef, useState } from 'react';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';

import styles from './sign-up.module.scss';
import { userSignUp } from '../../api/users';
import { setUserData } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';
import FloatingLabelTextInput from '../ui/floating-label-text-input';

type Props = {
    onSignUpLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
};

type SignUpForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatedPassword: string;
    file: FileList | null;
};

function SignUp({ onSignUpLabelClick }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        resetField,
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignUpForm>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatedPassword: '',
            file: null,
        },
    });

    const { ref, onChange: onFileChange, ...fileRegister } = register('file');
    const { onChange: onPasswordChange, ...passwordRegister } = register('password', {
        required: true,
        minLength: {
            value: 8,
            message: 'Password should contain at least 8 characters',
        },
    });
    const [password, setPassword] = useState('');
    const [acceptPassword, setAcceptPassword] = useState(true);

    const [fileName, setFileName] = useState('Upload Photo...');

    const [error, setError] = useState<string | null>(null);

    const fileRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = (e: HTMLInputElement | null) => {
        ref(e);
        fileRef.current = e;
    };

    const onPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        onPasswordChange(e);
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFileName(e.target.files[0].name);
        }
        onFileChange(e);
    };

    const onSubmit = async (data: SignUpForm) => {
        const { firstName, lastName, email, password, file } = data;
        const photo = file?.[0] ?? null;

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        if (photo) {
            formData.append('file', photo);
        }
        if (acceptPassword) {
            try {
                const { userData, ...jwtPayload } = await userSignUp(formData);
                dispatch(setUserData(userData));
                localStorage.setItem('access_token', jwtPayload.access_token);
                localStorage.setItem('refresh_token', jwtPayload.refresh_token);
                navigate('/');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                setError(e.response.data.message);
            }
        } else {
            setError('Password is not Strong Enough!!!');
        }
    };

    const onImageDeleteClick = () => {
        setFileName('Upload Photo...');
        if (fileRef.current) fileRef.current.value = '';
        resetField('file');
    };

    const onChangeScore = (score: number) => {
        if (score > 1) setAcceptPassword(true);
        else setAcceptPassword(false);
    };

    return (
        <div className={ styles.signUpLayout }>
            <h1>Sign Up</h1>
            <form className={ styles.signUpForm } onSubmit={ handleSubmit(onSubmit) }>
                <FloatingLabelTextInput
                    className={ styles.signUpFormInput }
                    type="text"
                    placeholder="First Name"
                    { ...register('firstName', { required: true }) }
                />
                <FloatingLabelTextInput
                    className={ styles.signUpFormInput }
                    type="text"
                    placeholder="Last Name"
                    { ...register('lastName', { required: true }) }
                />
                <FloatingLabelTextInput
                    className={ styles.signUpFormInput }
                    type="email"
                    placeholder="E-mail"
                    { ...register('email', {
                        required: true,
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'please enter an email address',
                        },
                    }) }
                />
                <FloatingLabelTextInput
                    className={ styles.signUpFormInput }
                    type="password"
                    placeholder="Password"
                    { ...passwordRegister }
                    onChange={ onPasswordInputChange }
                />
                <PasswordStrengthBar
                    className={ styles.signUpPasswordStrengthBar }
                    password={ password }
                    onChangeScore={ onChangeScore }
                />
                <FloatingLabelTextInput
                    className={ styles.signUpFormInput }
                    type="password"
                    placeholder="Repeat Password"
                    { ...register('repeatedPassword', {
                        required: true,
                        validate: (value) => {
                            const password = getValues('password');
                            return password === value || 'Passwords Don\'t Match';
                        },
                    }) }
                />
                <label className={ styles.signUpMessageSmallLabel }>
                    {errors.repeatedPassword && errors.repeatedPassword.message}
                </label>
                <div className={ styles.signUpFileUpload }>
                    <input
                        className={ styles.signUpFileInput }
                        type="file"
                        id="file"
                        multiple={ false }
                        { ...fileRegister }
                        onChange={ onFileInputChange }
                        ref={ fileInputRef }
                    />
                    <label className={ styles.signUpFileLabel } htmlFor="file">
                        {fileName.length > 15 ? `${fileName.slice(0, 15)}...` : fileName}
                    </label>
                    {
                        fileRef.current && !!fileRef.current.files?.length && (
                            <label
                                className={ styles.signUpFileCancelLabel }
                                onClick={ onImageDeleteClick }
                            >
                                Undo Uploaded File
                            </label>
                        )
                    }
                </div>
                <label className={ styles.signUpLabel } onClick={ onSignUpLabelClick }>
                    <FontAwesomeIcon icon={ faArrowLeft } size="sm" /> Back to Log In
                </label>
                {error && <label className={ styles.signUpMessageLabel }>{error}</label>}
                <button className={ styles.signUpButton } type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
