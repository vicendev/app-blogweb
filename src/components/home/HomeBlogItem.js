import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

export const HomeBlogItem = ({ id, title, url, resumen, autor, createDate }) => {
  console.log(title)
  return (
    <div className="card">
      <div className="card-image pointer">
        <Link
          className="blog__box-img-list-parent pointer"
          to={`./blog/post/${id}`}
        >
          <img alt={title} className="blog__img-blog-list is-fullwidth" src={url} />
        </Link>
      </div>
      <div className="card-content">
        <div className="content">
          <Link
            className="title has-text-link is-size-4 mt-2 pointer"
            to={`./blog/post/${id}`}
          >{title}</Link>
          <p className="mt-3">{resumen}</p>
          <time className="mt-5">{autor} - {moment(createDate).format('LLL')}</time>
        </div>
      </div>
    </div>
  )
}
