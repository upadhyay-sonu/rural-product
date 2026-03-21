import { makeAutoObservable } from 'mobx';
import { ProductStore } from './ProductStore';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export class CartStore {
  items: CartItem[] = [];
  productStore: ProductStore;

  constructor(productStore: ProductStore) {
    makeAutoObservable(this, { productStore: false });
    this.productStore = productStore;
    this.loadCart();
  }

  loadCart = () => {
    try {
      const savedCart = window.localStorage.getItem('local-store-cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Failed to load cart from local storage', e);
    }
  };

  saveCart = () => {
    window.localStorage.setItem('local-store-cart', JSON.stringify(this.items));
  };

  addToCart = (productId: number) => {
    const existingItem = this.items.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const product = this.productStore.getProductById(productId);
      if (product) {
        this.items.push({ 
          id: product.id, 
          title: product.title, 
          price: product.price, 
          image: product.image, 
          quantity: 1 
        });
      }
    }
    this.saveCart();
  };

  increaseQuantity = (productId: number) => {
    const existingItem = this.items.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
      this.saveCart();
    }
  };

  decreaseQuantity = (productId: number) => {
    const existingItem = this.items.find(item => item.id === productId);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.items = this.items.filter(item => item.id !== productId);
      }
      this.saveCart();
    }
  };

  removeFromCart = (productId: number) => {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
  };

  clearCart = () => {
    this.items = [];
    this.saveCart();
  };

  getItemQuantity = (productId: number): number => {
    const existingItem = this.items.find(item => item.id === productId);
    return existingItem ? existingItem.quantity : 0;
  };
  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
