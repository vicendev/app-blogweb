import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import ReactHtmlParser from "react-html-parser"

import { BlogPostChatBox } from './BlogPostChatBox';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPostById } from '../../actions/post';
import { Loading } from '../ui/Loading';

export const BlogPostDetailPublic = ({history}) => {

  const dispatch = useDispatch();
  const {postId} = useParams();

  const {active: post} = useSelector(state => state.posts);

  useEffect(() => {

    window.scrollTo(0, 0)
    dispatch(startLoadingPostById(postId))

  }, [])

  if (post != null) {
    console.log(post.tags)
  }

  if (post != null)
  {
    var divStyle = {
      backgroundImage: 'url(' + post.url + ')',
      backgroundSize: 'cover',
    };
  }

  return (
    <>
    {
    (post == undefined && post == null)
    ? <Loading />
    :
    <div className="container animate__animated animate__fadeIn animate__faster mb-5">
      <div className="box">
      <div className="blog__box-img-list-parent">
        <div 
          style={divStyle}
          className="blog__background-blur"  
        ></div>
        <img alt={post.title} className="blog__img-post-banner is-fullwidth" src={post.url} />
      </div>
      </div>
      <div className="columns box is-vcentered">
        <div className="column">
          <h1 className="title">{post.title}</h1>
        </div>
        <div className="column">
          <h1 className="title is-size-5">Descripción</h1>
          <p>{post.resumen}</p>
        </div>
      </div>
      <hr/>
      <div className="columns box">
        <div className="column blog__content">
          {ReactHtmlParser(post.content)}
        </div>
      </div>
      <div className="columns box">
        <div className="column">
          <p>Autor: {post.autor}</p>
        </div>
        <div className="column">
          <p>Fecha: {moment(post.createDate).format('LLL')}</p>
        </div>
        <div className="column">
          <p>Tags:</p>
          {
            post.tags.map( (tag, i) => (
              <span 
                className="tag is-info mr-1"
                key={i}
              >{tag}</span>
            ))
          }
        </div>
      </div>
      <div className="columns block">
        <div className="column">
          <hr/>
          <p className="title is-size-5">Comentarios</p>
          <hr/>
          <BlogPostChatBox
            id={postId}
          />
        </div>
      </div>
    </div>
    }
    </>
  )
}
