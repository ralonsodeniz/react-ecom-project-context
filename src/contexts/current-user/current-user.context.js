// we create a context to store and update our currentUser data
import { createContext } from "react";

const CurrentUserContext = createContext(null); // the initial value is undefined

export default CurrentUserContext;
