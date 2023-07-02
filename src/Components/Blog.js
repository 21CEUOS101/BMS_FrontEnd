import React from 'react'

function Blog(props) {
  return (
      <>
          <div class="card shadow"> 
            <div class="card-body">
                <h5 class="card-title">{props.blog.title}</h5>
                <p class="card-text">{props.blog.content}</p>
                <p className='card-text'>{props.blog.likes}</p>
            </div>
          </div>

      </>
  )
}

export default Blog