import React from 'react';
import { RootStore, rootStore } from './RootStore';

export const StoreContext = React.createContext<RootStore | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
};

// HOC for Class Components to consume Context easily
export function withStore<T extends { store?: RootStore }>(
  Component: React.ComponentType<T>
) {
  return function Wrapper(props: Omit<T, 'store'> & { children?: React.ReactNode }) {
    return (
      <StoreContext.Consumer>
        {store => {
          if (!store) {
            throw new Error('Must be used within a StoreProvider');
          }
          return <Component {...(props as T)} store={store} />;
        }}
      </StoreContext.Consumer>
    );
  };
}
