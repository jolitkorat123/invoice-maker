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
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Template2({ route }) {
  const defaultData = {
    company: "James Williams",
    address: "123 Andromeda Street, City",
    phone: "+012 3456789",
    invoiceNumber: "001234",
    date: "12/05/2025",
    items: Array(7).fill({ name: "PRODUCT", price: 10, qty: 1 }),
    taxRate: 10,
    paymentMethod: {
      bank: "Banks Name",
      address: "123 Libra Street, City",
      account: "123456789 123 789546"
    },
    email: "youremail@email.com",
    phoneBottom: "+01 123 456 789",
    website: "www.yourwebsite.com"
  };

  const invoiceData = {
    ...defaultData,
    ...(route?.params?.invoiceData || {}),
    paymentMethod: {
      ...defaultData.paymentMethod,
      ...(route?.params?.invoiceData?.paymentMethod || {})
    }
  };

  const subtotal = invoiceData.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const taxAmount = (subtotal * invoiceData.taxRate) / 100;
  const total = subtotal + taxAmount;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.invoiceText}>INVOICE</Text>
        <View style={styles.logoBox}>
          <Text style={styles.logo}>🏢</Text>
          <Text style={styles.slogan}>COMPANY{"\n"}SLOGAN HERE</Text>
        </View>
      </View>

      {/* Client Info */}
      <View style={styles.infoRow}>
        <View style={styles.leftInfo}>
          <Text style={styles.bold}>{invoiceData.company}</Text>
          <Text>{invoiceData.address}</Text>
          <Text>{invoiceData.phone}</Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.bold}>N° INVOICE</Text>
          <Text>{invoiceData.invoiceNumber}</Text>
          <Text style={[styles.bold, { marginTop: 8 }]}>DATE</Text>
          <Text>{invoiceData.date}</Text>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.colHeader}>PRODUCT</Text>
        <Text style={styles.colHeader}>PRICE</Text>
        <Text style={styles.colHeader}>QTY</Text>
        <Text style={styles.colHeader}>SUBTOTAL</Text>
      </View>

      {/* Items */}
      {invoiceData.items.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tableRow,
            { backgroundColor: index % 2 === 1 ? '#F5F9F8' : '#fff' },
          ]}
        >
          <Text style={styles.colData}>{item.name}</Text>
          <Text style={styles.colData}>${item.price}</Text>
          <Text style={styles.colData}>
            {item.qty.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.colData}>${item.price * item.qty}</Text>
        </View>
      ))}

      {/* Summary */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>SUBTOTAL</Text>
          <Text style={styles.summaryText}>${subtotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>TAXES</Text>
          <Text style={styles.summaryText}>{invoiceData.taxRate}%</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>TOTAL</Text>
          <Text style={styles.totalText}>${total}</Text>
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.paymentBox}>
        <Text style={styles.bold}>PAYMENT METHOD</Text>
        <Text>{invoiceData.paymentMethod.bank}</Text>
        <Text>{invoiceData.paymentMethod.address}</Text>
        <Text>{invoiceData.paymentMethod.account}</Text>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.termsBox}>
        <Text style={styles.bold}>TERM & CONDITIONS</Text>
        <Text style={styles.termsText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
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
  container: { backgroundColor: '#fff', padding: 20, flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#20305B',
    padding: 15,
    alignItems: 'center',
  },
  invoiceText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  logoBox: { alignItems: 'center' },
  logo: { fontSize: 24 },
  slogan: { color: '#fff', textAlign: 'center', fontSize: 12 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  leftInfo: { flex: 1 },
  rightInfo: { flex: 1, alignItems: 'flex-end' },
  bold: { fontWeight: 'bold', marginBottom: 4 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4C9F87',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  colHeader: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  colData: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  summaryBox: {
    borderTopWidth: 1,
    borderColor: '#00000033',
    marginTop: 15,
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  summaryText: { fontSize: 13 },
  totalRow: {
    backgroundColor: '#E8F5E9',
    padding: 5,
    marginTop: 5,
  },
  totalText: { fontWeight: 'bold', fontSize: 15 },
  paymentBox: { marginTop: 20 },
  termsBox: { marginTop: 15 },
  termsText: { fontSize: 12, color: '#555' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#00000022',
  },
  footerText: { fontSize: 12, color: '#1A1A1A' },
});
