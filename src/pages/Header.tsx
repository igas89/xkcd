import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
    display: flex;
    padding: 10px;
    background: ${({ theme }) => theme.colors.white};
`;

const StyledTitle = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    font-size: 30px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.fontFamily[1]};
    line-height: 1.4em;
    color: #464c5a;

    & p {
        margin: 0px;
    }
`;

const StyledImage = styled.div`
    background: url('/static/assets/logo.png') center/cover no-repeat;
    width: 185px;
    height: 83px;
    margin: 0 20px;
`;


const Header: FC = () => (
    <StyledContainer >
        <StyledImage />
        <StyledTitle>
            <p>A webcomic of romance, sarcasm,</p>
            <p>math, and language.</p>
        </StyledTitle>
    </StyledContainer>
)

export default Header;