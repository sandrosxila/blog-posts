import React from 'react';
import styled from 'styled-components';

const UserProfileCard = styled.div`
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
    return (
        <UserProfileCard>
            <ProfilePhotoArea src="https://via.placeholder.com/100x300" alt="Image is not Available!!!" />
            <div>
                <UserData>
                    <strong>Firstname Lastname</strong>
                </UserData>
                <UserData>
                    <SmallText>firstnamelastname@gmail.com</SmallText>
                </UserData>
            </div>
        </UserProfileCard>
    );
}

export default ProfileCard;
