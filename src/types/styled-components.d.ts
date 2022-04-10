import type { BaseTheme } from 'themes';

declare module 'styled-components' {
  export interface DefaultTheme extends BaseTheme { }
}