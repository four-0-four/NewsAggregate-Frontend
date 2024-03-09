import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './lib/store';
import Layout from './pages/layout'; // Adjust the import path as necessary


// Import pages
import Topics from './pages/explore/topics';
import Topic from './pages/category/topic'; // Adjust the path as per your file structure
import News from './pages/news/news'; // Adjust the path
import LandingPage from './pages/landing';
import Home from './pages/home/index';
import NotFound from './pages/404';
import Account from './pages/profile/account';
import Interests from './pages/profile/interests';
import Security from './pages/profile/security';
import BookmarkPage from './pages/bookmark/bookmark';
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
import FilterSources from './pages/profile/filterSources';
import BlacklistSources from './pages/profile/BlacklistSources';
import ProtectedLayout from './pages/ProtectedLayout';

const App = () => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <Router>
        <Layout>
          <Routes>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topics/:topic" element={<Topic />} />
              <Route path="/bookmark" element={<BookmarkPage />} />
              <Route path="/profile" element={<Navigate to="/profile/account" replace />} />
              <Route path="/profile/account" element={<Account />} />
              <Route path="/profile/interests" element={<Interests />} />
              <Route path="/profile/filterSources" element={<FilterSources />} />
              <Route path="/profile/blacklistSources" element={<BlacklistSources />} />
              <Route path="/profile/security" element={<Security />} />
              <Route path="/contact/reportBug" element={<ReportBugForm />} />
              <Route path="/contact/requestFeature" element={<RequestFeatureForm />} />
            </Route>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/news/:newsID" element={<News />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/policy/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/policy/TermsOfService" element={<TermsOfService />} />
            <Route path="/contact" element={<Navigate to="/contact" replace />} />
            <Route path="/contact/contactUs" element={<ContactUs />} />
            <Route path="/auth/ActivateAccount" element={<ActivateAccount />} />
            <Route path="/auth/ChangePassword" element={<ChangePasswordForm />} />
            <Route path="/auth/ForgetPassword" element={<PasswordEmailForm />} />
            <Route path="/auth/Login" element={<LoginForm />} />
            <Route path="/auth/Register" element={<RegisterForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;