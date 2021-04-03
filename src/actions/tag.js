import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadTags } from "../helpers/loadTags";
import { types } from "../types/types";

export const startNewTag = (tag) => {
  return async(dispatch, getState) => {

    const newTag = {
      tag,
      date: new Date().getTime()
    }

    const doc = await db.collection('tags').add(newTag)

    dispatch(addNewTag(doc.id, newTag))

    Swal.fire('Grabado!', newTag.tag, 'success');
  }
}

export const addNewTag = (id, tag) => ({
  type: types.tagsAddNew,
  payload: {
    id, ...tag
  }
})

export const startLoadingTags = () => {
  return async (dispatch) => {
    const tags = await loadTags();
    const totalCount = tags.length;
    const countPerPage = 5; //Total de items por pagina
    const totalPages = Math.ceil(totalCount / countPerPage);

    dispatch(setTags(tags, totalCount, countPerPage, totalPages))
  }
}

export const setTags = (tags, totalCount, countPerPage, totalPages) => ({
  type: types.tagsLoad,
  payload: {
    tags,
    totalCount,
    countPerPage,
    totalPages
  }
})

export const setActiveTag = (id, tag) => ({
  type: types.tagsActive,
  payload: {
    id,
    ...tag
  }
})

export const loadNewPageTag = (page) => {
  return async (dispatch, getState) => {
    //Clone the previous state
    const tagsState = getState().tags;
    let loadNewPageState = Object.assign({}, tagsState);
    //How many pages should be added. Will always be 1 or -1
    let addPages = page;
    //add it to the current
    loadNewPageState.currentPage += addPages;

    let perPage = loadNewPageState.countPerPage; //20 by default

    let nextTags;
    if (addPages === 1){
        //Moving from page 1 to 2 will cause ‘upperCount’ to be 40
        let upperCount = loadNewPageState.currentCount + perPage;
        let lowerCount = loadNewPageState.currentCount; //This hasn’t been changed. It will remain 20.

        loadNewPageState.currentCount += loadNewPageState.countPerPage;
        nextTags = loadNewPageState.tags.slice(lowerCount, upperCount);
    }

    if (addPages ===-1){
        let upperCount = loadNewPageState.currentCount; //40
        let lowerCount = loadNewPageState.currentCount - perPage; //20

        loadNewPageState.currentCount -= loadNewPageState.countPerPage;
        nextTags = loadNewPageState.tags.slice(lowerCount - perPage, upperCount - perPage);
    }

    loadNewPageState.filteredTags = nextTags;

    dispatch(setTagsPage(loadNewPageState))
  }
}

export const loadExactPageTag = (page) => {
  return async (dispatch, getState) => {

    const tagsState = getState().tags;
    const exactPageState = Object.assign({}, tagsState);

    const exactPage = page;
    let upperCountExact = exactPageState.countPerPage * exactPage;
    let lowerCountExact = upperCountExact - exactPageState.countPerPage;
 
    let exactTags = exactPageState.tags.slice(lowerCountExact, upperCountExact);
    exactPageState.filteredTags = exactTags;
    exactPageState.currentCount = upperCountExact;
    exactPageState.currentPage = exactPage;
    
    dispatch(setTagsPage(exactPageState))
  }
}

export const setTagsPage = (loadNewPageState) => ({
  type: types.tagsLoadNewPage,
  payload: loadNewPageState
})

export const startUpdateTag = (tag) => {
  return async (dispatch, getState) => {

    const noteToFirestore = {...tag}
    delete noteToFirestore.id;

    await db.doc(`tags/${tag.id}`).update(noteToFirestore)

    dispatch(refreshTag(tag.id, tag))
    Swal.fire('Actualizado!', tag.tag, 'success')
  }
}

export const refreshTag = (id, tag) => ({
  type: types.tagsUpdated,
  payload: {
    id,
    tag: {
      id,
      ...tag
    }
  }
})

export const startDeletingTag = (id) => {
  return async(dispatch, getState) => {

    await db.doc(`tags/${id}`).delete();

    dispatch(deleteTag(id))
  }
}

export const deleteTag = (id) => ({
  type: types.tagsDelete,
  payload: id
})