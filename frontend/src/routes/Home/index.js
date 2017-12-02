import React, { Component } from "react";
import Catalog from "../../components/Catalog";
import Cart from "../../components/Cart";
import Layout from "../../components/Layout";

import { connect } from "react-redux";
import { getData } from "../../store/actions/catalog";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getData());
  }

  render() {
    const { items, cartItems } = this.props;

    return (
      <Layout>
        {items === undefined ? (
          <div>Loading...</div>
        ) : (
          <div className="wrap">
            <Catalog items={items} />
            <Cart />
          </div>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  items: state.catalog,
  cartItems: state.cart
});

export default connect(mapStateToProps)(App);
