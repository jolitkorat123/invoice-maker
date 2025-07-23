// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Picker } from '@react-native-picker/picker';
// import { useTranslation } from 'react-i18next';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
//   const handleCountinue = () => {

//     navigation.navigate('Invoice-m');
//   }
//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.title}>{t('company_profile')}</Text>
//           </View>

//           {/* Card */}
//           <View style={styles.card}>
//             {/* Logo */}
//             <TouchableOpacity style={styles.row} onPress={pickLogo}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
//                 <Text style={styles.label}>{t('logo')}</Text>
//               </View>
//               <Text style={styles.arrow}>›</Text>
//             </TouchableOpacity>

//             {/* Company Name */}
//             <TouchableOpacity style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/cname.png')} style={styles.iconImage} />
//                 <Text style={styles.label}>{t('company_name')}</Text>
//               </View>
//               <Text style={styles.arrow}>›</Text>
//             </TouchableOpacity>

//             {/* Email */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/email.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('company_email')}
//                   value={email}
//                   onChangeText={setEmail}
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Phone */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/phone.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('company_phone')}
//                   value={phone}
//                   onChangeText={setPhone}
//                   keyboardType="phone-pad"
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Address */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/addres.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('company_address')}
//                   value={address}
//                   onChangeText={setAddress}
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Tax No */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/taxno.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('tax_number')}
//                   value={taxNo}
//                   onChangeText={setTaxNo}
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Tax Type */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/textype.png')} style={styles.iconImage} />
//                 <Picker
//                   selectedValue={taxType}
//                   onValueChange={setTaxType}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label={t('tax_types')} value="" />
//                   <Picker.Item label={t('GST')} value="gst" />
//                   <Picker.Item label={t('CGST')} value="cgst" />
//                   <Picker.Item label={t('SGST')} value="sgst" />
//                 </Picker>
//               </View>
//             </View>

//             {/* Business Nature */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/nature.png')} style={styles.iconImage} />
//                 <Picker
//                   selectedValue={businessNature}
//                   onValueChange={setBusinessNature}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label={t('nature_of_business')} value="" />
//                   <Picker.Item label={t('Retail')} value="retail" />
//                   <Picker.Item label={t('Wholesale')} value="wholesale" />
//                 </Picker>
//               </View>
//             </View>
//           </View>

//           {/* Continue Button */}
//           <TouchableOpacity style={styles.button} onPress={handleCountinue}>
//             <Text style={styles.buttonText} >{t('continue')}</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: scale(20),
//     paddingVertical: verticalScale(15),
//     justifyContent: 'space-between',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//     color: '#000',
//     marginLeft: -scale(28), // Compensates for back button width
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     paddingVertical: verticalScale(15),
//     paddingHorizontal: scale(14),
//     marginBottom: verticalScale(20),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     justifyContent: 'space-between',
//   },
//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   iconImage: {
//     width: scale(22),
//     height: scale(22),
//     marginRight: scale(12),
//     resizeMode: 'contain',
//     tintColor: '#4CD04D',
//   },
//   label: {
//     fontSize: scale(16),
//     color: '#a3a2a2ff',
//   },
//   input: {
//     fontSize: scale(16),
//     color: '#444',
//     flex: 1,
//   },
//   picker: {
//     flex: 1,
//     color: '#a3a2a2ff',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   arrow: {
//     fontSize: scale(22),
//     color: '#aaa',
//   },
//   button: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
// });

// export default CompanyProfile;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Picker } from '@react-native-picker/picker';
// import { useTranslation } from 'react-i18next';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const CompanyProfile = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const [logo, setLogo] = useState(null);

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

//   const formik = useFormik({
//     // initialValues: {
//     //   companyName: '',
//     //   email: '',
//     //   phone: '',
//     //   address: '',
//     //   taxNo: '',
//     //   taxType: '',
//     //   businessNature: '',
//     // },
//     initialValues: {
//   companyName: 'Test Co.',
//   email: 'test@example.com',
//   phone: '1234567890',
//   address: 'Some Address',
//   taxNo: 'TAX1234',
//   taxType: 'gst',
//   businessNature: 'retail',
// },

//     validationSchema: Yup.object({
//       email: Yup.string().email(t('invalid_email')).required(t('required')),
//       phone: Yup.string().required(t('required')),
//     }),
//     onSubmit: (values) => {
//       navigation.navigate('Invoice-m');
//     },
//   });

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.title}>{t('company_profile')}</Text>
//           </View>

//           {/* Card */}
//           <View style={styles.card}>
//             {/* Logo */}
//             <TouchableOpacity style={styles.row} onPress={pickLogo}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
//                 <Text style={styles.label}>{t('logo')}</Text>
//               </View>
//               <Text style={styles.arrow}>›</Text>
//             </TouchableOpacity>

//             {/* Company Name */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/cname.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('company_name')}
//                   value={formik.values.companyName}
//                   onChangeText={formik.handleChange('companyName')}
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Email */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/email.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('company_email')}
//                   value={formik.values.email}
//                   onChangeText={formik.handleChange('email')}
//                   placeholderTextColor="#aaa"
//                   keyboardType="email-address"
//                 />
//               </View>
//             </View>

//             {/* Phone */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/phone.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('company_phone')}
//                   value={formik.values.phone}
//                   onChangeText={formik.handleChange('phone')}
//                   keyboardType="phone-pad"
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Address */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/addres.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('company_address')}
//                   value={formik.values.address}
//                   onChangeText={formik.handleChange('address')}
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Tax No */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/taxno.png')} style={styles.iconImage} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder={t('tax_number')}
//                   value={formik.values.taxNo}
//                   onChangeText={formik.handleChange('taxNo')}
//                   placeholderTextColor="#aaa"
//                 />
//               </View>
//             </View>

//             {/* Tax Type */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/textype.png')} style={styles.iconImage} />
//                 <Picker
//                   selectedValue={formik.values.taxType}
//                   onValueChange={(value) => formik.setFieldValue('taxType', value)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label={t('tax_types')} value="" />
//                   <Picker.Item label={t('GST')} value="gst" />
//                   <Picker.Item label={t('CGST')} value="cgst" />
//                   <Picker.Item label={t('SGST')} value="sgst" />
//                 </Picker>
//               </View>
//             </View>

//             {/* Business Nature */}
//             <View style={styles.row}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/nature.png')} style={styles.iconImage} />
//                 <Picker
//                   selectedValue={formik.values.businessNature}
//                   onValueChange={(value) => formik.setFieldValue('businessNature', value)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label={t('nature_of_business')} value="" />
//                   <Picker.Item label={t('Retail')} value="retail" />
//                   <Picker.Item label={t('Wholesale')} value="wholesale" />
//                 </Picker>
//               </View>
//             </View>
//           </View>

//           {/* Continue Button */}
//           <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
//             <Text style={styles.buttonText}>{t('continue')}</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: scale(20),
//     paddingVertical: verticalScale(15),
//     justifyContent: 'space-between',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//     color: '#000',
//     marginLeft: -scale(28),
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     paddingVertical: verticalScale(15),
//     paddingHorizontal: scale(14),
//     marginBottom: verticalScale(20),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     justifyContent: 'space-between',
//   },
//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   iconImage: {
//     width: scale(22),
//     height: scale(22),
//     marginRight: scale(12),
//     resizeMode: 'contain',
//     tintColor: '#4CD04D',
//   },
//   label: {
//     fontSize: scale(16),
//     color: '#a3a2a2ff',
//   },
//   input: {
//     fontSize: scale(16),
//     color: '#444',
//     flex: 1,
//   },
//   picker: {
//     flex: 1,
//     color: '#a3a2a2ff',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   arrow: {
//     fontSize: scale(22),
//     color: '#aaa',
//   },
//   button: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
// });

// export default CompanyProfile;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CompanyProfile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [logo, setLogo] = useState(null);

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

  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .min(4, 'Company name must be at least 4 characters')
      .required('Company name is required'),
    email: Yup.string()
      .email('Enter a valid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    taxNo: Yup.string()
      .matches(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})$/, 'Tax No must be GST format')
      .required('Tax No is required'),
    taxType: Yup.string().required('Tax type is required'),
    businessNature: Yup.string().required('Business nature is required'),
  });

  return (
    <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
      
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
            </TouchableOpacity>
            <Text style={styles.title}>{t('company_profile')}</Text>
          </View>
          <ScrollView>
          <Formik
            initialValues={{
              companyName: '',
              email: '',
              phone: '',
              address: '',
              taxNo: '',
              taxType: '',
              businessNature: '',
            }}
            validationSchema={validationSchema}
            onSubmit={() => navigation.navigate('Invoice-m')}
          >
            {(formik) => (
              <>
                <View style={styles.card}>
                  {/* Logo */}
                  <TouchableOpacity style={styles.row} onPress={pickLogo}>
                    <View style={styles.left}>
                      <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
                      <Text style={styles.label}>{t('logo')}</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                  </TouchableOpacity>

                  {/* Company Name */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/company-profile/cname.png')} style={styles.iconImage} />
                      <TextInput
                        style={styles.input}
                        placeholder={t('company_name')}
                        value={formik.values.companyName}
                        onChangeText={formik.handleChange('companyName')}
                        onBlur={formik.handleBlur('companyName')}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    {formik.touched.companyName && formik.errors.companyName && (
                      <Text style={styles.errorText}>{formik.errors.companyName}</Text>
                    )}
                  </View>

                  {/* Email */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/company-profile/email.png')} style={styles.iconImage} />
                      <TextInput
                        style={styles.input}
                        placeholder={t('company_email')}
                        value={formik.values.email}
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                      />
                    </View>
                    {formik.touched.email && formik.errors.email && (
                      <Text style={styles.errorText}>{formik.errors.email}</Text>
                    )}
                  </View>

                  {/* Phone */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/company-profile/phone.png')} style={styles.iconImage} />
                      <TextInput
                        style={styles.input}
                        placeholder={t('company_phone')}
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        onBlur={formik.handleBlur('phone')}
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                      />
                    </View>
                    {formik.touched.phone && formik.errors.phone && (
                      <Text style={styles.errorText}>{formik.errors.phone}</Text>
                    )}
                  </View>

                  {/* Address */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/company-profile/addres.png')} style={styles.iconImage} />
                      <TextInput
                        style={styles.input}
                        placeholder={t('company_address')}
                        value={formik.values.address}
                        onChangeText={formik.handleChange('address')}
                        onBlur={formik.handleBlur('address')}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    {formik.touched.address && formik.errors.address && (
                      <Text style={styles.errorText}>{formik.errors.address}</Text>
                    )}
                  </View>

                  {/* Tax No */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/company-profile/taxno.png')} style={styles.iconImage} />
                      <TextInput
                        style={styles.input}
                        placeholder={t('tax_number')}
                        value={formik.values.taxNo}
                        onChangeText={formik.handleChange('taxNo')}
                        onBlur={formik.handleBlur('taxNo')}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    {formik.touched.taxNo && formik.errors.taxNo && (
                      <Text style={styles.errorText}>{formik.errors.taxNo}</Text>
                    )}
                  </View>

                  {/* Tax Type */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/company-profile/textype.png')} style={styles.iconImage} />
                      <Picker
                        selectedValue={formik.values.taxType}
                        onValueChange={formik.handleChange('taxType')}
                        onBlur={formik.handleBlur('taxType')}
                        style={styles.picker}
                      >
                        <Picker.Item label={t('tax_types')} value="" />
                        <Picker.Item label={t('GST')} value="gst" />
                        <Picker.Item label={t('CGST')} value="cgst" />
                        <Picker.Item label={t('SGST')} value="sgst" />
                      </Picker>
                    </View>
                    {formik.touched.taxType && formik.errors.taxType && (
                      <Text style={styles.errorText}>{formik.errors.taxType}</Text>
                    )}
                  </View>

                  {/* Business Nature */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/company-profile/nature.png')} style={styles.iconImage} />
                      <Picker
                        selectedValue={formik.values.businessNature}
                        onValueChange={formik.handleChange('businessNature')}
                        onBlur={formik.handleBlur('businessNature')}
                        style={styles.picker}
                      >
                        <Picker.Item label={t('nature_of_business')} value="" />
                        <Picker.Item label={t('Retail')} value="retail" />
                        <Picker.Item label={t('Wholesale')} value="wholesale" />
                      </Picker>
                    </View>
                    {formik.touched.businessNature && formik.errors.businessNature && (
                      <Text style={styles.errorText}>{formik.errors.businessNature}</Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                  <Text style={styles.buttonText}>{t('continue')}</Text>
                </TouchableOpacity>
              </>
            )}
            
          </Formik>
          </ScrollView>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(10),
    position: 'sticky',
  },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
    zIndex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#000',
    marginLeft: -scale(28),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: scale(16),
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(20),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  fieldWrapper: {
    marginBottom: verticalScale(8),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconImage: {
    width: scale(22),
    height: scale(22),
    marginRight: scale(12),
    resizeMode: 'contain',
    tintColor: '#4CD04D',
  },
  label: {
    fontSize: scale(16),
    color: '#a3a2a2ff',
  },
  input: {
    fontSize: scale(16),
    color: '#444',
    flex: 1,
  },
  picker: {
    flex: 1,
    color: '#a3a2a2ff',
    fontSize: scale(16),
    marginLeft: -10,
  },
  arrow: {
    fontSize: scale(22),
    color: '#aaa',
  },
  errorText: {
    color: 'red',
    fontSize: scale(11),
    marginTop: scale(4),
    marginLeft: scale(34),
  },
  button: {
    backgroundColor: '#4CD04D',
    paddingVertical: verticalScale(14),
    borderRadius: scale(30),
    alignItems: 'center',
    marginTop: verticalScale(10),
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});

export default CompanyProfile;
