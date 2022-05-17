import React, { FC, useEffect, useState } from 'react';
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
`;

export interface SkeletonProps {
  count?: number;
  height?: string | string[];
  width?: string | string[];
  isLoading?: boolean;
  clearContent?: boolean;
}

export interface StyledSkeletonProps extends Pick<SkeletonProps, 'isLoading'> {
  height?: string;
  width?: string;
}

const Container = styled.div<StyledSkeletonProps>`
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
    `
    : ''
  }
`;

type SkeletonState = React.ReactNode[];

const Skeleton: FC<SkeletonProps> = ({
  count = 1,
  children,
  isLoading,
  height,
  width,
  clearContent = true,
}) => {
  const [items, setItems] = useState<SkeletonState>([]);

  useEffect(() => {
    const items = Array.from({ length: count }, (_, index) => {
      const itemHeight = Array.isArray(height)
        ? height[index] || height[0]
        : height;

      const itemsWidth = Array.isArray(width)
        ? width[index] || width[0]
        : width;

      return (
        <Container
          key={index}
          isLoading={isLoading}
          height={itemHeight}
          width={itemsWidth}
        >
          {isLoading && clearContent ? null : children}
        </Container>
      );
    });

    setItems(items);
  }, [
    count,
    children,
    isLoading,
    clearContent,
    height,
    width,
  ]);

  return <>{items}</>;
};

export default Skeleton;