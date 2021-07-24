import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './styled-component/Card';
import Button from './styled-component/Button';
import FloatingLabelTextInputDiv from './styled-component/complex/FloatingLabelTextInputDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const WelcomePageLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 4rem);
    /* background: linear-gradient(-45deg, orange, orange 30%, crimson 30%, crimson) no-repeat, orange;
    background-position: bottom 0px right 15rem; */

    @media only screen and (max-width: 976px){
        flex-direction: column;
    }

    &:before{
        content:'';
        position: absolute;
        width: 100%;
        height: calc(100vh - 4rem);
        background: #b4a1f7;
        clip-path: polygon(68.5% 0,100% 0%,100% 100%,55% 100%);
        z-index: -1;

        @media only screen and (max-width: 1296px){
            flex-direction: column;
            clip-path: polygon(59.5% 0,100% 0%,100% 100%,45% 100%);
        }

        
        @media only screen and (max-width: 976px){
            flex-direction: column;
            clip-path: polygon(0 11.5%, 100% 70%, 100% 100%, 0 100%);
        }
    }
`;

const WelcomeBoard = styled.div`
    /* background: orange; */
    color: #5a189a;
    flex: 2 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 4rem;
    padding: 10rem 4rem;
    @media only screen and (max-width: 976px){
        flex: 1 0 0;
        padding: 0;
        font-size: 2rem;
        align-items: center;
        justify-content: center;
    }
`;

const LogInSignUpBoard = styled.div`
    /* background: crimson; */
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;

    @media only screen and (max-width: 976px){
        flex: 6 0 0;
        padding:0;
    }
`;

const LogInSignUpCard = styled(Card)`
    width: 24rem;
    height: auto;

    @media only screen and (max-width: 576px){
        width: 18rem;
    }
`;

const LogInSignUpLayout = styled.div`
    width: 48rem;
    display:flex;
    align-items: center;
    transition: all ease-in-out 0.4s;
    transform: ${props => props.showSignUp ? "translate(-25%)" : "translate(25%)"};
    height: ${props => props.showSignUp ? "30rem" : "20rem"};
`;

const LogInLayout = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

const LogInForm = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    width:16rem;
    padding:0;
    gap: 0.6rem;

    @media only screen and (max-width: 576px){
        width: 12rem;
    }
`;

const LogInHeader = styled.h1`
    margin-top: 0;
`;

const LogInSignUpFormInput = styled(FloatingLabelTextInputDiv)`
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

const LogInLabel = styled.label`
    font-size:0.73rem;
    align-self: flex-start;
    margin: -0.6rem 0 0.3rem 0;
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

const SignUpLayout = styled.div`
    flex: 1 0 0;
    display: flex;
    padding: 2rem 0;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

const SignUpForm = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    width:16rem;
    padding:0;
    gap: 0.3rem;
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

function LogIn() {

    const [showSignUp, setShowSignUp] = useState(false);

    const onLoginSignUpLabelClick = () => {
        setShowSignUp(!showSignUp);
    }

    return (
        <WelcomePageLayout>
            <WelcomeBoard>
                Welcome To Blog-Posts!!!
            </WelcomeBoard>
            <LogInSignUpBoard>
                <LogInSignUpCard>
                    <LogInSignUpLayout showSignUp={showSignUp}>
                        <LogInLayout>
                            <LogInHeader>
                                Log In
                            </LogInHeader>
                            <LogInForm action="">
                                <LogInSignUpFormInput type="email" name="email" placeholder="E-mail" />
                                <LogInSignUpFormInput type="password" name="password" placeholder="Password" />
                                <LogInLabel onClick={onLoginSignUpLabelClick}>
                                    Sign Up if you don't have an account <FontAwesomeIcon icon={faArrowRight} size="sm" />
                                </LogInLabel>
                                <LogInButton>
                                    Log In
                                </LogInButton>
                            </LogInForm>
                        </LogInLayout>
                        <SignUpLayout>
                            <h1>
                                Sign Up
                            </h1>
                            <SignUpForm action="">
                                <LogInSignUpFormInput type="text" name="first-name" placeholder="First Name" />
                                <LogInSignUpFormInput type="text" name="last-name" placeholder="Last Name" />
                                <LogInSignUpFormInput type="email" name="email" placeholder="E-mail" />
                                <LogInSignUpFormInput type="password" name="password" placeholder="Password" />
                                <LogInSignUpFormInput type="password" name="repeat-password" placeholder="Repeat Password" />
                                <SignUpLabel onClick={onLoginSignUpLabelClick}>
                                    <FontAwesomeIcon icon={faArrowLeft} size="sm" /> Back to Log In
                                </SignUpLabel>
                                <SignUpButton>
                                    Sign Up
                                </SignUpButton>
                            </SignUpForm>
                        </SignUpLayout>
                    </LogInSignUpLayout>
                </LogInSignUpCard>
            </LogInSignUpBoard>
        </WelcomePageLayout>
    );
}

export default LogIn;
