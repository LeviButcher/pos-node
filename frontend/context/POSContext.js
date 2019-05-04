import React, { createContext, useContext, useReducer } from "react";

// Taken and Modified from this article -> https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
// Credit to Luke Hall
export const POSContext = createContext();
export const POSProvider = ({ reducer, initialState, children }) => (
  <POSContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </POSContext.Provider>
);

export const usePOSState = () => useContext(POSContext);

export const defaultState = { customer: {}, cartItems: [] };

export const POSReducer = (state, action) => {
  switch (action.type) {
    case "ADD-CUSTOMER": {
      return {
        ...state,
        customer: action.customer
      };
    }
    case "ADD-ITEM": {
      const index = state.cartItems.findIndex(
        element => element.item.sku === action.cartItem.item.sku
      );

      let cartItemsCopy = state.cartItems;
      if (index != -1) {
        cartItemsCopy.splice(index, 1, action.cartItem);
      } else {
        cartItemsCopy = [...cartItemsCopy, action.cartItem];
      }

      return {
        ...state,
        cartItems: cartItemsCopy
      };
    }
    case "CLEAR-CART": {
      return {
        ...state,
        cartItems: []
      };
    }
    case "WIPE": {
      return defaultState;
    }
    default:
      return state;
  }
};
