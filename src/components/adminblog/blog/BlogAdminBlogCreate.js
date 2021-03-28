import React from 'react'

export const BlogAdminBlogCreate = () => {
  return (
    <div>
      <h1>Create Blog TODOOOOO AQUI</h1>
      <ol>
        <li>Titulo</li>
        <li>Imagen banner</li>
        <li>Resumen del post</li>
        <li>Cuerpo del Post</li>
        <li>Seleccionar multiples tags</li>
      </ol>

      <form>
      <div className="field">
        <label className="label">Título</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Post Banner</label>
        <div className="control">
          <input className="input" type="file" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Resumen</label>
        <div className="control">
          <textarea id="prueba" className="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>
      
      <div className="field">
        <label className="label">Post</label>
        <div className="control">
          <p>ACA VA EL CKEDITOR</p>
        </div>
      </div>

      </form>
    </div>
  )
}
