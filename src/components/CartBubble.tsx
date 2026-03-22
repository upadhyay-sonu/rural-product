import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { RouteComponentProps, withRouter } from './withRouter';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class CartBubble extends React.Component<Props> {
  handleClick = () => {
    this.props.navigate('/cart');
  };

  render() {
    const { cartStore } = this.props.store!;
    
    // Hide bubble if cart is empty
    if (cartStore.totalCartItems === 0) return null;

    return (
      <div className="cart-bubble" onClick={this.handleClick} style={{ bottom: '30px', right: '30px' }}>
        <p className="bubble-label">Cart</p>
        <h2 className="bubble-price">{formatCurrency(cartStore.totalCartValue)}</h2>
        <span className="bubble-items">{cartStore.totalCartItems} items</span>
      </div>
    );
  }
}

export default withRouter(withStore(observer(CartBubble)));
