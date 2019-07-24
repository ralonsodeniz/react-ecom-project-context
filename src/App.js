import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// import { setCurrentUser } from "./redux/user/user.actions";
// import { selectCurrentUser } from "./redux/user/user.selectors";

import CurrentUserContext from "./contexts/current-user/current-user.context";

// <- WE REPLACE REDUX IMPLEMENTATION WITH CONTEXT ->

class App extends React.Component {
  // we go back to having a constructor and a state in the App object with the currentUser value
  // the reason why we do this is because we are going to use this currentUser state value to update context provider
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // we no longer use actions to store the new values on the redux store but again setState the new object to currentUser App state
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          {/* value is the key we use to pass the context the data we want to update */}
          {/* now whenever the currentUser is updated in App.js it will be updated in the context by the provider */}
          {/* any consumer that is consuming this value (that is down in the tree of the components wrapped by <CurrentUserContext.Provider> and use the context consumer will rerender when this value changes) */}
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.state.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default App;
