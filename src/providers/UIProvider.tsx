import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { selectServerTheme } from '@/src/redux/App/selectors';
import { buildThemeConfig } from '@/src/styles/buildThemeConfig';

interface UIProviderProps {
  children: React.ReactNode;
}

/**
 * Dual UI Provider for gradual migration from NativeBase to Gluestack
 * This allows both libraries to coexist
 */
export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const serverTheme = useSelector(selectServerTheme);
  const themeConfig = useMemo(() => buildThemeConfig(serverTheme), [serverTheme]);

  return (
    <GluestackUIProvider
      mode={colorScheme || 'light'}
      style={themeConfig[colorScheme || 'light']}>
      {children}
    </GluestackUIProvider>
  );
};

export default UIProvider;
