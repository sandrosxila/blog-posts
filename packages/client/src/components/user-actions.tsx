import React from 'react';

import { Link } from 'react-router-dom';

import styles from './user-actions.module.scss';
import { useAppSelector } from '../store';

function UserActions() {
    const { userId } = useAppSelector((state) => state.auth.userData);

    return (
        <div className={ styles.userActionCard }>
            <Link className={ styles.actionItem } to={ `/${userId}/posts/` }>
                My Posts
            </Link>
            <Link className={ styles.actionItem } to={ '/account-settings' }>
                Account Settings
            </Link>
        </div>
    );
}

export default UserActions;
