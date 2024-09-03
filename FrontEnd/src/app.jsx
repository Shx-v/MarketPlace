import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import AuthProvider from './contexts/auth/AuthContext';

import 'src/global.css';

import { RTL } from 'src/components/rtl';
import { SettingsButton } from 'src/components/settings/settings-button';
import { SettingsDrawer } from 'src/components/settings/settings-drawer';
import { Toaster } from 'src/components/toaster';
import { SettingsConsumer, SettingsProvider } from 'src/contexts/settings';
import { useNprogress } from 'src/hooks/use-nprogress';
import { routes } from 'src/routes';
import { createTheme } from 'src/theme';

export const App = () => {
  useNprogress();

  const element = useRoutes(routes);

  return (
    <AuthProvider>
      <SettingsProvider>
        <SettingsConsumer>
          {(settings) => {
            const theme = createTheme({
              colorPreset: settings.colorPreset,
              contrast: settings.contrast,
              direction: settings.direction,
              paletteMode: settings.paletteMode,
              responsiveFontSizes: settings.responsiveFontSizes,
            });

            return (
              <ThemeProvider theme={theme}>
                <Helmet>
                  <meta
                    name="color-scheme"
                    content={settings.paletteMode}
                  />
                  <meta
                    name="theme-color"
                    content={theme.palette.neutral[900]}
                  />
                </Helmet>
                <RTL direction={settings.direction}>
                  <CssBaseline />
                  <>
                    {element}
                    <SettingsButton onClick={settings.handleDrawerOpen} />
                    <SettingsDrawer
                      canReset={settings.isCustom}
                      onClose={settings.handleDrawerClose}
                      onReset={settings.handleReset}
                      onUpdate={settings.handleUpdate}
                      open={settings.openDrawer}
                      values={{
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes,
                        stretch: settings.stretch,
                        layout: settings.layout,
                        navColor: settings.navColor,
                      }}
                    />
                  </>
                  <Toaster />
                </RTL>
              </ThemeProvider>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </AuthProvider>
  );
};
