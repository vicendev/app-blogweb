import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadExactPagePost, loadNewPagePost, startLoadingPosts } from '../../actions/post';
import { uiFinishLoading, uiStartLoading } from '../../actions/ui';
import { Loading } from '../ui/Loading';
import { Pagination } from '../ui/Pagination';
import { BlogListPublic } from './BlogListPublic';

export const BlogGridPublic = () => {

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


  return (
    <section className="hero has-background-link-light mb-5">
      <div className="hero-body">
        <p className="title animate__animated animate__fadeIn">Posts</p>
      </div>
    {

      (loading)
      ? <Loading />
      : filteredPosts.map(post => (
          <BlogListPublic 
            key={post.id}
            id={post.id}
            title={post.title}
            url={post.url}
            resumen={post.resumen}
            tags={post.tags}
            autor={post.autor}
            createDate={post.createDate}
          />
      ))
    }
    <Pagination
      reducerNewPage={loadNewPagePost}
      reducerExactPage={loadExactPagePost}
      filteredPages={filteredPages}
      currentPage={currentPage}
      totalPages={totalPages}
    />
    </section>
  )
}
