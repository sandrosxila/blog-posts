import axios from 'axios';

import { Post } from '../models';

export const getPost = (postId: string) =>
    axios.get<Post>(`/api/posts/${postId}`).then(({ data }) => data);

export const getAllPosts = () =>
    axios.get<Post[]>('/api/posts').then(({ data }) => data);

export const addPost = (formData: FormData) =>
    axios.post('/api/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const updatePost = (postId: string, formData: FormData) =>
    axios.put(`/api/posts/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const deletePost = (postId: string) =>
    axios.delete(`/api/posts/${postId}`);
