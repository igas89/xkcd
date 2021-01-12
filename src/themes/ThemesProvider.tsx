import React, { FC } from 'react';
import { ThemeProvider as ScThemesProvider } from "styled-components";

import themes, { ThemeType } from './index';

const ThemesProvider: FC = ({ children }) => {
    return (
        <ScThemesProvider theme={themes}>{children}</ScThemesProvider>
    )
}


export default ThemesProvider;