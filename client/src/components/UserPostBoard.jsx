import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import styled from 'styled-components';
import PostCard from './PostCard';
import ProfileCard from './ProfileCard';
import UserActions from './UserActions';

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
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

function UserPostBoard() {

    const [posts, setPosts] = useState([]);

    const { userId } = useSelector(state => state.auth.userData);

    useEffect(() => {
        axios.get(`/users/${userId}/posts`)
            .then(res => {
                setPosts(res.data);
            });
    }, [setPosts, userId]);

    return (
        <PostBoardLayout>
            <LeftBar>
                <ProfileCard />
            </LeftBar>
            <ContentBoard>
                <h1>
                    {
                        `Your Posts`
                    }
                </h1>
                {
                    posts.map(post => {
                        const { title, image, content, userId, postId } = post;
                        return (
                            <PostCard
                                key={postId}
                                title={title}
                                imageSource={`/images/${image}`}
                                imageName={image}
                                content={content}
                                readMoreLink={`/${userId}/posts/${postId}`}
                                postUserId={userId}
                                postId={postId}
                                setPosts={setPosts}
                                postsUrl={`/users/${userId}/posts`}
                            />
                        );
                    })
                }
            </ContentBoard>
            <RightBar>
                <UserActions/>
            </RightBar>
        </PostBoardLayout>
    )
}

export default UserPostBoard;
