import { ThunkAction } from 'redux-thunk';
import { RootState } from 'types/store';
import { apiAction } from 'api';

export const COMICS_REQUEST = 'COMICS_REQUEST';
export const COMICS_SUCCESS = 'COMICS_SUCCESS';
export const COMICS_FAILURE = 'COMICS_FAILURE';

export interface ActionComics {
    type: string;
    requestData: {
        type: string[];
        payload: number;
    };
}

export type FetchComics = ThunkAction<void, RootState, undefined, ActionComics>;

export const fetchComics = (): FetchComics => (dispatch) => {
    dispatch(apiAction({
        type: [COMICS_REQUEST, COMICS_SUCCESS, COMICS_FAILURE],
        payload: Math.floor(Math.random() * 10),
    }))
}