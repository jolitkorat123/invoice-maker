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



//working 25/7
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
// import { Formik } from 'formik';
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

//   const validationSchema = Yup.object().shape({
//     companyName: Yup.string()
//       .min(4, 'Company name must be at least 4 characters')
//       .required('Company name is required'),
//     email: Yup.string()
//       .email('Enter a valid email address')
//       .required('Email is required'),
//     phone: Yup.string()
//       .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
//       .required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     taxNo: Yup.string()
//       .matches(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})$/, 'Tax No must be GST format')
//       .required('Tax No is required'),
//     taxType: Yup.string().required('Tax type is required'),
//     businessNature: Yup.string().required('Business nature is required'),
//   });

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
      
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.title}>{t('company_profile')}</Text>
//           </View>
//           <ScrollView>
//           <Formik
//             // initialValues={{
//             //   companyName: '',
//             //   email: '',
//             //   phone: '',
//             //   address: '',
//             //   taxNo: '',
//             //   taxType: '',
//             //   businessNature: '',
//             // }}
//             initialValues= {{
//   companyName: 'Test Co.',
//   email: 'test@example.com',
//   phone: '1234567890',
//   address: 'Some Address',
//   taxNo: '09AAACH7409R1ZZ',
//   taxType: 'gst',
//   businessNature: 'retail',
// }}
//             validationSchema={validationSchema}
//             onSubmit={() => navigation.navigate('Invoice-m')}
//           >
//             {(formik) => (
//               <>
//                 <View style={styles.card}>
//                   {/* Logo */}
//                   <TouchableOpacity style={styles.row} onPress={pickLogo}>
//                     <View style={styles.left}>
//                       <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
//                       <Text style={styles.label}>{t('logo')}</Text>
//                     </View>
//                     <Text style={styles.arrow}>›</Text>
//                   </TouchableOpacity>

//                   {/* Company Name */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={require('../../../assets/company-profile/company.png')} style={styles.iconImage} />
//                       <TextInput
//                         style={styles.input}
//                         placeholder={t('company_name')}
//                         value={formik.values.companyName}
//                         onChangeText={formik.handleChange('companyName')}
//                         onBlur={formik.handleBlur('companyName')}
//                         placeholderTextColor="#aaa"
//                       />
//                     </View>
//                     {formik.touched.companyName && formik.errors.companyName && (
//                       <Text style={styles.errorText}>{formik.errors.companyName}</Text>
//                     )}
//                   </View>

//                   {/* Email */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={require('../../../assets/company-profile/email.png')} style={styles.iconImage} />
//                       <TextInput
//                         style={styles.input}
//                         placeholder={t('company_email')}
//                         value={formik.values.email}
//                         onChangeText={formik.handleChange('email')}
//                         onBlur={formik.handleBlur('email')}
//                         placeholderTextColor="#aaa"
//                         keyboardType="email-address"
//                       />
//                     </View>
//                     {formik.touched.email && formik.errors.email && (
//                       <Text style={styles.errorText}>{formik.errors.email}</Text>
//                     )}
//                   </View>

//                   {/* Phone */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={require('../../../assets/company-profile/phone.png')} style={styles.iconImage} />
//                       <TextInput
//                         style={styles.input}
//                         placeholder={t('company_phone')}
//                         value={formik.values.phone}
//                         onChangeText={formik.handleChange('phone')}
//                         onBlur={formik.handleBlur('phone')}
//                         placeholderTextColor="#aaa"
//                         keyboardType="phone-pad"
//                       />
//                     </View>
//                     {formik.touched.phone && formik.errors.phone && (
//                       <Text style={styles.errorText}>{formik.errors.phone}</Text>
//                     )}
//                   </View>

//                   {/* Address */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={require('../../../assets/company-profile/addres.png')} style={styles.iconImage} />
//                       <TextInput
//                         style={styles.input}
//                         placeholder={t('company_address')}
//                         value={formik.values.address}
//                         onChangeText={formik.handleChange('address')}
//                         onBlur={formik.handleBlur('address')}
//                         placeholderTextColor="#aaa"
//                       />
//                     </View>
//                     {formik.touched.address && formik.errors.address && (
//                       <Text style={styles.errorText}>{formik.errors.address}</Text>
//                     )}
//                   </View>

//                   {/* Tax No */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={require('../../../assets/company-profile/taxno.png')} style={styles.iconImage} />
//                       <TextInput
//                         style={styles.input}
//                         placeholder={t('tax_number')}
//                         value={formik.values.taxNo}
//                         onChangeText={formik.handleChange('taxNo')}
//                         onBlur={formik.handleBlur('taxNo')}
//                         placeholderTextColor="#aaa"
//                       />
//                     </View>
//                     {formik.touched.taxNo && formik.errors.taxNo && (
//                       <Text style={styles.errorText}>{formik.errors.taxNo}</Text>
//                     )}
//                   </View>

//                   {/* Tax Type */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={require('../../../assets/company-profile/textype.png')} style={styles.iconImage} />
//                       <Picker
//                         selectedValue={formik.values.taxType}
//                         onValueChange={formik.handleChange('taxType')}
//                         onBlur={formik.handleBlur('taxType')}
//                         style={styles.picker}
//                       >
//                         <Picker.Item label={t('tax_types')} value="" />
//                         <Picker.Item label={t('GST')} value="gst" />
//                         <Picker.Item label={t('CGST')} value="cgst" />
//                         <Picker.Item label={t('SGST')} value="sgst" />
//                       </Picker>
//                     </View>
//                     {formik.touched.taxType && formik.errors.taxType && (
//                       <Text style={styles.errorText}>{formik.errors.taxType}</Text>
//                     )}
//                   </View>

//                   {/* Business Nature */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={require('../../../assets/company-profile/nature.png')} style={styles.iconImage} />
//                       <Picker
//                         selectedValue={formik.values.businessNature}
//                         onValueChange={formik.handleChange('businessNature')}
//                         onBlur={formik.handleBlur('businessNature')}
//                         style={styles.picker}
//                       >
//                         <Picker.Item label={t('nature_of_business')} value="" />
//                         <Picker.Item label={t('Retail')} value="retail" />
//                         <Picker.Item label={t('Wholesale')} value="wholesale" />
//                       </Picker>
//                     </View>
//                     {formik.touched.businessNature && formik.errors.businessNature && (
//                       <Text style={styles.errorText}>{formik.errors.businessNature}</Text>
//                     )}
//                   </View>
//                 </View>

//                 <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
//                   <Text style={styles.buttonText}>{t('continue')}</Text>
//                 </TouchableOpacity>
//               </>
//             )}
            
//           </Formik>
//           </ScrollView>
//         </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: {
//     flex: 1,
//     paddingHorizontal: scale(20),
//     paddingVertical: verticalScale(15),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//     position: 'sticky',
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
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     paddingVertical: verticalScale(15),
//     paddingHorizontal: scale(14),
//     marginBottom: verticalScale(20),
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     justifyContent: 'space-between',
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   fieldWrapper: {
//     marginBottom: verticalScale(8),
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
//   errorText: {
//     color: 'red',
//     fontSize: scale(11),
//     marginTop: scale(4),
//     marginLeft: scale(34),
//   },
//   button: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//     elevation: 1,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
// });

// export default CompanyProfile;

// index.jsx
//27-07
// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, TextInput, StyleSheet, TouchableOpacity,
//   Image, Platform, ScrollView, Keyboard,
//   TouchableWithoutFeedback, KeyboardAvoidingView, Alert
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { 
//   createCompanyTable, 
//   insertCompany, 
//   getLatestCompany 
// } from './company';

// const validationSchema = Yup.object().shape({
//   companyName: Yup.string()
//     .required('Company name is required')
//     .min(2, 'Too short!'),
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Email is required'),
//   phone: Yup.string()
//     .required('Phone is required')
//     .matches(/^[0-9]{10,15}$/, 'Invalid phone number'),
//   address: Yup.string()
//     .required('Address is required'),
//   taxNo: Yup.string()
//     .when('taxType', {
//       is: (taxType) => taxType && taxType !== '',
//       then: Yup.string().required('Tax number is required when tax type is selected'),
//       otherwise: Yup.string()
//     }),
// });

// const CompanyProfile = ({ navigation }) => {
//   const [logo, setLogo] = useState(null);
//   const [initialValues, setInitialValues] = useState({
//     companyName: '',
//     email: '',
//     phone: '',
//     address: '',
//     taxNo: '',
//     taxType: '',
//     businessNature: ''
//   });

//   useEffect(() => {
//     // Initialize database and check for existing company data
//     const init = async () => {
//       await createCompanyTable();
//       const existingCompany = await getLatestCompany();
//       if (existingCompany) {
//         setInitialValues({
//           companyName: existingCompany.companyName,
//           email: existingCompany.email,
//           phone: existingCompany.phone,
//           address: existingCompany.address,
//           taxNo: existingCompany.taxNo || '',
//           taxType: existingCompany.taxType || '',
//           businessNature: existingCompany.businessNature || ''
//         });
//         if (existingCompany.logo) {
//           setLogo(existingCompany.logo);
//         }
//       }
//     };
//     init();
//   }, []);

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission required', 'We need access to your photos to select a logo');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       setLogo(result.assets[0].uri);
//     }
//   };

//   const handleSubmit = async (values) => {
//     try {
//       await insertCompany({
//         ...values,
//         logo: logo || null
//       });
//       navigation.navigate('Invoice-m');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to save company profile');
//       console.error('Database error:', error);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//       >
//         <ScrollView 
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Text style={styles.heading}>Company Profile</Text>
          
//           <TouchableOpacity style={styles.logoPicker} onPress={pickImage}>
//             {logo ? (
//               <Image source={{ uri: logo }} style={styles.logoImage} />
//             ) : (
//               <View style={styles.logoPlaceholder}>
//                 <Text style={styles.logoText}>+ Add Logo</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//               <View style={styles.formContainer}>
//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Company Name*</Text>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleChange('companyName')}
//                     onBlur={handleBlur('companyName')}
//                     value={values.companyName}
//                     placeholder="Enter company name"
//                   />
//                   {touched.companyName && errors.companyName && (
//                     <Text style={styles.errorText}>{errors.companyName}</Text>
//                   )}
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Email*</Text>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleChange('email')}
//                     onBlur={handleBlur('email')}
//                     value={values.email}
//                     placeholder="Enter email"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                   {touched.email && errors.email && (
//                     <Text style={styles.errorText}>{errors.email}</Text>
//                   )}
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Phone*</Text>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleChange('phone')}
//                     onBlur={handleBlur('phone')}
//                     value={values.phone}
//                     placeholder="Enter phone number"
//                     keyboardType="phone-pad"
//                   />
//                   {touched.phone && errors.phone && (
//                     <Text style={styles.errorText}>{errors.phone}</Text>
//                   )}
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Address*</Text>
//                   <TextInput
//                     style={[styles.input, styles.multilineInput]}
//                     onChangeText={handleChange('address')}
//                     onBlur={handleBlur('address')}
//                     value={values.address}
//                     placeholder="Enter address"
//                     multiline
//                     numberOfLines={3}
//                   />
//                   {touched.address && errors.address && (
//                     <Text style={styles.errorText}>{errors.address}</Text>
//                   )}
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Tax Number</Text>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleChange('taxNo')}
//                     onBlur={handleBlur('taxNo')}
//                     value={values.taxNo}
//                     placeholder="Enter tax number"
//                   />
//                   {touched.taxNo && errors.taxNo && (
//                     <Text style={styles.errorText}>{errors.taxNo}</Text>
//                   )}
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Tax Type</Text>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleChange('taxType')}
//                     onBlur={handleBlur('taxType')}
//                     value={values.taxType}
//                     placeholder="Enter tax type"
//                   />
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>Nature of Business</Text>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleChange('businessNature')}
//                     onBlur={handleBlur('businessNature')}
//                     value={values.businessNature}
//                     placeholder="Enter nature of business"
//                   />
//                 </View>

//                 <TouchableOpacity 
//                   style={styles.submitButton} 
//                   onPress={handleSubmit}
//                 >
//                   <Text style={styles.submitButtonText}>Save Company Profile</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </Formik>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   scrollContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//     textAlign: 'center',
//   },
//   logoPicker: {
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   logoPlaceholder: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#e1e1e1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   logoText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   logoImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     marginBottom: 5,
//     fontWeight: '500',
//     color: '#444',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 6,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   multilineInput: {
//     minHeight: 80,
//     textAlignVertical: 'top',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//   },
//   submitButton: {
//     backgroundColor: '#4CD04D',
//     padding: 15,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default CompanyProfile;


// import React, { useState,useEffect } from 'react';
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
// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabaseAsync('appdata.db');

// const CompanyProfile = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const [logo, setLogo] = useState(null);

//    // Create table on load
//   useEffect(() => {
//     createTable();
//   }, []);

//   const createTable = async () => {
//     console.log("Creating Users table...");
//     const db2 = await SQLite.openDatabaseAsync('appdata.db');
// //     const dataVal = await db2.execAsync(`
// // PRAGMA journal_mode = WAL;
// // CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
// // INSERT INTO test (value, intValue) VALUES ('test1', 123);
// // INSERT INTO test (value, intValue) VALUES ('test2', 456);
// // INSERT INTO test (value, intValue) VALUES ('test3', 789);
// // `);
// //  const db2 = await SQLite.openDatabaseAsync('appdata.db');
//     const result = await db2.getAllAsync(`SELECT * FROM test`);
//     console.log("Test table data:", result);

// // console.log("✅ Table created", dataVal);
    
//   };

//   const saveToDatabase = (values) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `INSERT INTO Users (Logo, C_NAME, Email, Phone, Address, Tax_no, Tax_type, B_type)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           logo || '',
//           values.companyName,
//           values.email,
//           values.phone,
//           values.address,
//           values.taxNo,
//           values.taxType,
//           values.businessNature,
//         ],
//         (_, result) => {
//           console.log("✅ Data saved", result);
//           navigation.navigate('Invoice-m');
//         },
//         (_, error) => {
//           console.log("❌ Insert failed", error);
//           return false;
//         }
//       );
//     });
//   };
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

// import React, { useState, useEffect } from 'react';
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
// import * as SQLite from 'expo-sqlite';

// const CompanyProfile = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const [logo, setLogo] = useState(null);
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       const openedDb = await SQLite.openDatabaseAsync('appdata.db');
//       setDb(openedDb);
//       await openedDb.execAsync(`
//         PRAGMA journal_mode = WAL;
//         CREATE TABLE IF NOT EXISTS Users (
//           ID INTEGER PRIMARY KEY AUTOINCREMENT,
//           Logo TEXT,
//           C_NAME TEXT,
//           Email TEXT,
//           Phone TEXT,
//           Address TEXT,
//           Tax_no TEXT,
//           Tax_type TEXT,
//           B_type TEXT
//         );
//       `);
//     };
//     initDb();
//   }, []);

//   const saveToDatabase = async (values) => {
//     if (!db) {
//       console.log("❌ Database not ready yet");
//       return;
//     }

//     try {
//       await db.runAsync(
//         `INSERT INTO Users (Logo, C_NAME, Email, Phone, Address, Tax_no, Tax_type, B_type)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           logo || '',
//           values.companyName,
//           values.email,
//           values.phone,
//           values.address,
//           values.taxNo,
//           values.taxType,
//           values.businessNature,
//         ]
//       );
//       console.log("✅ Data saved successfully");
//       navigation.navigate('Invoice-m');
//     } catch (error) {
//       console.log("❌ Insert failed", error);
//     }
//   };

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
//     initialValues: {
//       companyName: 'Test Co.',
//       email: 'test@example.com',
//       phone: '1234567890',
//       address: 'Some Address',
//       taxNo: 'TAX1234',
//       taxType: 'gst',
//       businessNature: 'retail',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email(t('invalid_email')).required(t('required')),
//       phone: Yup.string().required(t('required')),
//     }),
//     onSubmit: (values) => {
//       saveToDatabase(values);
//     },
//   });

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.title}>{t('company_profile')}</Text>
//           </View>

//           <View style={styles.card}>
//             <TouchableOpacity style={styles.row} onPress={pickLogo}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
//                 <Text style={styles.label}>{t('logo')}</Text>
//               </View>
//               <Text style={styles.arrow}>›</Text>
//             </TouchableOpacity>

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
//data working code

// import React, { useState, useEffect } from 'react';
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
// import * as SQLite from 'expo-sqlite';

// const CompanyProfile = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const [logo, setLogo] = useState(null);
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       const openedDb = await SQLite.openDatabaseAsync('appdata.db');
//       setDb(openedDb);
//       await openedDb.execAsync(`
//         PRAGMA journal_mode = WAL;
//         CREATE TABLE IF NOT EXISTS Users (
//           ID INTEGER PRIMARY KEY AUTOINCREMENT,
//           Logo TEXT,
//           C_NAME TEXT,
//           Email TEXT,
//           Phone TEXT,
//           Address TEXT,
//           Tax_no TEXT,
//           Tax_type TEXT,
//           B_type TEXT
//         );
//       `);
//     };
//     initDb();
//   }, []);

//   const saveToDatabase = async (values) => {
//     if (!db) {
//       console.log("❌ Database not ready yet");
//       return;
//     }

//     try {
//       await db.runAsync(
//         `INSERT INTO Users (Logo, C_NAME, Email, Phone, Address, Tax_no, Tax_type, B_type)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           logo || '',
//           values.companyName,
//           values.email,
//           values.phone,
//           values.address,
//           values.taxNo,
//           values.taxType,
//           values.businessNature,
//         ]
//       );
//       console.log("✅ Data saved successfully");
//       navigation.navigate('Invoice-m');
//     } catch (error) {
//       console.log("❌ Insert failed", error);
//     }
//   };

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
//     initialValues: {
//       companyName: '',
//       email: '',
//       phone: '',
//       address: '',
//       taxNo: '',
//       taxType: '',
//       businessNature: '',
//     },
//     validationSchema: Yup.object({
//       companyName: Yup.string().required(t('required')),
//       email: Yup.string().email(t('invalid_email')).required(t('required')),
//       phone: Yup.string().required(t('required')),
//       address: Yup.string().required(t('required')),
//       taxNo: Yup.string().required(t('required')),
//       taxType: Yup.string().required(t('required')),
//       businessNature: Yup.string().required(t('required')),
//     }),
//     onSubmit: (values) => {
//       saveToDatabase(values);
//     },
//   });

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.title}>{t('company_profile')}</Text>
//           </View>

//           <View style={styles.card}>
//             <TouchableOpacity style={styles.row} onPress={pickLogo}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
//                 <Text style={styles.label}>{t('logo')}</Text>
//               </View>
//               <Text style={styles.arrow}>›</Text>
//             </TouchableOpacity>

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

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Alert,
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
// import * as SQLite from 'expo-sqlite';

// const CompanyProfile = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const [logo, setLogo] = useState(null);
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       const openedDb = await SQLite.openDatabaseAsync('appdata.db');
//       setDb(openedDb);
//       await openedDb.execAsync(`
//         PRAGMA journal_mode = WAL;
//         CREATE TABLE IF NOT EXISTS Users (
//           ID INTEGER PRIMARY KEY AUTOINCREMENT,
//           Logo TEXT,
//           C_NAME TEXT,
//           Email TEXT,
//           Phone TEXT,
//           Address TEXT,
//           Tax_no TEXT,
//           Tax_type TEXT,
//           B_type TEXT
//         );
//       `);
//     };
//     initDb();
//   }, []);

//   const saveToDatabase = async (values) => {
//     if (!db) {
//       console.log("❌ Database not ready yet");
//       return;
//     }

//     const formData = {
//       Logo: logo || '',
//       C_NAME: values.companyName,
//       Email: values.email,
//       Phone: values.phone,
//       Address: values.address,
//       Tax_no: values.taxNo,
//       Tax_type: values.taxType,
//       B_type: values.businessNature,
//     };

//     console.log("📝 Saving this data to SQLite:");
//     console.table(formData);

//     try {
//       await db.runAsync(
//         `INSERT INTO Users (Logo, C_NAME, Email, Phone, Address, Tax_no, Tax_type, B_type)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         Object.values(formData)
//       );

//       console.log("✅ Data saved successfully");

//       Alert.alert('Success', 'Company profile saved successfully!', [
//         { text: 'OK', onPress: () => navigation.navigate('Invoice-m') },
//       ]);
//     } catch (error) {
//       console.log("❌ Insert failed", error);
//       Alert.alert('Error', 'Failed to save data.');
//     }
//   };

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
//     initialValues: {
//       companyName: '',
//       email: '',
//       phone: '',
//       address: '',
//       taxNo: '',
//       taxType: '',
//       businessNature: '',
//     },
//     validationSchema: Yup.object({
//       companyName: Yup.string().required(t('required')),
//       email: Yup.string().email(t('invalid_email')).required(t('required')),
//       phone: Yup.string().required(t('required')),
//       address: Yup.string().required(t('required')),
//       taxNo: Yup.string().required(t('required')),
//       taxType: Yup.string().required(t('required')),
//       businessNature: Yup.string().required(t('required')),
//     }),
//     onSubmit: (values) => {
//       saveToDatabase(values);
//     },
//   });

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.title}>{t('company_profile')}</Text>
//           </View>

//           <View style={styles.card}>
//             <TouchableOpacity style={styles.row} onPress={pickLogo}>
//               <View style={styles.left}>
//                 <Image source={require('../../../assets/company-profile/logo.png')} style={styles.iconImage} />
//                 <Text style={styles.label}>{t('logo')}</Text>
//               </View>
//               <Text style={styles.arrow}>›</Text>
//             </TouchableOpacity>

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
//fully working
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Picker } from '@react-native-picker/picker';
// import { useTranslation } from 'react-i18next';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as SQLite from 'expo-sqlite';

// // Import all icon images
// import logoIcon from '../../../assets/company-profile/logo.png';
// import cnameIcon from '../../../assets/company-profile/company.png';
// import emailIcon from '../../../assets/company-profile/email.png';
// import phoneIcon from '../../../assets/company-profile/phone.png';
// import addressIcon from '../../../assets/company-profile/addres.png';
// import taxnoIcon from '../../../assets/company-profile/taxno.png';
// import textypeIcon from '../../../assets/company-profile/textype.png';
// import natureIcon from '../../../assets/company-profile/nature.png';

// const iconMap = {
//   'logo.png': logoIcon,
//   'cname.png': cnameIcon,
//   'email.png': emailIcon,
//   'phone.png': phoneIcon,
//   'addres.png': addressIcon,
//   'taxno.png': taxnoIcon,
//   'textype.png': textypeIcon,
//   'nature.png': natureIcon,
// };

// const CompanyProfile = () => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const [logo, setLogo] = useState(null);
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       const openedDb = await SQLite.openDatabaseAsync('appdata.db');
//       setDb(openedDb);
//       await openedDb.execAsync(`
//         PRAGMA journal_mode = WAL;
//         CREATE TABLE IF NOT EXISTS Users (
//           ID INTEGER PRIMARY KEY AUTOINCREMENT,
//           Logo TEXT,
//           C_NAME TEXT,
//           Email TEXT,
//           Phone TEXT,
//           Address TEXT,
//           Tax_no TEXT,
//           Tax_type TEXT,
//           B_type TEXT
//         );
//       `);
//     };
//     initDb();
//   }, []);

//   const saveToDatabase = async (values) => {
//     if (!db) {
//       console.log("❌ Database not ready yet");
//       return;
//     }

//     const formData = {
//       Logo: logo || '',
//       C_NAME: values.companyName,
//       Email: values.email,
//       Phone: values.phone,
//       Address: values.address,
//       Tax_no: values.taxNo,
//       Tax_type: values.taxType,
//       B_type: values.businessNature,
//     };

//     console.log("📝 Saving this data to SQLite:");
//     console.table(formData);

//     try {
//       await db.runAsync(
//         `INSERT INTO Users (Logo, C_NAME, Email, Phone, Address, Tax_no, Tax_type, B_type)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         Object.values(formData)
//       );

//       console.log("✅ Data saved successfully");

//       Alert.alert('Success', 'Company profile saved successfully!', [
//         { text: 'OK', onPress: () => navigation.navigate('Invoice-m') },
//       ]);
//     } catch (error) {
//       console.log("❌ Insert failed", error);
//       Alert.alert('Error', 'Failed to save data.');
//     }
//   };

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

//   const validationSchema = Yup.object().shape({
//     companyName: Yup.string()
//       .min(4, 'Company name must be at least 4 characters')
//       .required('Company name is required'),
//     email: Yup.string()
//       .email('Enter a valid email address')
//       .required('Email is required'),
//     phone: Yup.string()
//       .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
//       .required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     taxNo: Yup.string()
//       .matches(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})$/, 'Tax No must be GST format')
//       .required('Tax No is required'),
//     taxType: Yup.string().required('Tax type is required'),
//     businessNature: Yup.string().required('Business nature is required'),
//   });

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.title}>{t('company_profile')}</Text>
//         </View>

//         <ScrollView>
//           <Formik
//             initialValues={{
//               companyName: '',
//               email: '',
//               phone: '',
//               address: '',
//               taxNo: '',
//               taxType: '',
//               businessNature: '',
//             }}
//             validationSchema={validationSchema}
//             onSubmit={saveToDatabase}
//           >
//             {(formik) => (
//               <>
//                 <View style={styles.card}>
//                   <TouchableOpacity style={styles.row} onPress={pickLogo}>
//                     <View style={styles.left}>
//                       <Image source={logoIcon} style={styles.iconImage} />
//                       <Text style={styles.label}>{t('logo')}</Text>
//                     </View>
//                     <Text style={styles.arrow}>›</Text>
//                   </TouchableOpacity>

//                   {/* Fields */}
//                   {[
//                     {
//                       icon: 'cname.png',
//                       placeholder: t('company_name'),
//                       value: formik.values.companyName,
//                       onChange: formik.handleChange('companyName'),
//                       onBlur: formik.handleBlur('companyName'),
//                       error: formik.errors.companyName,
//                       touched: formik.touched.companyName,
//                     },
//                     {
//                       icon: 'email.png',
//                       placeholder: t('company_email'),
//                       value: formik.values.email,
//                       onChange: formik.handleChange('email'),
//                       onBlur: formik.handleBlur('email'),
//                       error: formik.errors.email,
//                       touched: formik.touched.email,
//                       keyboardType: 'email-address',
//                     },
//                     {
//                       icon: 'phone.png',
//                       placeholder: t('company_phone'),
//                       value: formik.values.phone,
//                       onChange: formik.handleChange('phone'),
//                       onBlur: formik.handleBlur('phone'),
//                       error: formik.errors.phone,
//                       touched: formik.touched.phone,
//                       keyboardType: 'phone-pad',
//                     },
//                     {
//                       icon: 'addres.png',
//                       placeholder: t('company_address'),
//                       value: formik.values.address,
//                       onChange: formik.handleChange('address'),
//                       onBlur: formik.handleBlur('address'),
//                       error: formik.errors.address,
//                       touched: formik.touched.address,
//                     },
//                     {
//                       icon: 'taxno.png',
//                       placeholder: t('tax_number'),
//                       value: formik.values.taxNo,
//                       onChange: formik.handleChange('taxNo'),
//                       onBlur: formik.handleBlur('taxNo'),
//                       error: formik.errors.taxNo,
//                       touched: formik.touched.taxNo,
//                     },
//                   ].map((field, idx) => (
//                     <View key={idx} style={styles.fieldWrapper}>
//                       <View style={styles.inputRow}>
//                         <Image
//                           source={iconMap[field.icon]}
//                           style={styles.iconImage}
//                         />
//                         <TextInput
//                           style={styles.input}
//                           placeholder={field.placeholder}
//                           value={field.value}
//                           onChangeText={field.onChange}
//                           onBlur={field.onBlur}
//                           placeholderTextColor="#aaa"
//                           keyboardType={field.keyboardType || 'default'}
//                         />
//                       </View>
//                       {field.touched && field.error && (
//                         <Text style={styles.errorText}>{field.error}</Text>
//                       )}
//                     </View>
//                   ))}

//                   {/* Tax Type */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={textypeIcon} style={styles.iconImage} />
//                       <Picker
//                         selectedValue={formik.values.taxType}
//                         onValueChange={formik.handleChange('taxType')}
//                         style={styles.picker}
//                       >
//                         <Picker.Item label={t('tax_types')} value="" />
//                         <Picker.Item label={t('GST')} value="gst" />
//                         <Picker.Item label={t('CGST')} value="cgst" />
//                         <Picker.Item label={t('SGST')} value="sgst" />
//                       </Picker>
//                     </View>
//                     {formik.touched.taxType && formik.errors.taxType && (
//                       <Text style={styles.errorText}>{formik.errors.taxType}</Text>
//                     )}
//                   </View>

//                   {/* Business Nature */}
//                   <View style={styles.fieldWrapper}>
//                     <View style={styles.inputRow}>
//                       <Image source={natureIcon} style={styles.iconImage} />
//                       <Picker
//                         selectedValue={formik.values.businessNature}
//                         onValueChange={formik.handleChange('businessNature')}
//                         style={styles.picker}
//                       >
//                         <Picker.Item label={t('nature_of_business')} value="" />
//                         <Picker.Item label={t('Retail')} value="retail" />
//                         <Picker.Item label={t('Wholesale')} value="wholesale" />
//                       </Picker>
//                     </View>
//                     {formik.touched.businessNature && formik.errors.businessNature && (
//                       <Text style={styles.errorText}>{formik.errors.businessNature}</Text>
//                     )}
//                   </View>
//                 </View>

//                 <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
//                   <Text style={styles.buttonText}>{t('continue')}</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </Formik>
//         </ScrollView>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: {
//     flex: 1,
//     paddingHorizontal: scale(20),
//     paddingVertical: verticalScale(15),
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
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     paddingVertical: verticalScale(15),
//     paddingHorizontal: scale(14),
//     marginBottom: verticalScale(20),
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     justifyContent: 'space-between',
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   fieldWrapper: {
//     marginBottom: verticalScale(8),
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
//   errorText: {
//     color: 'red',
//     fontSize: scale(11),
//     marginTop: scale(4),
//     marginLeft: scale(34),
//   },
//   button: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//     elevation: 1,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
// });

// export default CompanyProfile;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
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
import * as SQLite from 'expo-sqlite';

// Import all icon images
import logoIcon from '../../../assets/company-profile/logo.png';
import cnameIcon from '../../../assets/company-profile/company.png';
import emailIcon from '../../../assets/company-profile/email.png';
import phoneIcon from '../../../assets/company-profile/phone.png';
import addressIcon from '../../../assets/company-profile/addres.png';
import taxnoIcon from '../../../assets/company-profile/taxno.png';
import textypeIcon from '../../../assets/company-profile/textype.png';
import natureIcon from '../../../assets/company-profile/nature.png';

const iconMap = {
  'logo.png': logoIcon,
  'cname.png': cnameIcon,
  'email.png': emailIcon,
  'phone.png': phoneIcon,
  'addres.png': addressIcon,
  'taxno.png': taxnoIcon,
  'textype.png': textypeIcon,
  'nature.png': natureIcon,
};

const CompanyProfile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [logo, setLogo] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      const openedDb = await SQLite.openDatabaseAsync('appdata.db');
      setDb(openedDb);
      await openedDb.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Users (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Logo TEXT,
          C_NAME TEXT,
          Email TEXT,
          Phone TEXT,
          Address TEXT,
          Tax_no TEXT,
          Tax_type TEXT,
          B_type TEXT
        );
      `);
    };
    initDb();
  }, []);

  const saveToDatabase = async (values) => {
    if (!db) {
      console.log("❌ Database not ready yet");
      return;
    }

    const formData = {
      Logo: logo || '',
      C_NAME: values.companyName,
      Email: values.email,
      Phone: values.phone,
      Address: values.address,
      Tax_no: values.taxNo,
      Tax_type: values.taxType,
      B_type: values.businessNature,
    };

    console.log("📝 Saving this data to SQLite:");
    console.table(formData);

    try {
      await db.runAsync(
        `INSERT INTO Users (Logo, C_NAME, Email, Phone, Address, Tax_no, Tax_type, B_type)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        Object.values(formData)
      );

      console.log("✅ Data saved successfully");

      Alert.alert('Success', 'Company profile saved successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Invoice-m') },
      ]);
    } catch (error) {
      console.log("❌ Insert failed", error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const pickLogo = async () => {
    Alert.alert(
      'Company Logo',
      'Choose an option',
      [
        {
          text: 'View Current Logo',
          onPress: () => {
            if (logo) {
              Alert.alert('Company Logo', '', [
                {
                  text: 'OK',
                  style: 'default',
                },
                {
                  text: 'Change Logo',
                  onPress: async () => {
                    const result = await ImagePicker.launchImageLibraryAsync({
                      allowsEditing: true,
                      quality: 1,
                      selectionLimit: 1,
                    });
                    if (!result.canceled) {
                      setLogo(result.assets[0].uri);
                    }
                  },
                },
              ], {
                content: (
                  <Image 
                    source={{ uri: logo }} 
                    style={{ width: 200, height: 200, alignSelf: 'center' }} 
                    resizeMode="contain"
                  />
                ),
              });
            } else {
              Alert.alert('No logo selected');
            }
          },
        },
        {
          text: 'Select New Logo',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              quality: 1,
              selectionLimit: 1,
            });
            if (!result.canceled) {
              setLogo(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
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
            onSubmit={saveToDatabase}
          >
            {(formik) => (
              <>
                <View style={styles.card}>
                  <TouchableOpacity style={styles.row} onPress={pickLogo}>
                    <View style={styles.left}>
                      <Image source={logoIcon} style={styles.iconImage} />
                      <Text style={styles.label}>{t('logo')}</Text>
                    </View>
                    {logo ? (
                      <Image source={{ uri: logo }} style={styles.logoPreview} />
                    ) : (
                      <Text style={styles.arrow}>›</Text>
                    )}
                  </TouchableOpacity>

                  {/* Fields */}
                  {[
                    {
                      icon: 'cname.png',
                      placeholder: t('company_name'),
                      value: formik.values.companyName,
                      onChange: formik.handleChange('companyName'),
                      onBlur: formik.handleBlur('companyName'),
                      error: formik.errors.companyName,
                      touched: formik.touched.companyName,
                    },
                    {
                      icon: 'email.png',
                      placeholder: t('company_email'),
                      value: formik.values.email,
                      onChange: formik.handleChange('email'),
                      onBlur: formik.handleBlur('email'),
                      error: formik.errors.email,
                      touched: formik.touched.email,
                      keyboardType: 'email-address',
                    },
                    {
                      icon: 'phone.png',
                      placeholder: t('company_phone'),
                      value: formik.values.phone,
                      onChange: formik.handleChange('phone'),
                      onBlur: formik.handleBlur('phone'),
                      error: formik.errors.phone,
                      touched: formik.touched.phone,
                      keyboardType: 'phone-pad',
                    },
                    {
                      icon: 'addres.png',
                      placeholder: t('company_address'),
                      value: formik.values.address,
                      onChange: formik.handleChange('address'),
                      onBlur: formik.handleBlur('address'),
                      error: formik.errors.address,
                      touched: formik.touched.address,
                    },
                    {
                      icon: 'taxno.png',
                      placeholder: t('tax_number'),
                      value: formik.values.taxNo,
                      onChange: formik.handleChange('taxNo'),
                      onBlur: formik.handleBlur('taxNo'),
                      error: formik.errors.taxNo,
                      touched: formik.touched.taxNo,
                    },
                  ].map((field, idx) => (
                    <View key={idx} style={styles.fieldWrapper}>
                      <View style={styles.inputRow}>
                        <Image
                          source={iconMap[field.icon]}
                          style={styles.iconImage}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          placeholderTextColor="#aaa"
                          keyboardType={field.keyboardType || 'default'}
                        />
                      </View>
                      {field.touched && field.error && (
                        <Text style={styles.errorText}>{field.error}</Text>
                      )}
                    </View>
                  ))}

                  {/* Tax Type */}
                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={textypeIcon} style={styles.iconImage} />
                      <Picker
                        selectedValue={formik.values.taxType}
                        onValueChange={formik.handleChange('taxType')}
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
                      <Image source={natureIcon} style={styles.iconImage} />
                      <Picker
                        selectedValue={formik.values.businessNature}
                        onValueChange={formik.handleChange('businessNature')}
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
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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
    elevation: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  logoPreview: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(5),
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default CompanyProfile;