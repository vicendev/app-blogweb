import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { cleanPostActive } from '../../actions/post';
import { HomeBlogList } from './HomeBlogList'

export const HomeBlogGrid = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanPostActive())
  }, [])

  return (
    <section className="section has-background-info-light">
      <h1 className="title">Ultimos Post</h1>
      <HomeBlogList />
    </section>
  )
}
