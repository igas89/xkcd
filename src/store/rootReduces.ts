import { comicsReducer } from './comicsSlice';
import { comicsCountReducer } from './comicsCountSlice';
 
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  comicsState: comicsReducer,
  comicsCountState: comicsCountReducer,
};