import React from 'react';
import { observer } from 'mobx-react';
import { CartItem as CartItemType } from '../stores/CartStore';
import { RootStore } from '../stores/RootStore';
import { withStore } from '../stores/StoreContext';

interface Props {
  store?: RootStore;
  item: CartItemType;
}

class CartItem extends React.Component<Props> {
  handleIncrease = () => {
    this.props.store!.cartStore.increaseQuantity(this.props.item.id);
  };

  handleDecrease = () => {
    this.props.store!.cartStore.decreaseQuantity(this.props.item.id);
  };

  handleRemove = () => {
    this.props.store!.cartStore.removeFromCart(this.props.item.id);
  };

  render() {
    const { item } = this.props;
    return (
      <div className="cart-item-card">
        <div className="cart-item-image-wrapper">
          <img src={item.image} alt={item.title} className="cart-item-image" />
        </div>
        <div className="cart-item-details">
          <div className="cart-item-title">{item.title}</div>
          <div className="cart-item-price">₹{item.price.toFixed(2)}</div>
        </div>
        <div className="cart-item-actions">
          <div className="cart-item-quantity-controls">
            <button className="qty-btn" onClick={this.handleDecrease}>-</button>
            <span className="qty-value">{item.quantity}</span>
            <button className="qty-btn" onClick={this.handleIncrease}>+</button>
          </div>
          <button className="cart-remove-btn" onClick={this.handleRemove}>Remove</button>
        </div>
      </div>
    );
  }
}
export default withStore(observer(CartItem));
