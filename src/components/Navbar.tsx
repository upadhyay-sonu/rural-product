import React from 'react';
import { observer } from 'mobx-react';
import { withStore } from '../stores/StoreContext';
import { RootStore } from '../stores/RootStore';
import { withRouter, RouteComponentProps } from './withRouter';

interface Props extends RouteComponentProps {
  store?: RootStore;
}

class Navbar extends React.Component<Props> {
  handleHomeClick = () => {
    this.props.navigate('/');
  };

  handleCartClick = () => {
    this.props.navigate('/cart');
  };

  render() {
    const { cartStore } = this.props.store!;
    
    return (
      <header className="bg-gradient-to-r from-[#0f172a] to-[#020617] backdrop-blur-lg border-b border-white/10 py-6 px-10 flex justify-between items-center shadow-lg sticky top-0 z-[100]">
        <div className="flex-1"></div>
        
        <div className="flex-2 flex flex-col items-center justify-center cursor-pointer group" onClick={this.handleHomeClick}>
          <div className="flex items-center gap-4">
            <svg className="w-9 h-9 text-orange-400 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h1 className="text-3xl font-bold tracking-widest bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-sm group-hover:from-orange-300 group-hover:to-yellow-200 transition-all duration-300">
              REAL RURAL
            </h1>
          </div>
          <p className="text-sm text-gray-400 mt-2 tracking-widest font-medium uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Pure. Authentic. From Rural India 🇮🇳
          </p>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="relative cursor-pointer flex items-center text-gray-300 hover:text-orange-400 transition-colors duration-300" onClick={this.handleCartClick}>
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartStore.totalItems > 0 && <span className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-orange-400 text-black text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-lg border border-black/20">{cartStore.totalItems}</span>}
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(withStore(observer(Navbar)));
