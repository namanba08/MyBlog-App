import Post from './components/post'
import Header from './components/header';
import Layout from './components/layout';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/indexPage';
import RegisterPage from './pages/RegisterPage';
import "./App.css";
import {Routes, Route} from "react-router-dom";
import { UserContextProvider } from './userContext';
import CreatePost from './pages/CreatePost';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import PostPage from './pages/postPage';
import MyPostsPage from './pages/myPostsPage';
import EditPost from './pages/editPost';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

function App() {
  return ( 
    <UserContextProvider>
    <Routes>
        <Route path="/" element={<Layout />}>
             
        <Route index element={<IndexPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/create" element={<CreatePost/>}></Route>
        <Route path='/post/:id' element={<PostPage />}></Route>
        <Route path='/myPosts' element={<MyPostsPage />}></Route>
        <Route path='/edit/:id' element={<EditPost/>}></Route>
        </Route>
    </Routes>

    </UserContextProvider>

    
  );
}

export default App;
