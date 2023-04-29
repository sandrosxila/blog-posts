import React, { useEffect, useState } from 'react';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { setUserData } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';
import Button from '../styled-component/Button';
import FloatingLabelTextInputDiv from '../styled-component/complex/FloatingLabelTextInputDiv';




const SignUpFormInput = styled(FloatingLabelTextInputDiv)`
    & > input:focus + label{
        color:#6910a8;
    }

    & > input{
        --box-shadow-color: #6910a818;
    }

    @media only screen and (max-width: 576px){
        & > input{
            width:13rem;
        }
    }
`;



const SignUpLayout = styled.div`
    flex: 1 0 0;
    display: flex;
    padding: 2rem 0;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

const SignUpForm = styled.form`
    display:flex;
    flex-direction:column;
    align-items: center;
    width:16rem;
    padding:0;
    gap: 0.3rem;
`;


const SignUpFileUpload = styled.div`
    width:17.2rem;
    position: relative;
    height: 2rem;
    margin: 0 0 0.1rem 0;
    @media only screen and (max-width: 576px){
        width: 14rem;
    }
`;

const SignUpFileInput = styled.input`
    width:100%;
    opacity:0;
`;

const SignUpFileLabel = styled.label`
    --box-shadow-color: #6910a818;
    position:absolute;
    left:0;
    top:0;
    right: 0;
    height:100%;
    border:1px solid #0000081d;
    border-radius: 0.8rem;
    box-sizing:border-box;
    display: flex;
    align-items:center;
    justify-content: space-between;
    padding-left: 1rem;
    line-height:0.8rem;

    &:active{
        box-shadow: inset 0 0 2px 1px var(--box-shadow-color,#0000081d)
    }

    &:after{
        content: 'Upload';
        height:100%;
        width: 10%;
        min-width:6rem;
        border-radius: 0 0.8rem 0.8rem 0;
        display:flex;
        align-items:center;
        justify-content: center;
        line-height:0.8rem;
        background: #4361ee;
        color: white;
    }

    &:active:after{
        box-shadow: 0 0 5px 1px var(--box-shadow-color,#0000081d);
    }
`;

const SignUpFileCancelLabel = styled.label`
    position:absolute;
    
    bottom: -0.8rem;
    right: 0.3rem;
    color: crimson;
    font-size:0.65rem;
    cursor: pointer;
    &:active{
        text-shadow: 0 0 2px #b1123228;
    }
`;

const SignUpLabel = styled.label`
    font-size:0.73rem;
    align-self: flex-start;
    margin: -0.3rem 0 0.3rem 0;
    color:#4361ee;
    cursor: pointer;
    &:active{
        text-shadow: 0 0 1px #4362ee81;
    }
    @media only screen and (max-width: 576px){
        font-size:0.6rem;
        align-self: center;
    }
`;

const SignUpButton = styled(Button)`
    width: 17rem;
    border-radius:2rem;
    margin: 0;
    background:#4361ee;
    color: white;
    border: 1px solid transparent;
    margin:0.8rem;
    height: 2.3rem;

    &:hover{
        border: 1px solid #364fc0;
        background: #364fc0;
    }

    &:focus{
        outline:none;
        box-shadow: 0 0 8px 2px #4362ee44 ;
    }

    @media only screen and (max-width: 576px){
        width: 14rem;
    }
`;

const SignUpPasswordStrengthBar = styled(PasswordStrengthBar)`
    width:100%;
    display:flex;
    align-items:center;
    margin-top: -0.65rem;
    max-height:0.35rem;
    overflow:hidden;

    & > div {
        
        flex: 1 0 0;
        margin: 0;
    }

    & > p {
        display:none;
    }

    @media only screen and (max-width: 576px){
        width: 13rem;
    }
`;

const SignUpMessageSmallLabel = styled.label`
    font-size:0.65rem;
    align-self: flex-start;
    color: crimson;
    margin: -0.35rem 0 0.1rem 0;
    @media only screen and (max-width: 576px){
        font-size:0.6rem;
        align-self: center;
    }
`;

const SignUpMessageLabel = styled.label`
    font-size:0.8rem;
    align-self: center;
    color: crimson;
    @media only screen and (max-width: 576px){
        font-size:0.6rem;
    }
`;

type Props = {
    onSignUpLabelClick?: React.MouseEventHandler<HTMLLabelElement>
}

function SignUp({ onSignUpLabelClick }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [acceptPassword, setAcceptPassword] = useState(true);
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: ''
    });

    const [arePasswordsEqual, setArePasswordsEqual] = useState(true);


    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('Upload Photo...');
    const [fileUrlName, setFileUrlName] = useState('');
    const [newImageUploaded, setNewImageUploaded] = useState(false);

    const [response, setResponse] = useState<any>({ message: '' });

    const { firstName, lastName, email, password, repeatedPassword } = credentials;
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
            if(file){
                formData.append('file', file);
            }
        }
        console.log(formData);
        if (validateData()) {
            axios.post('/api/users/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                setResponse(res.data);
            });
        }
        else {
            setResponse({ message: 'Password is not Strong Enough!!!' });
        }
    };


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prevState => {
            const newState = {
                ...prevState,
                [e.target.name]: e.target.value
            };
            const { password, repeatedPassword } = newState;
            setArePasswordsEqual(password === repeatedPassword || repeatedPassword === '');
            return newState;
        });

    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
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
        if (score > 1)
            setAcceptPassword(true);
        else
            setAcceptPassword(false);
    };

    return (
        <SignUpLayout>
            <h1>
                Sign Up
            </h1>
            <SignUpForm onSubmit={ onSubmit } encType="multipart/form-data">
                <SignUpFormInput type="text" name="firstName" placeholder="First Name" value={ firstName } onChange={ onChange } />
                <SignUpFormInput type="text" name="lastName" placeholder="Last Name" value={ lastName } onChange={ onChange } />
                <SignUpFormInput type="email" name="email" placeholder="E-mail" value={ email } onChange={ onChange } />
                <SignUpFormInput type="password" name="password" placeholder="Password" value={ password } onChange={ onChange } />
                <SignUpPasswordStrengthBar password={ password } onChangeScore={ onChangeScore } />
                <SignUpFormInput type="password" name="repeatedPassword" placeholder="Repeat Password" value={ repeatedPassword } onChange={ onChange } />
                <SignUpMessageSmallLabel>
                    {!arePasswordsEqual && 'Passwords Don\'t Match'}
                </SignUpMessageSmallLabel>
                <SignUpFileUpload>
                    <SignUpFileInput type="file" id="file" onChange={ onFileInputChange } />
                    <SignUpFileLabel htmlFor="file">
                        {fileName.length > 15 ? `${fileName.slice(0, 15)}...` : fileName}
                    </SignUpFileLabel>
                    {
                        fileUrlName && (
                            <SignUpFileCancelLabel onClick={ onImageDeleteClick }>
                                Undo Uploaded File
                            </SignUpFileCancelLabel>
                        )
                    }
                </SignUpFileUpload>
                <SignUpLabel onClick={ onSignUpLabelClick }>
                    <FontAwesomeIcon icon={ faArrowLeft } size="sm" /> Back to Log In
                </SignUpLabel>
                {
                    message && (
                        <SignUpMessageLabel>
                            {message}
                        </SignUpMessageLabel>
                    )
                }
                <SignUpButton type="submit">
                    Sign Up
                </SignUpButton>
            </SignUpForm>
        </SignUpLayout>
    );
}

export default SignUp;
