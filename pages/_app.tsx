import React from 'react';
import '../app/globals.css';
import Layout from '../components/Layout';

interface MyAppProps {
    Component: React.ComponentType;
    pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;