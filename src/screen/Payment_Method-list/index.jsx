// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';

// const Paymentmethod = ({ navigation }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);

   

//   const renderItem = ({ item, index }) => {
//     const isSelected = index === selectedIndex;

//     return (
//       <TouchableOpacity
//         style={styles.optionContainer}
//         onPress={() => setSelectedIndex(index)}
//       >
//         <Text style={styles.optionText}>{item}</Text>
//         <Image
//           source={require('../../../assets/screen-27/select.png')}
//           style={[
//             styles.checkIcon,
//             { tintColor: isSelected ? '#00C851' : '#C4C4C4' },
//           ]}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={['#8aea8a27', 'rgba(76, 208, 76, 0)']}
//         style={styles.gradientBackground}
//       >
//         <View style={{ flex: 1 }}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.backButton}
//             >
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Payment Method</Text>
//           </View>

//           {/* New Signature Button */}
//           <View style={styles.fixedTop}>
//             <TouchableOpacity style={styles.newSignatureCard}>
//               <View style={styles.leftContent}>
//                 <Image
//                   source={require('../../../assets/screen-14/debit-card.png')}
//                   style={styles.signatureIcon}
//                 />
//                 <Text style={styles.newSignatureText}>New Payment Method</Text>
//               </View>
//               <View style={styles.plusCircle}>
//                 <Text style={styles.plusText}>+</Text>
//               </View>
//             </TouchableOpacity>

//             <Text style={styles.paymentlist}>Payment Method  List :</Text>
//           </View>
//         </View>

//         {/* Save Button */}
//         <TouchableOpacity style={styles.saveButton}>
//           <Text style={styles.saveText}>Save</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradientBackground: {
//     flex: 1,
//     padding: scale(16),
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
//   // New Signature Card Style
//   newSignatureCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 9,
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     marginBottom: 18,
//     elevation: 2,
//     shadowColor: '#4CD04D',
//   },
//   leftContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   signatureIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     marginRight: 12,
//   },
//   newSignatureText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//   },
//   plusCircle: {
//     width: 25,
//     height: 25,
//     borderRadius: 14,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   paymentlist: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: verticalScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   optionText: {
//     fontSize: scale(17),
//     color: '#333',
//   },
//   checkIcon: {
//     width: scale(20),
//     height: scale(20),
//     resizeMode: 'contain',
//   },
//   saveButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 12,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   saveText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(5),
//     paddingVertical: verticalScale(5),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
// });

// export default Paymentmethod;
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const Paymentmethod = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  const addPaymentMethod = () => {
    if (tempValue.trim()) {
      const newMethod = {
        id: Date.now().toString(),
        text: tempValue,
        date: `Added on ${new Date().toLocaleDateString()}`,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      setTempValue('');
      setModalVisible(false);
    }
  };

  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedIndex;

    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => setSelectedIndex(index)}
      >
        <View style={styles.paymentItem}>
          <Text style={styles.paymentText}>{item.text}</Text>
          <Text style={styles.paymentDate}>{item.date}</Text>
        </View>
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
        colors={['#8aea8a27', 'rgba(76, 208, 76, 0)']}
        style={styles.gradientBackground}
      >
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment Method</Text>
          </View>

          {/* New Payment Method Button */}
          <View style={styles.fixedTop}>
            <TouchableOpacity 
              style={styles.newPaymentCard}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.leftContent}>
                <Image
                  source={require('../../../assets/screen-14/debit-card.png')}
                  style={styles.paymentIcon}
                />
                <Text style={styles.newPaymentText}>New Payment Method</Text>
              </View>
              <View style={styles.plusCircle}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.paymentlist}>Payment Method List:</Text>
          </View>

          {/* Payment Methods List */}
          <ScrollView style={styles.listContainer}>
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method, index) => (
                <View key={method.id}>
                  {renderItem({ item: method, index })}
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No payment methods added yet.
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  Tap the "+" button above to add a new payment method.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {/* Add Payment Method Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Payment Method</Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <Text style={styles.modalLabel}>Payment Detail</Text>
                <View style={styles.textAreaWrapper}>
                  <TextInput
                    style={styles.textArea}
                    value={tempValue}
                    onChangeText={(text) => {
                      if (text.length <= 500) setTempValue(text);
                    }}
                    placeholder="e.g. Bank Transfer, UPI, Cash..."
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                  />
                  <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.addButton, !tempValue.trim() && styles.disabledButton]}
                  onPress={addPaymentMethod}
                  disabled={!tempValue.trim()}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
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
  // New Payment Card Style
  newPaymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 9,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#4CD04D',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  newPaymentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  plusCircle: {
    width: 25,
    height: 25,
    borderRadius: 14,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentlist: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  paymentItem: {
    flex: 1,
  },
  paymentText: {
    fontSize: scale(15),
    color: '#333',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: scale(12),
    color: '#888',
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  textArea: {
    padding: 12,
    minHeight: 120,
    fontSize: 16,
  },
  charCount: {
    textAlign: 'right',
    padding: 8,
    fontSize: 12,
    color: '#888',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CD04D',
  },
  disabledButton: {
    backgroundColor: '#c4c4c4',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Paymentmethod;