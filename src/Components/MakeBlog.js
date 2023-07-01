
// Importing Helpers
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect } from 'react'
import {useState} from "react" 
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AppContext } from '../App';
import Axios from 'axios';


export default function MakeBlog() {

    const [text, setText] = useState("");

    let handleChange = (event) => {
        setText(event.target.value);
    }
    let words = text.split(" ").length - 1;
    let chars = text.length;

    // React Form Hook
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userEmail , setUserEmail] = useState("");

    const schema = yup.object().shape({
        title: yup.string().required(),
        content: yup.string().required(),
    });
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        setTitle(data.title);
        setContent(data.content);
        setUserEmail(user.email);
        console.log(data);
    }
    // End React Form Hook
    
    // Context API Hook 
    const { user } = useContext(AppContext);
    // End Context API Hook

    // Axios Post Request
    const makeBlog = async () => {

        const params = new URLSearchParams();
        params.append('title', title);
        params.append('content', content);
        params.append('email', userEmail);

        return await Axios.post(`http://localhost:8080/addBlog`, params).then((response) => {
            console.log(response?.data);
            console.log(response?.status);
            console.log(response);
            console.log(response?.statusText);
            return response?.data;
        });
    }
    // End Axios Post Request

    // React Use Effect Hook
    useEffect(() => {
        if (title !== "" && title !== undefined && title !== null && content !== "" && content !== undefined && content !== null && userEmail !== "" && userEmail !== undefined && userEmail !== null) {
            makeBlog().then((data) => {
                console.log(data);
                if (data !== null && data !== "" && data !== undefined) {
                    console.log("Blog Added Successfully");
                }
            });
        }
    }, [title, content, userEmail]);
    // End React Use Effect Hook

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Title" {...register("title")} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                <textarea  {...register("content")} className="form-control" id="content" value={text} onChange={handleChange} rows="10"></textarea>
            </div>
            <div className="count my-2">
                    {words} Words , {chars} Character
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="submit">Submit Note</button>
            </div>  
            </div>
        </form>
      </>
  )
}
