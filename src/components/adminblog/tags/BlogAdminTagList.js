import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import 'moment/locale/es';

import { loadExactPageTag, loadNewPageTag, setActiveTag, startDeletingTag, startLoadingTags } from '../../../actions/tag';
import { uiBlogTagScreenActive, uiFinishLoading, uiStartLoading } from '../../../actions/ui';
import { Pagination } from '../../ui/Pagination';
import { handleDeleteSwal } from '../../../helpers/userControlMsges';
import { Loading } from '../../ui/Loading';

export const BlogAdminTagList = () => {

  const dispatch = useDispatch();

  const {loading} = useSelector(state => state.ui)
  const {filteredTags, filteredPages, currentPage, totalPages} = useSelector(state => state.tags)

  // Efecto para cargar los tags
  useEffect(() => {
    dispatch(uiStartLoading())
    dispatch(startLoadingTags())
  }, [dispatch])

  useEffect(() => {
    if (filteredTags.length > 0){
      dispatch(uiFinishLoading())
    }
  },[filteredTags])

  // Cambia el estado de la pantalla activa
  const handleEditScreen = (activeScreen, tag) => {
    dispatch(setActiveTag(tag.id, tag))
    dispatch(uiBlogTagScreenActive(activeScreen))
  }

  const handleDeleteTag = async (tag) => {
    if (await handleDeleteSwal(tag.tag, 'Tag')){
      dispatch(startDeletingTag(tag.id))
    }
  }


  return (
    <>
    {
      (loading)
      ? <Loading />
      :
      <>
        <table className="table">
          <thead>
            <tr>
              <th><abbr title="pos">N°</abbr></th>
              <th><abbr title="tag">Tag</abbr></th>
              <th><abbr title="fecha crea.">Fecha Crea.</abbr></th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredTags.map((tag, i) => (
                  <tr key={tag.id}>
                    <td>{i+1}</td>
                    <td>{tag.tag}</td>
                    <td>{moment(tag.date).format('L')}</td>
                    <td><span 
                          className="button is-info"
                          onClick={() => handleEditScreen('Edit Tag', tag)}
                        >Editar</span></td>
                    <td><span 
                          className="button is-danger"
                          onClick={() => handleDeleteTag(tag)}
                        >Eliminar</span></td>
                  </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination
          reducerNewPage={loadNewPageTag}
          reducerExactPage={loadExactPageTag}
          filteredPages={filteredPages}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </>
    }
    </>
  )
}
