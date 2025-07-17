import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const AddClientScreen = ({ navigation }) => {
  const [taxType, setTaxType] = useState('');
  const [businessNature, setBusinessNature] = useState('');

  return (
    <LinearGradient colors={['#55d04c39', 'rgba(76, 208, 76, 0)']} style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
            </TouchableOpacity>
            <Text style={styles.title}>Add Client</Text>
          </View>

        {/* Card Form */}
        <View style={styles.card}>
          {[
            { placeholder: 'Trade Name', icon: require('../../../assets/screen-18/cname.png') },
            { placeholder: 'Client Email', icon: require('../../../assets/screen-18/email.png') },
            { placeholder: 'Client Phone', icon: require('../../../assets/screen-18/phone.png') },
            { placeholder: 'Enter Address line', icon: require('../../../assets/screen-18/addres.png') },
            { placeholder: 'Enter Shipping Address', icon: require('../../../assets/screen-18/delivery.png') },
            { placeholder: 'Tax No.', icon: require('../../../assets/screen-18/taxno.png') },
          ].map((item, index) => (
            <View key={index} style={styles.row}>
              <Image source={item.icon} style={styles.icon} />
              <TextInput placeholder={item.placeholder} placeholderTextColor="#aaa" style={styles.input} />
            </View>
          ))}

          {/* Tax Type Dropdown */}
          <View style={styles.row}>
            <Image source={require('../../../assets/screen-18/tax.png')} style={styles.icon} />
            <Picker
              selectedValue={taxType}
              onValueChange={setTaxType}
              style={styles.picker}
            >
              <Picker.Item label="Tax Types" value="" />
              <Picker.Item label="GST" value="gst" />
              <Picker.Item label="CGST" value="cgst" />
              <Picker.Item label="SGST" value="sgst" />
            </Picker>
          </View>

          {/* Business Nature Dropdown */}
          <View style={styles.row}>
            <Image source={require('../../../assets/screen-18/nature.png')} style={styles.icon} />
            <Picker
              selectedValue={businessNature}
              onValueChange={setBusinessNature}
              style={styles.picker}
            >
              <Picker.Item label="Nature of Business" value="" />
              <Picker.Item label="Retail" value="retail" />
              <Picker.Item label="Wholesale" value="wholesale" />
            </Picker>
          </View>

          {/* Client Detail Input */}
          <View style={styles.row}>
            <Image source={require('../../../assets/screen-18/transaction.png')} style={styles.icon} />
            <TextInput placeholder="Client Detail" placeholderTextColor="#aaa" style={styles.input} />
          </View>
        </View>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
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
    marginTop: verticalScale(24),
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
});

export default AddClientScreen;
