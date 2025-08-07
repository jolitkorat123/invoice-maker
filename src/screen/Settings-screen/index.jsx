// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';


// const settingsData = [
//   {
//     label: 'Business Info',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/business-info.png'),
//     navigateTo: 'BusinessInfo',
//   },
//   {
//     label: 'Templates',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/templates.png'),
//     navigateTo: 'Templates',
//     value: '7 Days',
//   },
//   {
//     label: 'Default Currency',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/default-currency.png'),
//     navigateTo: 'DefaultCurrency',
//     value: 'INR ₹',
//   },
//   {
//     label: 'Number Format',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/number-format.png'),
//     navigateTo: 'NumberFormat',
//     value: '1,00,000.00',
//   },
//   {
//     label: 'Date Format',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/date-formate.png'),
//     navigateTo: 'DateFormat',
//     value: '31/12/2025',
//   },
//   {
//     label: 'Language',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/language.png'),
//     navigateTo: 'Language',
//     value: 'Default',
//   },
//   {
//     label: 'Share App',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/share-app.png'),
//     navigateTo: 'ShareApp',
//   },
//   {
//     label: 'Rate Us',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/rate-us.png'),
//     navigateTo: 'RateUs',
//   },
//   {
//     label: 'Privacy Policy',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/privacy-policy.png'),
//     navigateTo: 'PrivacyPolicy',
//   },
//   {
//     label: 'Terms & Condition',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/terms-and-conditions.png'),
//     navigateTo: 'TermsConditions',
//   },
//   {
//     label: 'Signature',
//     icon: require('E:/react native/invoice-maker/assets/screen-24/signature.png'),
//     navigateTo: 'Signature',
//   },
// ];

// const SettingsScreen = () => {
//   const navigation = useNavigation();

//   const renderSection = (items) => (
//     <View style={styles.card}>
//       {items.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.row}
//           onPress={() => navigation.navigate(item.navigateTo)}
//         >
//           <View style={styles.rowLeft}>
//             <Image source={item.icon} style={styles.icon} />
//             <Text style={styles.label}>{item.label}</Text>
//           </View>
//           <View style={styles.rowRight}>
//             {item.value && <Text style={styles.value}>{item.value}</Text>}
//             <Text style={styles.arrow}>›</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Settings</Text>
//       {renderSection(settingsData.slice(0, 2))}
//       {renderSection(settingsData.slice(2, 9))}
//       {renderSection(settingsData.slice(9))}
//     </ScrollView>
//   );
// };

// export default SettingsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eafcef',
//     paddingHorizontal: 16,
//     paddingTop: 40,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     paddingVertical: 8,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   rowLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     height: 22,
//     width: 22,
//     resizeMode: 'contain',
//     marginRight: 12,
//   },
//   label: {
//     fontSize: 16,
//     color: '#111',
//   },
//   rowRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   value: {
//     marginRight: 8,
//     fontSize: 14,
//     color: '#777',
//   },
//   arrow: {
//     fontSize: 18,
//     color: '#ccc',
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { Ionicons } from '@expo/vector-icons';

const settingsData = [
  {
    label: 'Business Info',
    icon: require('E:/react native/invoice-maker/assets/screen-24/business-info.png'),
    navigateTo: 'BusinessInfo',
  },
  {
    label: 'Templates',
    icon: require('E:/react native/invoice-maker/assets/screen-24/templates.png'),
    navigateTo: 'Templates',
    value: ' ',
  },
  {
    label: 'Default Currency',
    icon: require('E:/react native/invoice-maker/assets/screen-24/default-currency.png'),
    navigateTo: 'Currency-screen',
    value: 'INR ₹',
  },
  {
    label: 'Number Format',
    icon: require('E:/react native/invoice-maker/assets/screen-24/number-format.png'),
    navigateTo: 'Numberformat-screen',
    value: '1,00,000.00',
  },
  {
    label: 'Date Format',
    icon: require('E:/react native/invoice-maker/assets/screen-24/date-formate.png'),
    navigateTo: 'Dateformat-screen',
    value: '31/12/2025',
  },
  {
    label: 'Language',
    icon: require('E:/react native/invoice-maker/assets/screen-24/language.png'),
    navigateTo: 'language-selector',
    value: 'Default',
  },
  {
    label: 'Share App',
    icon: require('E:/react native/invoice-maker/assets/screen-24/share-app.png'),
    navigateTo: 'ShareApp',
  },
  {
    label: 'Rate Us',
    icon: require('E:/react native/invoice-maker/assets/screen-24/rate-us.png'),
    navigateTo: 'RateUs',
  },
  {
    label: 'Privacy Policy',
    icon: require('E:/react native/invoice-maker/assets/screen-24/privacy-policy.png'),
    navigateTo: 'PrivacyPolicy',
  },
  {
    label: 'Terms & Condition',
    icon: require('E:/react native/invoice-maker/assets/screen-24/terms-and-conditions.png'),
    navigateTo: 'TermsConditions',
  },
  {
    label: 'Signature',
    icon: require('E:/react native/invoice-maker/assets/screen-24/signature.png'),
    navigateTo: 'Signature-screen',
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  const renderSection = (items) => (
    <View style={styles.card}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.row,
            index === items.length - 1 && { borderBottomWidth: 0 },
          ]}
          onPress={() => navigation.navigate(item.navigateTo)}
        >
          <View style={styles.rowLeft}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.label}>{item.label}</Text>
          </View>
          <View style={styles.rowRight}>
            {item.value && <Text style={styles.value}>{item.value}</Text>}
            <Image
  source={require('E:/react native/invoice-maker/assets/screen-24/errow.png')}
  style={styles.arrow}
/>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* 1st section - top 2 items */}
      {renderSection(settingsData.slice(0, 2))}

      {/* 2nd section - middle items */}
      {renderSection(settingsData.slice(2, 9))}

      {/* 3rd section - bottom 2 items */}
      {renderSection(settingsData.slice(9))}
    </LinearGradient>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    paddingTop: verticalScale(15),
    backgroundColor: '#f9fff9',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(10),
  },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderRadius: scale(100),
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    marginRight: scale(28),
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: '#111',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    marginRight: 8,
    fontSize: 14,
    color: '#777',
  },
  arrow: {
    width: 20,
  height: 20,
  resizeMode: 'contain',
  marginLeft: 10,
  },
});

