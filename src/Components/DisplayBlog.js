import Axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web'
import { Button } from './Button';
import toast from 'react-hot-toast';

function DisplayBlog() {

  // Getting Blog Id from url
  const { id } = useParams();

  const [data, setData] = React.useState();
  const [like, setLike] = React.useState(0);

  const getBlogs = async () => {
    console.log(id);
    await Axios.get(`http://localhost:8080/getBlogById/${id}`).then((response) => {
      console.log(response.data);
      setData(response.data);
      return response.data;
    });

  }
  React.useEffect(() => {
    getBlogs();
    console.log(data);
  }, []);

  const LikeBlog = async () => {
    console.log(like);
    return await Axios.post(`http://localhost:8080/likeBlog/${id}/${like}`).then((response) => {
      console.log(response.data);
      setData(response.data);
      return response.data;
    });
  }
  const Like = () => {
    console.log(like);
    if (like === 1)
    {
      setLike(-1);
    }
    else {
      setLike(1);
    }
  }
  useEffect(() => {
    console.log("Coming");
    LikeBlog();
    toast.success("Blog Liked Successfully");
  }, [like]);

  return (
    <>
    <div className="full-page-container">
        <div className="blog-container">
          <h1>{data?.title}</h1>
          <h2>{data?.description}</h2>
          <h3>{data?.content}</h3>
          <h4>{data?.likes}</h4>
          <Button content="Like" function={Like} icon={<i className="far fa-thumbs-up"></i>} onTapColor={{color:"red"}} color={{color:"blue"}}/>
          <Link className="update-button button" to={"/updateBlog/" + id}>Update Blog</Link>
        </div>
    </div>
    </>
  )
}

export default DisplayBlog