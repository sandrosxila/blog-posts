import React from 'react';
import './App.css';

import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import AboutUs from './components/AboutUs';
import AccountSettings from './components/AccountSettings';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Navbar from './components/layout/Navbar';
import NotFound from './components/NotFound';
import Post from './components/Post';
import PostBoard from './components/PostBoard';
import UserPostBoard from './components/UserPostBoard';
import Welcome from './components/Welcome';
import { AuthState } from './slices/authSlice';
import { useAppSelector } from './store';


const AuthGuard = () => {
    const isLoggedIn = useAppSelector((state: { auth: AuthState }) => state.auth.isLoggedIn);

    if(!isLoggedIn){
        return <Navigate to={ '/welcome' } />;
    } 

    return <Outlet/>;
};


function App() {


    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Routes>
                    <Route element={ <AuthGuard /> }>
                        <Route path='/' element={ <PostBoard/> } />
                        <Route path='/account-settings' element={ <AccountSettings/> } />
                        <Route path='/add' element={ <AddPost/> } />
                        <Route path='/:userId/posts' element={ <UserPostBoard/> } />
                        <Route path='/:userId/posts/:postId' element={ <Post/> } />
                        <Route path='/edit/:postId' element={ <EditPost/> } />
                    </Route>
                
                    <Route path='/welcome' element={ <Welcome/> } />
                    <Route path={ '/about-us' } element={ <AboutUs/> } />
                    <Route path="*" element={ <NotFound/> } />
                </Routes>
            </main>
        </>
    );
}

export default App;