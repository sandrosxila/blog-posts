import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './edit-post.module.scss';
import { getPost, updatePost } from '../api/posts';

function EditPost() {
    const [content, setContent] = useState('');
    const editorConfig = {
        readonly: false,
        width: '100%',
        minHeight: '280',
    };

    const { postId: urlPostId } = useParams();

    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState('');

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('Upload New Image...');
    const [fileUrlName, setFileUrlName] = useState('');
    const [fileOriginalUrlName, setFileOriginalUrlName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [newImageUploaded, setNewImageUploaded] = useState(false);

    useQuery({
        queryKey: ['edit_post'],
        queryFn: () => getPost(urlPostId as string),
        onSuccess: (data) => {
            const { image, content, title } = data;
            setPostTitle(title);
            setContent(content);
            if (image !== null && image !== 'null') {
                setFileOriginalUrlName(`/api/images/${image}`);
                setFileUrlName(`/api/images/${image}`);
            }
        },
        onError: () => {
            navigate('/');
        },
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (newImageUploaded && file) {
            formData.append('file', file);
        }
        formData.append('title', postTitle);
        formData.append('content', content);

        if (fileOriginalUrlName !== fileUrlName && fileOriginalUrlName !== '') {
            try {
                await axios.delete(fileOriginalUrlName);
            } catch {
                alert('file is not deleted');
            }
        }

        try {
            await updatePost(urlPostId as string, formData);
            setAlertMessage('');
            navigate('/');
        } catch {
            setAlertMessage('Unable To Edit Post');
        }
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewImageUploaded(true);
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
            setFileUrlName(URL.createObjectURL(e.target.files[0]));
        }
    };

    const onImageDeleteClick = () => {
        setNewImageUploaded(false);
        setFileUrlName('');
    };

    return (
        <div className={ styles.editPostLayout }>
            <div className={ styles.postCard }>
                <form
                    className={ styles.postForm }
                    onSubmit={ onSubmit }
                    encType="multipart/form-data"
                >
                    <h1>Edit Post</h1>
                    <label htmlFor="title">Title:</label>
                    <input
                        className={ styles.postTitle }
                        placeholder="Enter Title of New Blog"
                        id="title"
                        onChange={ (e) => setPostTitle(e.target.value) }
                        value={ postTitle }
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
                    {
                        fileUrlName && (
                            <>
                                <label className={ styles.alertLabel } onClick={ onImageDeleteClick }>
                                    Click Here To Erase Image
                                </label>
                                <img
                                    className={ styles.editPostImage }
                                    src={ fileUrlName }
                                    alt="unable to load"
                                    onError={ () => setFileUrlName('') }
                                />
                            </>
                        )
                    }
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

export default EditPost;
