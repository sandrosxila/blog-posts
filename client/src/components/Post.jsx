import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './styled-component/Card';
import ReactHtmlParser from 'react-html-parser';

const AddPostLayout = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    padding: 0 1.5rem; 
    min-height: calc(100vh - 4rem);
`;

const PostCard = styled(Card)`
    width: 100%;
    height: auto;
    min-height: calc(100vh - 7rem);
    margin: 1.5rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
    box-sizing: border-box;
`;

const PostImage = styled.img`
    height: 15rem; 
    width: 100%; 
    object-fit: cover;
`;

function Post(props) {

    const urlPostId = props.match.params.postId;


    const [postData, setPostData] = useState({});

    useEffect(() => {
        axios.get(`/posts/${urlPostId}`)
            .then(
                res => {
                    setPostData(res.data);
                    console.log(postData);
                }
            )
    }, [setPostData, urlPostId, postData]);

    const { title, image, content } = postData;

    return (
        <AddPostLayout>
            <PostCard>
                <PostImage src={`/images/${image}`} alt="Loading ..."
                    onError={
                        (e) => {
                            // e.target.style.display = 'none';
                        }
                    }
                />
                <h1>
                    {title}
                </h1>
                <div>
                    {ReactHtmlParser(content)}
                </div>
            </PostCard>
        </AddPostLayout>
    );
}

export default Post;
