import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanPostActive, setActivePost, startDeletingPost, startNewPost } from '../../../actions/post';
import { uiBlogPostScreenActive } from '../../../actions/ui';
import { Loading } from '../../ui/Loading';
import { BlogAdminPostCreate } from './BlogAdminPostCreate';
import { BlogAdminPostList } from './BlogAdminPostList';

export const BlogAdminPostScreen = () => {

  const dispatch = useDispatch();
  const {postScreenActive} = useSelector(state => state.ui)
  const {active: post} = useSelector(state => state.posts)

  // Efecto para inciar la pantalla inicial
  useEffect(() => {
    handleScreen('Init')
  }, [])


  // Maneja el control de pantallas y limpia el tag activo
  const handleScreen = (postScreenActive) => {
    dispatch(uiBlogPostScreenActive(postScreenActive))

    if (post != null && post.id != null && (validateDeleteUnusedPost())){
      dispatch(startDeletingPost(post.id))
    } else {
      dispatch(cleanPostActive())
    }
  }

  const handleCreateNewPost = (postScreenActive) => {
    dispatch(startNewPost())
    dispatch(uiBlogPostScreenActive(postScreenActive))
  }

  const validateDeleteUnusedPost = () => {
    const validate = (
      post.title.length === 0 ||
      post.resumen.length === 0 ||
      (post.content.length === 0)
    );
    return validate
  }

  return (
    <>
      {
        postScreenActive === 'Init' &&
        (
          <section className="box animate__animated animate__fadeIn">
            <hr />
              <span 
                className="button is-large is-fullwidth is-link"
                onClick={() => handleCreateNewPost('Create Post')}
              >Crear un nuevo post</span>
            <hr/>

            <div className="block">
              <BlogAdminPostList />
            </div>
          </section>
        )
      }
      {
        postScreenActive === 'Create Post' &&
        (
          (post == undefined || post == null)
          ?
            <Loading />
          :
            <section className="box animate__animated animate__fadeIn">
              <hr />
                <span 
                  className="button is-link"
                  onClick={() => handleScreen('Init')}
                >Volver</span>
              <hr/>
              <BlogAdminPostCreate />
            </section>
        )
      }
      {
        postScreenActive === 'Edit Post' &&
        (
          (post == undefined || post == null)
          ?
            <Loading />
          :
            <section className="box animate__animated animate__fadeIn">
              <hr />
                <span 
                  className="button is-link"
                  onClick={() => handleScreen('Init')}
                >Volver</span>
              <hr/>
              <BlogAdminPostCreate />
            </section>
        )
      }
    </>
  )
}
