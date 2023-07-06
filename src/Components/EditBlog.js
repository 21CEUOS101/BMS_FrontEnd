import { yupResolver } from '@hookform/resolvers/yup';
import Axios from 'axios';
import { set } from 'mongoose';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

function EditBlog() {

    const schema = yup.object().shape({
        title: yup.string().required(),
        content: yup.string().required(),
    });
    const {id} = useParams();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [deleteBlog, setDeleteBlog] = React.useState(false);
    const [info, setInfo] = React.useState("");
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const updateBlog = async () => {

        const params = new URLSearchParams();
        params.append('title', title);
        params.append('content', content);

        return await Axios.post(`http://localhost:8080/updateBlog/${id}`,params).then((response) => {
            console.log(response?.data);
            console.log(response?.status);
            console.log(response);
            console.log(response?.statusText);
            setInfo("Blog Updated");
            return response?.data;
        });
    }

    React.useEffect(() => {
        if (title !== "" && title !== undefined && title !== null) {
            updateBlog().then((data) => {
                console.log(data);
                if (data !== null && data !== "" && data !== undefined) {
                    console.log("Blog Updated");
                }
            });
        }
    }, [title]);

    const deleteBlogById = async () => {
        return await Axios.post(`http://localhost:8080/deleteBlog/${id}`).then((response) => {
            console.log(response?.data);
            console.log(response?.status);
            console.log(response);
            console.log(response?.statusText);
            setInfo("Blog Deleted");
            return response?.data;
        });
    }

    React.useEffect(() => {
        if (deleteBlog) {
            deleteBlogById().then((data) => {
                console.log(data);
                if (data !== null && data !== "" && data !== undefined) {
                    console.log("Blog Deleted");
                }
            });
        }
    }, [deleteBlog]);

    const onSubmit = (data) => {
        setTitle(data.title);
        setContent(data.content);
        console.log(data);
    }

    const DeleteBlog = () => {
        setDeleteBlog(true);
    }

  return (
      <>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                  <label for="title">Title</label>
                  <input type="text" {...register("title")} className="form-control" id="title" placeholder="Enter Title" />
              </div>
              <div className="form-group">
                  <label for="content">Content</label>
                  <textarea  {...register("content")} className="form-control" id="content" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <button className='button delete-button' onClick={DeleteBlog}>Delete Blog</button>
          <p>{info}</p>
      </>
  )
}

export default EditBlog