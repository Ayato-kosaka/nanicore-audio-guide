import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Colors } from './Colors';
import type { MD3Theme } from 'react-native-paper';

export const LightTheme: MD3Theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: Colors.light.primary,
        background: Colors.light.background,
        surface: Colors.light.surface,
        onSurface: Colors.light.text,
        error: Colors.light.error,
        outline: Colors.light.border,
    },
};

export const DarkTheme: MD3Theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: Colors.dark.primary,
        background: Colors.dark.background,
        surface: Colors.dark.surface,
        onSurface: Colors.dark.text,
        error: Colors.dark.error,
        outline: Colors.dark.border,
    },
};
