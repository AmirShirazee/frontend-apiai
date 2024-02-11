'use client';

import { createContext, useContext } from 'react';

interface SelectedItemsContextProps {
  selectedItems: number[];
  setSelectedItems: (selectedItems: number[]) => void;
}

const SelectedItemsContext = createContext<SelectedItemsContextProps | undefined>(undefined);

export const useSelectedItems = () => {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error('useSelectedItems must be used within a SelectedItemsProvider');
  }
  return context;
};
