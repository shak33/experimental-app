import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const token = null;

  const paperTheme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: '#4DA6FF',
      accent: '#4DA6FF',
      primaryContainer: '#D0E7FF',
    },
  };

  return (
    <ThemeProvider value={DefaultTheme}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          {token ? (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  );
}