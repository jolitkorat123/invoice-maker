import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {} from '@react-navigation/native';

// Sample data
const numberFormats = [
  '1,000,000.00',
  '1.000.000,00',
  '1 000 000.00',
  '10,00,000.00',
  '10.00.000,00',
  '1 000 000,00',
];

const NumberFormatScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedIndex === index;

    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => setSelectedIndex(index)}
      >
        <Text style={styles.optionText}>{item}</Text>

        <Image
          source={require('../../../assets/screen-27/select.png')}
          style={[
            styles.checkIcon,
            { tintColor: isSelected ? '#00C851' : '#C4C4C4' },
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#e6fce4', '#ffffff']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Number Format</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <FlatList
            data={numberFormats}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderRadius: scale(100),
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  optionContainer: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  checkIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#4CD04D',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NumberFormatScreen;
