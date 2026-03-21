import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { RouteComponentProps, withRouter } from '../components/withRouter';
import { motion } from 'framer-motion';

interface RouteParams {
  id: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  store?: RootStore;
}

class ProductDetail extends React.Component<Props> {
  componentDidMount() {
    // Note: To fulfill "Don’tFetch product data dynamically based on the id."
    // and correctly handle hard refreshing on detail page without loading,
    // we make sure products are loaded. If not loaded, we load initial data.
    // However, we don't fetch by ID. We fetch the entire list.
    const { productStore } = this.props.store!;
    if (productStore.products.length === 0) {
      productStore.loadInitialData();
    }
  }

  handleBack = () => {
    this.props.navigate(-1);
  }

  handleAddToCart = () => {
    const { id } = this.props.params;
    const { productStore, cartStore } = this.props.store!;
    const product = productStore.getProductById(Number(id));
    if (product) {
      cartStore.addToCart(product.id);
    }
  }

  handleIncrease = () => {
    const { id } = this.props.params;
    this.props.store!.cartStore.increaseQuantity(Number(id));
  };

  handleDecrease = () => {
    const { id } = this.props.params;
    this.props.store!.cartStore.decreaseQuantity(Number(id));
  };

  handleBuyNow = () => {
    const { id } = this.props.params;
    const { productStore, cartStore } = this.props.store!;
    const product = productStore.getProductById(Number(id));
    
    if (product) {
      if (cartStore.getItemQuantity(product.id) === 0) {
        cartStore.addToCart(product.id);
      }
      this.props.navigate('/cart');
    }
  };

  render() {
    const { id } = this.props.params;
    const { productStore, cartStore } = this.props.store!;
    
    if (productStore.loading) {
      return (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      );
    }

    const product = productStore.getProductById(Number(id));

    if (!product) {
      return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Product not found</h2>
          <button className="back-btn" onClick={this.handleBack}>Back to Home</button>
        </div>
      );
    }

    return (
      <motion.div 
        className="detail-container"
        initial="initial"
        animate="in"
        exit="out"
        variants={{
          initial: { opacity: 0, x: 20 },
          in: { opacity: 1, x: 0 },
          out: { opacity: 0, x: -20 }
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="detail-image-box">
          <img src={product.image} alt="" className="detail-image" />
        </div>
        <div className="detail-info">
          <button className="back-btn" onClick={this.handleBack}>← Back to Home</button>
          <h1 className="detail-title">{product.title}</h1>
          <div className="detail-desc">{product.description}</div>
          <div className="detail-price">{formatCurrency(product.price)}</div>
          
          <div className="detail-actions-container">
            {cartStore.getItemQuantity(product.id) > 0 ? (
              <div className="grid-cart-controls" style={{ maxWidth: '200px', margin: 0 }}>
                <button className="grid-qty-btn" onClick={this.handleDecrease}>-</button>
                <span className="grid-qty-val">{cartStore.getItemQuantity(product.id)}</span>
                <button className="grid-qty-btn" onClick={this.handleIncrease}>+</button>
              </div>
            ) : (
              <button className="btn-secondary" style={{ maxWidth: '200px' }} onClick={this.handleAddToCart}>
                 Add to Cart
              </button>
            )}
            <button className="btn-primary" style={{ flexGrow: 1 }} onClick={this.handleBuyNow}>
               Buy Now
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default withRouter(withStore(observer(ProductDetail)));
