import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
     <Stack initialRouteName="login" screenOptions={{ headerShown: false }} />
    </Provider>
  );
}