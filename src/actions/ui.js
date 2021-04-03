import { types } from "../types/types";

export const setError = ( err ) => ({
  type: types.uiSetError,
  payload: err
})

export const removeError = () => ({
  type: types.uiRemoveError
})

export const uiStartLoading = () => ({
  type: types.uiStartLoading
})

export const uiFinishLoading = () => ({
  type: types.uiFinishLoading
})

export const uiBlogScreenActive = (active) => ({
  type: types.uiBlogScreenActive,
  payload: active
})

export const uiBlogTagScreenActive = (tagScreenActive) => ({
  type: types.uiTagScreenActive,
  payload: tagScreenActive
})

export const uiBlogPostScreenActive = (postScreenActive) => ({
  type: types.uiPostScreenActive,
  payload: postScreenActive
})