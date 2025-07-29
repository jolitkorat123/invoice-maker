// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ScrollView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';

//  const navigation = useNavigation();

// const InvoiceInfoScreen = ({ navigation }) => {
//   const [invoiceNo] = useState('INV0001');
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);
//   const [po, setPO] = useState('PO-7789');
//   const [title, setTitle] = useState('Website Invoice');

//   const formatDate = (date) => date.toLocaleDateString('en-GB');
//   const calculateDuration = () => {
//     const diff = endDate - startDate;
//     const days = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
//     return `${days} Days`;
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'android' ? undefined : 'padding'}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.flex}>
//           <LinearGradient colors={['#E3FCE9', '#ffffff']} style={styles.container}>
//             <ScrollView
//               contentContainerStyle={{ paddingBottom: verticalScale(160) }}
//               keyboardShouldPersistTaps="handled"
//               showsVerticalScrollIndicator={false}
//             >
//               {/* Header */}
//               <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                   <Ionicons name="chevron-back" size={scale(28)} color="#fff" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Invoice Info</Text>
//               </View>

//               {/* Card */}
//               <View style={styles.card}>
//                 {/* Invoice No */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/invoice-no.png')} style={styles.icon} />
//                   <TextInput value={invoiceNo} style={styles.input} editable={false} />
//                 </View>

//                 {/* Start Date */}
//                 <TouchableOpacity style={styles.inputRow} onPress={() => setShowStartPicker(true)}>
//                   <Image source={require('../../../assets/screen-15/start-date.png')} style={styles.icon} />
//                   <Text style={styles.input}>{formatDate(startDate)}</Text>
//                 </TouchableOpacity>
//                 {showStartPicker && (
//                   <DateTimePicker
//                     value={startDate}
//                     mode="date"
//                     display="default"
//                     onChange={(e, date) => {
//                       setShowStartPicker(false);
//                       if (date) setStartDate(date);
//                     }}
//                   />
//                 )}

//                 {/* End Date */}
//                 <TouchableOpacity style={styles.inputRow} onPress={() => setShowEndPicker(true)}>
//                   <Image source={require('../../../assets/screen-15/end-date.png')} style={styles.icon} />
//                   <Text style={styles.input}>{formatDate(endDate)}</Text>
//                 </TouchableOpacity>
//                 {showEndPicker && (
//                   <DateTimePicker
//                     value={endDate}
//                     mode="date"
//                     display="default"
//                     onChange={(e, date) => {
//                       setShowEndPicker(false);
//                       if (date) setEndDate(date);
//                     }}
//                   />
//                 )}

//                 {/* Duration */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/duration.png')} style={styles.icon} />
//                   <Text style={styles.input}>{calculateDuration()}</Text>
//                 </View>

//                 {/* P.O. */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/p.o.png')} style={styles.icon} />
//                   <TextInput
//                     value={po}
//                     onChangeText={setPO}
//                     style={styles.input}
//                     placeholder="P.O."
//                     placeholderTextColor="#ccc"
//                   />
//                 </View>

//                 {/* Invoice Title */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/title-name.png')} style={styles.icon} />
//                   <TextInput
//                     value={title}
//                     onChangeText={setTitle}
//                     style={styles.input}
//                     placeholder="Invoice Title"
//                     placeholderTextColor="#ccc"
//                   />
//                 </View>
//               </View>
//             </ScrollView>

//             {/* Save Button */}
//             <View style={styles.bottomContainer}>
//               <TouchableOpacity style={styles.saveButton}>
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default InvoiceInfoScreen;

// const styles = StyleSheet.create({
//   flex: { flex: 1 },

//   container: {
//     flex: 1,
//     padding: scale(20),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },

//   backButton: {
//     backgroundColor: '#4CD04D',
//     padding: scale(5),
//     borderRadius: scale(100),
//   },

//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: scale(28),
//   },

//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     padding: scale(20),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: scale(8),
//     marginBottom: verticalScale(20),
//   },

//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 0.6,
//     borderColor: '#ccc',
//     paddingVertical: verticalScale(12),
//     marginBottom: verticalScale(4),
//   },

//   icon: {
//     width: scale(20),
//     height: scale(20),
//     resizeMode: 'contain',
//     marginRight: scale(10),
//   },

//   input: {
//     flex: 1,
//     fontSize: moderateScale(16),
//     color: '#000',
//   },

//   bottomContainer: {
//     position: 'absolute',
//     bottom: verticalScale(20),
//     left: scale(20),
//     right: scale(20),
//   },

//   saveButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: scale(4),
//     elevation: 3,
//   },

//   saveButtonText: {
//     color: '#fff',
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//   },
// });


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ScrollView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';

// const InvoiceInfoScreen = () => {
//   const navigation = useNavigation();
//   const [invoiceNo, setInvoiceNo] = useState('INV0001');
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);
//   const [po, setPO] = useState('PO-7789');
//   const [title, setTitle] = useState('Website Invoice');

//   const formatDate = (date) => date.toLocaleDateString('en-GB');
//   const calculateDuration = () => {
//     const diff = endDate - startDate;
//     const days = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
//     return `${days} Days`;
//   };

//   const handleSave = () => {
//     navigation.navigate('NewInvoiceScreen', {
//       invoiceNo,
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     });
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? undefined : 'padding'}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.flex}>
//           <LinearGradient colors={['#E3FCE9', '#ffffff']} style={styles.container}>
//             <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(160) }} keyboardShouldPersistTaps="handled">
//               {/* Header */}
//               <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                   <Ionicons name="chevron-back" size={scale(28)} color="#fff" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Invoice Info</Text>
//               </View>

//               {/* Card */}
//               <View style={styles.card}>
//                 {/* Invoice No */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/invoice-no.png')} style={styles.icon} />
//                   <TextInput value={invoiceNo} style={styles.input} editable={false} />
//                 </View>

//                 {/* Start Date */}
//                 <TouchableOpacity style={styles.inputRow} onPress={() => setShowStartPicker(true)}>
//                   <Image source={require('../../../assets/screen-15/start-date.png')} style={styles.icon} />
//                   <Text style={styles.input}>{formatDate(startDate)}</Text>
//                 </TouchableOpacity>
//                 {showStartPicker && (
//                   <DateTimePicker
//                     value={startDate}
//                     mode="date"
//                     display="default"
//                     onChange={(e, date) => {
//                       setShowStartPicker(false);
//                       if (date) setStartDate(date);
//                     }}
//                   />
//                 )}
//                   {/* Duration */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/duration.png')} style={styles.icon} />
//                   <Text style={styles.input}>{calculateDuration()}</Text>
//                 </View>

//                 {/* End Date */}
//                 <TouchableOpacity style={styles.inputRow} onPress={() => setShowEndPicker(true)}>
//                   <Image source={require('../../../assets/screen-15/end-date.png')} style={styles.icon} />
//                   <Text style={styles.input}>{formatDate(endDate)}</Text>
//                 </TouchableOpacity>
//                 {showEndPicker && (
//                   <DateTimePicker
//                     value={endDate}
//                     mode="date"
//                     display="default"
//                     onChange={(e, date) => {
//                       setShowEndPicker(false);
//                       if (date) setEndDate(date);
//                     }}
//                   />
//                 )}
//                 {/* P.O. */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/p.o.png')} style={styles.icon} />
//                   <TextInput
//                     value={po}
//                     onChangeText={setPO}
//                     style={styles.input}
//                     placeholder="P.O."
//                     placeholderTextColor="#ccc"
//                   />
//                 </View>

//                 {/* Invoice Title */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/title-name.png')} style={styles.icon} />
//                   <TextInput
//                     value={title}
//                     onChangeText={setTitle}
//                     style={styles.input}
//                     placeholder="Invoice Title"
//                     placeholderTextColor="#ccc"
//                   />
//                 </View>
//               </View>
//             </ScrollView>

//             {/* Save Button */}
//             <View style={styles.bottomContainer}>
//               <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default InvoiceInfoScreen;

// // styles remain unchanged (same as previous response)
// const styles = StyleSheet.create({
//   flex: { flex: 1 },

//   container: {
//     flex: 1,
//     padding: scale(20),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },

//   backButton: {
//     backgroundColor: '#4CD04D',
//     padding: scale(5),
//     borderRadius: scale(100),
//   },

//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: scale(28),
//   },

//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     padding: scale(20),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: scale(8),
//     marginBottom: verticalScale(20),
//   },

//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 0.6,
//     borderColor: '#ccc',
//     paddingVertical: verticalScale(12),
//     marginBottom: verticalScale(4),
//   },

//   icon: {
//     width: scale(20),
//     height: scale(20),
//     resizeMode: 'contain',
//     marginRight: scale(10),
//   },

//   input: {
//     flex: 1,
//     fontSize: moderateScale(16),
//     color: '#000',
//   },

//   bottomContainer: {
//     position: 'absolute',
//     bottom: verticalScale(20),
//     left: scale(20),
//     right: scale(20),
//   },

//   saveButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: scale(4),
//     elevation: 3,
//   },

//   saveButtonText: {
//     color: '#fff',
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//   },
// });

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ScrollView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Modal,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';

// const InvoiceInfoScreen = () => {
//   const navigation = useNavigation();
//   console.log(navigation)
//   const [invoiceNo, setInvoiceNo] = useState('INV0001');
//    // INV${lenght+2} INV0001
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);
//   const [po, setPO] = useState('PO-7789');
//   const [title, setTitle] = useState('Website Invoice');

//   const [duration, setDuration] = useState(7);
//   const [showDurationModal, setShowDurationModal] = useState(false);

//   useEffect(() => {
//     handleDurationChange(duration);
//   }, []);

//   const formatDate = (date) => date.toLocaleDateString('en-GB');

//   const handleDurationChange = (days) => {
//     setDuration(days);
//     const newEndDate = new Date(startDate);
//     newEndDate.setDate(startDate.getDate() + days);
//     setEndDate(newEndDate);
//   };

//   const handleSave = () => {
//     navigation.navigate('NewInvoiceScreen', {
//       invoiceNo,
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     });
//   };


//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? undefined : 'padding'}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.flex}>
//           <LinearGradient colors={['#E3FCE9', '#ffffff']} style={styles.container}>
//             <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(160) }} keyboardShouldPersistTaps="handled">
//               {/* Header */}
//               <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                   <Ionicons name="chevron-back" size={scale(28)} color="#fff" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Invoice Info</Text>
//               </View>

//               {/* Card */}
//               <View style={styles.card}>
//                 {/* Invoice No */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/invoice-no.png')} style={styles.icon} />
//                   <TextInput value={invoiceNo} style={styles.input} editable={false} />
//                 </View>

//                 {/* Start Date */}
//                 <TouchableOpacity style={styles.inputRow} onPress={() => setShowStartPicker(true)}>
//                   <Image source={require('../../../assets/screen-15/start-date.png')} style={styles.icon} />
//                   <Text style={styles.input}>{formatDate(startDate)}</Text>
//                 </TouchableOpacity>
//                 {showStartPicker && (
//                   <DateTimePicker
//                     value={startDate}
//                     mode="date"
//                     display="default"
//                     onChange={(e, date) => {
//                       setShowStartPicker(false);
//                       if (date) {
//                         setStartDate(date);
//                         handleDurationChange(duration); // Recalculate endDate
//                       }
//                     }}
//                   />
//                 )}

//                 {/* Duration */}
//                 <TouchableOpacity style={styles.inputRow} onPress={() => setShowDurationModal(true)}>
//                   <Image source={require('../../../assets/screen-15/duration.png')} style={styles.icon} />
//                   <Text style={styles.input}>{`${duration} Days`}</Text>
//                   <Ionicons name="chevron-down" size={18} color="#000" />
//                 </TouchableOpacity>

//                 {/* End Date */}
//                 <TouchableOpacity style={styles.inputRow} onPress={() => setShowEndPicker(true)}>
//                   <Image source={require('../../../assets/screen-15/end-date.png')} style={styles.icon} />
//                   <Text style={styles.input}>{formatDate(endDate)}</Text>
//                 </TouchableOpacity>
//                 {showEndPicker && (
//                   <DateTimePicker
//                     value={endDate}
//                     mode="date"
//                     display="default"
//                     onChange={(e, date) => {
//                       setShowEndPicker(false);
//                       if (date) setEndDate(date);
//                     }}
//                   />
//                 )}

//                 {/* P.O. */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/p.o.png')} style={styles.icon} />
//                   <TextInput
//                     value={po}
//                     onChangeText={setPO}
//                     style={styles.input}
//                     placeholder="P.O."
//                     placeholderTextColor="#ccc"
//                   />
//                 </View>

//                 {/* Invoice Title */}
//                 <View style={styles.inputRow}>
//                   <Image source={require('../../../assets/screen-15/title-name.png')} style={styles.icon} />
//                   <TextInput
//                     value={title}
//                     onChangeText={setTitle}
//                     style={styles.input}
//                     placeholder="Invoice Title"
//                     placeholderTextColor="#ccc"
//                   />
//                 </View>
//               </View>
//             </ScrollView>

//             {/* Save Button */}
//             <View style={styles.bottomContainer}>
//               <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>
//         </View>
//       </TouchableWithoutFeedback>

//       {/* Duration Picker Modal */}
//       <Modal visible={showDurationModal} transparent animationType="slide">
//         <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowDurationModal(false)}>
//           <View style={styles.modalContainer}>
//             <ScrollView>
//               {[...Array(150).keys()].map((_, i) => {
//                 const day = i + 1;
//                 return (
//                   <TouchableOpacity
//                     key={day}
//                     style={[
//                       styles.modalOption,
//                       duration === day && { backgroundColor: '#4CD04D' },
//                     ]}
//                     onPress={() => {
//                       handleDurationChange(day);
//                       setShowDurationModal(false);
//                     }}
//                   >
//                     <Text style={{ color: duration === day ? '#fff' : '#000' }}>{day} Days</Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// };

// export default InvoiceInfoScreen;

// const styles = StyleSheet.create({
//   flex: { flex: 1 },

//   container: {
//     flex: 1,
//     padding: scale(20),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },

//   backButton: {
//     backgroundColor: '#4CD04D',
//     padding: scale(5),
//     borderRadius: scale(100),
//   },

//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: scale(28),
//   },

//   card: {
//     backgroundColor: '#fff',
//     borderRadius: scale(16),
//     padding: scale(20),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: scale(8),
//     marginBottom: verticalScale(20),
//   },

//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 0.6,
//     borderColor: '#ccc',
//     paddingVertical: verticalScale(12),
//     marginBottom: verticalScale(4),
//   },

//   icon: {
//     width: scale(20),
//     height: scale(20),
//     resizeMode: 'contain',
//     marginRight: scale(10),
//   },

//   input: {
//     flex: 1,
//     fontSize: moderateScale(16),
//     color: '#000',
//   },

//   bottomContainer: {
//     position: 'absolute',
//     bottom: verticalScale(20),
//     left: scale(20),
//     right: scale(20),
//   },

//   saveButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: scale(4),
//     elevation: 3,
//   },

//   saveButtonText: {
//     color: '#fff',
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//   },

//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },

//   modalContainer: {
//     backgroundColor: '#fff',
//     maxHeight: '40%',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingVertical: 10,
//   },

//   modalOption: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const { width, height } = Dimensions.get('window');

const CustomDatePicker = ({ visible, date, onSelect, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerHeader}>
            <Text style={styles.datePickerHeaderText}>Select Date</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <Calendar
            style={styles.calendarStyle}
            current={date.toISOString().split('T')[0]}
            minDate={'1001-01-01'}
            maxDate={'3000-12-31'}
            onDayPress={(day) => {
              onSelect(new Date(day.dateString));
              onClose();
            }}
            renderArrow={(direction) => (
              <Ionicons 
                name={direction === 'left' ? 'chevron-back' : 'chevron-forward'} 
                size={24} 
                color="#4CD04D" 
              />
            )}
            markedDates={{
              [date.toISOString().split('T')[0]]: {selected: true, selectedColor: '#4CD04D'}
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#4CD04D',
              selectedDayBackgroundColor: '#4CD04D',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#4CD04D',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              arrowColor: '#4CD04D',
              monthTextColor: '#4CD04D',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                },
                dayHeader: {
                  color: '#4CD04D',
                  fontWeight: 'bold'
                }
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const InvoiceInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get invoice count from route params
  const { invoiceCount = 1 } = route.params || {};
  const [invoiceNo, setInvoiceNo] = useState(`INV${String(invoiceCount).padStart(5, '0')}`);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCustomStartPicker, setShowCustomStartPicker] = useState(false);
  const [showCustomEndPicker, setShowCustomEndPicker] = useState(false);
  const [po, setPO] = useState('PO-7789');
  const [title, setTitle] = useState('Website Invoice');

  const [duration, setDuration] = useState(7);
  const [showDurationModal, setShowDurationModal] = useState(false);

  useEffect(() => {
    handleDurationChange(duration);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleDurationChange = (days) => {
    setDuration(days);
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + days);
    setEndDate(newEndDate);
  };

  const handleSave = () => {
    navigation.navigate('NewInvoiceScreen', {
      invoiceNo,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      po,
      title
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flex}>
          <LinearGradient colors={['#E3FCE9', '#ffffff']} style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(160) }} keyboardShouldPersistTaps="handled">
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Ionicons name="chevron-back" size={scale(28)} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Invoice Info</Text>
              </View>

              {/* Card */}
              <View style={styles.card}>
                {/* Invoice No */}
                <View style={styles.inputRow}>
                  <Image source={require('../../../assets/screen-15/invoice-no.png')} style={styles.icon} />
                  <TextInput value={invoiceNo} style={styles.input} editable={false} />
                </View>

                {/* Start Date */}
                <TouchableOpacity 
                  style={styles.inputRow} 
                  onPress={() => setShowCustomStartPicker(true)}
                >
                  <Image source={require('../../../assets/screen-15/start-date.png')} style={styles.icon} />
                  <Text style={styles.input}>{formatDate(startDate)}</Text>
                  <Ionicons name="calendar" size={20} color="#4CD04D" />
                </TouchableOpacity>

                {/* Duration */}
                <TouchableOpacity style={styles.inputRow} onPress={() => setShowDurationModal(true)}>
                  <Image source={require('../../../assets/screen-15/duration.png')} style={styles.icon} />
                  <Text style={styles.input}>{`${duration} Days`}</Text>
                  <Ionicons name="chevron-down" size={18} color="#4CD04D" />
                </TouchableOpacity>

                {/* End Date */}
                <TouchableOpacity 
                  style={styles.inputRow} 
                  onPress={() => setShowCustomEndPicker(true)}
                >
                  <Image source={require('../../../assets/screen-15/end-date.png')} style={styles.icon} />
                  <Text style={styles.input}>{formatDate(endDate)}</Text>
                  <Ionicons name="calendar" size={20} color="#4CD04D" />
                </TouchableOpacity>

                {/* P.O. */}
                <View style={styles.inputRow}>
                  <Image source={require('../../../assets/screen-15/p.o.png')} style={styles.icon} />
                  <TextInput
                    value={po}
                    onChangeText={setPO}
                    style={styles.input}
                    placeholder="P.O."
                    placeholderTextColor="#ccc"
                  />
                </View>

                {/* Invoice Title */}
                <View style={styles.inputRow}>
                  <Image source={require('../../../assets/screen-15/title-name.png')} style={styles.icon} />
                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder="Invoice Title"
                    placeholderTextColor="#ccc"
                  />
                </View>
              </View>
            </ScrollView>

            {/* Save Button */}
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Custom Date Pickers */}
          <CustomDatePicker
            visible={showCustomStartPicker}
            date={startDate}
            onSelect={(date) => {
              setStartDate(date);
              handleDurationChange(duration);
            }}
            onClose={() => setShowCustomStartPicker(false)}
          />

          <CustomDatePicker
            visible={showCustomEndPicker}
            date={endDate}
            onSelect={(date) => {
              setEndDate(date);
              // Recalculate duration when end date changes
              const diffTime = Math.abs(date - startDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              setDuration(diffDays);
            }}
            onClose={() => setShowCustomEndPicker(false)}
          />

          {/* Duration Picker Modal */}
          <Modal visible={showDurationModal} transparent animationType="slide">
            <TouchableOpacity 
              style={styles.modalOverlay} 
              onPress={() => setShowDurationModal(false)}
              activeOpacity={1}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderText}>Select Duration</Text>
                  <TouchableOpacity onPress={() => setShowDurationModal(false)}>
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {[...Array(150).keys()].map((_, i) => {
                    const day = i + 1;
                    return (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.modalOption,
                          duration === day && { backgroundColor: '#4CD04D' },
                        ]}
                        onPress={() => {
                          handleDurationChange(day);
                          setShowDurationModal(false);
                        }}
                      >
                        <Text style={{ 
                          color: duration === day ? '#fff' : '#000',
                          fontSize: moderateScale(16)
                        }}>
                          {day} Days
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: scale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(10),
  },
  backButton: {
    backgroundColor: '#4CD04D',
    padding: scale(5),
    borderRadius: scale(100),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#333',
    marginRight: scale(28),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: scale(16),
    padding: scale(20),
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: scale(8),
    marginBottom: verticalScale(20),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#ccc',
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(4),
  },
  icon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#000',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(20),
    right: scale(20),
  },
  saveButton: {
    backgroundColor: '#4CD04D',
    paddingVertical: verticalScale(14),
    borderRadius: scale(30),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: scale(4),
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    maxHeight: height * 0.6,
    width: width * 0.9,
    borderRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalHeaderText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: width * 0.9,
    overflow: 'hidden',
    elevation: 5,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarStyle: {
    paddingBottom: 15,
  },
});

export default InvoiceInfoScreen;