import React from 'react';
import styled from 'styled-components';
import Card from './styled-component/Card';
import Button from './styled-component/Button';

const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 2;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const DeleteMessageCard = styled(Card)`
    width:32rem;
    display:flex;
    height:auto;
    width:auto;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
`;

const DeleteMessageHeader = styled.h2`
    margin:0;
`;

const ButtonGroup = styled.div`
    display:flex;
    flex-direction: row;
    gap:0.7rem;
    justify-content: center;
`;

const DeleteButton = styled(Button)`
    background:#6910a8;
    color: white;
    border: 1px solid transparent;

    &:hover{
        border: 1px solid #6910a8;
        background: #500c81;
    }

    &:focus{
        outline:none;
        box-shadow: 0 0 5px 1px #6910a8a0 ;
    }
`;

const CloseItem = styled.button`
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    color: #6910a8;
    transition: all ease-in 0.25s;
    font-size: 1.1rem;
    font-weight: 500;
    &:hover{
        text-shadow: 0 0 1px #7c14c7ca;
    }
`;

function DeleteMessage({ onDeleteClick, onCloseClick, message }) {
    return (
        <>
            <Overlay id="overlay" onClick={onCloseClick}>
                <DeleteMessageCard>
                    <DeleteMessageHeader>
                        {message}
                    </DeleteMessageHeader>
                    <ButtonGroup>
                        <DeleteButton onClick={onDeleteClick}>
                            Yes I am sure
                        </DeleteButton>
                        <CloseItem onClick={onCloseClick}>
                            Close
                        </CloseItem>
                    </ButtonGroup>
                </DeleteMessageCard>
            </Overlay>
        </>
    );
}

export default DeleteMessage
