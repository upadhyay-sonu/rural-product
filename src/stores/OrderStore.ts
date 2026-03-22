import { makeAutoObservable } from 'mobx';

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderItems: OrderItem[];
  orderTotalValue: number;
  paymentMethod: string;
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  createdAt: number;
}

export class OrderStore {
  placedOrders: Order[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadOrderHistory();
  }

  loadOrderHistory = () => {
    try {
      const savedOrderData = window.localStorage.getItem('local-store-orders');
      if (savedOrderData) {
        this.placedOrders = JSON.parse(savedOrderData);
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  };

  saveOrderHistory = () => {
    window.localStorage.setItem('local-store-orders', JSON.stringify(this.placedOrders));
  };

  processNewOrder = (newOrderData: Omit<Order, 'id' | 'createdAt'>) => {
    const freshOrder: Order = {
      ...newOrderData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: Date.now()
    };
    this.placedOrders.unshift(freshOrder);
    this.saveOrderHistory();
    return freshOrder;
  };

  getOrderById = (orderId: string) => {
    return this.placedOrders.find(o => o.id === orderId);
  };
}
