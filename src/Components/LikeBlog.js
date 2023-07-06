import Axios from 'axios';
import React, { useEffect } from 'react'
import useToggle from './useToggle';
import { useParams } from 'react-router-dom';

function LikeBlog() {

    const { id } = useParams();
    const [likes, Toggle] = useToggle(false);
    const [like, setLike] = React.useState(0);
    
    const LikeBlog = async () => {
        console.log("Liking the blog");
        return await Axios.put(`http://localhost:8080/likeBlog/${id}/${like}`).then((response) => {
          return response.data;
        });
      }
      
      
      const Like = () => {
        Toggle();
        if (likes) {
          setLike(1);
        }
        else {
          setLike(-1);
        }
      }
    
    
  useEffect(() => {
    LikeBlog();
  }, [like]);

  return (
    <button className="like-button" onClick={Like}>
            <i className="far fa-thumbs-up"></i>
    </button>
  )
}

export default LikeBlog