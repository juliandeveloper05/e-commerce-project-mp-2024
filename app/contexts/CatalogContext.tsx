// app/contexts/CatalogContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface CatalogContextType {
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <CatalogContext.Provider value={{ isCatalogOpen, setIsCatalogOpen }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
