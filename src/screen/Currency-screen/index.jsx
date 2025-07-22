import React, { useState, useContext, createContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale,verticalScale,moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Context to share selected currency across the app
const CurrencyContext = createContext();

const currencyList = [
  { country: 'Afghanistan', symbol: '$', code: 'AFN' },
  { country: 'India', symbol: '₹', code: 'INR' },
  { country: 'USA', symbol: '$', code: 'USD' },
  { country: 'Europe', symbol: '€', code: 'EUR' },
  { country: 'Japan', symbol: '¥', code: 'JPY' },
  { country: 'UK', symbol: '£', code: 'GBP' },
].sort((a, b) => a.country.localeCompare(b.country));


const CurrencySelectorScreen = () => {
  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext);
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#DFFFD6', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={styles.inner}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Currency</Text>
      </View>
        <View style={styles.listBox}>
          <FlatList
            data={currencyList}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => {
              const isSelected = selectedCurrency?.code === item.code;

              return (
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => setSelectedCurrency(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: isSelected ? '#00C851' : '#000' },
                    ]}
                  >
                    {item.country}
                  </Text>

                  <Text
                    style={[
                      styles.optionText,
                      { color: isSelected ? '#00C851' : '#000' },
                    ]}
                  >
                    {item.symbol}
                  </Text>

                  <Text
                    style={[
                      styles.optionText,
                      { color: isSelected ? '#00C851' : '#000' },
                    ]}
                  >
                    {item.code}
                  </Text>

                  <Image
                    source={require('../../../assets/screen-27/select.png')}
                    style={[
                      styles.checkIcon,
                      {
                        tintColor: isSelected ? '#00C851' : '#C4C4C4',
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

// App wrapper with context
const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

const App = () => (
  <CurrencyProvider>
    <CurrencySelectorScreen />
  </CurrencyProvider>
);

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: scale(16) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(10),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    marginRight: scale(28),
    color: '#333',
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scale(20),
  },
  listBox: {
    backgroundColor: 'white',
    borderRadius: scale(10),
    padding: scale(10),
    elevation: 2,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(20),
    alignItems: 'center',
  },
  optionText: {
    fontSize: scale(16),
    flex: 1,
    textAlign: 'center',
  },
  checkIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  saveButton: {
    marginTop: scale(180),
    backgroundColor: '#00C851',
    paddingVertical: scale(12),
    borderRadius: scale(30),
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderRadius: scale(100),
    zIndex: 1,
  },
});