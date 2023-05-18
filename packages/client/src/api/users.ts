import axios from 'axios';

import { Post, User } from '../models';
import { UserData } from '../slices/authSlice';

export const userSignUp = (formData: FormData) =>
    axios
        .post<{
        userData: UserData;
        access_token: string;
        refresh_token: string;
        message: string;
    }>('/api/users/signup', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(({ data }) => data);

export const userLogIn = (credentials: { email: string, password: string }) => axios.post<{
    access_token: string,
    refresh_token: string
}>('/api/users/login', credentials).then(({ data }) => data);

export const updateUser = (
    userId: string,
    user: Partial<Omit<User, 'photo'>>
) => axios.put(`/api/users/${userId}`, { ...user });

export const updateUserPhoto = (userId: string, formData: FormData) =>
    axios
        .put<{ photo: string }>(`/api/users/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(({ data }) => data);

export const getUserPosts = (userId: string) =>
    axios.get<Post[]>(`/api/users/${userId}/posts`).then(({ data }) => data);