'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import { makeStore, AppStore } from '../lib/store';
import { fetchUserDetails, refreshAccessToken, setAuthenticationState } from '../lib/features/userSlice';
import '../app/globals.css';
import Layout from '../app/Layout';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const storeRef = useRef<AppStore | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // Other initial store setup...
  }

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        await storeRef.current?.dispatch(setAuthenticationState(true));
        await storeRef.current?.dispatch(fetchUserDetails());
      } else {
        await storeRef.current?.dispatch(setAuthenticationState(false));
      }
      setIsLoading(false);
    };

    checkAuth();

    const interval = setInterval(() => {
      storeRef.current?.dispatch(refreshAccessToken());
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <Provider store={storeRef.current}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;