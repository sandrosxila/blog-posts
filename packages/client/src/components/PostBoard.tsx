import React, { useState, useEffect } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import PostCard from './PostCard';
import ProfileCard from './ProfileCard';
import UserActions from './UserActions';

const PostBoardLayout = styled.div`
    display: grid;
    grid-template-areas: 'left-bar content-board right-bar';
    grid-template-columns: 1fr 2fr 1fr;
    padding: 0 4rem;

    @media only screen and (max-width: 1250px){
        grid-template-areas: 'left-bar  content-board'
                             'right-bar content-board'
                             '......... content-board';
        padding: 0 2rem;
    }

    @media only screen and (max-width: 1000px){
        grid-template-areas: 'left-bar      right-bar'
                             'content-board content-board';
        padding: 0 2rem;
    }
`;

const LeftBar = styled.aside`
    grid-area: left-bar;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    @media only screen and (max-width: 1000px){
        & > div:first-child{
            min-width:3rem;
        }
    }
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
    display: flex;
    flex-direction: column;
    padding: 2rem;
    @media only screen and (max-width: 1000px){
        & > div:first-child{
            min-width:3rem;
        }
    }
`;

function PostBoard() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('/posts')
            .then((res) => {
                setPosts(res.data);
            }).catch(e => console.log(e));

    }, [setPosts]);


    return (
        <PostBoardLayout>
            <LeftBar>
                <ProfileCard />
            </LeftBar>
            <RightBar>
                <UserActions/>
            </RightBar>
            <ContentBoard>
                {
                    posts.map(post => {
                        const { title, image, content, userId, postId } = post;
                        return (
                            <PostCard
                                key={ postId }
                                title={ title }
                                imageSource={ `/images/${image}` }
                                imageName={ image }
                                content={ content }
                                readMoreLink={ `/${userId}/posts/${postId}` }
                                postUserId={ userId }
                                postId={ postId }
                                setPosts={ setPosts }
                                postsUrl={ '/posts' }
                            />
                        );
                    })
                }
            </ContentBoard>
            
        </PostBoardLayout>
    );
}

export default PostBoard;
