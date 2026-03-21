import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { RouteComponentProps, withRouter } from '../components/withRouter';
import { motion } from 'framer-motion';
import styles from './Checkout.module.css';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class CheckoutPage extends React.Component<Props> {
  state = {
    loading: false,
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'COD',
    errors: {} as { [key: string]: string }
  };

  handleBack = () => {
    this.props.navigate('/cart');
  };

  validateForm = () => {
    const { name, phone, address, city, pincode } = this.state;
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'Full Name is required';
    if (!phone.trim()) errors.phone = 'Phone Number is required';
    if (!address.trim()) errors.address = 'Address is required';
    if (!city.trim()) errors.city = 'City is required';
    if (!pincode.trim()) errors.pincode = 'Pincode is required';
    
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ paymentMethod: e.target.value });
  };

  handlePlaceOrder = () => {
    if (!this.validateForm()) return;

    const { cartStore, orderStore } = this.props.store!;
    const { name, phone, address, city, pincode, paymentMethod } = this.state;
    const subtotal = cartStore.totalPrice;
    const discount = subtotal > 500 ? 100 : 0;
    const total = subtotal - discount;

    const finalizeOrder = () => {
      // 1. Log order to Store
      orderStore.addOrder({
        items: [...cartStore.items],
        total: Math.max(0, total),
        paymentMethod,
        address: { name, phone, address, city, pincode }
      });
      // 2. Clear Cart completely
      cartStore.clearCart();
      // 3. Reroute to success payload
      this.props.navigate('/order-success');
    };

    if (paymentMethod === 'COD') {
      finalizeOrder();
    } else {
      this.setState({ loading: true });
      // Simulate real bank processing
      setTimeout(() => {
        this.setState({ loading: false });
        finalizeOrder();
      }, 2000);
    }
  };

  render() {
    const { cartStore } = this.props.store!;
    const { name, phone, address, city, pincode, paymentMethod, errors, loading } = this.state;
    const subtotal = cartStore.totalPrice;
    const discount = subtotal > 500 ? 100 : 0;
    const total = subtotal - discount;

    const isCOD = paymentMethod === 'COD';

    if (cartStore.totalItems === 0) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>No items to checkout</h2>
          <button className="btn-primary" onClick={() => this.props.navigate('/')} style={{ marginTop: '2rem', width: 'auto', padding: '1rem 2rem' }}>
            Return to Shop
          </button>
        </div>
      );
    }

    return (
      <motion.div 
        className={styles.container}
        initial="initial"
        animate="in"
        exit="out"
        variants={{ initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }}
      >
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={this.handleBack}>← Back to Cart</button>
          <h1>Secure Checkout</h1>
        </div>

        <div className={styles.layout}>
          <div className={styles.formColumn}>
            
            <div className={styles.sectionCard}>
              <h3>1. Delivery Address</h3>
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                  <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Full Name" className={styles.input} />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <input type="text" name="phone" value={phone} onChange={this.handleChange} placeholder="Phone Number" className={styles.input} />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <input type="text" name="address" value={address} onChange={this.handleChange} placeholder="Address" className={styles.input} />
                  {errors.address && <span className={styles.error}>{errors.address}</span>}
                </div>
                
                <div className={styles.formRow}>
                  <div className={`${styles.inputGroup} ${styles.half}`}>
                    <input type="text" name="city" value={city} onChange={this.handleChange} placeholder="City" className={styles.input} />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                  </div>
                  <div className={`${styles.inputGroup} ${styles.half}`}>
                    <input type="text" name="pincode" value={pincode} onChange={this.handleChange} placeholder="Pincode" className={styles.input} />
                    {errors.pincode && <span className={styles.error}>{errors.pincode}</span>}
                  </div>
                </div>
              </form>
            </div>

            <div className={styles.sectionCard}>
              <h3>2. Payment Method</h3>
              <div className={styles.paymentOptions}>
                <label className={styles.paymentOption}>
                  <input type="radio" value="COD" checked={isCOD} onChange={this.handlePaymentChange} />
                  <span>Cash on Delivery</span>
                </label>
                <label className={styles.paymentOption}>
                  <input type="radio" value="CARD" checked={paymentMethod === 'CARD'} onChange={this.handlePaymentChange} />
                  <span>Credit / Debit Card</span>
                </label>
                <label className={styles.paymentOption}>
                  <input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={this.handlePaymentChange} />
                  <span>UPI</span>
                </label>
              </div>
            </div>

          </div>

          <div className={styles.summaryColumn}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Order Summary</h3>
              <div className={styles.itemsPreview}>
                {cartStore.items.map(item => (
                  <div key={item.id} className={styles.previewRow}>
                    <span>{item.quantity}x {item.title.substring(0, 20)}{item.title.length > 20 ? '...' : ''}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <hr className={styles.divider} />
              <div className={styles.panelRow}>
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className={styles.panelRow}>
                <span>Discount:</span>
                <span className={styles.textAccent}>-{formatCurrency(discount)}</span>
              </div>
              <div className={styles.panelRow}>
                <span>Delivery:</span>
                <span className={styles.textAccent}>Free</span>
              </div>
              <div className={`${styles.panelRow} ${styles.panelTotal}`}>
                <span>Total:</span>
                <span className={styles.totalAccent}>{formatCurrency(Math.max(0, total))}</span>
              </div>
              
              <button 
                className={styles.actionBtn}
                onClick={this.handlePlaceOrder}
                disabled={loading}
              >
                {loading ? 'Processing Payment...' : isCOD ? 'Place Order' : 'Pay Now'}
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    );
  }
}

export default withRouter(withStore(observer(CheckoutPage)));
