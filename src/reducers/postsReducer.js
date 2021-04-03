import { types } from "../types/types";


const initialState = {
  posts: [],
  filteredPosts: [],
  currentCount: null,
  totalCount: null,
  currentPage: null,
  totalPages: null,
  filteredPages: null,
  active: null
}

export const postsReducer = (state = initialState, action) => {

  switch (action.type) {

    case types.postsActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }

    case types.postsCleanActive:
      return {
        ...state,
        active: null
      }

    case types.postsLoad:
      return {
        ...state,
        posts: action.payload.posts,
        filteredPosts: action.payload.posts.slice(0, action.payload.countPerPage),
        currentCount: action.payload.countPerPage,
        countPerPage: action.payload.countPerPage,
        totalCount: action.payload.totalCount,
        currentPage: 1,
        totalPages: action.payload.totalPages,
        filteredPages: action.payload.totalPages
      }

    case types.postsLoadNewPage:
      return {
        ...state,
        filteredPosts: action.payload.filteredPosts,
        currentCount: action.payload.currentCount,
        countPerPage: action.payload.countPerPage,
        totalCount: action.payload.totalCount,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        filteredPages: action.payload.filteredPages
      }

    case types.postsAddNew:
      return {
        ...state,
        posts: [ action.payload, ...state.posts]
      }

      case types.postsUpdated:
        return {
          ...state,
          posts: state.posts.map(
            post => post.id === action.payload.id
              ? action.payload.post
              : post
          )
        }

    case types.postsDelete:
      return {
        ...state,
        active: null,
        posts: state.posts.filter(post => post.id !== action.payload),
        filteredPosts: state.filteredPosts.filter(post => post.id !== action.payload),
      }
  
    default:
      return state;
  }
}