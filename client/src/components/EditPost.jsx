import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from './styled-component/TextInput';
import Card from './styled-component/Card';
import Button from './styled-component/Button';
import JoditEditor from "jodit-react";

const EditPostLayout = styled.div`
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
    font-size:0.73rem;
    align-self: flex-start;
`;

const EditPostImage = styled.img`
    max-height:35rem;
`;

function EditPost(props) {

    const [content, setContent] = useState('');
    const editorConfig = {
        readonly: false,
        width: "100%",
        minHeight: "280"
    }

    const urlPostId = props.match.params.postId;
    const userData = useSelector(state => state.auth.userData);
    const [postData, setPostData] = useState({});
    const history = useHistory();

    const titleRef = useRef(null);

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Upload New Image...');
    const [fileUrlName, setFileUrlName] = useState('');
    const [fileOriginalUrlName, setFileOriginalUrlName] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [newImageUploaded, setNewImageUploaded] = useState(false);

    useEffect(() => console.log(fileUrlName), [fileUrlName]);

    useEffect(() => {
        axios.get(`/posts/${urlPostId}`)
            .then(
                res => {
                    setPostData(res.data);
                    const { image, content, title } = res.data;
                    titleRef.current.value = title;
                    setContent(content);
                    if (image !== null && image !== 'null') {
                        setFileOriginalUrlName(`/images/${image}`);
                        setFileUrlName(`/images/${image}`);
                    }

                }
            )
            .catch(
                err => {
                    history.push('/');
                }
            )
    }, [setPostData, setFileUrlName, history, urlPostId]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (newImageUploaded) {
            const newFileName = uuid() + '.' + fileName.split('.').pop();
            formData.append('file', file, newFileName);
        }
        else {
            formData.append('file', '');
        }
        formData.append('title', titleRef.current.value);
        formData.append('content', content);
        formData.append('userId', userData.userId);
        formData.append('prevImage', postData.image);

        if (fileOriginalUrlName !== fileUrlName && fileOriginalUrlName!=='') {
            axios.delete(fileOriginalUrlName)
                .then(
                    res => {
                        console.log("deleted");
                    }
                )
                .catch(
                    err => {
                        console.log("file is not deleted")
                    }
                );
        }

        axios.put(`/posts/${urlPostId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                setAlertMessage(null);
                history.push('/');
            })
            .catch((err) => {
                setAlertMessage('Unable To Edit Post');
            });
    }

    const onFileInputChange = (e) => {
        setNewImageUploaded(true);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setFileUrlName(URL.createObjectURL(e.target.files[0]));
    }

    const onImageDeleteClick = (e) => {
        setNewImageUploaded(false);
        setFileUrlName('');
    }



    return (
        <EditPostLayout>
            <PostCard>
                <PostForm onSubmit={onSubmit} encType="multipart/form-data">
                    <h1>
                        Edit Post
                    </h1>
                    <label htmlFor="title">
                        Title:
                    </label>
                    <PostTitle placeholder="Enter Title of New Blog" id="title" ref={titleRef} />
                    <PostFileUpload>
                        <PostFileInput type="file" id="file" onChange={onFileInputChange} />
                        <PostFileLabel htmlFor="file">
                            {fileName}
                        </PostFileLabel>
                    </PostFileUpload>
                    {
                        fileUrlName &&
                        <>
                            <AlertLabel onClick={onImageDeleteClick}>Click Here To Erase Image</AlertLabel>
                            <EditPostImage src={fileUrlName} alt="unable to load" onError={e => setFileUrlName('')} />
                        </>
                    }
                    <JoditEditor
                        config={editorConfig}
                        value={content}
                        tabIndex={1}
                        onBlur={newContent => setContent(newContent)}
                    />
                    {
                        alertMessage && <AlertLabel>{alertMessage}</AlertLabel>
                    }
                    <PostButton>
                        Post
                    </PostButton>
                </PostForm>
            </PostCard>
        </EditPostLayout>
    );
}

export default EditPost;
