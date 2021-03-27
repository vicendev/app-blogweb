import React from 'react'
import { HomeBlogList } from './HomeBlogList'

export const HomeBlogGrid = () => {
  return (
    <section className="section has-background-info-light">
      <h1 className="title">Ultimos Post</h1>
      <HomeBlogList />
    </section>
  )
}
