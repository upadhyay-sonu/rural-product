import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { withRouter, RouteComponentProps } from './withRouter';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
}

interface Props extends RouteComponentProps {
  store?: RootStore;
  product: Product;
}

class ProductCard extends React.Component<Props> {
  handleProductClick = () => {
    this.props.navigate(`/product/${this.props.product.id}/details`);
  }

  handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.store!.cartStore.addToCart(this.props.product.id);
  }

  handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { cartStore } = this.props.store!;
    if (cartStore.getItemQuantity(this.props.product.id) === 0) {
      cartStore.addToCart(this.props.product.id);
    }
    this.props.navigate('/cart');
  }

  handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.store!.cartStore.increaseQuantity(this.props.product.id);
  }

  handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.store!.cartStore.decreaseQuantity(this.props.product.id);
  }

  render() {
    const { product, store } = this.props;
    const cartStore = store!.cartStore;
    const qty = cartStore.getItemQuantity(product.id);

    return (
      <div className="product-card" onClick={this.handleProductClick}>
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price">{formatCurrency(product.price)}</div>
          
          <div className="grid-actions-container">
            {qty > 0 ? (
              <div className="grid-cart-controls" onClick={(e) => e.stopPropagation()}>
                <button className="grid-qty-btn" onClick={this.handleDecrease}>-</button>
                <span className="grid-qty-val">{qty}</span>
                <button className="grid-qty-btn" onClick={this.handleIncrease}>+</button>
              </div>
            ) : (
              <button className="btn-secondary" onClick={this.handleAddToCart}>
                Add to Cart
              </button>
            )}
            <button className="btn-primary" onClick={this.handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStore(observer(ProductCard)));
