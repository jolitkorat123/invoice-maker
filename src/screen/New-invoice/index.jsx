// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const iconSize = 24;

// const SectionItem = ({ icon, label, onPress, isVisible }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{isVisible ? label : '***'}</Text>
//     </View>
//     <Ionicons name="chevron-forward" size={18} color="#000" />
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const [isVisible, setIsVisible] = useState(true);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   const renderText = (text) => {
//     return isVisible ? text : '***';
//   };

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity>
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.title}>New Invoice</Text>
//           <TouchableOpacity onPress={toggleVisibility}>
//             <Ionicons 
//               name={isVisible ? "eye-outline" : "eye-off-outline"} 
//               size={24} 
//               color="black" 
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.invoiceInfoCard}>
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{renderText('Invoice Info')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Date - 16/05/2025')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Due - 23/05/2025')}</Text>
//           </View>
//           <Text style={styles.invoiceNumber}>{renderText('INV0001')}</Text>
//         </TouchableOpacity>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/briefcase.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Business Info')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/Mask group.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Client')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/i.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Items')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem 
//             icon={require('../../../assets/screen-14/hand.png')} 
//             label="Quantity" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/price-tag.png')} 
//             label="Price" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/discount.png')} 
//             label="Discount" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/delivery.png')} 
//             label="Shipping Charges" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/money.png')} 
//             label="Currency" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/debit-card.png')} 
//             label="Payment Method" 
//             isVisible={isVisible}
//           />
//         </View>

//         <View style={styles.sectionCard}>
//           <SectionItem 
//             icon={require('../../../assets/screen-14/terms-and-conditions.png')} 
//             label="Terms & Condition" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/signature.png')} 
//             label="Signature" 
//             isVisible={isVisible}
//           />
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   invoiceInfoCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   invoiceInfoDate: {
//     fontSize: 12,
//     color: '#555',
//   },
//   invoiceNumber: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   sectionCard: {
//     backgroundColor: '#fcfcfcff',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   iconLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 12,
//     resizeMode: 'contain',
//   },
//   label: {
//     fontSize: 14,
//   },
//   addButton: {
//     backgroundColor: '#000000ff',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   hiddenContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   hiddenText: {
//     fontSize: 18,
//     color: '#888',
//   },
// });

///working
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale } from 'react-native-size-matters';


// const SectionItem = ({ icon, label, onPress, isVisible }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{isVisible ? label : '***'}</Text>
//     </View>
//     <Ionicons name="chevron-forward" size={18} color="#000" />
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const [isVisible, setIsVisible] = useState(true);
//     const navigation = useNavigation();
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   const renderText = (text) => {
//     return isVisible ? text : '***';
//   };


//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                         <Ionicons name="chevron-back" size={20} color="#fdfffdff" />
//                       </TouchableOpacity>
//           <Text style={styles.title}>New Invoice</Text>
//           <TouchableOpacity onPress={toggleVisibility}>
//             <Ionicons 
//               name={isVisible ? "eye-outline" : "eye-off-outline"} 
//               size={24} 
//               color="black" 
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.invoiceInfoCard}>
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{renderText('Invoice Info')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Date - 16/05/2025')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Due - 23/05/2025')}</Text>
//           </View>
//           <Text style={styles.invoiceNumber}>{renderText('INV0001')}</Text>
//         </TouchableOpacity>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/briefcase.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Business Info')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/Mask group.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Client')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/i.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Items')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem 
//             icon={require('../../../assets/screen-14/hand.png')} 
//             label="Quantity" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/price-tag.png')} 
//             label="Price" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/discount.png')} 
//             label="Discount" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/delivery.png')} 
//             label="Shipping Charges" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/money.png')} 
//             label="Currency" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/debit-card.png')} 
//             label="Payment Method" 
//             isVisible={isVisible}
//           />
//         </View>

//         <View style={styles.sectionCard}>
//           <SectionItem 
//             icon={require('../../../assets/screen-14/terms-and-conditions.png')} 
//             label="Terms & Condition" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/signature.png')} 
//             label="Signature" 
//             isVisible={isVisible}
//           />
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   invoiceInfoCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   invoiceInfoDate: {
//     fontSize: 12,
//     color: '#555',
//   },
//   invoiceNumber: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   sectionCard: {
//     backgroundColor: '#fcfcfcff',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   iconLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 12,
//     resizeMode: 'contain',
//   },
//   label: {
//     fontSize: 14,
//   },
//   addButton: {
//     backgroundColor: '#000000ff',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
//working

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { scale, verticalScale } from 'react-native-size-matters';

// const SectionItem = ({ icon, label, onPress, isVisible }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{isVisible ? label : '***'}</Text>
//     </View>
//     <Ionicons name="chevron-forward" size={18} color="#000" />
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [isVisible, setIsVisible] = useState(true);

//   // Get all parameters from route
//   const invoiceNo = route.params;
//   const startDate = route.params?.startDate ? new Date(route.params.startDate) : new Date();
//   const endDate = route.params?.endDate ? new Date(route.params.endDate) : new Date();
//   endDate.setDate(startDate.getDate() + 7); // Default to 7 days later if not provided
//   const po = route.params?.po || '';
//   const title = route.params?.title || 'Website Invoice';
//   // Function to toggle visibility of sensitive information
  
//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const renderText = (text) => (isVisible ? text : '***');

//   const formatDate = (date) => date.toLocaleDateString('en-GB');

//   const InvoiceInfoCard = () => { }
//   console.log("PPPPPPPPPPPPPPPPPPPPPP",invoiceNo?.invoiceId);

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={20} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.title}>New Invoice</Text>
//           <TouchableOpacity onPress={toggleVisibility}>
//             <Ionicons
//               name={isVisible ? "eye-outline" : "eye-off-outline"}
//               size={24}
//               color="black"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Invoice Info Card */}
//         <TouchableOpacity
//           style={styles.invoiceInfoCard}
//           onPress={() => navigation.navigate('Invoice-info-screen', {
//             screen: 'Invoice-info-screen',
//             params: {
//               invoiceNo,
//               startDate: startDate.toISOString(),
//               endDate: endDate.toISOString(),
//               po,
//               title,
//             }
//           })}
          
//         >
//         <View>
//           <Text style={styles.invoiceInfoTitle}>{renderText(title)}</Text>
//           <Text style={styles.invoiceInfoDate}>{renderText(`Date - ${formatDate(startDate)}`)}</Text>
//           <Text style={styles.invoiceInfoDate}>{renderText(`Due - ${formatDate(endDate)}`)}</Text>
//           {po ? <Text style={styles.invoiceInfoDate}>{renderText(`PO - ${po}`)}</Text> : null}
//         </View>
//         <Text style={styles.invoiceNumber}>{renderText(invoiceNo)}</Text>
//       </TouchableOpacity>

//       {/* Business & Client */}
//       <View style={styles.sectionCard}>
//         <TouchableOpacity style={styles.sectionRow} onPress={() => navigation.navigate('BusinessInfoScreen')}>
//           <View style={styles.iconLabel}>
//             <Image source={require('../../../assets/screen-14/briefcase.png')} style={styles.icon} />
//             <Text style={styles.label}>{renderText('Business Info')}</Text>
//           </View>
//           <View style={styles.addButton}>
//             <Ionicons name="add" size={18} color="white" />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.sectionRow} onPress={() => navigation.navigate('Add-client')}>
//           <View style={styles.iconLabel}>
//             <Image source={require('../../../assets/screen-14/Mask group.png')} style={styles.icon} />
//             <Text style={styles.label}>{renderText('Client')}</Text>
//           </View>
//           <View style={styles.addButton}>
//             <Ionicons name="add" size={18} color="white" />
//           </View>
//         </TouchableOpacity>
//       </View>

//       {/* Items Section */}
//       <View style={styles.sectionCard}>
//         <TouchableOpacity style={styles.sectionRow} onPress={() => navigation.navigate('Add-item')}>
//           <View style={styles.iconLabel}>
//             <Image source={require('../../../assets/screen-14/i.png')} style={styles.icon} />
//             <Text style={styles.label}>{renderText('Items')}</Text>
//           </View>
//           <View style={styles.addButton}>
//             <Ionicons name="add" size={18} color="white" />
//           </View>
//         </TouchableOpacity>

//         <SectionItem icon={require('../../../assets/screen-14/hand.png')} label="Quantity" isVisible={isVisible} onPress={() => navigation.navigate('QuantityScreen')} />
//         <SectionItem icon={require('../../../assets/screen-14/price-tag.png')} label="Price" isVisible={isVisible} onPress={() => navigation.navigate('PriceScreen')} />
//         <SectionItem icon={require('../../../assets/screen-14/discount.png')} label="Discount" isVisible={isVisible} onPress={() => navigation.navigate('DiscountScreen')} />
//         <SectionItem icon={require('../../../assets/screen-14/delivery.png')} label="Shipping Charges" isVisible={isVisible} onPress={() => navigation.navigate('ShippingScreen')} />
//         <SectionItem icon={require('../../../assets/screen-14/money.png')} label="Currency" isVisible={isVisible} onPress={() => navigation.navigate('Currency-screen')} />
//         <SectionItem icon={require('../../../assets/screen-14/debit-card.png')} label="Payment Method" isVisible={isVisible} onPress={() => navigation.navigate('PaymentMethodScreen')} />
//       </View>

//       {/* Terms & Signature */}
//       <View style={styles.sectionCard}>
//         <SectionItem icon={require('../../../assets/screen-14/terms-and-conditions.png')} label="Terms & Condition" isVisible={isVisible} onPress={() => navigation.navigate('TermsScreen')} />
//         <SectionItem icon={require('../../../assets/screen-14/signature.png')} label="Signature" isVisible={isVisible} onPress={() => navigation.navigate('Signature-screen')} />
//       </View>
//     </ScrollView>
//     </LinearGradient >
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { padding: 20, paddingBottom: 40 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//   },
//   title: { fontSize: 20, fontWeight: 'bold' },
//   invoiceInfoCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: { fontWeight: 'bold', fontSize: 16 },
//   invoiceInfoDate: { fontSize: 12, color: '#555' },
//   invoiceNumber: { fontWeight: 'bold', fontSize: 16 },
//   sectionCard: {
//     backgroundColor: '#fcfcfcff',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   iconLabel: { flexDirection: 'row', alignItems: 'center' },
//   icon: { width: 20, height: 20, marginRight: 12, resizeMode: 'contain' },
//   label: { fontSize: 14 },
//   addButton: {
//     backgroundColor: '#000000ff',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { scale, verticalScale } from 'react-native-size-matters';

// const SectionItem = ({ icon, label, onPress, isVisible }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{isVisible ? label : '***'}</Text>
//     </View>
//     <Ionicons name="chevron-forward" size={18} color="#000" />
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [isVisible, setIsVisible] = useState(true);

//   // Get all parameters from route with proper defaults
//   const {
//     invoiceId = 'INV0001',
//     startDate = new Date(),
//     endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     po = '',
//     title = 'Website Invoice'
//   } = route.params || {};

//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const renderText = (text) => (isVisible ? text : '***');
//   const formatDate = (date) => date.toLocaleDateString('en-GB');

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={20} color="#fdfffdff" />
//           </TouchableOpacity>
//           <Text style={styles.title}>New Invoice</Text>
//           <TouchableOpacity onPress={toggleVisibility}>
//             <Ionicons
//               name={isVisible ? "eye-outline" : "eye-off-outline"}
//               size={24}
//               color="black"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Invoice Info Card */}
//         <TouchableOpacity
//           style={styles.invoiceInfoCard}
//           onPress={() => navigation.navigate('Invoice-info-screen', {
//             invoiceId,
//             startDate: startDate.toISOString(),
//             endDate: endDate.toISOString(),
//             po,
//             title,
//           })}
//         >
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{renderText(title)}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText(`Date - ${formatDate(new Date(startDate))}`)}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText(`Due - ${formatDate(new Date(endDate))}`)}</Text>
//             {po ? <Text style={styles.invoiceInfoDate}>{renderText(`PO - ${po}`)}</Text> : null}
//           </View>
//           <Text style={styles.invoiceNumber}>{renderText(invoiceId)}</Text>
//         </TouchableOpacity>

//         {/* Business & Client */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity 
//             style={styles.sectionRow} 
//             onPress={() => navigation.navigate('BusinessInfoScreen')}
//           >
//             <View style={styles.iconLabel}>
//               <Image source={require('../../../assets/screen-14/briefcase.png')} style={styles.icon} />
//               <Text style={styles.label}>{renderText('Business Info')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.sectionRow} 
//             onPress={() => navigation.navigate('Add-client')}
//           >
//             <View style={styles.iconLabel}>
//               <Image source={require('../../../assets/screen-14/Mask group.png')} style={styles.icon} />
//               <Text style={styles.label}>{renderText('Client')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Items Section */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity 
//             style={styles.sectionRow} 
//             onPress={() => navigation.navigate('Add-item')}
//           >
//             <View style={styles.iconLabel}>
//               <Image source={require('../../../assets/screen-14/i.png')} style={styles.icon} />
//               <Text style={styles.label}>{renderText('Items')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem 
//             icon={require('../../../assets/screen-14/hand.png')} 
//             label="Quantity" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('QuantityScreen')} 
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/price-tag.png')} 
//             label="Price" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('PriceScreen')} 
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/discount.png')} 
//             label="Discount" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('DiscountScreen')} 
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/delivery.png')} 
//             label="Shipping Charges" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('ShippingScreen')} 
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/money.png')} 
//             label="Currency" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('Currency-screen')} 
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/debit-card.png')} 
//             label="Payment Method" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('PaymentMethodScreen')} 
//           />
//         </View>

//         {/* Terms & Signature */}
//         <View style={styles.sectionCard}>
//           <SectionItem 
//             icon={require('../../../assets/screen-14/terms-and-conditions.png')} 
//             label="Terms & Condition" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('TermsScreen')} 
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/signature.png')} 
//             label="Signature" 
//             isVisible={isVisible} 
//             onPress={() => navigation.navigate('Signature-screen')} 
//           />
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { padding: 20, paddingBottom: 40 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//   },
//   title: { fontSize: 20, fontWeight: 'bold' },
//   invoiceInfoCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: { fontWeight: 'bold', fontSize: 16 },
//   invoiceInfoDate: { fontSize: 12, color: '#555' },
//   invoiceNumber: { fontWeight: 'bold', fontSize: 16 },
//   sectionCard: {
//     backgroundColor: '#fcfcfcff',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   iconLabel: { flexDirection: 'row', alignItems: 'center' },
//   icon: { width: 20, height: 20, marginRight: 12, resizeMode: 'contain' },
//   label: { fontSize: 14 },
//   addButton: {
//     backgroundColor: '#000000ff',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';

const SectionItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
    <View style={styles.iconLabel}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#000" />
  </TouchableOpacity>
);

export default function NewInvoiceScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [showInvoiceNumber, setShowInvoiceNumber] = useState(true);

  const {
  invoiceId = `INV${String(1).padStart(5, '0')}`,  // Default to INV00001
  startDate = new Date(),
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  po = '',
  title = 'Website Invoice'
} = route.params || {};

  const toggleVisibility = () => setShowInvoiceNumber(!showInvoiceNumber);
  const formatDate = (date) => date.toLocaleDateString('en-GB');

  return (
    <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#fdfffdff" />
          </TouchableOpacity>
          <Text style={styles.title}>New Invoice</Text>
          <TouchableOpacity onPress={toggleVisibility}>
            <Ionicons
              name={showInvoiceNumber ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.invoiceInfoCard}
          onPress={() => navigation.navigate('Invoice-info-screen', {
            invoiceId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            po,
            title,
          })}
        >
          <View>
            <Text style={styles.invoiceInfoTitle}>{title}</Text>
            <Text style={styles.invoiceInfoDate}>{`Date - ${formatDate(new Date(startDate))}`}</Text>
            <Text style={styles.invoiceInfoDate}>{`Due - ${formatDate(new Date(endDate))}`}</Text>
            {po ? <Text style={styles.invoiceInfoDate}>{`PO - ${po}`}</Text> : null}
          </View>
          <Text style={styles.invoiceNumber}>{showInvoiceNumber ? invoiceId : '********'}</Text>
        </TouchableOpacity>

        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionRow} 
            onPress={() => navigation.navigate('company-profile')}
          >
            <View style={styles.iconLabel}>
              <Image source={require('../../../assets/screen-14/briefcase.png')} style={styles.icon} />
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
              <Image source={require('../../../assets/screen-14/Mask group.png')} style={styles.icon} />
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
              <Image source={require('../../../assets/screen-14/i.png')} style={styles.icon} />
              <Text style={styles.label}>Items</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <SectionItem 
            icon={require('../../../assets/screen-14/hand.png')} 
            label="Quantity" 
            onPress={() => navigation.navigate('QuantityScreen')} 
          />
          <SectionItem 
            icon={require('../../../assets/screen-14/price-tag.png')} 
            label="Price" 
            onPress={() => navigation.navigate('PriceScreen')} 
          />
          <SectionItem 
            icon={require('../../../assets/screen-14/discount.png')} 
            label="Discount" 
            onPress={() => navigation.navigate('DiscountScreen')} 
          />
          <SectionItem 
            icon={require('../../../assets/screen-14/delivery.png')} 
            label="Shipping Charges" 
            onPress={() => navigation.navigate('ShippingScreen')} 
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
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
  addButton: {
    backgroundColor: '#000000ff',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
