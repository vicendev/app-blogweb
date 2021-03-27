import React from 'react'
import adminInitGif from '../../assets/admin-dashboard-init.gif';


export const BlogAdminInitScreen = () => {
  return (
    <figure className="image is-4by4 mt-1">
      <img alt="admin-init" className="is-rounded" src={adminInitGif}/>
    </figure>
  )
}
