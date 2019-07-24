import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
// import { selectCartHidden } from "../../redux/cart/cart.selectors";
// import { selectCurrentUser } from "../../redux/user/user.selectors";

import CurrentUserContext from "../../contexts/current-user/current-user.context";
// in this case the header component is going to be where the provider of the CartContext is going to be placed sin the CartDropdown is children of it and we need it in both
// we replace the cartcontext from the cart.context with the one of our cart.provider
// import CartContext from "../../contexts/cart/cart.context";
import { CartContext } from "../../providers/cart/cart.provider";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

// <- WE REPLACE REDUX IMPLEMENTATION WITH CONTEXT ->
// in this case instead of levereage the local state using constructor and super an this.state we will use useState hook (we could have done the same in the App component using useState and useEffect)

const Header = () => {
  // we dont need to create the local state using useState anymore since this is managed inside the CartProvider now
  // const [hidden, setHidden] = useState(true);
  // we dont need to define toggleHidden here anymore since it is defined inside CartProvider
  // const toggleHidden = () => setHidden(!hidden);

  // we simply create the currentUser const by using useContext hook to consume the provided CurrentUserContext currentUser value we take from the Provider in the App component
  const currentUser = useContext(CurrentUserContext);
  // now we pull the values we need from the CartContext inside CartProvider
  const { hidden } = useContext(CartContext);

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      {/* we dont use the Provider here anymore since the CartProvider is now wrapping the entire application, now we just consume it in the components we need */}
      {/* <CartContext.Provider value={{ hidden, toggleHidden }}> */}
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
      {/* </CartContext.Provider> */}
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   hidden: selectCartHidden
// });

// export default connect(mapStateToProps)(Header);
export default Header;

// <- This is the code previous to the Provider pattern adoption and having CartProvider in index.js ->

export const HeaderWithoutProviderPattern = () => {
  // we create the local state using useState
  const [hidden, setHidden] = useState(true);
  // we create the toggleHidden function that we will pass to the context using the provider to allow childrens to toggle the value of the hidden property using the setHidden function that useState gives us to modify hidden local state property
  const toggleHidden = () => setHidden(!hidden);

  // we simply create the currentUser const by using useContext hook to consume the provided CurrentUserContext currentUser value we take from the Provider in the App component
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <CartContext.Provider value={{ hidden, toggleHidden }}>
        <div className="options">
          <Link className="option" to="/shop">
            SHOP
          </Link>
          <Link className="option" to="/shop">
            CONTACT
          </Link>
          {currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
          ) : (
            <Link className="option" to="/signin">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
      </CartContext.Provider>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   hidden: selectCartHidden
// });

// export default connect(mapStateToProps)(Header);
