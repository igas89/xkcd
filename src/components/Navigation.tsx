import React, { memo, FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import Button from 'components/Button';

import { RootState } from 'types/store';
import { ComicsState } from 'reducers/comicsReducer';

import {
    fetchComics,
    COMICS_REQUEST,
    COMICS_SUCCESS,
    COMICS_FAILURE,
} from 'actions/comicsAction';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type ReturnFetchComics = ReturnType<typeof fetchComics>;

interface Callback<T> {
    (): T
}
const StyledContainer = styled.div`
    display: flex;
    flex-flow: nowrap;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0px;
    border-bottom: 1px solid #464c5a;
    border-top: none;
    background: linear-gradient(0deg,#2c3038 40%,#42474f 90%);
`;

const Navigation: FC = memo(() => {
    const dispatch = useDispatch();
    const comicsState = useSelector<RootState, ComicsState>(({ comicsState }) => comicsState);
    const [state, setState] = useState({
        isLoading: false,
    })

    const dispatchAction = useCallback(function <T extends ReturnFetchComics>(
        callback: Callback<T>
    ): void {
        if (state.isLoading || comicsState.action === COMICS_REQUEST) {
            return;
        }

        setState({
            isLoading: true,
        })
        dispatch(callback())
    }, [dispatch, comicsState.action, state.isLoading]);

    const onClickBack = useCallback((event: ButtonEvent) => {
        dispatchAction(fetchComics);
    }, [dispatchAction]);

    const onClickNext = useCallback((event: ButtonEvent) => {
        dispatchAction(fetchComics);
    }, [dispatchAction]);

    const onClickRandom = useCallback((event: ButtonEvent) => {
        dispatchAction(fetchComics);
    }, [dispatchAction]);

    useEffect(() => {
        console.log('comicsState:', comicsState);

        if (comicsState.action === COMICS_SUCCESS) {
            setState({
                isLoading: false
            })
        }
    }, [comicsState])

    return (
        <StyledContainer>
            <Button title='First' onClick={onClickBack} disabled={state.isLoading}>{'<<'}</Button>
            <Button title='< Prev' onClick={onClickBack} disabled={state.isLoading} />
            <Button title='Random' onClick={onClickRandom} disabled={state.isLoading} />
            <Button title='Next >' onClick={onClickNext} disabled={state.isLoading} />
            <Button title='Last' onClick={onClickNext} disabled={state.isLoading} >{'>>'}</Button>
        </StyledContainer>
    )
})

export default Navigation;