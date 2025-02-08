"use client"
import React from 'react';

import styles from './navbar.module.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const pathname = usePathname();
    const isLoggedIn = true;

    const onLogOutClick = () => {
        console.log("log out");
    };

    return (
        <nav className={ styles.nav }>
            <div className={ styles.navDiv }>
                {
                    isLoggedIn && (
                        <>
                            <Link className={ styles.navDivItem } href={ '/' }>Home</Link>
                            <Link className={ styles.navDivItem } href={ '/add' }>Add Post</Link>
                        </>
                    )
                }
                {
                    !isLoggedIn && !['/', '/welcome'].includes(pathname) && (
                        <>
                            <Link className={ styles.navDivItem } href={ '/' }>Home</Link>
                        </>
                    )
                }
            </div>
            <div className={ styles.navDiv }>
                <span className={ styles.logo }>Blog Posts</span>
            </div>
            <div className={ styles.navDiv }>
                <Link className={ styles.navDivItem } href={ '/about-us' }>About Us</Link>
                {isLoggedIn && <button className={ styles.navButton } onClick={ onLogOutClick }>Log Out</button>}
            </div>
        </nav>
    );
}
