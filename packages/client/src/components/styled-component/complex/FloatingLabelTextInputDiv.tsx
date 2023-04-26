import React from 'react';

import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import TextInput from '../TextInput';

const InputDiv = styled.div`
    position: relative;
    margin: 0.2rem;

    & > label {
        display:inline-block;
        align-self: flex-start;
        margin:0.2rem 0;
        font-weight: 400;
        font-size: 0.9rem;
        visibility: hidden;
        position:absolute;
        top: 15%;
        left: 3.7%;
        transition: all ease-out 0.2s;
    }

    & > input:focus + label{
        --text-shadow-color : #ffffff;
        visibility: visible;
        display: inline-block;
        align-self: flex-start;
        margin:0.2rem 0;
        font-size: 0.6rem;
        position:absolute;
        top: -25%;
        left: 3.9%;
        color:black;
        text-shadow: 0 0 1px var(--text-shadow-color, white),
                     0 0 2px var(--text-shadow-color, white), 
                     0 0 3px var(--text-shadow-color, white), 
                     0 0 4px var(--text-shadow-color, white), 
                     0 0 5px var(--text-shadow-color, white),
                     0 0 6px var(--text-shadow-color, white),
                     0 0 7px var(--text-shadow-color, white), 
                     0 0 8px var(--text-shadow-color, white), 
                     0 0 9px var(--text-shadow-color, white), 
                     0 0 10px var(--text-shadow-color, white);
    }
    
`;

type Props = {
    className?: string,
    id: string,
} & React.ComponentProps<typeof TextInput>;


function FloatingLabelTextInputDiv({ className: inputDivClassName, id: inputDivId, ...filteredProps }: Props) {
    const textInputId = uuid();
    
    return (
        <InputDiv className={ inputDivClassName } id={ inputDivId }>
            <TextInput { ...filteredProps } id={ `${textInputId}` } />
            <label htmlFor={ `${textInputId}` }>
                {filteredProps.placeholder}
            </label>
        </InputDiv>
    );
}

export default FloatingLabelTextInputDiv;
