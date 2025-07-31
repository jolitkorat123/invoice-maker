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
import AddItemScreen from './src/screen/Add-item';
import InvoiceInfoScreen from'./src/screen/Invoice-info-screen';
import settingsData from'./src/screen/Settings-screen';
import NumberFormatScreen from './src/screen/Numberformat-screen';
import DateFormatScreen from './src/screen/Dateformat-screen';
import CurrencySelectorScreen from './src/screen/Currency-screen';
import SignatureScreenComponent from './src/screen/Signature-screen';
import LineChart from './src/screen/Chart/lineChart/index.jsx';
import BarChart from './src/screen/Chart/barChart/index.jsx';



const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#2CC84D" barStyle="light-content" />
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="lineChart" screenOptions={{ headerShown: false }}> */}
          <Stack.Navigator initialRouteName="slider" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="slider" component={Slider} />
            <Stack.Screen name="language-selector" component={LanguageSelector} />
            <Stack.Screen name="company-profile" component={CompanyProfile} />
            <Stack.Screen name="Invoice-m" component={InvoiceScreen}/>
            <Stack.Screen name="New-invoice" component={NewInvoiceScreen}/>
            <Stack.Screen name="Client-Screen" component={ClientScreen}/>
            <Stack.Screen name="Add-client" component={AddClientScreen}/>
            <Stack.Screen name="Add-item" component={AddItemScreen}/>
            <Stack.Screen name="Invoice-info-screen" component={InvoiceInfoScreen}/>
            <Stack.Screen name="Settings-screen" component={settingsData}/>
            <Stack.Screen name="Numberformat-screen" component={NumberFormatScreen}/>
            <Stack.Screen name="Dateformat-screen" component={DateFormatScreen}/>
            <Stack.Screen name="Currency-screen" component={CurrencySelectorScreen}/>
            <Stack.Screen name="Signature-screen" component={SignatureScreenComponent}/>
            <Stack.Screen name="barChart" component={BarChart}/>
            <Stack.Screen name="lineChart" component={LineChart}/>
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
