import * as React from 'react';
import '../styles/styles.scss';
import LandingPage from './landingPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  Header,
  Footer,
  useAppDispatch,
  getUserLogout,
  useAppSelector,
  fetchNotificationCount,
  setTriggerCookieCheck,
  flushUserData,
  setInfoMsg,
} from '@p2p-exchange/core';
import CssBaseline from '@mui/material/CssBaseline';
import { globalTheme } from '@p2p-exchange/core';
import PostItem from '../components/post-item/post-item';
import { useState, useEffect } from 'react';
import CreateAccount from './createAccount';
import SigninPage from './signinPage';
import ForgotPasswordPage from './forgotPasswordPage';
import ConfirmForgotPasswordPage from './confirmForgotPasswordPage';
import ConfirmEmailPage from './confirmEmailPage';
import {
  Snackbars,
  LoaderWrapper,
  getUserLocation,
} from '@p2p-exchange/shared';
import PageNotFound from './notfoundPage';
import ProfileWrapper from './profileWrapper';
import InboxPage from '../components/inbox/inbox';
import AccountWrapper from './accountWrapper';
import ChangePassword from './chagePasswordPage';
import DonationFormPage from './donationFormPage';
import AuthGuard from './utils/authguard';
import DonationLandingPage from './donationLandingPage';
const Home = React.lazy(() => import('home/Module'));
const ProductDetail = React.lazy(() => import('product-detail/Module'));
const ProductList = React.lazy(() => import('product-list/Module'));
interface IPosition {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export function App() {
  const dispatch = useAppDispatch();
  const loaderCount = useAppSelector((state) => state.globalLoader.counter);
  const isInitialRender = React.useRef(true);
  const navigate = useNavigate();
  const triggerCookieCheck = useAppSelector(
    (state) => state.user.triggerCookieCheck
  );
  const handleLogout = () => {
    dispatch(getUserLogout());
  };

  const checkAuthCookie = (): number => {
    const authCookie = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('auth='));

    if (authCookie) {
      const value = authCookie?.split('=')[1];
      const checkAfterTimeInterval = Number(value?.split('_')[1]);
      const newCookieeAge = checkAfterTimeInterval * 1000 + 10;
      return newCookieeAge;
    } else {
      dispatch(flushUserData());
      // if (
      //   window.location.pathname === '/' ||
      //   window.location.pathname === '/product/:path' ||
      //   window.location.pathname === '/profile/:id' ||
      //   window.location.pathname === '/register' ||
      //   window.location.pathname === '/signin' ||
      //   window.location.pathname === '/confirm-email' ||
      //   window.location.pathname === '/donate'
      // ) {
      // } else {
      //   dispatch(
      //     setInfoMsg('To view this page, please login in to your account.')
      //   );
      //   navigate('/signin');
      // }
    }
    return 0;
  };

  useEffect(() => {
    checkAuthCookie() && dispatch(fetchNotificationCount());
    getUserLocation(dispatch);
  }, []);

  React.useEffect(() => {
    let expTime = checkAuthCookie();
    let debounceTimer: NodeJS.Timeout | undefined;
    const debounceCheck = () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        checkAuthCookie();
      }, expTime);
    };
    debounceCheck();
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [triggerCookieCheck]);

  return (
    <React.Suspense fallback={null}>
      <ThemeProvider theme={globalTheme}>
        <CssBaseline />
        <LoaderWrapper isLoading={loaderCount > 0} />
        <Snackbars />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Header handleLogout={handleLogout} />
          <div className="main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/product/:path" element={<ProductList />} />
              <Route path="/register" element={<CreateAccount />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/confirm-email" element={<ConfirmEmailPage />} />
              {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/confirm-forgot-password"
                element={<ConfirmForgotPasswordPage />}
              /> */}
              <Route
                path="/post-item"
                element={
                  <AuthGuard>
                    <PostItem />
                  </AuthGuard>
                }
              />

              <Route
                path="/post-item/edit/:itemId"
                element={
                  <AuthGuard>
                    <PostItem />
                  </AuthGuard>
                }
              />
              {/* <Route path="/home" element={<Home />} /> */}
              <Route
                path="/account"
                element={
                  <AuthGuard>
                    <AccountWrapper />
                  </AuthGuard>
                }
              />
              <Route path="/profile/:id" element={<ProfileWrapper />} />
              <Route path="/donate" element={<DonationLandingPage />} />
              <Route
                path="/inbox"
                element={
                  <AuthGuard>
                    <InboxPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/inbox/:userId/:productId"
                element={
                  <AuthGuard>
                    <InboxPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/account/change-password"
                element={
                  <AuthGuard>
                    <ChangePassword />
                  </AuthGuard>
                }
              />
              <Route
                path="/donate-item"
                element={
                  <AuthGuard>
                    <DonationFormPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/donate-item/edit/:donationId"
                element={
                  <AuthGuard>
                    <DonationFormPage />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
        </Box>
      </ThemeProvider>
    </React.Suspense>
  );
}

export default App;
