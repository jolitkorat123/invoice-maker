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
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function InvoiceTemplate() {
  const invoice = {
    logo: require('../../../assets/icon.png'), // replace with your logo
    invoiceNo: '2022001',
    reference: '2022001',
    issueDate: '31/01/2022',
    dueDate: '14/02/2022',
    from: {
      name: 'Lawn maintenance',
      address: '25 Kendell Street\nSheffield\nS1 2GS\nUnited Kingdom',
      vat: 'GB112233445'
    },
    to: {
      name: 'Your client',
      address: '20 Moffat Rd\nSheffield\nS2 3GP\nUnited Kingdom',
    },
    totalDue: 147.00,
    items: [
      { description: 'Sample service', quantity: 1, unitPrice: 150.00 }
    ],
    discount: 10,
    taxRate: 0.05,
    contact: {
      email: 'email@yourbusinessname.co.uk',
      phone: '079 6147 4931',
      website: 'www.yourbusinessname.co.uk'
    }
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) - invoice.discount;
  const vat = subtotal * invoice.taxRate;
  const total = subtotal + vat;

  const formatCurrency = (amount) => `£${amount.toFixed(2)}`;

  return (
    <ScrollView style={styles.container}>
      {/* Green Header */}
      <View style={styles.header}>
        <Image source={invoice.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerText}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
          <Text style={styles.contactText}>{invoice.contact.phone}</Text>
          <Text style={styles.contactText}>{invoice.contact.email}</Text>
          <Text style={styles.contactText}>{invoice.contact.website}</Text>
        </View>
      </View>

      {/* Invoice Info Bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>INVOICE NO.</Text>
          <Text>{invoice.invoiceNo}</Text>
          <Text>{invoice.reference}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>ISSUE DATE</Text>
          <Text>{invoice.issueDate}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>DUE DATE</Text>
          <Text style={styles.totalDue}>{invoice.dueDate}</Text>
        </View>
      </View>

      {/* From & To */}
      <View style={styles.addressSection}>
        <View style={styles.addressBlock}>
          <Text style={styles.bold}>FROM</Text>
          <Text style={styles.text}>{invoice.from.name}</Text>
          <Text style={styles.text}>{invoice.from.address}</Text>
          <Text style={styles.text}>VAT Reg. No.: {invoice.from.vat}</Text>
        </View>
        <View style={styles.addressBlock}>
          <Text style={styles.bold}>TO</Text>
          <Text style={styles.text}>{invoice.to.name}</Text>
          <Text style={styles.text}>{invoice.to.address}</Text>
        </View>
        <View style={styles.totalBlock}>
          <Text style={styles.totalLabel}>Total due</Text>
          <Text style={styles.totalAmount}>{formatCurrency(invoice.totalDue)}</Text>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, { flex: 4 }]}>DESCRIPTION</Text>
        <Text style={[styles.cell, { flex: 2 }]}>QUANTITY</Text>
        <Text style={[styles.cell, { flex: 2 }]}>UNIT PRICE (£)</Text>
        <Text style={[styles.cell, { flex: 2 }]}>AMOUNT (£)</Text>
      </View>

      {/* Item Row */}
      {invoice.items.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.cell, { flex: 4 }]}>{item.description}</Text>
          <Text style={[styles.cell, { flex: 2 }]}>{item.quantity}</Text>
          <Text style={[styles.cell, { flex: 2 }]}>{formatCurrency(item.unitPrice)}</Text>
          <Text style={[styles.cell, { flex: 2 }]}>{formatCurrency(item.quantity * item.unitPrice)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Discount: {formatCurrency(invoice.discount)}</Text>
        <Text style={styles.summaryText}>Subtotal: {formatCurrency(subtotal)}</Text>
        <Text style={styles.summaryText}>VAT 5% from {formatCurrency(subtotal)}: {formatCurrency(vat)}</Text>
        <Text style={styles.totalSummary}>Total (GBP): {formatCurrency(total)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2D703B',
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  contactText: {
    color: '#fff',
    fontSize: 12,
  },
  infoBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 10,
    justifyContent: 'space-between',
  },
  infoBlock: {
    flex: 1,
    paddingHorizontal: 5,
  },
  infoLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
  },
  totalDue: {
    color: '#fff',
  },
  addressSection: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  addressBlock: {
    flex: 1.5,
  },
  totalBlock: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
  },
  totalLabel: {
    fontSize: 12,
    color: '#000',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D703B',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  cell: {
    fontSize: 12,
    paddingHorizontal: 3,
  },
  summary: {
    alignItems: 'flex-end',
    marginTop: 10,
    paddingRight: 10,
  },
  summaryText: {
    fontSize: 12,
    marginBottom: 4,
  },
  totalSummary: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
