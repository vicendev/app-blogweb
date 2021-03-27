import { types } from "../types/types";


const initialState = {
  tags: [],
  filteredTags: [],
  currentCount: null,
  totalCount: null,
  currentPage: null,
  totalPages: null,
  filteredPages: null,
  active: null
}


export const tagsReducer = (state = initialState, action) => {


  switch (action.type) {

    case types.tagsAddNew:
      return {
        ...state,
        tags: [action.payload, ...state.tags]
      }

    case types.tagsActive:
      return {
        ...state,
        active: { 
          ...action.payload
        }
      }

    case types.tagsLoad:
      return {
        ...state,
        tags: action.payload.tags,
        filteredTags: action.payload.tags.slice(0, action.payload.countPerPage),
        currentCount: action.payload.countPerPage,
        countPerPage: action.payload.countPerPage,
        totalCount: action.payload.totalCount,
        currentPage: 1,
        totalPages: action.payload.totalPages,
        filteredPages: action.payload.totalPages
      }
    
      case types.tagsLoadNewPage:
        return {
          ...state,
          filteredTags: action.payload.filteredTags,
          currentCount: action.payload.currentCount,
          countPerPage: action.payload.countPerPage,
          totalCount: action.payload.totalCount,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          filteredPages: action.payload.filteredPages
        }

      case types.tagsUpdated:
        return {
          ...state,
          tags: state.tags.map(
            tag => tag.id === action.payload.id
            ? action.payload.tag
            : tag
          )
        }

      case types.tagsDelete:
        return {
          ...state,
          active: null,
          tags: state.tags.filter(tag => tag.id !== action.payload),
          filteredTags: state.filteredTags.filter(tag => tag.id !== action.payload),
        }
  
    default:
      return state;
  }
}