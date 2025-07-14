// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Image,
// } from 'react-native';

// const languages = [
//   { code: 'en', name: 'English', flag: '🇬🇧' },
//   { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
//   { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
//   { code: 'ko', name: 'Korean', flag: '🇰🇷' },
//   { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
//   { code: 'ru', name: 'Russian', flag: '🇷🇺' },
//   { code: 'fr', name: 'French', flag: '🇫🇷' },
//   { code: 'de', name: 'German', flag: '🇩🇪' },
// ];

// const LanguageSelector=()=> {
//   const [selectedLang, setSelectedLang] = useState('en');

//   const handleContinue = () => {
//     alert(Selected Language: ${selectedLang});
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.languageItem}
//       onPress={() => setSelectedLang(item.code)}
//     >
//       <Text style={styles.flag}>{item.flag}</Text>
//       <Text style={styles.languageText}>{item.name}</Text>
//       <Text style={styles.checkbox}>{selectedLang === item.code ? '✅' : '⬜'}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Choose your Language</Text>
//       <View style={styles.languageList}>
//         <FlatList
//           data={languages}
//           keyExtractor={(item) => item.code}
//           renderItem={renderItem}
//         />
//       </View>
//       <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6ffe6',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   languageList: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 10,
//     marginBottom: 20,
//   },
//   languageItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   flag: {
//     fontSize: 24,
//     marginRight: 10,
//   },
//   languageText: {
//     flex: 1,
//     fontSize: 16,
//   },
//   checkbox: {
//     fontSize: 18,
//   },
//   continueButton: {
//     backgroundColor: '#4cd964',
//     padding: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//   },
//   continueText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default LanguageSelector;
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   Image,
//   Platform,
// } from 'react-native';
// import {
//   scale,
//   verticalScale,
//   moderateScale,
// } from 'react-native-size-matters';

// const languages = [
//   { code: 'en', name: 'English', flag: require('../../../assets/flags/en.png') },
//   { code: 'hi', name: 'Hindi', flag: require('../../../assets/flags/hi.png') },
//   { code: 'id', name: 'Indonesian', flag: require('../../../assets/flags/id.png') },
//   { code: 'ko', name: 'Korean', flag: require('../../../assets/flags/ko.png') },
//   { code: 'pt', name: 'Portuguese', flag: require('../../../assets/flags/pt.png') },
//   { code: 'ru', name: 'Russian', flag: require('../../../assets/flags/ru.png') },
//   { code: 'fr', name: 'French', flag: require('../../../assets/flags/fr.png') },
//   { code: 'de', name: 'German', flag: require('../../../assets/flags/de.png') },
// ];

// const LanguageSelector = () => {
//   const [selectedLang, setSelectedLang] = useState('en');

//   const handleContinue = () => {
//     alert(`Selected Language: ${selectedLang}`);
//   };

//   const renderItem = ({ item }) => {
//     const isSelected = item.code === selectedLang;
//     return (
//       <TouchableOpacity
//         style={styles.languageItem}
//         onPress={() => setSelectedLang(item.code)}
//       >
//         <Image source={item.flag} style={styles.flag} />
//         <Text style={styles.languageText}>{item.name}</Text>

//          <Text style={styles.checkbox}>{selectedLang === item.code ? '✅' : '⬜'}</Text>
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose your Language</Text>

//       <View style={styles.card}>
//         <FlatList
//           data={languages}
//           keyExtractor={(item) => item.code}
//           renderItem={renderItem}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>

//       <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0fff0',
//     paddingHorizontal: scale(16),
//     paddingTop: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(25),
//   },
//   title: {
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: verticalScale(16),
//     color: '#111',
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: scale(14),
//     marginBottom: verticalScale(20),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   languageItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(14),
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   flag: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: scale(18),
//     marginRight: scale(12),
//   },
//   languageText: {
//     flex: 1,
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     color: '#333',
//   },
//   checkbox: {
//     width: scale(20),
//     height: scale(20),
//     resizeMode: 'contain',
//   },
//   continueButton: {
//     backgroundColor: '#2CC84D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(50),
//     alignItems: 'center',
//     marginHorizontal: scale(16),
//     marginBottom: verticalScale(10),
//   },
//   continueText: {
//     color: '#fff',
//     fontSize: moderateScale(16),
//     fontWeight: 'bold',
//   },
// });

// export default LanguageSelector;
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//working
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   Image,
//   Platform,
// } from 'react-native';
// import {
//   scale,
//   verticalScale,
//   moderateScale,
// } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';

// const languages = [
//   { code: 'en', name: 'English', flag: require('../../../assets/flags/en.png') },
//   { code: 'hi', name: 'Hindi', flag: require('../../../assets/flags/hi.png') },
//   { code: 'id', name: 'Indonesian', flag: require('../../../assets/flags/id.png') },
//   { code: 'ko', name: 'Korean', flag: require('../../../assets/flags/ko.png') },
//   { code: 'pt', name: 'Portuguese', flag: require('../../../assets/flags/pt.png') },
//   { code: 'ru', name: 'Russian', flag: require('../../../assets/flags/ru.png') },
//   { code: 'fr', name: 'French', flag: require('../../../assets/flags/fr.png') },
//   { code: 'de', name: 'German', flag: require('../../../assets/flags/de.png') },
// ];

// const LanguageSelector = () => {
//   const [selectedLang, setSelectedLang] = useState('en');

//   const handleContinue = () => {
//     navigation.navigate('company-profile'); // ✅ This works now
//   };

//   function renderItem({ item, index }) {
//     const isSelected = item.code === selectedLang;
//     const isLast = index === languages.length - 1;

//     return (
//       <TouchableOpacity
//         style={[
//           styles.languageItem,
//           isLast && { borderBottomWidth: 0 }
//         ]}
//         onPress={() => setSelectedLang(item.code)}
//       >
//         <Image source={item.flag} style={styles.flag} />
//         <Text style={styles.languageText}>{item.name}</Text>
//         <Text style={styles.checkbox}>{isSelected ? '✅' : '⬜'}</Text>
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Choose your Language</Text>

//       <View style={styles.card}>
//         <FlatList
//           data={languages}
//           keyExtractor={(item) => item.code}
//           renderItem={renderItem}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>

//       <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0fff0',
//     paddingHorizontal: scale(16),
//     paddingTop: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(25),
//   },
//   title: {
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: verticalScale(16),
//     color: '#111',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: scale(14),
//     marginBottom: verticalScale(20),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   languageItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(14),
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   flag: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: scale(18),
//     marginRight: scale(12),
//   },
//   languageText: {
//     flex: 1,
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     color: '#333',
//   },
//   checkbox: {
//     fontSize: moderateScale(18),
//   },
//   continueButton: {
//     backgroundColor: '#2CC84D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(50),
//     alignItems: 'center',
//     marginHorizontal: scale(10),
//     marginBottom: verticalScale(10),
//   },
//   continueText: {
//     color: '#fff',
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//   },
// });

// export default LanguageSelector;
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------




// 11111111
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Platform,
  Pressable, // ✅ Added this
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const languages = [
  { code: 'en', name: 'English', flag: require('../../../assets/flags/en.png') },
  { code: 'hi', name: 'Hindi', flag: require('../../../assets/flags/hi.png') },
  { code: 'id', name: 'Indonesian', flag: require('../../../assets/flags/id.png') },
  { code: 'ko', name: 'Korean', flag: require('../../../assets/flags/ko.png') },
  { code: 'pt', name: 'Portuguese', flag: require('../../../assets/flags/pt.png') },
  { code: 'ru', name: 'Russian', flag: require('../../../assets/flags/ru.png') },
  { code: 'fr', name: 'French', flag: require('../../../assets/flags/fr.png') },
  { code: 'de', name: 'German', flag: require('../../../assets/flags/de.png') },
];

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('company-profile');
  };

  const renderItem = ({ item, index }) => {
    const isSelected = item.code === selectedLang;
    const isLast = index === languages.length - 1;

    return (
      <TouchableOpacity
        style={[styles.languageItem, isLast && { borderBottomWidth: 0 }]}
        onPress={() => setSelectedLang(item.code)}
      >
        <Image source={item.flag} style={styles.flag} />
        <Text style={styles.languageText}>{item.name}</Text>
        <Text style={styles.checkbox}>{isSelected ? '✅' : '⬜'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#C5EFC5', '#EAFBEA', '#F9FFF9']}
      style={styles.container}
    >
      {/* <Text style={styles.heading}>Choose your Language</Text> */}
      <View style={styles.headingRow}>
  <Text style={styles.heading} numberOfLines={1}>
    Choose your Language
  </Text>
  <TouchableOpacity style={styles.doneButton} onPress={handleContinue}>
    <Text style={styles.doneText}>Done</Text>
  </TouchableOpacity>
</View>

      <View style={styles.card}>
        <FlatList
          data={languages}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
        />
      </View>
      <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
    </LinearGradient>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop:verticalScale(25),
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: scale(16),
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: verticalScale(16),
    color: '#111',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  flag: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    marginRight: scale(12),
  },
  languageText: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
  },
  checkbox: {
    fontSize: moderateScale(18),
  },
  continueButton: {
    backgroundColor: '#2CC84D',
    paddingVertical: verticalScale(14),
    borderRadius: scale(50),
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  continueText: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  headingRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: verticalScale(10),
  paddingHorizontal: scale(5), // Optional: spacing from sides
},

heading: {
  fontSize: moderateScale(20),
  fontWeight: 'bold',
  color: '#000',
  flexShrink: 1, // ✨ Important to prevent overflow
},

doneButton: {
  backgroundColor: '#2CC84D',
  paddingHorizontal: scale(14),
  paddingVertical: verticalScale(6),
  borderRadius: scale(30),
},

doneText: {
  color: '#fff',
  fontSize: moderateScale(14),
  fontWeight: 'bold',
},


});
