import React, { FC } from 'react';
import styled from 'styled-components/macro';

import _Button from 'components/Button';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  padding: 40px 0;
`;

const Content = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const GoToBackButton = styled(_Button)`
  font-size: 20px;
  font-weight: bold;
`;

const ErrorContent: FC = ({ children }) => {
  const onClickButton = (): void => {
    window.location.assign('/');
  };

  return (
    <Container>
      <Content>
        {children}
      </Content>
      <GoToBackButton onClick={onClickButton}>
        Back to the Main page
      </GoToBackButton>
    </Container>
  );
};

export default ErrorContent;