// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     ScrollView,
//     Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import invoice from '../../../assets/screen-13/invoice-placeholder.png'; // make sure this path is correct

// const InvoiceScreen = () => {
//     const navigation = useNavigation();
//     const [activeTab, setActiveTab] = useState('All');


//     // const invoices = [];

//     const invoices = [
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//         {
//             id: 'INV00001',
//             clientName: 'Divyesh Shah',
//             amount: 56050,
//             status: 'Unpaid',
//             dueDate: '17/05/2025',
//             message: 'Due in 15 days',
//         },
//         {
//             id: 'INV00002',
//             clientName: 'Shivangi Rathi',
//             amount: 8000,
//             status: 'Paid',
//             dueDate: '17/05/2025',
//             message: 'Fully Paid',
//         },
//     ];

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.greenHeader}>
//                 <View style={styles.headerTop}>
//                     <Text style={styles.headerTitle}>Invoice Maker</Text>
//                     <Ionicons name="settings-sharp" size={24} color="white" />
//                 </View>

//             </View>
//             <View style={styles.statContainer}>
//                 <View style={styles.statBox}>
//                     <Text style={styles.statLabel}>Total Sales</Text>
//                     <Text style={styles.statValueGreen}>₹56,050.00</Text>
//                 </View>
//                 <View style={styles.statBox}>
//                     <Text style={styles.statLabel}>Total Received</Text>
//                     <Text style={styles.statValueRed}>₹0.00</Text>
//                 </View>
//                 <View style={styles.statBox}>
//                     <Text style={styles.statLabel}>Total Overdue</Text>
//                     <Text style={styles.statValueBlack}>₹0.00</Text>
//                 </View>
//             </View>

//             {/* Filter Tabs */}
//             <View style={styles.tabs}>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'All' && styles.activeTab]}
//                     onPress={() => setActiveTab('All')}
//                 >
//                     <Text style={activeTab === 'All' ? styles.activeTabText : styles.tabText}>All</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'Paid' && styles.activeTab]}
//                     onPress={() => setActiveTab('Paid')}
//                 >
//                     <Text style={activeTab === 'Paid' ? styles.activeTabText : styles.tabText}>Paid</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'Unpaid' && styles.activeTab]}
//                     onPress={() => setActiveTab('Unpaid')}
//                 >
//                     <Text style={activeTab === 'Unpaid' ? styles.activeTabText : styles.tabText}>Unpaid</Text>
//                 </TouchableOpacity>
//             </View>

// {invoices?.length>0?

//             <ScrollView>
//                 {invoices
//                     .filter(item => {
//                         if (activeTab === 'All') return true;
//                         return item.status === activeTab;
//                     })
//                     .map((item, index) => (
//                         <View key={index} style={styles.card}>
//                             <View style={styles.rowBetween}>
//                                 <Text style={styles.invoiceId}>{item.id}</Text>
//                                 <Text style={styles.clientName}>{item.clientName}</Text>
//                             </View>

//                             <Text style={styles.date}>{item.dueDate}</Text>
//                             <Text style={styles.message}>{item.message}</Text>

//                             <View style={styles.rowBetween}>
//                                 <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
//                                 <View
//                                     style={[
//                                         styles.statusBadge,
//                                         {
//                                             backgroundColor:
//                                                 item.status === 'Paid' ? '#E0F5E9' : '#FFEAEA',
//                                         },
//                                     ]}
//                                 >
//                                     <Text
//                                         style={[
//                                             styles.statusText,
//                                             {
//                                                 color: item.status === 'Paid' ? '#4CAF50' : '#FF3B30',
//                                             },
//                                         ]}
//                                     >
//                                         {item.status}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//             </ScrollView>

// :
//             <ScrollView contentContainerStyle={styles.content}>
//                 <Image source={invoice} style={styles.placeholderIcon} />
//                 <Text style={styles.noInvoiceText}>
//                     You haven't added any invoices till now.{"\n"}
//                     Click on create new invoice to add new invoice
//                 </Text>

//                 <TouchableOpacity style={styles.createBtn}>
//                     <Ionicons name="add" size={20} color="#fff" />
//                     <Text style={styles.createBtnText}>Create New Invoice</Text>
//                 </TouchableOpacity>
//             </ScrollView>
// }

//             {/* Bottom Navigation */}
//             <View style={styles.bottomNav}>
//                 <View style={styles.navItem}>
//                     {/* <Ionicons name="document-text-outline" size={20} color="#4CAF50" /> */}
//                     <Image source={require('../../../assets/screen-13/1.png')} style={styles.iconImage} />
//                     <Text style={styles.navLabelActive}>Invoice</Text>
//                 </View>
//                 <View style={styles.navItem}>
//                     <Image source={require('../../../assets/screen-13/2.png')} style={styles.iconImage} />
//                     <Text style={styles.navLabel}>Estimate</Text>
//                 </View>
//                 <View style={styles.navItem}>
//                     <Image source={require('../../../assets/screen-13/3.png')} style={styles.iconImage} />
//                     <Text style={styles.navLabel}>Client</Text>
//                 </View>
//                 <View style={styles.navItem}>
//                     <Image source={require('../../../assets/screen-13/4.png')} style={styles.iconImage} />
//                     <Text style={styles.navLabel}>Report</Text>
//                 </View>
//                 <View style={styles.navItem}>
//                     <Image source={require('../../../assets/screen-13/5.png')} style={styles.iconImage} />
//                     <Text style={styles.navLabel}>Item</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default InvoiceScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F7FCF8',
//     },

//     greenHeader: {
//         backgroundColor: '#4CAF50',
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         paddingTop: 50,
//         paddingHorizontal: 16,
//         paddingBottom: 40,
//     },
//     headerTop: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     headerTitle: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     statContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: -39,
//     },
//     statBox: {
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         width: '30%',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 4,
//         overflow: 'hidden',
//     },
//     statLabel: {
//         backgroundColor: '#000',
//         color: '#fff',
//         fontSize: 14,
//         paddingVertical: 10,
//         width: '100%',
//         textAlign: 'center',
//         borderTopLeftRadius: 12,
//         borderTopRightRadius: 12,
//     },
//     statValueGreen: {
//         color: '#4CAF50',
//         fontSize: 14,
//         fontWeight: 'bold',
//         paddingVertical: 8,
//     },
//     statValueRed: {
//         color: 'red',
//         fontSize: 14,
//         fontWeight: 'bold',
//         paddingVertical: 8,
//     },
//     statValueBlack: {
//         color: '#000',
//         fontSize: 14,
//         fontWeight: 'bold',
//         paddingVertical: 8,
//     },

//     tabs: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: 20,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         shadowOffset: { width: 0, height: 2 },
//         marginTop: 10,
//         overflow: 'hidden',
//         marginBottom:15,
//     },
//     tab: {
//         flex: 1,
//         paddingVertical: 10,
//         alignItems: 'center',
//     },
//     activeTab: {
//         backgroundColor: '#4CAF50',
//     },
//     tabText: {
//         color: '#555',
//         fontWeight: '600',
//     },
//     activeTabText: {
//         color: '#fff',
//         fontWeight: '600',
//     },

//     content: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 24,
//     },
//     placeholderIcon: {
//         width: 120,
//         height: 120,
//         tintColor: '#ccc',
//         marginBottom: 16,
//     },
//     noInvoiceText: {
//         textAlign: 'center',
//         color: '#777',
//         fontSize: 14,
//         marginBottom: 24,
//     },
//     createBtn: {
//         backgroundColor: '#4CAF50',
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//         paddingVertical: 12,
//         borderRadius: 24,
//     },
//     createBtnText: {
//         color: '#fff',
//         fontSize: 16,
//         marginLeft: 8,
//         fontWeight: 'bold',
//     },
//     iconImage: {
//         width: 30,
//         height: 30,
//         marginRight: (12),
//         resizeMode: 'contain',
//       },
//     bottomNav: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         paddingVertical: 10,
//         borderTopWidth: 1,
//         borderColor: '#eee',
//         backgroundColor: '#fff',
//     },
//     navItem: {
//         alignItems: 'center',
//     },
//     navLabel: {
//         fontSize: 12,
//         color: '#D9D9D9',
//         marginTop: 4,
//     },
//     navLabelActive: {
//         fontSize: 12,
//         marginTop: 4,
//         fontWeight: 'bold',
//         color: '#D9D9D9',
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 16,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//     },
//     rowBetween: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     invoiceId: {
//         fontWeight: 'bold',
//         fontSize: 14,
//         color: '#111',
//     },
//     clientName: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#333',
//     },
//     date: {
//         marginTop: 4,
//         fontSize: 12,
//         color: '#888',
//     },
//     message: {
//         fontSize: 12,
//         color: '#666',
//         marginTop: 4,
//         marginBottom: 10,
//     },
//     amount: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     statusBadge: {
//         paddingVertical: 4,
//         paddingHorizontal: 10,
//         borderRadius: 16,
//     },
//     statusText: {
//         fontSize: 12,
//         fontWeight: '600',
//     },
// });

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

// import invoice from '../../../assets/screen-13/invoice-placeholder.png';

// const InvoiceScreen = () => {
//   const navigation = useNavigation();
//   const [activeTab, setActiveTab] = useState('All');
//   const [selectedTab, setSelectedTab] = useState('Invoice');

//   const invoices = [
//     {
//       id: 'INV00001',
//       clientName: 'Divyesh Shah',
//       amount: 56050,
//       status: 'Unpaid',
//       dueDate: '17/05/2025',
//       message: 'Due in 15 days',
//     },
//     {
//       id: 'INV00002',
//       clientName: 'Shivangi Rathi',
//       amount: 8000,
//       status: 'Paid',
//       dueDate: '17/05/2025',
//       message: 'Fully Paid',
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.greenHeader}>
//         <View style={styles.headerTop}>
//           <Text style={styles.headerTitle}>Invoice Maker</Text>
//           <Ionicons name="settings-sharp" size={24} color="white" />
//         </View>
//       </View>

//       {/* Stats */}
//       <View style={styles.statContainer}>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>Total Sales</Text>
//           <Text style={styles.statValueGreen}>₹56,050.00</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>Total Received</Text>
//           <Text style={styles.statValueRed}>₹0.00</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>Total Overdue</Text>
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
//             <Text
//               style={activeTab === tab ? styles.activeTabText : styles.tabText}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Invoice List */}
//       {invoices?.length > 0 ? (
//         <ScrollView>
//           {invoices
//             .filter(item =>
//               activeTab === 'All' ? true : item.status === activeTab
//             )
//             .map((item, index) => (
//               <View key={index} style={styles.card}>
//                 <View style={styles.rowBetween}>
//                   <Text style={styles.invoiceId}>{item.id}</Text>
//                   <Text style={styles.clientName}>{item.clientName}</Text>
//                 </View>

//                 <Text style={styles.date}>{item.dueDate}</Text>
//                 <Text style={styles.message}>{item.message}</Text>

//                 <View style={styles.rowBetween}>
//                   <Text style={styles.amount}>
//                     ₹{item.amount.toLocaleString()}
//                   </Text>
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
//                           color:
//                             item.status === 'Paid' ? '#4CAF50' : '#FF3B30',
//                         },
//                       ]}
//                     >
//                       {item.status}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             ))}
//         </ScrollView>
//       ) : (
//         <ScrollView contentContainerStyle={styles.content}>
//           <Image source={invoice} style={styles.placeholderIcon} />
//           <Text style={styles.noInvoiceText}>
//             You haven't added any invoices till now.{"\n"}
//             Click on create new invoice to add new invoice
//           </Text>

//           <TouchableOpacity style={styles.createBtn}>
//             <Ionicons name="add" size={20} color="#fff" />
//             <Text style={styles.createBtnText}>Create New Invoice</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       )}

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         {[
//           { name: 'Invoice', icon: require('../../../assets/screen-13/1.png') },
//           { name: 'Estimate', icon: require('../../../assets/screen-13/2.png') },
//           { name: 'Client', icon: require('../../../assets/screen-13/3.png') },
//           { name: 'Report', icon: require('../../../assets/screen-13/4.png') },
//           { name: 'Item', icon: require('../../../assets/screen-13/5.png') },
//         ].map(tab => {
//           const isActive = selectedTab === tab.name;
//           return (
//             <TouchableOpacity
//               key={tab.name}
//               onPress={() => setSelectedTab(tab.name)}
//               style={styles.navItemWrapper}
//             >
//               <View
//                 style={[styles.navIconBox, isActive && styles.activeNavIconBox]}
//               >
//                 <Image
//                   source={tab.icon}
//                   style={[
//                     styles.iconImage,
//                     { tintColor: isActive ? '#4CAF50' : '#D9D9D9' },
//                   ]}
//                 />
//               </View>
//               <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
//                 {tab.name}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// export default InvoiceScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7FCF8',
//   },
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
//   headerTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
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
//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: '#4CAF50',
//   },
//   tabText: {
//     color: '#555',
//     fontWeight: '600',
//   },
//   activeTabText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
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
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//   },
//   navItemWrapper: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   navIconBox: {
//     padding: 8,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     backgroundColor: 'transparent',
//   },
//   activeNavIconBox: {
//     backgroundColor: '#E0F5E9',
//   },
//   navLabel: {
//     fontSize: 12,
//     color: '#D9D9D9',
//     marginTop: 4,
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
//working

import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import invoice from '../../../assets/screen-13/invoice-placeholder.png';

const InvoiceScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('All');
    const [selectedTab, setSelectedTab] = useState('Invoice');

    const invoices = [
        {
            id: 'INV00001',
            clientName: 'Divyesh Shah',
            amount: 56050,
            status: 'Unpaid',
            dueDate: '17/05/2025',
            message: 'Due in 15 days',
        },
        {
            id: 'INV00002',
            clientName: 'Shivangi Rathi',
            amount: 8000,
            status: 'Paid',
            dueDate: '17/05/2025',
            message: 'Fully Paid',
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.greenHeader}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Invoice Maker</Text>
                    <Ionicons name="settings-sharp" size={24} color="white" />
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Total Sales</Text>
                    <Text style={styles.statValueGreen}>₹56,050.00</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Total Received</Text>
                    <Text style={styles.statValueRed}>₹0.00</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Total Overdue</Text>
                    <Text style={styles.statValueBlack}>₹0.00</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                {['All', 'Paid', 'Unpaid'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text
                            style={activeTab === tab ? styles.activeTabText : styles.tabText}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Invoice List */}
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
                {invoices.filter(item => activeTab === 'All' || item.status === activeTab).length > 0 ? (
                    invoices
                        .filter(item => activeTab === 'All' || item.status === activeTab)
                        .map((item, index) => (
                            <View key={index} style={styles.card}>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.invoiceId}>{item.id}</Text>
                                    <Text style={styles.clientName}>{item.clientName}</Text>
                                </View>

                                <Text style={styles.date}>{item.dueDate}</Text>
                                <Text style={styles.message}>{item.message}</Text>

                                <View style={styles.rowBetween}>
                                    <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            { backgroundColor: item.status === 'Paid' ? '#E0F5E9' : '#FFEAEA' },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                { color: item.status === 'Paid' ? '#4CAF50' : '#FF3B30' },
                                            ]}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))
                ) : (
                    <View style={styles.content}>
                        <Image source={invoice} style={styles.placeholderIcon} />
                        <Text style={styles.noInvoiceText}>
                            You haven't added any invoices till now.{"\n"}
                            Click on create new invoice to add new invoice
                        </Text>

                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={() => navigation.navigate('CreateInvoice')}
                        >
                            <Ionicons name="add" size={20} color="#fff" />
                            <Text style={styles.createBtnText}>Create New Invoice</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                {[
                    { name: 'Invoice', icon: require('../../../assets/screen-13/1.png') },
                    { name: 'Estimate', icon: require('../../../assets/screen-13/2.png') },
                    { name: 'Client', icon: require('../../../assets/screen-13/3.png') },
                    { name: 'Report', icon: require('../../../assets/screen-13/4.png') },
                    { name: 'Item', icon: require('../../../assets/screen-13/5.png') },
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
                                    <Image source={tab.icon} style={[styles.iconImage, { tintColor: '#4CD04D' }]} />
                                    <Text style={[styles.navLabel, { color: '#4CD04D', fontWeight: '700' }]}>
                                        {tab.name}
                                    </Text>
                                </LinearGradient>
                            ) : (
                                <View style={styles.navIconBox}>
                                    <Image source={tab.icon} style={[styles.iconImage, { tintColor: '#D9D9D9' }]} />
                                    <Text style={styles.navLabel}>{tab.name}</Text>
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        flexGrow: 1,
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
        // paddingVertical: 8,
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
        padding:10,
        width:70,
    },
    navLabel: {
        fontSize: 12,
        color: '#D9D9D9',
        fontWeight: '500',
    },
    navLabelActive: {
        color: '#4CAF50',
        fontWeight: '700',
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
});

export default InvoiceScreen;
