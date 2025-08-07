import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';

// ✅ UPDATED SectionItem
const SectionItem = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
    <View style={styles.iconLabel}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.rightSection}>
      {value ? <Text style={styles.valueText}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={18} color="#000" />
    </View>
  </TouchableOpacity>
);

export default function NewInvoiceScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [showInvoiceNumber, setShowInvoiceNumber] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discountType, setDiscountType] = useState('flat');
  const [discountValue, setDiscountValue] = useState('');
  const [shipping, setShipping] = useState('');

  const {
    invoiceId = `EST${String(1).padStart(5, '0')}`,
    startDate = new Date(),
    endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    po = '',
    title = 'Estimate Info',
  } = route.params || {};

  const toggleVisibility = () => setShowInvoiceNumber(!showInvoiceNumber);
  const formatDate = (date) => date.toLocaleDateString('en-GB');

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  return (
    <LinearGradient
      colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']}
      style={styles.background}
    >
      <View style={styles.customHeader}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Ionicons name="chevron-back" size={20} color="#ffffff" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>New Estimate</Text>
  <TouchableOpacity onPress={toggleVisibility}>
    <Ionicons
      name={showInvoiceNumber ? 'eye-outline' : 'eye-off-outline'}
      size={22}
      color="#000"
    />
  </TouchableOpacity>
</View>
        <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.invoiceInfoCard}
          onPress={() =>
            navigation.navigate('Invoice-info-screen', {
              invoiceId,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              po,
              title,
            })
          }
        >
          <View>
            <Text style={styles.invoiceInfoTitle}>{title}</Text>
            <Text style={styles.invoiceInfoDate}>
              {`Date - ${formatDate(new Date(startDate))}`}
            </Text>
            <Text style={styles.invoiceInfoDate}>
              {`Due - ${formatDate(new Date(endDate))}`}
            </Text>
            {po ? (
              <Text style={styles.invoiceInfoDate}>{`PO - ${po}`}</Text>
            ) : null}
          </View>
          <Text style={styles.invoiceNumber}>
            {showInvoiceNumber ? invoiceId : '********'}
          </Text>
        </TouchableOpacity>

        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.sectionRow}
            onPress={() => navigation.navigate('company-profile')}
          >
            <View style={styles.iconLabel}>
              <Image
                source={require('../../../assets/screen-14/briefcase.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Business Info</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionRow}
            onPress={() => navigation.navigate('Add-client')}
          >
            <View style={styles.iconLabel}>
              <Image
                source={require('../../../assets/screen-14/Mask group.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Client</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.sectionRow}
            onPress={() => navigation.navigate('Add-item')}
          >
            <View style={styles.iconLabel}>
              <Image
                source={require('../../../assets/screen-14/i.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Items</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>

          {/* ✅ UPDATED with value props */}
          <SectionItem
            icon={require('../../../assets/screen-14/hand.png')}
            label="Quantity"
            value={quantity}
            onPress={() => openModal('quantity')}
          />
          <SectionItem
            icon={require('../../../assets/screen-14/price-tag.png')}
            label="Price"
            value={price ? `₹${price}` : ''}
            onPress={() => openModal('price')}
          />
          <SectionItem
            icon={require('../../../assets/screen-14/discount.png')}
            label="Discount"
            value={
              discountValue
                ? discountType === 'flat'
                  ? `₹${discountValue}`
                  : `${discountValue}%`
                : ''
            }
            onPress={() => openModal('discount')}
          />
          <SectionItem
            icon={require('../../../assets/screen-14/delivery.png')}
            label="Shipping Charges"
            value={shipping ? `₹${shipping}` : ''}
            onPress={() => openModal('shipping')}
          />
          <SectionItem
            icon={require('../../../assets/screen-14/money.png')}
            label="Currency"
            onPress={() => navigation.navigate('Currency-screen')}
          />
          <SectionItem
            icon={require('../../../assets/screen-14/debit-card.png')}
            label="Payment Method"
            onPress={() => navigation.navigate('PaymentMethodScreen')}
          />
        </View>

        <View style={styles.sectionCard}>
          <SectionItem
            icon={require('../../../assets/screen-14/terms-and-conditions.png')}
            label="Terms & Condition"
            onPress={() => navigation.navigate('TermsScreen')}
          />
          <SectionItem
            icon={require('../../../assets/screen-14/signature.png')}
            label="Signature"
            onPress={() => navigation.navigate('Signature-screen')}
          />
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            {modalType === 'quantity' && (
              <>
                <Text style={styles.modalLabel}>Enter Quantity</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="e.g. 1"
                />
              </>
            )}
            {modalType === 'price' && (
              <>
                <Text style={styles.modalLabel}>Enter Price (INR)</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                  placeholder="e.g. 1000"
                />
              </>
            )}
            {modalType === 'discount' && (
              <>
                <Text style={styles.modalLabel}>Enter Discount</Text>
                <View style={styles.discountRow}>
                  <TouchableOpacity
                    style={[
                      styles.discountOption,
                      discountType === 'flat' && styles.discountSelected,
                    ]}
                    onPress={() => setDiscountType('flat')}
                  >
                    <Text>Flat Amount</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.discountOption,
                      discountType === 'percent' && styles.discountSelected,
                    ]}
                    onPress={() => setDiscountType('percent')}
                  >
                    <Text>Percentage</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={discountValue}
                  onChangeText={setDiscountValue}
                  placeholder="e.g. 10"
                />
              </>
            )}
            {modalType === 'shipping' && (
              <>
                <Text style={styles.modalLabel}>Enter Shipping Charges (INR)</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={shipping}
                  onChangeText={setShipping}
                  placeholder="e.g. 200"
                />
              </>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
customHeader: {
  backgroundColor: '#E3F8E3', // Light green background
  paddingVertical: 16,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
headerTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},
backButton: {
  backgroundColor: '#4CD04D',
  padding: 8,
  borderRadius: 20,
},
  title: { fontSize: 20, fontWeight: 'bold' },
  invoiceInfoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 2,
  },
  invoiceInfoTitle: { fontWeight: 'bold', fontSize: 16 },
  invoiceInfoDate: { fontSize: 12, color: '#555' },
  invoiceNumber: { fontWeight: 'bold', fontSize: 16 },
  sectionCard: {
    backgroundColor: '#fcfcfcff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  iconLabel: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 20, height: 20, marginRight: 12, resizeMode: 'contain' },
  label: { fontSize: 14 },
  valueText: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#000000ff',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#000000ff',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CD04D',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  discountRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  discountOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 10,
    width: 100,
    alignItems: 'center',
  },
  discountSelected: {
    backgroundColor: '#4CD04D33',
    borderColor: '#4CD04D',
  },
  customHeader: {
  backgroundColor: '#E3F8E3', // Light green background
  paddingVertical: 16,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
headerTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},
backButton: {
  backgroundColor: '#4CD04D',
  padding: 8,
  borderRadius: 20,
},

});
