import React from 'react';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { withRouter, RouteComponentProps } from './withRouter';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class CartSummary extends React.Component<Props> {
  handleCheckout = () => {
    this.props.navigate('/checkout');
  };

  render() {
    const { cartStore } = this.props.store!;
    const subtotal = cartStore.totalCartValue;
    const discount = subtotal > 500 ? 100 : 0;
    const total = subtotal - discount;

    return (
      <div className="checkout-panel">
        <h3 className="checkout-panel-title">Cart Summary</h3>
        <div className="checkout-panel-row">
          <span>Items:</span>
          <span>{cartStore.totalCartItems}</span>
        </div>
        <div className="checkout-panel-row">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="checkout-panel-row">
          <span>Discount:</span>
          <span className="text-accent">-₹{discount.toFixed(2)}</span>
        </div>
        <div className="checkout-panel-row">
          <span>Delivery:</span>
          <span className="text-accent">Free</span>
        </div>
        <div className="checkout-panel-row checkout-panel-total">
          <span>Total:</span>
          <span className="total-accent">₹{Math.max(0, total).toFixed(2)}</span>
        </div>
        <button className="btn-primary checkout-action-btn" onClick={this.handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    );
  }
}

export default withRouter(withStore(observer(CartSummary)));
