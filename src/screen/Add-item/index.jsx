// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Keyboard,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// const AddItemScreen = ({ navigation }) => {
//   const [itemName, setItemName] = useState('');
//   const [itemPrice, setItemPrice] = useState('');
//   const [unit, setUnit] = useState('');
//   const [description, setDescription] = useState('');
//   const [keyboardVisible, setKeyboardVisible] = useState(false);

//   useEffect(() => {
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

//   return (
//     <LinearGradient
//       colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
//       style={styles.container}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add item</Text>
//       </View>

//       {/* Card */}
//       <View style={styles.card}>
//         {/* Item Name */}
//         <View style={styles.inputRow}>
//           <Image source={require('../../../assets/screen-21/item-name.png')} style={styles.icon} />
//           <TextInput
//             placeholder="Item Name"
//             placeholderTextColor="#ccc"
//             style={styles.input}
//             value={itemName}
//             onChangeText={setItemName}
//           />
//         </View>

//         {/* Item Price */}
//         <View style={styles.inputRow}>
//           <Image source={require('../../../assets/screen-21/item-price.png')} style={styles.icon} />
//           <TextInput
//             placeholder="Item Price"
//             placeholderTextColor="#ccc"
//             keyboardType="numeric"
//             style={styles.input}
//             value={itemPrice}
//             onChangeText={setItemPrice}
//           />
//         </View>

//         {/* Unit of Measure */}
//         <View style={styles.inputRow}>
//           <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
//           <Picker
//             selectedValue={unit}
//             onValueChange={(value) => setUnit(value)}
//             style={styles.picker}
//           >
//             <Picker.Item label="Unit of Measure" value="" />
//             <Picker.Item label="Kg" value="kg" />
//             <Picker.Item label="Gram" value="g" />
//             <Picker.Item label="Piece" value="pc" />
//           </Picker>
//         </View>

//         {/* Item Description */}
//         <View style={styles.inputRow}>
//           <Image source={require('../../../assets/screen-21/description.png')} style={styles.icon} />
//           <TextInput
//             placeholder="Item Description"
//             placeholderTextColor="#ccc"
//             style={styles.input}
//             value={description}
//             onChangeText={setDescription}
//           />
//         </View>
//       </View>

//       {/* Done Button */}
//       {!keyboardVisible && (
//         <TouchableOpacity style={styles.doneButton}>
//           <Text style={styles.doneText}>Done</Text>
//         </TouchableOpacity>
//       )}
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
//     elevation: 4,
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
  // backButton: {
  //   backgroundColor: '#4CD04D',
  //   paddingHorizontal: scale(5),
  //   paddingVertical: verticalScale(5),
  //   borderRadius: scale(100),
  //   zIndex: 1,
  // },
//   input: {
//     flex: 1,
//     fontSize: scale(16),
//     color: '#333',
//   },
//   picker: {
//     flex: 1,
//     color: '#a3a2a2a0',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     backgroundColor: '#4CD04D',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: verticalScale(20),
//     left: scale(20),
//     right: scale(20),
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: scale(18),
//     fontWeight: 'bold',
//   },
// });

// export default AddItemScreen;
//working

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Keyboard,
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
//     .matches(/^\d+$/, 'Price must be an numeric')
//     .required('Price is required'),
//   unit: Yup.string().required('Unit is required'),
//   description: Yup.string().required('Description is required'),
// });

// const AddItemScreen = () => {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//    const navigation = useNavigation();
//     const [db, setDb] = useState(null);
//     const [item, setItem] = useState([]);

//   useEffect(() => {
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
//         initialValues={{ itemName: '', itemPrice: '', unit: '', description: '' }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           console.log('Form Submitted', values);
//         }}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//           setFieldValue,
//         }) => (
//           <>
//             <View style={styles.card}>
//               {/* Item Name */}
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

//               {/* Item Price */}
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

//               {/* Unit of Measure */}
//               <View style={styles.inputRow}>
//                 <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
//                 <Picker
//                   selectedValue={values.unit}
//                   onValueChange={(value) => setFieldValue('unit', value)}
//                   style={styles.picker}
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

//               {/* Item Description */}
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
//                 <Text style={styles.doneText}>Done</Text>
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </Formik>
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
//     elevation: 4,
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
//     color: '#a3a2a2a0',
//     fontSize: scale(16),
//     marginLeft: -10,
//   },
//   doneButton: {
//     backgroundColor: '#4CD04D',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(12),
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: verticalScale(20),
//     left: scale(20),
//     right: scale(20),
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
  ScrollView,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

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
  const navigation = useNavigation();
  const [db, setDb] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db');
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
        await refreshItemList(database);
      } catch (err) {
        console.error('❌ Item DB Init Error:', err);
      }
    };

    initDb();

    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const refreshItemList = async (database = db) => {
    if (!database) return;
    try {
      const rows = await database.getAllAsync(`SELECT * FROM items`);
      setItems(rows);
    } catch (error) {
      console.error('❌ Fetch Items Error:', error);
    }
  };

  const saveItemToDb = async (values, resetForm) => {
    if (!db) {
      Alert.alert('Database not ready');
      return;
    }

    try {
      await db.runAsync(
        `INSERT INTO items (itemName, itemPrice, unit, description) VALUES (?, ?, ?, ?)`,
        [values.itemName, values.itemPrice, values.unit, values.description]
      );

      Alert.alert('Success', 'Item saved successfully', [
        {
          text: 'OK',
          onPress: () => {
            resetForm();
            refreshItemList();
            navigation.goBack(); // or stay
          },
        },
      ]);
    } catch (error) {
      console.error('❌ Save Item Error:', error);
      Alert.alert('Error', 'Failed to save item.');
    }
  };

  const exportDb = async () => {
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
      Alert.alert('Export Error', error.message);
      console.error('❌ Export DB Error:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add item</Text>
        </View>

        <Formik
          initialValues={{ itemName: '', itemPrice: '', unit: '', description: '' }}
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
                    style={styles.picker}
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

        {/* Export Button */}
        <TouchableOpacity onPress={exportDb} style={styles.exportButton}>
          <Text style={styles.exportText}>Export DB</Text>
        </TouchableOpacity>

        {/* List of Items */}
        <Text style={styles.listHeader}>Saved Items</Text>
        {items.length === 0 ? (
          <Text style={styles.noDataText}>No items added yet.</Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>
                  🧾 {item.itemName} | ₹{item.itemPrice} | {item.unit}
                </Text>
                <Text style={styles.itemSubText}>📝 {item.description}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
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
    marginBottom: verticalScale(10),
  },
  doneText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  exportButton: {
    backgroundColor: '#0080ff',
    borderRadius: scale(30),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  exportText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  listHeader: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    color: '#333',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: scale(14),
    color: '#999',
    marginBottom: verticalScale(10),
  },
  itemRow: {
    backgroundColor: '#f4f4f4',
    padding: scale(10),
    borderRadius: scale(10),
    marginBottom: verticalScale(8),
  },
  itemText: {
    fontSize: scale(15),
    fontWeight: '600',
    color: '#222',
  },
  itemSubText: {
    fontSize: scale(13),
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    marginBottom: verticalScale(8),
    marginLeft: scale(5),
  },
});

export default AddItemScreen;
