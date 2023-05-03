import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import styles from './user-actions.module.scss';
import { useAppSelector } from '../store';

const UserActionCard = styled.div`
  position: sticky;
  top: 1rem;
  min-width: 14rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #6910a8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ActionItem = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: #6910a8;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

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
