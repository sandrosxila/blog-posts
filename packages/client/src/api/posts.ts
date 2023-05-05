import axios from 'axios';

import { Post } from '../models';

export const getPost = (postId: string) => axios.get<Post>(`/api/posts/${postId}`).then(({ data }) => data);

export const getAllPosts = () => axios.get<Post[]>('/api/posts').then(({ data }) => data);

export const deletePost = (postId: string) => axios.delete(`/api/posts/${postId}`);