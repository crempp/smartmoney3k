import * as types from '../constants/ActionTypes';

const initialState = {
  stocks: [1],
  stocksById: {
    1: {
      id: 1,
      name: 'ASD'
    },
    2: {
      id: 2,
      name: 'BFE'
    },
    3: {
      id: 3,
      name: 'XRW'
    }
  }
};

export default function exchange(state = initialState, action) {
  switch (action.type) {

    case types.ADD_STOCK:
      const newId = state.stocks[state.stocks.length-1] + 1;
      return {
        ...state,
        stocks: state.stocks.concat(newId),
        stocksById: {
          ...state.stocksById,
          [newId]: {
            id: newId,
            name: action.name
          }
        },
      }

    // case types.DELETE_STOCK:
    //   return {
    //     ...state,
    //     stocks: state.stocks.filter(id => id !== action.id),
    //     stocksById: omit(state.stocksById, action.id)
    //   }

    default:
      return state;
  }
}