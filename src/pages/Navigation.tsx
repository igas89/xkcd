import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import Button from 'components/Button';
import { LoadingContext } from 'context/loadingContext';

import { useComicsSelector } from 'hooks/useComicsSelector';
import { useComicsCountSelector } from 'hooks/useComicsCountSelector';

import {
  fetchComics,
  FetchComics,
  COMICS_REQUEST,
  COMICS_SUCCESS,
  COMICS_FAILURE,
} from 'actions/comicsAction';

import {
  fetchComicsCount,
  COMICS_COUNT_SUCCESS,
  COMICS_COUNT_FAILURE,
} from 'actions/comicsCountAction';

const StyledContainer = styled.div`
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
type ReturnFetchComics = ReturnType<FetchComics>;

interface PagesState {
  current: number | null;
  first: number | null;
  last: number | null;
  prev: number | null;
  next: number | null;
}

interface NavigationState {
  isMount: boolean;
  isComicsLoading: boolean;
  isComicsCountLoading: boolean;
}
const Navigation: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading: contextLoading, setLoading } = useContext(LoadingContext);
  const { comicsAction, comicsData } = useComicsSelector();
  const { comicsCountAction, comicsCountData } = useComicsCountSelector();

  const [navState, setNavState] = useState<NavigationState>({
    isMount: false,
    isComicsLoading: false,
    isComicsCountLoading: false,
  });

  const [pages, setPagesState] = useState<PagesState>({
    current: null,
    first: null,
    last: null,
    prev: null,
    next: null,
  });

  const dispatchAction = useCallback((actionType: ReturnFetchComics): void => {
    if (navState.isComicsLoading || comicsAction === COMICS_REQUEST) {
      return;
    }

    setNavState(prevState => ({
      ...prevState,
      isComicsLoading: true,
    }));

    dispatch(actionType);
  }, [dispatch, comicsAction, navState.isComicsLoading]);

  const setLink = useCallback((num: string | number) => {
    history.push(`/comics/${num}`);
  }, [history]);

  const onClickFetchComics = useCallback((num?: number | null) => () => {
    setLink(num as number);
    setLoading(true);
    dispatchAction(fetchComics(num as number));
  }, [dispatchAction, setLink, setLoading]);

  const onClickRandom = useCallback((event: ButtonEvent) => {
    if (!comicsCountData) {
      return;
    }

    const count = comicsCountData;
    const numComic = Math.floor((Math.random() * count) + 1);

    setLink(numComic as number);
    setLoading(true);
    dispatchAction(fetchComics(numComic));
  }, [comicsCountData, setLink, setLoading, dispatchAction]);

  const getPage = useCallback((): number | 'latest' => {
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

    // Запрашиваем кол-во комиксов
    dispatch(fetchComicsCount());

    setNavState((prevState) => ({
      ...prevState,
      isMount: true,
      isComicsCountLoading: true,
    }));
  }, [navState.isMount, getPage, dispatch]);

  useEffect(() => {
    if (navState.isComicsLoading && comicsAction === COMICS_SUCCESS) {
      const current = comicsData.num;
      const next = current + 1;
      const prev = current - 1;

      setNavState(prevState => ({
        ...prevState,
        isComicsLoading: false,
      }));

      setPagesState((prevState) => ({
        ...prevState,
        current,
        first: 1,
        next: next <= (comicsCountData as number) ? next : null,
        prev: prev || null,
        last: comicsCountData,
      }));
    }

    if (navState.isComicsCountLoading && comicsCountAction === COMICS_COUNT_SUCCESS) {
      const page = getPage();
      const isLatestPage = page === 'latest' || page === comicsCountData;

      setNavState(prevState => ({
        ...prevState,
        isComicsLoading: true,
        isComicsCountLoading: false,
      }));

      // выбираем только нумерованные и не последнюю
      if (!isLatestPage) {
        dispatch(fetchComics(page));
      }
    }

    if (comicsAction === COMICS_FAILURE || comicsCountAction === COMICS_COUNT_FAILURE) {
      setNavState(prevState => ({
        ...prevState,
        isComicsLoading: false,
        isComicsCountLoading: false,
      }));
    }
  }, [
    comicsAction,
    comicsData,
    comicsCountAction,
    comicsCountData,
    dispatch,
    getPage,
    navState.isComicsLoading,
    navState.isComicsCountLoading,
  ]);

  const isLoading = contextLoading || navState.isComicsLoading || navState.isComicsCountLoading;

  /* TODO: Btn disabled */
  const firstBtnDisabled = isLoading || pages.first === null || pages.first === pages.current;
  const prevBtnDisabled = isLoading || pages.prev === null;
  const nextBtnDisabled = isLoading || pages.next === null;
  const lastBtnDisabled = isLoading || pages.last === null || pages.last === pages.current;

  /* TODO: Title */
  const BtnFirstTitle = !firstBtnDisabled ? `First: ${pages.first}` : '';
  const BtnPrevTitle = !prevBtnDisabled ? `Prev: ${pages.prev}` : '';
  const BtnNextTitle = !nextBtnDisabled ? `Next: ${pages.next}` : '';
  const BtnLastTitle = !lastBtnDisabled ? `Last: ${pages.last}` : '';

  return (
    <StyledContainer>
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
    </StyledContainer>
  );
};

export default Navigation;