import './App.css';
import Header from './myComponents/header/Header';
import Home from './myComponents/home/Home';
import Footer from './myComponents/footer/Footer';
import Posts from "./myComponents/posts/Posts";
import Upload from "./myComponents/upload/Upload";
import DashBoard from "./myComponents/profile/DashBoard";
import Comments from "./myComponents/comments/PostPage";
import Login from "./myComponents/login/Login";
import Register from "./myComponents/register/Register";
import UsersPage from './myComponents/Users/UsersPage';
import Update from './myComponents/update/Update';
import FollowingPosts from './myComponents/posts/FollowingPosts';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/posts' element={<Posts/>} />
              <Route path='/upload' element={<Upload/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/dashboard' element={<DashBoard/>} />
              <Route path='/users' element={<UsersPage/>}/>
              <Route path='/update' element={<Update/>}/>
              <Route path='/followingposts' element={<FollowingPosts/>}/>
              <Route path='/dashboard/:userid' element={<DashBoard/>}/>
              <Route path='/postcomments/:_id' element={<Comments/>}/>
              <Route path='/editpost/:id' element={<Upload/>}/> 
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
