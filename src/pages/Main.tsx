import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';

import Navigation from 'pages/Navigation';
import Header from 'pages/Header';
import Content from 'pages/Content';

import { LoadingContext, LoadingContextType } from 'context/loadingContext';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 900px;
  margin: 0 auto;
  box-shadow: 1px 3px 5px 3px #1d2026;
`;

const Main: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const providerValues: LoadingContextType = {
    isLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={providerValues}>
      <Container>
        <Header />
        <Navigation />
        <Content />
      </Container>
    </LoadingContext.Provider>
  );
};

export default Main;