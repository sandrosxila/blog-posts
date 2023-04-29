import React, { useState } from 'react';

import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import Card from './styled-component/Card';
import TextInput from './styled-component/TextInput';
import { setUserData } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store';


const AccountSettingsLayout = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    height: calc(100vh - 4rem);

    &:before{
        content:'';
        position: absolute;
        width: 100%;
        height: calc(100vh - 4rem);
        background: #b4a1f7;
        clip-path: polygon(45.5% 0,100% 0%,100% 100%,32% 100%);
        z-index: -1;

        
        @media only screen and (max-width: 976px){
            flex-direction: column;
            clip-path: polygon(0 11.5%, 100% 70%, 100% 100%, 0 100%);
        }
    }
`;

const AccountSettingsCard = styled(Card)`
    height:auto;
    width:auto;
    display:flex;
    flex-direction:column;
`;


const ChangeAccountForm = styled.form`
    width:21rem;
    display:flex;
    flex-direction:column;
    gap: 1.5rem;
    padding: 1rem;
    position:relative;
`;

const ProfilePhotoArea = styled.label<{ imageUrl: string }>`
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
    object-fit: contain;
    transition: all ease-in 0.3s;
    align-self: center;
    background: url(${props => `${props.imageUrl}`}) center center;
    background-size: 12rem;

    &:hover{
        filter: brightness(50%);
    }
    
`;

const UserData = styled.div`
    text-align: center;
    margin:0;
    display:flex;
    gap:0.2rem;
    width:100%;
    align-items:center;
    justify-content:flex-start;

    &:hover > svg{
        opacity:1;
    } 
`;

const FaPencil = styled(FontAwesomeIcon)`
    color: #550f86;
    font-size:1.7rem;
    height:1rem;
    cursor: pointer;
    opacity:0;
    transition: all 0.2s ease-in;
`;

const FaCheck = styled(FontAwesomeIcon)`
    color: seagreen;
    font-size:1.7rem;
    height:1.2rem;
    cursor: pointer;
    opacity:0;
    transition: all 0.2s ease-in;
`;

const ChangeAccountKey = styled.strong`
    color:#6910a8;
    width: 9.68rem;
`;

const ChangeAccountValue = styled.p`
    color:#6910a8;
    height:1.5rem;
    font-size: 1rem;
    padding: 0.2625rem 0.55rem;
    margin:0;
    flex: 1 0 0;
`;


const ChangeAccountFormInput = styled(TextInput)`
    --box-shadow-color: #6910a818;
    height:1.5rem;
    width:8rem;
    flex: 1 0 auto;
`;

const ImageInput = styled.input`
    position:absolute;
    height:12rem;
    width:12rem;
    left:25%;
    z-index:-1;
`;

const AccountSettingsMessageLabel = styled.label`
    font-size:1rem;
    align-self: center;
    color: crimson;
    @media only screen and (max-width: 576px){
        font-size:0.8rem;
    }
`;


function AccountSettings() {

    const dispatch = useAppDispatch();

    const userData = useAppSelector(state => state.auth.userData);

    const { userId } = userData;

    const [firstName, setFirstName] = useState(userData.firstName);
    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
    const [editFirstName, setEditFirstName] = useState(false);

    const [message, setMessage] = useState('');

    const changeEditFirstName = () => {
        setEditFirstName(!editFirstName);
        if (userData.firstName !== firstName) {
            axios.put(`/api/users/${userId}`, { firstName })
                .then(_ => dispatch(setUserData({ ...userData, firstName })))
                .catch(e => {
                    console.log(e);
                    setMessage('First Name is not Updated in Database');
                    setFirstName(userData.firstName);
                });
        }
    };

    const [lastName, setLastName] = useState(userData.lastName);
    const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
    const [editLastName, setEditLastName] = useState(false);
    const changeEditLastName = () => {
        setEditLastName(!editLastName);
        if (userData.lastName !== lastName) {
            axios.put(`/api/users/${userId}`, { lastName })
                .then(_ => dispatch(setUserData({ ...userData, lastName })))
                .catch(e => {
                    setMessage('First Name is not Updated in Database');
                    setLastName(userData.lastName);
                });
        }
    };

    const [email, setEmail] = useState(userData.email);
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const [editEmail, setEditEmail] = useState(false);
    const changeEditEmail = () => {
        setEditEmail(!editEmail);
        if (userData.email !== email) {
            axios.put(`/api/users/${userId}`, { email })
                .then(_ => dispatch(setUserData({ ...userData, email })))
                .catch(e => {
                    setMessage('First Name is not Updated in Database');
                    setEmail(userData.email);
                });
        }
    };

    const [photo, setPhoto] = useState(userData.photo);
    const [fileUrlName, setFileUrlName] = useState(`api/photos/${photo}`);

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.files && e.target.files.length > 0){
            const formData = new FormData();
            const newFileName = uuid() + '.' + e.target.files[0].name.split('.').pop();
            formData.append('file', e.target.files[0], newFileName);
            formData.append('photo', newFileName);

            axios.put(`/api/users/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                setPhoto(newFileName);
                dispatch(setUserData({ ...userData, photo: newFileName }));
                setFileUrlName(`/api/photos/${newFileName}`);
            }).catch(e => console.log(e));
        }
    };

    return (
        <AccountSettingsLayout>
            <AccountSettingsCard>
                <ChangeAccountForm onSubmit={ e => e.preventDefault() } encType="multipart/form-data">
                    <ImageInput type="file" name="photo" id="photo" onChange={ onFileInputChange } />
                    <ProfilePhotoArea title="click to change" imageUrl={ fileUrlName } htmlFor={ 'photo' } />
                    <UserData>
                        <ChangeAccountKey>First Name:</ChangeAccountKey>
                        {
                            editFirstName ? (
                                <>
                                    <ChangeAccountFormInput value={ firstName ?? '' } onChange={ onFirstNameChange } />
                                    <FaCheck icon={ faCheck } size={ 'xs' } onClick={ changeEditFirstName } />
                                </>
                            )
                                : (
                                    <>
                                        <ChangeAccountValue>{firstName}</ChangeAccountValue>
                                        <FaPencil icon={ faPencilAlt } size={ 'xs' } onClick={ changeEditFirstName } />
                                    </>
                                )
                        }
                    </UserData>
                    <UserData>
                        <ChangeAccountKey>Last Name:</ChangeAccountKey>
                        {
                            editLastName ? (
                                <>
                                    <ChangeAccountFormInput value={ lastName ?? '' } onChange={ onLastNameChange } />
                                    <FaCheck icon={ faCheck } size={ 'xs' } onClick={ changeEditLastName } />
                                </>
                            ) : (
                                <>
                                    <ChangeAccountValue>{lastName}</ChangeAccountValue>
                                    <FaPencil icon={ faPencilAlt } size={ 'xs' } onClick={ changeEditLastName } />
                                </>
                            )
                        }

                    </UserData>
                    <UserData>
                        <ChangeAccountKey>Email:</ChangeAccountKey>
                        {
                            editEmail ? (
                                <>
                                    <ChangeAccountFormInput value={ email ?? '' } onChange={ onEmailChange } />
                                    <FaCheck icon={ faCheck } size={ 'xs' } onClick={ changeEditEmail } />
                                </>
                            ) : (
                                <>
                                    <ChangeAccountValue>{email}</ChangeAccountValue>
                                    <FaPencil icon={ faPencilAlt } size={ 'xs' } onClick={ changeEditEmail } />
                                </>
                            )
                        }
                    </UserData>
                    {
                        message && (
                            <AccountSettingsMessageLabel>
                                {message}
                            </AccountSettingsMessageLabel>
                        )
                    }
                </ChangeAccountForm>
            </AccountSettingsCard>
        </AccountSettingsLayout>
    );
}

export default AccountSettings;
