// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Picker } from '@react-native-picker/picker';
// import { useTranslation } from 'react-i18next';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons'; // Make sure expo install @expo/vector-icons

// const CompanyProfile = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();

//   const [logo, setLogo] = useState(null);
//   const [companyName, setCompanyName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [taxNo, setTaxNo] = useState('');
//   const [taxType, setTaxType] = useState('');
//   const [businessNature, setBusinessNature] = useState('');

//   const pickLogo = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//       selectionLimit: 1,
//     });

//     if (!result.canceled) {
//       setLogo(result.assets[0].uri);
//     }
//   };

//   return (
//     <LinearGradient colors={['#C5EFC5', '#EAFBEA', '#F9FFF9']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Header with back button */}
//         {/* <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={28} color="#2CC84D" />
//           </TouchableOpacity>
//           <Text style={styles.title}>{t('Company Profile')}</Text>
//         </View> */}
//   <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//     <Ionicons name="chevron-back" size={28} color="#2CC84D" />
//   </TouchableOpacity>
//         <View style={styles.header}>
//   <Text style={styles.title}>{t('CompanyProfile')}</Text>
// </View>


//         <View style={styles.card}>
//           {/* Logo */}
//           <TouchableOpacity style={styles.row} onPress={pickLogo}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/logo.png')}
//                 style={styles.iconImage}
//               />
//               <Text style={styles.label}>{t('Logo')}</Text>
//             </View>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>

//           {/* Company Name */}
//           <TouchableOpacity style={styles.row}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/cname.png')}
//                 style={styles.iconImage}
//               />
//               <Text style={styles.label}>{t('Company Name')}</Text>
//             </View>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>

//           {/* Email */}
//           <View style={styles.row}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/email.png')}
//                 style={styles.iconImage}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder={t('Company Email')}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholderTextColor="#aaa"
//               />
//             </View>
//           </View>

//           {/* Phone */}
//           <View style={styles.row}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/phone.png')}
//                 style={styles.iconImage}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder={t('Company Phone')}
//                 value={phone}
//                 onChangeText={setPhone}
//                 keyboardType="phone-pad"
//                 placeholderTextColor="#aaa"
//               />
//             </View>
//           </View>

//           {/* Address */}
//           <View style={styles.row}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/addres.png')}
//                 style={styles.iconImage}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder={t('Company Address')}
//                 value={address}
//                 onChangeText={setAddress}
//                 placeholderTextColor="#aaa"
//               />
//             </View>
//           </View>

//           {/* Tax No */}
//           <View style={styles.row}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/taxno.png')}
//                 style={styles.iconImage}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder={t('Tax No.')}
//                 value={taxNo}
//                 onChangeText={setTaxNo}
//                 placeholderTextColor="#aaa"
//               />
//             </View>
//           </View>

//           {/* Tax Type */}
//           <View style={styles.row}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/textype.png')}
//                 style={styles.iconImage}
//               />
//               <Picker
//                 selectedValue={taxType}
//                 onValueChange={(itemValue) => setTaxType(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label={t('Tex Type')} value="" />
//                 <Picker.Item label={t('gst')} value="gst" />
//                 <Picker.Item label={t('Cgst')} value="cgst" />
//                 <Picker.Item label={t('Sgst')} value="sgst" />
//               </Picker>
//             </View>
//           </View>

//           {/* Nature of Business */}
//           <View style={styles.row}>
//             <View style={styles.left}>
//               <Image
//                 source={require('../../../assets/company-profile/nature.png')}
//                 style={styles.iconImage}
//               />
//               <Picker
//                 selectedValue={businessNature}
//                 onValueChange={(itemValue) => setBusinessNature(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label={t('Nature of Bussiness')} value="" />
//                 <Picker.Item label={t('retail')} value="retail" />
//                 <Picker.Item label={t('wholesale')} value="wholesale" />
//               </Picker>
//             </View>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>{t('continue')}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// export default CompanyProfile;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 30,
//   },
//   header: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center', // center items horizontally
//   width: '100%',
//   marginBottom: 15,
//   marginTop: 10,
//   marginLeft:13,
//   position: 'relative',
// },

//   backButton: {
//     marginRight: 10,
//   },
//   title: {
//   fontSize: 22,
//   fontWeight: 'bold',
//   color: '#000',
//   textAlign: 'center',
//   flex: 1, // make it take full width
// },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
//   row: {
//     marginTop: 6,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 11,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     justifyContent: 'space-between',
//   },
//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   iconImage: {
//     width: 22,
//     height: 22,
//     marginRight: 12,
//     resizeMode: 'contain',
//     tintColor: '#2CC84D',
//   },
//   label: {
//     fontSize: 16,
//     color: '#aaa',
//   },
//   input: {
//     fontSize: 16,
//     color: '#aaa',
//     flex: 1,
//   },
//   picker: {
//     flex: 1,
//     marginLeft: 2,
//     color: '#aaa',
//   },
//   arrow: {
//     fontSize: 20,
//     color: '#aaa',
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#2CC84D',
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CompanyProfile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [taxNo, setTaxNo] = useState('');
  const [taxType, setTaxType] = useState('');
  const [businessNature, setBusinessNature] = useState('');

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient colors={['#C5EFC5', '#EAFBEA', '#F9FFF9']} style={styles.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#2CC84D" />
          </TouchableOpacity>
          <Text style={styles.title}>{t('Company Profile')}</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Logo */}
          <TouchableOpacity style={styles.row} onPress={pickLogo}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
              <Text style={styles.label}>{t('Logo')}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Company Name */}
          <TouchableOpacity style={styles.row}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/cname.png')} style={styles.iconImage} />
              <Text style={styles.label}>{t('Company Name')}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Email */}
          <View style={styles.row}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/email.png')} style={styles.iconImage} />
              <TextInput
                style={styles.input}
                placeholder={t('Company Email')}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.row}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/phone.png')} style={styles.iconImage} />
              <TextInput
                style={styles.input}
                placeholder={t('Company Phone')}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {/* Address */}
          <View style={styles.row}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/addres.png')} style={styles.iconImage} />
              <TextInput
                style={styles.input}
                placeholder={t('Company Address')}
                value={address}
                onChangeText={setAddress}
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {/* Tax No */}
          <View style={styles.row}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/taxno.png')} style={styles.iconImage} />
              <TextInput
                style={styles.input}
                placeholder={t('Tax No.')}
                value={taxNo}
                onChangeText={setTaxNo}
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {/* Tax Type */}
          <View style={styles.row}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/textype.png')} style={styles.iconImage} />
              <Picker
                selectedValue={taxType}
                onValueChange={setTaxType}
                style={styles.picker}
              >
                <Picker.Item label={t('Tax Type')} value="" />
                <Picker.Item label={t('GST')} value="gst" />
                <Picker.Item label={t('CGST')} value="cgst" />
                <Picker.Item label={t('SGST')} value="sgst" />
              </Picker>
            </View>
          </View>

          {/* Business Nature */}
          <View style={styles.row}>
            <View style={styles.left}>
              <Image source={require('../../../assets/company-profile/nature.png')} style={styles.iconImage} />
              <Picker
                selectedValue={businessNature}
                onValueChange={setBusinessNature}
                style={styles.picker}
              >
                <Picker.Item label={t('Nature of Business')} value="" />
                <Picker.Item label={t('Retail')} value="retail" />
                <Picker.Item label={t('Wholesale')} value="wholesale" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t('Continue')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CompanyProfile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2CC84D',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconImage: {
    width: 22,
    height: 22,
    marginRight: 12,
    resizeMode: 'contain',
    tintColor: '#2CC84D',
  },
  label: {
    fontSize: 16,
    color: '#aaa',
  },
  input: {
    fontSize: 16,
    color: '#aaa',
    flex: 1,
  },
  picker: {
    flex: 1,
    color: '#aaa',
  },
  arrow: {
    fontSize: 22,
    color: '#aaa',
  },
  button: {
    backgroundColor: '#2CC84D',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
