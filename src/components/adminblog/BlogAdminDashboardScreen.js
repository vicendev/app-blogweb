import React from 'react'
import { useSelector } from 'react-redux';

import { AdminMenu } from '../ui/AdminMenu';
import { BlogAdminBlogScreen } from './blog/BlogAdminBlogScreen';
import { BlogAdminInitScreen } from './BlogAdminInitScreen';
import { BlogAdminTagScreen } from './tags/BlogAdminTagScreen';

export const BlogAdminDashboardScreen = () => {

  const {active} = useSelector(state => state.ui)

  return (
    <>
      <section className="hero is-primary is-bold">
        <div className="hero-body animate__animated animate__fadeIn">
          <div className="container is-fluid">
            <h1 className="title">
              Admin Dashboard
            </h1>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="columns block adminblog__content-scale">
          <AdminMenu />
          <div className="column">
            <section className="hero is-small is-info">
              <div className="hero-body">
                {
                  (active)
                  ?
                  <p className="title animate__animated animate__fadeIn">
                    {active}
                  </p>
                  :
                  <p className="title animate__animated animate__fadeIn">
                    Seleccione una opcion para comenzar.
                  </p>
                }

              </div>
            </section>
            <div className="block">
              {
                active == null &&
                <BlogAdminInitScreen />
              }
              {
                active == 'Blog' &&
                <BlogAdminBlogScreen />
              }
              {
                active == 'Tags' && 
                <BlogAdminTagScreen />
              }
            </div>
          </div>
        </div>
      </section>
  </>
  )
}
