import React from 'react';

import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { store } from './store';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.setAuthorization(`Bearer ${token}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
        const refreshToken = localStorage.getItem('refresh_token');
        const originalConfig = error.config as InternalAxiosRequestConfig & {
            _retry: boolean;
        };

        console.log(originalConfig);

        if (
            error.response?.status === 401 &&
            refreshToken &&
            !originalConfig._retry
        ) {
            originalConfig._retry = true;
            try {

                const { data } = await axios({
                    url: '/api/users/refresh',
                    method: 'post',
                    data: {
                        ['refresh_token']: refreshToken,
                    },
                    _retry: true,
                } as InternalAxiosRequestConfig & { _retry: boolean });

                localStorage.setItem('token', data['access_token']);
                localStorage.setItem('refresh_token', data['refresh_token']);

                return axios(originalConfig);
            } catch {
                return error;
            }
        }
        return error;
    }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
