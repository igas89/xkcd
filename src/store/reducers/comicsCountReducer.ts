import { ActionType, ActionError, ActionTypes } from 'types/store';
import {
    COMICS_COUNT_REQUEST,
    COMICS_COUNT_SUCCESS,
    COMICS_COUNT_FAILURE,
} from 'actions/comicsCountAction';

import { ComicsData } from './comicsReducer';

export type ComicsCountData = number | null;
export interface ComicsCountState {
    action: ActionType;
    count: ComicsCountData;
    error: ActionError;
};

const INITIAL_STATE: ComicsCountState = {
    action: null,
    count: null,
    error: {
        message: null,
    }
}

export const comicsCountReducer = (
    state = INITIAL_STATE,
    action:  ActionTypes<null, ComicsData>
): ComicsCountState => {
    switch (action.type) {
        case COMICS_COUNT_REQUEST: {
            return {
                ...state,
                action: action.type,
                error: INITIAL_STATE.error,
            }
        }
        case COMICS_COUNT_SUCCESS: {
            return {
                ...state,
                action: action.type,
                count: action.response?.num || null,
            }
        }
        case COMICS_COUNT_FAILURE: {
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