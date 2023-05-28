import React, { useState } from 'react';

import { AccountSettingsField } from './account-settings-field';
import styles from './account-settings.module.scss';
import { updateUserPhoto } from '../api/users';
import { setUserData } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store';

function AccountSettings() {
    const dispatch = useAppDispatch();

    const userData = useAppSelector((state) => state.auth.userData);

    const { userId } = userData;

    const [message, setMessage] = useState('');

    const [photo, setPhoto] = useState(userData.photo);
    const [fileUrlName, setFileUrlName] = useState(`api/photos/${photo}`);

    const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0 && userId) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            try {
                const { photo: newFileName } = await updateUserPhoto(userId, formData);
                setPhoto(newFileName);
                dispatch(setUserData({ ...userData, photo: newFileName }));
                setFileUrlName(`/api/photos/${newFileName}`);
                setMessage('');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                setMessage(e.response.data.message);
                setPhoto(userData.photo);
            }
        }
    };

    return (
        <div className={ styles.accountSettingsLayout }>
            <div className={ styles.accountSettingsCard }>
                <div className={ styles.changeAccountFieldGroup }>
                    <input
                        className={ styles.imageInput }
                        type="file"
                        name="photo"
                        id="photo"
                        onChange={ onFileInputChange }
                    />
                    <label
                        className={ styles.profilePhotoArea }
                        title="click to change"
                        htmlFor={ 'photo' }
                    >
                        <img className={ styles.profilePhoto } src={ fileUrlName } alt={ 'user profile' } />
                    </label>
                    <AccountSettingsField
                        fieldName="firstName"
                        labelText="First Name"
                        setMessage={ setMessage }
                    />
                    <AccountSettingsField
                        fieldName="lastName"
                        labelText="Last Name"
                        setMessage={ setMessage }
                    />
                    <AccountSettingsField
                        fieldName="email"
                        labelText="Email"
                        setMessage={ setMessage }
                        immutable
                    />
                    {
                        message && (
                            <label className={ styles.accountSettingsMessageLabel }>
                                {message}
                            </label>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
