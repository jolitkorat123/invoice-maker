
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   TextInput,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import { useNavigation, useIsFocused,useRoute } from '@react-navigation/native';
// import * as SQLite from 'expo-sqlite';
// import AddClientScreen from '../Add-client';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useState } from 'react';

// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


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

// const ClientScreen = () => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const [clients, setClients] = useState([]);
//   const [db, setDb] = useState(null);
//   const [selectedClientId, setSelectedClientId] = useState(null); 

//   const route = useRoute();
//   const editingClient = route.params?.client || null;

//   // const [db, setDb] = useState(null);
//   // const [clients, setClients] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);


//  useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true
//         });
//         // const database = await SQLite.openDatabaseAsync('userdb.db');
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
//         await refreshClientList(database);
//       } catch (err) {
//         console.error('❌ DB Init Error:', err);
//       }
//     };

//     initDb();
//   }, []);

//   const refreshClientList = async (database = db) => {
//     if (!database) return;
//     try {
//       const rows = await database.getAllAsync(`SELECT * FROM clients`);
//       setClients(rows);
//     } catch (error) {
//       console.error('❌ Fetch Error:', error);
//     }
//   };

//   const saveClientToDb = async (values, resetForm) => {
//     console.log('Saving client:', values);
//     if (!db) return Alert.alert('Database not ready');
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     try {
//       if (editingClient) {
//         // Update
//         await db.runAsync(
//           `UPDATE clients SET 
//             tradeName = ?, email = ?, phone = ?, address = ?, 
//             shippingAddress = ?, taxNo = ?, taxType = ?, 
//             businessNature = ?, clientDetail = ? WHERE id = ?`,
//           [
//             values.tradeName,
//             values.email,
//             values.phone,
//             values.address,
//             values.shippingAddress,
//             values.taxNo,
//             values.taxType,
//             values.businessNature,
//             values.clientDetail,
//             editingClient.id,
//           ]
//         );
//         Alert.alert('Updated', 'Client updated successfully', [
//           {
//             text: 'OK',
//             onPress: () => {
//               resetForm();
//               refreshClientList();
//               navigation.navigate('Client-Screen');
//             },
//           },
//         ]);
//       } else {
//         // Insert
//         await db.runAsync(
//           `INSERT INTO clients 
//            (tradeName, email, phone, address, shippingAddress, taxNo, taxType, businessNature, clientDetail)
//            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             values.tradeName,
//             values.email,
//             values.phone,
//             values.address,
//             values.shippingAddress,
//             values.taxNo,
//             values.taxType,
//             values.businessNature,
//             values.clientDetail,
//           ]
//         );
//         Alert.alert('Saved', 'Client saved successfully', [
//           {
//             text: 'OK',
//             onPress: () => {
//               resetForm();
//               refreshClientList();
//               navigation.navigate('Client-Screen');
//             },
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error('❌ DB Save Error:', error);
//       Alert.alert('Error', 'Failed to save or update client.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const exportClientsToCSV = async () => {
//     try {
//       const dbUri = `${FileSystem.documentDirectory}SQLite/userdb.db`;
//       const fileInfo = await FileSystem.getInfoAsync(dbUri);
//       if (!fileInfo.exists) return Alert.alert('Error', 'Database file not found!');

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


//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true
//         });
//         setDb(database);
//         await loadClients(database);
//       } catch (err) {
//         console.error('DB Init Error:', err);
//       }
//     };

//     initDb();
//   }, []);

//   useEffect(() => {
//     if (db && isFocused) {
//       loadClients(db);
//     }
//   }, [isFocused]);

//   const loadClients = async (database) => {
//     try {
//       const rows = await database.getAllAsync(`SELECT * FROM clients`);
//       setClients(rows);
//     } catch (error) {
//       console.error('Error fetching clients:', error);
//     }
//   };

//   const toggleClientMenu = (clientId) => {
//     setSelectedClientId((prevId) => (prevId === clientId ? null : clientId));
//   };

//   const handleEdit = (client) => {
//     setSelectedClientId(null);
//     navigation.navigate('Add-client', { client }); // Make sure this screen exists
//   };

//   const handleRemove = (clientId) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this client?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await db.runAsync(`DELETE FROM clients WHERE id = ?`, [clientId]);
//               setSelectedClientId(null);
//               loadClients(db);
//             } catch (error) {
//               console.error('Failed to delete client:', error);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleContinue = () => {
//     navigation.navigate('Add-client');
//   };

//   return (
//     <ScrollView>
//       {clients?.length === 0 ?


//         <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('Client-Screen')} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//         </TouchableOpacity>

//         <Text style={styles.title}>{editingClient ? 'Edit Client' : 'Add Client'}</Text>
//       </View>

//       <ScrollView>
//         <Formik
//           enableReinitialize
//           initialValues={{
//             tradeName: editingClient?.tradeName || '',
//             email: editingClient?.email || '',
//             phone: editingClient?.phone || '',
//             address: editingClient?.address || '',
//             shippingAddress: editingClient?.shippingAddress || '',
//             taxNo: editingClient?.taxNo || '',
//             taxType: editingClient?.taxType || '',
//             businessNature: editingClient?.businessNature || '',
//             clientDetail: editingClient?.clientDetail || '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { resetForm }) => saveClientToDb(values, resetForm)}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
//             <>
//               <View style={styles.card}>
//                 {[{ name: 'tradeName', placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
//                 { name: 'email', placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
//                 { name: 'phone', placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
//                 { name: 'address', placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
//                 { name: 'shippingAddress', placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
//                 { name: 'taxNo', placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
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

//               <TouchableOpacity
//                 style={[styles.doneButton, isSubmitting && { opacity: 0.5 }]}
//                 onPress={handleSubmit}
//                 disabled={isSubmitting}
//               >
//                 <Text style={styles.doneText}>
//                   {isSubmitting ? 'Saving...' : editingClient ? 'Update Client' : 'Save Client'}
//                 </Text>
//               </TouchableOpacity>

//               {!editingClient && (
//                 <>
//                   <TouchableOpacity
//                     style={[styles.doneButton, { backgroundColor: '#5c5cd6' }]}
//                     onPress={exportClientsToCSV}
//                   >
//                     <Text style={styles.doneText}>Export File</Text>
//                   </TouchableOpacity>

//                   <View style={styles.clientList}>
//                     <Text style={styles.listTitle}>All Clients</Text>
//                     {clients.length === 0 ? (
//                       <Text style={styles.noClientsText}>No clients found.</Text>
//                     ) : (
//                       clients.map((client, index) => (
//                         <View key={client.id || index} style={styles.clientItem}>
//                           <Text style={styles.clientText}>
//                             🔹 {client.tradeName} | {client.phone}
//                           </Text>
//                           <Text style={styles.clientSubText}>📧 {client.email}</Text>
//                           <Text style={styles.clientSubText}>🏠 {client.address}</Text>
//                           <Text style={styles.clientSubText}>📦 {client.shippingAddress}</Text>
//                           <Text style={styles.clientSubText}>🧾 {client.taxNo} ({client.taxType})</Text>
//                           <Text style={styles.clientSubText}>🛒 {client.businessNature}</Text>
//                         </View>
//                       ))
//                     )}
//                   </View>
//                 </>
//               )}
//             </>
//           )}
//         </Formik>
//       </ScrollView>
//     </LinearGradient>
//         : 
//         <LinearGradient
//           colors={['#55d04c39', 'rgba(76, 208, 76, 0)']}
//           style={styles.container}
//         >
//           {/* Header */}
//           <View style={styles.header}>

//             <TouchableOpacity onPress={() => navigation.navigate('Invoice-m')} style={styles.backButton}>
//               <Ionicons name="chevron-back" size={28} color="#000000" />
//             </TouchableOpacity>
//             <Text style={styles.headerText}>Client</Text>
//             <View style={{ width: 24 }} />
//           </View>

//           {/* Add Button and Title */}
//           <View style={styles.fixedTop}>
//             <TouchableOpacity style={styles.addClientButton} onPress={handleContinue}>
//               <Text style={styles.addClientText}>+ Add New Client</Text>
//             </TouchableOpacity>
//             <Text style={styles.clientListTitle}>Client List :</Text>
//           </View>

//           {/* Scrollable List */}
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             {clients.length === 0 ? (
//               <Text style={{ fontSize: 14, color: '#888', fontStyle: 'italic' }}>
//                 No clients found.
//               </Text>
//             ) : (
//               clients.map((client) => (
//                 <View key={client.id} style={styles.clientWrapper}>
//                   <TouchableOpacity
//                     style={styles.clientCard}
//                     onPress={() => console.log('Tapped:', client.tradeName)}
//                   >
//                     <View>
//                       <Text style={styles.clientName}>{client.tradeName}</Text>
//                       <Text style={styles.clientDetails}>+91 {client.phone}</Text>
//                       <Text style={styles.clientDetails}>{client.businessNature}</Text>
//                     </View>

//                     <TouchableOpacity onPress={() => toggleClientMenu(client.id)}>
//                       <Ionicons name="ellipsis-vertical" size={20} color="#000" />
//                     </TouchableOpacity>
//                   </TouchableOpacity>

//                   {selectedClientId === client.id && (
//                     <View style={styles.dropdown}>
//                       <TouchableOpacity onPress={() => handleEdit(client)}>
//                         <Text style={styles.dropdownItem}>Edit</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleRemove(client.id)}>
//                         <Text style={[styles.dropdownItem, { color: 'red' }]}>Remove</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               ))
//             )}
//           </ScrollView>
//         </LinearGradient>}
//     </ScrollView>

//   );
// };

// export default ClientScreen;
// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   backButton: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   fixedTop: {
//     padding: 15,
//     backgroundColor: 'transparent',
//     zIndex: 10,
//   },
//   scrollContainer: {
//     paddingHorizontal: 15,
//     paddingBottom: 40,
//   },
//   addClientButton: {
//     backgroundColor: '#000',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   addClientText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   clientListTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   clientCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     elevation: 2,
//     zIndex: 1,
//   },
//   clientName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   clientDetails: {
//     marginTop: 2,
//     fontSize: 13,
//     color: '#000000',
//   },
//   clientWrapper: {
//     marginBottom: 15,
//     position: 'relative',
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 60,
//     right: 15,
//     backgroundColor: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     zIndex: 100,
//   },
//   dropdownItem: {
//     paddingVertical: 6,
//     fontSize: 14,
//     fontWeight: '500',
//   },







//     // Add Client Screen Styles
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
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     paddingVertical: verticalScale(15),
//     paddingHorizontal: scale(14),
//     marginBottom: verticalScale(20),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 1,
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
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
//   clientList: {
//     marginTop: verticalScale(25),
//     padding: scale(10),
//     backgroundColor: '#fff',
//     borderRadius: scale(10),
//     marginBottom: verticalScale(40),
//   },
//   listTitle: {
//     fontSize: scale(16),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(10),
//     color: '#333',
//   },
//   clientItem: {
//     marginBottom: verticalScale(10),
//     padding: scale(10),
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: scale(8),
//     backgroundColor: '#f9f9f9',
//   },
//   clientText: {
//     fontSize: scale(14),
//     fontWeight: 'bold',
//     color: '#2a2a2a',
//   },
//   clientSubText: {
//     fontSize: scale(12),
//     color: '#555',
//   },
//   noClientsText: {
//     fontSize: scale(14),
//     color: '#999',
//     fontStyle: 'italic',
//   },
// });
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useIsFocused,useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import AddClientScreen from '../Add-client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


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

const ClientScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [clients, setClients] = useState([]);
  const [db, setDb] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null); 

  const route = useRoute();
  const editingClient = route.params?.client || null;

  // const [db, setDb] = useState(null);
  // const [clients, setClients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


 useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true
        });
        // const database = await SQLite.openDatabaseAsync('userdb.db');
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
    console.log('Saving client:', values);
    if (!db) return Alert.alert('Database not ready');
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (editingClient) {
        // Update
        await db.runAsync(
          `UPDATE clients SET 
            tradeName = ?, email = ?, phone = ?, address = ?, 
            shippingAddress = ?, taxNo = ?, taxType = ?, 
            businessNature = ?, clientDetail = ? WHERE id = ?`,
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
            editingClient.id,
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
        // Insert
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportClientsToCSV = async () => {
    try {
      const dbUri = `${FileSystem.documentDirectory}SQLite/userdb.db`;
      const fileInfo = await FileSystem.getInfoAsync(dbUri);
      if (!fileInfo.exists) return Alert.alert('Error', 'Database file not found!');

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


  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true
        });
        setDb(database);
        await loadClients(database);
      } catch (err) {
        console.error('DB Init Error:', err);
      }
    };

    initDb();
  }, []);

  useEffect(() => {
    if (db && isFocused) {
      loadClients(db);
    }
  }, [isFocused]);

  const loadClients = async (database) => {
    try {
      const rows = await database.getAllAsync(`SELECT * FROM clients`);
      setClients(rows);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const toggleClientMenu = (clientId) => {
    setSelectedClientId((prevId) => (prevId === clientId ? null : clientId));
  };

  const handleEdit = (client) => {
    setSelectedClientId(null);
    navigation.navigate('Add-client', { client });
  };

  const handleRemove = (clientId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this client?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.runAsync(`DELETE FROM clients WHERE id = ?`, [clientId]);
              setSelectedClientId(null);
              loadClients(db);
            } catch (error) {
              console.error('Failed to delete client:', error);
            }
          },
        },
      ]
    );
  };

  const handleContinue = () => {
    navigation.navigate('Add-client');
  };

  return (
    <ScrollView>
      {clients?.length === 0 ? (
        <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={addClientStyles.container}>
          <View style={addClientStyles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Client-Screen')} style={addClientStyles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
            </TouchableOpacity>

            <Text style={addClientStyles.title}>{editingClient ? 'Edit Client' : 'Add Client'}</Text>
          </View>

          <ScrollView>
            <Formik
              enableReinitialize
              initialValues={{
                tradeName: editingClient?.tradeName || '',
                email: editingClient?.email || '',
                phone: editingClient?.phone || '',
                address: editingClient?.address || '',
                shippingAddress: editingClient?.shippingAddress || '',
                taxNo: editingClient?.taxNo || '',
                taxType: editingClient?.taxType || '',
                businessNature: editingClient?.businessNature || '',
                clientDetail: editingClient?.clientDetail || '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => saveClientToDb(values, resetForm)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <>
                  <View style={addClientStyles.card}>
                    {[{ name: 'tradeName', placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
                    { name: 'email', placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
                    { name: 'phone', placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
                    { name: 'address', placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
                    { name: 'shippingAddress', placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
                    { name: 'taxNo', placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
                    ].map(({ name, placeholder, icon }) => (
                      <View key={name}>
                        <View style={addClientStyles.row}>
                          <Image source={icon} style={addClientStyles.icon} />
                          <TextInput
                            placeholder={placeholder}
                            placeholderTextColor="#aaa"
                            style={addClientStyles.input}
                            onChangeText={handleChange(name)}
                            onBlur={handleBlur(name)}
                            value={values[name]}
                          />
                        </View>
                        {touched[name] && errors[name] && (
                          <Text style={addClientStyles.errorText}>{errors[name]}</Text>
                        )}
                      </View>
                    ))}

                    <View style={addClientStyles.row}>
                      <Image source={require('../../../assets/screen-18/tax.png')} style={addClientStyles.icon} />
                      <Picker
                        selectedValue={values.taxType}
                        onValueChange={value => setFieldValue('taxType', value)}
                        style={addClientStyles.picker}
                      >
                        <Picker.Item label="Tax Types" value="" />
                        <Picker.Item label="GST" value="gst" />
                        <Picker.Item label="CGST" value="cgst" />
                        <Picker.Item label="SGST" value="sgst" />
                      </Picker>
                    </View>
                    {touched.taxType && errors.taxType && (
                      <Text style={addClientStyles.errorText}>{errors.taxType}</Text>
                    )}

                    <View style={addClientStyles.row}>
                      <Image source={require('../../../assets/screen-18/nature.png')} style={addClientStyles.icon} />
                      <Picker
                        selectedValue={values.businessNature}
                        onValueChange={value => setFieldValue('businessNature', value)}
                        style={addClientStyles.picker}
                      >
                        <Picker.Item label="Nature of Business" value="" />
                        <Picker.Item label="Retail" value="retail" />
                        <Picker.Item label="Wholesale" value="wholesale" />
                      </Picker>
                    </View>
                    {touched.businessNature && errors.businessNature && (
                      <Text style={addClientStyles.errorText}>{errors.businessNature}</Text>
                    )}

                    <View style={addClientStyles.row}>
                      <Image source={require('../../../assets/screen-18/transaction.png')} style={addClientStyles.icon} />
                      <TextInput
                        placeholder="Client Detail"
                        placeholderTextColor="#aaa"
                        style={addClientStyles.input}
                        onChangeText={handleChange('clientDetail')}
                        onBlur={handleBlur('clientDetail')}
                        value={values.clientDetail}
                      />
                    </View>
                    {touched.clientDetail && errors.clientDetail && (
                      <Text style={addClientStyles.errorText}>{errors.clientDetail}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[addClientStyles.doneButton, isSubmitting && { opacity: 0.5 }]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <Text style={addClientStyles.doneText}>
                      {isSubmitting ? 'Saving...' : editingClient ? 'Update Client' : 'Save Client'}
                    </Text>
                  </TouchableOpacity>

                  {!editingClient && (
                    <>
                      <TouchableOpacity
                        style={[addClientStyles.doneButton, { backgroundColor: '#5c5cd6' }]}
                        onPress={exportClientsToCSV}
                      >
                        <Text style={addClientStyles.doneText}>Export File</Text>
                      </TouchableOpacity>

                      <View style={addClientStyles.clientList}>
                        <Text style={addClientStyles.listTitle}>All Clients</Text>
                        {clients.length === 0 ? (
                          <Text style={addClientStyles.noClientsText}>No clients found.</Text>
                        ) : (
                          clients.map((client, index) => (
                            <View key={client.id || index} style={addClientStyles.clientItem}>
                              <Text style={addClientStyles.clientText}>
                                🔹 {client.tradeName} | {client.phone}
                              </Text>
                              <Text style={addClientStyles.clientSubText}>📧 {client.email}</Text>
                              <Text style={addClientStyles.clientSubText}>🏠 {client.address}</Text>
                              <Text style={addClientStyles.clientSubText}>📦 {client.shippingAddress}</Text>
                              <Text style={addClientStyles.clientSubText}>🧾 {client.taxNo} ({client.taxType})</Text>
                              <Text style={addClientStyles.clientSubText}>🛒 {client.businessNature}</Text>
                            </View>
                          ))
                        )}
                      </View>
                    </>
                  )}
                </>
              )}
            </Formik>
          </ScrollView>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={['#55d04c39', 'rgba(76, 208, 76, 0)']}
          style={styles.container}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Invoice-m')} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Client</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Add Button and Title */}
          <View style={styles.fixedTop}>
            <TouchableOpacity style={styles.addClientButton} onPress={handleContinue}>
              <Text style={styles.addClientText}>+ Add New Client</Text>
            </TouchableOpacity>
            <Text style={styles.clientListTitle}>Client List :</Text>
          </View>

          {/* Scrollable List */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {clients.length === 0 ? (
              <Text style={{ fontSize: 14, color: '#888', fontStyle: 'italic' }}>
                No clients found.
              </Text>
            ) : (
              clients.map((client) => (
                <View key={client.id} style={styles.clientWrapper}>
                  <TouchableOpacity
                    style={styles.clientCard}
                    onPress={() => console.log('Tapped:', client.tradeName)}
                  >
                    <View>
                      <Text style={styles.clientName}>{client.tradeName}</Text>
                      <Text style={styles.clientDetails}>+91 {client.phone}</Text>
                      <Text style={styles.clientDetails}>{client.businessNature}</Text>
                    </View>

                    <TouchableOpacity onPress={() => toggleClientMenu(client.id)}>
                      <Ionicons name="ellipsis-vertical" size={20} color="#000" />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  {selectedClientId === client.id && (
                    <View style={styles.dropdown}>
                      <TouchableOpacity onPress={() => handleEdit(client)}>
                        <Text style={styles.dropdownItem}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleRemove(client.id)}>
                        <Text style={[styles.dropdownItem, { color: 'red' }]}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))
            )}
          </ScrollView>
        </LinearGradient>
      )}
    </ScrollView>
  );
};

export default ClientScreen;

// Styles for Client List Screen
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#4CD04D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
    zIndex: 1,
  },
  fixedTop: {
    padding: 15,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  addClientButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addClientText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  clientListTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  clientCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    zIndex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
  },
  clientDetails: {
    marginTop: 2,
    fontSize: 13,
    color: '#000000',
  },
  clientWrapper: {
    marginBottom: 15,
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 15,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});

// Styles for Add Client Screen
const addClientStyles = StyleSheet.create({
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
    backgroundColor: '#fff',
    borderRadius: scale(16),
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
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
  clientList: {
    marginTop: verticalScale(25),
    padding: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    marginBottom: verticalScale(40),
  },
  listTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    color: '#333',
  },
  clientItem: {
    marginBottom: verticalScale(10),
    padding: scale(10),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(8),
    backgroundColor: '#f9f9f9',
  },
  clientText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#2a2a2a',
  },
  clientSubText: {
    fontSize: scale(12),
    color: '#555',
  },
  noClientsText: {
    fontSize: scale(14),
    color: '#999',
    fontStyle: 'italic',
  },
});