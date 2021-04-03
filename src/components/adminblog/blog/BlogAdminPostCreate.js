import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePost, startSavePost, startUpdatingFile, startUploadingFile } from '../../../actions/post';
import { handleInfoSwal } from '../../../helpers/userControlMsges';
import { useForm } from '../../../hooks/useForm';
import { RichTextEditor } from '../../ui/RichTextEditor';
import { TagsDropdown } from '../../ui/TagsDropdown';

export const BlogAdminPostCreate = () => {

  const dispatch = useDispatch();

  const {active: post} = useSelector(state => state.posts);

  const [formValues, handleInputChange] = useForm(post);
  const [content, setContent] = useState(post.content ? post.content : '')

  const { title, resumen } = formValues;

  const activeId = useRef(post.id);

  useEffect(() => {
    if (activeId.current) {
      dispatch(setActivePost(post.id, post))
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ( validateFormValues()) {
      const titleSwal = 'Para guardar es necesario rellenar los campos.'
      const body = `
      ${(title == undefined || title.length === 0) ? 'titulo ' : ''} 
      ${(resumen == undefined || resumen.length === 0) ? 'resumen ' : ''}
      ${content.length === 0 ? 'contenido': ''}
      `;
      handleInfoSwal(titleSwal, body);
    } else {
      post.title = title;
      post.resumen = resumen;
      post.content = content;

      dispatch(setActivePost(activeId.current, post))
      dispatch(startSavePost(post))
    }
  }

  const validateFormValues = () => {
    if (title == undefined || resumen == undefined){
      return true
    }
    const validate = (
      title.length === 0 ||
      resumen.length === 0 ||
      (content.length === 0)
    );
    return validate
  }

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      if(post.url != null) {
        dispatch(startUpdatingFile(post.url, file))
      } else{
        dispatch(startUploadingFile(file))
      }
    }
  }

  const handleRemoveTag = (tag) => {
    post.tags = post.tags.filter(t => t !== tag)
    dispatch(setActivePost(activeId.current, post))
  }

  const handleDisplayPost = () => {
    post.display = !post.display
    dispatch(setActivePost(post.id, post))
  }

  const handleContentChange = (contentValues) => {
    setContent(contentValues)
  }

  return (
    <div>
      <h1>Crear Post</h1>

      <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <button
            className="button is-success is-fullwidth"
            type="submit"
          >Grabar
          </button>
        </div>
      </div>


      <div className="field swtich-body">
        <label className="label">Publicar post</label>
      </div>

      <div className="field swtich-body">
        <div className="control">
          <label className="toggle-control">
            <input 
              type="checkbox" 
              checked={post.display} 
              onChange={handleDisplayPost}  
            />
            <span className="control"></span>
          </label>
        </div>
      </div>

      <div className="field">
        <label className="label">Título</label>
        <div className="control">
          <input 
            className="input" 
            type="text" 
            placeholder="Text input"
            name="title"
            value={title || ''}
            onChange={handleInputChange} 
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Banner</label>

        <div className="notification is-info" id="info-img">
          <span 
            className="delete" 
            onClick={() => {
              document.getElementById('info-img').classList.add("animate__animated", "animate__zoomOut")
              setTimeout(() => {
                document.getElementById('info-img').remove();
              }, 400);
            }}></span>
          <p><strong>Info:</strong> Evitar usar imágenes con el mismo <strong>nombre.jpg</strong>
          , que se haya subido en otro post. 
          Ya que puede borrar una imagen que haya subido anteriormente.</p>
        </div>

        <div className="control">
          <input 
            id="fileSelector"
            type="file" 
            name="file"
            style={{ display: 'none'}}
            onChange={handleFileChange}
          />
          <button
            className="button is-link is-large"
            type="button"
            onClick={handlePictureUpload}
          >
            Agregar Portada
          </button>
          {
            post.url != null &&
            <img 
              className="adminblog__img-post-create-banner ml-5"
              src={post.url} 
              alt={`${post.title}`} 
            />
          }
        </div>
      </div>

      <div className="field">
        <label className="label">Resumen</label>
        <div className="control">
          <textarea 
            className="textarea" 
            placeholder="Escribe un resumen"
            name="resumen"
            value={resumen || ''}
            onChange={handleInputChange} 
          ></textarea>
        </div>
      </div>

      <div className="field">
        <label className="label">Tags</label>
        <div className="control">
          <TagsDropdown 
            createMode={true}
          />
          {
            (post.tags != undefined && post.tags.length > 0)
            ?
            post.tags.map((tag, i) => (
              <span className="tag is-info ml-1" key={i}>
                {tag}
                <span 
                  className="delete"
                  onClick={() => handleRemoveTag(tag)}
                ></span>
              </span>
            ))
            : <p>no hay tags agregados</p>
          }
        </div>
      </div>
      
      <div className="field">
        <label className="label">Post</label>
        <div className="control">
          <RichTextEditor
            initialContent={post.content} 
            content={content || ''}
            handleContentChange={handleContentChange}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button
            className="button is-success is-fullwidth"
            type="submit"
          >Grabar
          </button>
        </div>
      </div>

      </form>
    </div>
  )
}
