import React, { Component } from "react";
import { connect } from "react-redux";

import { removeItem } from "../store/actions/cart";
import { syncQuantity } from "../store/actions/catalog";

class Cart extends Component {
  _removeFromCart(item) {
    this.props.dispatch(removeItem(item));
    this.props.dispatch(syncQuantity({ item: item, quantity: 0 }));
  }

  render() {
    const { itemsList } = this.props;
    let subTotals = [];
    let discountTotals = [];
    let totalAfterDiscount = [];
    let netTotals = [];

    console.log(itemsList);
    itemsList.map(item => {
      subTotals.push(item.quantity * item.price);
    });

    itemsList.map(item => {
      discountTotals.push(
        item.discount ? item.quantity * item.price * item.discount : 0
      );
    });

    itemsList.map(item => {
      totalAfterDiscount.push(
        item.discount
          ? item.quantity * (item.price - item.price * item.discount)
          : item.quantity * item.price
      );
    });

    itemsList.map(item => {
      netTotals.push(item.quantity * item.price);
    });

    const serviceChargeTotal =
      totalAfterDiscount.length !== 0 &&
      totalAfterDiscount.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) * 0.15;
    const totalAfterServiceCharge =
      totalAfterDiscount.length !== 0 &&
      totalAfterDiscount.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) * 1.15;

    const vatTotal = totalAfterServiceCharge * 0.07;
    const totalAfterVat = totalAfterServiceCharge * 1.07;

    return (
      <div className="cart">
        {itemsList.length !== 0 ? (
          <div className="contains-items">
            <h3>Your Cart Summary</h3>

            <div className="cart-overview">
              <div className="item-count">
                <span>Item(s) in cart</span>
                <span className="count-meter">{itemsList.length}</span>
              </div>

              <div className="grand-total">
                <span>Total</span>
                <span className="total-amount">
                  {netTotals.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
                </span>
              </div>
            </div>
            <div className="cart-overview">
              <div className="grand-total">
                <span>Discount </span>
                <span className="total-amount">
                  {discountTotals.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
                </span>
              </div>

              <div className="grand-total">
                <span>Total (After Discount)</span>
                <span className="total-amount">
                  {totalAfterDiscount.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
                </span>
              </div>
            </div>
            <div className="cart-overview">
              <div className="item-count">
                <span>Service Charge 15%</span>
                <span className="count-meter">{serviceChargeTotal}</span>
              </div>
              <div className="grand-total">
                <span>Total (After Service Charge)</span>
                <span className="total-amount">{totalAfterServiceCharge}</span>
              </div>
            </div>
            <div className="cart-overview">
              <div className="item-count">
                <span>VAT 7%</span>
                <span className="count-meter">{vatTotal}</span>
              </div>
            </div>
            <div className="cart-overview">
              <div className="grand-total" style={{ backgroundColor: "black" }}>
                <span style={{ color: "white" }}>Net Total (THB)</span>
                <span className="total-amount" style={{ color: "white" }}>
                  {totalAfterVat}
                </span>
              </div>
            </div>
            <hr />

            <table>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Discount</th>
                <th>Net</th>
              </tr>
              {itemsList &&
                itemsList.map((item, i) => (
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      {item.brand}
                      <br />
                      {item.item}
                    </td>

                    <td>{item.quantity}</td>

                    <td>
                      <div>{item.quantity * item.price}</div>
                    </td>

                    <td>
                      {item.discount ? (
                        <div>{item.quantity * item.price * item.discount}</div>
                      ) : (
                        <div>{0}</div>
                      )}
                    </td>

                    <td>
                      {item.discount ? (
                        <div>
                          {item.quantity *
                            (item.price - item.price * item.discount)}
                        </div>
                      ) : (
                        <div>{item.quantity * item.price}</div>
                      )}
                    </td>

                    <td>
                      <div
                        style={{
                          borderRadius: "100%",
                          background: "#b71c1c",
                          color: "#fff",
                          width: "16px",
                          height: "16px",
                          textAlign: "center",
                          fontSize: "13px",
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          this._removeFromCart(item.item);
                        }}
                      >
                        x
                      </div>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        ) : (
          <div className="contains-no-items">
            <h3>Oops! Your cart is empty!</h3>
            <h4>Add items to proceed</h4>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsList: state.cart
});

export default connect(mapStateToProps)(Cart);
