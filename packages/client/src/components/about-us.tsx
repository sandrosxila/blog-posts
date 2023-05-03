import React from 'react';

import styles from './about-us.module.scss';

function AboutUs() {
    return (
        <div className={ styles.aboutPageLayout }>
            <div className={ styles.aboutUsBoard }>This is Blog-Posts Web-Page.</div>
            <div className={ styles.detailsBoard }>
                The Website uses React and Express JS.
            </div>
        </div>
    );
}

export default AboutUs;
