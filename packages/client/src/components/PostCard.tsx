import React, { useState } from 'react';

import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DeleteMessage from './DeleteMessage';
import Card from './styled-component/Card';
import { useAppSelector } from '../store';


const CardLayout = styled(Card)`
    width: 32rem;
    height: auto; 
    
    &:hover div.toolbar{
        opacity: 1;
    }
`;

const PostImage = styled.img`
    object-fit: fill;
    width: 100%;
    height:50%;
`;

const PostBody = styled.div`
    margin: 0 1.5rem;
    width: 90%;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const Button = styled(Link)`
    background: #4361ee;
    color: white;
    border: 1px solid #364fc0;
    border-radius: 0.3rem;
    padding: 0.5rem;
    margin: 1.2rem 1.5rem;
    box-shadow: none;
    padding: 0.5rem;
    height: 1rem;
    line-height:1rem;
    font-weight: 600;
    font-size: 0.8rem;
    text-decoration: none;
    transition: all ease-in-out 0.3s;

    &:hover {
        background: #364fc0;
        cursor: pointer;
        box-shadow: 0 0 8px 2px #4362ee44 ;
    }
`;

const ContentDiv = styled.div`
    max-height: 7rem;
    overflow:hidden;
    position: relative;
    &:after{
        content:'';
        position:absolute;
        top:0;
        left:0;
        background: linear-gradient(transparent 45%, white);
        width:100%;
        height:100%;
    }
`;

const FaPencil = styled(FontAwesomeIcon)`
    color:black;
    font-size:1.7rem;
    height:1.2rem;
    cursor: pointer;
`;

const FaTimes = styled(FontAwesomeIcon)`
    color:crimson;
    font-size:1.7rem;
    height: 2rem;
    cursor: pointer;
`;

const ToolBar = styled.div`
    transition: all ease-in 0.3s;
    display:flex;
    align-items:center;
    flex-direction:row-reverse;
    gap: 0.3rem;
    opacity: 0;
`;

const PostCardHeader = styled.h2`
    display:flex;
    justify-content: space-between;
    align-items:center;
`;

const EditLink = styled(Link)`
    display:flex;
    justify-content: center;
    align-items:center;
`;

type Props = { 
    imageSource: string,
    title: string,
    content: string,
    readMoreLink: string,
    postUserId: string,
    postId: string,
    setPosts: React.Dispatch<React.SetStateAction<any>>,
    imageName: string,
    postsUrl: string 
}

function PostCardLayout({ imageSource, title, content, readMoreLink, postUserId, postId, setPosts, imageName, postsUrl }: Props) {
    const { userId } = useAppSelector(state => state.auth.userData);
    const [hideImage, setHideImage] = useState(false);

    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const switchShowDeleteMessage = () => setShowDeleteMessage(!showDeleteMessage);

    const onDeleteClick = () => {
        axios.delete(`/posts/${postId}`)
            .then(res => {
                console.log('IMAGE NAME', imageName);
                if (imageName !== undefined && imageName !== null) {
                    axios.delete(`/images/remove/${imageName}`)
                        .then(res => {
                            axios.get(postsUrl)
                                .then(res => {
                                    setPosts(res.data);
                                });
                        })
                        .catch(err => {
                            console.log('image is not deleted');
                            console.log(err);
                        });
                }
                else {
                    axios.get(postsUrl)
                        .then(res => {
                            setPosts(res.data);
                        });
                }
            })
            .catch((err) => {
                console.log('FAILED TO DELETE');
            }
            );
    };

    return (
        <CardLayout>
            {
                showDeleteMessage && (
                    <DeleteMessage
                        message={ 'Do You Really Want To Delete The Post?' }
                        onDeleteClick={ onDeleteClick }
                        onCloseClick={ switchShowDeleteMessage }
                    />
                )
            }
            {
                !hideImage && (
                    <PostImage src={ imageSource } alt="Loading ..." onError={ () => setHideImage(true) } />
                )
            }
            
            <PostBody>
                <PostCardHeader>
                    {title}
                    {
                        userId === postUserId && (
                            <ToolBar className={ 'toolbar' }>
                                <FaTimes icon={ faTimes } onClick={ switchShowDeleteMessage } />
                                <EditLink to={ `/edit/${postId}` }>
                                    <FaPencil icon={ faPencilAlt } />
                                </EditLink>
                            </ToolBar>
                        )
                    }
                </PostCardHeader>
                <ContentDiv>
                    {ReactHtmlParser(content)}
                </ContentDiv>
            </PostBody>
            <ButtonGroup>
                <Button to={ readMoreLink }>
                    Read More...
                </Button>
            </ButtonGroup>
        </CardLayout>
    );
}

export default PostCardLayout;
