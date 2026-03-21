import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { RouteComponentProps, withRouter } from '../components/withRouter';
import { motion } from 'framer-motion';

interface Props extends RouteComponentProps<{ id: string }> {
  store?: RootStore;
}

class OrderDetailsPage extends React.Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleBack = () => {
    this.props.navigate('/');
  };

  render() {
    const { orderStore } = this.props.store!;
    const orderId = this.props.params.id;
    const order = orderStore.getOrderById(orderId);

    if (!order) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Order Context Not Found</h2>
          <button className="btn-primary" onClick={this.handleBack} style={{ marginTop: '2rem', padding: '1rem 2rem' }}>
            Return Home
          </button>
        </div>
      );
    }

    const date = new Date(order.createdAt).toLocaleString();

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 4rem 6rem' }}
      >
        <button onClick={this.handleBack} style={{ background: 'transparent', color: '#9ca3af', border: '1px solid #334155', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem', fontWeight: 'bold' }}>
          ← Continue Shopping
        </button>

        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '800' }}>Order Details</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Main Top Header Details */}
          <div style={{ background: '#111827', borderRadius: '12px', padding: '2rem', border: '1px solid #334155', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '1px' }}>Order Placed</div>
              <div style={{ color: '#f9fafb', fontSize: '1.1rem' }}>{date}</div>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '1px' }}>Total</div>
              <div style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: '800' }}>{formatCurrency(order.total)}</div>
            </div>
             <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '1px' }}>Order ID #</div>
              <div style={{ color: '#f9fafb', fontSize: '1.1rem' }}>{order.id}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
            {/* Left Column: Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: '#111827', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ borderBottom: '1px solid #334155', margin: 0, padding: '1.5rem 2rem', fontSize: '1.3rem' }}>Products Delivered</h3>
                <div style={{ padding: '0 2rem' }}>
                  {order.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem 0', borderBottom: '1px solid #1e293b' }}>
                      <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#fff', borderRadius: '8px', padding: '0.5rem' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem' }}>{item.title}</h4>
                        <div style={{ color: '#9ca3af', fontSize: '1rem' }}>Quantity: <span style={{ color: '#f9fafb', fontWeight: 'bold' }}>{item.quantity}</span></div>
                      </div>
                      <div style={{ fontWeight: '800', fontSize: '1.25rem', color: '#f59e0b' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Address & Payment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: '#111827', borderRadius: '12px', padding: '2rem', border: '1px solid #334155' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Shipping Address</h3>
                <div style={{ color: '#f9fafb', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{order.address.name}</div>
                <div style={{ color: '#9ca3af', lineHeight: '1.6' }}>{order.address.address}</div>
                <div style={{ color: '#9ca3af', lineHeight: '1.6' }}>{order.address.city}, {order.address.pincode}</div>
                <div style={{ color: '#9ca3af', marginTop: '1rem' }}>Phone: <span style={{ color: '#f9fafb'}}>{order.address.phone}</span></div>
              </div>

               <div style={{ background: '#111827', borderRadius: '12px', padding: '2rem', border: '1px solid #334155' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Payment Method</h3>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: '#f9fafb', background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1.1rem', fontWeight: 'bold', border: '1px solid #334155' }}>{order.paymentMethod}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default withRouter(withStore(observer(OrderDetailsPage)));
