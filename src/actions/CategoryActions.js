import {
  LOAD_CATEGORY_LIST,
  LOAD_CATEGORY_ITEM,
  LOAD_CATEGORY_ALL,
} from './types';

import { actionWrapper } from '../lib/api';

const routePath = '/v1/category';

const createTreeFromArray = list => {
  const map = {};
  let node = [];
  const roots = [];
  let i;
  for (i = 0; i < list.length; i++) {
      map[list[i]._id] = i; // initialize the map
      list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== null) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.parentId]].children.push(node);
      } else {
          roots.push(node);
      }
  }
  return roots;
}

export const loadCategoryList = categoryList => ({
  type: LOAD_CATEGORY_LIST,
  payload: categoryList,
});

export const loadCategoryItem = categoryItem => ({
  type: LOAD_CATEGORY_ITEM,
  payload: categoryItem,
});

export const loadCategoryAll = categoryAll => ({
  type: LOAD_CATEGORY_ALL,
  payload: categoryAll,
});

export const createCategory = (data) => actionWrapper(
    {
      method: 'post',
      url: `${routePath}/create`,
      data,
      onSuccess: (response) => {
        console.log('success: ', response);
        return getAllCategory();
      },
    }
);

export const updateCategory = (data) => actionWrapper(
    {
      method: 'put',
      url: `${routePath}/update`,
      data,
      onSuccess: (response) => {
        console.log('success update: ', response);
        return getAllCategory()
      },
    }
);

export const deleteCategory = (categoryId) => actionWrapper(
    {
      method: 'delete',
      url: `${routePath}/${categoryId}`,
      onSuccess: (response) => {
        console.log('success delete: ', response);
        return getAllCategory();
      },
    }
);

export const getAllCategory = () => actionWrapper(
    {
      method: 'get',
      url: `${routePath}/all`,
      onSuccess: (response) => {
        console.log('success: ', response);
        const tree = createTreeFromArray(response.data);
        console.log('modified tree: ', tree);

        return loadCategoryAll({
          tree,
          list: response.data,
        });
      },
    }
);

export const getCategoryList = (id) => actionWrapper(
    {
      method: 'get',
      url: `${routePath}/categoryList/${id}`,
      onSuccess: (response) => {
        console.log('category list: ', response);
        return loadCategoryList(response.data);
      },
    }
);
