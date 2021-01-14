import { comicsReducer } from './comicsReducer';
import { comicsCountReducer } from './comicsCountReducer';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    comicsState: comicsReducer,
    comicsCountState: comicsCountReducer,
}