import { useState } from 'react'

export const useEditor = (initialState = '') => {
  
  const [values, setValues] = useState(initialState);

  const handleContentChange = (content) => {

      setValues({
        ...values,
        content
      });

  }

  return [ values, handleContentChange ];

}
