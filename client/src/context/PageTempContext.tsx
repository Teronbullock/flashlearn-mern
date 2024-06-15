import { createContext } from 'react';
import { ContextProviderProps } from './context-types';
import PageContentFile from '../data/page-content.json';

export const PageTempContext = createContext({
  pageContent: PageContentFile,
});


export const PageTempProvider: React.FC<ContextProviderProps> = ({ children }) => {

  const value = {
    pageContent: PageContentFile,
  };
  
  return (
    <PageTempContext.Provider value={value}>
      {children}
    </PageTempContext.Provider>
  )
}