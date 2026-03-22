import React from 'react';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { RouteComponentProps, withRouter } from '../components/withRouter';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class Home extends React.Component<Props> {
  componentDidMount() {
    const { productStore } = this.props.store!;
    if (productStore.productList.length === 0) {
      productStore.loadInitialData();
    }
  }

  handleCategoryClick = (category: string | null) => {
    const { productStore } = this.props.store!;
    if (productStore.activeCategory === category) {
      productStore.setCategory(null);
    } else {
      productStore.setCategory(category);
    }
  }

  handleProductClick = (id: number) => {
    this.props.navigate(`/product/${id}/details`);
  }

  scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  handleAddToCart = (product: any) => {
    const { cartStore } = this.props.store!;
    cartStore.addProductToCart(product);
  };

  render() {
    const { productStore } = this.props.store!;
    
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={{
          initial: { opacity: 0, y: 20 },
          in: { opacity: 1, y: 0 },
          out: { opacity: 0, y: -20 }
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Navratri Mega Sale 🔥</h1>
            <p>Up to 50% OFF</p>
            <button className="cta-btn" onClick={this.scrollToProducts}>Shop Now</button>
          </div>
        </div>

        <div id="products-section" className="filters-container">
          <button 
            className={`filter-btn ${productStore.activeCategory === null ? 'active' : ''}`}
            onClick={() => this.handleCategoryClick(null)}
          >
            All Filters
          </button>
          {productStore.categoryList.map((cat: string) => (
            <button 
              key={cat}
              className={`filter-btn ${productStore.activeCategory === cat ? 'active' : ''}`}
              onClick={() => this.handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {productStore.isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products-grid">
            {productStore.productList.map((product: any) => (
              <ProductCard key={product.id} product={product} handleAddToCart={this.handleAddToCart} />
            ))}
          </div>
        )}
      </motion.div>
    );
  }
}

export default withRouter(withStore(observer(Home)));
