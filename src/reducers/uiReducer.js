import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
  active: null,
  tagScreenActive: null
}

export const uiReducer = ( state = initialState, action ) => {

  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload
      };
      
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null
      };
    
      case types.uiStartLoading:
        return {
          ...state,
          loading: true
        }
      
      case types.uiFinishLoading:
        return {
          ...state,
          loading: false
        }

      case types.uiBlogScreenActive:
        return {
          ...state,
          active: action.payload
        }

      case types.uiTagScreenActive:
        return {
          ...state,
          tagScreenActive: action.payload
        }

      case types.uiPostScreenActive:
        return {
          ...state,
          postScreenActive: action.payload
        }

      default:
        return state;
  }
}