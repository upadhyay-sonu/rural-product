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
  items: OrderItem[];
  total: number;
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
  orders: Order[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadOrders();
  }

  loadOrders = () => {
    try {
      const savedOrders = window.localStorage.getItem('local-store-orders');
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  };

  saveOrders = () => {
    window.localStorage.setItem('local-store-orders', JSON.stringify(this.orders));
  };

  addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: Date.now()
    };
    this.orders.unshift(newOrder);
    this.saveOrders();
    return newOrder;
  };

  getOrderById = (id: string) => {
    return this.orders.find(o => o.id === id);
  };
}
