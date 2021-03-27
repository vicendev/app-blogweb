import React from 'react'
import { BlogGridPublic } from './BlogGridPublic'

export const BlogScreenPublic = () => {
  return (
    <>
      <section className="hero is-primary is-bold">
        <div className="hero-body animate__animated animate__fadeIn">
          <div className="container is-fluid">
            <h1 className="title">
              Blog
            </h1>
            <h2 className="subtitle">
              Subtitulo
            </h2>
          </div>
        </div>
      </section>
      <BlogGridPublic />
    </>
  )
}
