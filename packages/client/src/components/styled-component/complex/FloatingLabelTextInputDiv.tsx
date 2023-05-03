import React from 'react';

import classNames from 'classnames';

import styles from './floating-label-text-input.module.scss';
import TextInput from '../TextInput';

type Props = {
    className?: string;
    id?: string;
} & React.ComponentProps<typeof TextInput>;

function FloatingLabelTextInputDiv({
    className: wrapperClassName,
    id: inputDivId,
    ...filteredProps
}: Props) {
    const textInputId = React.useId();

    return (
        <div
            id={ inputDivId }
            className={ classNames(styles.inputWrapper, wrapperClassName) }
        >
            <input { ...filteredProps } id={ `${textInputId}` } />
            <label htmlFor={ `${textInputId}` }>{filteredProps.placeholder}</label>
        </div>
    );
}

export default FloatingLabelTextInputDiv;
