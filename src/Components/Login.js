import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import {useForm } from 'react-hook-form';
import Axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

function Login() {

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(15).required(),
    });

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setIsLoggedIn , setUser} = useContext(AppContext);
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = (data) => {
        
        setEmail(data.email);
        setPassword(data.password);
        console.log(data);
    }
    
    const getBlogger =  async () => {
    
        return await Axios.post(`http://localhost:8080/getBloggerByEmail/${email}`).then((response) => {
            console.log(response?.data);
            console.log(response?.status);
            console.log(response);
            console.log(response?.statusText);
        return response?.data;
        });

    }

    React.useEffect(() => {
        if (email !== "" && email !== undefined && email !== null) {
            getBlogger().then((data) => {
                console.log(data);
                if (data !== null && data !== "" && data !== undefined) {

                    if (password !== data?.password) {
                    
                        console.log("Incorrect Password");
                        
                    }
                    else {
                        console.log("User found");
                        var user = new User(data.idString, data.name, data.email, data.password, data.role, data.created_at, data.blogs.length);
                        console.log(user.blogsCount);
                        setUser(user);
                        setIsLoggedIn(1);
                    }
                }
                else {
                    console.log("User not found");
                }
            
            });
            
        }
        else
        {
            console.log("Email is empty");
        }
    }, [email,password]);


    return (
        <div className='login-body'>

            <form className='login' onSubmit={handleSubmit(onSubmit)} method='POST'>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Email address</label>
                    <input type="text" id="form2Example1" className="form-control" {...register("email")} />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">Password</label>
                    <input type="text" id="form2Example2" className="form-control" {...register("password")} />
            </div>
                
                <div className="row">
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                </div>

            <div className="text-center">
                <p>Not a member? <Link to="/register">Register</Link></p>
            </div>
            </form>
        </div>
    )
}

export default Login;