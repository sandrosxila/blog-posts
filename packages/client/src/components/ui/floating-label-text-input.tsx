import React from 'react';

import classNames from 'classnames';

import styles from './floating-label-text-input.module.scss';

type Props = {
    className?: string;
    id?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FloatingLabelTextInput = React.forwardRef<HTMLInputElement, Props>(({
    className: wrapperClassName,
    id: inputDivId,
    ...filteredProps
}, ref) => {
    const textInputId = React.useId();

    return (
        <div
            id={ inputDivId }
            className={ classNames(styles.inputWrapper, wrapperClassName) }
        >
            <input { ...filteredProps } id={ `${textInputId}` } ref={ ref }/>
            <label htmlFor={ `${textInputId}` }>{filteredProps.placeholder}</label>
        </div>
    );
});

export default FloatingLabelTextInput;
