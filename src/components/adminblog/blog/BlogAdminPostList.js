import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';

import { Loading } from '../../ui/Loading'
import { Pagination } from '../../ui/Pagination';
import { loadExactPagePost, loadNewPagePost, setActivePost, startDeletingPost, startLoadingPosts } from '../../../actions/post';
import { uiBlogPostScreenActive, uiFinishLoading, uiStartLoading } from '../../../actions/ui';
import { handleDeleteSwal } from '../../../helpers/userControlMsges';


export const BlogAdminPostList = () => {

  const dispatch = useDispatch();

  const {loading} = useSelector(state => state.ui)
  const {filteredPosts, filteredPages, currentPage, totalPages} = useSelector(state => state.posts)

  // Efecto para cargar los posts
  useEffect(() => {
    dispatch(uiStartLoading())
    dispatch(startLoadingPosts())
  }, [dispatch])

  useEffect(() => {
    if (filteredPosts.length > 0){
      dispatch(uiFinishLoading())
    } else {
      dispatch(uiFinishLoading())
    }
  },[filteredPosts])

  // Cambia el estado de la pantalla activa
  const handleEditScreen = (activeScreen, post) => {
    dispatch(setActivePost(post.id, post))
    dispatch(uiBlogPostScreenActive(activeScreen))
  }

  const handleDeletePost = async (post) => {
    if (await handleDeleteSwal(post.title, 'Post')){
      dispatch(startDeletingPost(post.id))
    }
  }

  return (
    <>
    {
      (loading)
      ? <Loading />
      :
      <>
        {
          (filteredPosts != undefined && filteredPosts != null && filteredPosts.length > 0)
          ?
          filteredPosts.map((post, i) => (
            <div 
              className="block animate__animated animate__fadeInUp"
              key={post.id}
            >
            <div className="columns box">
              <div className="column is-one-quarter adminblog__box-img-list-parent pointer">
                <img alt="titulo" className="adminblog__img-blog-list is-fullwidth" src={post.url} />
              </div>
              <div className="column">
                <span className="is-size-6"
                ><strong>Título: </strong>{post.title}</span>
                <p className="is-size-6"
                ><strong>Resumen: </strong>{post.resumen.length > 80 ? post.resumen.substring(0,80)+'...' : post.resumen}</p>
                <hr/>
                <span className="is-size-6"
                ><strong>Autor: </strong>{post.autor}</span>
                <br/>
                <time className="mt-5">
                  <strong>Fecha Creación: </strong>  {moment(post.createDate).format('LLL')}
                </time>
                <br/>
                <time className="mt-5">
                  <strong>Fecha Actualizacion: </strong> 
                  { post.updateDate ? moment(post.updateDate).format('LLL') : '-------------'}
                </time>
                <br/>
                  <button 
                    className="button is-link mt-3 mr-5"
                    onClick={() => handleEditScreen('Edit Post', post)}
                  >Editar</button>
                  <button 
                    className="button is-danger mt-3"
                    onClick={() => handleDeletePost(post)}
                  >Eliminar</button>
              </div>
              
            </div>    
          </div>
          ))
          : <span className="notification is-info">Aun no hay post para mostrar!</span>
        }
        <Pagination
          reducerNewPage={loadNewPagePost}
          reducerExactPage={loadExactPagePost}
          filteredPages={filteredPages}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </>
    }
    </>
  )
}
