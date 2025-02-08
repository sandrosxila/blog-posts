import React from 'react';

import styles from './user-actions.module.scss';
import Link from 'next/link';

function UserActions() {
    const { userId } = { userId: "1" };

    return (
        <div className={ styles.userActionCard }>
            <Link className={ styles.actionItem } href={ `/${userId}/posts/` }>
                My Posts
            </Link>
            <Link className={ styles.actionItem } href={ '/account-settings' }>
                Account Settings
            </Link>
        </div>
    );
}

export default UserActions;
