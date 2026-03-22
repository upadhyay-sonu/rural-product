import React, { useContext } from 'react';
import { Product } from '../../stores/ProductStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { StoreContext } from '../../stores/StoreContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = observer(({ product }) => {
  const navigate = useNavigate();
  const store = useContext(StoreContext);
  const qty = store?.cartStore.getCartItemQuantity(product.id) || 0;

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-gray-900 text-white rounded-xl p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-orange-400/30 cursor-pointer flex flex-col group"
    >
      <div className="relative h-64 w-full bg-gray-800 flex items-center justify-center overflow-hidden rounded-xl mb-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex flex-col flex-grow bg-transparent z-10 relative">
        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h3 className="text-gray-50 font-semibold text-lg line-clamp-2 leading-tight mb-4 group-hover:text-amber-500 transition-colors duration-300">
          {product.title}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-500">
              ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-amber-500 text-sm font-semibold">★ {product.rating?.rate || '4.5'}</span>
              <span className="text-gray-400 text-xs">({product.rating?.count || 0})</span>
            </div>
          </div>

            <div className="flex items-center justify-between mt-4 gap-2 z-10 relative">
            {qty > 0 ? (
              <div 
                className="flex flex-1 items-center justify-between bg-gray-800 rounded-full px-3 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white transition-all duration-200 hover:bg-orange-500 hover:scale-110 active:scale-95 font-bold"
                  onClick={() => store?.cartStore.decreaseCartItemQuantity(product.id)}
                >
                  -
                </button>
                <span className="mx-2 text-white font-bold">{qty}</span>
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white transition-all duration-200 hover:bg-orange-500 hover:scale-110 active:scale-95 font-bold"
                  onClick={() => store?.cartStore.increaseCartItemQuantity(product.id)}
                >
                  +
                </button>
              </div>
            ) : (
              <button 
                className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200 hover:bg-orange-600 hover:scale-105 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  store?.cartStore.addProductToCart(product);
                }}
              >
                Add to Cart
              </button>
            )}
            
            <button 
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200 hover:bg-green-600 hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                if (qty === 0) store?.cartStore.addProductToCart(product);
                navigate('/cart');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
