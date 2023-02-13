import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from '@/components';
import { Layout } from '@/components/Layout';

import { Fallback } from './Fallback';
import { Landing } from './Landing';
import { Login } from './Login';
import { Todo } from './Todo';
import { Todos } from './Todos';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute restricted redirectTo="/">
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Fallback />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Landing />} />
          <Route path="todos" element={<Todos />} />
          <Route path="todo/:id" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
