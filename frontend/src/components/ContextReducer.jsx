import React, { createContext, useReducer, useContext } from "react";

const cartStateContext = createContext([]);
const cartDispatchContext = createContext(() => {});
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          quantity: action.quantity,
          size: action.size,
        },
      ];

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "DROP":
      return [];
    
    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          return {
            ...food,
            quantity: action.quantity,
            price: action.price,
          };
        }
        return food;
      });

    default:
      console.log("Error in reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
