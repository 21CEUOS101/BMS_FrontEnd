import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function DisplayBlog2() {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [likes, setLikes] = useState(false);
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
    console.log("Liking the blog");
    return await Axios.post(`http://localhost:8080/likeBlog/${id}/${like}`).then((response) => {
      console.log(response.data);
      setData(response.data);
      return response.data;
    });
  }
  const Like = () => {
    setLikes(true);
    setLike(1);
  }
  useEffect(() => {
  LikeBlog();
  }, [like]);


  return (
    <>
    <div className="full-page-container">
        <div className="blog-container">
          <h1>{data?.title}</h1>
          <h2>{data?.description}</h2>
          <h3>{data?.content}</h3>
          <h4>{data?.likes}</h4>
          <button className="like-button" onClick={Like} disabled={likes}>
            <i className="far fa-thumbs-up"></i>
          </button>
          {/* <Link className="update-button button" to={"/updateBlog/" + id}>Update Blog</Link> */}
        </div>
    </div>
    </>
  )
}

export default DisplayBlog2;