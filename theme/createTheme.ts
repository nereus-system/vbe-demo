import { createTheme, Theme } from '@mui/material/styles'
import tokens from '@/context/ui-tokens.json'

type TokenPalette = typeof tokens.palette
type TokenTypography = typeof tokens.typography

function createMuiTheme(mode: 'light' | 'dark'): Theme {
  const palette = tokens.palette
  const typography = tokens.typography

  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#5DE4C7' : '#5DE4C7', // From brand guide
      },
      secondary: {
        main: mode === 'light' ? '#7B61FF' : '#7B61FF', // From brand guide
      },
      success: {
        main: palette.content.positive[mode],
        light: palette.background.positive[mode],
        dark: palette.border.positive[mode],
      },
      error: {
        main: palette.content.negative[mode],
        light: palette.background.negative[mode],
        dark: palette.border.negative[mode],
      },
      warning: {
        main: palette.content.warning[mode],
        light: palette.background.warning[mode],
      },
      info: {
        main: palette.content.info[mode],
        light: palette.background.info[mode],
      },
      text: {
        primary: palette.content.default[mode],
        secondary: palette.content.muted[mode],
      },
      background: {
        default: palette.background.surface[mode],
        paper: palette.background.subtle[mode],
      },
      divider: palette.border.default[mode],
      action: {
        hover: palette.background.hover[mode],
        focus: palette.border.focus[mode],
      },
    },
    typography: {
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      h1: {
        fontWeight: typography.h1.fontWeight,
        fontSize: typography.h1.fontSize,
      },
      h2: {
        fontWeight: typography.h2.fontWeight,
        fontSize: typography.h2.fontSize,
      },
      body1: {
        fontWeight: typography.body1.fontWeight,
        fontSize: typography.body1.fontSize,
      },
    },
    shadows: [
      'none',
      `0 1px 3px ${palette.shadow.subtle[mode]}`,
      `0 2px 6px ${palette.shadow.subtle[mode]}`,
      `0 4px 8px ${palette.shadow.subtle[mode]}`,
      `0 6px 12px ${palette.shadow.subtle[mode]}`,
      `0 8px 16px ${palette.shadow.raised[mode]}`,
      `0 10px 20px ${palette.shadow.raised[mode]}`,
      `0 12px 24px ${palette.shadow.raised[mode]}`,
      `0 14px 28px ${palette.shadow.raised[mode]}`,
      `0 16px 32px ${palette.shadow.raised[mode]}`,
      `0 18px 36px ${palette.shadow.high[mode]}`,
      `0 20px 40px ${palette.shadow.high[mode]}`,
      `0 22px 44px ${palette.shadow.high[mode]}`,
      `0 24px 48px ${palette.shadow.high[mode]}`,
      `0 26px 52px ${palette.shadow.high[mode]}`,
      `0 28px 56px ${palette.shadow.high[mode]}`,
      `0 30px 60px ${palette.shadow.high[mode]}`,
      `0 32px 64px ${palette.shadow.high[mode]}`,
      `0 34px 68px ${palette.shadow.high[mode]}`,
      `0 36px 72px ${palette.shadow.high[mode]}`,
      `0 38px 76px ${palette.shadow.high[mode]}`,
      `0 40px 80px ${palette.shadow.high[mode]}`,
      `0 42px 84px ${palette.shadow.high[mode]}`,
      `0 44px 88px ${palette.shadow.high[mode]}`,
      `0 46px 92px ${palette.shadow.high[mode]}`,
    ] as Theme['shadows'],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#17161D',
            color: palette.content.default[mode],
          },
        },
      },
    },
  })
}

export const lightTheme = createMuiTheme('light')
export const darkTheme = createMuiTheme('dark')

