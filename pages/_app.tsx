import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store'; // Adjust the import path to your store
import '../app/globals.css';
import Layout from '../components/Layout';
interface MyAppProps {
    Component: React.ComponentType;
    pageProps: any;
}

function MyApp({ Component, pageProps }:MyAppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;