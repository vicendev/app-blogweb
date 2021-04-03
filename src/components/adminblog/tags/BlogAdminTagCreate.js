import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTag, startNewTag, startUpdateTag } from '../../../actions/tag';
import { removeError, setError, uiBlogTagScreenActive } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';

export const BlogAdminTagCreate = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);
  const {active: tagActive} = useSelector(state => state.tags)

  const [formValues, handleInputChange, reset] = useForm(tagActive.id ? tagActive : {tag: ''});

  const { tag } = formValues;

  const activeId = useRef(tagActive ? tagActive.id : null);

  useEffect(() => {
    if (activeId.current){
      dispatch(setActiveTag(formValues.id, {...formValues}))
    }
  }, [formValues, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      if (!activeId.current){
        dispatch(startNewTag(tag));
      } else {
        dispatch(startUpdateTag(tagActive))
      }
      reset();

      setTimeout(() => {
        dispatch(uiBlogTagScreenActive('Init'))  
      }, 1000);
    }
  }

  const isFormValid = () => {

    if (tag.trim().length === 0){
      dispatch(setError(`Error: El nombre del tag es requerido`));
      return false;
    }
    else if (tag.trim().length < 3) {
      dispatch(setError(`Error: El largo mínimo de un tag es 3, largo del tag actual ${tag.length}`));
      return false;
    }
    else if (tag.trim().length > 20) {
      dispatch(setError(`Error: El largo máximo de un tag es 20, largo del tag actual ${tag.length}`));
      return false;
    }

    dispatch(removeError());
    return true;
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        msgError &&
        (
          <div class="notification is-warning">
            { msgError}
          </div>
        )
      }
      <div className="field mb-5">
        <label className="label">{`${!tagActive.id ? 'Crear Tag' : 'Editar Tag'}`}</label>
        <div className="control">
          <input 
            className="input" 
            type="text" 
            placeholder="Ingresar un tag"
            name="tag"
            value={tag}
            onChange={handleInputChange} 
          />
        </div>
      </div>
      <div className="field mb-5">
        <div className="control">
          <button className="button is-link">{`${!tagActive.id ? 'Aceptar' : 'Editar'}`}</button>
        </div>
      </div>
    </form>
  )
}
