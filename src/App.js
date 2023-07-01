import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Blogs from './Components/Blogs';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import UserBlogs from './Components/UserBlogs';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { useState, createContext } from 'react';
import LogOut from './Components/LogOut';
import DisplayBlog from './Components/DisplayBlog';
import MakeBlog from './Components/MakeBlog';
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


  return (
    <div className='App'>
      <AppContext.Provider value={{isLoggedIn,setIsLoggedIn,user,setUser}}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={isLoggedIn === 1 ? <Blogs /> : <Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile' element={isLoggedIn === 1 ? <Profile /> : <Login />} />
          <Route path='/myBlogs' element={isLoggedIn === 1 ? <UserBlogs /> : <Login />} />
          <Route path='/makeBlog' element={isLoggedIn === 1 ? <MakeBlog /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={isLoggedIn === 1 ? <LogOut /> : <Login />} />
          <Route path='/myBlogs/:id' element={isLoggedIn === 1 ? <DisplayBlog /> : <Login />} />
          <Route path='/:id' element={isLoggedIn === 1 ? <DisplayBlog /> : <Login />} />
        </Routes>
        <Footer/>
        </Router>
        </AppContext.Provider>
    </div>
  );
}

export default App;
