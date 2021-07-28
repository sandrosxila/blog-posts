import React from 'react';
import styled from 'styled-components';

const AboutPageLayout = styled.div`
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

const AboutUsBoard = styled.div`
    color: #5a189a;
    flex: 2 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction:column;
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

const DetailsBoard = styled.div`
    color: #ffffff;
    flex: 1 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction:column;
    font-size: 2rem;
    padding: 10rem 4rem;
    @media only screen and (max-width: 976px){
        flex: 1 0 0;
        padding: 0;
        font-size: 2rem;
        align-items: center;
        justify-content: center;
    }
`;

function AboutUs() {
    return (
        <AboutPageLayout>
            <AboutUsBoard>
                This is Blog-Posts Web-Page.
            </AboutUsBoard>
            <DetailsBoard>
                The Website uses React and Express JS.
            </DetailsBoard>
        </AboutPageLayout>
    )
}

export default AboutUs
