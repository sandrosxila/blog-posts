import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './App.css';

import Navbar from './components/layout/Navbar';
import PostBoard from './components/PostBoard';
import Welcome from './components/Welcome';
import AddPost from './components/AddPost';

function App() {

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {/* <Welcome/> */}
                {/* <PostBoard/> */}
                <AddPost/>
            </main>
        </>
    );
}

export default App;
