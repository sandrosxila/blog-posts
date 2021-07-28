import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

import Navbar from './components/layout/Navbar';
import PostBoard from './components/PostBoard';
import Welcome from './components/Welcome';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Post from './components/Post';
import NotFound from './components/NotFound';
import UserPostBoard from './components/UserPostBoard';
import AccountSettings from './components/AccountSettings';
import AboutUs from './components/AboutUs';


const IsLoggedInRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return <Route {...rest} render={props => isLoggedIn ? <Component {...props} /> : <Redirect to='/welcome' />} />;
};

const IsNotLoggedInRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return <Route {...rest} render={props => !isLoggedIn ? <Component {...props} /> : <Redirect to='/welcome' />} />;
};


function App() {


    return (
        <div>
            <Router>
                <header>
                    <Navbar />
                </header>
                <main>
                    <Switch>
                        <IsLoggedInRoute exact path='/' component={PostBoard} />
                        <IsLoggedInRoute exact path='/account-settings' component={AccountSettings} />
                        <IsLoggedInRoute exact path='/add' component={AddPost} />
                        <IsLoggedInRoute exact path='/:userId/posts' component={UserPostBoard} />
                        <IsLoggedInRoute exact path='/:userId/posts/:postId' component={Post} />
                        <IsLoggedInRoute exact path='/edit/:postId' component={EditPost} />
                        <IsNotLoggedInRoute exact path='/welcome' component={Welcome} />
                        <Route exact path={'/about-us'} component={AboutUs} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default App;
