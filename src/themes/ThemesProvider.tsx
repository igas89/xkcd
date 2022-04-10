import React, { FC } from 'react';
import { ThemeProvider as ScThemesProvider } from "styled-components";

import themes from './index';

const ThemesProvider: FC = ({ children }) => (
    <ScThemesProvider theme={themes}>
        {children}
    </ScThemesProvider>
);


export default ThemesProvider;