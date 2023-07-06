import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Blogs from './Components/Blogs';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import UserBlogs from './Components/UserBlogs';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import React, { useState, createContext } from 'react';
import LogOut from './Components/LogOut';
import DisplayBlog from './Components/DisplayBlog';
import MakeBlog from './Components/MakeBlog';
import EditProfile from './Components/EditProfile';
import UploadImage from './Components/UploadImage';
import EditBlog from './Components/EditBlog';
export const AppContext = createContext();

class User {
  constructor(id, name, email, password, role, createdAt, blogsCount) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.blogsCount = blogsCount;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [user, setUser] = useState(new User());
  const [image, setImage] = React.useState("https://res.cloudinary.com/dhmfl6vxk/image/upload/v1688304591/samples/balloons.jpg");

  return (
    <div className='App'>
      <AppContext.Provider value={{isLoggedIn,setIsLoggedIn,user,setUser,image,setImage}}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={isLoggedIn === 1 ? <Blogs /> : <Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile' element={isLoggedIn === 1 ? <Profile /> : <Login />} />
          <Route path='/myBlogs' element={isLoggedIn === 1 ? <UserBlogs /> : <Login />} />
          <Route path='/makeBlog' element={isLoggedIn === 1 ? <MakeBlog /> : <Login />} />
          <Route path='/editProfile' element={isLoggedIn === 1 ? <EditProfile /> : <Login />} />
          <Route path='/updateBlog/:id' element={isLoggedIn === 1 ? <EditBlog /> : <Login />} />
          {/* <Route path='/likeBlog/:id' element={isLoggedIn === 1 ? <LikeBlog /> : <Login />} /> */}
          {/* <Route path='/deleteBlog' element={isLoggedIn === 1 ? <DeleteBlog /> : <Login />} /> */}
          <Route path='/uploadImage' element={isLoggedIn === 1 ? <UploadImage /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={isLoggedIn === 1 ? <LogOut /> : <Login />} />
          <Route path='/blog/:id' element={isLoggedIn === 1 ? <DisplayBlog /> : <Login />} />
          <Route path='/:id' element={isLoggedIn === 1 ? <DisplayBlog /> : <Login />} />
        </Routes>
        <Footer/>
        </Router>
        </AppContext.Provider>
    </div>
  );
}

export default App;
