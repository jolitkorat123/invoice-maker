// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Template1({ route }) {
//   const { invoiceData } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Invoice Template 1</Text>
//       <Text>Company: {invoiceData.company}</Text>
//       <Text>Date: {invoiceData.date}</Text>
//       <Text>--------------------</Text>
//       {invoiceData.items.map((item, index) => (
//         <Text key={index}>
//           {item.name}: ₹{item.price} x {item.qty}
//         </Text>
//       ))}
//       <Text style={styles.total}>Total: ₹{invoiceData.total}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   total: { marginTop: 10, fontWeight: 'bold', fontSize: 16 },
// });
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Template1({ route }) {
//   const { invoiceData } = route.params;
  
//   // Calculate total and ensure all values are numbers
//   const total = invoiceData.items.reduce(
//     (sum, item) => sum + (Number(item.price) * Number(item.qty)),
//     0
//   );

//   // Format currency with 2 decimal places
//   const formatCurrency = (amount) => {
//     return '₹' + parseFloat(amount).toFixed(2);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>INVOICE</Text>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Company:</Text>
//         <Text>{invoiceData.company}</Text>
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Date:</Text>
//         <Text>{invoiceData.date}</Text>
//       </View>
      
//       <View style={styles.divider} />
      
//       <View style={styles.itemsHeader}>
//         <Text style={[styles.itemCell, styles.bold, { flex: 2 }]}>Item</Text>
//         <Text style={[styles.itemCell, styles.bold]}>Price</Text>
//         <Text style={[styles.itemCell, styles.bold]}>Qty</Text>
//         <Text style={[styles.itemCell, styles.bold]}>Total</Text>
//       </View>
      
//       {invoiceData.items.map((item, index) => (
//         <View key={index} style={styles.itemRow}>
//           <Text style={[styles.itemCell, { flex: 2 }]}>{item.name}</Text>
//           <Text style={styles.itemCell}>{formatCurrency(item.price)}</Text>
//           <Text style={styles.itemCell}>{item.qty}</Text>
//           <Text style={styles.itemCell}>
//             {formatCurrency(item.price * item.qty)}
//           </Text>
//         </View>
//       ))}
      
//       <View style={styles.divider} />
      
//       <View style={styles.totalRow}>
//         <Text style={styles.totalLabel}>TOTAL:</Text>
//         <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333',
//   },
//   section: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: 'bold',
//     width: 80,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ddd',
//     marginVertical: 15,
//   },
//   itemsHeader: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     paddingBottom: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   itemRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   itemCell: {
//     flex: 1,
//     textAlign: 'right',
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   totalLabel: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   totalAmount: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Template1({ route }) {
//   // Set default values that match the image exactly
//   const invoiceData = route.params?.invoiceData || {
//     company: "James Williams",
//     invoiceNumber: "00234",
//     date: "12/05/2025",
//     address: "123 Andromeda Street, City",
//     phone: "+0123456789",
//     items: Array(7).fill({
//       name: "PRODUCT",
//       price: 10,
//       qty: 1
//     }),
//     paymentMethod: {
//       bankName: "Banks Harbor",
//       bankAddress: "123 Loan Street, City",
//       accountNumber: "123456789 123 789546"
//     },
//     terms: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl.",
//     contact: {
//       email: "youremail@email.com",
//       phone: "+0123 456 789",
//       website: "www.yourwebsite.com"
//     },
//     taxRate: 0.10
//   };
  
//   // Calculate subtotal, tax, and total
//   const subtotal = invoiceData.items.reduce(
//     (sum, item) => sum + (Number(item.price) * Number(item.qty)),
//     0
//   );
//   const tax = subtotal * (invoiceData.taxRate || 0.10);
//   const total = subtotal + tax;

//   // Format currency with 2 decimal places
//   const formatCurrency = (amount) => {
//     return '$' + parseFloat(amount).toFixed(2);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>INVOICE</Text>
      
//       <View style={styles.companySection}>
//         <Text style={styles.companyName}>{invoiceData.company}</Text>
//         <Text style={styles.companyAddress}>{invoiceData.address}</Text>
//         <Text style={styles.companyContact}>{invoiceData.invoiceNumber}</Text>
//         <Text style={styles.companyContact}>{invoiceData.phone}</Text>
//       </View>
      
//       <View style={styles.invoiceInfo}>
//         <Text style={styles.invoiceNumber}>INVOICE #: {invoiceData.invoiceNumber || 'NINVOICE'}</Text>
//         <Text style={styles.invoiceDate}>DATE: {invoiceData.date}</Text>
//       </View>
      
//       <View style={styles.divider} />
      
//       <View style={styles.itemsHeader}>
//         <Text style={[styles.itemCell, styles.bold, { flex: 3 }]}>PRODUCT</Text>
//         <Text style={[styles.itemCell, styles.bold]}>PRICE</Text>
//         <Text style={[styles.itemCell, styles.bold]}>QTY</Text>
//         <Text style={[styles.itemCell, styles.bold]}>SUBTOTAL</Text>
//       </View>
      
//       {invoiceData.items.map((item, index) => (
//         <View key={index} style={styles.itemRow}>
//           <Text style={[styles.itemCell, { flex: 3 }]}>{item.name || 'PRODUCT'}</Text>
//           <Text style={styles.itemCell}>{formatCurrency(item.price)}</Text>
//           <Text style={styles.itemCell}>{item.qty.toString().padStart(2, '0')}</Text>
//           <Text style={styles.itemCell}>
//             {formatCurrency(item.price * item.qty)}
//           </Text>
//         </View>
//       ))}
      
//       <View style={styles.summarySection}>
//         <Text style={styles.summaryText}>SUBTOTAL: {formatCurrency(subtotal)}</Text>
//         <Text style={styles.summaryText}>PAYMENT METHOD: {invoiceData.paymentMethod?.bankName}</Text>
//         <Text style={styles.summaryText}>TAXES (10%): {formatCurrency(tax)}</Text>
//         <Text style={[styles.summaryText, styles.bold]}>TOTAL: {formatCurrency(total)}</Text>
//       </View>
      
//       <View style={styles.paymentDetails}>
//         <Text>{invoiceData.paymentMethod?.bankAddress}</Text>
//         <Text>{invoiceData.paymentMethod?.accountNumber}</Text>
//       </View>
      
//       <View style={styles.termsSection}>
//         <Text style={styles.sectionTitle}>TERM & CONDITIONS</Text>
//         <Text style={styles.termsText}>{invoiceData.terms}</Text>
//       </View>
      
//       <View style={styles.footer}>
//         <Text>{invoiceData.contact?.email}</Text>
//         <Text>{invoiceData.contact?.phone}</Text>
//         <Text>{invoiceData.contact?.website}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333',
//   },
//   companySection: {
//     marginBottom: 15,
//   },
//   companyName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   companyAddress: {
//     marginBottom: 3,
//   },
//   companyContact: {
//     marginBottom: 3,
//   },
//   invoiceInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   invoiceNumber: {
//     fontWeight: 'bold',
//   },
//   invoiceDate: {
//     fontWeight: 'bold',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ddd',
//     marginVertical: 15,
//   },
//   itemsHeader: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     paddingBottom: 5,
//   },
//   itemRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   itemCell: {
//     flex: 1,
//     textAlign: 'right',
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   summarySection: {
//     marginTop: 15,
//     alignSelf: 'flex-end',
//     width: '50%',
//   },
//   summaryText: {
//     textAlign: 'right',
//     marginBottom: 5,
//   },
//   paymentDetails: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   termsSection: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   termsText: {
//     fontSize: 12,
//     lineHeight: 16,
//   },
//   footer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });
// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// export default function InvoiceTemplate() {
//   const invoice = {
//     logo: require('../../../assets/icon.png'), // replace with your logo
//     invoiceNo: '2022001',
//     reference: '2022001',
//     issueDate: '31/01/2022',
//     dueDate: '14/02/2022',
//     from: {
//       name: 'Lawn maintenance',
//       address: '25 Kendell Street\nSheffield\nS1 2GS\nUnited Kingdom',
//       vat: 'GB112233445'
//     },
//     to: {
//       name: 'Your client',
//       address: '20 Moffat Rd\nSheffield\nS2 3GP\nUnited Kingdom',
//     },
//     totalDue: 147.00,
//     items: [
//       { description: 'Sample service', quantity: 1, unitPrice: 150.00 }
//     ],
//     discount: 10,
//     taxRate: 0.05,
//     contact: {
//       email: 'email@yourbusinessname.co.uk',
//       phone: '079 6147 4931',
//       website: 'www.yourbusinessname.co.uk'
//     }
//   };

//   const subtotal = invoice.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) - invoice.discount;
//   const vat = subtotal * invoice.taxRate;
//   const total = subtotal + vat;

//   const formatCurrency = (amount) => `£${amount.toFixed(2)}`;

//   return (
//     <ScrollView style={styles.container}>
//       {/* Green Header */}
//       <View style={styles.header}>
//         <Image source={invoice.logo} style={styles.logo} resizeMode="contain" />
//         <View style={styles.headerText}>
//           <Text style={styles.invoiceTitle}>Invoice</Text>
//           <Text style={styles.contactText}>{invoice.contact.phone}</Text>
//           <Text style={styles.contactText}>{invoice.contact.email}</Text>
//           <Text style={styles.contactText}>{invoice.contact.website}</Text>
//         </View>
//       </View>

//       {/* Invoice Info Bar */}
//       <View style={styles.infoBar}>
//         <View style={styles.infoBlock}>
//           <Text style={styles.infoLabel}>INVOICE NO.</Text>
//           <Text>{invoice.invoiceNo}</Text>
//           <Text>{invoice.reference}</Text>
//         </View>
//         <View style={styles.infoBlock}>
//           <Text style={styles.infoLabel}>ISSUE DATE</Text>
//           <Text>{invoice.issueDate}</Text>
//         </View>
//         <View style={styles.infoBlock}>
//           <Text style={styles.infoLabel}>DUE DATE</Text>
//           <Text style={styles.totalDue}>{invoice.dueDate}</Text>
//         </View>
//       </View>

//       {/* From & To */}
//       <View style={styles.addressSection}>
//         <View style={styles.addressBlock}>
//           <Text style={styles.bold}>FROM</Text>
//           <Text style={styles.text}>{invoice.from.name}</Text>
//           <Text style={styles.text}>{invoice.from.address}</Text>
//           <Text style={styles.text}>VAT Reg. No.: {invoice.from.vat}</Text>
//         </View>
//         <View style={styles.addressBlock}>
//           <Text style={styles.bold}>TO</Text>
//           <Text style={styles.text}>{invoice.to.name}</Text>
//           <Text style={styles.text}>{invoice.to.address}</Text>
//         </View>
//         <View style={styles.totalBlock}>
//           <Text style={styles.totalLabel}>Total due</Text>
//           <Text style={styles.totalAmount}>{formatCurrency(invoice.totalDue)}</Text>
//         </View>
//       </View>

//       {/* Table Header */}
//       <View style={styles.tableHeader}>
//         <Text style={[styles.cell, { flex: 4 }]}>DESCRIPTION</Text>
//         <Text style={[styles.cell, { flex: 2 }]}>QUANTITY</Text>
//         <Text style={[styles.cell, { flex: 2 }]}>UNIT PRICE (£)</Text>
//         <Text style={[styles.cell, { flex: 2 }]}>AMOUNT (£)</Text>
//       </View>

//       {/* Item Row */}
//       {invoice.items.map((item, index) => (
//         <View key={index} style={styles.tableRow}>
//           <Text style={[styles.cell, { flex: 4 }]}>{item.description}</Text>
//           <Text style={[styles.cell, { flex: 2 }]}>{item.quantity}</Text>
//           <Text style={[styles.cell, { flex: 2 }]}>{formatCurrency(item.unitPrice)}</Text>
//           <Text style={[styles.cell, { flex: 2 }]}>{formatCurrency(item.quantity * item.unitPrice)}</Text>
//         </View>
//       ))}

//       {/* Totals */}
//       <View style={styles.summary}>
//         <Text style={styles.summaryText}>Discount: {formatCurrency(invoice.discount)}</Text>
//         <Text style={styles.summaryText}>Subtotal: {formatCurrency(subtotal)}</Text>
//         <Text style={styles.summaryText}>VAT 5% from {formatCurrency(subtotal)}: {formatCurrency(vat)}</Text>
//         <Text style={styles.totalSummary}>Total (GBP): {formatCurrency(total)}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     backgroundColor: '#2D703B',
//     padding: 10,
//     alignItems: 'center',
//   },
//   logo: {
//     width: 90,
//     height: 90,
//     marginRight: 10,
//   },
//   headerText: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   invoiceTitle: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   contactText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   infoBar: {
//     flexDirection: 'row',
//     backgroundColor: '#1E293B',
//     padding: 10,
//     justifyContent: 'space-between',
//   },
//   infoBlock: {
//     flex: 1,
//     paddingHorizontal: 5,
//   },
//   infoLabel: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   totalDue: {
//     color: '#fff',
//   },
//   addressSection: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   addressBlock: {
//     flex: 1.5,
//   },
//   totalBlock: {
//     flex: 1,
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//   },
//   bold: {
//     fontWeight: 'bold',
//     marginBottom: 3,
//   },
//   text: {
//     fontSize: 12,
//   },
//   totalLabel: {
//     fontSize: 12,
//     color: '#000',
//   },
//   totalAmount: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2D703B',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 6,
//     paddingHorizontal: 4,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     paddingVertical: 6,
//     paddingHorizontal: 4,
//   },
//   cell: {
//     fontSize: 12,
//     paddingHorizontal: 3,
//   },
//   summary: {
//     alignItems: 'flex-end',
//     marginTop: 10,
//     paddingRight: 10,
//   },
//   summaryText: {
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   totalSummary: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 6,
//   },
// });



// import React from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   ScrollView, 
//   Image, 
//   TouchableOpacity,
//   Linking,
//   Alert
// } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

// export default function Template1Screen() {
//   const route = useRoute();
//   const { invoiceData } = route.params;

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2
//     }).format(amount);
//   };

//   // Handle print functionality
//   const handlePrint = async () => {
//     try {
//       const htmlContent = generateHTMLContent();
//       const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri);
//       } else {
//         Alert.alert('Sharing not available', 'Unable to share the invoice on this device.');
//       }
//     } catch (error) {
//       console.error('Error printing:', error);
//       Alert.alert('Error', 'Failed to generate invoice PDF');
//     }
//   };

//   // Generate HTML content for printing
//   const generateHTMLContent = () => {
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Invoice #${invoiceData.invoiceId}</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 40px; }
//           .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
//           .invoice-title { font-size: 24px; font-weight: bold; color: #333; }
//           .invoice-number { font-size: 18px; color: #666; }
//           .info-section { display: flex; justify-content: space-between; margin-bottom: 30px; }
//           .info-column { width: 45%; }
//           .section-title { font-weight: bold; margin-bottom: 10px; color: #333; }
//           .details-section { margin-bottom: 30px; }
//           .detail-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
//           .detail-label { font-weight: bold; color: #555; }
//           .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
//           .items-table th { background-color: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
//           .items-table td { padding: 10px; border-bottom: 1px solid #eee; }
//           .summary-section { margin-top: 20px; }
//           .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
//           .total-row { border-top: 2px solid #333; padding-top: 10px; font-weight: bold; }
//           .terms-section { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; }
//           .signature-section { margin-top: 60px; text-align: right; }
//           .signature-image { max-width: 200px; max-height: 80px; border: 1px solid #ddd; }
//           .footer { margin-top: 60px; text-align: center; color: #666; font-size: 12px; }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <div class="invoice-title">INVOICE</div>
//           <div class="invoice-number">#${invoiceData.invoiceId}</div>
//         </div>

//         <div class="info-section">
//           <div class="info-column">
//             <div class="section-title">From:</div>
//             <div style="font-weight: bold;">${invoiceData.companyData.companyName}</div>
//             <div>${invoiceData.companyData.address || ''}</div>
//             <div>${invoiceData.companyData.email || ''}</div>
//             <div>${invoiceData.companyData.phone || ''}</div>
//             ${invoiceData.companyData.taxNo ? `<div>Tax No: ${invoiceData.companyData.taxNo}</div>` : ''}
//           </div>

//           <div class="info-column">
//             <div class="section-title">To:</div>
//             <div style="font-weight: bold;">
//               ${invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName || ''}
//             </div>
//             <div>${invoiceData.selectedClient?.address || ''}</div>
//             <div>${invoiceData.selectedClient?.email || ''}</div>
//             <div>${invoiceData.selectedClient?.phone || ''}</div>
//             ${invoiceData.selectedClient?.taxNo ? `<div>Tax No: ${invoiceData.selectedClient.taxNo}</div>` : ''}
//           </div>
//         </div>

//         <div class="details-section">
//           <div class="detail-row">
//             <span class="detail-label">Invoice Date:</span>
//             <span>${new Date(invoiceData.startDate).toLocaleDateString()}</span>
//           </div>
//           <div class="detail-row">
//             <span class="detail-label">Due Date:</span>
//             <span>${new Date(invoiceData.endDate).toLocaleDateString()}</span>
//           </div>
//           ${invoiceData.po ? `
//           <div class="detail-row">
//             <span class="detail-label">PO Number:</span>
//             <span>${invoiceData.po}</span>
//           </div>
//           ` : ''}
//           ${invoiceData.selectedPaymentMethod ? `
//           <div class="detail-row">
//             <span class="detail-label">Payment Method:</span>
//             <span>${invoiceData.selectedPaymentMethod}</span>
//           </div>
//           ` : ''}
//         </div>

//         <table class="items-table">
//           <thead>
//             <tr>
//               <th>Description</th>
//               <th>Qty</th>
//               <th>Price</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${invoiceData.selectedItems && invoiceData.selectedItems.length > 0 
//               ? invoiceData.selectedItems.map(item => `
//                 <tr>
//                   <td>${item.itemName}</td>
//                   <td>${item.quantity || 1}</td>
//                   <td>${formatCurrency(item.itemPrice)}</td>
//                   <td>${formatCurrency((item.quantity || 1) * item.itemPrice)}</td>
//                 </tr>
//               `).join('')
//               : `
//                 <tr>
//                   <td>${invoiceData.title || 'Service'}</td>
//                   <td>${invoiceData.quantity || 1}</td>
//                   <td>${formatCurrency(invoiceData.price || 0)}</td>
//                   <td>${formatCurrency((invoiceData.quantity || 1) * (invoiceData.price || 0))}</td>
//                 </tr>
//               `
//             }
//           </tbody>
//         </table>

//         <div class="summary-section">
//           <div class="summary-row">
//             <span>Subtotal:</span>
//             <span>${formatCurrency(invoiceData.subtotal || 0)}</span>
//           </div>
          
//           ${invoiceData.discountValue ? `
//           <div class="summary-row">
//             <span>Discount ${invoiceData.discountType === 'percent' ? `(${invoiceData.discountValue}%)` : ''}:</span>
//             <span>-${formatCurrency(invoiceData.discountAmount || 0)}</span>
//           </div>
//           ` : ''}
          
//           ${invoiceData.shipping ? `
//           <div class="summary-row">
//             <span>Shipping:</span>
//             <span>${formatCurrency(invoiceData.shippingAmount || 0)}</span>
//           </div>
//           ` : ''}
          
//           <div class="summary-row total-row">
//             <span>TOTAL:</span>
//             <span>${formatCurrency(invoiceData.total || 0)}</span>
//           </div>
//         </div>

//         ${invoiceData.selectedTerms ? `
//         <div class="terms-section">
//           <div class="section-title">Terms & Conditions:</div>
//           <div>${invoiceData.selectedTerms}</div>
//         </div>
//         ` : ''}

        // ${invoiceData.signatureUri ? `
        // <div class="signature-section">
        //   <div class="section-title">Signature:</div>
        //   <img src="${invoiceData.signatureUri}" class="signature-image" />
        // </div>
        // ` : ''}

//         <div class="footer">
//           <div>Thank you for your business!</div>
//           <div>${invoiceData.companyData.companyName}</div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.invoiceTitle}>INVOICE</Text>
//           <Text style={styles.invoiceNumber}>#{invoiceData.invoiceId}</Text>
//         </View>

//         {/* Company and Client Info */}
//         <View style={styles.infoSection}>
//           <View style={styles.infoColumn}>
//             <Text style={styles.sectionTitle}>From:</Text>
//             <Text style={styles.companyName}>{invoiceData.companyData.companyName}</Text>
//             <Text>{invoiceData.companyData.address}</Text>
//             <Text>{invoiceData.companyData.email}</Text>
//             <Text>{invoiceData.companyData.phone}</Text>
//             {invoiceData.companyData.taxNo && (
//               <Text>Tax No: {invoiceData.companyData.taxNo}</Text>
//             )}
//           </View>

//           <View style={styles.infoColumn}>
//             <Text style={styles.sectionTitle}>To:</Text>
//             <Text style={styles.clientName}>
//               {invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName}
//             </Text>
//             <Text>{invoiceData.selectedClient?.address}</Text>
//             <Text>{invoiceData.selectedClient?.email}</Text>
//             <Text>{invoiceData.selectedClient?.phone}</Text>
//             {invoiceData.selectedClient?.taxNo && (
//               <Text>Tax No: {invoiceData.selectedClient.taxNo}</Text>
//             )}
//           </View>
//         </View>

//         {/* Invoice Details */}
//         <View style={styles.detailsSection}>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Invoice Date:</Text>
//             <Text>{new Date(invoiceData.startDate).toLocaleDateString()}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Due Date:</Text>
//             <Text>{new Date(invoiceData.endDate).toLocaleDateString()}</Text>
//           </View>
//           {invoiceData.po && (
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>PO Number:</Text>
//               <Text>{invoiceData.po}</Text>
//             </View>
//           )}
//           {invoiceData.selectedPaymentMethod && (
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Payment Method:</Text>
//               <Text>{invoiceData.selectedPaymentMethod}</Text>
//             </View>
//           )}
//         </View>

//         {/* Items Table */}
//         <View style={styles.itemsTable}>
//           <View style={styles.tableHeader}>
//             <Text style={[styles.tableCell, styles.headerCell, { flex: 3 }]}>Description</Text>
//             <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Qty</Text>
//             <Text style={[styles.tableCell, styles.headerCell, { flex: 1.5 }]}>Price</Text>
//             <Text style={[styles.tableCell, styles.headerCell, { flex: 1.5 }]}>Amount</Text>
//           </View>

//           {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
//             invoiceData.selectedItems.map((item, index) => (
//               <View key={index} style={styles.tableRow}>
//                 <Text style={[styles.tableCell, { flex: 3 }]}>{item.itemName}</Text>
//                 <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity || 1}</Text>
//                 <Text style={[styles.tableCell, { flex: 1.5 }]}>{formatCurrency(item.itemPrice)}</Text>
//                 <Text style={[styles.tableCell, { flex: 1.5 }]}>
//                   {formatCurrency((item.quantity || 1) * item.itemPrice)}
//                 </Text>
//               </View>
//             ))
//           ) : (
//             <View style={styles.tableRow}>
//               <Text style={[styles.tableCell, { flex: 3 }]}>{invoiceData.title || 'Service'}</Text>
//               <Text style={[styles.tableCell, { flex: 1 }]}>{invoiceData.quantity || 1}</Text>
//               <Text style={[styles.tableCell, { flex: 1.5 }]}>{formatCurrency(invoiceData.price || 0)}</Text>
//               <Text style={[styles.tableCell, { flex: 1.5 }]}>
//                 {formatCurrency((invoiceData.quantity || 1) * (invoiceData.price || 0))}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Summary Section */}
//         <View style={styles.summarySection}>
//           <View style={styles.summaryRow}>
//             <Text>Subtotal:</Text>
//             <Text>{formatCurrency(invoiceData.subtotal || 0)}</Text>
//           </View>
          
//           {invoiceData.discountValue && (
//             <View style={styles.summaryRow}>
//               <Text>
//                 Discount {invoiceData.discountType === 'percent' ? `(${invoiceData.discountValue}%)` : ''}:
//               </Text>
//               <Text>-{formatCurrency(invoiceData.discountAmount || 0)}</Text>
//             </View>
//           )}
          
//           {invoiceData.shipping && (
//             <View style={styles.summaryRow}>
//               <Text>Shipping:</Text>
//               <Text>{formatCurrency(invoiceData.shippingAmount || 0)}</Text>
//             </View>
//           )}
          
//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>TOTAL:</Text>
//             <Text style={styles.totalAmount}>{formatCurrency(invoiceData.total || 0)}</Text>
//           </View>
//         </View>

//         {/* Terms & Conditions */}
//         {invoiceData.selectedTerms && (
//           <View style={styles.termsSection}>
//             <Text style={styles.sectionTitle}>Terms & Conditions:</Text>
//             <Text style={styles.termsText}>{invoiceData.selectedTerms}</Text>
//           </View>
//         )}

//         {/* Signature */}
//         {invoiceData.signatureUri && (
//           <View style={styles.signatureSection}>
//             <Text style={styles.sectionTitle}>Signature:</Text>
//             <Image 
//               source={{ uri: invoiceData.signatureUri }} 
//               style={styles.signatureImage}
//               resizeMode="contain"
//             />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Thank you for your business!</Text>
//           <Text style={styles.footerText}>{invoiceData.companyData.companyName}</Text>
//         </View>
//       </ScrollView>

//       {/* Action Button */}
//       <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
//         <Ionicons name="print-outline" size={24} color="white" />
//         <Text style={styles.printButtonText}>Print/Share Invoice</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 80,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 30,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   invoiceTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   invoiceNumber: {
//     fontSize: 18,
//     color: '#666',
//   },
//   infoSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   infoColumn: {
//     width: '45%',
//   },
//   sectionTitle: {
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   companyName: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   clientName: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   detailsSection: {
//     marginBottom: 30,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   itemsTable: {
//     marginBottom: 30,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f5f5f5',
//     padding: 10,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   tableCell: {
//     paddingHorizontal: 5,
//   },
//   headerCell: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   summarySection: {
//     marginTop: 20,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   totalRow: {
//     borderTopWidth: 2,
//     borderTopColor: '#333',
//     paddingTop: 10,
//     marginTop: 10,
//   },
//   totalLabel: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   totalAmount: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   termsSection: {
//     marginTop: 40,
//     paddingTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   termsText: {
//     lineHeight: 20,
//   },
//   signatureSection: {
//     marginTop: 40,
//     alignItems: 'flex-end',
//   },
//   signatureImage: {
//     width: 200,
//     height: 80,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   footer: {
//     marginTop: 60,
//     alignItems: 'center',
//   },
//   footerText: {
//     color: '#666',
//     marginBottom: 5,
//   },
//   printButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#4CD04D',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 8,
//     elevation: 3,
//   },
//   printButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     marginLeft: 10,
//     fontSize: 16,
//   },
// });
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function Template1Screen() {
  const route = useRoute();
  const { invoiceData } = route.params;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Handle print functionality
  const handlePrint = async () => {
    try {
      const htmlContent = generateHTMLContent();
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Sharing not available', 'Unable to share the invoice on this device.');
      }
    } catch (error) {
      console.error('Error printing:', error);
      Alert.alert('Error', 'Failed to generate invoice PDF');
    }
  };

  // Generate HTML content for printing
  const generateHTMLContent = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice #${invoiceData.invoiceId}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
          .invoice-title { font-size: 20px; font-weight: bold; margin: 20px 0; text-align: center; }
          .section-title { font-weight: bold; margin-bottom: 5px; }
          .info-section { margin-bottom: 20px; }
          .invoice-details { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .divider { border-top: 1px solid #000; margin: 15px 0; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .items-table th, .items-table td { padding: 8px; text-align: left; }
          .items-table th { border-bottom: 1px solid #ddd; }
          .summary-table { width: 100%; border-collapse: collapse; }
          .summary-table td { padding: 5px; }
          .summary-total { border-top: 1px solid #000; font-weight: bold; }
          .terms-section { margin-top: 30px; }
          .footer { margin-top: 50px; display: flex; justify-content: space-between; }
          .footer-section { width: 48%; }
          .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
        </style>
      </head>
      <body>
        <div class="company-name">Androtech</div>
        
        <div class="invoice-title">INVOICE</div>
        
        <div class="info-section">
          <div class="section-title">To :</div>
          <div>${invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName || ''}</div>
          <div>${invoiceData.selectedClient?.address || ''}</div>
          <div>${invoiceData.selectedClient?.email || ''}</div>
          <div>${invoiceData.selectedClient?.phone || ''}</div>
          ${invoiceData.selectedClient?.taxNo ? `<div>Tax No: ${invoiceData.selectedClient.taxNo}</div>` : ''}
        </div>
        
        <div class="divider"></div>
        
        <div class="invoice-details">
          <div>#${invoiceData.invoiceId}</div>
          <div>
            <div><strong>Invoice Date:</strong> ${new Date(invoiceData.startDate).toLocaleDateString()}</div>
            <div><strong>Due Date:</strong> ${new Date(invoiceData.endDate).toLocaleDateString()}</div>
            ${invoiceData.selectedPaymentMethod ? `<div><strong>Payment Method:</strong> ${invoiceData.selectedPaymentMethod}</div>` : ''}
          </div>
        </div>
        
        <div class="divider"></div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Tax</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.selectedItems && invoiceData.selectedItems.length > 0 
              ? invoiceData.selectedItems.map(item => `
                <tr>
                  <td>${item.itemName}</td>
                  <td>${item.quantity || 1}</td>
                  <td>${formatCurrency(item.itemPrice)}</td>
                  <td>${item.discount || 0}%</td>
                  <td>${item.tax || 0}%</td>
                  <td>${formatCurrency((item.quantity || 1) * item.itemPrice)}</td>
                </tr>
              `).join('')
              : `
                <tr>
                  <td>${invoiceData.title || 'Service'}</td>
                  <td>${invoiceData.quantity || 1}</td>
                  <td>${formatCurrency(invoiceData.price || 0)}</td>
                  <td>${invoiceData.discountValue || 0}%</td>
                  <td>${invoiceData.taxRate || 0}%</td>
                  <td>${formatCurrency((invoiceData.quantity || 1) * (invoiceData.price || 0))}</td>
                </tr>
              `
            }
          </tbody>
        </table>
        
        <div class="divider"></div>
        
        <table class="summary-table">
          <tr>
            <td width="70%">Sub total</td>
            <td width="30%">${formatCurrency(invoiceData.subtotal || 0)}</td>
          </tr>
          ${invoiceData.discountValue ? `
          <tr>
            <td>Discount (${invoiceData.discountValue}%)</td>
            <td>-${formatCurrency(invoiceData.discountAmount || 0)}</td>
          </tr>
          ` : ''}
          ${invoiceData.shipping ? `
          <tr>
            <td>Shipping</td>
            <td>${formatCurrency(invoiceData.shippingAmount || 0)}</td>
          </tr>
          ` : ''}
          ${invoiceData.taxRate ? `
          <tr>
            <td>Tax</td>
            <td>${formatCurrency(invoiceData.taxAmount || 0)}</td>
          </tr>
          ` : ''}
          <tr class="summary-total">
            <td>Total</td>
            <td>${formatCurrency(invoiceData.total || 0)}</td>
          </tr>
        </table>
        
        ${invoiceData.selectedTerms ? `
        <div class="terms-section">
          <div class="section-title">Terms & Conditions :</div>
          <div>${invoiceData.selectedTerms}</div>
        </div>
        ` : ''}
        
        <div class="signature-line">Approval Signature</div>
        
        <div class="footer">
          <div class="footer-section">
            <div>${invoiceData.companyData.address || ''}</div>
            <div>Tax No: ${invoiceData.companyData.taxNo || ''}</div>
            <div>${invoiceData.companyData.email || ''}</div>
            <div>${invoiceData.companyData.phone || ''}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <ImageBackground 
      source={require('../../../assets/A4 - 1bg.png')} 
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Company Name */}
          <Text style={styles.companyName}>Androtech</Text>
          <Text style={styles.invoiceTitle}>INVOICE</Text>

          {/* Client Info */}
          <View style={styles.clientSection}>
            <Text style={styles.sectionTitle}>To :</Text>
            <Text style={styles.clientName}>
              {invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName}
            </Text>
            <Text>{invoiceData.selectedClient?.address}</Text>
            <Text>{invoiceData.selectedClient?.email}</Text>
            <Text>{invoiceData.selectedClient?.phone}</Text>
            {invoiceData.selectedClient?.taxNo && (
              <Text>Tax No: {invoiceData.selectedClient.taxNo}</Text>
            )}
          </View>

          <View style={styles.divider} />

          {/* Invoice Details */}
          <View style={styles.invoiceDetails}>
            <Text style={styles.invoiceNumber}>#{invoiceData.invoiceId}</Text>
            <View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Invoice Date:</Text>
                <Text>{new Date(invoiceData.startDate).toLocaleDateString()}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Due Date:</Text>
                <Text>{new Date(invoiceData.endDate).toLocaleDateString()}</Text>
              </View>
              {invoiceData.selectedPaymentMethod && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Method:</Text>
                  <Text>{invoiceData.selectedPaymentMethod}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Items Table */}
          <View style={styles.itemsTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>Description</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Qty</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Price</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Discount</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Tax</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Amount</Text>
            </View>

            {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
              invoiceData.selectedItems.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{item.itemName}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity || 1}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{formatCurrency(item.itemPrice)}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.discount || 0}%</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.tax || 0}%</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {formatCurrency((item.quantity || 1) * item.itemPrice)}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{invoiceData.title || 'Service'}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{invoiceData.quantity || 1}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{formatCurrency(invoiceData.price || 0)}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{invoiceData.discountValue || 0}%</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{invoiceData.taxRate || 0}%</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {formatCurrency((invoiceData.quantity || 1) * (invoiceData.price || 0))}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          {/* Summary Section */}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sub total</Text>
              <Text style={styles.summaryValue}>{formatCurrency(invoiceData.subtotal || 0)}</Text>
            </View>
            
            {invoiceData.discountValue && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount ({invoiceData.discountValue}%)</Text>
                <Text style={styles.summaryValue}>-{formatCurrency(invoiceData.discountAmount || 0)}</Text>
              </View>
            )}
            
            {invoiceData.shipping && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>{formatCurrency(invoiceData.shippingAmount || 0)}</Text>
              </View>
            )}
            
            {invoiceData.taxRate && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>{formatCurrency(invoiceData.taxAmount || 0)}</Text>
              </View>
            )}
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{formatCurrency(invoiceData.total || 0)}</Text>
            </View>
          </View>

          {/* Terms & Conditions */}
          {invoiceData.selectedTerms && (
            <View style={styles.termsSection}>
              <Text style={styles.sectionTitle}>Terms & Conditions :</Text>
              <Text style={styles.termsText}>{invoiceData.selectedTerms}</Text>
            </View>
          )}

          {/* Signature Line */}
          <View style={styles.signatureSection}>
            <Text style={styles.signatureLabel}>Approval Signature</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>{invoiceData.companyData.address}</Text>
            <Text>Tax No: {invoiceData.companyData.taxNo}</Text>
            <Text>{invoiceData.companyData.email}</Text>
            <Text>{invoiceData.companyData.phone}</Text>
          </View>
        </ScrollView>

        {/* Action Button */}
        <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
          <Ionicons name="print-outline" size={24} color="white" />
          <Text style={styles.printButtonText}>Print/Share Invoice</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  clientSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clientName: {
    fontWeight: 'bold',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    marginVertical: 15,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  invoiceNumber: {
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemsTable: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tableCell: {
    paddingHorizontal: 2,
  },
  headerCell: {
    fontWeight: 'bold',
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    flex: 1,
  },
  summaryValue: {
    width: 100,
    textAlign: 'right',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
    flex: 1,
  },
  totalAmount: {
    fontWeight: 'bold',
    width: 100,
    textAlign: 'right',
  },
  termsSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  termsText: {
    lineHeight: 20,
  },
  signatureSection: {
    marginTop: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  signatureLabel: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
  },
  printButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CD04D',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  printButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});