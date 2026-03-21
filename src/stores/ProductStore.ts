import { makeAutoObservable, runInAction } from 'mobx';
import { fetchCategories, fetchProducts, fetchProductsByCategory } from '../api';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export class ProductStore {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  normalizeProducts = (data: any[]): Product[] => {
    const seen = new Set<number>();
    return data.map((item, index) => {
      let id = Number(item.id);
      if (isNaN(id) || id === undefined || id === null || id === 0 || seen.has(id)) {
        id = 100000 + index;
      }
      seen.add(id);
      return { ...item, id };
    });
  };

  loadInitialData = async () => {
    this.loading = true;
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      runInAction(() => {
        this.products = this.normalizeProducts(productsData);
        this.categories = categoriesData;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Failed to fetch data';
        this.loading = false;
      });
    }
  };

  setCategory = async (category: string | null) => {
    // The requirement explicitly states: 
    // "once filters are applied, data should be refetched using apis for the selected filters. Don’t filter locally, always call the APIs."
    this.loading = true;
    this.selectedCategory = category;
    try {
      if (category) {
        const productsData = await fetchProductsByCategory(category);
        runInAction(() => {
          this.products = this.normalizeProducts(productsData);
          this.loading = false;
        });
      } else {
        const productsData = await fetchProducts();
        runInAction(() => {
          this.products = this.normalizeProducts(productsData);
          this.loading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = 'Failed to fetch category products';
        this.loading = false;
      });
    }
  };

  getProductById = (id: number): Product | undefined => {
    // The requirement explicitly states: 
    // "Don’tFetch product data dynamically based on the id."
    // Thus we retrieve it directly from the local state array.
    return this.products.find(p => p.id === id);
  }
}
