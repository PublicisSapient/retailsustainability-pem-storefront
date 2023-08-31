import { useAppDispatch, setInfoMsg, flushUserData } from '@p2p-exchange/core';
import React, { ReactNode } from 'react';
import { useLocation, Navigate, NavigateProps } from 'react-router-dom';

const AuthGuard = ({ children }: any): JSX.Element => {
  const state = useLocation();
  const dispatch = useAppDispatch();
  const checkAuthCookie = (): Boolean => {
    const authCookie = document.cookie.includes('auth');
    if (!authCookie) {
      dispatch(
        setInfoMsg('To view this page, please login in to your account.')
      );
      dispatch(flushUserData());
      return false;
    }
    return true;
  };
  if (!checkAuthCookie()) return <Navigate to={`/signin?redirect=${state.pathname}`} />;
  return children;
};

export default AuthGuard;
