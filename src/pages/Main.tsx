import React, { FC } from 'react';
import styled from 'styled-components/macro';

import Navigation from 'components/Navigation';

const StyledContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 900px;
    margin: 0 auto;
    box-shadow: 1px 3px 5px 3px #1d2026;
`;

const StyledHeader = styled.div`
    display: flex;
    padding: 10px;
    background: ${({ theme }) => theme.colors.white};
`;

const StyledHeaderTitle = styled.div`
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

const StyledHeaderImage = styled.div`
    background: url('/static/assets/logo.png') center/cover no-repeat;
    width: 185px;
    height: 83px;
    margin: 0 20px;
`;

const StyledBody = styled.div`
    padding: 10px;
`;

const Main: FC = () => {
    return (
        <StyledContainer>
            <StyledHeader >
                <StyledHeaderImage />
                <StyledHeaderTitle>
                    <p>A webcomic of romance, sarcasm,</p>
                    <p>math, and language.</p>
                </StyledHeaderTitle>
            </StyledHeader>
            <Navigation />
            <StyledBody>
                Proident ad laboris ad reprehenderit in esse. Officia elit adipisicing magna occaecat amet cupidatat sit ex ea nisi. Officia dolor ex tempor ex aliquip. In consequat labore proident magna minim quis proident ullamco cillum mollit qui deserunt. Labore exercitation et reprehenderit elit id esse pariatur irure consectetur veniam occaecat veniam amet. Excepteur ullamco esse elit aliquip voluptate cillum sunt sunt incididunt proident ad esse.

                Id officia nisi id elit nisi do. Id non aliqua id sit. Tempor laboris amet et culpa veniam quis incididunt pariatur ea officia ipsum in minim Lorem. Mollit labore consequat cupidatat sint occaecat nostrud sunt non in ad consequat proident quis. Exercitation amet non magna sint dolore dolor do anim aliquip. Occaecat commodo ex pariatur exercitation ut.

                Cillum ex fugiat ad esse commodo mollit amet quis sit incididunt ea. Ea deserunt veniam tempor incididunt consequat irure nulla laboris anim anim commodo non. Consequat dolor cillum in consectetur incididunt culpa qui ut et eiusmod id nulla sint fugiat. Ipsum consectetur eiusmod occaecat aliquip consectetur deserunt esse exercitation ex. Est dolore sint culpa quis anim non mollit fugiat deserunt exercitation occaecat aute eu Lorem. Reprehenderit voluptate esse est sit non nulla incididunt id eiusmod excepteur anim eiusmod.
            </StyledBody>
        </StyledContainer>
    );
}

export default Main;