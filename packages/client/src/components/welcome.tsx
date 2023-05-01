import React, { useState } from 'react';

import classNames from 'classnames';

import LogIn from './auth/LogIn';
import SignUp from './auth/SignUp';
import styles from './welcome.module.scss';

function Welcome() {
    const [showSignUp, setShowSignUp] = useState(false);

    const onLoginSignUpLabelClick = () => {
        setShowSignUp(!showSignUp);
    };


    return (
        <div className={ styles.welcomePageLayout }>
            <div className={ styles.welcomeBoard }>Welcome To Blog-Posts!!!</div>
            <div className={ styles.logInSignUpBoard }>
                <div className={ classNames( styles.logInSignUpCard) }>
                    <div className={ classNames(styles.logInSignUpLayout, { [styles.showSignUp]: showSignUp }) }>
                        <LogIn onLogInLabelClick={ onLoginSignUpLabelClick } />
                        <SignUp onSignUpLabelClick={ onLoginSignUpLabelClick } />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
