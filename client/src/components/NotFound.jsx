import React from 'react';
import styled from 'styled-components';

const NotFoundPageLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 4rem);

    @media only screen and (max-width: 976px){
        flex-direction: column;
    }

    &:before{
        content:'';
        position: absolute;
        width: 100%;
        height: calc(100vh - 4rem);
        background: #b4a1f7;
        clip-path: polygon(68.5% 0,100% 0%,100% 100%,55% 100%);
        z-index: -1;

        @media only screen and (max-width: 1296px){
            flex-direction: column;
            clip-path: polygon(59.5% 0,100% 0%,100% 100%,45% 100%);
        }

        
        @media only screen and (max-width: 976px){
            flex-direction: column;
            clip-path: polygon(0 11.5%, 100% 70%, 100% 100%, 0 100%);
        }
    }
`;

const NotFoundBoard = styled.div`
    /* background: orange; */
    color: #5a189a;
    flex: 2 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 4rem;
    padding: 10rem 4rem;
    @media only screen and (max-width: 976px){
        flex: 1 0 0;
        padding: 0;
        font-size: 2rem;
        align-items: center;
        justify-content: center;
    }
`;


function LogIn() {

    return (
        <NotFoundPageLayout>
            <NotFoundBoard>
                Page Not Found!!!
            </NotFoundBoard>
        </NotFoundPageLayout>
    );
}

export default LogIn;
