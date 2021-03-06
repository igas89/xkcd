import { ActionTypes, InitialState } from 'types/store';
import {
    COMICS_REQUEST,
    COMICS_SUCCESS,
    COMICS_FAILURE,
} from 'actions/comicsAction';

import { COMICS_COUNT_SUCCESS } from 'actions/comicsCountAction';

export interface ComicsData {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
}

export type ComicsState = InitialState<null, Partial<ComicsData>>;

const INITIAL_STATE: ComicsState = {
    action: null,
    requestData: null,
    responseData: {},
    error: {
        message: null,
    },
}

export const comicsReducer = (
    state = INITIAL_STATE,
    action: ActionTypes<null, ComicsData>
): ComicsState => {
    switch (action.type) {
        case COMICS_REQUEST: {
            return {
                ...state,
                action: action.type,
                requestData: action.payload || null,
                error: INITIAL_STATE.error,
            }
        }
        case COMICS_SUCCESS:
        case COMICS_COUNT_SUCCESS: {
            return {
                ...state,
                action: COMICS_SUCCESS,
                responseData: action.response || {},
            }
        }
        case COMICS_FAILURE: {
            return {
                ...state,
                action: action.type,
                error: {
                    message: action.error?.message || null,
                }
            }
        }
        default:
            return state;
    }
}