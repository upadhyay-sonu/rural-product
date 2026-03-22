import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from '../api';
import { Product } from '../stores/ProductStore';
import ProductCard from '../components/advanced/ProductCard';
import FilterSidebar from '../components/advanced/FilterSidebar';
import SortDropdown from '../components/advanced/SortDropdown';

const AdvancedProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Read URL State
  const selectedCategories = searchParams.getAll('category');
  const sortParam = searchParams.get('sort') || 'rating_desc';

  // Sync Checkbox
  const handleCategoryChange = (categories: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    categories.forEach(c => newParams.append('category', c));
    setSearchParams(newParams);
  };

  // Sync Dropdown
  const handleSortChange = (sortVal: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sortVal);
    setSearchParams(newParams);
  };

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts: any[] = [];
        
        if (selectedCategories.length === 0) {
          fetchedProducts = await fetchProducts();
        } else {
          // Map abstract filter categories to exact FakeStore API categories
          const apiCategories = new Set<string>();
          selectedCategories.forEach(cat => {
            if (cat === 'electronics') apiCategories.add('electronics');
            if (cat === "men's clothing") apiCategories.add("men's clothing");
            if (cat === "women's clothing") apiCategories.add("women's clothing");
          });

          const promises = Array.from(apiCategories).map(cat => fetchProductsByCategory(cat));
          const results = await Promise.all(promises);
          // Merge results
          fetchedProducts = results.flat();
        }

        // Deduplicate and normalize just to be safe
        const seen = new Set();
        const normalized = fetchedProducts.filter(p => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        }).map((item, index) => {
          let id = Number(item.id);
          if (isNaN(id) || id === undefined || id === 0) id = +new Date() + index;
          return { ...item, id };
        });

        if (isMounted) setProducts(normalized);
      } catch (error) {
        console.error('Failed to load advanced products', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();

    return () => { isMounted = false; };
  }, [selectedCategories.join(','), sortParam]);

  // Sorting logic (applied locally after fetch, as FakeStore API doesn't support complex sorting)
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch(sortParam) {
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'rating_desc':
      default:
        return sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }
  }, [products, sortParam]);

  const [isStickyBanner, setIsStickyBanner] = useState(false);
  const [bannerLeft, setBannerLeft] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;
      const rect = sidebarRef.current.getBoundingClientRect();
      
      if (window.scrollY > 200) {
        setIsStickyBanner(true);
        setBannerLeft(rect.left);
      } else {
        setIsStickyBanner(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
            Advanced Products
            </h1>
            <p className="text-gray-500">
            Discover our modern collection
            </p>
          </div>
          <div>
            <SortDropdown value={sortParam} onChange={handleSortChange} />
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* LEFT SIDEBAR */}
          <div className="w-1/4 relative min-h-[1500px]" ref={sidebarRef}>
            <FilterSidebar selectedCategories={selectedCategories} onChange={handleCategoryChange} />
            
            {/* NavratriBanner */}
            <div 
              style={isStickyBanner ? {
                position: "fixed",
                top: "50%",
                transform: "translateY(-50%)",
                left: bannerLeft,
                width: "260px",
                zIndex: 50
              } : {}}
              className={`text-white transition-all duration-300 hover:scale-[1.02] ${isStickyBanner ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 p-5 rounded-xl shadow-2xl animate-[float_3s_ease-in-out_infinite]' : 'mt-6 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 p-5 rounded-xl shadow-xl'}`}
            >
              <div className="font-extrabold text-2xl tracking-wide mb-2 flex items-center gap-2 drop-shadow-sm">
                <span>🎉</span> Navratri Sale
              </div>
              <div className="text-xl font-black drop-shadow-md mb-6 bg-white/20 inline-block px-3 py-1 rounded-lg border border-white/30">
                Flat 40% OFF
              </div>
              <button 
                onClick={() => {
                  const section = document.getElementById("products-section");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }} 
                className="w-full py-3 bg-white text-orange-600 font-extrabold rounded-xl shadow-lg hover:bg-orange-50 hover:scale-105 transition-all duration-300 uppercase tracking-widest text-sm flex justify-center items-center gap-2"
              >
                Shop Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-3/4 flex flex-col" id="products-section">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-24 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4" />
                <p className="text-gray-500 font-medium animate-pulse">Loading products...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-24 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px] text-center transition-all duration-500">
                <div className="w-24 h-24 mb-6 text-gray-300">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md">
                  We couldn't find any products matching your selected filters. Try adjusting your categories to see more options.
                </p>
                <button 
                  onClick={() => handleCategoryChange([])}
                  className="mt-6 px-6 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-4 gap-6 opacity-0 animate-fadeIn">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedProductsPage;
