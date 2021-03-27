import React, { useEffect, useState } from 'react'
import { blogList } from '../../data-test/blogList'
import { Loading } from '../ui/Loading';
import { BlogListPublic } from './BlogListPublic';

export const BlogGridPublic = () => {

  const [loading, setLoading] = useState(true)
  const theBlogList = blogList;

  useEffect(() => {

    setTimeout(() => {
      setLoading(false)
    }, 1000)

  }, [loading])

  return (
    <section className="hero has-background-link-light mb-5">
      <div className="hero-body">
        <p className="title animate__animated animate__fadeIn">Listado</p>
      </div>
    {

      (loading)
      ? <Loading />
      : theBlogList.map(list => (
          <BlogListPublic 
            key={list.id}
            id={list.id}
            title={list.title}
            content={list.content}
            autor={list.autor}
            date={list.date}
          />
      ))
    }
    </section>
  )
}
