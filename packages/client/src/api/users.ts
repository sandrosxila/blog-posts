import axios from 'axios';

import { Post, User } from '../models';
import { UserData } from '../slices/authSlice';

export const userSignUp = (formData: FormData) =>
    axios
        .post<{
        userData: UserData;
        message: string;
    }>('/api/users/signup', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(({ data }) => data);

export const updateUser = (userId: string, user: Partial<Omit<User, 'photo'>>) =>
    axios.put(`/api/users/${userId}`, { ...user });

export const updateUserPhoto = (userId: string, formData: FormData) =>
    axios.put<{ photo: string }>(`/api/users/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(({ data }) => data);

export const getUserPosts = (userId: string) =>
    axios.get<Post[]>(`/api/users/${userId}/posts`).then(({ data }) => data);
