import { CartStore } from './CartStore';
import { ProductStore } from './ProductStore';
import { OrderStore } from './OrderStore';

export class RootStore {
  cartStore: CartStore;
  productStore: ProductStore;
  orderStore: OrderStore;

  constructor() {
    this.productStore = new ProductStore();
    this.cartStore = new CartStore(this.productStore);
    this.orderStore = new OrderStore();
  }
}

export const rootStore = new RootStore();
