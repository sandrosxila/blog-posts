import React, { useEffect, useState } from 'react';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';

import styles from './sign-up.module.scss';
import { setUserData } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';
import FloatingLabelTextInputDiv from '../styled-component/complex/FloatingLabelTextInputDiv';


type Props = {
    onSignUpLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
};

function SignUp({ onSignUpLabelClick }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [acceptPassword, setAcceptPassword] = useState(true);
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: '',
    });

    const [arePasswordsEqual, setArePasswordsEqual] = useState(true);

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('Upload Photo...');
    const [fileUrlName, setFileUrlName] = useState('');
    const [newImageUploaded, setNewImageUploaded] = useState(false);

    const [response, setResponse] = useState<any>({ message: '' });

    const { firstName, lastName, email, password, repeatedPassword } =
    credentials;
    const { message } = response;

    useEffect(() => {
        if (response.message === 'data added successfully!!!') {
            console.log(response);
            dispatch(setUserData(response.userData as any));
            navigate('/');
        }
    }, [response, navigate, dispatch]);

    const validateData = () => repeatedPassword === password && acceptPassword;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);

        if (newImageUploaded) {
            if (file) {
                formData.append('file', file);
            }
        }
        console.log(formData);
        if (validateData()) {
            axios
                .post('/api/users/signup', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    setResponse(res.data);
                });
        } else {
            setResponse({ message: 'Password is not Strong Enough!!!' });
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prevState) => {
            const newState = {
                ...prevState,
                [e.target.name]: e.target.value,
            };
            const { password, repeatedPassword } = newState;
            setArePasswordsEqual(
                password === repeatedPassword || repeatedPassword === ''
            );
            return newState;
        });
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const [newFile] = Array.from(e.target.files);
            setNewImageUploaded(true);
            setFile(newFile);
            setFileName(newFile.name);
            setFileUrlName(URL.createObjectURL(newFile));
        }
    };

    const onImageDeleteClick = () => {
        setNewImageUploaded(false);
        setFile(null);
        setFileName('Upload Photo...');
        setFileUrlName('');
    };

    const onChangeScore = (score: number) => {
        if (score > 1) setAcceptPassword(true);
        else setAcceptPassword(false);
    };

    return (
        <div className={ styles.signUpLayout }>
            <h1>Sign Up</h1>
            <form
                className={ styles.signUpForm }
                onSubmit={ onSubmit }
                encType="multipart/form-data"
            >
                <FloatingLabelTextInputDiv
                    className={ styles.signUpFormInput }
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={ firstName }
                    onChange={ onChange }
                />
                <FloatingLabelTextInputDiv
                    className={ styles.signUpFormInput }
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={ lastName }
                    onChange={ onChange }
                />
                <FloatingLabelTextInputDiv
                    className={ styles.signUpFormInput }
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={ email }
                    onChange={ onChange }
                />
                <FloatingLabelTextInputDiv
                    className={ styles.signUpFormInput }
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={ password }
                    onChange={ onChange }
                />
                <PasswordStrengthBar
                    className={ styles.signUpPasswordStrengthBar }
                    password={ password }
                    onChangeScore={ onChangeScore }
                />
                <FloatingLabelTextInputDiv
                    className={ styles.signUpFormInput }
                    type="password"
                    name="repeatedPassword"
                    placeholder="Repeat Password"
                    value={ repeatedPassword }
                    onChange={ onChange }
                />
                <label className={ styles.signUpMessageSmallLabel }>
                    {!arePasswordsEqual && 'Passwords Don\'t Match'}
                </label>
                <div className={ styles.signUpFileUpload }>
                    <input className={ styles.signUpFileInput } type="file" id="file" onChange={ onFileInputChange } />
                    <label className={ styles.signUpFileLabel } htmlFor="file">
                        {fileName.length > 15 ? `${fileName.slice(0, 15)}...` : fileName}
                    </label>
                    {
                        fileUrlName && (
                            <label className={ styles.signUpFileCancelLabel } onClick={ onImageDeleteClick }>
                                Undo Uploaded File
                            </label>
                        )
                    }
                </div>
                <label className={ styles.signUpLabel } onClick={ onSignUpLabelClick }>
                    <FontAwesomeIcon icon={ faArrowLeft } size="sm" /> Back to Log In
                </label>
                {message && <label className={ styles.signUpMessageLabel }>{message}</label>}
                <button className={ styles.signUpButton } type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
