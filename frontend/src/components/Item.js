import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import Button from "./Button";
import QuantityBar from "./QuantityBar";

import { addToCart } from "../store/actions/cart";
import { syncQuantity } from "../store/actions/catalog";

class Item extends Component {
  constructor(props) {
    super(props);
  }

  _addToCart = (price, brandName, productName, discount, quantity) => {
    const itemDetails = {
      item: productName,
      quantity: quantity,
      price: price,
      brand: brandName,
      discount: discount
    };

    this.setState({
      quantity: 1
    });

    const syncCatalog = {
      item: productName,
      quantity: quantity
    };

    this.props.dispatch(addToCart(itemDetails));
    this.props.dispatch(syncQuantity(syncCatalog));
  };

  render() {
    const {
      productImage,
      brandName,
      productName,
      packageDetail,
      price,
      quantity,
      discount
    } = this.props;

    return (
      <div className="item-wrapper">
        <div
          className={classnames(
            "item-container",
            productName.toLowerCase().replace(/ /gi, "-")
          )}
        >
          <div className="product-img">
            <img src={productImage} alt={productName} />
          </div>
          <div className="product-details">
            <div className="brand-name">{brandName}</div>
            <div className="product-name">{productName}</div>
            <div className="package-detail">{packageDetail}</div>
            {discount ? (
              <div className="product-price">
                THB {price - price * discount}
              </div>
            ) : (
              <div className="product-price">THB {price}</div>
            )}
            {discount && (
              <div
                style={{
                  marginBottom: 10,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  paddingTop: 5,
                  backgroundColor: "#8BC34A"
                }}
              >
                SAVE {discount * 100}%
              </div>
            )}

            {quantity === 0 || quantity === undefined ? (
              <Button
                onClick={() => {
                  this._addToCart(price, brandName, productName, discount, 1);
                }}
              />
            ) : (
              <QuantityBar item={productName} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cataLog: state.catalog
});

export default connect(mapStateToProps)(Item);
