import React, { useContext } from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.component";

// import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import CollectionsContext from "../../contexts/collections/collections.context.js";

import "./collections-overview.styles.scss";

const CollectionsOverview = () => {
  const collectionsObject = useContext(CollectionsContext);
  const collections = Object.keys(collectionsObject).map(
    key => collectionsObject[key]
  );

  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollectionsForPreview
// });

// export default connect(mapStateToProps)(CollectionsOverview);

export default CollectionsOverview;
