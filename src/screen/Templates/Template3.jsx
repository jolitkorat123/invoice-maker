
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// const { width } = Dimensions.get("window");
// const A4_HEIGHT = width * 1.414;

// export default function Template3Screen() {
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

//   // Get discount display text based on type
//   const getDiscountDisplay = () => {
//     if (!invoiceData.discountValue) return null;

//     if (invoiceData.discountType === "flat") {
//       return `Discount (Flat)`;
//     } else if (invoiceData.discountType === "percent") {
//       return `Discount (${invoiceData.discountValue}%)`;
//     }
//     return `Discount`;
//   };

//   // Print handler
//   const handlePrint = async () => {
//     try {
//       const htmlContent = "<h1>Invoice PDF Coming Soon</h1>";
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
//         {/* Header with Company Logo and Name */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>{invoiceData.companyData.companyName}</Text>
//           {invoiceData.companyData?.logo && (
//             <Image
//               source={{ uri: invoiceData.companyData.logo }}
//               style={styles.companyLogo}
//               resizeMode="contain"
//             />
//           )}
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
//           <View style={styles.clientInfo}>
//             <Text style={styles.sectionLabel}>To:</Text>
//             <Text style={styles.boldText}>
//               {invoiceData.selectedClient?.tradeName ||
//                 invoiceData.selectedClient?.clientName}
//             </Text>
//             <Text style={styles.infoText}>{invoiceData.selectedClient?.address}</Text>
//             <Text style={styles.infoText}>{invoiceData.selectedClient?.email}</Text>
//             <Text style={styles.infoText}>{invoiceData.selectedClient?.phone}</Text>
//             {invoiceData.selectedClient?.taxNo && (
//               <Text style={styles.infoText}>Tax No: {invoiceData.selectedClient.taxNo}</Text>
//             )}
//           </View>

//           {/* Invoice Info */}
//           <View style={styles.invoiceInfo}>
//             <Text style={styles.infoText}>
//               <Text style={styles.boldText}>Invoice Date: </Text>
//               {new Date(invoiceData.startDate).toLocaleDateString()}
//             </Text>
//             <Text style={styles.infoText}>
//               <Text style={styles.boldText}>Due Date: </Text>
//               {new Date(invoiceData.endDate).toLocaleDateString()}
//             </Text>
//             {invoiceData.selectedPaymentMethod && (
//               <Text style={styles.infoText}>
//                 <Text style={styles.boldText}>Payment Method: </Text>
//                 {invoiceData.selectedPaymentMethod}
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* Table Header */}
//         <View style={styles.tableHeader}>
//           <Text style={[styles.cell, styles.descriptionCell]}>Description</Text>
//           <Text style={[styles.cell, styles.qtyCell]}>Qty</Text>
//           <Text style={[styles.cell, styles.priceCell]}>Price</Text>
//           <Text style={[styles.cell, styles.discountCell]}>Discount</Text>
//           <Text style={[styles.cell, styles.taxCell]}>Tax</Text>
//           <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
//         </View>

//         {/* Table Rows */}
//         {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
//           invoiceData.selectedItems.map((item, i) => (
//             <View key={i} style={styles.tableRow}>
//               <Text style={[styles.cell1, styles.descriptionCell]}>{item.itemName}</Text>
//               <Text style={[styles.cell1, styles.qtyCell]}>{item.quantity || 1}</Text>
//               <Text style={[styles.cell1, styles.priceCell]}>{formatCurrency(item.itemPrice)}</Text>
//               <Text style={[styles.cell1, styles.discountCell]}>
//                 {item.discount ? (item.discountType === 'Percentage' ? `${item.discount}%` : `₹${item.discount}`) : '0%'}
//               </Text>
//               <Text style={[styles.cell1, styles.taxCell]}>{item.taxRate || 0}%</Text>
//               <Text style={[styles.cell1, styles.amountCell]}>
//                 {formatCurrency(item.amount || 0)}
//               </Text>
//             </View>
//           ))
//         ) : (
//           <View style={styles.tableRow}>
//             <Text style={[styles.cell, styles.descriptionCell]}>
//               {invoiceData.title || "Service"}
//             </Text>
//             <Text style={[styles.cell, styles.qtyCell]}>{invoiceData.quantity || 1}</Text>
//             <Text style={[styles.cell, styles.priceCell]}>
//               {formatCurrency(invoiceData.price || 0)}
//             </Text>
//             <Text style={[styles.cell, styles.discountCell]}>
//               {invoiceData.discountValue ? (invoiceData.discountType === 'flat' ? `₹${invoiceData.discountValue}` : `${invoiceData.discountValue}%`) : '0%'}
//             </Text>
//             <Text style={[styles.cell, styles.taxCell]}>{invoiceData.taxRate || 0}%</Text>
//             <Text style={[styles.cell, styles.amountCell]}>
//               {formatCurrency(invoiceData.total || 0)}
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
//                 {getDiscountDisplay()}
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
//                 +{formatCurrency(invoiceData.shippingAmount || 0)}
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
//             <Text style={styles.sectionLabel}>Terms & Conditions:</Text>
//             <Text style={styles.termsText}>{invoiceData.selectedTerms}</Text>
//           </View>
//         )}

//         {/* Signature */}
//         <View style={styles.signature}>
//           {invoiceData.signatureUri ? (
//             <>
//               <Image
//                 source={{ uri: invoiceData.signatureUri }}
//                 style={[
//                   styles.signatureImage,
//                   { tintColor: '#000000' } // This will make the signature black
//                 ]}
//                 resizeMode="contain"
//               />
//               <Text style={styles.signatureText}>Approval Signature</Text>
//             </>
//           ) : (
//             <Text style={styles.signatureText}>Approval Signature</Text>
//           )}
//         </View>

//         {/* Footer */}
//         <View style={styles.footerBlue}>
//           <Text style={styles.companyaddress}>{invoiceData.companyData.address}</Text>
//         </View>

//         <View style={styles.footerSky}>
//           <Text style={styles.taxno}>Tax No: {invoiceData.companyData.taxNo}</Text>
//           <Text style={styles.email}>{invoiceData.companyData.email}</Text>
//           <Text style={styles.phone}>{invoiceData.companyData.phone}</Text>
//         </View>
//       </View>

//       {/* Print Button */}
//       <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
//         <Ionicons name="print" size={20} color="white" />
//         <Text style={styles.printText}>Print Invoice</Text>
//       </TouchableOpacity>
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
//     minHeight: A4_HEIGHT,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 0,
//     marginBottom: 20,
//   },
//   header: {
//     height: 80,
//     backgroundColor: "#4A5BFF",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//   },
//   companyLogo: {
//     width: 70,
//     height: 70,
//     marginRight: 15,
//     borderRadius: 5,
//   },
//   headerText: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   subHeaderRow: {
//     flexDirection: "row",
//     height: 35
//   },
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
//   subHeaderTitle: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16
//   },
//   invoiceNo: {
//     textAlign: "right",
//     fontWeight: "bold",
//     fontSize: 14
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   clientInfo: {
//     flex: 2,
//   },
//   invoiceInfo: {
//     flex: 1,
//     alignItems: "flex-end",
//   },
//   sectionLabel: {
//     fontWeight: "bold",
//     marginBottom: 5,
//     fontSize: 14
//   },
//   boldText: {
//     fontWeight: "bold",
//     fontSize: 12
//   },
//   infoText: {
//     fontSize: 11,
//     marginBottom: 2,
//   },
//   tableHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#1C1F26",
//     paddingVertical: 8,
//     backgroundColor: "#f5f5f5",
//     paddingHorizontal: 5,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//     paddingVertical: 8,
//     paddingHorizontal: 5,
//   },
//   cell: {
//     fontSize: 10,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   cell1:{
//     fontSize: 10,
//     textAlign: "center",
//   },
//   descriptionCell: {
//     flex: 2,
//     textAlign: "left",
//   },
//   qtyCell: {
//     flex: 1,
//   },
//   priceCell: {
//     flex: 1.5,
//   },
//   discountCell: {
//     flex: 1,
//   },
//   taxCell: {
//     flex: 1,
//   },
//   amountCell: {
//     flex: 1.5,
//   },
//   summary: {
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#1C1F26",
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   summaryValue: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     marginTop: 5,
//     paddingTop: 5,
//     borderTopColor: "#1C1F26",
//   },
//   totalLabel: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#4A5BFF",
//   },
//   totalValue: {
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   terms: {
//     padding: 10,
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   termsText: {
//     fontSize: 11,
//     marginTop: 5,
//   },
//   signature: {
//     alignItems: "flex-end",
//     padding: 10,
//     marginTop: -90,
//     minHeight: 90,
//   },
//   signatureImage: {
//     width: 120,
//     height: 120,
//     marginBottom: -10,
//   },
//   signatureText: {
//     fontWeight: "bold",
//     fontSize: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#1C1F26",
//     paddingTop: 5,
//     width: 150,
//     textAlign: "center",
//   },
//   footerBlue: {
//     height: 25,
//     backgroundColor: "#4A5BFF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "auto",
//   },
//   companyaddress: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   footerSky: {
//     height: 25,
//     backgroundColor: "#8AE0FF",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   taxno: {
//     color: "black",
//     fontSize: 9,
//     fontWeight: "bold",
//   },
//   email: {
//     color: "black",
//     fontSize: 9,
//     fontWeight: "bold",
//   },
//   phone: {
//     color: "black",
//     fontSize: 9,
//     fontWeight: "bold",
//   },
//   printButton: {
//     flexDirection: "row",
//     backgroundColor: "#4A5BFF",
//     padding: 12,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     width: width - 40,
//   },
//   printText: {
//     color: "white",
//     fontWeight: "bold",
//     marginLeft: 10
//   },
// });

////Working

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// const { width } = Dimensions.get("window");
// const A4_HEIGHT = width * 1.414;

// export default function Template3Screen() {
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

//   // Get discount display text based on type
//   const getDiscountDisplay = () => {
//     if (!invoiceData.discountValue) return null;

//     if (invoiceData.discountType === "flat") {
//       return `Discount (Flat)`;
//     } else if (invoiceData.discountType === "percent") {
//       return `Discount (${invoiceData.discountValue}%)`;
//     }
//     return `Discount`;
//   };

//   // Generate HTML content for PDF
//   // Generate HTML content for PDF
// const generateHTMLContent = () => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Invoice #${invoiceData.invoiceId}</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//           color: #333;
//         }
//         .header {
//           background-color: #4A5BFF;
//           color: white;
//           padding: 15px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }
//         .company-name {
//           font-size: 24px;
//           font-weight: bold;
//         }
//         .company-logo {
//           height: 60px;
//           max-width: 120px;
//           object-fit: contain;
//         }
//         .invoice-title {
//           background-color: #1C1F26;
//           color: white;
//           padding: 10px;
//           display: inline-block;
//         }
//         .invoice-number {
//           background-color: #8AE0FF;
//           padding: 10px;
//           text-align: right;
//           font-weight: bold;
//         }
//         .info-row {
//           display: flex;
//           justify-content: space-between;
//           margin: 20px 0;
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }
//         th, td {
//           border: 1px solid #ddd;
//           padding: 8px;
//           text-align: center;
//         }
//         th {
//           background-color: #f5f5f5;
//           font-weight: bold;
//         }
//         .description-cell {
//           text-align: left;
//           width: 30%;
//         }
//         .summary {
//           margin-top: 20px;
//           width: 100%;
//         }
//         .summary-row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 5px;
//         }
//         .total-row {
//           border-top: 1px solid #1C1F26;
//           padding-top: 5px;
//           margin-top: 5px;
//           font-weight: bold;
//         }
//         .footer-blue {
//           background-color: #4A5BFF;
//           color: white;
//           padding: 10px;
//           text-align: center;
//           margin-top: 30px;
//         }
//         .footer-sky {
//           background-color: #8AE0FF;
//           padding: 10px;
//           display: flex;
//           justify-content: space-between;
//         }
//         .signature {
//           margin-top: 50px;
//           text-align: right;
//         }
//         .signature img {
//           max-width: 150px;
//           max-height: 80px;
//           object-fit: contain;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="header">
//         <div class="company-name">${invoiceData.companyData.companyName}</div>
//         ${
//           invoiceData.companyData.logo
//             ? `<img src="${invoiceData.companyData.logo}" class="company-logo" />`
//             : ""
//         }
//       </div>

//       <div style="display: flex;">
//         <div class="invoice-title">INVOICE</div>
//         <div class="invoice-number" style="flex-grow: 1;">#${invoiceData.invoiceId}</div>
//       </div>

//       <div class="info-row">
//         <div class="client-info">
//           <h3>To:</h3>
//           <p><b>${invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName}</b></p>
//           <p>${invoiceData.selectedClient?.address || ''}</p>
//           <p>${invoiceData.selectedClient?.email || ''}</p>
//           <p>${invoiceData.selectedClient?.phone || ''}</p>
//           ${invoiceData.selectedClient?.taxNo ? `<p>Tax No: ${invoiceData.selectedClient.taxNo}</p>` : ''}
//         </div>

//         <div class="invoice-info">
//           <p><b>Invoice Date:</b> ${new Date(invoiceData.startDate).toLocaleDateString()}</p>
//           <p><b>Due Date:</b> ${new Date(invoiceData.endDate).toLocaleDateString()}</p>
//           ${invoiceData.selectedPaymentMethod ? `<p><b>Payment Method:</b> ${invoiceData.selectedPaymentMethod}</p>` : ''}
//         </div>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th class="description-cell">Description</th>
//             <th>Qty</th>
//             <th>Price</th>
//             <th>Discount</th>
//             <th>Tax</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${
//             invoiceData.selectedItems && invoiceData.selectedItems.length > 0
//               ? invoiceData.selectedItems
//                   .map(
//                     (item) => `
//               <tr>
//                 <td class="description-cell">${item.itemName}</td>
//                 <td>${item.quantity || 1}</td>
//                 <td>${formatCurrency(item.itemPrice)}</td>
//                 <td>${
//                   item.discount
//                     ? item.discountType === "Percentage"
//                       ? `${item.discount}%`
//                       : `₹${item.discount}`
//                     : "0%"
//                 }</td>
//                 <td>${item.taxRate || 0}%</td>
//                 <td>${formatCurrency(item.amount || 0)}</td>
//               </tr>
//             `
//                   )
//                   .join("")
//               : `
//             <tr>
//               <td class="description-cell">${invoiceData.title || "Service"}</td>
//               <td>${invoiceData.quantity || 1}</td>
//               <td>${formatCurrency(invoiceData.price || 0)}</td>
//               <td>${
//                 invoiceData.discountValue
//                   ? invoiceData.discountType === "flat"
//                     ? `₹${invoiceData.discountValue}`
//                     : `${invoiceData.discountValue}%`
//                   : "0%"
//               }</td>
//               <td>${invoiceData.taxRate || 0}%</td>
//               <td>${formatCurrency(invoiceData.total || 0)}</td>
//             </tr>
//           `
//           }
//         </tbody>
//       </table>

//       <div class="summary">
//         <div class="summary-row">
//           <div>Sub total</div>
//           <div>${formatCurrency(invoiceData.subtotal || 0)}</div>
//         </div>

//         ${
//           invoiceData.discountValue
//             ? `
//           <div class="summary-row">
//             <div>${getDiscountDisplay()}</div>
//             <div>-${formatCurrency(invoiceData.discountAmount || 0)}</div>
//           </div>
//         `
//             : ""
//         }

//         ${
//           invoiceData.shipping
//             ? `
//           <div class="summary-row">
//             <div>Shipping</div>
//             <div>+${formatCurrency(invoiceData.shippingAmount || 0)}</div>
//           </div>
//         `
//             : ""
//         }

//         <div class="summary-row total-row">
//           <div><b>Total</b></div>
//           <div><b>${formatCurrency(invoiceData.total || 0)}</b></div>
//         </div>
//       </div>

//       ${
//         invoiceData.selectedTerms
//           ? `
//         <div class="terms">
//           <h3>Terms & Conditions:</h3>
//           <p>${invoiceData.selectedTerms}</p>
//         </div>
//       `
//           : ""
//       }

//       <div class="signature">
//         ${
//           invoiceData.signatureUri
//             ? `<img src="${invoiceData.signatureUri}" alt="Signature" />`
//             : "<p>Approval Signature</p>"
//         }
//       </div>

//       <div class="footer-blue">
//         ${invoiceData.companyData.address}
//       </div>

//       <div class="footer-sky">
//         <div>Tax No: ${invoiceData.companyData.taxNo}</div>
//         <div>${invoiceData.companyData.email}</div>
//         <div>${invoiceData.companyData.phone}</div>
//       </div>
//     </body>
//     </html>
//   `;
// };


//   // Share handler
//   const handleShare = async () => {
//     try {
//       const htmlContent = generateHTMLContent();
//       const { uri } = await Print.printToFileAsync({ html: htmlContent });

//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, {
//           mimeType: 'application/pdf',
//           dialogTitle: 'Share Invoice',
//           UTI: 'com.adobe.pdf'
//         });
//       } else {
//         Alert.alert("Sharing not available on this device");
//       }
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       Alert.alert("Error", "Failed to generate invoice PDF");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.page}>
//         {/* Header with Company Logo and Name */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>{invoiceData.companyData.companyName}</Text>
//           {invoiceData.companyData?.logo && (
//             <Image
//               source={{ uri: invoiceData.companyData.logo }}
//               style={styles.companyLogo}
//               resizeMode="contain"
//             />
//           )}
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
//           <View style={styles.clientInfo}>
//             <Text style={styles.sectionLabel}>To:</Text>
//             <Text style={styles.boldText}>
//               {invoiceData.selectedClient?.tradeName ||
//                 invoiceData.selectedClient?.clientName}
//             </Text>
//             <Text style={styles.infoText}>{invoiceData.selectedClient?.address}</Text>
//             <Text style={styles.infoText}>{invoiceData.selectedClient?.email}</Text>
//             <Text style={styles.infoText}>{invoiceData.selectedClient?.phone}</Text>
//             {invoiceData.selectedClient?.taxNo && (
//               <Text style={styles.infoText}>Tax No: {invoiceData.selectedClient.taxNo}</Text>
//             )}
//           </View>

//           {/* Invoice Info */}
//           <View style={styles.invoiceInfo}>
//             <Text style={styles.infoText}>
//               <Text style={styles.boldText}>Invoice Date: </Text>
//               {new Date(invoiceData.startDate).toLocaleDateString()}
//             </Text>
//             <Text style={styles.infoText}>
//               <Text style={styles.boldText}>Due Date: </Text>
//               {new Date(invoiceData.endDate).toLocaleDateString()}
//             </Text>
//             {invoiceData.selectedPaymentMethod && (
//               <Text style={styles.infoText}>
//                 <Text style={styles.boldText}>Payment Method: </Text>
//                 {invoiceData.selectedPaymentMethod}
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* Table Header */}
//         <View style={styles.tableHeader}>
//           <Text style={[styles.cell, styles.descriptionCell]}>Description</Text>
//           <Text style={[styles.cell, styles.qtyCell]}>Qty</Text>
//           <Text style={[styles.cell, styles.priceCell]}>Price</Text>
//           <Text style={[styles.cell, styles.discountCell]}>Discount</Text>
//           <Text style={[styles.cell, styles.taxCell]}>Tax</Text>
//           <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
//         </View>

//         {/* Table Rows */}
//         {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
//           invoiceData.selectedItems.map((item, i) => (
//             <View key={i} style={styles.tableRow}>
//               <Text style={[styles.cell1, styles.descriptionCell]}>{item.itemName}</Text>
//               <Text style={[styles.cell1, styles.qtyCell]}>{item.quantity || 1}</Text>
//               <Text style={[styles.cell1, styles.priceCell]}>{formatCurrency(item.itemPrice)}</Text>
//               <Text style={[styles.cell1, styles.discountCell]}>
//                 {item.discount ? (item.discountType === 'Percentage' ? `${item.discount}%` : `₹${item.discount}`) : '0%'}
//               </Text>
//               <Text style={[styles.cell1, styles.taxCell]}>{item.taxRate || 0}%</Text>
//               <Text style={[styles.cell1, styles.amountCell]}>
//                 {formatCurrency(item.amount || 0)}
//               </Text>
//             </View>
//           ))
//         ) : (
//           <View style={styles.tableRow}>
//             <Text style={[styles.cell, styles.descriptionCell]}>
//               {invoiceData.title || "Service"}
//             </Text>
//             <Text style={[styles.cell, styles.qtyCell]}>{invoiceData.quantity || 1}</Text>
//             <Text style={[styles.cell, styles.priceCell]}>
//               {formatCurrency(invoiceData.price || 0)}
//             </Text>
//             <Text style={[styles.cell, styles.discountCell]}>
//               {invoiceData.discountValue ? (invoiceData.discountType === 'flat' ? `₹${invoiceData.discountValue}` : `${invoiceData.discountValue}%`) : '0%'}
//             </Text>
//             <Text style={[styles.cell, styles.taxCell]}>{invoiceData.taxRate || 0}%</Text>
//             <Text style={[styles.cell, styles.amountCell]}>
//               {formatCurrency(invoiceData.total || 0)}
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
//                 {getDiscountDisplay()}
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
//                 +{formatCurrency(invoiceData.shippingAmount || 0)}
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
//             <Text style={styles.sectionLabel}>Terms & Conditions:</Text>
//             <Text style={styles.termsText}>{invoiceData.selectedTerms}</Text>
//           </View>
//         )}

//         {/* Signature */}
//         <View style={styles.signature}>
//           {invoiceData.signatureUri ? (
//             <>
//               <Image
//                 source={{ uri: invoiceData.signatureUri }}
//                 style={[
//                   styles.signatureImage,
//                   { tintColor: '#000000' } // This will make the signature black
//                 ]}
//                 resizeMode="contain"
//               />
//               <Text style={styles.signatureText}>Approval Signature</Text>
//             </>
//           ) : (
//             <Text style={styles.signatureText}>Approval Signature</Text>
//           )}
//         </View>

//         {/* Footer */}
//         <View style={styles.footerBlue}>
//           <Text style={styles.companyaddress}>{invoiceData.companyData.address}</Text>
//         </View>

//         <View style={styles.footerSky}>
//           <Text style={styles.taxno}>Tax No: {invoiceData.companyData.taxNo}</Text>
//           <Text style={styles.email}>{invoiceData.companyData.email}</Text>
//           <Text style={styles.phone}>{invoiceData.companyData.phone}</Text>
//         </View>
//       </View>

//       {/* Share Button */}
//       <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//         <Ionicons name="share" size={20} color="white" />
//         <Text style={styles.shareText}>Share Invoice as PDF</Text>
//       </TouchableOpacity>
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
//     minHeight: A4_HEIGHT,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 0,
//     marginBottom: 20,
//   },
//   header: {
//     height: 80,
//     backgroundColor: "#4A5BFF",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//   },
//   companyLogo: {
//     width: 70,
//     height: 70,
//     marginRight: 15,
//     borderRadius: 5,
//   },
//   headerText: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   subHeaderRow: {
//     flexDirection: "row",
//     height: 35
//   },
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
//   subHeaderTitle: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16
//   },
//   invoiceNo: {
//     textAlign: "right",
//     fontWeight: "bold",
//     fontSize: 14
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   clientInfo: {
//     flex: 2,
//   },
//   invoiceInfo: {
//     flex: 1,
//     alignItems: "flex-end",
//   },
//   sectionLabel: {
//     fontWeight: "bold",
//     marginBottom: 5,
//     fontSize: 14
//   },
//   boldText: {
//     fontWeight: "bold",
//     fontSize: 12
//   },
//   infoText: {
//     fontSize: 11,
//     marginBottom: 2,
//   },
//   tableHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#1C1F26",
//     paddingVertical: 8,
//     backgroundColor: "#f5f5f5",
//     paddingHorizontal: 5,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//     paddingVertical: 8,
//     paddingHorizontal: 5,
//   },
//   cell: {
//     fontSize: 10,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   cell1:{
//     fontSize: 10,
//     textAlign: "center",
//   },
//   descriptionCell: {
//     flex: 2,
//     textAlign: "left",
//   },
//   qtyCell: {
//     flex: 1,
//   },
//   priceCell: {
//     flex: 1.5,
//   },
//   discountCell: {
//     flex: 1,
//   },
//   taxCell: {
//     flex: 1,
//   },
//   amountCell: {
//     flex: 1.5,
//   },
//   summary: {
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#1C1F26",
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   summaryValue: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     marginTop: 5,
//     paddingTop: 5,
//     borderTopColor: "#1C1F26",
//   },
//   totalLabel: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#4A5BFF",
//   },
//   totalValue: {
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   terms: {
//     padding: 10,
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   termsText: {
//     fontSize: 11,
//     marginTop: 5,
//   },
//   signature: {
//     alignItems: "flex-end",
//     padding: 10,
//     marginTop: -90,
//     minHeight: 90,
//   },
//   signatureImage: {
//     width: 120,
//     height: 120,
//     marginBottom: -10,
//   },
//   signatureText: {
//     fontWeight: "bold",
//     fontSize: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#1C1F26",
//     paddingTop: 5,
//     width: 150,
//     textAlign: "center",
//   },
//   footerBlue: {
//     height: 25,
//     backgroundColor: "#4A5BFF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "auto",
//   },
//   companyaddress: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   footerSky: {
//     height: 25,
//     backgroundColor: "#8AE0FF",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   taxno: {
//     color: "black",
//     fontSize: 9,
//     fontWeight: "bold",
//   },
//   email: {
//     color: "black",
//     fontSize: 9,
//     fontWeight: "bold",
//   },
//   phone: {
//     color: "black",
//     fontSize: 9,
//     fontWeight: "bold",
//   },
//   shareButton: {
//     flexDirection: "row",
//     backgroundColor: "#4A5BFF",
//     padding: 12,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     width: width - 40,
//   },
//   shareText: {
//     color: "white",
//     fontWeight: "bold",
//     marginLeft: 10
//   },
// });

//////////////////////////////
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("window");
const A4_HEIGHT = width * 1.414;

export default function Template3Screen() {
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

  // Get discount display text based on type
  const getDiscountDisplay = () => {
    if (!invoiceData.discountValue) return null;

    if (invoiceData.discountType === "flat") {
      return `Discount (Flat)`;
    } else if (invoiceData.discountType === "percent") {
      return `Discount (${invoiceData.discountValue}%)`;
    }
    return `Discount`;
  };

  // Check if URI is a web URL
  const isWebUri = (uri) => {
    return uri && (uri.startsWith("http://") || uri.startsWith("https://"));
  };

  // Convert image to base64 for PDF embedding
  // const convertImageToBase64 = async (uri) => {
  //   try {
  //     if (isWebUri(uri)) {
  //       return uri;
  //     }
  //     const base64 = await FileSystem.readAsStringAsync(uri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     return `data:image/jpeg;base64,${base64}`;
  //   } catch (error) {
  //     console.error("Error converting image to base64:", error);
  //     return null;
  //   }
  // };
  // Convert image to base64 for PDF embedding
  const convertImageToBase64 = async (uri) => {
    try {
      if (!uri) return null;

      // If it's a web image (http/https), return as is
      if (isWebUri(uri)) {
        return uri;
      }

      // If it's a local file, convert to base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Detect extension (jpeg/png)
      const ext = uri.toLowerCase().endsWith(".png") ? "png" : "jpeg";

      return `data:image/${ext};base64,${base64}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };


  // Generate HTML content for PDF
  const generateHTMLContent = async () => {
    let companyLogoBase64 = null;
    let signatureBase64 = null;

    if (invoiceData.companyData?.logo) {
      companyLogoBase64 = await convertImageToBase64(
        invoiceData.companyData.logo
      );
    }

    if (invoiceData.signatureUri) {
      signatureBase64 = await convertImageToBase64(invoiceData.signatureUri);
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice #${invoiceData.invoiceId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            font-size: 12px;
          }
          .page {
            width: 100%;
            min-height: ${A4_HEIGHT}px;
            background-color: white;
          }
          .header {
            background-color: #4A5BFF;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
          }
          .company-name {
            font-size: 24px;
            font-weight: bold;
          }
          .company-logo {
            height: 60px;
            width: 70px;
            object-fit: contain;
            border-radius: 5px;
          }
          .sub-header-row {
            display: flex;
            flex-direction: row;
            height: 35px;
          }
          .sub-header-black {
            background-color: #1C1F26;
            color: white;
            padding: 10px;
            font-weight: bold;
            font-size: 16px;
            flex: 1;
            display: flex;
            align-items: center;
          }
          .sub-header-blue {
            background-color: #8AE0FF;
            padding: 10px;
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-weight: bold;
            font-size: 14px;
          }
          .info-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          .client-info, .invoice-info {
            font-size: 11px;
          }
          .section-label {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 14px;
          }
          .bold-text {
            font-weight: bold;
            font-size: 12px;
          }
          .table-header {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #1C1F26;
            padding: 8px 5px;
            background-color: #f5f5f5;
            font-weight: bold;
            font-size: 10px;
          }
          .table-row {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #eee;
            padding: 8px 5px;
            font-size: 10px;
          }
          .cell {
            text-align: center;
          }
          .description-cell {
            flex: 2;
            text-align: left;
          }
          .qty-cell { flex: 1; }
          .price-cell { flex: 1.5; }
          .discount-cell { flex: 1; }
          .tax-cell { flex: 1; }
          .amount-cell { flex: 1.5; }
          .summary {
            padding: 10px;
            border-top: 1px solid #1C1F26;
          }
          .summary-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 12px;
            font-weight: bold;
          }
          .total-row {
            border-top: 1px solid #1C1F26;
            padding-top: 5px;
            margin-top: 5px;
          }
          .total-label {
            font-weight: bold;
            font-size: 16px;
            color: #4A5BFF;
          }
          .total-value {
            font-weight: bold;
            font-size: 14px;
          }
          .terms {
            padding: 10px;
            margin-top: 10px;
            border-top: 1px solid #eee;
          }
          .terms-text {
            font-size: 11px;
            margin-top: 5px;
          }
          /* ✅ Fixed signature styling */
          .signature-container {
            margin-top: 20px;
            padding: 10px;
            display: flex;
            justify-content: flex-end;
          }
          .signature-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .signature-image {
            width: 120px;
            height: 60px;
            object-fit: contain;
            margin-bottom: 5px;
          }
          .signature-line {
            width: 150px;
            border-top: 1px solid #1C1F26;
            padding-top: 5px;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
          }
          .footer-blue {
            height: 25px;
            background-color: #4A5BFF;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: auto;
          }
          .company-address {
            color: white;
            font-size: 10px;
            font-weight: bold;
          }
          .footer-sky {
            height: 25px;
            background-color: #8AE0FF;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
          }
          .footer-text {
            color: black;
            font-size: 9px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div class="company-name">${invoiceData.companyData.companyName}</div>
            ${companyLogoBase64 ? `<img src="${companyLogoBase64}" class="company-logo" />` : ""}
          </div>

          <div class="sub-header-row">
            <div class="sub-header-black">INVOICE</div>
            <div class="sub-header-blue">#${invoiceData.invoiceId}</div>
          </div>

          <div class="info-row">
            <div class="client-info">
              <div class="section-label">To:</div>
              <div class="bold-text">${invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName}</div>
              <div>${invoiceData.selectedClient?.address || ''}</div>
              <div>${invoiceData.selectedClient?.email || ''}</div>
              <div>${invoiceData.selectedClient?.phone || ''}</div>
              ${invoiceData.selectedClient?.taxNo ? `<div>Tax No: ${invoiceData.selectedClient.taxNo}</div>` : ''}
            </div>
            <div class="invoice-info">
              <div><span class="bold-text">Invoice Date: </span>${new Date(invoiceData.startDate).toLocaleDateString()}</div>
              <div><span class="bold-text">Due Date: </span>${new Date(invoiceData.endDate).toLocaleDateString()}</div>
              ${invoiceData.selectedPaymentMethod ? `<div><span class="bold-text">Payment Method: </span>${invoiceData.selectedPaymentMethod}</div>` : ''}
            </div>
          </div>

          <div class="table-header">
            <div class="cell description-cell">Description</div>
            <div class="cell qty-cell">Qty</div>
            <div class="cell price-cell">Price</div>
            <div class="cell discount-cell">Discount</div>
            <div class="cell tax-cell">Tax</div>
            <div class="cell amount-cell">Amount</div>
          </div>

          ${invoiceData.selectedItems && invoiceData.selectedItems.length > 0
        ? invoiceData.selectedItems
          .map(
            (item) => `
                  <div class="table-row">
                    <div class="cell description-cell">${item.itemName}</div>
                    <div class="cell qty-cell">${item.quantity || 1}</div>
                    <div class="cell price-cell">${formatCurrency(item.itemPrice)}</div>
                    <div class="cell discount-cell">${item.discount
                ? item.discountType === "Percentage"
                  ? `${item.discount}%`
                  : `₹${item.discount}`
                : "0%"
              }</div>
                    <div class="cell tax-cell">${item.taxRate || 0}%</div>
                    <div class="cell amount-cell">${formatCurrency(item.amount || 0)}</div>
                  </div>
                `
          )
          .join("")
        : `
                <div class="table-row">
                  <div class="cell description-cell">${invoiceData.title || "Service"}</div>
                  <div class="cell qty-cell">${invoiceData.quantity || 1}</div>
                  <div class="cell price-cell">${formatCurrency(invoiceData.price || 0)}</div>
                  <div class="cell discount-cell">${invoiceData.discountValue
          ? invoiceData.discountType === "flat"
            ? `₹${invoiceData.discountValue}`
            : `${invoiceData.discountValue}%`
          : "0%"
        }</div>
                  <div class="cell tax-cell">${invoiceData.taxRate || 0}%</div>
                  <div class="cell amount-cell">${formatCurrency(invoiceData.total || 0)}</div>
                </div>
              `
      }

          <div class="summary">
            <div class="summary-row">
              <div>Sub total</div>
              <div>${formatCurrency(invoiceData.subtotal || 0)}</div>
            </div>
            ${invoiceData.discountValue
        ? `<div class="summary-row"><div>${getDiscountDisplay()}</div><div>-${formatCurrency(invoiceData.discountAmount || 0)}</div></div>`
        : ""
      }
            ${invoiceData.shipping
        ? `<div class="summary-row"><div>Shipping</div><div>+${formatCurrency(invoiceData.shippingAmount || 0)}</div></div>`
        : ""
      }
            <div class="summary-row total-row">
              <div class="total-label">Total</div>
              <div class="total-value">${formatCurrency(invoiceData.total || 0)}</div>
            </div>
          </div>

          ${invoiceData.selectedTerms
        ? `<div class="terms"><div class="section-label">Terms & Conditions:</div><div class="terms-text">${invoiceData.selectedTerms}</div></div>`
        : ""
      }

          <!-- Signature section - fixed -->
          <div class="signature-container">
          <div class="signature-wrapper">
              ${signatureBase64 ? `<img src="${signatureBase64}" class="signature-image" />` : ""}
              <div class="signature-line">Approval Signature</div>
          </div>
          </div>

          <div class="footer-blue">
            <div class="company-address">${invoiceData.companyData.address}</div>
          </div>
          <div class="footer-sky">
            <div class="footer-text">Tax No: ${invoiceData.companyData.taxNo}</div>
            <div class="footer-text">${invoiceData.companyData.email}</div>
            <div class="footer-text">${invoiceData.companyData.phone}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Share handler
  const handleShare = async () => {
    try {
      const htmlContent = await generateHTMLContent();
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        width: width - 20,
        height: A4_HEIGHT,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Share Invoice",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert("Sharing not available on this device");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate invoice PDF");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{invoiceData.companyData.companyName}</Text>
          {invoiceData.companyData?.logo && (
            <Image
              source={{ uri: invoiceData.companyData.logo }}
              style={styles.companyLogo}
              resizeMode="contain"
            />
          )}
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

        {/* Info */}
        <View style={styles.infoRow}>
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

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.descriptionCell]}>Description</Text>
          <Text style={[styles.cell, styles.qtyCell]}>Qty</Text>
          <Text style={[styles.cell, styles.priceCell]}>Price</Text>
          <Text style={[styles.cell, styles.discountCell]}>Discount</Text>
          <Text style={[styles.cell, styles.taxCell]}>Tax</Text>
          <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
        </View>

        {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
          invoiceData.selectedItems.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.cell1, styles.descriptionCell]}>{item.itemName}</Text>
              <Text style={[styles.cell1, styles.qtyCell]}>{item.quantity || 1}</Text>
              <Text style={[styles.cell1, styles.priceCell]}>{formatCurrency(item.itemPrice)}</Text>
              <Text style={[styles.cell1, styles.discountCell]}>
                {item.discount
                  ? item.discountType === "Percentage"
                    ? `${item.discount}%`
                    : `₹${item.discount}`
                  : "0%"}
              </Text>
              <Text style={[styles.cell1, styles.taxCell]}>{item.taxRate || 0}%</Text>
              <Text style={[styles.cell1, styles.amountCell]}>
                {formatCurrency(item.amount || 0)}
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
            <Text style={[styles.cell, styles.discountCell]}>
              {invoiceData.discountValue
                ? invoiceData.discountType === "flat"
                  ? `₹${invoiceData.discountValue}`
                  : `${invoiceData.discountValue}%`
                : "0%"}
            </Text>
            <Text style={[styles.cell, styles.taxCell]}>{invoiceData.taxRate || 0}%</Text>
            <Text style={[styles.cell, styles.amountCell]}>
              {formatCurrency(invoiceData.total || 0)}
            </Text>
          </View>
        )}

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Sub total</Text>
            <Text>{formatCurrency(invoiceData.subtotal || 0)}</Text>
          </View>
          {invoiceData.discountValue && (
            <View style={styles.summaryRow}>
              <Text>{getDiscountDisplay()}</Text>
              <Text>-{formatCurrency(invoiceData.discountAmount || 0)}</Text>
            </View>
          )}
          {invoiceData.shipping && (
            <View style={styles.summaryRow}>
              <Text>Shipping</Text>
              <Text>+{formatCurrency(invoiceData.shippingAmount || 0)}</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoiceData.total || 0)}</Text>
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
          {invoiceData.signatureUri && (
            <Image
              source={{ uri: invoiceData.signatureUri }}
              style={[styles.signatureImage, { tintColor: "black" }]}
              resizeMode="contain"
            />
          )}
          <Text style={styles.signatureText}>Approval Signature</Text>
        </View>

        {/* Footer */}
        <View style={styles.footerBlue}>
          <Text style={styles.companyAddress}>{invoiceData.companyData.address}</Text>
        </View>
        <View style={styles.footerSky}>
          <Text style={styles.footerText}>Tax No: {invoiceData.companyData.taxNo}</Text>
          <Text style={styles.footerText}>{invoiceData.companyData.email}</Text>
          <Text style={styles.footerText}>{invoiceData.companyData.phone}</Text>
        </View>
      </View>

      {/* Share button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-outline" size={20} color="white" />
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 10, alignItems: "center", backgroundColor: "#f5f5f5" },
  page: { width: width - 20, minHeight: A4_HEIGHT, backgroundColor: "white", elevation: 5, paddingBottom: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#4A5BFF" },
  headerText: { fontSize: 24, fontWeight: "bold", color: "white" },
  companyLogo: { height: 60, width: 70, borderRadius: 5 },
  subHeaderRow: { flexDirection: "row", height: 35 },
  subHeaderBlack: { flex: 1, backgroundColor: "#1C1F26", justifyContent: "center", paddingHorizontal: 10 },
  subHeaderBlue: { flex: 2, backgroundColor: "#8AE0FF", justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 10 },
  subHeaderTitle: { fontSize: 16, fontWeight: "bold", color: "white" },
  invoiceNo: { fontSize: 14, fontWeight: "bold" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  clientInfo: { flex: 1 },
  invoiceInfo: { flex: 1, alignItems: "flex-end" },
  sectionLabel: { fontWeight: "bold", marginBottom: 5, fontSize: 14 },
  boldText: { fontWeight: "bold", fontSize: 12 },
  infoText: { fontSize: 11 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#1C1F26", paddingVertical: 8, backgroundColor: "#f5f5f5" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee", paddingVertical: 8 },
  cell: { textAlign: "center", fontSize: 10 },
  cell1: { textAlign: "center", fontSize: 10 },
  descriptionCell: { flex: 2, textAlign: "left" },
  qtyCell: { flex: 1 },
  priceCell: { flex: 1.5 },
  discountCell: { flex: 1 },
  taxCell: { flex: 1 },
  amountCell: { flex: 1.5 },
  summary: { padding: 10, borderTopWidth: 1, borderTopColor: "#1C1F26" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5, fontSize: 12, fontWeight: "bold" },
  totalRow: { borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, marginTop: 5 },
  totalLabel: { fontWeight: "bold", fontSize: 16, color: "#4A5BFF" },
  totalValue: { fontWeight: "bold", fontSize: 14 },
  terms: { padding: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: "#eee" },
  termsText: { fontSize: 11, marginTop: 5 },
  signature: { alignItems: "flex-end", padding: 10, marginTop: 20, minHeight: 90, justifyContent: "flex-end" },
  signatureImage: { width: 120, height: 60, marginBottom: 5 },
  signatureText: { fontWeight: "bold", fontSize: 12, borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, width: 150, textAlign: "center" },
  footerBlue: { height: 25, backgroundColor: "#4A5BFF", justifyContent: "center", alignItems: "center" },
  companyAddress: { color: "white", fontSize: 10, fontWeight: "bold" },
  footerSky: { height: 25, backgroundColor: "#8AE0FF", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 },
  footerText: { color: "black", fontSize: 9, fontWeight: "bold" },
  shareButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#4A5BFF", padding: 10, borderRadius: 5, marginTop: 20 },
  shareButtonText: { color: "white", marginLeft: 5, fontWeight: "bold" },
});

