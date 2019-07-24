import React, { useContext } from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
// import { selectCartItems } from "../../redux/cart/cart.selectors";
// import { toggleCartHidden } from "../../redux/cart/cart.actions.js";

import { CartContext } from "../../providers/cart/cart.provider";

import "./cart-dropdown.styles.scss";

// <- WE REPLACE REDUX IMPLEMENTATION WITH CONTEXT ->

const CartDropdown = ({ history, dispatch }) => {
  const { toggleHidden, cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          // dispatch(toggleCartHidden());
          toggleHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   cartItems: selectCartItems
// });

// export default withRouter(connect(mapStateToProps)(CartDropdown));

export default withRouter(CartDropdown);
