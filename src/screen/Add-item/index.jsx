import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const AddItemScreen = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
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

  return (
    <LinearGradient
      colors={['#55d04c0e', 'rgba(76, 208, 76, 0)']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add item</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Item Name */}
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/screen-21/item-name.png')} style={styles.icon} />
          <TextInput
            placeholder="Item Name"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
          />
        </View>

        {/* Item Price */}
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/screen-21/item-price.png')} style={styles.icon} />
          <TextInput
            placeholder="Item Price"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            style={styles.input}
            value={itemPrice}
            onChangeText={setItemPrice}
          />
        </View>

        {/* Unit of Measure */}
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/screen-21/kg.png')} style={styles.icon} />
          <Picker
            selectedValue={unit}
            onValueChange={(value) => setUnit(value)}
            style={styles.picker}
          >
            <Picker.Item label="Unit of Measure" value="" />
            <Picker.Item label="Kg" value="kg" />
            <Picker.Item label="Gram" value="g" />
            <Picker.Item label="Piece" value="pc" />
          </Picker>
        </View>

        {/* Item Description */}
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/screen-21/description.png')} style={styles.icon} />
          <TextInput
            placeholder="Item Description"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Done Button */}
      {!keyboardVisible && (
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      )}
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
    elevation: 4,
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
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderRadius: scale(100),
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: scale(16),
    color: '#333',
  },
  picker: {
    flex: 1,
    color: '#a3a2a2a0',
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
});

export default AddItemScreen;
