import React, { useState } from 'react';

import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './profile-card.module.scss';
import { useAppSelector } from '../store';

function ProfileCard() {
    const userData = useAppSelector((state) => state.auth.userData);
    const [imageFail, setImageFail] = useState(false);

    const { firstName, lastName, email, photo } = userData;

    return (
        <div className={ styles.userProfileCard }>
            {
                photo && !imageFail && (
                    <img
                        className={ styles.profilePhotoArea }
                        src={ `/api/photos/${photo}` }
                        alt="Image is not Available!!!"
                        onError={ () => setImageFail(true) }
                    />
                )
            }
            {imageFail && <FontAwesomeIcon icon={ faFileImage } />}
            <div>
                <p className={ styles.userData }>
                    <strong>
                        {firstName} {lastName}
                    </strong>
                </p>
                <p className={ styles.userData }>
                    <small className={ styles.smallText }>{email}</small>
                </p>
            </div>
        </div>
    );
}

export default ProfileCard;
