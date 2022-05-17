import { useCallback } from 'react';

import { apiActionComicsRequest, ComicsState } from 'store/comicsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/useAppStore';

import { ComicsRequest } from 'interfaces/comicsModel';

export interface UseGetComics {
  fetchComics: (payload: ComicsRequest) => void;
  comicsState: ComicsState;
}

export const useGetComics = (): UseGetComics => {
  const dispatch = useAppDispatch();
  const comicsState = useAppSelector(({ comicsState }) => comicsState);

  const fetchComics = useCallback((payload: ComicsRequest) => {
    dispatch(apiActionComicsRequest(payload));
  }, [dispatch]);

  return {
    fetchComics,
    comicsState,
  };
};