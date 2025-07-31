// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// const AddClientScreen = ({ navigation }) => {
//   const [taxType, setTaxType] = useState('');
//   const [businessNature, setBusinessNature] = useState('');

//   return (
//     <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={styles.container}>
//       <ScrollView>
//         {/* Header */}
//         <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.title}>Add Client</Text>
//           </View>

//         {/* Card Form */}
//         <View style={styles.card}>
//           {[
//             { placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
//             { placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
//             { placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
//             { placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
//             { placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
//             { placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
//           ].map((item, index) => (
//             <View key={index} style={styles.row}>
//               <Image source={item.icon} style={styles.icon} />
//               <TextInput placeholder={item.placeholder} placeholderTextColor="#aaa" style={styles.input} />
//             </View>
//           ))}

//           {/* Tax Type Dropdown */}
//           <View style={styles.row}>
//             <Image source={require('../../../assets/screen-18/tax.png')} style={styles.icon} />
//             <Picker
//               selectedValue={taxType}
//               onValueChange={setTaxType}
//               style={styles.picker}
//             >
//               <Picker.Item label="Tax Types" value="" />
//               <Picker.Item label="GST" value="gst" />
//               <Picker.Item label="CGST" value="cgst" />
//               <Picker.Item label="SGST" value="sgst" />
//             </Picker>
//           </View>

//           {/* Business Nature Dropdown */}
//           <View style={styles.row}>
//             <Image source={require('../../../assets/screen-18/nature.png')} style={styles.icon} />
//             <Picker
//               selectedValue={businessNature}
//               onValueChange={setBusinessNature}
//               style={styles.picker}
//             >
//               <Picker.Item label="Nature of Business" value="" />
//               <Picker.Item label="Retail" value="retail" />
//               <Picker.Item label="Wholesale" value="wholesale" />
//             </Picker>
//           </View>

//           {/* Client Detail Input */}
//           <View style={styles.row}>
//             <Image source={require('../../../assets/screen-18/transaction.png')} style={styles.icon} />
//             <TextInput placeholder="Client Detail" placeholderTextColor="#aaa" style={styles.input} />
//           </View>
//         </View>

//         {/* Done Button */}
//         <TouchableOpacity style={styles.doneButton}>
//           <Text style={styles.doneText}>Done</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
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
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     marginRight: scale(28),
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
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: verticalScale(6),
//   },
//   icon: {
//     width: scale(22),
//     height: scale(22),
//     marginRight: scale(10),
//     resizeMode: 'contain',
//     tintColor: '#55d04c',
//   },
//   input: {
//     flex: 1,
//     fontSize: scale(14),
//     color: '#333',
//   },
//   picker: {
//       flex: 1,
//     color: '#a3a2a2ff',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     marginTop: verticalScale(24),
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(16),
//     fontWeight: 'bold',
//   },
// });

// export default AddClientScreen;
// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//   tradeName: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
//   phone: Yup.string()
//     .matches(/^\d{10}$/, 'Must be 10 digits')
//     .required('Required'),
//   address: Yup.string().required('Required'),
//   shippingAddress: Yup.string().required('Required'),
//   taxNo: Yup.string()
//     .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST format')
//     .required('Required'),
//   taxType: Yup.string().required('Required'),
//   businessNature: Yup.string().required('Required'),
//   clientDetail: Yup.string().required('Required'),
// });

// const AddClientScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.title}>Add Client</Text>
//         </View>

//         <Formik
//           initialValues={{
//             tradeName: '',
//             email: '',
//             phone: '',
//             address: '',
//             shippingAddress: '',
//             taxNo: '',
//             taxType: '',
//             businessNature: '',
//             clientDetail: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { resetForm }) => {
//             console.log('Form Values:', values);
//             resetForm();
//             navigation.navigate('Client-Screen');
//           }}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
//             <>
//               <View style={styles.card}>
//                 {[
//                   { name: 'tradeName', placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
//                   { name: 'email', placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
//                   { name: 'phone', placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
//                   { name: 'address', placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
//                   { name: 'shippingAddress', placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
//                   { name: 'taxNo', placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
//                 ].map(({ name, placeholder, icon }) => (
//                   <View key={name}>
//                     <View style={styles.row}>
//                       <Image source={icon} style={styles.icon} />
//                       <TextInput
//                         placeholder={placeholder}
//                         placeholderTextColor="#aaa"
//                         style={styles.input}
//                         onChangeText={handleChange(name)}
//                         onBlur={handleBlur(name)}
//                         value={values[name]}
//                       />
//                     </View>
//                     {touched[name] && errors[name] && (
//                       <Text style={{ color: 'red', fontSize: 12, marginBottom: 6 }}>{errors[name]}</Text>
//                     )}
//                   </View>
//                 ))}

//                 {/* Tax Type Picker */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/tax.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.taxType}
//                     onValueChange={value => setFieldValue('taxType', value)}
//                     style={styles.picker}
//                   >
//                     <Picker.Item label="Tax Types" value="" />
//                     <Picker.Item label="GST" value="gst" />
//                     <Picker.Item label="CGST" value="cgst" />
//                     <Picker.Item label="SGST" value="sgst" />
//                   </Picker>
//                 </View>
//                 {touched.taxType && errors.taxType && (
//                   <Text style={{ color: 'red', fontSize: 12, marginBottom: 6 }}>{errors.taxType}</Text>
//                 )}

//                 {/* Business Nature Picker */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/nature.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.businessNature}
//                     onValueChange={value => setFieldValue('businessNature', value)}
//                     style={styles.picker}
//                   >
//                     <Picker.Item label="Nature of Business" value="" />
//                     <Picker.Item label="Retail" value="retail" />
//                     <Picker.Item label="Wholesale" value="wholesale" />
//                   </Picker>
//                 </View>
//                 {touched.businessNature && errors.businessNature && (
//                   <Text style={{ color: 'red', fontSize: 12, marginBottom: 6 }}>{errors.businessNature}</Text>
//                 )}

//                 {/* Client Detail */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/transaction.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Client Detail"
//                     placeholderTextColor="#aaa"
//                     style={styles.input}
//                     onChangeText={handleChange('clientDetail')}
//                     onBlur={handleBlur('clientDetail')}
//                     value={values.clientDetail}
//                   />
//                 </View>
//                 {touched.clientDetail && errors.clientDetail && (
//                   <Text style={{ color: 'red', fontSize: 12, marginBottom: 6 }}>{errors.clientDetail}</Text>
//                 )}
//               </View>

//               <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
//                 <Text style={styles.doneText}>Done</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </Formik>
//       </ScrollView>
//     </LinearGradient>
//   );
// };
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as SQLite from 'expo-sqlite'; // ✅ SQLite added

// const validationSchema = Yup.object().shape({
//   tradeName: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
//   phone: Yup.string()
//     .matches(/^\d{10}$/, 'Must be 10 digits')
//     .required('Required'),
//   address: Yup.string().required('Required'),
//   shippingAddress: Yup.string().required('Required'),
//   taxNo: Yup.string()
//     .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST format')
//     .required('Required'),
//   taxType: Yup.string().required('Required'),
//   businessNature: Yup.string().required('Required'),
//   clientDetail: Yup.string().required('Required'),
// });

// const AddClientScreen = () => {
//   const navigation = useNavigation();
//   const [db, setDb] = useState(null);

//   // ✅ Initialize SQLite and create table
//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db');
//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS clients (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             tradeName TEXT NOT NULL,
//             email TEXT NOT NULL,
//             phone TEXT NOT NULL,
//             address TEXT NOT NULL,
//             shippingAddress TEXT NOT NULL,
//             taxNo TEXT NOT NULL,
//             taxType TEXT NOT NULL,
//             businessNature TEXT NOT NULL,
//             clientDetail TEXT NOT NULL
//           );
//         `);
//         setDb(database);
//       } catch (err) {
//         console.error('❌ DB Init Error:', err);
//       }
//     };

//     initDb();
//   }, []);

//   // ✅ Save form data to SQLite
//   const saveClientToDb = async (values, resetForm) => {
//     if (!db) {
//       Alert.alert('Database not ready');
//       return;
//     }

//     try {
//       await db.runAsync(
//         `INSERT INTO clients 
//         (tradeName, email, phone, address, shippingAddress, taxNo, taxType, businessNature, clientDetail)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           values.tradeName,
//           values.email,
//           values.phone,
//           values.address,
//           values.shippingAddress,
//           values.taxNo,
//           values.taxType,
//           values.businessNature,
//           values.clientDetail,
//         ]
//       );
//       Alert.alert('Success', 'Client saved successfully', [
//         {
//           text: 'OK',
//           onPress: () => {
//             resetForm();
//             navigation.navigate('Client-Screen');
//           },
//         },
//       ]);
//     } catch (error) {
//       console.error('❌ Insert Error:', error);
//       Alert.alert('Error', 'Failed to save client');
//     }
//   };

//   return (
//     <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.title}>Add Client</Text>
//         </View>

//         <Formik
//           initialValues={{
//             tradeName: '',
//             email: '',
//             phone: '',
//             address: '',
//             shippingAddress: '',
//             taxNo: '',
//             taxType: '',
//             businessNature: '',
//             clientDetail: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { resetForm }) => saveClientToDb(values, resetForm)}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
//             <>
//               <View style={styles.card}>
//                 {[
//                   { name: 'tradeName', placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
//                   { name: 'email', placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
//                   { name: 'phone', placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
//                   { name: 'address', placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
//                   { name: 'shippingAddress', placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
//                   { name: 'taxNo', placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
//                 ].map(({ name, placeholder, icon }) => (
//                   <View key={name}>
//                     <View style={styles.row}>
//                       <Image source={icon} style={styles.icon} />
//                       <TextInput
//                         placeholder={placeholder}
//                         placeholderTextColor="#aaa"
//                         style={styles.input}
//                         onChangeText={handleChange(name)}
//                         onBlur={handleBlur(name)}
//                         value={values[name]}
//                       />
//                     </View>
//                     {touched[name] && errors[name] && (
//                       <Text style={styles.errorText}>{errors[name]}</Text>
//                     )}
//                   </View>
//                 ))}

//                 {/* Tax Type Picker */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/tax.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.taxType}
//                     onValueChange={value => setFieldValue('taxType', value)}
//                     style={styles.picker}
//                   >
//                     <Picker.Item label="Tax Types" value="" />
//                     <Picker.Item label="GST" value="gst" />
//                     <Picker.Item label="CGST" value="cgst" />
//                     <Picker.Item label="SGST" value="sgst" />
//                   </Picker>
//                 </View>
//                 {touched.taxType && errors.taxType && (
//                   <Text style={styles.errorText}>{errors.taxType}</Text>
//                 )}

//                 {/* Business Nature Picker */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/nature.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.businessNature}
//                     onValueChange={value => setFieldValue('businessNature', value)}
//                     style={styles.picker}
//                   >
//                     <Picker.Item label="Nature of Business" value="" />
//                     <Picker.Item label="Retail" value="retail" />
//                     <Picker.Item label="Wholesale" value="wholesale" />
//                   </Picker>
//                 </View>
//                 {touched.businessNature && errors.businessNature && (
//                   <Text style={styles.errorText}>{errors.businessNature}</Text>
//                 )}

//                 {/* Client Detail */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/transaction.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Client Detail"
//                     placeholderTextColor="#aaa"
//                     style={styles.input}
//                     onChangeText={handleChange('clientDetail')}
//                     onBlur={handleBlur('clientDetail')}
//                     value={values.clientDetail}
//                   />
//                 </View>
//                 {touched.clientDetail && errors.clientDetail && (
//                   <Text style={styles.errorText}>{errors.clientDetail}</Text>
//                 )}
//               </View>

//               <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
//                 <Text style={styles.doneText}>Done</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </Formik>
//       </ScrollView>
//     </LinearGradient>
//   );
// };
// const styles = StyleSheet.create({
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
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     marginRight: scale(28),
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
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: verticalScale(6),
//   },
//   icon: {
//     width: scale(22),
//     height: scale(22),
//     marginRight: scale(10),
//     resizeMode: 'contain',
//     tintColor: '#55d04c',
//   },
//   input: {
//     flex: 1,
//     fontSize: scale(14),
//     color: '#333',
//   },
//   picker: {
//     flex: 1,
//     color: '#a3a2a2ff',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     marginTop: verticalScale(24),
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(16),
//     fontWeight: 'bold',
//   },
// });

// export default AddClientScreen;
//working
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as SQLite from 'expo-sqlite';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';

// const validationSchema = Yup.object().shape({
//   tradeName: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
//   phone: Yup.string().matches(/^\d{10}$/, 'Must be 10 digits').required('Required'),
//   address: Yup.string().required('Required'),
//   shippingAddress: Yup.string().required('Required'),
//   taxNo: Yup.string()
//     .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST format')
//     .required('Required'),
//   taxType: Yup.string().required('Required'),
//   businessNature: Yup.string().required('Required'),
//   clientDetail: Yup.string().required('Required'),
// });

// const AddClientScreen = () => {
//   const navigation = useNavigation();
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db');
//                 await database.execAsync(
//             `CREATE TABLE IF NOT EXISTS clients (
//               c_id INTEGER PRIMARY KEY AUTOINCREMENT,
//               c_tradeName TEXT NOT NULL,
//               c_email TEXT NOT NULL,
//               c_phone TEXT NOT NULL,
//               c_address TEXT NOT NULL,
//               c_shippingAddress TEXT NOT NULL,
//               taxNo TEXT NOT NULL,
//               c_taxType TEXT NOT NULL,
//               c_businessNature TEXT NOT NULL,
//               c_clientDetail TEXT NOT NULL
//             );`,
//             [],
//             () => setDb(database),
//             (_, error) => {
//               console.error('❌ Table creation error:', error);
//               return true;
//             }
//           );
      
//       } catch (err) {
//         console.error('❌ DB Init Error:', err);
//       }
//     };

//     initDb();
//   }, []);

//   const saveClientToDb = (values, resetForm) => {
//     if (!db) {
//       Alert.alert('Database not ready');
//       return;
//     }

//     db.transaction(tx => {
//       tx.executeSql(
//         `INSERT INTO clients 
//         (c_tradeName, c_email, c_phone, c_address, c_shippingAddress, taxNo, c_taxType, c_businessNature, c_clientDetail)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           values.tradeName,
//           values.email,
//           values.phone,
//           values.address,
//           values.shippingAddress,
//           values.taxNo,
//           values.taxType,
//           values.businessNature,
//           values.clientDetail,
//         ],
//         () => {
//           Alert.alert('Success', 'Client saved successfully', [
//             {
//               text: 'OK',
//               onPress: () => {
//                 resetForm();
//                 navigation.navigate('Client-Screen');
//               },
//             },
//           ]);
//         },
//         (_, error) => {
//           console.error('❌ Insert Error:', error);
//           Alert.alert('Error', 'Failed to save client');
//           return true;
//         }
//       );
//     });
//   };

//   const exportClientsToCSV = async () => {
//     try {
//       const dbUri = `${FileSystem.documentDirectory}SQLite/userdb.db`;
//       const fileInfo = await FileSystem.getInfoAsync(dbUri);

//       if (!fileInfo.exists) {
//         Alert.alert('Error', 'Database file not found!');
//         return;
//       }

//       await Sharing.shareAsync(dbUri, {
//         mimeType: 'application/x-sqlite3',
//         dialogTitle: 'Export SQLite Database',
//         UTI: 'public.database',
//       });
//     } catch (error) {
//       Alert.alert("Error exporting database", error.message);
//       console.error(error);
//     }
//   };

//   return (
//     <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.title}>Add Client</Text>
//         </View>

//         <Formik
//           initialValues={{
//             tradeName: '',
//             email: '',
//             phone: '',
//             address: '',
//             shippingAddress: '',
//             taxNo: '',
//             taxType: '',
//             businessNature: '',
//             clientDetail: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { resetForm }) => saveClientToDb(values, resetForm)}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
//             <>
//               <View style={styles.card}>
//                 {[{ name: 'tradeName', placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
//                   { name: 'email', placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
//                   { name: 'phone', placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
//                   { name: 'address', placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
//                   { name: 'shippingAddress', placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
//                   { name: 'taxNo', placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
//                 ].map(({ name, placeholder, icon }) => (
//                   <View key={name}>
//                     <View style={styles.row}>
//                       <Image source={icon} style={styles.icon} />
//                       <TextInput
//                         placeholder={placeholder}
//                         placeholderTextColor="#aaa"
//                         style={styles.input}
//                         onChangeText={handleChange(name)}
//                         onBlur={handleBlur(name)}
//                         value={values[name]}
//                       />
//                     </View>
//                     {touched[name] && errors[name] && (
//                       <Text style={styles.errorText}>{errors[name]}</Text>
//                     )}
//                   </View>
//                 ))}

//                 {/* Tax Type Picker */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/tax.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.taxType}
//                     onValueChange={value => setFieldValue('taxType', value)}
//                     style={styles.picker}
//                   >
//                     <Picker.Item label="Tax Types" value="" />
//                     <Picker.Item label="GST" value="gst" />
//                     <Picker.Item label="CGST" value="cgst" />
//                     <Picker.Item label="SGST" value="sgst" />
//                   </Picker>
//                 </View>
//                 {touched.taxType && errors.taxType && (
//                   <Text style={styles.errorText}>{errors.taxType}</Text>
//                 )}

//                 {/* Business Nature Picker */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/nature.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.businessNature}
//                     onValueChange={value => setFieldValue('businessNature', value)}
//                     style={styles.picker}
//                   >
//                     <Picker.Item label="Nature of Business" value="" />
//                     <Picker.Item label="Retail" value="retail" />
//                     <Picker.Item label="Wholesale" value="wholesale" />
//                   </Picker>
//                 </View>
//                 {touched.businessNature && errors.businessNature && (
//                   <Text style={styles.errorText}>{errors.businessNature}</Text>
//                 )}

//                 {/* Client Detail */}
//                 <View style={styles.row}>
//                   <Image source={require('../../../assets/screen-18/transaction.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Client Detail"
//                     placeholderTextColor="#aaa"
//                     style={styles.input}
//                     onChangeText={handleChange('clientDetail')}
//                     onBlur={handleBlur('clientDetail')}
//                     value={values.clientDetail}
//                   />
//                 </View>
//                 {touched.clientDetail && errors.clientDetail && (
//                   <Text style={styles.errorText}>{errors.clientDetail}</Text>
//                 )}
//               </View>

//               <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
//                 <Text style={styles.doneText}>Done</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={[styles.doneButton, { backgroundColor: '#5c5cd6' }]} onPress={exportClientsToCSV}>
//                 <Text style={styles.doneText}>Export File</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </Formik>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
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
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     marginRight: scale(28),
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
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: verticalScale(6),
//   },
//   icon: {
//     width: scale(22),
//     height: scale(22),
//     marginRight: scale(10),
//     resizeMode: 'contain',
//     tintColor: '#55d04c',
//   },
//   input: {
//     flex: 1,
//     fontSize: scale(14),
//     color: '#333',
//   },
//   picker: {
//     flex: 1,
//     color: '#a3a2a2ff',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     marginTop: verticalScale(16),
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(16),
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: verticalScale(8),
//     marginLeft: scale(10),
//     fontSize: scale(12),
//   },
// });

// export default AddClientScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const validationSchema = Yup.object().shape({
  tradeName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Must be 10 digits').required('Required'),
  address: Yup.string().required('Required'),
  shippingAddress: Yup.string().required('Required'),
  taxNo: Yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST format')
    .required('Required'),
  taxType: Yup.string().required('Required'),
  businessNature: Yup.string().required('Required'),
  clientDetail: Yup.string().required('Required'),
});

const AddClientScreen = () => {
  const navigation = useNavigation();
  const [db, setDb] = useState(null);
  const [clients, setClients] = useState([]);

   useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db');
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tradeName TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            shippingAddress TEXT NOT NULL,
            taxNo TEXT NOT NULL,
            taxType TEXT NOT NULL,
            businessNature TEXT NOT NULL,
            clientDetail TEXT NOT NULL
          );
        `);
        setDb(database);
        await refreshClientList(database);
      } catch (err) {
        console.error('❌ DB Init Error:', err);
      }
    };

    initDb();
  }, []);

  const refreshClientList = async (database = db) => {
    if (!database) return;
    try {
      const rows = await database.getAllAsync(`SELECT * FROM clients`);
      setClients(rows);
    } catch (error) {
      console.error('❌ Fetch Error:', error);
    }
  };

  const saveClientToDb = async (values, resetForm) => {
    if (!db) {
      Alert.alert('Database not ready');
      return;
    }

    try {
      const existing = await db.getFirstAsync(
        `SELECT * FROM clients WHERE taxNo = ?`,
        [values.taxNo]
      );

      if (existing) {
        await db.runAsync(
          `UPDATE clients SET 
            tradeName = ?, 
            email = ?, 
            phone = ?, 
            address = ?, 
            shippingAddress = ?, 
            taxType = ?, 
            businessNature = ?, 
            clientDetail = ?
          WHERE taxNo = ?`,
          [
            values.tradeName,
            values.email,
            values.phone,
            values.address,
            values.shippingAddress,
            values.taxType,
            values.businessNature,
            values.clientDetail,
            values.taxNo,
          ]
        );
        Alert.alert('Updated', 'Client updated successfully', [
          {
            text: 'OK',
            onPress: () => {
              resetForm();
              refreshClientList();
              navigation.navigate('Client-Screen');
            },
          },
        ]);
      } else {
        await db.runAsync(
          `INSERT INTO clients 
            (tradeName, email, phone, address, shippingAddress, taxNo, taxType, businessNature, clientDetail)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            values.tradeName,
            values.email,
            values.phone,
            values.address,
            values.shippingAddress,
            values.taxNo,
            values.taxType,
            values.businessNature,
            values.clientDetail,
          ]
        );
        Alert.alert('Saved', 'Client saved successfully', [
          {
            text: 'OK',
            onPress: () => {
              resetForm();
              refreshClientList();
              navigation.navigate('Client-Screen');
            },
          },
        ]);
      }
    } catch (error) {
      console.error('❌ DB Save Error:', error);
      Alert.alert('Error', 'Failed to save or update client.');
    }
  };

  const exportClientsToCSV = async () => {
    try {
      const dbUri = `${FileSystem.documentDirectory}SQLite/userdb.db`;
      const fileInfo = await FileSystem.getInfoAsync(dbUri);

      if (!fileInfo.exists) {
        Alert.alert('Error', 'Database file not found!');
        return;
      }

      await Sharing.shareAsync(dbUri, {
        mimeType: 'application/x-sqlite3',
        dialogTitle: 'Export SQLite Database',
        UTI: 'public.database',
      });
    } catch (error) {
      Alert.alert("Error exporting database", error.message);
      console.error(error);
    }
  };

  return (
    <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Client</Text>
        </View>

        <Formik
          initialValues={{
            tradeName: '',
            email: '',
            phone: '',
            address: '',
            shippingAddress: '',
            taxNo: '',
            taxType: '',
            businessNature: '',
            clientDetail: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => saveClientToDb(values, resetForm)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              <View style={styles.card}>
                {[{ name: 'tradeName', placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
                  { name: 'email', placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
                  { name: 'phone', placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
                  { name: 'address', placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
                  { name: 'shippingAddress', placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
                  { name: 'taxNo', placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
                ].map(({ name, placeholder, icon }) => (
                  <View key={name}>
                    <View style={styles.row}>
                      <Image source={icon} style={styles.icon} />
                      <TextInput
                        placeholder={placeholder}
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        onChangeText={handleChange(name)}
                        onBlur={handleBlur(name)}
                        value={values[name]}
                      />
                    </View>
                    {touched[name] && errors[name] && (
                      <Text style={styles.errorText}>{errors[name]}</Text>
                    )}
                  </View>
                ))}

                {/* Tax Type Picker */}
                <View style={styles.row}>
                  <Image source={require('../../../assets/screen-18/tax.png')} style={styles.icon} />
                  <Picker
                    selectedValue={values.taxType}
                    onValueChange={value => setFieldValue('taxType', value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Tax Types" value="" />
                    <Picker.Item label="GST" value="gst" />
                    <Picker.Item label="CGST" value="cgst" />
                    <Picker.Item label="SGST" value="sgst" />
                  </Picker>
                </View>
                {touched.taxType && errors.taxType && (
                  <Text style={styles.errorText}>{errors.taxType}</Text>
                )}

                {/* Business Nature Picker */}
                <View style={styles.row}>
                  <Image source={require('../../../assets/screen-18/nature.png')} style={styles.icon} />
                  <Picker
                    selectedValue={values.businessNature}
                    onValueChange={value => setFieldValue('businessNature', value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Nature of Business" value="" />
                    <Picker.Item label="Retail" value="retail" />
                    <Picker.Item label="Wholesale" value="wholesale" />
                  </Picker>
                </View>
                {touched.businessNature && errors.businessNature && (
                  <Text style={styles.errorText}>{errors.businessNature}</Text>
                )}

                {/* Client Detail */}
                <View style={styles.row}>
                  <Image source={require('../../../assets/screen-18/transaction.png')} style={styles.icon} />
                  <TextInput
                    placeholder="Client Detail"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    onChangeText={handleChange('clientDetail')}
                    onBlur={handleBlur('clientDetail')}
                    value={values.clientDetail}
                  />
                </View>
                {touched.clientDetail && errors.clientDetail && (
                  <Text style={styles.errorText}>{errors.clientDetail}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.doneButton, { backgroundColor: '#5c5cd6' }]} onPress={exportClientsToCSV}>
                <Text style={styles.doneText}>Export File</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(10),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginRight: scale(28),
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
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: verticalScale(6),
  },
  icon: {
    width: scale(22),
    height: scale(22),
    marginRight: scale(10),
    resizeMode: 'contain',
    tintColor: '#55d04c',
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    color: '#333',
  },
  picker: {
    flex: 1,
    color: '#a3a2a2ff',
    fontSize: scale(16),
    marginLeft: -10,
  },
  doneButton: {
    marginTop: verticalScale(16),
    backgroundColor: '#4CD04D',
    paddingVertical: verticalScale(14),
    borderRadius: scale(30),
    alignItems: 'center',
  },
  doneText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: verticalScale(8),
    marginLeft: scale(10),
    fontSize: scale(12),
  },
});

export default AddClientScreen;

