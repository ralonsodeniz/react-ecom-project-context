// the cart provider is going to be a component that makes the function of the context provider and integrates all the utils we had in redux
// this is a component that is going to wrap the component upper enough in the hierarchy tree to give access to the context to all the components that need it
// this will replace the cart.context.js in every place we where using it
// we wrap the entire app with the providers

import React, { createContext, useState, useEffect } from "react";

import {
  addItemToCart,
  removeItemFromCart,
  filterItemsFromCart,
  getCartItemsCount,
  getCartTotalPrice
} from "./cart.utils";

// we create the CartContext with all the properties we need, including the util functions we need to let children interact with the context
// we export it because we need to import it in the components where we want to consume it
export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartItemsTotal: 0
});

// we create the context Provider component
const CartProvider = ({ children }) => {
  // we start building all the functionalities of our CartProvider to pass them as value of the Provider component in the return after

  // we first pull all the properties that are not functions to be able to modify them with the functions
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItemsTotal, setCartItemsTotal] = useState(0);

  // we create the property functions that modify the other properties
  const toggleHidden = () => setHidden(!hidden);
  // addItem is a function that takes an item object that performs setCartItems function to set cartItems value to what addItemToCart returns using the current value of cartItems and the item parameter we passed in to addItem
  const addItem = item => setCartItems(addItemToCart(cartItems, item)); // this is a composed function, first addItemToCart is executed using cartItems and item and then setCartItems is called using the result of the previous action
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = item =>
    setCartItems(filterItemsFromCart(cartItems, item));
  // in order to update the cartItemsCount we are going to use useEffect
  // we want to whenever the cartItems property changes fire an effect that updates the cartItemsCount and the cartItemsTotal
  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartItemsTotal(getCartTotalPrice(cartItems));
  }, [cartItems]);

  // we return all the chidren that are wrapped by the CartProvider component with access to the context provided, similiar to what redux Provider does when we call it in the index.js
  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemsCount,
        cartItemsTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
