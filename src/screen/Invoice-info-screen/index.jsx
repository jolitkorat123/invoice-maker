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


import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const InvoiceInfoScreen = () => {
  const navigation = useNavigation();
  const [invoiceNo, setInvoiceNo] = useState('INV0001');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [po, setPO] = useState('PO-7789');
  const [title, setTitle] = useState('Website Invoice');

  const formatDate = (date) => date.toLocaleDateString('en-GB');
  const calculateDuration = () => {
    const diff = endDate - startDate;
    const days = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
    return `${days} Days`;
  };

  const handleSave = () => {
    navigation.navigate('NewInvoiceScreen', {
      invoiceNo,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
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
                <TouchableOpacity style={styles.inputRow} onPress={() => setShowStartPicker(true)}>
                  <Image source={require('../../../assets/screen-15/start-date.png')} style={styles.icon} />
                  <Text style={styles.input}>{formatDate(startDate)}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      setShowStartPicker(false);
                      if (date) setStartDate(date);
                    }}
                  />
                )}

                {/* End Date */}
                <TouchableOpacity style={styles.inputRow} onPress={() => setShowEndPicker(true)}>
                  <Image source={require('../../../assets/screen-15/end-date.png')} style={styles.icon} />
                  <Text style={styles.input}>{formatDate(endDate)}</Text>
                </TouchableOpacity>
                {showEndPicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      setShowEndPicker(false);
                      if (date) setEndDate(date);
                    }}
                  />
                )}

                {/* Duration */}
                <View style={styles.inputRow}>
                  <Image source={require('../../../assets/screen-15/duration.png')} style={styles.icon} />
                  <Text style={styles.input}>{calculateDuration()}</Text>
                </View>

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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InvoiceInfoScreen;

// styles remain unchanged (same as previous response)
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
    elevation: 5,
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
});