import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelector from './src/screen/LanguageSelector';
import { useTranslation } from 'react-i18next';
import Slider from './src/screen/Slider/index.jsx';
import CompanyProfile from './src/screen/Company-profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2CC84D" barStyle="light-content" />
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('welcome')}</Text>
      <Text>{t('hello')}</Text>
    </View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="slider" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="slider" component={Slider} />
          <Stack.Screen name="language-selector" component={LanguageSelector} />
          <Stack.Screen name="company-profile" component={CompanyProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
  },
});
