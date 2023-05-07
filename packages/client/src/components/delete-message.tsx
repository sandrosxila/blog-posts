import React from 'react';

import styles from './delete-message.module.scss';

export type Props = {
    onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
    onCloseClick: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    message?: string;
};

function DeleteMessage({ onDeleteClick, onCloseClick, message }: Props) {
    return (
        <div className={ styles.overlay } id="overlay" onClick={ onCloseClick }>
            <div className={ styles.deleteMessageCard }>
                <h2 className={ styles.deleteMessageHeader }>{message}</h2>
                <div className={ styles.buttonGroup }>
                    <button className={ styles.deleteButton } onClick={ onDeleteClick }>
                        Yes I am sure
                    </button>
                    <button className={ styles.closeItem } onClick={ onCloseClick }>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteMessage;
