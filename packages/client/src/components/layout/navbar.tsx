import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './navbar.module.scss';
import { AuthState, logOut } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';

export default function Navbar() {
    const isLoggedIn = useSelector(
        (state: { auth: AuthState }) => state.auth.isLoggedIn
    );
    const dispatch = useAppDispatch();

    const onLogOutClick = () => {
        dispatch(logOut());
    };

    return (
        <nav className={ styles.nav }>
            <div className={ styles.navDiv }>
                <Link className={ styles.navDivItem } to={ '/' }>Home</Link>
                {
                    isLoggedIn && (
                        <>
                            <Link className={ styles.navDivItem } to={ '/add' }>Add Post</Link>
                        </>
                    )
                }
            </div>
            <div className={ styles.navDiv }>
                <span className={ styles.logo }>Blog Posts</span>
            </div>
            <div className={ styles.navDiv }>
                <Link className={ styles.navDivItem } to={ '/about-us' }>About Us</Link>
                {isLoggedIn && <button className={ styles.navButton } onClick={ onLogOutClick }>Log Out</button>}
            </div>
        </nav>
    );
}
