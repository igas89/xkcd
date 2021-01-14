import { useSelector } from 'react-redux';

import { ActionType, RootState } from 'types/store';
import { ComicsState, ComicsData } from 'reducers/comicsReducer';

export interface UseComicsSelector {
    comicsAction: ActionType;
    comicsState: ComicsState;
    comicsData: ComicsData;
}

export const useComicsSelector = (): UseComicsSelector => {
    const comicsState = useSelector<RootState, ComicsState>(({ comicsState }) => comicsState);

    return {
        comicsAction: comicsState.action,
        comicsData: comicsState.responseData as ComicsData,
        comicsState,
    }
}