import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './lib/store';
import { UserState, resetStatus, setAuthenticationState } from './lib/features/user/slice';
import Layout from './pages/layout'; // Adjust the import path as necessary


// Import pages
import Topics from './pages/topics';
import Topic from './pages/topic'; // Adjust the path as per your file structure
import Profile from './pages/profile';
import News from './pages/news'; // Adjust the path
import LandingPage from './pages/landing';
import Home from './pages/index';
import NotFound from './pages/404';
import Account from './pages/profile/account';
import Interests from './pages/profile/interests';
import Security from './pages/profile/security';
import PrivacyPolicy from './pages/policy/PrivacyPolicy';
import TermsOfService from './pages/policy/TermsOfService';
import ContactUs from './pages/contact/contactUs';
import ReportBugForm from './pages/contact/reportBug';
import RequestFeatureForm from './pages/contact/requestFeature';
import ActivateAccount from './pages/auth/ActivateAccount';
import ChangePasswordForm from './pages/auth/ChangePassword';
import PasswordEmailForm from './pages/auth/ForgetPassword';
import LoginForm from './pages/auth/Login';
import RegisterForm from './pages/auth/Register';
import { fetchUserDetails, refreshAccessToken } from './lib/features/user/thunks';
import isTokenValid from './util/token';
import { useAppDispatch } from './lib/hooks';
import FilterSources from './pages/profile/filterSources';
import BlacklistSources from './pages/profile/BlacklistSources';

const App = () => {
  const storeRef = useRef<AppStore | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      if (storeRef.current) { // Ensure storeRef.current is not null before using it
        if (accessToken && isTokenValid(accessToken)) {
          await storeRef.current.dispatch(setAuthenticationState(true));
          await storeRef.current.dispatch(fetchUserDetails());
        } else {
          Cookies.remove('access_token');
          await storeRef.current.dispatch(setAuthenticationState(false));
        }
      }
      setIsLoading(false);
    };
  
    checkAuth();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
  
    if (storeRef.current) {
      const isAuthenticated = storeRef.current.getState().user.isAuthenticated;
      if (isAuthenticated) {
        interval = setInterval(() => {
          if (storeRef.current) { // Check again as this is asynchronous
            storeRef.current.dispatch(refreshAccessToken());
          }
        }, 15 * 60 * 1000); // Refresh token every 15 minutes
      }
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <Provider store={storeRef.current}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:topic" element={<Topic />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/news/:newsID" element={<News />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/profile/account" element={<Account />} />
            <Route path="/profile/interests" element={<Interests />} />
            <Route path="/profile/filterSources" element={<FilterSources />} />
            <Route path="/profile/blacklistSources" element={<BlacklistSources />} />
            <Route path="/profile/security" element={<Security />} />
            <Route path="/policy/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/policy/TermsOfService" element={<TermsOfService />} />
            <Route path="/contact/contactUs" element={<ContactUs />} />
            <Route path="/contact/reportBug" element={<ReportBugForm />} />
            <Route path="/contact/requestFeature" element={<RequestFeatureForm />} />
            <Route path="/auth/ActivateAccount" element={<ActivateAccount />} />
            <Route path="/auth/ChangePassword" element={<ChangePasswordForm />} />
            <Route path="/auth/ForgetPassword" element={<PasswordEmailForm />} />
            <Route path="/auth/Login" element={<LoginForm />} />
            <Route path="/auth/Register" element={<RegisterForm />} />
            {/* Fallback route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;