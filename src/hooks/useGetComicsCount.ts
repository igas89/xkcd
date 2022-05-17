import { useCallback } from 'react';

import { apiActionComicsRequest, ComicsCountState } from 'store/comicsCountSlice';
import { useAppDispatch, useAppSelector } from 'hooks/useAppStore';

export interface UseGetComicsCount {
  fetchComicsCount: () => void;
  comicsCountState: ComicsCountState;
}

export const useGetComicsCount = (): UseGetComicsCount => {
  const dispatch = useAppDispatch();
  const comicsCountState = useAppSelector(({ comicsCountState }) => comicsCountState);

  const fetchComicsCount = useCallback((): void => {
    dispatch(apiActionComicsRequest());
  }, [dispatch]);

  return {
    fetchComicsCount,
    comicsCountState,
  };
};