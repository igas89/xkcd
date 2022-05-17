
import { Dispatch } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState , AppDispatch} from 'store';

export const useAppDispatch = () => useDispatch<Dispatch<AppDispatch>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;