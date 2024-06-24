import { createTheme } from '@mui/material/styles';
import { ukUA } from '@mui/material/locale';
import { ukUA as UKDatePicker } from '@mui/x-date-pickers/locales';

const styles = getComputedStyle(document.documentElement);

export const bgColor =
    styles.getPropertyValue('--tg-theme-bg-color') || '#5288c1';
export const textColor =
    styles.getPropertyValue('--tg-theme-text-color') || '#f5f5f5';
export const hintColor =
    styles.getPropertyValue('--tg-theme-hint-color') || '#708499';
export const linkColor =
    styles.getPropertyValue('--tg-theme-link-color') || '#6ab3f3';
export const buttonColor =
    styles.getPropertyValue('--tg-theme-button-color') || '#5288c1';
export const buttonTextcolor =
    styles.getPropertyValue('--tg-theme-button-text-color') || '#ffffff';
export const secondaryBgColor =
    styles.getPropertyValue('--tg-theme-secondary-bg-color') || '#232e3c';
export const headerBgColor =
    styles.getPropertyValue('--tg-theme-header-bg-color') || '#17121b';
export const accentTextColor =
    styles.getPropertyValue('--tg-theme-accent-text-color') || '#6ab2f2';
export const sectionBgColor =
    styles.getPropertyValue('--tg-theme-section-bg-color') || '#17121b';
export const sectionHeaderTextcolor =
    styles.getPropertyValue('--tg-theme-section-header-text-color') ||
    '#6ab3f3';
export const subtitleTextColor =
    styles.getPropertyValue('--tg-theme-subtitle-text-color') || '#708499';
export const destructiveTextColor =
    styles.getPropertyValue('--tg-theme-destructive-text-color') || '#ec3942';

// A custom theme for this app
const theme = createTheme(
    {
        palette: {
            primary: {
                main: buttonColor,
            },
            secondary: {
                main: accentTextColor,
            },
            error: {
                main: destructiveTextColor,
            },
            background: {
                default: bgColor,
                paper: secondaryBgColor,
            },
        },
        typography: {
            body1: {},
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        color: textColor,
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: sectionHeaderTextcolor,
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        color: textColor,
                    },
                },
            },
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        color: buttonTextcolor,
                    },
                },
            },
        },
    },
    UKDatePicker,
    ukUA
);

export default theme;
