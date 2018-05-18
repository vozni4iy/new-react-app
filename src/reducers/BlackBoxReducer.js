import {
   LOAD_BLACK_BOX_LIST,
   LOAD_BLACK_BOX_ITEM,
   LOAD_BLACK_BOX_ALL,
 } from '../actions/types';

const INITIAL_STATE = {
  list: [],
  item: null,
  all: [],
}

export default function blackBox (state = INITIAL_STATE, action) {

  switch (action.type) {
    case LOAD_BLACK_BOX_LIST:
      return { ...state, list: action.payload }
    case LOAD_BLACK_BOX_ITEM:
      return { ...state, item: action.payload }
    case LOAD_BLACK_BOX_ALL:
      return { ...state, all: action.payload.tree, list: action.payload.list }
    default:
      return state;
  }

};
