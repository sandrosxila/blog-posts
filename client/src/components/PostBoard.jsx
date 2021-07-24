import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import ProfileCard from './ProfileCard';

const PostBoardLayout = styled.div`
    display: grid;
    grid-template-areas: 'left-bar content-board right-bar';
    grid-template-columns: 1fr 2fr 1fr;
    padding: 0 4rem;
`;

const LeftBar = styled.aside`
    grid-area: left-bar;
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;
`;

const ContentBoard = styled.div`
    grid-area: content-board;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:2rem;
    padding: 2rem 5rem;
`;

const RightBar = styled.aside`
    grid-area: right-bar;
`;

function PostBoard() {

    return (
        <PostBoardLayout>
            <LeftBar>
                <ProfileCard/>
            </LeftBar>
            <ContentBoard>
                <PostCard/>
                <PostCard/>
            </ContentBoard>
            <RightBar>

            </RightBar>
        </PostBoardLayout>
    )
}

export default PostBoard;
