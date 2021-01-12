import React, { FC, memo, HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components/macro';

const StyledButton = styled.button`
    padding: 5px 20px;
    font-size: 15px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.fontFamily[0]};
    background: linear-gradient(0deg,#2c3038 40%, #42474f 90%);
    box-shadow: 1px 2px 5px 1px #1d2026;
    outline: none;
    border: 1px solid #31363d;
    border-radius: 4px;
    line-height: 1.2em;
    color: ${({ theme }) => theme.colors.font};
    cursor: pointer;

    ${({ theme: { transition } }) => css`
        transition: color ${transition}, 
        box-shadow ${transition};
    `};

    &:disabled {
        /* background: linear-gradient(0deg,#54575d 40%,#747980 90%); */
        /* box-shadow: none; */
        opacity: 0.5;
        cursor: default;
    }

    &:not(:disabled):active{
        background: linear-gradient(0deg,#23262c 40%, #3a3e45 90%);
    }

    &:not(:disabled):hover {
        color: #dfdfdf;
        box-shadow: 1px 1px 5px 2px #494e53;
    }
`;

export interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}

const Button: FC<ButtonProps> = memo(({ title, children, ...props }) => (
    <StyledButton title={title} {...props}>
        {children || (children !== null && title)}
    </StyledButton>
));

export default Button;