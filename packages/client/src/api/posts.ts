import axios from 'axios';

export const getAllPosts = () => axios.get('/api/posts').then(({ data }) => data);

export const deletePost = (postId: string) => axios.delete(`/api/posts/${postId}`);