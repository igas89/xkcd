import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';

import Button from 'components/Button';
import { LoadingContext } from 'context/loadingContext';

import { ComicsCountRequest } from 'interfaces/comicsModel';

import { useGetComics } from 'hooks/useGetComics';
import { useGetComicsCount } from 'hooks/useGetComicsCount';

const Container = styled.div`
  display: flex;
  flex-flow: nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0px;
  border-bottom: 1px solid #464c5a;
  border-top: none;
  background: linear-gradient(0deg,#2c3038 40%,#42474f 90%);
`;

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

interface PagesState {
  current?: number;
  first?: number;
  last?: number;
  prev?: number;
  next?: number;
}

interface NavigationState {
  isMount: boolean;
  isComicsLoading: boolean;
  isComicsCountLoading: boolean;
}

const Navigation: FC = () => {
  const history = useHistory();
  const { isLoading: contextLoading, setLoading } = useContext(LoadingContext);
  const {
    fetchComics,
    comicsState: {
      isFetching: isFetchingComics,
      response: comicsData,
    }
  } = useGetComics();

  const {
    fetchComicsCount,
    comicsCountState: {
      isFetching: isFetchingComicsCount,
      response: comicsCountData,
    }
  } = useGetComicsCount();

  const [navState, setNavState] = useState<NavigationState>({
    isMount: false,
    isComicsLoading: false,
    isComicsCountLoading: false,
  });

  const [pages, setPagesState] = useState<PagesState>({});

  const setLink = (num: string | number) => {
    history.push(`/comics/${num}`);
  };

  const onClickFetchComics = (num?: number) => () => {
    setLoading(true);
    setLink(num as number);

    fetchComics({
      num: num as number,
    });
  };

  const onClickRandom = (_event: ButtonEvent): void => {
    if (!comicsCountData) {
      return;
    }

    const counts = comicsCountData.counts;
    const numComic = Math.floor((Math.random() * counts) + 1);

    setLoading(true);
    setLink(numComic as number);

    fetchComics({
      num: numComic,
    });
  };

  const getPage = useCallback((): ComicsCountRequest['num'] => {
    const { pathname } = history.location;
    const page = pathname === '/'
      ? 'latest'
      : Number(pathname.replace(/.+\/(\d+)$/, '$1'));

    return page;
  }, [history.location]);

  useEffect(() => {
    if (navState.isMount) {
      return;
    }

    setLoading(true);

    // Запрашиваем кол-во комиксов
    fetchComicsCount();

    const page = getPage();

    if (page !== 'latest') {
      fetchComics({
        num: page,
      });
    }

    setNavState((prevState) => ({
      ...prevState,
      isMount: true,
    }));
  }, [
    fetchComics,
    fetchComicsCount,
    navState.isMount,
    getPage,
    setLoading,
  ]);

  useEffect(() => {
    if (!isFetchingComics && !isFetchingComicsCount && comicsData && comicsCountData) {
      const current = comicsData.num;
      const next = current + 1;
      const prev = current - 1;
      const counts = comicsCountData.counts;

      setPagesState((prevState) => ({
        ...prevState,
        current,
        first: 1,
        next: next <= (counts as number) ? next : undefined,
        prev: prev,
        last: counts,
      }));
    }
  }, [
    isFetchingComics,
    isFetchingComicsCount,
    comicsData,
    comicsCountData,
  ]);

  const isLoading = contextLoading || isFetchingComics || isFetchingComicsCount;

  /* TODO: Btn disabled */
  const firstBtnDisabled = isLoading || pages.first === undefined || pages.first === pages.current;
  const prevBtnDisabled = isLoading || pages.prev === undefined;
  const nextBtnDisabled = isLoading || pages.next === undefined;
  const lastBtnDisabled = isLoading || pages.last === undefined || pages.last === pages.current;

  /* TODO: Title */
  const BtnFirstTitle = !firstBtnDisabled ? `First: ${pages.first}` : '';
  const BtnPrevTitle = !prevBtnDisabled ? `Prev: ${pages.prev}` : '';
  const BtnNextTitle = !nextBtnDisabled ? `Next: ${pages.next}` : '';
  const BtnLastTitle = !lastBtnDisabled ? `Last: ${pages.last}` : '';

  return (
    <Container>
      <Button
        title={BtnFirstTitle}
        onClick={onClickFetchComics(pages.first)}
        disabled={firstBtnDisabled}
      >
        {'<<'}
      </Button>
      <Button
        title={BtnPrevTitle}
        onClick={onClickFetchComics(pages.prev)}
        disabled={prevBtnDisabled}
      >
        {'< Prev'}
      </Button>
      <Button
        title='Random'
        onClick={onClickRandom}
        disabled={isLoading}
      />
      <Button
        title={BtnNextTitle}
        onClick={onClickFetchComics(pages.next)}
        disabled={nextBtnDisabled}
      >
        {'Next >'}
      </Button>
      <Button
        title={BtnLastTitle}
        onClick={onClickFetchComics(pages.last)}
        disabled={lastBtnDisabled}
      >
        {'>>'}
      </Button>
    </Container>
  );
};

export default Navigation;