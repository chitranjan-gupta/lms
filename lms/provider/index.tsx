'use client';

import type { ReactNode, FC } from 'react';
import { UserProvider } from './UserProvider';
import { AuthProvider } from './AuthProvider';

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return (
    <UserProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </UserProvider>
  );
};

export default ContextProvider;
