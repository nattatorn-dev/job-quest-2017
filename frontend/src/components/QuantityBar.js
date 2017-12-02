import React, { Component } from "react";
import { connect } from "react-redux";

import { updateCart, removeItem } from "../store/actions/cart";
import { syncQuantity } from "../store/actions/catalog";

class QuantityBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuantity: 1
    };
  }

  componentDidMount() {
    const { itemsInStore } = this.props;
    const currentItem = itemsInStore.find(this._getCurrentItemQuantity);

    this.setState({
      currentQuantity: currentItem ? currentItem.quantity : 0
    });
  }

  _getCurrentItemQuantity = cart => {
    const { item } = this.props;
    return cart.item === item;
  };

  _updateQuantity = change => {
    const { itemsInStore, item } = this.props;
    const currentItem = itemsInStore.find(this._getCurrentItemQuantity);
    let { quantity } = currentItem;

    switch (change) {
      case "increment": {
        quantity = quantity + 1;
        break;
      }
      case "decrement": {
        quantity = quantity - 1;
        if (quantity === 0 || quantity === undefined)
          this.props.dispatch(removeItem(item));
      }
    }

    this.setState({
      currentQuantity: quantity
    });

    const updatedItemDetails = Object.assign(currentItem, {
      quantity: quantity
    });

    const syncCatalog = {
      item: item,
      quantity: quantity
    };

    this.props.dispatch(updateCart(updatedItemDetails));
    this.props.dispatch(syncQuantity(syncCatalog));
  };

  render() {
    const { currentQuantity } = this.state;

    const { quantityAdded } = this.props;

    return (
      <div className="quantity-bar">
        <div
          className="adjust-quantity"
          onClick={() => {
            this._updateQuantity("decrement");
          }}
        >
          <span>-</span>
        </div>
        <div className="item-quantity-meter">
          <span>{currentQuantity} in cart</span>
        </div>
        <div
          className="adjust-quantity"
          onClick={() => {
            this._updateQuantity("increment");
          }}
        >
          <span>+</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsInStore: state.cart
});

export default connect(mapStateToProps)(QuantityBar);
