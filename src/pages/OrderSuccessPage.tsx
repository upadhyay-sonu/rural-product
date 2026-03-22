import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { RouteComponentProps, withRouter } from '../components/withRouter';
import { motion } from 'framer-motion';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class OrderSuccessPage extends React.Component<Props> {
  componentDidMount() {
    // Scroll to top automatically
    window.scrollTo(0, 0);
  }

  render() {
    const { orderStore } = this.props.store!;
    const latestOrder = orderStore.placedOrders[0];

    if (!latestOrder) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>No recent orders found.</h2>
          <button className="btn-primary" onClick={() => this.props.navigate('/')} style={{ marginTop: '2rem', padding: '1rem 2rem' }}>
            Return to Shop
          </button>
        </div>
      );
    }

    const totalCartItems = latestOrder.orderItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 2rem' }}
      >
        <div style={{ background: '#111827', borderRadius: '12px', padding: '3rem', textAlign: 'center', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ color: '#10b981', marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: '800' }}>Order Placed!</h1>
          <p style={{ color: '#9ca3af', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Your authentic rural products are on the way.</p>
          
          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '2rem', textAlign: 'left', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#9ca3af' }}>Order ID:</span>
              <span style={{ fontWeight: 'bold', color: '#f9fafb', letterSpacing: '1px' }}>#{latestOrder.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#9ca3af' }}>Total Items:</span>
              <span style={{ color: '#f9fafb' }}>{totalCartItems}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#9ca3af' }}>Payment:</span>
              <span style={{ color: '#f9fafb', background: '#334155', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>{latestOrder.paymentMethod}</span>
            </div>
            <hr style={{ border: '0', borderTop: '1px dashed #334155', margin: '1.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem' }}>
              <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>Total Paid:</span>
              <span style={{ color: '#f59e0b', fontWeight: '800' }}>{formatCurrency(latestOrder.orderTotalValue)}</span>
            </div>
          </div>

          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '8px' }}
            onClick={() => this.props.navigate(`/order/${latestOrder.id}`)}
          >
            View Order Details
          </button>
        </div>
      </motion.div>
    );
  }
}

export default withRouter(withStore(observer(OrderSuccessPage)));
