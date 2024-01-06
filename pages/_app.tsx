'use client'
import React, { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';
import Cookies from 'js-cookie';
import { fetchUserDetails, refreshAccessToken } from '../lib/features/userSlice';
import '../app/globals.css';
import Layout from '../app/Layout';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // Initialize the store as needed
    // For example: storeRef.current.dispatch(initializeCount(count));
    // Add any other initialization logic here if necessary
  }

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        storeRef.current?.dispatch(fetchUserDetails());
      }
    };

    checkAuth();

    const interval = setInterval(() => {
      storeRef.current?.dispatch(refreshAccessToken());
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <Provider store={storeRef.current}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
