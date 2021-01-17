import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { COMICS_REQUEST, COMICS_SUCCESS, COMICS_FAILURE } from 'actions/comicsAction';
import { COMICS_COUNT_REQUEST, COMICS_COUNT_SUCCESS } from 'actions/comicsCountAction';

import { LoadingContext } from 'context/loadingContext';
import { ComicsData } from 'reducers/comicsReducer';

import { useComicsSelector } from 'hooks/useComicsSelector';
import { useComicsCountSelector } from 'hooks/useComicsCountSelector';

import ErrorContent from 'pages/ErrorContent';
import Skeleton from 'components/Skeleton';

const StyledContainer = styled.div`
    min-height: 250px;
`;

const StyledHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 10px 10px 0;
    font-size: 15px;
`;

const StyledHeaderItem = styled.div`
    height: 20px;
`;

const StyledBody = styled.div`
    padding: 0px 10px 10px;
`;

const StyledTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
`;

const StyledTranscript = styled.div`
    font-size: 15px;
    line-height: 1.4em;
    padding-bottom: 10px;
`;

const StyledImage = styled.div<{ isLoading: boolean }>`
    display: ${({ isLoading }) => isLoading ? 'none' : 'flex'};
    justify-content: center;
    padding: 0 10px 10px;
    background: linear-gradient(0deg,#1d2026 20%,#282c34 80%);

    & > img {
        border: 3px solid #1b1e23;
        border-radius: 4px;
        box-shadow: 0px 0px 5px 5px #1d2026;
        box-sizing: border-box;
        background-color: #ffffff;
    }
`;

interface ContentState {
    isComicsLoading: boolean;
    isComicsCountLoading: boolean;
    comicsData: ComicsData | null;
    count: number | null;
    current: string;
    date: string | null;
    img: string;
    isError: boolean;
    errorMessage: string;
}

const Content: FC = () => {
    const { isLoading: contextLoading, setLoading } = useContext(LoadingContext);
    const { comicsAction, comicsData } = useComicsSelector();
    const { comicsCountAction, comicsCountData } = useComicsCountSelector();

    const [state, setState] = useState<ContentState>({
        isComicsLoading: false,
        isComicsCountLoading: false,
        comicsData: null,
        count: null,
        current: '',
        date: null,
        img: '',
        isError: false,
        errorMessage: '',
    });

    const onLoad = useCallback(() => {
        const formatDate = (date: string | number): string => `0${date}`.slice(-2);

        setLoading(false);
        setState(prevState => ({
            ...prevState,
            isComicsLoading: false,
            comicsData: comicsData,
            current: `${comicsData.num} of ${comicsCountData}`,
            date: `${formatDate(comicsData.day)}.${formatDate(comicsData.month)}.${comicsData.year}`,
        }))
    }, [comicsData, comicsCountData, setLoading])

    useEffect(() => {
        if (comicsAction === COMICS_REQUEST) {
            setState(prevState => ({
                ...prevState,
                isComicsLoading: true,
                isError: false,
                img: '',
                current: '',
                date: '',
                comicsData: null,
                errorMessage: '',
            }))
        }

        if (state.isComicsLoading && comicsAction === COMICS_SUCCESS) {
            setState(prevState => ({
                ...prevState,
                img: comicsData.img,
            }))
        }
        if (state.isComicsLoading && comicsAction === COMICS_FAILURE) {
            setLoading(false);

            setState(prevState => ({
                ...prevState,
                isError: true,
                isComicsLoading: false,
                errorMessage: 'Not found comics :(',
            }))
        }
    }, [comicsAction, comicsData, setLoading, state.isComicsLoading])

    useEffect(() => {
        if (comicsCountAction === COMICS_COUNT_REQUEST) {
            setLoading(true);
            setState(prevState => ({
                ...prevState,
                isComicsLoading: true,
            }))
        }

        if (comicsCountAction === COMICS_COUNT_SUCCESS) {
            setState(prevState => ({
                ...prevState,
                isComicsCountLoading: false,
                count: comicsCountData,
            }))
        }
    }, [comicsCountAction, comicsCountData, setLoading, state.isComicsCountLoading])

    const isLoading = contextLoading || state.isComicsLoading;


    if (state.isError) {
        return (
            <ErrorContent>
                {state.errorMessage}
            </ErrorContent>
        )
    }

    return (
        <StyledContainer>
            <StyledHeader>
                <StyledHeaderItem>
                    <Skeleton isLoading={isLoading}>
                        {state.current}
                    </Skeleton>
                </StyledHeaderItem>
                <StyledTitle>
                    <Skeleton isLoading={isLoading} width='200px'>
                        {state.comicsData?.title}
                    </Skeleton>
                </StyledTitle>
                <StyledHeaderItem>
                    <Skeleton isLoading={isLoading}>
                        {state.date}
                    </Skeleton>
                </StyledHeaderItem>
            </StyledHeader>
            <StyledBody>
                <StyledTranscript>
                    <Skeleton isLoading={isLoading} count={4} width={['100%', '90%', '95%', '80%']} />
                    {state.comicsData?.transcript}
                </StyledTranscript>
                <Skeleton isLoading={isLoading} height='250px' width='100%' >
                    <StyledImage isLoading={isLoading}>
                        <img src={state.img} alt={state.comicsData?.alt} onLoad={onLoad} />
                    </StyledImage>
                </Skeleton>
            </StyledBody>
        </StyledContainer>
    )
}

export default Content;