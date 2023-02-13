import React from 'react';
import { Outlet } from 'react-router-dom';

import { Aside } from './Aside';
import { ContentContainer } from './ContentContainer';
import { ContentWrapper } from './ContentWrapper';
import { Header } from './Header';

export const Layout = () => {
  return (
    <>
      <ContentWrapper type="header">
        <Header />
      </ContentWrapper>

      <ContentWrapper type="main">
        <Aside />
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </ContentWrapper>
    </>
  );
};
