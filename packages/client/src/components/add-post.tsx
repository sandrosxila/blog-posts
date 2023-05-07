import React, { useState, useRef } from 'react';

import axios from 'axios';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import styles from './add-post.module.scss';
import Button from './styled-component/Button';
import Card from './styled-component/Card';
import TextInput from './styled-component/TextInput';
import { useAppSelector } from '../store';


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
    width:100%;
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
    margin: 0.5rem 0 0 0;

    &:hover{
        border: 1px solid #6910a8;
        background: #500c81;
    }

    &:focus{
        outline:none;
        box-shadow: 0 0 5px 1px #6910a8a0 ;
    }
`;

const PostFileUpload = styled.div`
    width:100%;
    position: relative;
    height: 2.5rem;
`;

const PostFileInput = styled.input`
    width:100%;
    opacity:0;
`;

const PostFileLabel = styled.label`
    --box-shadow-color: #6910a818;
    position:absolute;
    left:0;
    top:0;
    right: 0;
    height:100%;
    border:1px solid #0000081d;
    border-radius: 0.8rem;
    box-sizing:border-box;
    display: flex;
    align-items:center;
    justify-content: space-between;
    padding-left: 1rem;
    line-height:1rem;

    &:active{
        box-shadow: inset 0 0 2px 1px var(--box-shadow-color,#0000081d)
    }

    &:after{
        content: 'Upload';
        height:100%;
        width: 10%;
        min-width:6rem;
        border-radius: 0 0.8rem 0.8rem 0;
        display:flex;
        align-items:center;
        justify-content: center;
        line-height:1rem;
        background: #6910a8;
        color: white;
    }

    &:active:after{
        box-shadow: 0 0 5px 1px var(--box-shadow-color,#0000081d);
    }
`;

const AlertLabel = styled.label`
    color:crimson;
    font-size:0.9rem;
    align-self: flex-start;
`;

function AddPost() {
    const navigate = useNavigate();

    const titleRef = useRef<HTMLInputElement | null>(null);

    const [content, setContent] = useState('');
    const editorConfig = {
        readonly: false,
        width: '100%',
        minHeight: '280'
    };

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('Please Upload Your Image...');

    const [alertMessage, setAlertMessage] = useState('');

    const userData = useAppSelector(state => state.auth.userData);

    console.log(userData);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(file && titleRef.current?.value && userData.userId){
            const formData = new FormData();
            
            formData.append('file', file);
            formData.append('title', titleRef.current.value);
            formData.append('content', content);
            formData.append('userId', userData.userId);

            axios.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    setAlertMessage('');
                    navigate('/');
                })
                .catch(() => {
                    setAlertMessage('Unable To Add Post');
                });
        }
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    
    return (
        <div className={ styles.addPostLayout }>
            <div className={ styles.postCard }>
                <form className={ styles.postForm } onSubmit={ onSubmit } encType="multipart/form-data">
                    <h1>
                        Add Post
                    </h1>
                    <label htmlFor="title">
                        Title:
                    </label>
                    <input className={ styles.postTitle } placeholder="Enter Title of New Blog" id="title" ref={ titleRef } />
                    <div className={ styles.postFileUpload }>
                        <input className={ styles.postFileInput } type="file" id="file" onChange={ onFileInputChange } />
                        <label className={ styles.postFileLabel } htmlFor="file">
                            {fileName}
                        </label>
                    </div>
                    <div className={ styles.editor }>
                        <JoditEditor
                            config={ editorConfig }
                            value={ content }
                            onBlur={ newContent => setContent(newContent) }
                        />
                    </div>
                    
                    {
                        alertMessage && <label className={ styles.alertLabel }>{alertMessage}</label>
                    }
                    <button className={ styles.postButton } type="submit">
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddPost;
