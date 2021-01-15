import styled, { css, keyframes } from 'styled-components/macro';

export const animWave = keyframes`
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

export interface SkeletonProps {
    height?: string;
    width?: string;
    isLoading?: boolean;
}

const Skeleton = styled.div<SkeletonProps>`
    ${({ isLoading, height, width }) => isLoading
        ? css<SkeletonProps>`
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

export default Skeleton;