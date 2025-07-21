import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {} from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const dateFormats = [
  '31/12/2025',
  '31/12/25',
  '31.12.2025',
  '31-12-2025',
  '12/31/2025',
  '2025/12/31',
];

const DateFormatScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedIndex;

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
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']}
        style={styles.gradientBackground}
      >
        {/* Content Section */}
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Date Format</Text>
          </View>

          {/* List Card */}
          <View style={styles.card}>
            <FlatList
              data={dateFormats}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>
        </View>

        {/* Save Button at Bottom */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: scale(16),
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
    borderRadius: 16,
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: scale(17),
    color: '#333',
  },
  checkIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  saveButton: {
    backgroundColor: '#4CD04D',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderRadius: scale(100),
    zIndex: 1,
  },
});

export default DateFormatScreen;
