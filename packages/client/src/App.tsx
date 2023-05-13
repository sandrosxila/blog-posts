import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import AboutUs from './components/about-us';
import AccountSettings from './components/account-settings';
import AddPost from './components/add-post';
import EditPost from './components/edit-post';
import Navbar from './components/layout/navbar';
import NotFound from './components/not-found';
import Post from './components/post';
import PostBoard from './components/post-board';
import UserPostBoard from './components/user-post-board';
import Welcome from './components/welcome';
import { AuthState } from './slices/authSlice';
import { useAppSelector } from './store';

const AuthGuard = () => {
    const isLoggedIn = useAppSelector(
        (state: { auth: AuthState }) => state.auth.isLoggedIn
    );

    if (!isLoggedIn) {
        return <Navigate to={ '/welcome' } />;
    }

    return <Outlet />;
};

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={ queryClient }>
            <header>
                <Navbar />
            </header>
            <main>
                <Routes>
                    <Route element={ <AuthGuard /> }>
                        <Route path="/" element={ <PostBoard /> } />
                        <Route path="/account-settings" element={ <AccountSettings /> } />
                        <Route path="/add" element={ <AddPost /> } />
                        <Route path="/:userId/posts" element={ <UserPostBoard /> } />
                        <Route path="/:userId/posts/:postId" element={ <Post /> } />
                        <Route path="/edit/:postId" element={ <EditPost /> } />
                    </Route>

                    <Route path="/welcome" element={ <Welcome /> } />
                    <Route path={ '/about-us' } element={ <AboutUs /> } />
                    <Route path="*" element={ <NotFound /> } />
                </Routes>
            </main>
        </QueryClientProvider>
    );
}

export default App;
