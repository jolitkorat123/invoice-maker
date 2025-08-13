// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Template2({ route }) {
//   const { invoiceData } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🧾 Invoice Template 2</Text>
//       <Text>{invoiceData.company}</Text>
//       <Text>Date Issued: {invoiceData.date}</Text>
//       {invoiceData.items.map((item, idx) => (
//         <View key={idx} style={styles.itemRow}>
//           <Text>{item.name}</Text>
//           <Text>₹{item.price * item.qty}</Text>
//         </View>
//       ))}
//       <Text style={styles.total}>Total: ₹{invoiceData.total}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
//   itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
//   total: { marginTop: 15, fontWeight: 'bold' },
// });
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Template2({ route }) {
//   const defaultData = {
//     company: "James Williams",
//     address: "123 Andromeda Street, City",
//     phone: "+012 3456789",
//     invoiceNumber: "001234",
//     date: "12/05/2025",
//     items: Array(7).fill({ name: "PRODUCT", price: 10, qty: 1 }),
//     taxRate: 10,
//     paymentMethod: {
//       bank: "Banks Name",
//       address: "123 Libra Street, City",
//       account: "123456789 123 789546"
//     },
//     email: "youremail@email.com",
//     phoneBottom: "+01 123 456 789",
//     website: "www.yourwebsite.com"
//   };

//   const invoiceData = {
//     ...defaultData,
//     ...(route?.params?.invoiceData || {}),
//     paymentMethod: {
//       ...defaultData.paymentMethod,
//       ...(route?.params?.invoiceData?.paymentMethod || {})
//     }
//   };

//   const subtotal = invoiceData.items.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );
//   const taxAmount = (subtotal * invoiceData.taxRate) / 100;
//   const total = subtotal + taxAmount;

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.invoiceText}>INVOICE</Text>
//         <View style={styles.logoBox}>
//           <Text style={styles.logo}>🏢</Text>
//           <Text style={styles.slogan}>COMPANY{"\n"}SLOGAN HERE</Text>
//         </View>
//       </View>

//       {/* Client Info */}
//       <View style={styles.infoRow}>
//         <View style={styles.leftInfo}>
//           <Text style={styles.bold}>{invoiceData.company}</Text>
//           <Text>{invoiceData.address}</Text>
//           <Text>{invoiceData.phone}</Text>
//         </View>
//         <View style={styles.rightInfo}>
//           <Text style={styles.bold}>N° INVOICE</Text>
//           <Text>{invoiceData.invoiceNumber}</Text>
//           <Text style={[styles.bold, { marginTop: 8 }]}>DATE</Text>
//           <Text>{invoiceData.date}</Text>
//         </View>
//       </View>

//       {/* Table Header */}
//       <View style={styles.tableHeader}>
//         <Text style={styles.colHeader}>PRODUCT</Text>
//         <Text style={styles.colHeader}>PRICE</Text>
//         <Text style={styles.colHeader}>QTY</Text>
//         <Text style={styles.colHeader}>SUBTOTAL</Text>
//       </View>

//       {/* Items */}
//       {invoiceData.items.map((item, index) => (
//         <View
//           key={index}
//           style={[
//             styles.tableRow,
//             { backgroundColor: index % 2 === 1 ? '#F5F9F8' : '#fff' },
//           ]}
//         >
//           <Text style={styles.colData}>{item.name}</Text>
//           <Text style={styles.colData}>${item.price}</Text>
//           <Text style={styles.colData}>
//             {item.qty.toString().padStart(2, '0')}
//           </Text>
//           <Text style={styles.colData}>${item.price * item.qty}</Text>
//         </View>
//       ))}

//       {/* Summary */}
//       <View style={styles.summaryBox}>
//         <View style={styles.summaryRow}>
//           <Text style={styles.summaryText}>SUBTOTAL</Text>
//           <Text style={styles.summaryText}>${subtotal}</Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text style={styles.summaryText}>TAXES</Text>
//           <Text style={styles.summaryText}>{invoiceData.taxRate}%</Text>
//         </View>
//         <View style={[styles.summaryRow, styles.totalRow]}>
//           <Text style={styles.totalText}>TOTAL</Text>
//           <Text style={styles.totalText}>${total}</Text>
//         </View>
//       </View>

//       {/* Payment Method */}
//       <View style={styles.paymentBox}>
//         <Text style={styles.bold}>PAYMENT METHOD</Text>
//         <Text>{invoiceData.paymentMethod.bank}</Text>
//         <Text>{invoiceData.paymentMethod.address}</Text>
//         <Text>{invoiceData.paymentMethod.account}</Text>
//       </View>

//       {/* Terms & Conditions */}
//       <View style={styles.termsBox}>
//         <Text style={styles.bold}>TERM & CONDITIONS</Text>
//         <Text style={styles.termsText}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
//           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
//         </Text>
//       </View>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>{invoiceData.email}</Text>
//         <Text style={styles.footerText}>{invoiceData.phoneBottom}</Text>
//         <Text style={styles.footerText}>{invoiceData.website}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { backgroundColor: '#fff', padding: 20, flex: 1 },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#20305B',
//     padding: 15,
//     alignItems: 'center',
//   },
//   invoiceText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
//   logoBox: { alignItems: 'center' },
//   logo: { fontSize: 24 },
//   slogan: { color: '#fff', textAlign: 'center', fontSize: 12 },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//   },
//   leftInfo: { flex: 1 },
//   rightInfo: { flex: 1, alignItems: 'flex-end' },
//   bold: { fontWeight: 'bold', marginBottom: 4 },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#4C9F87',
//     paddingVertical: 8,
//     paddingHorizontal: 5,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     paddingVertical: 8,
//     paddingHorizontal: 5,
//   },
//   colHeader: {
//     flex: 1,
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   colData: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 12,
//   },
//   summaryBox: {
//     borderTopWidth: 1,
//     borderColor: '#00000033',
//     marginTop: 15,
//     paddingTop: 10,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 2,
//   },
//   summaryText: { fontSize: 13 },
//   totalRow: {
//     backgroundColor: '#E8F5E9',
//     padding: 5,
//     marginTop: 5,
//   },
//   totalText: { fontWeight: 'bold', fontSize: 15 },
//   paymentBox: { marginTop: 20 },
//   termsBox: { marginTop: 15 },
//   termsText: { fontSize: 12, color: '#555' },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 25,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderColor: '#00000022',
//   },
//   footerText: { fontSize: 12, color: '#1A1A1A' },
// });
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Template2({ route }) {
  const [companyData, setCompanyData] = useState(null);
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true
        });
        setDb(database);
        
        // Fetch the most recent company data
        const result = await database.getFirstAsync('SELECT * FROM company ORDER BY id DESC LIMIT 1');
        if (result) {
          setCompanyData(result);
        }
      } catch (err) {
        console.error("Database Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    initDb();
  }, []);

  // Default data structure with company profile fallbacks
  const defaultData = {
    company: companyData?.companyName || "Your Company Name",
    address: companyData?.address || "123 Business Street, City",
    phone: companyData?.phone || "+1 234 567 8900",
    email: companyData?.email || "contact@yourcompany.com",
    invoiceNumber: "INV-001",
    date: new Date().toLocaleDateString(),
    items: [
      { name: "Product 1", price: 10, qty: 1 },
      { name: "Product 2", price: 20, qty: 2 },
      { name: "Product 3", price: 15, qty: 1 }
    ],
    taxRate: 10,
    paymentMethod: {
      bank: "Your Bank Name",
      account: "1234567890",
      routing: "012345678"
    },
    phoneBottom: companyData?.phone || "+1 234 567 8900",
    website: "www.yourcompany.com",
    taxNo: companyData?.taxNo || "TAX-123456789"
  };

  // Merge with any incoming data from route.params
  const invoiceData = {
    ...defaultData,
    ...(route?.params?.invoiceData || {}),
    paymentMethod: {
      ...defaultData.paymentMethod,
      ...(route?.params?.invoiceData?.paymentMethod || {})
    }
  };

  // Calculate invoice totals
  const subtotal = invoiceData.items.reduce(
    (acc, item) => acc + (item.price * item.qty),
    0
  );
  const taxAmount = (subtotal * invoiceData.taxRate) / 100;
  const total = subtotal + taxAmount;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading invoice data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.invoiceText}>INVOICE</Text>
        <View style={styles.logoBox}>
          {companyData?.logo ? (
            <Image source={{ uri: companyData.logo }} style={styles.logoImage} />
          ) : (
            <Text style={styles.logo}>🏢</Text>
          )}
          <Text style={styles.slogan}>{companyData?.companyName || "Your Company"}</Text>
        </View>
      </View>

      {/* Company and Invoice Info */}
      <View style={styles.infoRow}>
        <View style={styles.leftInfo}>
          <Text style={styles.bold}>{invoiceData.company}</Text>
          <Text>{invoiceData.address}</Text>
          <Text>Phone: {invoiceData.phone}</Text>
          <Text>Email: {invoiceData.email}</Text>
          <Text>Tax ID: {invoiceData.taxNo}</Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.bold}>INVOICE #</Text>
          <Text>{invoiceData.invoiceNumber}</Text>
          <Text style={[styles.bold, { marginTop: 8 }]}>DATE</Text>
          <Text>{invoiceData.date}</Text>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.tableHeader}>
        <Text style={[styles.colHeader, { flex: 2 }]}>DESCRIPTION</Text>
        <Text style={styles.colHeader}>PRICE</Text>
        <Text style={styles.colHeader}>QTY</Text>
        <Text style={styles.colHeader}>TOTAL</Text>
      </View>

      {invoiceData.items.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tableRow,
            { backgroundColor: index % 2 === 1 ? '#F5F9F8' : '#fff' },
          ]}
        >
          <Text style={[styles.colData, { flex: 2 }]}>{item.name}</Text>
          <Text style={styles.colData}>${item.price.toFixed(2)}</Text>
          <Text style={styles.colData}>{item.qty}</Text>
          <Text style={styles.colData}>${(item.price * item.qty).toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals Section */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>SUBTOTAL</Text>
          <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>TAX ({invoiceData.taxRate}%)</Text>
          <Text style={styles.summaryText}>${taxAmount.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>TOTAL</Text>
          <Text style={styles.totalText}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Payment Information */}
      <View style={styles.paymentBox}>
        <Text style={styles.bold}>PAYMENT INFORMATION</Text>
        <Text>Bank: {invoiceData.paymentMethod.bank}</Text>
        <Text>Account: {invoiceData.paymentMethod.account}</Text>
        <Text>Routing: {invoiceData.paymentMethod.routing}</Text>
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsBox}>
        <Text style={styles.bold}>TERMS & CONDITIONS</Text>
        <Text style={styles.termsText}>
          Payment is due within 15 days. Please make checks payable to {invoiceData.company}.
          A 1.5% late fee will be applied to overdue balances.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{invoiceData.email}</Text>
        <Text style={styles.footerText}>{invoiceData.phoneBottom}</Text>
        <Text style={styles.footerText}>{invoiceData.website}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#20305B',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20
  },
  invoiceText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  },
  logoBox: {
    alignItems: 'center'
  },
  logo: {
    fontSize: 24,
    marginBottom: 5
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 5
  },
  slogan: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  leftInfo: {
    flex: 1
  },
  rightInfo: {
    flex: 1,
    alignItems: 'flex-end'
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4C9F87',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  colHeader: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  colData: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  },
  summaryBox: {
    marginTop: 20,
    marginBottom: 20
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  summaryText: {
    fontSize: 14
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
    marginTop: 10
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  paymentBox: {
    marginTop: 20,
    marginBottom: 20
  },
  termsBox: {
    marginTop: 20,
    marginBottom: 20
  },
  termsText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  footerText: {
    fontSize: 12,
    color: '#555'
  }
});