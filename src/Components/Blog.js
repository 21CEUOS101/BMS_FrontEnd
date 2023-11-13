import React from 'react'
import { Link } from 'react-router-dom'

function Blog(props) {

  let blog = "/blog2/";

  if (props.isUpdate) {
    blog = "/blog/";
  }

  return (
      <>
      <div>
        <Link to={blog + props.blog.idString} className='link'>
          <div className="blogcard card shadow"> 
                <div className="card-body">
                    <h5 className="card-title">{props.blog.title}</h5>
                    <p className="card-text">{props.blog.content}</p>
                    <p className='card-text'>{props.blog.likes}</p>
                </div>
          </div>
        </Link>
      </div>
      
      

      </>
  )
}

export default Blog