import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelector from './src/screen/LanguageSelector';
import { useTranslation ,I18nextProvider} from 'react-i18next';
import Slider from './src/screen/Slider';
import './public/local/i18n.js';
import CompanyProfile from './src/screen/Company-profile';
import i18n from './public/local/i18n.js';
import InvoiceScreen from './src/screen/Invoice-m';
import NewInvoiceScreen from './src/screen/New-invoice';
import ClientScreen from './src/screen/Client-screen';
import AddClientScreen from './src/screen/Add-client';

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#2CC84D" barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Add-client" screenOptions={{ headerShown: false }}>
          {/* <Stack.Navigator initialRouteName="slider" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="slider" component={Slider} />
            <Stack.Screen name="language-selector" component={LanguageSelector} />
            <Stack.Screen name="company-profile" component={CompanyProfile} />
            <Stack.Screen name="Invoice-m" component={InvoiceScreen}/>
            <Stack.Screen name="New-invoice" component={NewInvoiceScreen}/> */}
            {/* <Stack.Screen name="Client-Screen" component={ClientScreen}/> */}
            <Stack.Screen name="Add-client" component={AddClientScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
  },
});


// App.js
// import './public/local/i18n.js';
// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { useTranslation } from 'react-i18next';

// const App = () => {
//   const { t, i18n } = useTranslation();

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>{t('welcome')}</Text>
//       <Button title="Switch to Hindi" onPress={() => i18n.changeLanguage('hi')} />
//     </View>
//   );
// };

// export default App;
