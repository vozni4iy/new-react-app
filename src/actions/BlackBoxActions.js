import {
  LOAD_BLACK_BOX_LIST,
  LOAD_BLACK_BOX_ITEM,
  LOAD_BLACK_BOX_ALL,
} from './types';

export const loadBlackBoxList = blackBoxList => ({
  type: LOAD_BLACK_BOX_LIST,
  payload: blackBoxList,
});

export const loadBlackBoxItem = blackBoxItem => ({
  type: LOAD_BLACK_BOX_ITEM,
  payload: blackBoxItem,
});

export const loadBlackBoxAll = blackBoxAll => ({
  type: LOAD_BLACK_BOX_ALL,
  payload: blackBoxAll,
});

export const createBlackBox = data => dispatch => {
  dispatch(loadBlackBoxItem(data));
}

export const updateBlackBox = data => dispatch => {
  dispatch(loadBlackBoxItem(data));
}
