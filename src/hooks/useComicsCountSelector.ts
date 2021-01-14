import { useSelector } from 'react-redux';
import { ActionType, RootState } from 'types/store';
import { ComicsCountData, ComicsCountState } from 'reducers/comicsCountReducer';

export interface UseComicsCountSelector {
    comicsCountAction: ActionType;
    comicsCountState: ComicsCountState;
    comicsCountData: ComicsCountData;
}

export const useComicsCountSelector = (): UseComicsCountSelector => {
    const comicsCountState = useSelector<RootState, ComicsCountState>(({ comicsCountState }) => comicsCountState);

    return {
        comicsCountAction: comicsCountState.action,
        comicsCountData: comicsCountState.count,
        comicsCountState,
    }
}