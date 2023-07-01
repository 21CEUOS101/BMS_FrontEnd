import React, { useContext } from 'react'
import { AppContext } from '../App';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Axios from 'axios';

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

function Register() {

    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(15).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("BLOGGER");
    const { setIsLoggedIn , setUser} = useContext(AppContext);
    
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = (data) => {
        
        setEmail(data.email);
        setPassword(data.password);
        setName(data.name);
        setRole(data.role);
        console.log(data);
    }

   

    const addBlogger = async () => {
        
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('email', email);
        params.append('password', password);
        params.append('role', role);
    
        return await Axios.post(`http://localhost:8080/addBlogger`,params).then((response) => {
        console.log(response.data);
        return response.data;
        });

    }

    const getBlogger =  async () => {
    
        return await Axios.post(`http://localhost:8080/getBloggerByEmail/${email}`).then((response) => {
            console.log(response?.status);
            console.log(response?.data);
            console.log(response);
        return response?.data;
        });

    }

    React.useEffect(() => {
        if(name !== "" && email !== "" && password !== "" && role !== "" && email !== undefined && email !== null && password !== undefined && password !== null && name !== undefined && name !== null && role !== undefined && role !== null) {
            getBlogger().then((data) => {
                console.log(data);
                if(data !== null && data !== "" && data !== undefined) {
                    console.log("Email already exists");
                } else {
                    addBlogger().then((data2) => {
                        console.log(data2);
                        if(data2 !== null) {
                            console.log("User Added Successfully");
                            setUser(new User(data2.id, data2.name, data2.email, data2.password, data2.role, data2.createdAt, data2.blogsCount));
                            setIsLoggedIn(1);
                        } else {
                            console.log("User Not Added");
                        }
                    });
                }
            });
        }

        // if(name !== "" && email !== "" && password !== "" && role !== "") {
        //     addBlogger().then((data) => {
        //         console.log(data);
        //         if (data !== null) {
        //             setUser(new User(data.id, data.name, data.email, data.password, data.role, data.createdAt, data.blogsCount));
        //             setIsLoggedIn(true);
        //         }
        //     });
        // }
    }, [name,email,password,role]);

  return (
      <>
          <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3 registerBox">
                <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card-body rg">
                        <div className="card p-5 register">
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                        <form onSubmit={handleSubmit(onSubmit)} method='post'>

                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" {...register("name")} />
                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                            </div>

                            <div className="form-outline mb-4">
                            <input type="email" id="form3Example3cg" className="form-control form-control-lg" {...register("email")} />
                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                            </div>
                            
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" {...register("role")} />
                            <label className="form-label" htmlFor="form3Example1cg">Role</label>
                            </div>

                            <div className="form-outline mb-4">
                            <input type="password" id="form3Example4cg" className="form-control form-control-lg" {...register("password")} />
                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                            </div>

                            <div className="form-outline mb-4">
                            <input type="password" id="form3Example4cdg" className="form-control form-control-lg" {...register("confirmPassword")} />
                            <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                            </div>

                            <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                            <label className="form-check-label" htmlFor="form2Example3g">
                                I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                            </label>
                            </div>

                            <div className="d-flex justify-content-center">
                            <button type="submit"
                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                            </div>

                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                                className="fw-bold text-body"><u>Login here</u></Link></p>

                        </form>

                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
      </>
  )
}

export default Register