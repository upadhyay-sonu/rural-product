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
  cartItems: CartItem[] = [];
  productStore: ProductStore;

  constructor(productStore: ProductStore) {
    makeAutoObservable(this, { productStore: false });
    this.productStore = productStore;
    this.loadCartFromLocalStorage();
  }

  loadCartData = () => {
    try {
      const savedCartData = window.localStorage.getItem('local-store-cart');
      if (savedCartData) {
        this.cartItems = JSON.parse(savedCartData);
      }
    } catch (error) {
      console.error('Failed to load cart from local storage', error);
    }
  };

  saveCartData = () => {
    window.localStorage.setItem('local-store-cart', JSON.stringify(this.cartItems));
  };

  loadCartFromLocalStorage = () => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      this.cartItems = JSON.parse(data);
    } else {
      this.loadCartData(); // Fallback to old storage if new one is empty
    }
  };

  saveCartToLocalStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    this.saveCartData(); // Keep old one in sync just in case
  };

  addProductToCart = (product: any) => {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1
      });
    }
    this.saveCartToLocalStorage();
  };

  addCartItem = (targetProductId: number) => {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.id === targetProductId);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      const productItem = this.productStore.getProductById(targetProductId);
      if (productItem) {
        this.cartItems.push({ 
          id: productItem.id, 
          title: productItem.title, 
          price: productItem.price, 
          image: productItem.image, 
          quantity: 1 
        });
      }
    }
    this.saveCartToLocalStorage();
  };

  increaseCartItemQuantity = (targetProductId: number) => {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.id === targetProductId);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
      this.saveCartToLocalStorage();
    }
  };

  decreaseCartItemQuantity = (targetProductId: number) => {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.id === targetProductId);
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
      } else {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== targetProductId);
      }
      this.saveCartToLocalStorage();
    }
  };

  removeCartItem = (targetProductId: number) => {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== targetProductId);
    this.saveCartToLocalStorage();
  };

  clearAllCartItems = () => {
    this.cartItems = [];
    this.saveCartToLocalStorage();
  };

  getCartItemQuantity = (targetProductId: number): number => {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.id === targetProductId);
    return existingCartItem ? existingCartItem.quantity : 0;
  };
  
  get totalCartItems() {
    return this.cartItems.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0);
  }

  get totalCartValue() {
    return this.cartItems.reduce((totalPriceAccumulator, cartItem) => totalPriceAccumulator + cartItem.price * cartItem.quantity, 0);
  }
}
