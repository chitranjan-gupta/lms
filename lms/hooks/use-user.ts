import { useContext } from 'react';
import { UserContext } from '@/context';

export const useUser = () => {
  return useContext(UserContext);
};
