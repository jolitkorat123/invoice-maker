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

// const TermsandCondition = ({ navigation }) => {
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
//             <Text style={styles.headerTitle}>Terms & Conditions</Text>
//           </View>

//           {/* New Signature Button */}
//           <View style={styles.fixedTop}>
//             <TouchableOpacity style={styles.newSignatureCard}>
//               <View style={styles.leftContent}>
//                 <Image
//                   source={require('../../../assets/screen-24/terms-and-conditions.png')}
//                   style={styles.signatureIcon}
//                 />
//                 <Text style={styles.newSignatureText}>New Terms & Conditions</Text>
//               </View>
//               <View style={styles.plusCircle}>
//                 <Text style={styles.plusText}>+</Text>
//               </View>
//             </TouchableOpacity>

//             <Text style={styles.signaturelist}>Terms & Conditions List :</Text>
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
//   signaturelist: {
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

// export default TermsandCondition;

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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const TermsandCondition = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [termsList, setTermsList] = useState([]);

  const handleAddNewTerms = () => {
    setModalType("terms");
    setTempValue("");
    setModalVisible(true);
  };

  const handleSaveTerms = () => {
    if (tempValue.trim()) {
      const newTerm = {
        id: Date.now().toString(),
        text: tempValue,
        date: new Date().toLocaleDateString(),
      };
      setTermsList([...termsList, newTerm]);
      setModalVisible(false);
      setTempValue("");
    }
  };

  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedIndex;

    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => setSelectedIndex(index)}
      >
        <View style={styles.termItem}>
          <Text style={styles.termText}>{item.text}</Text>
          <Text style={styles.termDate}>{item.date}</Text>
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
            <Text style={styles.headerTitle}>Terms & Conditions</Text>
          </View>

          {/* New Signature Button */}
          <View style={styles.fixedTop}>
            <TouchableOpacity 
              style={styles.newSignatureCard}
              onPress={handleAddNewTerms}
            >
              <View style={styles.leftContent}>
                <Image
                  source={require('../../../assets/screen-24/terms-and-conditions.png')}
                  style={styles.signatureIcon}
                />
                <Text style={styles.newSignatureText}>New Terms & Conditions</Text>
              </View>
              <View style={styles.plusCircle}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.termslist}>Terms & Conditions List :</Text>
          </View>

          {/* Terms List */}
          <ScrollView style={styles.termsList}>
            {termsList.length > 0 ? (
              termsList.map((item, index) => (
                <View key={item.id}>
                  {renderItem({ item, index })}
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No terms and conditions added yet.
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  Tap the "+" button above to add new terms.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {/* Modal for adding new terms */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {modalType === "terms" ? "Add New Terms & Conditions" : ""}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {modalType === "terms" && (
                  <>
                    <Text style={styles.modalLabel}>Terms & Conditions</Text>
                    <View style={styles.textAreaWrapper}>
                      <TextInput
                        style={styles.textArea}
                        value={tempValue}
                        onChangeText={(text) => {
                          if (text.length <= 500) setTempValue(text);
                        }}
                        placeholder="Enter terms and conditions..."
                        multiline
                        numberOfLines={8}
                        textAlignVertical="top"
                      />
                      <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
                    </View>
                  </>
                )}
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveModalButton]}
                  onPress={handleSaveTerms}
                >
                  <Text style={styles.saveModalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  // New Signature Card Style
  newSignatureCard: {
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
  signatureIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  newSignatureText: {
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
  termslist: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  termsList: {
    flex: 1,
    marginBottom: 10,
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
  termItem: {
    flex: 1,
  },
  termText: {
    fontSize: scale(15),
    color: '#333',
    marginBottom: 4,
  },
  termDate: {
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
    color: '#333',
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
    color: '#333',
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  textArea: {
    padding: 12,
    minHeight: 150,
    textAlignVertical: 'top',
    fontSize: 15,
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
    backgroundColor: '#f1f1f1',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  saveModalButton: {
    backgroundColor: '#4CD04D',
  },
  saveModalButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default TermsandCondition;