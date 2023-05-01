import axios from 'axios';

import { Post } from '../models';

export const getUserPosts = (userId: string) => axios.get<Post[]>(`/api/users/${userId}/posts`).then(({ data }) => data);