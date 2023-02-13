import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';

import { useThemeMode } from '@/hooks';

import { ErrorBoundary, NotificationBar, ProgressBar } from './components';
import { apolloLink } from './helpers';
import { store } from './store';
import { darkTheme, lightTheme } from './theme';

import './assets/styles/index.css';

const client = new ApolloClient({
  link: apolloLink,
  cache: new InMemoryCache()
});

const Root = () => {
  const App = React.lazy(() => import('./pages/App'));

  const { themeMode } = useThemeMode();

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <ErrorBoundary>
        <React.Suspense fallback={<ProgressBar isFullPage />}>
          <App />
          <NotificationBar />
        </React.Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Root />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
