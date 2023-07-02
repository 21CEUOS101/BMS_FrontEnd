import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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


function EditProfile() {

    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(15).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        role: yup.string().required(),
    });
    const [idString, setIdString] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("BLOGGER");
    const { user, setUser , setIsLoggedIn } = useContext(AppContext);
    const [inform, setInform] = React.useState("");
    const [deleteUser, setDeleteUser] = React.useState(false);

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const updateBlogger = async () => {
        
        const params = new URLSearchParams();
        params.append('id', idString);
        params.append('name', name);
        params.append('email', email);
        params.append('password', password);
        params.append('role', role);
    
        return await Axios.post(`http://localhost:8080/updateBlogger`,params).then((response) => {
        console.log(response.data);
        return response.data;
        });

    }

    const deleteBlogger = async () => {
        const params = new URLSearchParams();
        params.append('id', idString);

        return await Axios.post(`http://localhost:8080/deleteBlogger`,params).then((response) => {
            console.log(response.data);
            return response.data;
        });
    }
    
    const onSubmit = (data) => {
        setIdString(user.id);
        setEmail(data.email);
        setPassword(data.password);
        setName(data.name);
        setRole(data.role);
        console.log(user);
    }

    React.useEffect(() => {

        if(name !== "" && email !== "" && password !== "" && role !== ""){
            updateBlogger().then((data) => {
                console.log(data);
                if(data !== null && data !== undefined && data !== "") {
                    console.log("User Updated Successfully");
                    setInform("User Updated Successfully");
                    setUser(new User(data.idString, data.name, data.email, data.password, data.role, data.createdAt, data.blogsCount));
                } else {
                    console.log("User Not Updated");
                    setInform("User Not Updated");
                }
            });
        }
    }, [name, email, password, role]);
    
    React.useEffect(() => {
        if (deleteUser === true && user !== null && user !== undefined && user !== "") {
            deleteBlogger();
            setUser(null);
            setIsLoggedIn(0);
            console.log("User Deleted Successfully");
            setInform("User Deleted Successfully");
        }
    }, [deleteUser]);

    const DeleteUser = () => {
        setIdString(user.id);
        setDeleteUser(true);
    }
    

  return (
      <>
          <form onSubmit={handleSubmit(onSubmit)}>
              
            <div className="container">
                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label>Name</label>
                                      <input type="text" {...register("name")} className="form-control" placeholder="Name" id="name" required/>
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label>Email Address</label>
                                    <input type="email" {...register("email")} className="form-control" placeholder="Email Address" id="email" required/>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="form-group col-xs-12 floating-label-form-group controls">
                                    <label>Password</label>
                                    <input type="password" {...register("password")} className="form-control" placeholder="Password" id="password" required/>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="form-group col-xs-12 floating-label-form-group controls">
                                    <label>Confirm Password</label>
                                    <input type="password" {...register("confirmPassword")} className="form-control" placeholder="Confirm Password" id="confirmPassword" required/>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="form-group col-xs-12 floating-label-form-group controls">
                                    <label>Role</label>
                                        <input type="text" {...register("role")} className="form-control" placeholder="Role" id="role" required/>
                                </div>
                            </div>
                            <br />
                            <div id="success"></div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Update</button>
                            </div>
                  
                        <p>{inform}</p>
                    </div>
          </form>
            <div>
                <button type="button" onClick={DeleteUser} className="btn btn-primary">Delete Account</button>
            </div>
      </>
  )
}

export default EditProfile;