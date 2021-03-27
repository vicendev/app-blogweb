import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

import { blogList } from '../../data-test/blogList'
import { BlogPostChatBox } from './BlogPostChatBox';

export const BlogPostDetailPublic = ({history}) => {
  
  const theBlogList = blogList
  const {postId} = useParams();

  const {title, content, autor, date} = theBlogList.find( post => post.id == postId)
  const tags = [
    {id: 1, name:'diseño'},{id: 2, name:'manicure'},{id: 3, name:'tecnicas'},{id: 4, name:'etc'}
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container animate__animated animate__fadeIn animate__faster mb-5">
      <div className="block">
        <img alt="asddsa" className="blog__img-post-banner is-fullwidth" src="https://i.pinimg.com/originals/3e/2a/f6/3e2af664e061013a3d05aa99fa20c1d4.jpg" />
      </div>
      <div className="columns box is-vcentered">
        <div className="column">
          <h1 className="title">{title}</h1>
        </div>
        <div className="column">
          <h1 className="title is-size-5">Descripción</h1>
          <p>{content}</p>
        </div>
      </div>
      <hr/>
      <div className="columns box">
        <div className="column">
          <p>Laboris consequat ex in dolor aliqua do nisi aliqua sit. Ex amet enim ut eu cupidatat elit irure nostrud reprehenderit eiusmod enim. Pariatur aliquip ullamco dolor dolore sunt eu ea elit eiusmod nulla in sit. Proident dolore velit minim excepteur anim qui sit proident ea. Labore eiusmod voluptate proident veniam Lorem commodo Lorem. Nisi adipisicing esse adipisicing consequat ea. Velit excepteur dolor proident voluptate.</p><br/>

          <p>Amet commodo laborum reprehenderit sunt elit do pariatur proident reprehenderit. Consequat sint nisi culpa ea proident voluptate. Mollit elit nulla sunt minim ut tempor magna. Enim in culpa fugiat occaecat exercitation exercitation. Sit aliqua officia labore est et esse elit culpa labore nulla sunt anim mollit adipisicing. Elit reprehenderit sint id tempor laboris esse voluptate reprehenderit anim labore elit.</p><br/>

          <p>Mollit qui elit ex dolor aliquip aliquip qui aliqua exercitation et velit. Eu adipisicing est deserunt eiusmod ut nulla fugiat nulla enim nulla voluptate minim dolore. Laboris consequat velit nisi irure do veniam. Excepteur sit ea dolore sit proident cillum veniam. Ea nostrud qui adipisicing dolor voluptate qui ex ut nostrud. Sint nulla aliqua in labore ipsum ex pariatur cillum cillum mollit ullamco fugiat. Ex reprehenderit excepteur cillum irure fugiat nulla ullamco laboris nostrud Lorem.</p><br/>

          <p>Nostrud duis voluptate labore mollit non. Esse proident dolore minim sint adipisicing. Consequat mollit duis nisi commodo nisi eu amet veniam ad. Aliquip ipsum amet nostrud incididunt irure irure ea irure nostrud aute est. Amet amet anim elit culpa quis.</p>
        </div>
      </div>
      <div className="columns box">
        <div className="column">
          <p>Autor: {autor}</p>
        </div>
        <div className="column">
          <p>Fecha: {moment(date).format('LLL')}</p>
        </div>
        <div className="column">
          <p>Tags:</p>
          {
            tags.map( t => (
              <span 
                className="tag is-info mr-1"
                key={t.id}
              >{t.name}</span>
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
  )
}
