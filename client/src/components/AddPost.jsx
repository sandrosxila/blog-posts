import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import TextInput from './styled-component/TextInput';
import Card from './styled-component/Card';
import Button from './styled-component/Button';

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

const PostForm = styled.form`
    display:flex;
    gap:0.5rem;
    flex-direction: column;
    align-items: flex-start;
`;

const PostTitle = styled(TextInput)`
    --box-shadow-color : #6910a818;
    width: 98.8%;
    height: 2.5rem;
    font-size: 1.3rem;
    font-weight: 500;
    align-self:center;
`;

const PostButton = styled(Button)`
    background:#6910a8;
    color: white;
    border: 1px solid transparent;
    height: 2.5rem;
    width: 5rem;
    font-size: 1.3rem;
    font-weight: 500;
    margin: 1rem 0;

    &:hover{
        border: 1px solid #6910a8;
        background: #500c81;
    }

    &:focus{
        outline:none;
        box-shadow: 0 0 5px 1px #6910a8a0 ;
    }
`;

function AddPost() {
    return (
        <AddPostLayout>
            <PostCard>
                <PostForm action="">
                    <h1>
                        Add Post
                    </h1>
                    <label htmlFor="title">
                        Title:
                    </label>
                    <PostTitle placeholder="Enter Title of New Blog" id="title" />
                    <Editor />
                    <PostButton>
                        Post
                    </PostButton>
                </PostForm>
            </PostCard>
        </AddPostLayout>
    );
}

export default AddPost;
