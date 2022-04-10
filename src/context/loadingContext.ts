import { createContext } from 'react';

export interface LoadingContextType {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType);