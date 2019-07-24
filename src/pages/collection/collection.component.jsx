import React, { useContext } from "react";
// import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

// import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionsContext from "../../contexts/collections/collections.context";
// there is two ways of using CollectionsContext
// one is using it as a component, it is the more complicate way to use it, and you wrap the part of the application that needs the data inside the context
// we use the <CollectionsContext.Consumer> .Consumer means I want to consume the value on the code wrapped by it
// we create a js function inside the <CollectionsContext.Consumer> that has access to the data inside the CollectionsContext

import "./collection.styles.scss";

// <- WE REPLACE REDUX IMPLEMENTATION WITH CONTEXT ->

export const CollectionPageHardContext = ({ match }) => {
  return (
    <CollectionsContext.Consumer>
      {collections => {
        // collections is the name we have choosen to give to the data object inside our context
        // since we are not longer using reselect, we are not using redux, we create our own selector to pull the data we need
        const collection = collections[match.params.collectionId]; // we select the collection we need from the collections object indirectly using the match.params.colleectionId from the url object
        const { title, items } = collection;
        return (
          // we need to return the html from the function so it gets returned from the component
          <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
              {items.map(item => (
                <CollectionItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      }}
    </CollectionsContext.Consumer>
  );
};

// the other way, the ease one, to use our context is by using the new hook useContext
// what useContext does is it allows us to get the value inside the context and store as a const inside the component

const CollectionPage = ({ match }) => {
  const collections = useContext(CollectionsContext); // we set the name of the const we want and inside useContext() we pass as a parameter the context we want to use
  // now we have inside collections const the collections object of our context
  // we create our collection selector depending on the url we have access the collection page
  const collection = collections[match.params.collectionId];
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// we dont need connect neither mapStateToProps anymore

// const mapStateToProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.match.params.collectionId)(state)
// });

// export default connect(mapStateToProps)(CollectionPage);

export default CollectionPage;
