import React from 'react';

import styles from './not-found.module.scss';

function LogIn() {
    return (
        <div className={ styles.notFoundPageLayout }>
            <div className={ styles.notFoundBoard }>Page Not Found!!!</div>
        </div>
    );
}

export default LogIn;
