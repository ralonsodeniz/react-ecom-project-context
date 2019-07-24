// cart context has been deprecated by using cart provider that already includes the context
import { createContext } from "react";

const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {}
});
// in this case the instantiate for the initial value of createContext is going to be an object where we pass the initial value of hidden and an empty function that is going to be the function we use for toggling its value which we will declare in the component where we do so
// here we only give a default value to the toggle function, the function will be defined inside components local state
// the reason why we do this, to define a function as part of the context, is to give access to the Providers children to a function to modify the value of a property of the context that is defined in the component where the provider is called, in this case to toggle the hidden property
// we did not use this pattern in the current-user context because we only want it to be updated in the App.js
// we need to toggle the hidden context property when we click in the cart icon but also when we click the go to checkout button in the cart dropdown, both children to header, where we need hidden to know if we render or not the cart dropdown, and thats why we set there the provider
export default CartContext;
