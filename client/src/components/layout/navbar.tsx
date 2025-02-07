import React from 'react';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './navbar.module.scss';
import { AuthState, logOut } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';

export default function Navbar() {
    const { pathname } = useLocation();
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
                {
                    isLoggedIn && (
                        <>
                            <Link className={ styles.navDivItem } to={ '/' }>Home</Link>
                            <Link className={ styles.navDivItem } to={ '/add' }>Add Post</Link>
                        </>
                    )
                }
                {
                    !isLoggedIn && !['/', '/welcome'].includes(pathname) && (
                        <>
                            <Link className={ styles.navDivItem } to={ '/' }>Home</Link>
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
