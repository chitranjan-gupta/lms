'use client';

import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type FC,
} from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context';
import {
  login,
  logout,
  oauth_google_redirect,
  oauth_google_callback,
  setRequestInterceptor,
  setResponseInterceptior,
} from '@/api';
import { getItem, removeItem, setItem } from '@/lib';
import { useUser } from '@/hooks';

import type { TokenType, SignInState } from '@/types';

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN = 'token';

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { getUser, user, removeUser, saveUser } = useUser();
  const [token, setToken] = useState<TokenType | null>(null);
  const [status, setStatus] = useState<string>('idle');
  const [isloading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const oauth = useCallback(
    async (provider: string, register: boolean = true) => {
      try {
        console.log(provider);
        setIsloading(true);
        const res = await oauth_google_redirect(register);
        if (res.status === 200) {
          if (res.data && res.data.url) {
            window.location.assign(res.data.url);
          }
        }
      } catch (e: any) {
        console.log(e?.response || 'Error in OAuth');
        setError(e?.response?.data?.message || 'Error in OAuth');
      } finally {
        setIsloading(false);
      }
    },
    []
  );
  const refresh = useCallback(
    async (newToken: TokenType | null, logout: boolean) => {
      try {
        setIsloading(true);
        if (!logout && newToken) {
          setStatus('signIn');
          setToken(newToken);
          setRequestInterceptor({ token: newToken! });
          setResponseInterceptior({ token: newToken!, refresh: refresh });
          await setItem<TokenType>(TOKEN, newToken!);
        } else {
          setStatus('signOut');
          setToken(null);
          await removeItem(TOKEN);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsloading(false);
      }
    },
    []
  );
  const oauth_success = useCallback(
    async (url: string) => {
      let auth = false;
      try {
        setIsloading(false);
        const response = await oauth_google_callback(url);
        if (response.status === 200) {
          const token = {
            access_token: response.data.access_token,
            refresh_token: response.data.access_token,
          };
          setToken(token);
          setRequestInterceptor({ token });
          setResponseInterceptior({ token: token, refresh: refresh });
          await saveUser(response.data);
          await setItem<TokenType>(TOKEN, token);
          auth = true;
          setStatus('signIn');
        }
      } catch (e: any) {
        console.log(e?.response || 'Error in OAuth');
        setError(e?.response?.data?.message || 'Error in OAuth');
        setIsloading(false);
      }
      return auth;
    },
    [refresh, saveUser, setToken, setStatus]
  );
  const signIn = useCallback(
    async (data: SignInState) => {
      try {
        setError(null);
        setIsloading(true);
        const response = await login(data);
        if (response.status === 200) {
          const token = {
            access_token: response.data.access_token,
            refresh_token: response.data.access_token,
          };
          setToken(token);
          setRequestInterceptor({ token });
          setResponseInterceptior({ token: token, refresh: refresh });
          await saveUser(response.data);
          await setItem<TokenType>(TOKEN, token);
          setStatus('signIn');
        }
      } catch (e: any) {
        console.log(e?.response || 'Error in signIn');
        setError(e?.response?.data?.message || 'Error in signIn');
      } finally {
        setIsloading(false);
      }
    },
    [refresh, saveUser]
  );
  const signOut = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await logout();
      if (response.status === 200) {
        await removeItem(TOKEN);
        setToken(null);
        const tempToken = { access_token: '', refresh_token: '' };
        setRequestInterceptor({ token: tempToken });
        setResponseInterceptior({ token: tempToken, refresh: refresh });
        setStatus('signOut');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsloading(false);
    }
  }, [refresh]);

  const hydrate = useCallback(async () => {
    try {
      setIsloading(true);
      const token = await getItem<TokenType>(TOKEN);
      if (token !== null) {
        setRequestInterceptor({ token });
        setResponseInterceptior({ token: token, refresh: refresh });
        setToken(token);
        setStatus('signIn');
      } else {
        setStatus('signOut');
        setToken(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsloading(false);
    }
  }, [refresh]);

  const handleLogout = useCallback(async () => {
    if (status === 'signIn') {
      await signOut();
      await removeUser();
    } else {
      router.push('/login');
    }
  }, [status, signOut, removeUser, router]);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!user && token) {
      void getUser();
    }
  }, [user, getUser, token]);
  return (
    <AuthContext.Provider
      value={{
        token,
        status,
        isloading,
        error,
        signIn,
        signOut,
        refresh,
        oauth,
        oauth_success,
        hydrate,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
