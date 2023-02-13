import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import jwtDecode from 'jwt-decode';

import { LOCAL_STORAGE_API_KEY } from './constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_API_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const apolloLink = authLink.concat(httpLink);

export const handleLogin = (token, navigate) => {
  localStorage.setItem(LOCAL_STORAGE_API_KEY, token);

  navigate('/');
};

export const isTokenValid = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_API_KEY);

  if (!token) return false;

  const tokenUserData = jwtDecode(token);

  return tokenUserData.exp > +new Date().getTime().toString().slice(0, 10);
};

export const handleLogout = () => {
  localStorage.removeItem(LOCAL_STORAGE_API_KEY);

  return window.location.replace('/login');
};
