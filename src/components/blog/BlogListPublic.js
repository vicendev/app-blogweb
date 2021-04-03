import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';

import { cleanPostActive, setActivePost } from '../../actions/post';

export const BlogListPublic = ({id, title, url, resumen, tags, autor, createDate}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanPostActive())
  }, [])

  var divStyle = {
    backgroundImage: 'url(' + url + ')',
    backgroundSize: 'cover',
  };

  return (
    <div className="block animate__animated animate__fadeInUp">
      <div className="box">
        <Link
          className="blog__box-img-list-parent pointer"
          to={`./blog/post/${id}`}
        >
          <div 
            style={divStyle}
            className="blog__background-blur"  
          ></div>
          <img alt={title} className="blog__img-blog-list is-fullwidth" src={url} />
        </Link>
        <div className="box">
          <Link 
            className="title has-text-link is-size-4 mt-2 pointer"
            to={`./blog/post/${id}`}
          >{title}</Link>
          <p className="mt-4">{resumen}</p>
          <p className="mt-4">{autor} - <time>{moment(createDate).format('LLL')}</time></p>
        </div>
        
      </div>    
    </div>
  )
}
