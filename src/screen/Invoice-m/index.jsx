// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useTranslation } from 'react-i18next';

// import invoice from '../../../assets/screen-13/invoice-placeholder.png';

// const InvoiceScreen = () => {
//   const navigation = useNavigation();
//   const { t } = useTranslation();

//   const [activeTab, setActiveTab] = useState('All');
//   const [selectedTab, setSelectedTab] = useState('Invoice');

//   const invoices = [

//   ];
// //   const invoices = [
// //     {
// //       id: 'INV00001',
// //       clientName: 'Divyesh Shah',
// //       amount: 56050,
// //       status: 'Unpaid',
// //       dueDate: '17/05/2025',
// //       message: t('create_invoice_prompt'),
// //     },
// //     {
// //       id: 'INV00002',
// //       clientName: 'Shivangi Rathi',
// //       amount: 8000,
// //       status: 'Paid',
// //       dueDate: '17/05/2025',
// //       message: t('paid'),
// //     },
// //   ];
// const handleCountinue = () => {

//     navigation.navigate('New-invoice');
//   }
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.greenHeader}>
//         <View style={styles.headerTop}>
//           <Text style={styles.headerTitle}>{t('invoice_maker')}</Text>
//           <Ionicons name="settings-sharp" size={24} color="white" />
//         </View>
//       </View>

//       {/* Stats */}
//       <View style={styles.statContainer}>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>{t('total_sales')}</Text>
//           <Text style={styles.statValueGreen}>₹56,050.00</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>{t('total_received')}</Text>
//           <Text style={styles.statValueRed}>₹0.00</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>{t('total_overdue')}</Text>
//           <Text style={styles.statValueBlack}>₹0.00</Text>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabs}>
//         {['All', 'Paid', 'Unpaid'].map(tab => (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tab, activeTab === tab && styles.activeTab]}
//             onPress={() => setActiveTab(tab)}
//           >
//             <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
//               {t(tab.toLowerCase())}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Invoice List */}
//       <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
//         {invoices.filter(item => activeTab === 'All' || item.status === activeTab).length > 0 ? (
//           invoices
//             .filter(item => activeTab === 'All' || item.status === activeTab)
//             .map((item, index) => (
//               <View key={index} style={styles.card}>
//                 <View style={styles.rowBetween}>
//                   <Text style={styles.invoiceId}>{item.id}</Text>
//                   <Text style={styles.clientName}>{item.clientName}</Text>
//                 </View>
//                 <Text style={styles.date}>{item.dueDate}</Text>
//                 <Text style={styles.message}>{item.message}</Text>

//                 <View style={styles.rowBetween}>
//                   <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
//                   <View
//                     style={[
//                       styles.statusBadge,
//                       {
//                         backgroundColor:
//                           item.status === 'Paid' ? '#E0F5E9' : '#FFEAEA',
//                       },
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.statusText,
//                         {
//                           color: item.status === 'Paid' ? '#4CAF50' : '#FF3B30',
//                         },
//                       ]}
//                     >
//                       {t(item.status.toLowerCase())}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             ))
//         ) : (
//           <View style={styles.content}>
//             <Image source={invoice} style={styles.placeholderIcon} />
//             <Text style={styles.noInvoiceText}>
//               {t('no_invoice_message') + '\n' + t('create_invoice_prompt')}
//             </Text>
//             <TouchableOpacity
//               style={styles.createBtn}
//               onPress={handleCountinue}
//             >
//               <Ionicons name="add" size={20} color="#fff" />
//               <Text style={styles.createBtnText}>{t('create_new_invoice')}</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         {[
//           { name: 'invoice', icon: require('../../../assets/screen-13/1.png') },
//           { name: 'estimate', icon: require('../../../assets/screen-13/2.png') },
//           { name: 'client', icon: require('../../../assets/screen-13/3.png') },
//           { name: 'report', icon: require('../../../assets/screen-13/4.png') },
//           { name: 'item', icon: require('../../../assets/screen-13/5.png') },
//         ].map(tab => {
//           const isActive = selectedTab.toLowerCase() === tab.name;
//           return (
//             <TouchableOpacity
//               key={tab.name}
//               onPress={() => setSelectedTab(tab.name)}
//               style={styles.navItemWrapper}
//             >
//               {isActive ? (
//                 <LinearGradient
//                   colors={['#4cd04c3d', 'rgba(76, 208, 76, 0)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 0, y: 1 }}
//                   style={styles.activeNavBox}
//                 >
//                   <Image
//                     source={tab.icon}
//                     style={[styles.iconImage, { tintColor: '#4CD04D' }]}
//                   />
//                   <Text style={[styles.navLabel, { color: '#4CD04D', fontWeight: '700' }]}>
//                     {t(tab.name)}
//                   </Text>
//                 </LinearGradient>
//               ) : (
//                 <View style={styles.navIconBox}>
//                   <Image
//                     source={tab.icon}
//                     style={[styles.iconImage, { tintColor: '#D9D9D9' }]}
//                   />
//                   <Text style={styles.navLabel}>{t(tab.name)}</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F7FCF8' },
//   greenHeader: {
//     backgroundColor: '#4CAF50',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingTop: 50,
//     paddingHorizontal: 16,
//     paddingBottom: 40,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
//   statContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: -39,
//     paddingHorizontal: 10,
//   },
//   statBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     width: '30%',
//     alignItems: 'center',
//     elevation: 4,
//     overflow: 'hidden',
//   },
//   statLabel: {
//     backgroundColor: '#000',
//     color: '#fff',
//     fontSize: 14,
//     paddingVertical: 10,
//     width: '100%',
//     textAlign: 'center',
//   },
//   statValueGreen: {
//     color: '#4CAF50',
//     fontSize: 14,
//     fontWeight: 'bold',
//     paddingVertical: 8,
//   },
//   statValueRed: {
//     color: 'red',
//     fontSize: 14,
//     fontWeight: 'bold',
//     paddingVertical: 8,
//   },
//   statValueBlack: {
//     color: '#000',
//     fontSize: 14,
//     fontWeight: 'bold',
//     paddingVertical: 8,
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 3,
//     marginTop: 10,
//     marginBottom: 15,
//     overflow: 'hidden',
//   },
//   tab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
//   activeTab: { backgroundColor: '#4CAF50' },
//   tabText: { color: '#555', fontWeight: '600' },
//   activeTabText: { color: '#fff', fontWeight: '600' },
//   content: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   placeholderIcon: {
//     width: 120,
//     height: 120,
//     tintColor: '#ccc',
//     marginBottom: 16,
//   },
//   noInvoiceText: {
//     textAlign: 'center',
//     color: '#777',
//     fontSize: 14,
//     marginBottom: 24,
//   },
//   createBtn: {
//     backgroundColor: '#4CAF50',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 24,
//   },
//   createBtnText: {
//     color: '#fff',
//     fontSize: 16,
//     marginLeft: 8,
//     fontWeight: 'bold',
//   },
//   iconImage: {
//     width: 26,
//     height: 26,
//     resizeMode: 'contain',
//     marginBottom: 6,
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//   },
//   navItemWrapper: { alignItems: 'center', flex: 1 },
//   navIconBox: {
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderRadius: 12,
//     width: 70,
//   },
//   activeNavBox: {
//     alignItems: 'center',
//     padding: 10,
//     width: 70,
//   },
//   navLabel: {
//     fontSize: 12,
//     color: '#D9D9D9',
//     fontWeight: '500',
//   },
//   navLabelActive: {
//     color: '#4CAF50',
//     fontWeight: '700',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     margin: 10,
//     elevation: 2,
//   },
//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   invoiceId: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#111',
//   },
//   clientName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   date: {
//     marginTop: 4,
//     fontSize: 12,
//     color: '#888',
//   },
//   message: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//     marginBottom: 10,
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   statusBadge: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 16,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
// });

// export default InvoiceScreen;
//working
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useTranslation } from 'react-i18next';

// import invoice from '../../../assets/screen-13/invoice-placeholder.png';
// import estimate from '../../../assets/screen-13/bill.png';
// import client from '../../../assets/screen-13/Mask-group.png';
// import report from '../../../assets/screen-13/invoice-placeholder.png';
// import item from '../../../assets/screen-13/box.png';


// const InvoiceScreen = () => {
//   const navigation = useNavigation();
//   const { t } = useTranslation();

//   const [activeTab, setActiveTab] = useState('All');
//   const [selectedTab, setSelectedTab] = useState('invoice');

//   const invoices = [

//   ];
//   //   const invoices = [
//   //     {
//   //       id: 'INV00001',
//   //       clientName: 'Divyesh Shah',
//   //       amount: 56050,
//   //       status: 'Unpaid',
//   //       dueDate: '17/05/2025',
//   //       message: t('create_invoice_prompt'),
//   //     },
//   //     {
//   //       id: 'INV00002',
//   //       clientName: 'Shivangi Rathi',
//   //       amount: 8000,
//   //       status: 'Paid',
//   //       dueDate: '17/05/2025',
//   //       message: t('paid'),
//   //     },
//   //   ];


//   const handleContinue1 = () => {
//     navigation.navigate('New-invoice');
//   };
//   const handleContinue2 = () => {
//     navigation.navigate('New-invoice');
//   };
//   const handleContinue3 = () => {
//   navigation.navigate('Client-Screen');
// };

//   const handleContinue4 = () => {
//     navigation.navigate('New-invoice');
//   };
//   const handleContinue5 = () => {
//     navigation.navigate('Add-item');
//   };


//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.greenHeader}>
//         <View style={styles.headerTop}>
//           <Text style={styles.headerTitle}>{t('invoice_maker')}</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Settings-screen')}>
//   <Ionicons name="settings-sharp" size={24} color="white" />
// </TouchableOpacity>
//         </View>
//       </View>

//       {/* Stats */}
//       <View style={styles.statContainer}>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>{t('total_sales')}</Text>
//           <Text style={styles.statValueGreen}>₹56,050.00</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>{t('total_received')}</Text>
//           <Text style={styles.statValueRed}>₹0.00</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>{t('total_overdue')}</Text>
//           <Text style={styles.statValueBlack}>₹0.00</Text>
//         </View>
//       </View>

//       {/* Tab Filters (only shown for Invoice Tab) */}
//       {selectedTab === 'invoice' && (
//         <View style={styles.tabs}>
//           {['All', 'Paid', 'Unpaid'].map(tab => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tab, activeTab === tab && styles.activeTab]}
//               onPress={() => setActiveTab(tab)}
//             >
//               <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
//                 {t(tab.toLowerCase())}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//       {selectedTab === 'estimate' && (
//         <View style={styles.tabs}>
//           {['All', 'Pending', 'Approved','Overdue','cancel'].map(tab => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tab, activeTab === tab && styles.activeTab]}
//               onPress={() => setActiveTab(tab)}
//             >
//               <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
//                 {t(tab.toLowerCase())}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
      

//       {/* Tab Content */}
//       {selectedTab === 'invoice' && (
//         <ScrollView
//          contentContainerStyle={{
//           flexGrow: 1,  // This makes the content area expand
//         }}
//           >
//           {invoices.filter(item => activeTab === 'All' || item.status === activeTab).length > 0 ? (
//             invoices
//               .filter(item => activeTab === 'All' || item.status === activeTab)
//               .map((item, index) => (
//                 <View key={index} style={styles.card}>
//                   <View style={styles.rowBetween}>
//                     <Text style={styles.invoiceId}>{item.id}</Text>
//                     <Text style={styles.clientName}>{item.clientName}</Text>
//                   </View>
//                   <Text style={styles.date}>{item.dueDate}</Text>
//                   <Text style={styles.message}>{item.message}</Text>

//                   <View style={styles.rowBetween}>
//                     <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
//                     <View
//                       style={[
//                         styles.statusBadge,
//                         {
//                           backgroundColor:
//                             item.status === 'Paid' ? '#E0F5E9' : '#FFEAEA',
//                         },
//                       ]}
//                     >
//                       <Text
//                         style={[
//                           styles.statusText,
//                           {
//                             color: item.status === 'Paid' ? '#4CAF50' : '#FF3B30',
//                           },
//                         ]}
//                       >
//                         {t(item.status.toLowerCase())}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               ))
//           ) : (
//             <View style={styles.content}>
//             {/* // <View style={{...styles.content,flex:1, backgroundColor:"#f00"}}> */}
//               <Image source={invoice} style={styles.placeholderIcon} />
//               <Text style={styles.noInvoiceText}>
//                 {t('no_invoice_message') + '\n' + t('create_invoice_prompt')}
//               </Text>
//               <TouchableOpacity style={styles.createBtn} onPress={handleContinue1}>
//                 <Ionicons name="add" size={20} color="#fff" />
//                 <Text style={styles.createBtnText}>{t('create_new_invoice')}</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </ScrollView>
//       )}

//       {selectedTab == 'estimate' && (
//         <ScrollView contentContainerStyle={{
//           flexGrow: 1,  // This makes the content area expand
//         }}>
//         {
//           invoices.filter(item => activeTab === 'All' || item.status === activeTab).length > 0 ? (
//             invoices
//               .filter(item => activeTab === 'All' || item.status === activeTab)
//               .map((item, index) => (
//                 <View key={index} style={styles.card}>
//                   <View style={styles.rowBetween}>
//                     <Text style={styles.invoiceId}>{item.id}</Text>
//                     <Text style={styles.clientName}>{item.clientName}</Text>
//                   </View>
//                   <Text style={styles.date}>{item.dueDate}</Text>
//                   <Text style={styles.message}>{item.message}</Text>

//                   <View style={styles.rowBetween}>
//                     <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
//                     <View
//                       style={[
//                         styles.statusBadge,
//                         {
//                           backgroundColor:
//                             item.status === 'Paid' ? '#E0F5E9' : '#FFEAEA',
//                         },
//                       ]}
//                     >
//                       <Text
//                         style={[
//                           styles.statusText,
//                           {
//                             color: item.status === 'Paid' ? '#4CAF50' : '#FF3B30',
//                           },
//                         ]}
//                       >
//                         {t(item.status.toLowerCase())}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               ))
//           ) : (

//             <View style={styles.content}>
//               <Image source={estimate} style={styles.placeholderIcon} />
//               <Text style={styles.noInvoiceText}>
//                 {t('estimate_message') + '\n' + t('create_estimate_prompt')}
//               </Text>
//               <TouchableOpacity style={styles.createBtn} onPress={handleContinue2}>
//                 <Ionicons name="add" size={20} color="#fff" />
//                 <Text style={styles.createBtnText}>{t('create_estimate')}</Text>
//               </TouchableOpacity>
//             </View>
//             )}
//         </ScrollView>
//       )}

//       {selectedTab == 'client' && (
//         <View style={styles.content}>
//           <Image source={client} style={styles.placeholderIcon} />
//           <Text style={styles.noInvoiceText}>
//             {t('client_message') + '\n' + t('create_client_prompt')}
//           </Text>
//           <TouchableOpacity style={styles.createBtn} onPress={handleContinue3}>
//             <Ionicons name="add" size={20} color="#fff" />
//             <Text style={styles.createBtnText}>{t('add_new_client')}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       {selectedTab === 'report' && (
//   <View style={{ flex: 1 }}>
//     {/* Tabs: Sales | Received | Receivable */}
//     <View style={styles.tabs}>
//       {['Sales', 'Received', 'Receivable'].map(tab => (
//         <TouchableOpacity
//           key={tab}
//           style={[styles.tab, activeTab === tab && styles.activeTab]}
//           onPress={() => setActiveTab(tab)}
//         >
//           <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
//             {tab}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>

//     {/* Date and Frequency Pickers */}
//     <View style={styles.reportControls}>
//       <TouchableOpacity style={styles.dropdownBox}>
//         <Text style={styles.dropdownText}>15/05/2025</Text>
//         <Ionicons name="chevron-down" size={16} color="#000" />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.dropdownBox}>
//         <Text style={styles.dropdownText}>Monthly</Text>
//         <Ionicons name="chevron-down" size={16} color="#000" />
//       </TouchableOpacity>
//     </View>

//     {/* Placeholder Report Box */}
//     <View style={styles.reportPlaceholderBox} />
//   </View>
// )}

//       {selectedTab == 'item' && (
//         <View style={styles.content}>
//           <Image source={item} style={styles.placeholderIcon} />
//           <Text style={styles.noInvoiceText}>
//             {t('item_message') + '\n' + t('create_item_prompt')}
//           </Text>
//           <TouchableOpacity style={styles.createBtn} onPress={handleContinue5}>
//             <Ionicons name="add" size={20} color="#fff" />
//             <Text style={styles.createBtnText}>{t('add_item')}</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         {[
//           { name: 'invoice', icon: require('../../../assets/screen-13/1.png') },
//           { name: 'estimate', icon: require('../../../assets/screen-13/2.png') },
//           { name: 'client', icon: require('../../../assets/screen-13/3.png') },
//           { name: 'report', icon: require('../../../assets/screen-13/4.png') },
//           { name: 'item', icon: require('../../../assets/screen-13/5.png') },
//         ].map(tab => {
//           const isActive = selectedTab === tab.name;
//           return (
//             <TouchableOpacity
//               key={tab.name}
//               onPress={() => setSelectedTab(tab.name)}
//               style={styles.navItemWrapper}
//             >
//               {isActive ? (
//                 <LinearGradient
//                   colors={['#4cd04c3d', 'rgba(76, 208, 76, 0)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 0, y: 1 }}
//                   style={styles.activeNavBox}
//                 >
//                   <Image
//                     source={tab.icon}
//                     style={[styles.iconImage, { tintColor: '#4CD04D' }]}
//                   />
//                   <Text style={[styles.navLabel, { color: '#4CD04D', fontWeight: '700' }]}>
//                     {t(tab.name)}
//                   </Text>
//                 </LinearGradient>
//               ) : (
//                 <View style={styles.navIconBox}>
//                   <Image
//                     source={tab.icon}
//                     style={[styles.iconImage, { tintColor: '#D9D9D9' }]}
//                   />
//                   <Text style={styles.navLabel}>{t(tab.name)}</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import invoice from '../../../assets/screen-13/invoice-placeholder.png';
import estimate from '../../../assets/screen-13/bill.png';
import client from '../../../assets/screen-13/Mask-group.png';
import report from '../../../assets/screen-13/invoice-placeholder.png';
import item from '../../../assets/screen-13/box.png';

const InvoiceScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('All');
  const [selectedTab, setSelectedTab] = useState('invoice');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [frequency, setFrequency] = useState('Monthly');
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);
  const frequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const invoices = [];

  const handleContinue1 = () => navigation.navigate('New-invoice');
  const handleContinue2 = () => navigation.navigate('New-invoice');
  const handleContinue3 = () => navigation.navigate('Client-Screen');
  const handleContinue5 = () => navigation.navigate('Add-item');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.greenHeader}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>{t('invoice_maker')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings-screen')}>
            <Ionicons name="settings-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{t('total_sales')}</Text>
          <Text style={styles.statValueGreen}>₹56,050.00</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{t('total_received')}</Text>
          <Text style={styles.statValueRed}>₹0.00</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{t('total_overdue')}</Text>
          <Text style={styles.statValueBlack}>₹0.00</Text>
        </View>
      </View>

      {/* Tabs */}
      {(selectedTab === 'invoice' || selectedTab === 'estimate' || selectedTab === 'report') && (
        <View style={styles.tabs}>
          {(selectedTab === 'invoice'
            ? ['All', 'Paid', 'Unpaid']
            : selectedTab === 'estimate'
            ? ['All', 'Pending', 'Approved', 'Overdue', 'Cancel']
            : ['Sales', 'Received', 'Receivable']
          ).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
                {t(tab.toLowerCase())}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Tab Content */}
      {selectedTab === 'invoice' && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {invoices.filter(item => activeTab === 'All' || item.status === activeTab).length > 0 ? (
            invoices
              .filter(item => activeTab === 'All' || item.status === activeTab)
              .map((item, index) => (
                <View key={index} style={styles.card}>
                  {/* Card content here */}
                </View>
              ))
          ) : (
            <View style={styles.content}>
              <Image source={invoice} style={styles.placeholderIcon} />
              <Text style={styles.noInvoiceText}>
                {t('no_invoice_message') + '\n' + t('create_invoice_prompt')}
              </Text>
              <TouchableOpacity style={styles.createBtn} onPress={handleContinue1}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.createBtnText}>{t('create_new_invoice')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      {selectedTab === 'estimate' && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.content}>
            <Image source={estimate} style={styles.placeholderIcon} />
            <Text style={styles.noInvoiceText}>
              {t('estimate_message') + '\n' + t('create_estimate_prompt')}
            </Text>
            <TouchableOpacity style={styles.createBtn} onPress={handleContinue2}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.createBtnText}>{t('create_estimate')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {selectedTab === 'client' && (
        <View style={styles.content}>
          <Image source={client} style={styles.placeholderIcon} />
          <Text style={styles.noInvoiceText}>
            {t('client_message') + '\n' + t('create_client_prompt')}
          </Text>
          <TouchableOpacity style={styles.createBtn} onPress={handleContinue3}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.createBtnText}>{t('add_new_client')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedTab === 'report' && (
        <View style={{ flex: 1 }}>
          {/* Date & Frequency Select */}
          <View style={styles.reportControls}>
            <TouchableOpacity style={styles.dropdownBox} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dropdownText}>
                {selectedDate.toLocaleDateString()}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownBox} onPress={() => setShowFrequencyModal(true)}>
              <Text style={styles.dropdownText}>{frequency}</Text>
              <Ionicons name="chevron-down" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.reportPlaceholderBox} />

          {/* Date Picker Dialog */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}

          {/* Frequency Modal */}
          <Modal transparent visible={showFrequencyModal} animationType="fade">
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
              onPress={() => setShowFrequencyModal(false)}
            >
              <View
                style={{
                  marginTop: 'auto',
                  backgroundColor: '#fff',
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                {frequencyOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={{ paddingVertical: 12 }}
                    onPress={() => {
                      setFrequency(option);
                      setShowFrequencyModal(false);
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}

      {selectedTab === 'item' && (
        <View style={styles.content}>
          <Image source={item} style={styles.placeholderIcon} />
          <Text style={styles.noInvoiceText}>
            {t('item_message') + '\n' + t('create_item_prompt')}
          </Text>
          <TouchableOpacity style={styles.createBtn} onPress={handleContinue5}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.createBtnText}>{t('add_item')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { name: 'invoice', icon: require('../../../assets/screen-13/1.png') },
          { name: 'estimate', icon: require('../../../assets/screen-13/2.png') },
          { name: 'client', icon: require('../../../assets/screen-13/3.png') },
          { name: 'report', icon: require('../../../assets/screen-13/4.png') },
          { name: 'item', icon: require('../../../assets/screen-13/5.png') },
        ].map(tab => {
          const isActive = selectedTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => setSelectedTab(tab.name)}
              style={styles.navItemWrapper}
            >
              {isActive ? (
                <LinearGradient
                  colors={['#4cd04c3d', 'rgba(76, 208, 76, 0)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.activeNavBox}
                >
                  <Image
                    source={tab.icon}
                    style={[styles.iconImage, { tintColor: '#4CD04D' }]}
                  />
                  <Text style={[styles.navLabel, { color: '#4CD04D', fontWeight: '700' }]}>
                    {t(tab.name)}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.navIconBox}>
                  <Image
                    source={tab.icon}
                    style={[styles.iconImage, { tintColor: '#D9D9D9' }]}
                  />
                  <Text style={styles.navLabel}>{t(tab.name)}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FCF8' },
  greenHeader: {
    backgroundColor: '#4CAF50',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -39,
    paddingHorizontal: 10,
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    elevation: 4,
    overflow: 'hidden',
  },
  statLabel: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 14,
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center',
  },
  statValueGreen: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  statValueRed: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  statValueBlack: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginTop: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  activeTab: { backgroundColor: '#4CAF50' },
  tabText: { color: '#555', fontWeight: '600' },
  activeTabText: { color: '#fff', fontWeight: '600' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderIcon: {
    width: 120,
    height: 120,
    tintColor: '#ccc',
    marginBottom: 16,
  },
  noInvoiceText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginBottom: 24,
  },
  createBtn: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  iconImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  navItemWrapper: { alignItems: 'center', flex: 1 },
  navIconBox: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    width: 70,
  },
  activeNavBox: {
    alignItems: 'center',
    padding: 10,
    width: 70,
  },
  navLabel: {
    fontSize: 12,
    color: '#D9D9D9',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 10,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceId: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#111',
  },
  clientName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reportControls: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginHorizontal: 16,
  marginBottom: 20,
},
dropdownBox: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  borderRadius: 10,
  paddingHorizontal: 16,
  paddingVertical: 12,
  elevation: 3,
  width: '48%',
},
dropdownText: {
  fontSize: 14,
  color: '#000',
},
reportPlaceholderBox: {
  backgroundColor: '#fff',
  borderRadius: 30,
  marginHorizontal: 30,
  height: 350,
  width: 325,
  alignSelf: 'center',
  elevation: 3,
},



});

export default InvoiceScreen;
