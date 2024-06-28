import { createContext, useState } from 'react';
import { ContextProviderProps } from '../types/context-types';
import PageContentFile from '../data/page-content.json';

export const PageTempContext = createContext({
  pageContent: PageContentFile,
  headerNav: [],
});


export const PageTempProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [headerNav, setHeaderNav] = useState([]);

  const value = {
    pageContent: PageContentFile,
    headerNav,
    setHeaderNav,
  };
  
  return (
    <PageTempContext.Provider value={value}>
      {children}
    </PageTempContext.Provider>
  )
}