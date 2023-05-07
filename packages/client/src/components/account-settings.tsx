import React, { useState } from 'react';

import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './account-settings.module.scss';
import { updateUser, updateUserPhoto } from '../api/users';
import { setUserData } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store';

function AccountSettings() {
    const dispatch = useAppDispatch();

    const userData = useAppSelector((state) => state.auth.userData);

    const { userId } = userData;

    const [firstName, setFirstName] = useState(userData.firstName);
    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFirstName(e.target.value);
    const [editFirstName, setEditFirstName] = useState(false);

    const [message, setMessage] = useState('');

    const changeEditFirstName = async () => {
        setEditFirstName(!editFirstName);
        if (userData.firstName !== firstName && userId && firstName) {
            try {
                await updateUser(userId, { firstName });
                dispatch(setUserData({ ...userData, firstName }));
                setMessage('');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                setMessage('First Name is not Updated in Database');
                setFirstName(userData.firstName);
            }
        }
    };

    const [lastName, setLastName] = useState(userData.lastName);
    const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setLastName(e.target.value);
    const [editLastName, setEditLastName] = useState(false);
    const changeEditLastName = async () => {
        setEditLastName(!editLastName);
        if (userData.lastName !== lastName && userId && lastName) {
            try {
                await updateUser(userId, { lastName });
                dispatch(setUserData({ ...userData, lastName }));
                setMessage('');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                setMessage('Last Name is not Updated in Database');
                setFirstName(userData.lastName);
            }
        }
    };

    const [email, setEmail] = useState(userData.email);
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value);
    const [editEmail, setEditEmail] = useState(false);
    const changeEditEmail = async () => {
        setEditEmail(!editEmail);
        if (userData.email !== email && userId && email) {
            try {
                await updateUser(userId, { email });
                dispatch(setUserData({ ...userData, email }));
                setMessage('');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                setMessage('Email is not Updated in Database');
                setFirstName(userData.email);
            }
        }
    };

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
            }
        }
    };

    return (
        <div className={ styles.accountSettingsLayout }>
            <div className={ styles.accountSettingsCard }>
                <form
                    className={ styles.changeAccountForm }
                    onSubmit={ (e) => e.preventDefault() }
                    encType="multipart/form-data"
                >
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
                        style={ { background: `url(${fileUrlName}) center center` } }
                        htmlFor={ 'photo' }
                    />
                    <div className={ styles.userData }>
                        <strong className={ styles.changeAccountKey }>First Name:</strong>
                        {
                            editFirstName ? (
                                <>
                                    <input
                                        className={ styles.changeAccountFormInput }
                                        value={ firstName ?? '' }
                                        onChange={ onFirstNameChange }
                                    />
                                    <FontAwesomeIcon
                                        className={ styles.faCheck }
                                        icon={ faCheck }
                                        size={ 'xs' }
                                        onClick={ changeEditFirstName }
                                    />
                                </>
                            ) : (
                                <>
                                    <p className={ styles.changeAccountValue }>{firstName}</p>
                                    <FontAwesomeIcon
                                        className={ styles.faPencil }
                                        icon={ faPencilAlt }
                                        size={ 'xs' }
                                        onClick={ changeEditFirstName }
                                    />
                                </>
                            )
                        }
                    </div>
                    <div className={ styles.userData }>
                        <strong className={ styles.changeAccountKey }>Last Name:</strong>
                        {
                            editLastName ? (
                                <>
                                    <input
                                        className={ styles.changeAccountFormInput }
                                        value={ lastName ?? '' }
                                        onChange={ onLastNameChange }
                                    />
                                    <FontAwesomeIcon
                                        className={ styles.faCheck }
                                        icon={ faCheck }
                                        size={ 'xs' }
                                        onClick={ changeEditLastName }
                                    />
                                </>
                            ) : (
                                <>
                                    <p className={ styles.changeAccountValue }>{lastName}</p>
                                    <FontAwesomeIcon
                                        className={ styles.faPencil }
                                        icon={ faPencilAlt }
                                        size={ 'xs' }
                                        onClick={ changeEditLastName }
                                    />
                                </>
                            )
                        }
                    </div>
                    <div className={ styles.userData }>
                        <strong className={ styles.changeAccountKey }>Email:</strong>
                        {
                            editEmail ? (
                                <>
                                    <input
                                        className={ styles.changeAccountFormInput }
                                        value={ email ?? '' }
                                        onChange={ onEmailChange }
                                    />
                                    <FontAwesomeIcon
                                        className={ styles.faCheck }
                                        icon={ faCheck }
                                        size={ 'xs' }
                                        onClick={ changeEditEmail }
                                    />
                                </>
                            ) : (
                                <>
                                    <p className={ styles.changeAccountValue }>{email}</p>
                                    <FontAwesomeIcon
                                        className={ styles.faPencil }
                                        icon={ faPencilAlt }
                                        size={ 'xs' }
                                        onClick={ changeEditEmail }
                                    />
                                </>
                            )
                        }
                    </div>
                    {
                        message && (
                            <label className={ styles.accountSettingsMessageLabel }>
                                {message}
                            </label>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default AccountSettings;
