import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

export const RichTextEditor = ({initialContent, content, handleContentChange}) => {

  const handleContent = (e) => {
    handleContentChange(e);
  }


  return (
  <>
  <Editor
      apiKey='58s6qpcayczywsocbggpug3t8sgnxzd50oglq4tl2fuuur6v'
      textareaName='content'
      value={content}
      initialValue={initialContent}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste imagetools wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | link image media | help'
      }}
      onEditorChange={handleContent}
    />
    </>
  )
}
