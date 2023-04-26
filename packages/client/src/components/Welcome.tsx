import React, { useState } from 'react';

import styled from 'styled-components';


import LogIn from './auth/LogIn';
import SignUp from './auth/SignUp';
import Card from './styled-component/Card';

const WelcomePageLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 4rem);

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

const LogInSignUpLayout = styled.div<{ showSignUp: boolean }>`
    width: 48rem;
    display:flex;
    align-items: center;
    transition: all ease-in-out 0.4s;
    transform: ${props => props.showSignUp ? 'translate(-25%)' : 'translate(25%)'};
    height: ${props => props.showSignUp ? '32rem' : '20rem'};
`;

function Welcome() {
    const [showSignUp, setShowSignUp] = useState(false);

    const onLoginSignUpLabelClick = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <WelcomePageLayout>
            <WelcomeBoard>
                Welcome To Blog-Posts!!!
            </WelcomeBoard>
            <LogInSignUpBoard>
                <LogInSignUpCard>
                    <LogInSignUpLayout showSignUp={ showSignUp }>
                        <LogIn onLogInLabelClick={ onLoginSignUpLabelClick }/>
                        <SignUp onSignUpLabelClick={ onLoginSignUpLabelClick }/>
                    </LogInSignUpLayout>
                </LogInSignUpCard>
            </LogInSignUpBoard>
        </WelcomePageLayout>
    );
}

export default Welcome;
