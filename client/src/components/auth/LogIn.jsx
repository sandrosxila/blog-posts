import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUserData } from "../../slices/authSlice";
import axios from 'axios';
import styled from 'styled-components';
import Button from '../styled-component/Button';
import FloatingLabelTextInputDiv from '../styled-component/complex/FloatingLabelTextInputDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const LogInLayout = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

const LogInForm = styled.form`
    display:flex;
    flex-direction:column;
    align-items: center;
    width:16rem;
    padding:0;
    gap: 0.3rem;

    @media only screen and (max-width: 576px){
        width: 12rem;
    }
`;

const LogInHeader = styled.h1`
    margin-top: 0;
`;

const LogInButton = styled(Button)`
    width: 17rem;
    border-radius:1rem;
    margin: 0.2rem;
    background:#4361ee;
    color: white;
    border: 1px solid transparent;

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

const LogInFormInput = styled(FloatingLabelTextInputDiv)`
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

const LogInLabel = styled.label`
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

const LogInMessageLabel = styled.label`
    font-size:0.73rem;
    align-self: flex-start;
    color: crimson;
    cursor: pointer;
    &:active{
        text-shadow: 0 0 1px #4362ee81;
    }
`;

function LogIn({ onLogInLabelClick }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [response, setResponse] = useState({ message: "" });

    useEffect(() => {
        if (response.message === "Credentials Match.") {
            console.log(response);
            dispatch(setUserData(response.userData));
            history.push('/');
        }
    }, [response, dispatch, history]);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const res = await axios.post('/users/login', credentials);
        setResponse(res.data);
    }



    const onChange = (e) => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const { email, password } = credentials;
    const { message } = response;

    return (
        <LogInLayout>
            <LogInHeader>
                Log In
            </LogInHeader>
            <LogInForm onSubmit={onSubmit}>
                <LogInFormInput type="email" name="email" placeholder="E-mail" value={email} onChange={onChange} />
                <LogInFormInput type="password" name="password" placeholder="Password" value={password} onChange={onChange} />
                <LogInLabel onClick={onLogInLabelClick}>
                    Sign Up if you don't have an account <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </LogInLabel>
                {
                    message &&
                    <LogInMessageLabel>
                        {message}
                    </LogInMessageLabel>
                }
                <LogInButton type="submit">
                    Log In
                </LogInButton>
            </LogInForm>
        </LogInLayout>
    )
}

export default LogIn
