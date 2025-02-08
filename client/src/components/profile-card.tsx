import React, { useState } from 'react';

import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './profile-card.module.scss';

function ProfileCard() {
    const userData = {
        userId: "1",
        firstName: "John",
        lastName: "Doe",
        email: "jdoe@email.com",
        photo: ""
    };
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
