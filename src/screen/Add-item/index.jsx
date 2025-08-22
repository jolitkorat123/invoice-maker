// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Keyboard,
//   Alert,
//   ScrollView,
//   FlatList,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as SQLite from 'expo-sqlite';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';

// const validationSchema = Yup.object().shape({
//   itemName: Yup.string().required('Item name is required'),
//   itemPrice: Yup.string()
//     .matches(/^\d+$/, 'Price must be numeric')
//     .required('Price is required'),
//   unit: Yup.string().required('Unit is required'),
//   description: Yup.string().required('Description is required'),
// });

// const AddItemScreen = () => {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const navigation = useNavigation();
//   const [db, setDb] = useState(null);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true
//         });
//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS items (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             itemName TEXT NOT NULL,
//             itemPrice TEXT NOT NULL,
//             unit TEXT NOT NULL,
//             description TEXT NOT NULL
//           );
//         `);
//         setDb(database);
//         await refreshItemList(database);
//       } catch (err) {
//         console.error('❌ Item DB Init Error:', err);
//       }
//     };

//     initDb();

//     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardVisible(true);
//     });
//     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardVisible(false);
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   const refreshItemList = async (database = db) => {
//     if (!database) return;
//     try {
//       const rows = await database.getAllAsync(`SELECT * FROM items`);
//       setItems(rows);
//     } catch (error) {
//       console.error('❌ Fetch Items Error:', error);
//     }
//   };

//   const saveItemToDb = async (values, resetForm) => {
//     if (!db) {
//       Alert.alert('Database not ready');
//       return;
//     }

//     try {
//       await db.runAsync(
//         `INSERT INTO items (itemName, itemPrice, unit, description) VALUES (?, ?, ?, ?)`,
//         [values.itemName, values.itemPrice, values.unit, values.description]
//       );

//       Alert.alert('Success', 'Item saved successfully', [
//         {
//           text: 'OK',
//           onPress: () => {
//             resetForm();
//             refreshItemList();
//             navigation.goBack(); // or stay
//           },
//         },
//       ]);
//     } catch (error) {
//       console.error('❌ Save Item Error:', error);
//       Alert.alert('Error', 'Failed to save item.');
//     }
//   };

//   const exportDb = async () => {
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
//       Alert.alert('Export Error', error.message);
//       console.error('❌ Export DB Error:', error);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
//       style={styles.container}
//     >
//       <ScrollView keyboardShouldPersistTaps="handled">
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Add item</Text>
//         </View>

//         <Formik
//           initialValues={{ itemName: '', itemPrice: '', unit: '', description: '' }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { resetForm }) => saveItemToDb(values, resetForm)}
//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//             setFieldValue,
//           }) => (
//             <>
//               <View style={styles.card}>
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/item-name.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Name"
//                     placeholderTextColor="#ccc"
//                     style={styles.input}
//                     onChangeText={handleChange('itemName')}
//                     onBlur={handleBlur('itemName')}
//                     value={values.itemName}
//                   />
//                 </View>
//                 {touched.itemName && errors.itemName && (
//                   <Text style={styles.errorText}>{errors.itemName}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/item-price.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Price"
//                     placeholderTextColor="#ccc"
//                     keyboardType="numeric"
//                     style={styles.input}
//                     onChangeText={handleChange('itemPrice')}
//                     onBlur={handleBlur('itemPrice')}
//                     value={values.itemPrice}
//                   />
//                 </View>
//                 {touched.itemPrice && errors.itemPrice && (
//                   <Text style={styles.errorText}>{errors.itemPrice}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.unit}
//                     onValueChange={(value) => setFieldValue('unit', value)}
//                     style={styles.picker}
//                   >
//                     <Picker.Item label="Unit of Measure" value="" />
//                     <Picker.Item label="Kg" value="kg" />
//                     <Picker.Item label="Gram" value="g" />
//                     <Picker.Item label="Piece" value="pc" />
//                   </Picker>
//                 </View>
//                 {touched.unit && errors.unit && (
//                   <Text style={styles.errorText}>{errors.unit}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/description.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Description"
//                     placeholderTextColor="#ccc"
//                     style={styles.input}
//                     onChangeText={handleChange('description')}
//                     onBlur={handleBlur('description')}
//                     value={values.description}
//                   />
//                 </View>
//                 {touched.description && errors.description && (
//                   <Text style={styles.errorText}>{errors.description}</Text>
//                 )}
//               </View>

//               {!keyboardVisible && (
//                 <TouchableOpacity onPress={handleSubmit} style={styles.doneButton}>
//                   <Text style={styles.doneText}>Done</Text>
//                 </TouchableOpacity>
//               )}
//             </>
//           )}
//         </Formik>

//         {/* Export Button */}
//         <TouchableOpacity onPress={exportDb} style={styles.exportButton}>
//           <Text style={styles.exportText}>Export DB</Text>
//         </TouchableOpacity>

//         {/* List of Items */}
//         <Text style={styles.listHeader}>Saved Items</Text>
//         {items.length === 0 ? (
//           <Text style={styles.noDataText}>No items added yet.</Text>
//         ) : (
//           <FlatList
//             data={items}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.itemRow}>
//                 <Text style={styles.itemText}>
//                   🧾 {item.itemName} | ₹{item.itemPrice} | {item.unit}
//                 </Text>
//                 <Text style={styles.itemSubText}>📝 {item.description}</Text>
//               </View>
//             )}
//           />
//         )}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: scale(20),
//     paddingTop: verticalScale(15),
//     backgroundColor: '#f9fff9',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },
//    backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(5),
//     paddingVertical: verticalScale(5),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(25),
//     fontWeight: 'bold',
//     marginRight: scale(28),
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     padding: scale(16),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 1,
//     marginBottom: verticalScale(20),
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     marginBottom: verticalScale(10),
//     paddingBottom: verticalScale(5),
//   },
//   icon: {
//     width: scale(20),
//     height: scale(20),
//     marginRight: scale(12),
//     resizeMode: 'contain',
//     tintColor: '#4CD04D',
//   },
//   input: {
//     flex: 1,
//     fontSize: scale(16),
//     color: '#333',
//   },
//   picker: {
//     flex: 1,
//     color: '#333',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     backgroundColor: '#4CD04D',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
//   exportButton: {
//     backgroundColor: '#0080ff',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(10),
//     alignItems: 'center',
//     marginVertical: verticalScale(10),
//   },
//   exportText: {
//     color: '#fff',
//     fontSize: scale(16),
//     fontWeight: 'bold',
//   },
//   listHeader: {
//     fontSize: scale(18),
//     fontWeight: 'bold',
//     marginTop: verticalScale(10),
//     marginBottom: verticalScale(5),
//     color: '#333',
//   },
//   noDataText: {
//     textAlign: 'center',
//     fontSize: scale(14),
//     color: '#999',
//     marginBottom: verticalScale(10),
//   },
//   itemRow: {
//     backgroundColor: '#f4f4f4',
//     padding: scale(10),
//     borderRadius: scale(10),
//     marginBottom: verticalScale(8),
//   },
//   itemText: {
//     fontSize: scale(15),
//     fontWeight: '600',
//     color: '#222',
//   },
//   itemSubText: {
//     fontSize: scale(13),
//     color: '#555',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: scale(12),
//     marginBottom: verticalScale(8),
//     marginLeft: scale(5),
//   },
// });

// export default AddItemScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Keyboard,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as SQLite from 'expo-sqlite';

// const validationSchema = Yup.object().shape({
//   itemName: Yup.string().required('Item name is required'),
//   itemPrice: Yup.string()
//     .matches(/^\d+$/, 'Price must be numeric')
//     .required('Price is required'),
//   unit: Yup.string().required('Unit is required'),
//   description: Yup.string().required('Description is required'),
// });

// const AddItemScreen = () => {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const navigation = useNavigation();
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true,
//         });
//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS items (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             itemName TEXT NOT NULL,
//             itemPrice TEXT NOT NULL,
//             unit TEXT NOT NULL,
//             description TEXT NOT NULL
//           );
//         `);
//         setDb(database);
//       } catch (err) {
//         console.error('❌ Item DB Init Error:', err);
//       }
//     };

//     initDb();

//     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardVisible(true);
//     });
//     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardVisible(false);
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   const saveItemToDb = async (values, resetForm) => {
//     if (!db) {
//       Alert.alert('Database not ready');
//       return;
//     }

//     try {
//       await db.runAsync(
//         `INSERT INTO items (itemName, itemPrice, unit, description) VALUES (?, ?, ?, ?)`,
//         [values.itemName, values.itemPrice, values.unit, values.description]
//       );

//       Alert.alert('Success', 'Item saved successfully', [
//         {
//           text: 'OK',
//           onPress: () => {
//             resetForm();
//             navigation.goBack(); // or stay
//           },
//         },
//       ]);
//     } catch (error) {
//       console.error('❌ Save Item Error:', error);
//       Alert.alert('Error', 'Failed to save item.');
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
//       style={styles.container}
//     >
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Add item</Text>
//         </View>

//         <Formik
//           initialValues={{ itemName: '', itemPrice: '', unit: '', description: '' }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { resetForm }) => saveItemToDb(values, resetForm)}
//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//             setFieldValue,
//           }) => (
//             <>
//               <View style={styles.card}>
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/item-name.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Name"
//                     placeholderTextColor="#ccc"
//                     style={styles.input}
//                     onChangeText={handleChange('itemName')}
//                     onBlur={handleBlur('itemName')}
//                     value={values.itemName}
//                   />
//                 </View>
//                 {touched.itemName && errors.itemName && (
//                   <Text style={styles.errorText}>{errors.itemName}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/item-price.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Price"
//                     placeholderTextColor="#ccc"
//                     keyboardType="numeric"
//                     style={styles.input}
//                     onChangeText={handleChange('itemPrice')}
//                     onBlur={handleBlur('itemPrice')}
//                     value={values.itemPrice}
//                   />
//                 </View>
//                 {touched.itemPrice && errors.itemPrice && (
//                   <Text style={styles.errorText}>{errors.itemPrice}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.unit}
//                     onValueChange={(value) => setFieldValue('unit', value)}
//                     style={[
//                       styles.picker,
//                       { color: values.unit  ? '#000' : '#c4c4c4ff' }
//                     ]}
//                   >
//                     <Picker.Item label="Unit of Measure" value="" />
//                     <Picker.Item label="Kg" value="kg" />
//                     <Picker.Item label="Gram" value="g" />
//                     <Picker.Item label="Piece" value="pc" />
//                   </Picker>
//                 </View>
//                 {touched.unit && errors.unit && (
//                   <Text style={styles.errorText}>{errors.unit}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/description.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Description"
//                     placeholderTextColor="#ccc"
//                     style={styles.input}
//                     onChangeText={handleChange('description')}
//                     onBlur={handleBlur('description')}
//                     value={values.description}
//                   />
//                 </View>
//                 {touched.description && errors.description && (
//                   <Text style={styles.errorText}>{errors.description}</Text>
//                 )}
//               </View>

//               {!keyboardVisible && (
//                 <TouchableOpacity onPress={handleSubmit} style={styles.doneButton}>
//                   <Text style={styles.doneText}>Done</Text>
//                 </TouchableOpacity>
//               )}
//             </>
//           )}
//         </Formik>
      
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: scale(20),
//     paddingTop: verticalScale(15),
//     backgroundColor: '#f9fff9',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(5),
//     paddingVertical: verticalScale(5),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(25),
//     fontWeight: 'bold',
//     marginRight: scale(28),
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     padding: scale(16),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 1,
//     marginBottom: verticalScale(20),
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     marginBottom: verticalScale(10),
//     paddingBottom: verticalScale(5),
//   },
//   icon: {
//     width: scale(20),
//     height: scale(20),
//     marginRight: scale(12),
//     resizeMode: 'contain',
//     tintColor: '#4CD04D',
//   },
//   input: {
//     flex: 1,
//     fontSize: scale(16),
//     color: '#333',
//   },
//   picker: {
//     flex: 1,
//     color: '#333',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     backgroundColor: '#4CD04D',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     position: 'absolute',
//   bottom: verticalScale(20),
//   left: scale(20),
//   right: scale(20),

//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: scale(12),
//     marginBottom: verticalScale(8),
//     marginLeft: scale(5),
//   },
// });

// export default AddItemScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Keyboard,
//   Alert,
//   ScrollView,
//   Modal,
//   FlatList,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as SQLite from 'expo-sqlite';

// const validationSchema = Yup.object().shape({
//   itemName: Yup.string().required('Item name is required'),
//   itemPrice: Yup.string()
//     .matches(/^\d+$/, 'Price must be numeric')
//     .required('Price is required'),
//   unit: Yup.string().required('Unit is required'),
//   description: Yup.string().required('Description is required'),
// });

// const AddItemScreen = () => {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [items, setItems] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const navigation = useNavigation();
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true,
//         });
//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS items (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             itemName TEXT NOT NULL,
//             itemPrice TEXT NOT NULL,
//             unit TEXT NOT NULL,
//             description TEXT NOT NULL
//           );
//         `);
//         setDb(database);
//         loadItems(database);
//       } catch (err) {
//         console.error('❌ Item DB Init Error:', err);
//       }
//     };

//     initDb();

//     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardVisible(true);
//     });
//     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardVisible(false);
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   const loadItems = async (database = db) => {
//     if (!database) return;
    
//     try {
//       const allItems = await database.getAllAsync('SELECT * FROM items');
//       setItems(allItems);
//     } catch (error) {
//       console.error('❌ Load Items Error:', error);
//     }
//   };

//   const saveItemToDb = async (values, resetForm) => {
//     if (!db) {
//       Alert.alert('Database not ready');
//       return;
//     }

//     try {
//       if (editingItem) {
//         // Update existing item
//         await db.runAsync(
//           `UPDATE items SET itemName = ?, itemPrice = ?, unit = ?, description = ? WHERE id = ?`,
//           [values.itemName, values.itemPrice, values.unit, values.description, editingItem.id]
//         );
//         Alert.alert('Success', 'Item updated successfully');
//         setEditingItem(null);
//       } else {
//         // Insert new item
//         await db.runAsync(
//           `INSERT INTO items (itemName, itemPrice, unit, description) VALUES (?, ?, ?, ?)`,
//           [values.itemName, values.itemPrice, values.unit, values.description]
//         );
//         Alert.alert('Success', 'Item saved successfully');
//       }

//       resetForm();
//       loadItems();
//     } catch (error) {
//       console.error('❌ Save Item Error:', error);
//       Alert.alert('Error', 'Failed to save item.');
//     }
//   };

//   const editItem = (item) => {
//     setEditingItem(item);
//     setShowOptions(false);
//   };

//   const deleteItem = async (item) => {
//     if (!db) return;
    
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this item?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await db.runAsync('DELETE FROM items WHERE id = ?', [item.id]);
//               Alert.alert('Success', 'Item deleted successfully');
//               loadItems();
//             } catch (error) {
//               console.error('❌ Delete Item Error:', error);
//               Alert.alert('Error', 'Failed to delete item.');
//             }
//           },
//         },
//       ]
//     );
//     setShowOptions(false);
//   };

//   const ItemCard = ({ item }) => (
//     <View style={styles.itemCard}>
//       <View style={styles.itemInfo}>
//         <Text style={styles.itemName}>{item.itemName}</Text>
//         <Text style={styles.itemDetails}>
//           {item.itemPrice} • {item.unit} • {item.description}
//         </Text>
//       </View>
//       <TouchableOpacity 
//         onPress={() => {
//           setSelectedItem(item);
//           setShowOptions(true);
//         }}
//         style={styles.optionsButton}
//       >
//         <Ionicons name="ellipsis-vertical" size={20} color="#888" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <LinearGradient
//       colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
//       style={styles.container}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add item</Text>
//       </View>

//       <Formik
//         initialValues={{ 
//           itemName: editingItem?.itemName || '', 
//           itemPrice: editingItem?.itemPrice || '', 
//           unit: editingItem?.unit || '', 
//           description: editingItem?.description || '' 
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values, { resetForm }) => saveItemToDb(values, resetForm)}
//         enableReinitialize
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//           setFieldValue,
//           resetForm,
//         }) => (
//           <>
//             <View style={styles.card}>
//               <View style={styles.inputRow}>
//                 <Image source={require('../../../assets/screen-21/item-name.png')} style={styles.icon} />
//                 <TextInput
//                   placeholder="Item Name"
//                   placeholderTextColor="#ccc"
//                   style={styles.input}
//                   onChangeText={handleChange('itemName')}
//                   onBlur={handleBlur('itemName')}
//                   value={values.itemName}
//                 />
//               </View>
//               {touched.itemName && errors.itemName && (
//                 <Text style={styles.errorText}>{errors.itemName}</Text>
//               )}

//               <View style={styles.inputRow}>
//                 <Image source={require('../../../assets/screen-21/item-price.png')} style={styles.icon} />
//                 <TextInput
//                   placeholder="Item Price"
//                   placeholderTextColor="#ccc"
//                   keyboardType="numeric"
//                   style={styles.input}
//                   onChangeText={handleChange('itemPrice')}
//                   onBlur={handleBlur('itemPrice')}
//                   value={values.itemPrice}
//                 />
//               </View>
//               {touched.itemPrice && errors.itemPrice && (
//                 <Text style={styles.errorText}>{errors.itemPrice}</Text>
//               )}

//               <View style={styles.inputRow}>
//                 <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
//                 <Picker
//                   selectedValue={values.unit}
//                   onValueChange={(value) => setFieldValue('unit', value)}
//                   style={[
//                     styles.picker,
//                     { color: values.unit  ? '#000' : '#c4c4c4ff' }
//                   ]}
//                 >
//                   <Picker.Item label="Unit of Measure" value="" />
//                   <Picker.Item label="Kg" value="kg" />
//                   <Picker.Item label="Gram" value="g" />
//                   <Picker.Item label="Piece" value="pc" />
//                 </Picker>
//               </View>
//               {touched.unit && errors.unit && (
//                 <Text style={styles.errorText}>{errors.unit}</Text>
//               )}

//               <View style={styles.inputRow}>
//                 <Image source={require('../../../assets/screen-21/description.png')} style={styles.icon} />
//                 <TextInput
//                   placeholder="Item Description"
//                   placeholderTextColor="#ccc"
//                   style={styles.input}
//                   onChangeText={handleChange('description')}
//                   onBlur={handleBlur('description')}
//                   value={values.description}
//                 />
//               </View>
//               {touched.description && errors.description && (
//                 <Text style={styles.errorText}>{errors.description}</Text>
//               )}
//             </View>

//             {!keyboardVisible && (
//               <TouchableOpacity onPress={handleSubmit} style={styles.doneButton}>
//                 <Text style={styles.doneText}>
//                   {editingItem ? 'Update Item' : 'Add Item'}
//                 </Text>
//               </TouchableOpacity>
//             )}

//             {editingItem && !keyboardVisible && (
//               <TouchableOpacity 
//                 onPress={() => {
//                   setEditingItem(null);
//                   resetForm();
//                 }} 
//                 style={styles.cancelButton}
//               >
//                 <Text style={styles.cancelText}>Cancel Edit</Text>
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </Formik>

//       {items.length > 0 && (
//         <View style={styles.itemsListContainer}>
//           <Text style={styles.sectionTitle}>Saved Items</Text>
//           <FlatList
//             data={items}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => <ItemCard item={item} />}
//             style={styles.itemsList}
//           />
//         </View>
//       )}

//       {/* Options Modal */}
//       <Modal
//         visible={showOptions}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowOptions(false)}
//       >
//         <TouchableOpacity 
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setShowOptions(false)}
//         >
//           <View style={styles.optionsModal}>
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => editItem(selectedItem)}
//             >
//               <Ionicons name="create-outline" size={20} color="#4CD04D" />
//               <Text style={styles.optionText}>Edit</Text>
//             </TouchableOpacity>
            
//             <View style={styles.divider} />
            
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => deleteItem(selectedItem)}
//             >
//               <Ionicons name="trash-outline" size={20} color="#FF3B30" />
//               <Text style={[styles.optionText, { color: '#FF3B30' }]}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: scale(20),
//     paddingTop: verticalScale(15),
//     backgroundColor: '#f9fff9',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(5),
//     paddingVertical: verticalScale(5),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(25),
//     fontWeight: 'bold',
//     marginRight: scale(28),
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     padding: scale(16),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 1,
//     marginBottom: verticalScale(20),
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     marginBottom: verticalScale(10),
//     paddingBottom: verticalScale(5),
//   },
//   icon: {
//     width: scale(20),
//     height: scale(20),
//     marginRight: scale(12),
//     resizeMode: 'contain',
//     tintColor: '#4CD04D',
//   },
//   input: {
//     flex: 1,
//     fontSize: scale(16),
//     color: '#333',
//   },
//   picker: {
//     flex: 1,
//     color: '#333',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     backgroundColor: '#4CD04D',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     marginBottom: verticalScale(20),
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
//   cancelText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: scale(12),
//     marginBottom: verticalScale(8),
//     marginLeft: scale(5),
//   },
//   itemsListContainer: {
//     flex: 1,
//     marginTop: verticalScale(10),
//   },
//   sectionTitle: {
//     fontSize: scale(18),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(10),
//     color: '#333',
//   },
//   itemsList: {
//     flex: 1,
//   },
//   itemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: scale(15),
//     borderRadius: scale(12),
//     marginBottom: verticalScale(10),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: scale(16),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(5),
//     color: '#333',
//   },
//   itemDetails: {
//     fontSize: scale(14),
//     color: '#888',
//   },
//   optionsButton: {
//     padding: scale(5),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   optionsModal: {
//     backgroundColor: '#fff',
//     borderRadius: scale(12),
//     padding: scale(15),
//     width: '70%',
//   },
//   optionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(12),
//   },
//   optionText: {
//     fontSize: scale(16),
//     marginLeft: scale(10),
//     color: '#333',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: verticalScale(5),
//   },
// });

// export default AddItemScreen;

// import React, { useEffect, useState } from 'react';

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Keyboard,
//   Alert,
//   ScrollView,
//   Modal,
//   FlatList,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import * as SQLite from 'expo-sqlite';

// const validationSchema = Yup.object().shape({
//   itemName: Yup.string().required('Item name is required'),
//   itemPrice: Yup.string()
//     .matches(/^\d+$/, 'Price must be numeric')
//     .required('Price is required'),
//   unit: Yup.string().required('Unit is required'),
//   description: Yup.string().required('Description is required'),
// });

// const AddItemScreen = ({ route }) => {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [items, setItems] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const navigation = useNavigation();
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true,
//         });
//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS items (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             itemName TEXT NOT NULL,
//             itemPrice TEXT NOT NULL,
//             unit TEXT NOT NULL,
//             description TEXT NOT NULL
//           );
//         `);
//         setDb(database);
//         loadItems(database);
//       } catch (err) {
//         console.error('❌ Item DB Init Error:', err);
//       }
//     };

//     initDb();

//     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardVisible(true);
//     });
//     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardVisible(false);
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   // Load items when screen comes into focus
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       if (db) {
//         loadItems();
//       }
//     });

//     return unsubscribe;
//   }, [navigation, db]);

//   const loadItems = async (database = db) => {
//     if (!database) return;
    
//     try {
//       const allItems = await database.getAllAsync('SELECT * FROM items');
//       setItems(allItems);
//     } catch (error) {
//       console.error('❌ Load Items Error:', error);
//     }
//   };

//   const saveItemToDb = async (values, { resetForm }) => {
//     if (!db) {
//       Alert.alert('Database not ready');
//       return;
//     }

//     try {
//       if (editingItem) {
//         // Update existing item
//         await db.runAsync(
//           `UPDATE items SET itemName = ?, itemPrice = ?, unit = ?, description = ? WHERE id = ?`,
//           [values.itemName, values.itemPrice, values.unit, values.description, editingItem.id]
//         );
//         Alert.alert('Success', 'Item updated successfully');
//         setEditingItem(null);
//       } else {
//         // Insert new item
//         await db.runAsync(
//           `INSERT INTO items (itemName, itemPrice, unit, description) VALUES (?, ?, ?, ?)`,
//           [values.itemName, values.itemPrice, values.unit, values.description]
//         );
//         Alert.alert('Success', 'Item saved successfully');
//       }

//       resetForm();
//       loadItems();
      
//       // Call the onGoBack callback if provided
//       if (route.params?.onGoBack) {
//         route.params.onGoBack();
//       }
//     } catch (error) {
//       console.error('❌ Save Item Error:', error);
//       Alert.alert('Error', 'Failed to save item.');
//     }
//   };

//   const editItem = (item) => {
//     setEditingItem(item);
//     setShowOptions(false);
//   };

//   const deleteItem = async (item) => {
//     if (!db) return;
    
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this item?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await db.runAsync('DELETE FROM items WHERE id = ?', [item.id]);
//               Alert.alert('Success', 'Item deleted successfully');
//               loadItems();
//             } catch (error) {
//               console.error('❌ Delete Item Error:', error);
//               Alert.alert('Error', 'Failed to delete item.');
//             }
//           },
//         },
//       ]
//     );
//     setShowOptions(false);
//   };

//   const ItemCard = ({ item }) => (
//     <View style={styles.itemCard}>
//       <View style={styles.itemInfo}>
//         <Text style={styles.itemName}>{item.itemName}</Text>
//         <Text style={styles.itemDetails}>
//           Price: ₹{item.itemPrice} • Unit: {item.unit}
//         </Text>
//         <Text style={styles.itemDescription} numberOfLines={1}>
//           {item.description}
//         </Text>
//       </View>
//       <TouchableOpacity 
//         onPress={() => {
//           setSelectedItem(item);
//           setShowOptions(true);
//         }}
//         style={styles.optionsButton}
//       >
//         <Ionicons name="ellipsis-vertical" size={20} color="#888" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <LinearGradient
//       colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
//       style={styles.container}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add item</Text>
//       </View>

//       <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
//         <Formik
//           initialValues={{ 
//             itemName: editingItem?.itemName || '', 
//             itemPrice: editingItem?.itemPrice || '', 
//             unit: editingItem?.unit || '', 
//             description: editingItem?.description || '' 
//           }}
//           validationSchema={validationSchema}
//           onSubmit={saveItemToDb}
//           enableReinitialize
//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//             setFieldValue,
//             resetForm,
//           }) => (
//             <>
//               <View style={styles.card}>
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/item-name.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Name"
//                     placeholderTextColor="#ccc"
//                     style={styles.input}
//                     onChangeText={handleChange('itemName')}
//                     onBlur={handleBlur('itemName')}
//                     value={values.itemName}
//                   />
//                 </View>
//                 {touched.itemName && errors.itemName && (
//                   <Text style={styles.errorText}>{errors.itemName}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/item-price.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Price"
//                     placeholderTextColor="#ccc"
//                     keyboardType="numeric"
//                     style={styles.input}
//                     onChangeText={handleChange('itemPrice')}
//                     onBlur={handleBlur('itemPrice')}
//                     value={values.itemPrice}
//                   />
//                 </View>
//                 {touched.itemPrice && errors.itemPrice && (
//                   <Text style={styles.errorText}>{errors.itemPrice}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
//                   <Picker
//                     selectedValue={values.unit}
//                     onValueChange={(value) => setFieldValue('unit', value)}
//                     style={[
//                       styles.picker,
//                       { color: values.unit  ? '#000' : '#c4c4c4ff' }
//                     ]}
//                   >
//                     <Picker.Item label="Unit of Measure" value="" />
//                     <Picker.Item label="Kg" value="kg" />
//                     <Picker.Item label="Gram" value="g" />
//                     <Picker.Item label="Piece" value="pc" />
//                   </Picker>
//                 </View>
//                 {touched.unit && errors.unit && (
//                   <Text style={styles.errorText}>{errors.unit}</Text>
//                 )}

//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-21/description.png')} style={styles.icon} />
//                   <TextInput
//                     placeholder="Item Description"
//                     placeholderTextColor="#ccc"
//                     style={styles.input}
//                     onChangeText={handleChange('description')}
//                     onBlur={handleBlur('description')}
//                     value={values.description}
//                   />
//                 </View>
//                 {touched.description && errors.description && (
//                   <Text style={styles.errorText}>{errors.description}</Text>
//                 )}
//               </View>

//               {!keyboardVisible && (
//                 <TouchableOpacity onPress={handleSubmit} style={styles.doneButton}>
//                   <Text style={styles.doneText}>
//                     {editingItem ? 'Update Item' : 'Add Item'}
//                   </Text>
//                 </TouchableOpacity>
//               )}

//               {editingItem && !keyboardVisible && (
//                 <TouchableOpacity 
//                   onPress={() => {
//                     setEditingItem(null);
//                     resetForm();
//                   }} 
//                   style={styles.cancelButton}
//                 >
//                   <Text style={styles.cancelText}>Cancel Edit</Text>
//                 </TouchableOpacity>
//               )}
//             </>
//           )}
//         </Formik>

//         {items.length > 0 && (
//           <View style={styles.itemsListContainer}>
//             <Text style={styles.sectionTitle}>Saved Items</Text>
//             <FlatList
//               data={items}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => <ItemCard item={item} />}
//               scrollEnabled={false}
//             />
//           </View>
//         )}
//       </ScrollView>

//       {/* Options Modal */}
//       <Modal
//         visible={showOptions}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowOptions(false)}
//       >
//         <TouchableOpacity 
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setShowOptions(false)}
//         >
//           <View style={styles.optionsModal}>
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => editItem(selectedItem)}
//             >
//               <Ionicons name="create-outline" size={20} color="#4CD04D" />
//               <Text style={styles.optionText}>Edit</Text>
//             </TouchableOpacity>
            
//             <View style={styles.divider} />
            
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => deleteItem(selectedItem)}
//             >
//               <Ionicons name="trash-outline" size={20} color="#FF3B30" />
//               <Text style={[styles.optionText, { color: '#FF3B30' }]}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fff9',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: scale(20),
//     paddingTop: verticalScale(15),
//     paddingBottom: verticalScale(20),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(15),
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(5),
//     paddingVertical: verticalScale(5),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(25),
//     fontWeight: 'bold',
//     marginRight: scale(28),
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     padding: scale(16),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 1,
//     marginBottom: verticalScale(20),
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     marginBottom: verticalScale(10),
//     paddingBottom: verticalScale(5),
//   },
//   icon: {
//     width: scale(20),
//     height: scale(20),
//     marginRight: scale(12),
//     resizeMode: 'contain',
//     tintColor: '#4CD04D',
//   },
//   input: {
//     flex: 1,
//     fontSize: scale(16),
//     color: '#333',
//   },
//   picker: {
//     flex: 1,
//     color: '#333',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     backgroundColor: '#4CD04D',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     marginBottom: verticalScale(20),
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
//   cancelText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: scale(12),
//     marginBottom: verticalScale(8),
//     marginLeft: scale(5),
//   },
//   itemsListContainer: {
//     marginTop: verticalScale(10),
//   },
//   sectionTitle: {
//     fontSize: scale(18),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(10),
//     color: '#333',
//   },
//   itemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: scale(15),
//     borderRadius: scale(12),
//     marginBottom: verticalScale(10),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: scale(16),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(5),
//     color: '#333',
//   },
//   itemDetails: {
//     fontSize: scale(14),
//     color: '#666',
//     marginBottom: verticalScale(3),
//   },
//   itemDescription: {
//     fontSize: scale(12),
//     color: '#888',
//   },
//   optionsButton: {
//     padding: scale(5),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   optionsModal: {
//     backgroundColor: '#fff',
//     borderRadius: scale(12),
//     padding: scale(15),
//     width: '70%',
//   },
//   optionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(12),
//   },
//   optionText: {
//     fontSize: scale(16),
//     marginLeft: scale(10),
//     color: '#333',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: verticalScale(5),
//   },
// });

// export default AddItemScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SQLite from 'expo-sqlite';

const validationSchema = Yup.object().shape({
  itemName: Yup.string().required('Item name is required'),
  itemPrice: Yup.string()
    .matches(/^\d+$/, 'Price must be numeric')
    .required('Price is required'),
  unit: Yup.string().required('Unit is required'),
  description: Yup.string().required('Description is required'),
});

const AddItemScreen = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [db, setDb] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true,
        });
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            itemName TEXT NOT NULL,
            itemPrice TEXT NOT NULL,
            unit TEXT NOT NULL,
            description TEXT NOT NULL
          );
        `);
        setDb(database);
      } catch (err) {
        console.error('❌ Item DB Init Error:', err);
      }
    };

    initDb();

    if (route.params?.item) {
      setEditingItem(route.params.item);
    }

    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [route.params]);

  const initialValues = {
    itemName: editingItem?.itemName || '',
    itemPrice: editingItem?.itemPrice || '',
    unit: editingItem?.unit || '',
    description: editingItem?.description || '',
  };

  const saveItemToDb = async (values, resetForm) => {
    if (!db) {
      Alert.alert('Database not ready');
      return;
    }

    try {
      if (editingItem) {
        await db.runAsync(
          `UPDATE items SET itemName = ?, itemPrice = ?, unit = ?, description = ? WHERE id = ?`,
          [values.itemName, values.itemPrice, values.unit, values.description, editingItem.id]
        );
        Alert.alert('Success', 'Item updated successfully');
      } else {
        await db.runAsync(
          `INSERT INTO items (itemName, itemPrice, unit, description) VALUES (?, ?, ?, ?)`,
          [values.itemName, values.itemPrice, values.unit, values.description]
        );
        Alert.alert('Success', 'Item saved successfully');
      }

      resetForm();
      navigation.goBack();
    } catch (error) {
      console.error('❌ Save Item Error:', error);
      Alert.alert('Error', 'Failed to save item.');
    }
  };

  return (
    <LinearGradient
      colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{editingItem ? 'Edit Item' : 'Add Item'}</Text>
      </View>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => saveItemToDb(values, resetForm)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <View style={styles.card}>
              <View style={styles.inputRow}>
                <Image source={require('../../../assets/screen-21/item-name.png')} style={styles.icon} />
                <TextInput
                  placeholder="Item Name"
                  placeholderTextColor="#ccc"
                  style={styles.input}
                  onChangeText={handleChange('itemName')}
                  onBlur={handleBlur('itemName')}
                  value={values.itemName}
                />
              </View>
              {touched.itemName && errors.itemName && (
                <Text style={styles.errorText}>{errors.itemName}</Text>
              )}

              <View style={styles.inputRow}>
                <Image source={require('../../../assets/screen-21/item-price.png')} style={styles.icon} />
                <TextInput
                  placeholder="Item Price"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  style={styles.input}
                  onChangeText={handleChange('itemPrice')}
                  onBlur={handleBlur('itemPrice')}
                  value={values.itemPrice}
                />
              </View>
              {touched.itemPrice && errors.itemPrice && (
                <Text style={styles.errorText}>{errors.itemPrice}</Text>
              )}

              <View style={styles.inputRow}>
                <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
                <Picker
                  selectedValue={values.unit}
                  onValueChange={(value) => setFieldValue('unit', value)}
                  style={[
                    styles.picker,
                    { color: values.unit ? '#000' : '#c4c4c4ff' }
                  ]}
                >
                  <Picker.Item label="Unit of Measure" value="" />
                  <Picker.Item label="Kg" value="kg" />
                  <Picker.Item label="Gram" value="g" />
                  <Picker.Item label="Piece" value="pc" />
                </Picker>
              </View>
              {touched.unit && errors.unit && (
                <Text style={styles.errorText}>{errors.unit}</Text>
              )}

              <View style={styles.inputRow}>
                <Image source={require('../../../assets/screen-21/description.png')} style={styles.icon} />
                <TextInput
                  placeholder="Item Description"
                  placeholderTextColor="#ccc"
                  style={styles.input}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
              </View>
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            {!keyboardVisible && (
              <TouchableOpacity onPress={handleSubmit} style={styles.doneButton}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </Formik>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    paddingTop: verticalScale(15),
    backgroundColor: '#f9fff9',
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
    borderRadius: scale(16),
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: verticalScale(20),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: verticalScale(10),
    paddingBottom: verticalScale(5),
  },
  icon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(12),
    resizeMode: 'contain',
    tintColor: '#4CD04D',
  },
  input: {
    flex: 1,
    fontSize: scale(16),
    color: '#333',
  },
  picker: {
    flex: 1,
    color: '#333',
    fontSize: scale(16),
    marginLeft: -10,
  },
  doneButton: {
    backgroundColor: '#4CD04D',
    borderRadius: scale(30),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(20),
    right: scale(20),
  },
  doneText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    marginBottom: verticalScale(8),
    marginLeft: scale(5),
  },
});

export default AddItemScreen;

