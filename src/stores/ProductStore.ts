import { makeAutoObservable, runInAction } from 'mobx';
import { fetchCategoryListFromAPI, fetchProductListFromAPI, fetchProductListByCategoryFromAPI } from '../api';

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
  productList: Product[] = [];
  categoryList: string[] = [];
  activeCategory: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  normalizeProducts = (rawProductData: any[]): Product[] => {
    const seenProductIds = new Set<number>();
    return rawProductData.map((productItem, index) => {
      let productId = Number(productItem.id);
      if (isNaN(productId) || productId === undefined || productId === null || productId === 0 || seenProductIds.has(productId)) {
        productId = 100000 + index;
      }
      seenProductIds.add(productId);
      return { ...productItem, id: productId };
    });
  };

  loadInitialData = async () => {
    this.isLoading = true;
    try {
      const [fetchedProductList, fetchedCategoryList] = await Promise.all([
        fetchProductListFromAPI(),
        fetchCategoryListFromAPI()
      ]);
      runInAction(() => {
        this.productList = this.normalizeProducts(fetchedProductList);
        this.categoryList = fetchedCategoryList;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.errorMessage = 'Failed to fetch data';
        this.isLoading = false;
      });
    }
  };

  setCategory = async (categoryName: string | null) => {
    this.isLoading = true;
    this.activeCategory = categoryName;
    try {
      if (categoryName) {
        const fetchedProductData = await fetchProductListByCategoryFromAPI(categoryName);
        runInAction(() => {
          this.productList = this.normalizeProducts(fetchedProductData);
          this.isLoading = false;
        });
      } else {
        const fetchedProductData = await fetchProductListFromAPI();
        runInAction(() => {
          this.productList = this.normalizeProducts(fetchedProductData);
          this.isLoading = false;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.errorMessage = 'Failed to fetch category products';
        this.isLoading = false;
      });
    }
  };

  getProductById = (targetProductId: number): Product | undefined => {
    return this.productList.find(p => p.id === targetProductId);
  }
}
