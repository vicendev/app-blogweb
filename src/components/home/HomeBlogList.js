import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPosts } from '../../actions/post';
import { uiFinishLoading, uiStartLoading } from '../../actions/ui';
import { Loading } from '../ui/Loading';
import { HomeBlogItem } from './HomeBlogItem'

export const HomeBlogList = () => {

  const dispatch = useDispatch();

  const {loading} = useSelector(state => state.ui)
  const {posts} = useSelector(state => state.posts)

  // Efecto para cargar los posts
  useEffect(() => {
    dispatch(uiStartLoading())
    dispatch(startLoadingPosts())
  }, [dispatch])

  useEffect(() => {
    if (posts.length > 0){
      dispatch(uiFinishLoading())
    }
  },[posts])

  return (
    <>
    {
      (loading)
      ? (<Loading />)
      :
      (<>
        <div className="columns">
          {
          posts.slice(0,2).map( (post) => (
            <div 
              className="column is-6"
              key={post.id}
            >
              <HomeBlogItem
                key={post.id}
                id={post.id}
                title={post.title}
                url={post.url}
                resumen={post.resumen}
                autor={post.autor}
                createDate={post.createDate}
              />
            </div>
          )) 
          }
        </div>
        <div className="columns">
          {
          posts.slice(2,4).map( (post) => (
            <div 
              className="column is-6"
              key={post.id}
            >
              <HomeBlogItem
                key={post.id}
                id={post.id}
                title={post.title}
                url={post.url}
                resumen={post.resumen}
                autor={post.autor}
                createDate={post.createDate}
              />
            </div>
          )) 
          }
        </div>
      </>)
    }
    </>
  )
}
