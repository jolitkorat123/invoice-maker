import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



const ClientScreen = () => {
  const navigation = useNavigation();

  const handleClientPress = (clientName) => {
    console.log('Tapped on client:', clientName);

  };
  const handleContinue = () => {
    navigation.navigate('Add-client');
  };

  return (
    <LinearGradient
      colors={['#55d04c39', 'rgba(76, 208, 76, 0)']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>


        <Text style={styles.headerText}>Client</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.addClientButton} onPress={handleContinue}>
          <Text style={styles.addClientText}>+  Add New Client</Text>
        </TouchableOpacity>

        <Text style={styles.clientListTitle}>Client List :</Text>

        {/* Touchable Client Card 1 */}
        <TouchableOpacity
          style={styles.clientCard}
          onPress={() => handleClientPress('Androtech Solution')}
        >
          <View>
            <Text style={styles.clientName}>Androtech Solution</Text>
            <Text style={styles.clientDetails}>+91 12345 67890</Text>
            <Text style={styles.clientDetails}>other</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>

        {/* Touchable Client Card 2 */}
        <TouchableOpacity
          style={styles.clientCard}
          onPress={() => handleClientPress('Appin Technology')}
        >
          <View>
            <Text style={styles.clientName}>Appin Technology</Text>
            <Text style={styles.clientDetails}>+91 12345 67890</Text>
            <Text style={styles.clientDetails}>other</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>

        {/* Invoice Card */}
        <View style={styles.invoiceCard}>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceNumber}>INV00001</Text>
            <Text style={styles.invoiceName}>Divyesh Shah</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceDate}>17/05/2025</Text>
            <Text style={styles.invoiceAmount}>₹56,050.00</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceDue}>Due in 5 days</Text>
            <View style={styles.unpaidBadge}>
              <Text style={styles.unpaidText}>unpaid</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ClientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  scrollContainer: {
    padding: 15,
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
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
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
  invoiceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 11,
    marginTop: 80,
    elevation: 2,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  invoiceNumber: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000000',
  },
  invoiceName: {
    fontWeight: '500',
    fontSize: 11,
    color: '#000000',
  },
  invoiceDate: {
    fontSize: 13,
    color: '#000000',
  },
  invoiceAmount: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000000',
  },
  invoiceDue: {
    fontSize: 13,
    color: '#000000',
  },
  unpaidBadge: {
    backgroundColor: '#ffdada92',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  unpaidText: {
    color: '#F00',
    fontSize: 15,
    fontWeight: '400',
    textTransform: 'lowercase',
    justifyContent: 'center',
  },
});
