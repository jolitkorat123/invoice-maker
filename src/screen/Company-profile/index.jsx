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

// // Icons
// import logoIcon from '../../../assets/company-profile/logo.png';
// import cnameIcon from '../../../assets/company-profile/company.png';
// import emailIcon from '../../../assets/company-profile/email.png';
// import phoneIcon from '../../../assets/company-profile/phone.png';
// import addressIcon from '../../../assets/company-profile/addres.png';
// import taxnoIcon from '../../../assets/company-profile/taxno.png';
// import textypeIcon from '../../../assets/company-profile/textype.png';
// import natureIcon from '../../../assets/company-profile/nature.png';

// const iconMap = {
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
//   const [logo, setLogo] = useState('https://via.placeholder.com/100');
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true
//         });
//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS company (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             companyName TEXT NOT NULL,
//             email TEXT NOT NULL,
//             phone TEXT NOT NULL,
//             address TEXT NOT NULL,
//             taxNo TEXT,
//             taxType TEXT,
//             businessNature TEXT,
//             logo TEXT
//           );
//         `);
//         setDb(database);
//       } catch (err) {
//         console.error("DB Init Error:", err);
//       }
//     };
//     initDb();
//   }, []);

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
//     companyName: Yup.string().min(4).max(20).required('Company name is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     phone: Yup.string()
//       .matches(/^\d{10}$/, 'Phone number must be 10 digits')
//       .required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     taxNo: Yup.string()
//       .matches(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})$/, 'Invalid GST format')
//       .required('Tax number is required'),
//     taxType: Yup.string().required('Tax type is required'),
//     businessNature: Yup.string().required('Nature of business is required'),
//   });

//   // const saveToDatabase = async (values) => {
//   //   if (!db) return;

//   //   try {
//   //     const logoData = logo || '';
//   //     const { companyName, email, phone, address, taxNo, taxType, businessNature } = values;

//   //     const existing = await db.getFirstAsync(`SELECT * FROM company ORDER BY id DESC LIMIT 1`);

//   //     if (existing) {
//   //       const isSameData =
//   //         existing.companyName === companyName &&
//   //         existing.email === email &&
//   //         existing.phone === phone &&
//   //         existing.address === address &&
//   //         existing.taxNo === taxNo &&
//   //         existing.taxType === taxType &&
//   //         existing.businessNature === businessNature;

//   //       if (isSameData) {
//   //         if (existing.logo !== logoData) {
//   //           await db.runAsync(`UPDATE company SET logo = ? WHERE id = ?`, [logoData, existing.id]);
//   //         }
//   //         navigation.navigate('Invoice-m');
//   //       } else {
//   //         await db.runAsync(
//   //           `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
//   //            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//   //           [companyName, email, phone, address, taxNo, taxType, businessNature, logoData]
//   //         );
//   //         navigation.navigate('Invoice-m');
//   //       }
//   //     } else {
//   //       await db.runAsync(
//   //         `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
//   //          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//   //         [companyName, email, phone, address, taxNo, taxType, businessNature, logoData]
//   //       );
//   //       navigation.navigate('Invoice-m');
//   //     }
//   //   } catch (error) {
//   //     console.log("❌ SQLite error:", error);
//   //     Alert.alert('Error', 'Failed to save or update data.');
//   //   }
//   // };
// const saveToDatabase = async (values) => {
//   if (!db) return;

//   try {
//     const logoData = logo || '';
//     const { companyName, email, phone, address, taxNo, taxType, businessNature } = values;

//     const existing = await db.getFirstAsync(`SELECT * FROM company ORDER BY id DESC LIMIT 1`);

//     if (existing) {
//       const isSameData =
//         existing.companyName === companyName &&
//         existing.email === email &&
//         existing.phone === phone &&
//         existing.address === address &&
//         existing.taxNo === taxNo &&
//         existing.taxType === taxType &&
//         existing.businessNature === businessNature;

//       if (isSameData) {
//         if (existing.logo !== logoData) {
//           await db.runAsync(`UPDATE company SET logo = ? WHERE id = ?`, [logoData, existing.id]);
//           Alert.alert('Updated', 'Logo updated successfully!', [
//             {
//               text: 'OK',
//               onPress: () => navigation.navigate('Invoice-m'),
//             },
//           ]);
//         } else {
//           navigation.navigate('Invoice-m'); // No changes, just navigate
//         }
//       } else {
//         await db.runAsync(
//           `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
//            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//           [companyName, email, phone, address, taxNo, taxType, businessNature, logoData]
//         );
//         Alert.alert('Success', 'New company data saved successfully!', [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('Invoice-m'),
//           },
//         ]);
//       }
//     } else {
//       await db.runAsync(
//         `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [companyName, email, phone, address, taxNo, taxType, businessNature, logoData]
//       );
//       Alert.alert('Success', 'Company data saved successfully!', [
//         {
//           text: 'OK',
//           onPress: () => navigation.navigate('Invoice-m'),
//         },
//       ]);
//     }
//   } catch (error) {
//     console.log("❌ SQLite error:", error);
//     Alert.alert('Error', 'Failed to save or update data.');
//   }
// };

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
//               companyName: 'Demo Pvt Ltd',
//               email: 'demo@example.com',
//               phone: '9876543210',
//               address: '123, Demo Street, City',
//               taxNo: '22ABCDE1234F1Z5',
//               taxType: 'gst',
//               businessNature: 'retail',
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
//                     {logo ? (
//                       <Image source={{ uri: logo }} style={styles.logoPreview} />
//                     ) : (
//                       <Text style={styles.arrow}>›</Text>
//                     )}
//                   </TouchableOpacity>

//                   {[
//                     { icon: 'cname.png', placeholder: t('company_name'), name: 'companyName' },
//                     { icon: 'email.png', placeholder: t('company_email'), name: 'email', keyboardType: 'email-address' },
//                     { icon: 'phone.png', placeholder: t('company_phone'), name: 'phone', keyboardType: 'phone-pad' },
//                     { icon: 'addres.png', placeholder: t('company_address'), name: 'address' },
//                     { icon: 'taxno.png', placeholder: t('tax_number'), name: 'taxNo' },
//                   ].map((field, idx) => (
//                     <View key={idx} style={styles.fieldWrapper}>
//                       <View style={styles.inputRow}>
//                         <Image source={iconMap[field.icon]} style={styles.iconImage} />
//                         <TextInput
//                           style={styles.input}
//                           placeholder={field.placeholder}
//                           placeholderTextColor="#aaa"
//                           value={formik.values[field.name]}
//                           onChangeText={formik.handleChange(field.name)}
//                           onBlur={formik.handleBlur(field.name)}
//                           keyboardType={field.keyboardType || 'default'}
//                         />
//                       </View>
//                       {formik.touched[field.name] && formik.errors[field.name] && (
//                         <Text style={styles.errorText}>{formik.errors[field.name]}</Text>
//                       )}
//                     </View>
//                   ))}

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

// Icons
import logoIcon from '../../../assets/company-profile/logo.png';
import cnameIcon from '../../../assets/company-profile/company.png';
import emailIcon from '../../../assets/company-profile/email.png';
import phoneIcon from '../../../assets/company-profile/phone.png';
import addressIcon from '../../../assets/company-profile/addres.png';
import taxnoIcon from '../../../assets/company-profile/taxno.png';
import textypeIcon from '../../../assets/company-profile/textype.png';
import natureIcon from '../../../assets/company-profile/nature.png';

const iconMap = {
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
  const [logo, setLogo] = useState('https://via.placeholder.com/100');
  const [db, setDb] = useState(null);
  const [initialValues, setInitialValues] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    taxNo: '',
    taxType: '',
    businessNature: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true
        });
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS company (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyName TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            taxNo TEXT,
            taxType TEXT,
            businessNature TEXT,
            logo TEXT
          );
        `);
        setDb(database);
        
        // Fetch the latest company data
        const result = await database.getFirstAsync(
          'SELECT * FROM company ORDER BY id DESC LIMIT 1'
        );
        
        if (result) {
          setInitialValues({
            companyName: result.companyName || '',
            email: result.email || '',
            phone: result.phone || '',
            address: result.address || '',
            taxNo: result.taxNo || '',
            taxType: result.taxType || '',
            businessNature: result.businessNature || '',
          });
          if (result.logo) {
            setLogo(result.logo);
          }
        }
      } catch (err) {
        console.error("DB Init Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    initDb();
  }, []);

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
    companyName: Yup.string().min(4).max(20).required('Company name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    taxNo: Yup.string()
      .matches(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})$/, 'Invalid GST format')
      .required('Tax number is required'),
    taxType: Yup.string().required('Tax type is required'),
    businessNature: Yup.string().required('Nature of business is required'),
  });

  const saveToDatabase = async (values) => {
    if (!db) return;

    try {
      const logoData = logo || '';
      const { companyName, email, phone, address, taxNo, taxType, businessNature } = values;

      const existing = await db.getFirstAsync(`SELECT * FROM company ORDER BY id DESC LIMIT 1`);

      if (existing) {
        const isSameData =
          existing.companyName === companyName &&
          existing.email === email &&
          existing.phone === phone &&
          existing.address === address &&
          existing.taxNo === taxNo &&
          existing.taxType === taxType &&
          existing.businessNature === businessNature;

        if (isSameData) {
          if (existing.logo !== logoData) {
            await db.runAsync(`UPDATE company SET logo = ? WHERE id = ?`, [logoData, existing.id]);
            Alert.alert('Updated', 'Logo updated successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Invoice-m'),
              },
            ]);
          } else {
            navigation.navigate('Invoice-m');
          }
        } else {
          await db.runAsync(
            `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [companyName, email, phone, address, taxNo, taxType, businessNature, logoData]
          );
          Alert.alert('Success', 'New company data saved successfully!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Invoice-m'),
            },
          ]);
        }
      } else {
        await db.runAsync(
          `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [companyName, email, phone, address, taxNo, taxType, businessNature, logoData]
        );
        Alert.alert('Success', 'Company data saved successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Invoice-m'),
          },
        ]);
      }
    } catch (error) {
      console.log("❌ SQLite error:", error);
      Alert.alert('Error', 'Failed to save or update data.');
    }
  };

  if (isLoading) {
    return (
      <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Loading...</Text>
        </View>
      </LinearGradient>
    );
  }

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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={saveToDatabase}
            enableReinitialize
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

                  {[
                    { icon: 'cname.png', placeholder: t('company_name'), name: 'companyName' },
                    { icon: 'email.png', placeholder: t('company_email'), name: 'email', keyboardType: 'email-address' },
                    { icon: 'phone.png', placeholder: t('company_phone'), name: 'phone', keyboardType: 'phone-pad' },
                    { icon: 'addres.png', placeholder: t('company_address'), name: 'address' },
                    { icon: 'taxno.png', placeholder: t('tax_number'), name: 'taxNo' },
                  ].map((field, idx) => (
                    <View key={idx} style={styles.fieldWrapper}>
                      <View style={styles.inputRow}>
                        <Image source={iconMap[field.icon]} style={styles.iconImage} />
                        <TextInput
                          style={styles.input}
                          placeholder={field.placeholder}
                          placeholderTextColor="#aaa"
                          value={formik.values[field.name]}
                          onChangeText={formik.handleChange(field.name)}
                          onBlur={formik.handleBlur(field.name)}
                          keyboardType={field.keyboardType || 'default'}
                        />
                      </View>
                      {formik.touched[field.name] && formik.errors[field.name] && (
                        <Text style={styles.errorText}>{formik.errors[field.name]}</Text>
                      )}
                    </View>
                  ))}

                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={textypeIcon} style={styles.iconImage} />
                      <Picker
                        selectedValue={formik.values.taxType}
                        onValueChange={formik.handleChange('taxType')}
                        style={[
                      styles.picker,
                      { color: formik.values.taxType ? '#444' : '#a3a2a2ff' }
                    ]}
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

                  <View style={styles.fieldWrapper}>
                    <View style={styles.inputRow}>
                      <Image source={natureIcon} style={styles.iconImage} />
                      <Picker
                        selectedValue={formik.values.businessNature}
                        onValueChange={formik.handleChange('businessNature')}
                        style={[
                      styles.picker,
                      { color: formik.values.businessNature ? '#444' : '#a3a2a2ff' }
                    ]}
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


