// this contexts is going to store our collections object, the one that holds all of our collections items
// in order to make this new context we have to import in the method create context from React
import { createContext } from "react";
// this method can take anything and store it
import SHOP_DATA from "./shop.data";

// we create the CollectionContext (capitalized since we are going to use it like a component) and we are going to pass it the shop data
const CollectionsContext = createContext(SHOP_DATA); // this set the elements and initial value of our context

export default CollectionsContext;
