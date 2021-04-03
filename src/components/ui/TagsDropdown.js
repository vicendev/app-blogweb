import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { refreshPost } from '../../actions/post';
import { loadTags } from '../../helpers/loadTags';

export const TagsDropdown = ({createMode}) => {

  const dispatch = useDispatch();
  const {active: post} = useSelector(state => state.posts)
  const [tags, setTags] = useState([])

  const allTagsPromise = useMemo(async () => await loadTags(), [])

  useEffect(() => {
    loadingTags();

    return () => {
      setTags([])
    }
  }, [])

  useEffect(() => {

    if (post.tags != undefined && post.tags != null){
      allTagsPromise.then( (allTags) => {
        post.tags.forEach(tag => {
          allTags = allTags.filter( t => t.tag != tag)
        });

        setTags(allTags);
      })
    }

  }, [post.tags])

  const loadingTags = async () => {
    setTags(await loadTags()) 
  }


  const toggleDropdown = () => {
    document.querySelector('.dropdown').classList.toggle('is-active');
  }

  const addTagToPost = ({tag}) => {
    if (createMode && post.tags != undefined) {
      let newList = tags

      newList = newList.filter(t => t.tag !== tag)
      setTags(newList)

      post.tags.push(tag)
      dispatch(refreshPost(post.id, post))
      
    }
  }

  return (
    <>
      {
        tags != [] &&
      <div className="dropdown">
        <div className="dropdown-trigger">
          <button 
            className="button"
            type="button" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu3"
            onClick={toggleDropdown}
          >
            <span>Ver tags</span>
            <span className="icon is-small">
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
          <div className="dropdown-content">
            {
              (tags != null && tags != undefined) &&
              tags.map(tag => (
                <span 
                  className="dropdown-item adminblog__dropdown-tag pointer"
                  onClick={() => addTagToPost(tag)}
                  key={tag.id}
                >{tag.tag}</span>
              ))
            }
          </div>
        </div>
      </div>
    }
    </>
  )
}
