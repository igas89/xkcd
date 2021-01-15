import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';

import { COMICS_REQUEST, COMICS_SUCCESS, COMICS_FAILURE } from 'actions/comicsAction';
import { COMICS_COUNT_REQUEST, COMICS_COUNT_SUCCESS, COMICS_COUNT_FAILURE } from 'actions/comicsCountAction';

import { LoadingContext } from 'context/loadingContext';
import { ComicsData } from 'reducers/comicsReducer';

import { useComicsSelector } from 'hooks/useComicsSelector';
import { useComicsCountSelector } from 'hooks/useComicsCountSelector';

const animWave = keyframes`
    0% {
        transform: translateX(-100%);
    }
    60% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(100%);
    }
`

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

interface LoadingMixin {
    height?: string;
    width?: string;
    isLoading?: boolean;
}

const StyledSkeleton = styled.div<LoadingMixin>`
    ${({ isLoading, height, width }) => isLoading
        ? css<LoadingMixin>`
            overflow: hidden;
            position: relative;
            height: ${height || '20px'};
            width: ${width || '150px'};
            background-color: rgba(0, 0, 0, 0.11);
            border-radius: 4px;
            &+& {
                margin-top: 5px;
            }

            & * {
                display: none;
            }

            &::after {
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                content: '';
                background: linear-gradient(45deg, #23262c 30%, #2c3038 90%);
                position: absolute;
                animation: ${animWave} 1.6s linear 0.5s infinite;
                transform: translateX(-100%);
            }
        `: ''
    }
`

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
                img: '',
                current: '',
                date: '',
                comicsData: null
            }))
        }

        if (comicsAction === COMICS_SUCCESS) {
            setState(prevState => ({
                ...prevState,
                img: comicsData.img,
            }))
        }
    }, [comicsAction, comicsData, state.isComicsLoading])

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

    return (
        <StyledContainer>
            <StyledHeader>
                <StyledHeaderItem>
                    <StyledSkeleton isLoading={isLoading}>
                        {state.current}
                    </StyledSkeleton>
                </StyledHeaderItem>
                <StyledTitle>
                    <StyledSkeleton isLoading={isLoading} width='200px'>
                        {state.comicsData?.title}
                    </StyledSkeleton>
                </StyledTitle>
                <StyledHeaderItem>
                    <StyledSkeleton isLoading={isLoading}>
                        {state.date}
                    </StyledSkeleton>
                </StyledHeaderItem>
            </StyledHeader>
            <StyledBody>
                <StyledTranscript>
                    <StyledSkeleton isLoading={isLoading} width='100%' />
                    <StyledSkeleton isLoading={isLoading} width='100%' />
                    <StyledSkeleton isLoading={isLoading} width='90%' />
                    <StyledSkeleton isLoading={isLoading} width='80%' />
                    {state.comicsData?.transcript}
                </StyledTranscript>
                <StyledSkeleton isLoading={isLoading} height='250px' width='100%' >
                    <StyledImage isLoading={isLoading}>
                        <img src={state.img} alt={state.comicsData?.alt} onLoad={onLoad} />
                    </StyledImage>
                </StyledSkeleton>
            </StyledBody>
        </StyledContainer>
    )
}

export default Content;