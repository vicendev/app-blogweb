import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/es';

export const BlogListPublic = ({id, title, content, autor, date}) => {

  return (
    <div className="block animate__animated animate__fadeInUp">
      <div className="box">
        <Link 
          className="blog__box-img-list-parent pointer"
          to={`./blog/post/${id}`}
        >
          <img alt="titulo" className="blog__img-blog-list is-fullwidth" src="https://i.pinimg.com/originals/3e/2a/f6/3e2af664e061013a3d05aa99fa20c1d4.jpg" />
        </Link>
        <div className="box">
          <Link 
            className="title has-text-link is-size-4 mt-2 pointer"
            to={`./blog/post/${id}`}
          >{title}</Link>
          <p>{content}</p>
          <time className="mt-5">{autor} - {moment(date).format('LLL')}</time>
        </div>
        
      </div>    
    </div>
  )
}
