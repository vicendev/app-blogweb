import React, { useEffect, useState } from 'react'
import { blogList } from '../../data-test/blogList';
import { HomeBlogItem } from './HomeBlogItem'

export const HomeBlogList = () => {

  const [loading, setLoading] = useState(true)
  const theBlogList = blogList.reverse().slice(0,4);

  // useEffect(() => {

  //   // setTimeout(() => {
  //   //   setLoading(false)
  //   // }, 1000)

  // }, [])

  return (
    <>
      <div className="columns">
        {
        theBlogList.slice(0,2).map( (post) => (
          <div 
            className="column is-6"
            key={post.id}
          >
            <HomeBlogItem
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              autor={post.autor}
              date={post.date}
            />
          </div>
        )) 
        }
      </div>
      <div className="columns">
        {
        theBlogList.slice(2,4).map( (post) => (
          <div 
            className="column is-6"
            key={post.id}
          >
            <HomeBlogItem
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              autor={post.autor}
              date={post.date}
            />
          </div>
        )) 
        }
      </div>
    </>
  )
}
