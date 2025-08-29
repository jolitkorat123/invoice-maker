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
        <TouchableOpacity onPress={() => navigation.navigate("Item-list")} style={styles.backButton}>
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

