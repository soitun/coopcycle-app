import { useColorScheme } from 'nativewind';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import Color from 'colorjs.io';
import { useSelector } from 'react-redux';
import { primaryColor } from './common';
import { selectServerTheme } from '../redux/App/selectors';

export const useColorModeValue = <T>(lightValue: T, darkValue: T): T => {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark' ? darkValue : lightValue;
};

export const useBackgroundColor = () => {
  return useColorModeValue(
    DefaultTheme.colors.background,
    DarkTheme.colors.background,
  );
};

function checkContrast(c, background, theme) {
  let color = new Color(c);
  let contrast = color.contrast(background, 'WCAG21');

  while (contrast < 4.5) {
    if (theme === 'dark') {
      color = color.lighten(0.1);
    } else {
      color = color.darken(0.1);
    }
    contrast = color.contrast(background, 'WCAG21');
    if (contrast >= 4.5) {
      break;
    }
  }

  return color.toString({ format: 'hex' });
}

const primaryLight = checkContrast(primaryColor, '#FFFFFF', 'light');
const primaryDark = checkContrast(primaryColor, '#201E1E', 'dark');

export const usePrimaryColor = () => {
  const serverTheme = useSelector(selectServerTheme);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (serverTheme?.primary) {
    const bg = isDark ? '#201E1E' : '#FFFFFF';
    return checkContrast(serverTheme.primary, bg, colorScheme || 'light');
  }

  return isDark ? primaryDark : primaryLight;
};

export const usePrimaryContentColor = () => {
  const serverTheme = useSelector(selectServerTheme);
  if (serverTheme?.['primary-content']) {
    return serverTheme['primary-content'];
  }
  return '#FFFFFF';
};

export const useSecondaryColor = () => {
  const serverTheme = useSelector(selectServerTheme);
  const fallback = useColorModeValue('rgb(217 217 219)', 'rgb(63 64 64)');
  return serverTheme?.secondary ?? fallback;
};

export const useSecondaryContentColor = () => {
  const serverTheme = useSelector(selectServerTheme);
  const fallback = useColorModeValue('#000000', '#FFFFFF');
  return serverTheme?.['secondary-content'] ?? fallback;
};

export const useBaseTextColor = () => {
  // text-typography-950
  return useColorModeValue('rgb(23 23 23)', 'rgb(254 254 255)');
};

export const useSecondaryTextColor = () => {
  // text-typography-500
  return useColorModeValue('rgb(140 140 140)', 'rgb(163 163 163)');
};

export const useBackgroundContainerColor = () => {
  // bg-background-50
  return useColorModeValue('rgb(246 246 246)', 'rgb(39 38 37)');
};

export const useBackgroundHighlightColor = () => {
  return useColorModeValue('#f2f2f2', '#353030');
};

// IconText component
export const useIconColor = () => {
  return useColorModeValue('#424242', '#B0BEC5');
};

export const useBlackAndWhiteTextColor = () => {
  return useColorModeValue('#000000', '#FFFFFF');
};
