import React from 'react';
import '../app/globals.css';

interface MyAppProps {
    Component: React.ComponentType;
    pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;