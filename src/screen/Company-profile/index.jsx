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

const CompanyProfile = () => {
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [taxNo, setTaxNo] = useState('');
  const [taxType, setTaxType] = useState('');
  const [businessNature, setBusinessNature] = useState('');

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Company Profile</Text>

      <TouchableOpacity style={styles.row} onPress={pickLogo}>
        <Text style={styles.label}> Logo</Text>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <Text style={styles.arrow}>➔</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>👤 Company Name</Text>
        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="Enter company name"
        />
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.label}>📧 Company Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>📞 Company Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>📍 Company Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>📄 Tax No.</Text>
        <TextInput
          style={styles.input}
          value={taxNo}
          onChangeText={setTaxNo}
          placeholder="Enter tax number"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>📑 Tax Types</Text>
        <Picker
          selectedValue={taxType}
          style={styles.picker}
          onValueChange={(itemValue) => setTaxType(itemValue)}
        >
          <Picker.Item label="Select Tax Type" value="" />
          <Picker.Item label="GST" value="gst" />
          <Picker.Item label="VAT" value="vat" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>🏬 Nature of Business</Text>
        <Picker
          selectedValue={businessNature}
          style={styles.picker}
          onValueChange={(itemValue) => setBusinessNature(itemValue)}
        >
          <Picker.Item label="Select Nature" value="" />
          <Picker.Item label="Retail" value="retail" />
          <Picker.Item label="Wholesale" value="wholesale" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e6f9eb',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#000',
  },
  row: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  picker: {
    height: 40,
    width: '100%',
    color: '#000',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 5,
    borderRadius: 10,
  },
  arrow: {
    fontSize: 18,
    color: '#aaa',
    position: 'absolute',
    right: 10,
    top: 15,
  },
  button: {
    backgroundColor: '#33cc66',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CompanyProfile; 
