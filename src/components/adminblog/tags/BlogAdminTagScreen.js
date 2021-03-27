import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTag } from '../../../actions/tag';

import { uiBlogTagScreenActive } from '../../../actions/ui'
import { BlogAdminTagCreate } from './BlogAdminTagCreate'
import { BlogAdminTagList } from './BlogAdminTagList'

export const BlogAdminTagScreen = () => {

  const dispatch = useDispatch();
  const {tagScreenActive} = useSelector(state => state.ui)
  
  // Efecto para inciar la pantalla inicial
  useEffect(() => {
    handleScreen('Init')
  }, [])

  // Maneja el control de pantallas y limpia el tag activo
  const handleScreen = (tagScreenActive) => {
    dispatch(uiBlogTagScreenActive(tagScreenActive))
    dispatch(setActiveTag(null))
  }

  return (
    <>
      {
        tagScreenActive === 'Init' &&
        <section className="box animate__animated animate__fadeIn">
          <hr />
            <span 
              className="button is-large is-fullwidth is-link"
              onClick={() => handleScreen('Create Tag')}
            >Crear un nuevo tag</span>
          <hr/>

          <div className="block">
            <BlogAdminTagList />
            
          </div>
        </section>
      }
      {
        tagScreenActive === 'Create Tag' &&
        (
          <section className="box animate__animated animate__fadeIn">
            <hr />
              <span 
                className="button is-link"
                onClick={() => handleScreen('Init')}
              >Volver</span>
            <hr/>
            <BlogAdminTagCreate />
          </section>
        )
      }
      {
        tagScreenActive === 'Edit Tag' &&
        (
          <section className="box animate__animated animate__fadeIn">
            <hr />
              <span 
                className="button is-link"
                onClick={() => handleScreen('Init')}
              >Volver</span>
            <hr/>
            <BlogAdminTagCreate />
          </section>
        )
      }
    </>

  )
}
