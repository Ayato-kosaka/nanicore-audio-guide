/**
 * 🎨 App-wide color system
 *
 * - Used for light/dark theming
 * - Matches with react-native-paper ThemeProvider
 * - Extendable for future branding adjustments
 */

const PRIMARY_LIGHT = '#0a7ea4';
const PRIMARY_DARK = '#0a7ea4'; // Consistent branding
const BACKGROUND_LIGHT = '#ffffff';
const BACKGROUND_DARK = '#151718';
const TEXT_LIGHT = '#11181C';
const TEXT_DARK = '#ECEDEE';

export const Colors = {
  light: {
    primary: PRIMARY_LIGHT,
    background: BACKGROUND_LIGHT,
    text: TEXT_LIGHT,
    icon: '#687076',
    border: '#E0E0E0',
    surface: '#F8F9FA',
    error: '#D14343',
    success: '#28a745',
    warning: '#F4A261',
    info: '#2A9D8F',
    disabled: '#BDBDBD',
  },
  dark: {
    primary: PRIMARY_DARK,
    background: BACKGROUND_DARK,
    text: TEXT_DARK,
    icon: '#9BA1A6',
    border: '#333',
    surface: '#1D1F20',
    error: '#FF6B6B',
    success: '#28a745',
    warning: '#FFB703',
    info: '#3DA9FC',
    disabled: '#555',
  },
};
