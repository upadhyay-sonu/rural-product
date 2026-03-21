import React from 'react';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { withRouter, RouteComponentProps } from '../components/withRouter';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/formatCurrency';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class CartPage extends React.Component<Props> {
  handleRemove = (id: number) => {
    const { cartStore } = this.props.store!;
    cartStore.removeFromCart(id);
  }

  handleBack = () => {
    this.props.navigate('/');
  }

  render() {
    const { cartStore } = this.props.store!;
    
    return (
      <motion.div
        className="cart-page-container"
        initial="initial"
        animate="in"
        exit="out"
        variants={{
          initial: { opacity: 0, scale: 0.98 },
          in: { opacity: 1, scale: 1 },
          out: { opacity: 0, scale: 0.98 }
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="cart-header">
          <button className="back-btn" onClick={this.handleBack}>← Continue Shopping</button>
          <h1>Your Cart</h1>
        </div>

        {cartStore.items.length === 0 ? (
          <div className="cart-empty-state">
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-layout">
              <div className="cart-items-list">
                {cartStore.items.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-image-wrapper">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <div className="cart-item-price">{formatCurrency(item.price)}</div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-item-quantity-controls">
                      <button 
                        className="qty-btn" 
                        onClick={() => cartStore.decreaseQuantity(item.id)}
                      >-</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => cartStore.increaseQuantity(item.id)}
                      >+</button>
                    </div>
                    <button 
                      className="cart-remove-btn" 
                      onClick={() => this.handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary-column">
              <div className="checkout-panel">
                <h3 className="checkout-panel-title">Order Summary</h3>
                <div className="checkout-panel-row">
                  <span>Items:</span>
                  <span>{cartStore.totalItems}</span>
                </div>
                <div className="checkout-panel-row checkout-panel-total">
                  <span>Total:</span>
                  <span className="total-accent">{formatCurrency(cartStore.totalPrice)}</span>
                </div>
                <button 
                  className="btn-primary checkout-action-btn" 
                  onClick={() => this.props.navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
          </div>
        )}
      </motion.div>
    );
  }
}

export default withRouter(withStore(observer(CartPage)));
