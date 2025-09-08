
// import React from "react";
// import { View, StyleSheet, Dimensions, ScrollView } from "react-native";

// const { width } = Dimensions.get("window");
// // A4 ratio = 1 : 1.414 (width : height)
// const A4_HEIGHT = width * 1.414;

// export default function CustomA4Page() {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.page}>
//         {/* Header */}
//         <View style={styles.header} />

//         {/* Sub-header (black + skyblue) */}
//         <View style={styles.subHeaderRow}>
//           <View style={styles.subHeaderBlack} />
//           <View style={styles.subHeaderBlue} />
//         </View>

//         {/* White content area */}
//         <View style={styles.content} />

//         {/* Footer (blue + skyblue) */}
//         <View style={styles.footer}>
          // <View style={styles.footerBlue} />
          // <View style={styles.footerSky} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//   },
//   page: {
//     width: width - 20,
//     height: A4_HEIGHT,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     overflow: "hidden",
//   },
//   header: {
//     height: 60,
//     backgroundColor: "#4A5BFF", // Blue header
//   },
//   subHeaderRow: {
//     flexDirection: "row",
//     height: 40,
//   },
//   subHeaderBlack: {
//     flex: 1,
//     backgroundColor: "#1C1F26", // Dark strip
//   },
//   subHeaderBlue: {
//     flex: 2,
//     backgroundColor: "#8AE0FF", // Skyblue strip
//   },
//   content: {
//     flex: 1,
//     backgroundColor: "#fff", // White content area
//   },
//   footer: {
//     height: 40,
//   },
//   footerBlue: {
//     flex: 1,
//     backgroundColor: "#4A5BFF", // Blue strip
//   },
//   footerSky: {
//     flex: 1,
//     backgroundColor: "#8AE0FF", // Skyblue strip
//   },
// });




// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// const { width } = Dimensions.get("window");
// const A4_HEIGHT = width * 1.414;

// export default function Template2Screen() {
//   const route = useRoute();
//   const { invoiceData } = route.params;

//   // Currency formatter
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   // Print handler
//   const handlePrint = async () => {
//     try {
//       const htmlContent = "<h1>Invoice PDF Coming Soon</h1>"; // reuse HTML from code 1 if needed
//       const { uri } = await Print.printToFileAsync({ html: htmlContent });
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri);
//       } else {
//         Alert.alert("Sharing not available");
//       }
//     } catch (error) {
//       console.error("Error printing:", error);
//       Alert.alert("Error", "Failed to generate invoice PDF");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Androtech</Text>
//         </View>

//         {/* Sub-header */}
//         <View style={styles.subHeaderRow}>
//           <View style={styles.subHeaderBlack}>
//             <Text style={styles.subHeaderTitle}>INVOICE</Text>
//           </View>
//           <View style={styles.subHeaderBlue}>
//             <Text style={styles.invoiceNo}>#{invoiceData.invoiceId}</Text>
//           </View>
//         </View>

//         {/* Client + Invoice Info */}
//         <View style={styles.infoRow}>
//           {/* Client Info */}
//           <View>
//             <Text style={styles.sectionLabel}>To :</Text>
//             <Text style={styles.boldText}>
//               {invoiceData.selectedClient?.tradeName ||
//                 invoiceData.selectedClient?.clientName}
//             </Text>
//             <Text>{invoiceData.selectedClient?.address}</Text>
//             <Text>{invoiceData.selectedClient?.email}</Text>
//             <Text>{invoiceData.selectedClient?.phone}</Text>
//             {invoiceData.selectedClient?.taxNo && (
//               <Text>Tax No: {invoiceData.selectedClient.taxNo}</Text>
//             )}
//           </View>

//           {/* Invoice Info */}
//           <View>
//             <Text>
//               <Text style={styles.boldText}>Invoice Date: </Text>
//               {new Date(invoiceData.startDate).toLocaleDateString()}
//             </Text>
//             <Text>
//               <Text style={styles.boldText}>Due Date: </Text>
//               {new Date(invoiceData.endDate).toLocaleDateString()}
//             </Text>
//             {invoiceData.selectedPaymentMethod && (
//               <Text>
//                 <Text style={styles.boldText}>Payment Method: </Text>
//                 {invoiceData.selectedPaymentMethod}
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* Table Header */}
//         <View style={styles.tableHeader}>
//           <Text style={[styles.cell, { flex: 2 }]}>Description</Text>
//           <Text style={styles.cell}>Qty</Text>
//           <Text style={styles.cell}>Price</Text>
//           <Text style={styles.cell}>Discount</Text>
//           <Text style={styles.cell}>Tax</Text>
//           <Text style={styles.cell}>Amount</Text>
//         </View>

//         {/* Table Rows */}
//         {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
//           invoiceData.selectedItems.map((item, i) => (
//             <View key={i} style={styles.tableRow}>
//               <Text style={[styles.cell, { flex: 2 }]}>{item.itemName}</Text>
//               <Text style={styles.cell}>{item.quantity || 1}</Text>
//               <Text style={styles.cell}>{formatCurrency(item.itemPrice)}</Text>
//               <Text style={styles.cell}>{item.discount || 0}%</Text>
//               <Text style={styles.cell}>{item.tax || 0}%</Text>
//               <Text style={styles.cell}>
//                 {formatCurrency((item.quantity || 1) * item.itemPrice)}
//               </Text>
//             </View>
//           ))
//         ) : (
//           <View style={styles.tableRow}>
//             <Text style={[styles.cell, { flex: 2 }]}>
//               {invoiceData.title || "Service"}
//             </Text>
//             <Text style={styles.cell}>{invoiceData.quantity || 1}</Text>
//             <Text style={styles.cell}>
//               {formatCurrency(invoiceData.price || 0)}
//             </Text>
//             <Text style={styles.cell}>{invoiceData.discountValue || 0}%</Text>
//             <Text style={styles.cell}>{invoiceData.taxRate || 0}%</Text>
//             <Text style={styles.cell}>
//               {formatCurrency(
//                 (invoiceData.quantity || 1) * (invoiceData.price || 0)
//               )}
//             </Text>
//           </View>
//         )}

//         {/* Summary */}
//         <View style={styles.summary}>
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Sub total</Text>
//             <Text style={styles.summaryValue}>
//               {formatCurrency(invoiceData.subtotal || 0)}
//             </Text>
//           </View>
//           {invoiceData.discountValue && (
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryLabel}>
//                 Discount ({invoiceData.discountValue}%)
//               </Text>
//               <Text style={styles.summaryValue}>
//                 -{formatCurrency(invoiceData.discountAmount || 0)}
//               </Text>
//             </View>
//           )}
//           {invoiceData.shipping && (
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryLabel}>Shipping</Text>
//               <Text style={styles.summaryValue}>
//                 {formatCurrency(invoiceData.shippingAmount || 0)}
//               </Text>
//             </View>
//           )}
//           {invoiceData.taxRate && (
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryLabel}>Tax</Text>
//               <Text style={styles.summaryValue}>
//                 {formatCurrency(invoiceData.taxAmount || 0)}
//               </Text>
//             </View>
//           )}
//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>
//               {formatCurrency(invoiceData.total || 0)}
//             </Text>
//           </View>
//         </View>

//         {/* Terms */}
//         {invoiceData.selectedTerms && (
//           <View style={styles.terms}>
//             <Text style={styles.sectionLabel}>Terms & Conditions :</Text>
//             <Text>{invoiceData.selectedTerms}</Text>
//           </View>
//         )}
//           <View style={styles.footerBlue}>
//             <Text style={styles.companyaddress}>{invoiceData.companyData.address}</Text>
//           </View>

//           <View style={styles.footerSky}>
//             <Text style={styles.taxno}>Tax No: {invoiceData.companyData.taxNo}</Text>
//           <Text style={styles.email}>{invoiceData.companyData.email}</Text>
//           <Text style={styles.phone}>{invoiceData.companyData.phone}</Text>
//           </View>
          
//         {/* Signature */}
//         <View style={styles.signature}>
//           <Text style={styles.signatureText}>Approval Signature</Text>
//         </View>
//       </View>

//       {/* Print Button */}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//   },
//   page: {
//     width: width - 10,
//     height: A4_HEIGHT,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 1,
//     marginTop: -110,
//   },
//   header: {
//     height: 80,
//     backgroundColor: "#4A5BFF",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   headerText: { color: "white", fontSize: 18, fontWeight: "bold" },
//   subHeaderRow: { flexDirection: "row", height: 35 },
//   subHeaderBlack: {
//     flex: 1,
//     backgroundColor: "#1C1F26",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   subHeaderBlue: {
//     flex: 2,
//     backgroundColor: "#8AE0FF",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   subHeaderTitle: { color: "white", fontWeight: "bold" },
//   invoiceNo: { textAlign: "right", fontWeight: "bold" },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 15,
//   },
//   sectionLabel: { fontWeight: "bold", marginBottom: 1, fontSize: 12},
//   boldText: { fontWeight: "bold" },
//   tableHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     paddingVertical: 5,
//     backgroundColor: "#f5f5f5",
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//     paddingVertical: 5,
//   },
//   cell: { flex: 1, fontSize: 12 },
//   summary: { marginTop: 10 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   summaryLabel: { fontSize: 12 },
//   summaryValue: { fontSize: 12 },
//   totalRow: { borderTopWidth: 1, marginTop: 5, paddingTop: 5 },
//   totalLabel: { fontWeight: "bold" },
//   totalValue: { fontWeight: "bold" },
//   terms: { marginTop: 10 },
//   signature: { alignItems: "flex-end", marginTop: -90 },
//   signatureText: { fontWeight: "bold" },
//   footerBlue: {
//      height: 20,
//     backgroundColor: "#4A5BFF",
//     justifyContent: "center",
//     paddingHorizontal: 10, // Blue strip
//   },
//   companyaddress: { color: "white", textAlign: "center",justifyContent:"center",fontSize:10 },
//   footerSky: {
//     height: 25,
//     backgroundColor: "#8AE0FF",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
// },

// taxno: {
//   color: "black",
//   fontSize:7,
//   flex: 1,
//   textAlign: "left",
//   marginLeft: 5,
// },

// email: {
//   color: "black",
//   fontSize: 7,
//   flex: 1,
//   textAlign: "center",
// },

// phone: {
//   color: "black",
//   fontSize: 7,
//   flex: 1,
//   textAlign: "right",
//   marginRight: 5,
// },
//   printText: { color: "white", fontWeight: "bold", marginLeft: 10 },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const { width } = Dimensions.get("window");
const A4_HEIGHT = width * 1.414;

export default function Template2Screen() {
  const route = useRoute();
  const { invoiceData } = route.params;

  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Print handler
  const handlePrint = async () => {
    try {
      const htmlContent = "<h1>Invoice PDF Coming Soon</h1>"; // reuse HTML from code 1 if needed
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Sharing not available");
      }
    } catch (error) {
      console.error("Error printing:", error);
      Alert.alert("Error", "Failed to generate invoice PDF");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{invoiceData.companyData.companyName}</Text>
        </View>

        {/* Sub-header */}
        <View style={styles.subHeaderRow}>
          <View style={styles.subHeaderBlack}>
            <Text style={styles.subHeaderTitle}>INVOICE</Text>
          </View>
          <View style={styles.subHeaderBlue}>
            <Text style={styles.invoiceNo}>#{invoiceData.invoiceId}</Text>
          </View>
        </View>

        {/* Client + Invoice Info */}
        <View style={styles.infoRow}>
          {/* Client Info */}
          <View style={styles.clientInfo}>
            <Text style={styles.sectionLabel}>To:</Text>
            <Text style={styles.boldText}>
              {invoiceData.selectedClient?.tradeName ||
                invoiceData.selectedClient?.clientName}
            </Text>
            <Text style={styles.infoText}>{invoiceData.selectedClient?.address}</Text>
            <Text style={styles.infoText}>{invoiceData.selectedClient?.email}</Text>
            <Text style={styles.infoText}>{invoiceData.selectedClient?.phone}</Text>
            {invoiceData.selectedClient?.taxNo && (
              <Text style={styles.infoText}>Tax No: {invoiceData.selectedClient.taxNo}</Text>
            )}
          </View>

          {/* Invoice Info */}
          <View style={styles.invoiceInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Invoice Date: </Text>
              {new Date(invoiceData.startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Due Date: </Text>
              {new Date(invoiceData.endDate).toLocaleDateString()}
            </Text>
            {invoiceData.selectedPaymentMethod && (
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Payment Method: </Text>
                {invoiceData.selectedPaymentMethod}
              </Text>
            )}
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.descriptionCell]}>Description</Text>
          <Text style={[styles.cell, styles.qtyCell]}>Qty</Text>
          <Text style={[styles.cell, styles.priceCell]}>Price</Text>
          <Text style={[styles.cell, styles.discountCell]}>Discount</Text>
          <Text style={[styles.cell, styles.taxCell]}>Tax</Text>
          <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
        </View>

        {/* Table Rows */}
        {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
          invoiceData.selectedItems.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.cell, styles.descriptionCell]}>{item.itemName}</Text>
              <Text style={[styles.cell, styles.qtyCell]}>{item.quantity || 1}</Text>
              <Text style={[styles.cell, styles.priceCell]}>{formatCurrency(item.itemPrice)}</Text>
              <Text style={[styles.cell, styles.discountCell]}>{item.discount || 0}%</Text>
              <Text style={[styles.cell, styles.taxCell]}>{item.tax || 0}%</Text>
              <Text style={[styles.cell, styles.amountCell]}>
                {formatCurrency((item.quantity || 1) * item.itemPrice)}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.descriptionCell]}>
              {invoiceData.title || "Service"}
            </Text>
            <Text style={[styles.cell, styles.qtyCell]}>{invoiceData.quantity || 1}</Text>
            <Text style={[styles.cell, styles.priceCell]}>
              {formatCurrency(invoiceData.price || 0)}
            </Text>
            <Text style={[styles.cell, styles.discountCell]}>{invoiceData.discountValue || 0}%</Text>
            <Text style={[styles.cell, styles.taxCell]}>{invoiceData.taxRate || 0}%</Text>
            <Text style={[styles.cell, styles.amountCell]}>
              {formatCurrency(
                (invoiceData.quantity || 1) * (invoiceData.price || 0)
              )}
            </Text>
          </View>
        )}

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub total</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(invoiceData.subtotal || 0)}
            </Text>
          </View>
          {invoiceData.discountValue && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Discount ({invoiceData.discountValue}%)
              </Text>
              <Text style={styles.summaryValue}>
                -{formatCurrency(invoiceData.discountAmount || 0)}
              </Text>
            </View>
          )}
          {invoiceData.shipping && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(invoiceData.shippingAmount || 0)}
              </Text>
            </View>
          )}
          {invoiceData.taxRate && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(invoiceData.taxAmount || 0)}
              </Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoiceData.total || 0)}
            </Text>
          </View>
        </View>

        {/* Terms */}
        {invoiceData.selectedTerms && (
          <View style={styles.terms}>
            <Text style={styles.sectionLabel}>Terms & Conditions:</Text>
            <Text style={styles.termsText}>{invoiceData.selectedTerms}</Text>
          </View>
        )}

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={styles.signatureText}>Approval Signature</Text>
        </View>


        {/* Footer */}
        <View style={styles.footerBlue}>
          <Text style={styles.companyaddress}>{invoiceData.companyData.address}</Text>
        </View>

        <View style={styles.footerSky}>
          <Text style={styles.taxno}>Tax No: {invoiceData.companyData.taxNo}</Text>
          <Text style={styles.email}>{invoiceData.companyData.email}</Text>
          <Text style={styles.phone}>{invoiceData.companyData.phone}</Text>
        </View>
      </View>

      {/* Print Button */}
      <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
        <Ionicons name="print" size={20} color="white" />
        <Text style={styles.printText}>Print Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  page: {
    width: width - 20,
    minHeight: A4_HEIGHT,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 0,
    marginBottom: 20,
  },
  header: {
    height: 80,
    backgroundColor: "#4A5BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { 
    color: "white", 
    fontSize: 24, 
    fontWeight: "bold",
  },
  subHeaderRow: { 
    flexDirection: "row", 
    height: 35 
  },
  subHeaderBlack: {
    flex: 1,
    backgroundColor: "#1C1F26",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  subHeaderBlue: {
    flex: 2,
    backgroundColor: "#8AE0FF",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  subHeaderTitle: { 
    color: "white", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  invoiceNo: { 
    textAlign: "right", 
    fontWeight: "bold", 
    fontSize: 14 
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  clientInfo: {
    flex: 2,
  },
  invoiceInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  sectionLabel: { 
    fontWeight: "bold", 
    marginBottom: 5, 
    fontSize: 14 
  },
  boldText: {  
    fontWeight: "bold", 
    fontSize: 12 
  },
  infoText: {
    fontSize: 11,
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1F26",
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  cell: { 
    fontSize: 10,
    textAlign: "center",
  },
  descriptionCell: {
    flex: 3,
    textAlign: "left",
  },
  qtyCell: {
    flex: 1,
  },
  priceCell: {
    flex: 1.5,
  },
  discountCell: {
    flex: 1,
  },
  taxCell: {
    flex: 1,
  },
  amountCell: {
    flex: 1.5,
  },
  summary: { 
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#1C1F26",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: { 
    fontSize: 12 
  },
  summaryValue: { 
    fontSize: 12 
  },
  totalRow: { 
    borderTopWidth: 1, 
    marginTop: 5, 
    paddingTop: 5,
    borderTopColor: "#1C1F26",
  },
  totalLabel: { 
    fontWeight: "bold",
    fontSize: 14,
  },
  totalValue: { 
    fontWeight: "bold",
    fontSize: 14,
  },
  terms: { 
    padding: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  termsText: {
    fontSize: 11,
    marginTop: 5,
  },
  signature: { 
    alignItems: "flex-end", 
    padding: 10,
    marginTop: 30,
  },
  signatureText: { 
    fontWeight: "bold",
    fontSize: 12,
    borderTopWidth: 1,
    borderTopColor: "#1C1F26",
    paddingTop: 5,
    width: 150,
    textAlign: "center",
  },
  footerBlue: {
    height: 25,
    backgroundColor: "#4A5BFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  companyaddress: { 
    color: "white", 
    fontSize: 10,
    fontWeight: "bold",
  },
  footerSky: {
    height: 25,
    backgroundColor: "#8AE0FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  taxno: {
    color: "black",
    fontSize: 9,
    fontWeight: "bold",
  },
  email: {
    color: "black",
    fontSize: 9,
    fontWeight: "bold",
  },
  phone: {
    color: "black",
    fontSize: 9,
    fontWeight: "bold",
  },
  printButton: {
    flexDirection: "row",
    backgroundColor: "#4A5BFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: width - 40,
  },
  printText: { 
    color: "white", 
    fontWeight: "bold", 
    marginLeft: 10 
  },
});