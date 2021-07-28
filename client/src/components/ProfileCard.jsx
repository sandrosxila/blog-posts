import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

const UserProfileCard = styled.div`
    position: sticky;
    top: 1rem;
    min-width: 14rem;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #6910a8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const ProfilePhotoArea = styled.img`
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
    object-fit: cover;
`;

const UserData = styled.p`
    text-align: center;
    margin:0;
`;

const SmallText = styled.small`
    color: grey;
`;

function ProfileCard() {

    const userData = useSelector(state => state.auth.userData);
    const [imageFail, setImageFail] = useState(false);

    const { userId, firstName, lastName, email, photo } = userData;

    return (
        <UserProfileCard>
            <ProfilePhotoArea src={`/photos/${userId}/${photo}`} alt="Image is not Available!!!"
                onError={
                    (e) => {
                        e.target.style.display = 'none';
                        setImageFail(true);
                    }
                }
            />
            {imageFail && <FontAwesomeIcon icon={faFileImage} />}
            <div>
                <UserData>
                    <strong>{firstName} {lastName}</strong>
                </UserData>
                <UserData>
                    <SmallText>{email}</SmallText>
                </UserData>
            </div>
        </UserProfileCard>
    );
}

export default ProfileCard;
