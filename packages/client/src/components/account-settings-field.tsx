import React from 'react';
import { useState } from 'react';

import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './account-settings-field.module.scss';
import { updateUser } from '../api/users';
import { UserData, setUserData } from '../slices/authSlice';
import { useAppSelector, useAppDispatch } from '../store';

type AccountSettingsFieldProps = {
    labelText: string;
    fieldName: keyof UserData;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    immutable?: boolean;
};

export const AccountSettingsField = ({
    labelText,
    fieldName,
    setMessage,
    immutable = false,
}: AccountSettingsFieldProps) => {
    const dispatch = useAppDispatch();

    const userData = useAppSelector((state) => state.auth.userData);
    const { userId } = userData;

    const [editField, setEditField] = useState(false);
    const [fieldValue, setFieldValue] = useState(userData[fieldName]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        !immutable && setFieldValue(e.target.value);

    const onIconClick = async () => {
        setEditField(!editField);
        if (userData[fieldName] !== fieldValue && userId && fieldValue) {
            try {
                await updateUser(userId, { [fieldName]: fieldValue });
                dispatch(setUserData({ ...userData, [fieldName]: fieldValue }));
                setMessage('');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                setMessage(`${labelText} is not updated`);
                setFieldValue(userData[fieldName]);
            }
        }
    };

    return (
        <div className={ styles.accountSettingsField }>
            <strong className={ styles.changeAccountKey }>{labelText}:</strong>
            {immutable && <p className={ styles.changeAccountValue }>{fieldValue}</p>}
            {
                !immutable &&
                    (editField ? (
                        <>
                            <input
                                className={ styles.changeAccountFormInput }
                                value={ fieldValue ?? '' }
                                onChange={ onChange }
                            />
                            <FontAwesomeIcon
                                className={ styles.faCheck }
                                icon={ faCheck }
                                size={ 'xs' }
                                onClick={ onIconClick }
                            />
                        </>
                    ) : (
                        <>
                            <p className={ styles.changeAccountValue }>{fieldValue}</p>
                            <FontAwesomeIcon
                                className={ styles.faPencil }
                                icon={ faPencilAlt }
                                size={ 'xs' }
                                onClick={ onIconClick }
                            />
                        </>
                    ))
            }
        </div>
    );
};
