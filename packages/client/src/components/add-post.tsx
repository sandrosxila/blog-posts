import React, { useState, useRef } from 'react';

import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';

import styles from './add-post.module.scss';
import { addPost } from '../api/posts';
import { useAppSelector } from '../store';

function AddPost() {
    const navigate = useNavigate();

    const titleRef = useRef<HTMLInputElement | null>(null);

    const [content, setContent] = useState('');
    const editorConfig = {
        readonly: false,
        width: '100%',
        minHeight: '280',
    };

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('Please Upload Your Image...');

    const [alertMessage, setAlertMessage] = useState('');

    const userData = useAppSelector((state) => state.auth.userData);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (titleRef.current?.value && userData.userId) {
            const formData = new FormData();

            if (file) {
                formData.append('file', file);
            }
            formData.append('title', titleRef.current.value);
            formData.append('content', content);
            formData.append('userId', userData.userId);

            try{
                await addPost(formData);
                setAlertMessage('');
                navigate('/');
            }
            catch {
                setAlertMessage('Unable To Add Post');
            }
        }
        else {
            setAlertMessage('Please fill all fields');
        }
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className={ styles.addPostLayout }>
            <div className={ styles.postCard }>
                <form
                    className={ styles.postForm }
                    onSubmit={ onSubmit }
                    encType="multipart/form-data"
                >
                    <h1>Add Post</h1>
                    <label htmlFor="title">Title:</label>
                    <input
                        className={ styles.postTitle }
                        placeholder="Enter Title of New Blog"
                        id="title"
                        ref={ titleRef }
                    />
                    <div className={ styles.postFileUpload }>
                        <input
                            className={ styles.postFileInput }
                            type="file"
                            id="file"
                            onChange={ onFileInputChange }
                        />
                        <label className={ styles.postFileLabel } htmlFor="file">
                            {fileName}
                        </label>
                    </div>
                    <div className={ styles.editor }>
                        <JoditEditor
                            config={ editorConfig }
                            value={ content }
                            onBlur={ (newContent) => setContent(newContent) }
                        />
                    </div>

                    {
                        alertMessage && (
                            <label className={ styles.alertLabel }>{alertMessage}</label>
                        )
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
