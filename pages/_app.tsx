'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import { makeStore, AppStore } from '../lib/store';
import { setAuthenticationState } from '../lib/features/user/slice';
import '../app/globals.css';
import Layout from '../app/Layout';
import { fetchUserDetails, refreshAccessToken } from '@/lib/features/user/thunks';
import { isTokenValid } from '../util/token';
import Head from 'next/head';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const storeRef = useRef<AppStore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = storeRef.current?.getState().user.isAuthenticated;

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken && isTokenValid(accessToken)) {
        await storeRef.current?.dispatch(setAuthenticationState(true));
        await storeRef.current?.dispatch(fetchUserDetails());
      } else {
        Cookies.remove('access_token');
        await storeRef.current?.dispatch(setAuthenticationState(false));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isAuthenticated) {
      interval = setInterval(() => {
        storeRef.current?.dispatch(refreshAccessToken());
      }, 15 * 60 * 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={storeRef.current}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;