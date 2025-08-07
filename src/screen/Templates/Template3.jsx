import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Template3({ route }) {
  const { invoiceData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Template 3 - Summary</Text>
      <Text>Company Name: {invoiceData.company}</Text>
      <Text>Invoice Date: {invoiceData.date}</Text>

      <View style={styles.itemTable}>
        {invoiceData.items.map((item, i) => (
          <Text key={i}>
            🔹 {item.name}: {item.qty} x ₹{item.price} = ₹{item.price * item.qty}
          </Text>
        ))}
      </View>

      <Text style={styles.total}>Grand Total: ₹{invoiceData.total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  itemTable: { marginTop: 10 },
  total: { marginTop: 20, fontWeight: 'bold', fontSize: 16 },
});
