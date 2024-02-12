import { db } from "../firebase/firebase-config";
import { fileDeleted, fileUpload } from "../helpers/fileUpload";
import { loadPosts, loadPostById } from "../helpers/loadPosts";
import { handleSavedSwal, handleUploadingSwal } from "../helpers/userControlMsges";
import { types } from "../types/types";



export const startNewPost = () => {
  return async(dispatch, getState) => {

    const {uid, name} = getState().auth;

    const newPost = {
      title: '',
      url: null,
      resumen: '',
      tags: [],
      content:'',
      createDate: new Date().getTime(),
      updateDate: null,
      autor: name,
      display: false
    }

    const doc = await db.collection('posts').add(newPost)

    dispatch(activePost(doc.id, newPost))
    dispatch(addNewPost())
  }
}

export const activePost = (id, post) => ({
  type: types.postsActive,
  payload:{
    id,
    ...post
  }
})

export const addNewPost = (id, post) => ({
  type: types.postsAddNew,
  payload: {
    id, ...post
  }
})

export const startSavePost = (post) => {
  return async (dispatch, getState) => {

    const postToFirestore = {...post}
    delete postToFirestore.id;

    await db.doc(`posts/${post.id}`).update(postToFirestore)

    dispatch(refreshPost(post.id, post))

    handleSavedSwal(post.title);
  }
}

export const refreshPost = (id, post) => ({
  type: types.postsUpdated,
  payload: {
    id, 
    post: {
      id,
      ...post
    }
  }
});

export const startUploadingFile = (file) => {
  return async( dispatch, getState ) => {

    const {active: activePost } = getState().posts;

    handleUploadingSwal(true);

    const fileUrl = await fileUpload(file)
    activePost.url = fileUrl;

    dispatch(startSavePost(activePost));

    handleUploadingSwal(false);

  }
}

export const startUpdatingFile = (oldFile, newFile) => {
  return async(dispatch) => {

    console.log(oldFile, newFile)
    if (oldFile != null){
      fileDeleted(oldFile)
    }

    dispatch(startUploadingFile(newFile))
  }
}

export const startDeletingPost = (id) => {
  return async(dispatch, getState) => {

    const {active: post} = getState().posts;

    if (post != null && post.url != null) {
      fileDeleted(post.url)
    }
    await db.doc(`posts/${id}`).delete();

    dispatch(deletePost(id));

  }
}

export const startLoadingPosts = (isAdmin = false) => {
  return async (dispatch) => {
    let posts = await loadPosts();
    if (!isAdmin) posts = posts.filter((post) => post.display)
    
    const totalCount = posts.length;
    const countPerPage = 5; //Total de items por pagina
    const totalPages = Math.ceil(totalCount / countPerPage);

    posts.sort((a, b) => b.createDate - a.createDate)
    dispatch(setPosts(posts, totalCount, countPerPage, totalPages))
  }
}

export const startLoadingPostById = (id) => {
  return async (dispatch) => {
    const post = await loadPostById(id)
    dispatch(setActivePost(id, post))
  }
}

export const setPosts = (posts, totalCount, countPerPage, totalPages) => ({
  type: types.postsLoad,
  payload: {
    posts,
    totalCount,
    countPerPage,
    totalPages
  }
})

export const setActivePost = (id, post) => ({
  type: types.postsActive,
  payload: {
    id,
    ...post
  }
})

export const loadNewPagePost = (page) => {
  return async (dispatch, getState) => {
    //Clone the previous state
    const postsState = getState().posts;
    let loadNewPageState = Object.assign({}, postsState);
    //How many pages should be added. Will always be 1 or -1
    let addPages = page;
    //add it to the current
    loadNewPageState.currentPage += addPages;

    let perPage = loadNewPageState.countPerPage; //20 by default

    let nextPosts;
    if (addPages === 1){
        //Moving from page 1 to 2 will cause ‘upperCount’ to be 40
        let upperCount = loadNewPageState.currentCount + perPage;
        let lowerCount = loadNewPageState.currentCount; //This hasn’t been changed. It will remain 20.

        loadNewPageState.currentCount += loadNewPageState.countPerPage;
        nextPosts = loadNewPageState.posts.slice(lowerCount, upperCount);
    }

    if (addPages ===-1){
        let upperCount = loadNewPageState.currentCount; //40
        let lowerCount = loadNewPageState.currentCount - perPage; //20

        loadNewPageState.currentCount -= loadNewPageState.countPerPage;
        nextPosts = loadNewPageState.posts.slice(lowerCount - perPage, upperCount - perPage);
    }

    loadNewPageState.filteredPosts = nextPosts;

    dispatch(setPostsPage(loadNewPageState))
  }
}

export const loadExactPagePost = (page) => {
  return async (dispatch, getState) => {

    const postsState = getState().posts;
    const exactPageState = Object.assign({}, postsState);

    const exactPage = page;
    let upperCountExact = exactPageState.countPerPage * exactPage;
    let lowerCountExact = upperCountExact - exactPageState.countPerPage;
 
    let exactPosts = exactPageState.posts.slice(lowerCountExact, upperCountExact);
    exactPageState.filteredPosts = exactPosts;
    exactPageState.currentCount = upperCountExact;
    exactPageState.currentPage = exactPage;
    
    dispatch(setPostsPage(exactPageState))
  }
}

export const setPostsPage = (loadNewPageState) => ({
  type: types.postsLoadNewPage,
  payload: loadNewPageState
})

export const deletePost = (id) => ({
  type: types.postsDelete,
  payload: id
})

export const cleanPostActive = () => ({
  type: types.postsCleanActive,
  payload: null
})