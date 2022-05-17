import React, { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { LoadingContext } from 'context/loadingContext';

import { useGetComics } from 'hooks/useGetComics';
import { useGetComicsCount } from 'hooks/useGetComicsCount';

import ErrorContent from 'pages/ErrorContent';
import Skeleton from 'components/Skeleton';

const Container = styled.div`
  min-height: 250px;
`;

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 10px 10px 0;
  font-size: 15px;
`;

const HeaderItem = styled.div`
  height: 20px;
`;

const Body = styled.div`
  padding: 0px 10px 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const Transcript = styled.div`
  font-size: 15px;
  line-height: 1.4em;
  padding-bottom: 10px;
`;

const Image = styled.div<{ isLoading: boolean; }>`
  display: ${({ isLoading }) => isLoading ? 'none' : 'flex'};
  justify-content: center;
  padding: 0 10px 10px;
  background: linear-gradient(0deg,#1d2026 20%,#282c34 80%);

  & > img {
    border: 3px solid #1b1e23;
    border-radius: 4px;
    box-shadow: 0px 0px 5px 5px #1d2026;
    box-sizing: border-box;
    background-color: #ffffff;
  }
`;

interface ContentComicsState {
  currentCount: string;
  date: string | null;
}

const Content: FC = () => {
  const { isLoading, setLoading } = useContext(LoadingContext);

  const {
    comicsState: {
      isFetching: isFetchingComics,
      isFailure: isFeilureComics,
      response: comicsData,
    }
  } = useGetComics();
  const {
    comicsCountState: {
      response: comicsCountData
    }
  } = useGetComicsCount();

  const [comicsState, setComicsState] = useState<ContentComicsState>({
    currentCount: '',
    date: null,
  });

  const formatDate = (date: string | number): string => (
    `0${date}`.slice(-2)
  );

  const onLoadImage = () => {
    if (!comicsData) {
      return;
    }

    setComicsState(prevState => ({
      ...prevState,
      currentCount: `${comicsData?.num} of ${comicsCountData?.counts}`,
      date: `${formatDate(comicsData.day)}.${formatDate(comicsData.month)}.${comicsData.year}`,
    }));
    setLoading(false);
  };

  useEffect(() => {
    if (!isFetchingComics) {
      return;
    }

    setComicsState(prevState => ({
      ...prevState,
      currentCount: '',
      date: null,
    }));

  }, [isFetchingComics]);

  if (isFeilureComics) {
    return (
      <ErrorContent>
        Not found comics :(
      </ErrorContent>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderItem>
          <Skeleton isLoading={isLoading}>
            {comicsState.currentCount}
          </Skeleton>
        </HeaderItem>
        <Title>
          {isLoading ? 'Loading comic...' : comicsData?.title}
        </Title>
        <HeaderItem>
          <Skeleton isLoading={isLoading}>
            {comicsState.date}
          </Skeleton>
        </HeaderItem>
      </Header>
      <Body>
        <Transcript>
          <Skeleton isLoading={isLoading} count={4} width={['100%', '90%', '95%', '80%']} >
            {comicsData?.transcript}
          </Skeleton>
        </Transcript>
        <Skeleton isLoading={isLoading} clearContent={false} height='250px' width='100%' >
          <Image isLoading={isLoading}>
            <img src={comicsData?.img} alt={comicsData?.alt} onLoad={onLoadImage} />
          </Image>
        </Skeleton>
      </Body>
    </Container>
  );
};

export default Content;