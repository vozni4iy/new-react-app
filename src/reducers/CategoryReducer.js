import {
   LOAD_CATEGORY_LIST,
   LOAD_CATEGORY_ITEM,
   LOAD_CATEGORY_ALL,
 } from '../actions/types';

const INITIAL_STATE = {
  list: [],
  item: null,
  all: [],
}

export default function category (state = INITIAL_STATE, action) {

  switch (action.type) {
    case LOAD_CATEGORY_LIST:
      return { ...state, list: action.payload }
    case LOAD_CATEGORY_ITEM:
      return { ...state, item: action.payload }
    case LOAD_CATEGORY_ALL:
      return { ...state, all: action.payload.tree, list: action.payload.list }
    default:
      return state;
  }

};
