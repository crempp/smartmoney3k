import * as types from '../constants/ActionTypes';

export function addStock(name) {
  return {
    type: types.ADD_STOCK,
    name
  };
}

export function deleteStock(id) {
  return {
    type: types.DELETE_STOCK,
    id
  };
}
