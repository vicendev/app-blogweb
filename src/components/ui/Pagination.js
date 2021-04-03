import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'


export const Pagination = ({reducerNewPage, reducerExactPage, filteredPages, currentPage, totalPages}) => {

  const dispatch = useDispatch();

  const nextPage = () => {
    const page = 1;
    dispatch(reducerNewPage(page));
  }
  
  const previousPage = () => {
    const page = -1;
    dispatch(reducerNewPage(page));
  }
  
  const goToPage = (page) => {
    
    dispatch(reducerExactPage(page))
  }

  return (
    <section className='section'>
       <div className='container'>
           <nav className="pagination" role="navigation" aria-label="pagination">
             {
               currentPage > 1 &&
               <button className="button pagination-previous" onClick={()=> previousPage()}>Anterior</button>
             }
             {
               currentPage < totalPages &&
               <button className="button pagination-next" onClick={() => nextPage()}>Siguiente</button>
             }
               <ul className="pagination-list">
                   {
                       [...Array(filteredPages)].map((value, index) => (
                           <button
                              key={index}
                              className={`button pagination-link ${currentPage === index + 1 ? "is-current" : ""}`}
                              aria-label="Page 1"
                              onClick={() => goToPage(index + 1)}
     
                              aria-current="page">
                              {index + 1}
                           </button>
                       ))
                   }
               </ul>
           </nav>
     
       </div>
    </section>
  )
}

Pagination.prototype = {
  reducerNewPage: PropTypes.func.isRequired,
  reducerExactPage: PropTypes.func.isRequired,
  filteredPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}
