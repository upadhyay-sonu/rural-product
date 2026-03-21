import React from 'react';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { withRouter, RouteComponentProps } from './withRouter';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class Navbar extends React.Component<Props> {
  handleHomeClick = () => {
    this.props.navigate('/');
  };

  handleCartClick = () => {
    this.props.navigate('/cart');
  };

  render() {
    const { cartStore } = this.props.store!;
    
    return (
      <header className="navbar">
        <div className="navbar-left"></div>
        <div className="navbar-center" onClick={this.handleHomeClick}>
          <div className="navbar-logo">Real Rural Products</div>
          <div className="navbar-tagline">Pure. Authentic. From Rural India 🇮🇳</div>
        </div>
        <div className="navbar-right">
          <div className="navbar-cart" onClick={this.handleCartClick}>
            <svg
              className="cart-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartStore.totalItems > 0 && <span className="cart-badge">{cartStore.totalItems}</span>}
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(withStore(observer(Navbar)));
