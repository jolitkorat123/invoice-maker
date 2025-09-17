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
// import * as FileSystem from "expo-file-system";

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

//   // Check if URI is a web URL
//   const isWebUri = (uri) => {
//     return uri && (uri.startsWith("http://") || uri.startsWith("https://"));
//   };

//   // Convert image to base64 for PDF embedding
//   const convertImageToBase64 = async (uri) => {
//     try {
        
//       if (isWebUri(uri)) {
//         return uri;
//       }
//       const base64 = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       return `data:image/jpeg;base64,${base64}`;
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };
//   // Convert image to base64 for PDF embedding
//   // const convertImageToBase64 = async (uri) => {
//   //   try {
//   //     if (!uri) return null;

//   //     // If it's a web image (http/https), return as is
//   //     if (isWebUri(uri)) {
//   //       return uri;
//   //     }

//   //     // If it's a local file, convert to base64
//   //     const base64 = await FileSystem.readAsStringAsync(uri, {
//   //       encoding: FileSystem.EncodingType.Base64,
//   //     });

//   //     // Detect extension (jpeg/png)
//   //     const ext = uri.toLowerCase().endsWith(".png") ? "png" : "jpeg";

//   //     return `data:image/${ext};base64,${base64}`;
//   //   } catch (error) {
//   //     console.error("Error converting image to base64:", error);
//   //     return null;
//   //   }
//   // };


//   // Generate HTML content for PDF
//   const generateHTMLContent = async () => {
//     let companyLogoBase64 = null;
//     let signatureBase64 = null;

//     if (invoiceData.companyData?.logo) {
//       companyLogoBase64 = await convertImageToBase64(
//         invoiceData.companyData.logo
//       );
//     }

//     if (invoiceData.signatureUri) {
//       signatureBase64 = await convertImageToBase64(invoiceData.signatureUri);
//     }

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Invoice #${invoiceData.invoiceId}</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #333;
//             font-size: 12px;
//           }
//           .page {
//             width: 100%;
//             min-height: ${A4_HEIGHT}px;
//             background-color: white;
//           }
//           .header {
//             background-color: #4A5BFF;
//             color: white;
//             padding: 15px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             height: 80px;
//           }
//           .company-name {
//             font-size: 24px;
//             font-weight: bold;
//           }
//           .company-logo {
//             height: 60px;
//             width: 70px;
//             object-fit: contain;
//             border-radius: 5px;
//           }
//           .sub-header-row {
//             display: flex;
//             flex-direction: row;
//             height: 35px;
//           }
//           .sub-header-black {
//             background-color: #1C1F26;
//             color: white;
//             padding: 10px;
//             font-weight: bold;
//             font-size: 16px;
//             flex: 1;
//             display: flex;
//             align-items: center;
//           }
//           .sub-header-blue {
//             background-color: #8AE0FF;
//             padding: 10px;
//             flex: 2;
//             display: flex;
//             align-items: center;
//             justify-content: flex-end;
//             font-weight: bold;
//             font-size: 14px;
//           }
//           .info-row {
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             padding: 10px;
//             border-bottom: 1px solid #eee;
//           }
//           .client-info, .invoice-info {
//             font-size: 11px;
//           }
//           .section-label {
//             font-weight: bold;
//             margin-bottom: 5px;
//             font-size: 14px;
//           }
//           .bold-text {
//             font-weight: bold;
//             font-size: 12px;
//           }
//           .table-header {
//             display: flex;
//             flex-direction: row;
//             border-bottom: 1px solid #1C1F26;
//             padding: 8px 5px;
//             background-color: #f5f5f5;
//             font-weight: bold;
//             font-size: 10px;
//           }
//           .table-row {
//             display: flex;
//             flex-direction: row;
//             border-bottom: 1px solid #eee;
//             padding: 8px 5px;
//             font-size: 10px;
//           }
//           .cell {
//             text-align: center;
//           }
//           .description-cell {
//             flex: 2;
//             text-align: left;
//           }
//           .qty-cell { flex: 1; }
//           .price-cell { flex: 1.5; }
//           .discount-cell { flex: 1; }
//           .tax-cell { flex: 1; }
//           .amount-cell { flex: 1.5; }
//           .summary {
//             padding: 10px;
//             border-top: 1px solid #1C1F26;
//           }
//           .summary-row {
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             margin-bottom: 5px;
//             font-size: 12px;
//             font-weight: bold;
//           }
//           .total-row {
//             border-top: 1px solid #1C1F26;
//             padding-top: 5px;
//             margin-top: 5px;
//           }
//           .total-label {
//             font-weight: bold;
//             font-size: 16px;
//             color: #4A5BFF;
//           }
//           .total-value {
//             font-weight: bold;
//             font-size: 14px;
//           }
//           .terms {
//             padding: 10px;
//             margin-top: 10px;
//             border-top: 1px solid #eee;
//           }
//           .terms-text {
//             font-size: 11px;
//             margin-top: 5px;
//           }
//           /* ✅ Fixed signature styling */
//           .signature-container {
//             margin-top: 20px;
//             padding: 10px;
//             display: flex;
//             justify-content: flex-end;
//           }
//           .signature-wrapper {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//           }
//           .signature-image {
//             width: 120px;
//             height: 60px;
//             object-fit: contain;
//             margin-bottom: 5px;
//           }
//           .signature-line {
//             width: 150px;
//             border-top: 1px solid #1C1F26;
//             padding-top: 5px;
//             text-align: center;
//             font-weight: bold;
//             font-size: 12px;
//           }
//           .footer-blue {
//             height: 25px;
//             background-color: #4A5BFF;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             margin-top: auto;
//           }
//           .company-address {
//             color: white;
//             font-size: 10px;
//             font-weight: bold;
//           }
//           .footer-sky {
//             height: 25px;
//             background-color: #8AE0FF;
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             align-items: center;
//             padding: 0 10px;
//           }
//           .footer-text {
//             color: black;
//             font-size: 9px;
//             font-weight: bold;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="page">
//           <div class="header">
//             <div class="company-name">${invoiceData.companyData.companyName}</div>
//             ${companyLogoBase64 ? `<img src="${companyLogoBase64}" class="company-logo" />` : ""}
//           </div>

//           <div class="sub-header-row">
//             <div class="sub-header-black">INVOICE</div>
//             <div class="sub-header-blue">#${invoiceData.invoiceId}</div>
//           </div>

//           <div class="info-row">
//             <div class="client-info">
//               <div class="section-label">To:</div>
//               <div class="bold-text">${invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName}</div>
//               <div>${invoiceData.selectedClient?.address || ''}</div>
//               <div>${invoiceData.selectedClient?.email || ''}</div>
//               <div>${invoiceData.selectedClient?.phone || ''}</div>
//               ${invoiceData.selectedClient?.taxNo ? `<div>Tax No: ${invoiceData.selectedClient.taxNo}</div>` : ''}
//             </div>
//             <div class="invoice-info">
//               <div><span class="bold-text">Invoice Date: </span>${new Date(invoiceData.startDate).toLocaleDateString()}</div>
//               <div><span class="bold-text">Due Date: </span>${new Date(invoiceData.endDate).toLocaleDateString()}</div>
//               ${invoiceData.selectedPaymentMethod ? `<div><span class="bold-text">Payment Method: </span>${invoiceData.selectedPaymentMethod}</div>` : ''}
//             </div>
//           </div>

//           <div class="table-header">
//             <div class="cell description-cell">Description</div>
//             <div class="cell qty-cell">Qty</div>
//             <div class="cell price-cell">Price</div>
//             <div class="cell discount-cell">Discount</div>
//             <div class="cell tax-cell">Tax</div>
//             <div class="cell amount-cell">Amount</div>
//           </div>

//           ${invoiceData.selectedItems && invoiceData.selectedItems.length > 0
//         ? invoiceData.selectedItems
//           .map(
//             (item) => `
//                   <div class="table-row">
//                     <div class="cell description-cell">${item.itemName}</div>
//                     <div class="cell qty-cell">${item.quantity || 1}</div>
//                     <div class="cell price-cell">${formatCurrency(item.itemPrice)}</div>
//                     <div class="cell discount-cell">${item.discount
//                 ? item.discountType === "Percentage"
//                   ? `${item.discount}%`
//                   : `₹${item.discount}`
//                 : "0%"
//               }</div>
//                     <div class="cell tax-cell">${item.taxRate || 0}%</div>
//                     <div class="cell amount-cell">${formatCurrency(item.amount || 0)}</div>
//                   </div>
//                 `
//           )
//           .join("")
//         : `
//                 <div class="table-row">
//                   <div class="cell description-cell">${invoiceData.title || "Service"}</div>
//                   <div class="cell qty-cell">${invoiceData.quantity || 1}</div>
//                   <div class="cell price-cell">${formatCurrency(invoiceData.price || 0)}</div>
//                   <div class="cell discount-cell">${invoiceData.discountValue
//           ? invoiceData.discountType === "flat"
//             ? `₹${invoiceData.discountValue}`
//             : `${invoiceData.discountValue}%`
//           : "0%"
//         }</div>
//                   <div class="cell tax-cell">${invoiceData.taxRate || 0}%</div>
//                   <div class="cell amount-cell">${formatCurrency(invoiceData.total || 0)}</div>
//                 </div>
//               `
//       }

//           <div class="summary">
//             <div class="summary-row">
//               <div>Sub total</div>
//               <div>${formatCurrency(invoiceData.subtotal || 0)}</div>
//             </div>
//             ${invoiceData.discountValue
//         ? `<div class="summary-row"><div>${getDiscountDisplay()}</div><div>-${formatCurrency(invoiceData.discountAmount || 0)}</div></div>`
//         : ""
//       }
//             ${invoiceData.shipping
//         ? `<div class="summary-row"><div>Shipping</div><div>+${formatCurrency(invoiceData.shippingAmount || 0)}</div></div>`
//         : ""
//       }
//             <div class="summary-row total-row">
//               <div class="total-label">Total</div>
//               <div class="total-value">${formatCurrency(invoiceData.total || 0)}</div>
//             </div>
//           </div>

//           ${invoiceData.selectedTerms
//         ? `<div class="terms"><div class="section-label">Terms & Conditions:</div><div class="terms-text">${invoiceData.selectedTerms}</div></div>`
//         : ""
//       }

//           <!-- Signature section - fixed -->
//           <div class="signature-container">
//           <div class="signature-wrapper">
//               ${signatureBase64 ? `<img src="${signatureBase64}" class="signature-image" />` : ""}
//               <div class="signature-line">Approval Signature</div>
//           </div>
//           </div>
          

//           <div class="footer-blue">
//             <div class="company-address">${invoiceData.companyData.address}</div>
//           </div>
//           <div class="footer-sky">
//             <div class="footer-text">Tax No: ${invoiceData.companyData.taxNo}</div>
//             <div class="footer-text">${invoiceData.companyData.email}</div>
//             <div class="footer-text">${invoiceData.companyData.phone}</div>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   // Share handler
//   const handleShare = async () => {
//     try {
//       const htmlContent = await generateHTMLContent();
//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         width: width - 20,
//         height: A4_HEIGHT,
//       });

//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, {
//           mimeType: "application/pdf",
//           dialogTitle: "Share Invoice",
//           UTI: "com.adobe.pdf",
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
//         {/* Header */}
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

//         {/* Info */}
//         <View style={styles.infoRow}>
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

//         {/* Table */}
//         <View style={styles.tableHeader}>
//           <Text style={[styles.cell, styles.descriptionCell]}>Description</Text>
//           <Text style={[styles.cell, styles.qtyCell]}>Qty</Text>
//           <Text style={[styles.cell, styles.priceCell]}>Price</Text>
//           <Text style={[styles.cell, styles.discountCell]}>Discount</Text>
//           <Text style={[styles.cell, styles.taxCell]}>Tax</Text>
//           <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
//         </View>

//         {invoiceData.selectedItems && invoiceData.selectedItems.length > 0 ? (
//           invoiceData.selectedItems.map((item, i) => (
//             <View key={i} style={styles.tableRow}>
//               <Text style={[styles.cell1, styles.descriptionCell]}>{item.itemName}</Text>
//               <Text style={[styles.cell1, styles.qtyCell]}>{item.quantity || 1}</Text>
//               <Text style={[styles.cell1, styles.priceCell]}>{formatCurrency(item.itemPrice)}</Text>
//               <Text style={[styles.cell1, styles.discountCell]}>
//                 {item.discount
//                   ? item.discountType === "Percentage"
//                     ? `${item.discount}%`
//                     : `₹${item.discount}`
//                   : "0%"}
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
//               {invoiceData.discountValue
//                 ? invoiceData.discountType === "flat"
//                   ? `₹${invoiceData.discountValue}`
//                   : `${invoiceData.discountValue}%`
//                 : "0%"}
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
//             <Text>Sub total</Text>
//             <Text>{formatCurrency(invoiceData.subtotal || 0)}</Text>
//           </View>
//           {invoiceData.discountValue && (
//             <View style={styles.summaryRow}>
//               <Text>{getDiscountDisplay()}</Text>
//               <Text>-{formatCurrency(invoiceData.discountAmount || 0)}</Text>
//             </View>
//           )}
//           {invoiceData.shipping && (
//             <View style={styles.summaryRow}>
//               <Text>Shipping</Text>
//               <Text>+{formatCurrency(invoiceData.shippingAmount || 0)}</Text>
//             </View>
//           )}
//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>{formatCurrency(invoiceData.total || 0)}</Text>
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
//           {invoiceData.signatureUri && (
//             <Image
//               source={{ uri: invoiceData.signatureUri }}
//               style={[styles.signatureImage, { tintColor: "black" }]}
//               resizeMode="contain"
//             />
//           )}
//           <Text style={styles.signatureText}>Approval Signature</Text>
//         </View>

//         {/* Footer */}
//         <View style={styles.footerBlue}>
//           <Text style={styles.companyAddress}>{invoiceData.companyData.address}</Text>
//         </View>
//         <View style={styles.footerSky}>
//           <Text style={styles.footerText}>Tax No: {invoiceData.companyData.taxNo}</Text>
//           <Text style={styles.footerText}>{invoiceData.companyData.email}</Text>
//           <Text style={styles.footerText}>{invoiceData.companyData.phone}</Text>
//         </View>
//       </View>

//       {/* Share button */}
//       <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//         <Ionicons name="share-outline" size={20} color="white" />
//         <Text style={styles.shareButtonText}>Share</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // ✅ Styles
// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 10, alignItems: "center", backgroundColor: "#f5f5f5" },
//   page: { width: width - 20, minHeight: A4_HEIGHT, backgroundColor: "white", elevation: 5, paddingBottom: 10 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#4A5BFF" },
//   headerText: { fontSize: 24, fontWeight: "bold", color: "white" },
//   companyLogo: { height: 60, width: 70, borderRadius: 5 },
//   subHeaderRow: { flexDirection: "row", height: 35 },
//   subHeaderBlack: { flex: 1, backgroundColor: "#1C1F26", justifyContent: "center", paddingHorizontal: 10 },
//   subHeaderBlue: { flex: 2, backgroundColor: "#8AE0FF", justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 10 },
//   subHeaderTitle: { fontSize: 16, fontWeight: "bold", color: "white" },
//   invoiceNo: { fontSize: 14, fontWeight: "bold" },
//   infoRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   clientInfo: { flex: 1 },
//   invoiceInfo: { flex: 1, alignItems: "flex-end" },
//   sectionLabel: { fontWeight: "bold", marginBottom: 5, fontSize: 14 },
//   boldText: { fontWeight: "bold", fontSize: 12 },
//   infoText: { fontSize: 11 },
//   tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#1C1F26", paddingVertical: 8, backgroundColor: "#f5f5f5" },
//   tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee", paddingVertical: 8 },
//   cell: { textAlign: "center", fontSize: 10 },
//   cell1: { textAlign: "center", fontSize: 10 },
//   descriptionCell: { flex: 2, textAlign: "left" },
//   qtyCell: { flex: 1 },
//   priceCell: { flex: 1.5 },
//   discountCell: { flex: 1 },
//   taxCell: { flex: 1 },
//   amountCell: { flex: 1.5 },
//   summary: { padding: 10, borderTopWidth: 1, borderTopColor: "#1C1F26" },
//   summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5, fontSize: 12, fontWeight: "bold" },
//   totalRow: { borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, marginTop: 5 },
//   totalLabel: { fontWeight: "bold", fontSize: 16, color: "#4A5BFF" },
//   totalValue: { fontWeight: "bold", fontSize: 14 },
//   terms: { padding: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: "#eee" },
//   termsText: { fontSize: 11, marginTop: 5 },
//   signature: { alignItems: "flex-end", padding: 10, marginTop: 20, minHeight: 90, justifyContent: "flex-end" },
//   signatureImage: { width: 120, height: 60, marginBottom: 5 },
//   signatureText: { fontWeight: "bold", fontSize: 12, borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, width: 150, textAlign: "center" },
//   footerBlue: { height: 25, backgroundColor: "#4A5BFF", justifyContent: "center", alignItems: "center" },
//   companyAddress: { color: "white", fontSize: 10, fontWeight: "bold" },
//   footerSky: { height: 25, backgroundColor: "#8AE0FF", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 },
//   footerText: { color: "black", fontSize: 9, fontWeight: "bold" },
//   shareButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#4A5BFF", padding: 10, borderRadius: 5, marginTop: 20 },
//   shareButtonText: { color: "white", marginLeft: 5, fontWeight: "bold" },
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
//   Image,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";
// import * as FileSystem from "expo-file-system";

// const { width } = Dimensions.get("window");
// const A4_HEIGHT = width * 1.414;

// export default function Template3Screen() {
//   const route = useRoute();
//   const { invoiceData } = route.params;

//   // Safely extract data with fallbacks
//   const safeInvoiceData = invoiceData || {};
//   const safeCompanyData = safeInvoiceData.companyData || {};
//   const safeClient = safeInvoiceData.selectedClient || {};
//   const safeItems = safeInvoiceData.selectedItems || [];
  
//   // Add this function to handle missing values
//   const getSafeValue = (value, defaultValue = "") => {
//     return value !== undefined && value !== null ? value : defaultValue;
//   };

//   // Update all references to use safe values:
//   const companyName = getSafeValue(safeCompanyData.companyName, "Company Name");
//   const clientName = getSafeValue(safeClient.tradeName || safeClient.clientName, "Client Name");
//   const invoiceId = getSafeValue(safeInvoiceData.invoiceId, "N/A");
//   const startDate = getSafeValue(safeInvoiceData.startDate, new Date());
//   const endDate = getSafeValue(safeInvoiceData.endDate, new Date());
//   const subtotal = getSafeValue(safeInvoiceData.subtotal, 0);
//   const total = getSafeValue(safeInvoiceData.total, 0);
//   const discountValue = getSafeValue(safeInvoiceData.discountValue, 0);
//   const discountType = getSafeValue(safeInvoiceData.discountType, "");
//   const shipping = getSafeValue(safeInvoiceData.shipping, false);
//   const shippingAmount = getSafeValue(safeInvoiceData.shippingAmount, 0);
//   const discountAmount = getSafeValue(safeInvoiceData.discountAmount, 0);
//   const selectedPaymentMethod = getSafeValue(safeInvoiceData.selectedPaymentMethod, "");
//   const selectedTerms = getSafeValue(safeInvoiceData.selectedTerms, "");
//   const signatureUri = getSafeValue(safeInvoiceData.signatureUri, "");
//   const title = getSafeValue(safeInvoiceData.title, "Service");
//   const quantity = getSafeValue(safeInvoiceData.quantity, 1);
//   const price = getSafeValue(safeInvoiceData.price, 0);
//   const taxRate = getSafeValue(safeInvoiceData.taxRate, 0);

//   // Currency formatter
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount || 0);
//   };

//   // Get discount display text based on type
//   const getDiscountDisplay = () => {
//     if (!discountValue) return null;

//     if (discountType === "flat") {
//       return `Discount (Flat)`;
//     } else if (discountType === "percent") {
//       return `Discount (${discountValue}%)`;
//     }
//     return `Discount`;
//   };

//   // Check if URI is a web URL
//   const isWebUri = (uri) => {
//     return uri && (uri.startsWith("http://") || uri.startsWith("https://"));
//   };

//   // Convert image to base64 for PDF embedding
//   const convertImageToBase64 = async (uri) => {
//     try {
//       if (!uri) return null;
      
//       if (isWebUri(uri)) {
//         return uri;
//       }
//       const base64 = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       return `data:image/jpeg;base64,${base64}`;
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   // Generate HTML content for PDF
//   const generateHTMLContent = async () => {
//     let companyLogoBase64 = null;
//     let signatureBase64 = null;

//     if (safeCompanyData.logo) {
//       companyLogoBase64 = await convertImageToBase64(safeCompanyData.logo);
//     }

//     if (signatureUri) {
//       signatureBase64 = await convertImageToBase64(signatureUri);
//     }

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Invoice #${invoiceId}</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #333;
//             font-size: 12px;
//           }
//           .page {
//             width: 100%;
//             min-height: ${A4_HEIGHT}px;
//             background-color: white;
//           }
//           .header {
//             background-color: #4A5BFF;
//             color: white;
//             padding: 15px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             height: 80px;
//           }
//           .company-name {
//             font-size: 24px;
//             font-weight: bold;
//           }
//           .company-logo {
//             height: 60px;
//             width: 70px;
//             object-fit: contain;
//             border-radius: 5px;
//           }
//           .sub-header-row {
//             display: flex;
//             flex-direction: row;
//             height: 35px;
//           }
//           .sub-header-black {
//             background-color: #1C1F26;
//             color: white;
//             padding: 10px;
//             font-weight: bold;
//             font-size: 16px;
//             flex: 1;
//             display: flex;
//             align-items: center;
//           }
//           .sub-header-blue {
//             background-color: #8AE0FF;
//             padding: 10px;
//             flex: 2;
//             display: flex;
//             align-items: center;
//             justify-content: flex-end;
//             font-weight: bold;
//             font-size: 14px;
//           }
//           .info-row {
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             padding: 10px;
//             border-bottom: 1px solid #eee;
//           }
//           .client-info, .invoice-info {
//             font-size: 11px;
//           }
//           .section-label {
//             font-weight: bold;
//             margin-bottom: 5px;
//             font-size: 14px;
//           }
//           .bold-text {
//             font-weight: bold;
//             font-size: 12px;
//           }
//           .table-header {
//             display: flex;
//             flex-direction: row;
//             border-bottom: 1px solid #1C1F26;
//             padding: 8px 5px;
//             background-color: #f5f5f5;
//             font-weight: bold;
//             font-size: 10px;
//           }
//           .table-row {
//             display: flex;
//             flex-direction: row;
//             border-bottom: 1px solid #eee;
//             padding: 8px 5px;
//             font-size: 10px;
//           }
//           .cell {
//             text-align: center;
//           }
//           .description-cell {
//             flex: 2;
//             text-align: left;
//           }
//           .qty-cell { flex: 1; }
//           .price-cell { flex: 1.5; }
//           .discount-cell { flex: 1; }
//           .tax-cell { flex: 1; }
//           .amount-cell { flex: 1.5; }
//           .summary {
//             padding: 10px;
//             border-top: 1px solid #1C1F26;
//           }
//           .summary-row {
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             margin-bottom: 5px;
//             font-size: 12px;
//             font-weight: bold;
//           }
//           .total-row {
//             border-top: 1px solid #1C1F26;
//             padding-top: 5px;
//             margin-top: 5px;
//           }
//           .total-label {
//             font-weight: bold;
//             font-size: 16px;
//             color: #4A5BFF;
//           }
//           .total-value {
//             font-weight: bold;
//             font-size: 14px;
//           }
//           .terms {
//             padding: 10px;
//             margin-top: 10px;
//             border-top: 1px solid #eee;
//           }
//           .terms-text {
//             font-size: 11px;
//             margin-top: 5px;
//           }
//           /* ✅ Fixed signature styling */
//           .signature-container {
//             margin-top: 20px;
//             padding: 10px;
//             display: flex;
//             justify-content: flex-end;
//           }
//           .signature-wrapper {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//           }
//           .signature-image {
//             width: 120px;
//             height: 60px;
//             object-fit: contain;
//             margin-bottom: 5px;
//           }
//           .signature-line {
//             width: 150px;
//             border-top: 1px solid #1C1F26;
//             padding-top: 5px;
//             text-align: center;
//             font-weight: bold;
//             font-size: 12px;
//           }
//           .footer-blue {
//             height: 25px;
//             background-color: #4A5BFF;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             margin-top: auto;
//           }
//           .company-address {
//             color: white;
//             font-size: 10px;
//             font-weight: bold;
//           }
//           .footer-sky {
//             height: 25px;
//             background-color: #8AE0FF;
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             align-items: center;
//             padding: 0 10px;
//           }
//           .footer-text {
//             color: black;
//             font-size: 9px;
//             font-weight: bold;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="page">
//           <div class="header">
//             <div class="company-name">${companyName}</div>
//             ${companyLogoBase64 ? `<img src="${companyLogoBase64}" class="company-logo" />` : ""}
//           </div>

//           <div class="sub-header-row">
//             <div class="sub-header-black">INVOICE</div>
//             <div class="sub-header-blue">#${invoiceId}</div>
//           </div>

//           <div class="info-row">
//             <div class="client-info">
//               <div class="section-label">To:</div>
//               <div class="bold-text">${clientName}</div>
//               <div>${getSafeValue(safeClient.address)}</div>
//               <div>${getSafeValue(safeClient.email)}</div>
//               <div>${getSafeValue(safeClient.phone)}</div>
//               ${safeClient.taxNo ? `<div>Tax No: ${safeClient.taxNo}</div>` : ''}
//             </div>
//             <div class="invoice-info">
//               <div><span class="bold-text">Invoice Date: </span>${new Date(startDate).toLocaleDateString()}</div>
//               <div><span class="bold-text">Due Date: </span>${new Date(endDate).toLocaleDateString()}</div>
//               ${selectedPaymentMethod ? `<div><span class="bold-text">Payment Method: </span>${selectedPaymentMethod}</div>` : ''}
//             </div>
//           </div>

//           <div class="table-header">
//             <div class="cell description-cell">Description</div>
//             <div class="cell qty-cell">Qty</div>
//             <div class="cell price-cell">Price</div>
//             <div class="cell discount-cell">Discount</div>
//             <div class="cell tax-cell">Tax</div>
//             <div class="cell amount-cell">Amount</div>
//           </div>

//           ${safeItems && safeItems.length > 0
//         ? safeItems
//           .map(
//             (item) => `
//                   <div class="table-row">
//                     <div class="cell description-cell">${getSafeValue(item.itemName)}</div>
//                     <div class="cell qty-cell">${getSafeValue(item.quantity, 1)}</div>
//                     <div class="cell price-cell">${formatCurrency(item.itemPrice)}</div>
//                     <div class="cell discount-cell">${item.discount
//                 ? getSafeValue(item.discountType) === "Percentage"
//                   ? `${item.discount}%`
//                   : `₹${item.discount}`
//                 : "0%"
//               }</div>
//                     <div class="cell tax-cell">${getSafeValue(item.taxRate, 0)}%</div>
//                     <div class="cell amount-cell">${formatCurrency(getSafeValue(item.amount, 0))}</div>
//                   </div>
//                 `
//           )
//           .join("")
//         : `
//                 <div class="table-row">
//                   <div class="cell description-cell">${title}</div>
//                   <div class="cell qty-cell">${quantity}</div>
//                   <div class="cell price-cell">${formatCurrency(price)}</div>
//                   <div class="cell discount-cell">${discountValue
//           ? discountType === "flat"
//             ? `₹${discountValue}`
//             : `${discountValue}%`
//           : "0%"
//         }</div>
//                   <div class="cell tax-cell">${taxRate}%</div>
//                   <div class="cell amount-cell">${formatCurrency(total)}</div>
//                 </div>
//               `
//       }

//           <div class="summary">
//             <div class="summary-row">
//               <div>Sub total</div>
//               <div>${formatCurrency(subtotal)}</div>
//             </div>
//             ${discountValue
//         ? `<div class="summary-row"><div>${getDiscountDisplay()}</div><div>-${formatCurrency(discountAmount)}</div></div>`
//         : ""
//       }
//             ${shipping
//         ? `<div class="summary-row"><div>Shipping</div><div>+${formatCurrency(shippingAmount)}</div></div>`
//         : ""
//       }
//             <div class="summary-row total-row">
//               <div class="total-label">Total</div>
//               <div class="total-value">${formatCurrency(total)}</div>
//             </div>
//           </div>

//           ${selectedTerms
//         ? `<div class="terms"><div class="section-label">Terms & Conditions:</div><div class="terms-text">${selectedTerms}</div></div>`
//         : ""
//       }

//           <!-- Signature section - fixed -->
//           <div class="signature-container">
//           <div class="signature-wrapper">
//               ${signatureBase64 ? `<img src="${signatureBase64}" class="signature-image" />` : ""}
//               <div class="signature-line">Approval Signature</div>
//           </div>
//           </div>
          

//           <div class="footer-blue">
//             <div class="company-address">${getSafeValue(safeCompanyData.address)}</div>
//           </div>
//           <div class="footer-sky">
//             <div class="footer-text">Tax No: ${getSafeValue(safeCompanyData.taxNo)}</div>
//             <div class="footer-text">${getSafeValue(safeCompanyData.email)}</div>
//             <div class="footer-text">${getSafeValue(safeCompanyData.phone)}</div>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   // Share handler
//   const handleShare = async () => {
//     try {
//       const htmlContent = await generateHTMLContent();
//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         width: width - 20,
//         height: A4_HEIGHT,
//       });

//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, {
//           mimeType: "application/pdf",
//           dialogTitle: "Share Invoice",
//           UTI: "com.adobe.pdf",
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
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>{companyName}</Text>
//           {safeCompanyData.logo && (
//             <Image
//               source={{ uri: safeCompanyData.logo }}
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
//             <Text style={styles.invoiceNo}>#{invoiceId}</Text>
//           </View>
//         </View>

//         {/* Info */}
//         <View style={styles.infoRow}>
//           <View style={styles.clientInfo}>
//             <Text style={styles.sectionLabel}>To:</Text>
//             <Text style={styles.boldText}>
//               {clientName}
//             </Text>
//             <Text style={styles.infoText}>{getSafeValue(safeClient.address)}</Text>
//             <Text style={styles.infoText}>{getSafeValue(safeClient.email)}</Text>
//             <Text style={styles.infoText}>{getSafeValue(safeClient.phone)}</Text>
//             {safeClient.taxNo && (
//               <Text style={styles.infoText}>Tax No: {safeClient.taxNo}</Text>
//             )}
//           </View>

//           <View style={styles.invoiceInfo}>
//             <Text style={styles.infoText}>
//               <Text style={styles.boldText}>Invoice Date: </Text>
//               {new Date(startDate).toLocaleDateString()}
//             </Text>
//             <Text style={styles.infoText}>
//               <Text style={styles.boldText}>Due Date: </Text>
//               {new Date(endDate).toLocaleDateString()}
//             </Text>
//             {selectedPaymentMethod && (
//               <Text style={styles.infoText}>
//                 <Text style={styles.boldText}>Payment Method: </Text>
//                 {selectedPaymentMethod}
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* Table */}
//         <View style={styles.tableHeader}>
//           <Text style={[styles.cell, styles.descriptionCell]}>Description</Text>
//           <Text style={[styles.cell, styles.qtyCell]}>Qty</Text>
//           <Text style={[styles.cell, styles.priceCell]}>Price</Text>
//           <Text style={[styles.cell, styles.discountCell]}>Discount</Text>
//           <Text style={[styles.cell, styles.taxCell]}>Tax</Text>
//           <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
//         </View>

//         {safeItems && safeItems.length > 0 ? (
//           safeItems.map((item, i) => (
//             <View key={i} style={styles.tableRow}>
//               <Text style={[styles.cell1, styles.descriptionCell]}>{getSafeValue(item.itemName)}</Text>
//               <Text style={[styles.cell1, styles.qtyCell]}>{getSafeValue(item.quantity, 1)}</Text>
//               <Text style={[styles.cell1, styles.priceCell]}>{formatCurrency(item.itemPrice)}</Text>
//               <Text style={[styles.cell1, styles.discountCell]}>
//                 {item.discount
//                   ? getSafeValue(item.discountType) === "Percentage"
//                     ? `${item.discount}%`
//                     : `₹${item.discount}`
//                   : "0%"}
//               </Text>
//               <Text style={[styles.cell1, styles.taxCell]}>{getSafeValue(item.taxRate, 0)}%</Text>
//               <Text style={[styles.cell1, styles.amountCell]}>
//                 {formatCurrency(getSafeValue(item.amount, 0))}
//               </Text>
//             </View>
//           ))
//         ) : (
//           <View style={styles.tableRow}>
//             <Text style={[styles.cell, styles.descriptionCell]}>
//               {title}
//             </Text>
//             <Text style={[styles.cell, styles.qtyCell]}>{quantity}</Text>
//             <Text style={[styles.cell, styles.priceCell]}>
//               {formatCurrency(price)}
//             </Text>
//             <Text style={[styles.cell, styles.discountCell]}>
//               {discountValue
//                 ? discountType === "flat"
//                   ? `₹${discountValue}`
//                   : `${discountValue}%`
//                 : "0%"}
//             </Text>
//             <Text style={[styles.cell, styles.taxCell]}>{taxRate}%</Text>
//             <Text style={[styles.cell, styles.amountCell]}>
//               {formatCurrency(total)}
//             </Text>
//           </View>
//         )}

//         {/* Summary */}
//         <View style={styles.summary}>
//           <View style={styles.summaryRow}>
//             <Text>Sub total</Text>
//             <Text>{formatCurrency(subtotal)}</Text>
//           </View>
//           {discountValue && (
//             <View style={styles.summaryRow}>
//               <Text>{getDiscountDisplay()}</Text>
//               <Text>-{formatCurrency(discountAmount)}</Text>
//             </View>
//           )}
//           {shipping && (
//             <View style={styles.summaryRow}>
//               <Text>Shipping</Text>
//               <Text>+{formatCurrency(shippingAmount)}</Text>
//             </View>
//           )}
//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
//           </View>
//         </View>

//         {/* Terms */}
//         {selectedTerms && (
//           <View style={styles.terms}>
//             <Text style={styles.sectionLabel}>Terms & Conditions:</Text>
//             <Text style={styles.termsText}>{selectedTerms}</Text>
//           </View>
//         )}

//         {/* Signature */}
//         <View style={styles.signature}>
//           {signatureUri && (
//             <Image
//               source={{ uri: signatureUri }}
//               style={[styles.signatureImage, { tintColor: "black" }]}
//               resizeMode="contain"
//             />
//           )}
//           <Text style={styles.signatureText}>Approval Signature</Text>
//         </View>

//         {/* Footer */}
//         <View style={styles.footerBlue}>
//           <Text style={styles.companyAddress}>{getSafeValue(safeCompanyData.address)}</Text>
//         </View>
//         <View style={styles.footerSky}>
//           <Text style={styles.footerText}>Tax No: {getSafeValue(safeCompanyData.taxNo)}</Text>
//           <Text style={styles.footerText}>{getSafeValue(safeCompanyData.email)}</Text>
//           <Text style={styles.footerText}>{getSafeValue(safeCompanyData.phone)}</Text>
//         </View>
//       </View>

//       {/* Share button */}
//       <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//         <Ionicons name="share-outline" size={20} color="white" />
//         <Text style={styles.shareButtonText}>Share</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // ✅ Styles
// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 10, alignItems: "center", backgroundColor: "#f5f5f5" },
//   page: { width: width - 20, minHeight: A4_HEIGHT, backgroundColor: "white", elevation: 5, paddingBottom: 10 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#4A5BFF" },
//   headerText: { fontSize: 24, fontWeight: "bold", color: "white" },
//   companyLogo: { height: 60, width: 70, borderRadius: 5 },
//   subHeaderRow: { flexDirection: "row", height: 35 },
//   subHeaderBlack: { flex: 1, backgroundColor: "#1C1F26", justifyContent: "center", paddingHorizontal: 10 },
//   subHeaderBlue: { flex: 2, backgroundColor: "#8AE0FF", justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 10 },
//   subHeaderTitle: { fontSize: 16, fontWeight: "bold", color: "white" },
//   invoiceNo: { fontSize: 14, fontWeight: "bold" },
//   infoRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   clientInfo: { flex: 1 },
//   invoiceInfo: { flex: 1, alignItems: "flex-end" },
//   sectionLabel: { fontWeight: "bold", marginBottom: 5, fontSize: 14 },
//   boldText: { fontWeight: "bold", fontSize: 12 },
//   infoText: { fontSize: 11 },
//   tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#1C1F26", paddingVertical: 8, backgroundColor: "#f5f5f5" },
//   tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee", paddingVertical: 8 },
//   cell: { textAlign: "center", fontSize: 10 },
//   cell1: { textAlign: "center", fontSize: 10 },
//   descriptionCell: { flex: 2, textAlign: "left" },
//   qtyCell: { flex: 1 },
//   priceCell: { flex: 1.5 },
//   discountCell: { flex: 1 },
//   taxCell: { flex: 1 },
//   amountCell: { flex: 1.5 },
//   summary: { padding: 10, borderTopWidth: 1, borderTopColor: "#1C1F26" },
//   summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5, fontSize: 12, fontWeight: "bold" },
//   totalRow: { borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, marginTop: 5 },
//   totalLabel: { fontWeight: "bold", fontSize: 16, color: "#4A5BFF" },
//   totalValue: { fontWeight: "bold", fontSize: 14 },
//   terms: { padding: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: "#eee" },
//   termsText: { fontSize: 11, marginTop: 5 },
//   signature: { alignItems: "flex-end", padding: 10, marginTop: 20, minHeight: 90, justifyContent: "flex-end" },
//   signatureImage: { width: 120, height: 60, marginBottom: 5 },
//   signatureText: { fontWeight: "bold", fontSize: 12, borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, width: 150, textAlign: "center" },
//   footerBlue: { height: 25, backgroundColor: "#4A5BFF", justifyContent: "center", alignItems: "center" },
//   companyAddress: { color: "white", fontSize: 10, fontWeight: "bold" },
//   footerSky: { height: 25, backgroundColor: "#8AE0FF", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 },
//   footerText: { color: "black", fontSize: 9, fontWeight: "bold" },
//   shareButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#4A5BFF", padding: 10, borderRadius: 5, marginTop: 20 },
//   shareButtonText: { color: "white", marginLeft: 5, fontWeight: "bold" },
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

  // Safely extract data with fallbacks
  const safeInvoiceData = invoiceData || {};
  const safeCompanyData = safeInvoiceData.companyData || {};
  const safeClient = safeInvoiceData.selectedClient || {};
  const safeItems = safeInvoiceData.selectedItems || [];

  // Add this function to handle missing values
  const getSafeValue = (value, defaultValue = "") => {
    return value !== undefined && value !== null ? value : defaultValue;
  };

  // Update all references to use safe values
  const companyName = getSafeValue(safeCompanyData.companyName, "Company Name");
  const clientName = getSafeValue(safeClient.tradeName || safeClient.clientName, "Client Name");
  const invoiceId = getSafeValue(safeInvoiceData.invoiceId, "N/A");
  const startDate = getSafeValue(safeInvoiceData.startDate, new Date());
  const endDate = getSafeValue(safeInvoiceData.endDate, new Date());
  const subtotal = getSafeValue(safeInvoiceData.subtotal, 0);
  const total = getSafeValue(safeInvoiceData.total, 0);
  const discountValue = getSafeValue(safeInvoiceData.discountValue, 0);
  const discountType = getSafeValue(safeInvoiceData.discountType, "");
  const shipping = getSafeValue(safeInvoiceData.shipping, false);
  const shippingAmount = getSafeValue(safeInvoiceData.shippingAmount, 0);
  const discountAmount = getSafeValue(safeInvoiceData.discountAmount, 0);
  const selectedPaymentMethod = getSafeValue(safeInvoiceData.selectedPaymentMethod, "");
  const selectedTerms = getSafeValue(safeInvoiceData.selectedTerms, "");
  const signatureUri = getSafeValue(safeInvoiceData.signatureUri, "");
  const title = getSafeValue(safeInvoiceData.title, "Service");
  const quantity = getSafeValue(safeInvoiceData.quantity, 1);
  const price = getSafeValue(safeInvoiceData.price, 0);
  const taxRate = getSafeValue(safeInvoiceData.taxRate, 0);

  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Get discount display text based on type
  const getDiscountDisplay = () => {
    if (!discountValue) return null;
    if (discountType === "flat") {
      return `Discount (Flat)`;
    } else if (discountType === "percent") {
      return `Discount (${discountValue}%)`;
    }
    return `Discount`;
  };

  // Check if URI is a web URL
  const isWebUri = (uri) => {
    return uri && (uri.startsWith("http://") || uri.startsWith("https://"));
  };

  // Convert image to base64 for PDF embedding
  const convertImageToBase64 = async (uri) => {
    try {
      if (!uri) return null;

      // Check if the URI is already a base64 data URL
      if (uri.startsWith("data:image/")) {
        return uri; // Return the base64 data URL as is
      }

      // Check if URI is a web URL
      if (isWebUri(uri)) {
        return uri;
      }

      // Assume it's a local file URI
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Determine MIME type based on file extension (optional, for robustness)
      const extension = uri.split(".").pop().toLowerCase();
      const mimeType = extension === "png" ? "image/png" : "image/jpeg";
      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  // Generate HTML content for PDF
  const generateHTMLContent = async () => {
    let companyLogoBase64 = null;
    let signatureBase64 = null;

    if (safeCompanyData.logo) {
      companyLogoBase64 = await convertImageToBase64(safeCompanyData.logo);
    }
    if (signatureUri) {
      signatureBase64 = await convertImageToBase64(signatureUri);
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice #${invoiceId}</title>
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
            <div class="company-name">${companyName}</div>
            ${companyLogoBase64 ? `<img src="${companyLogoBase64}" class="company-logo" />` : ""}
          </div>
          <div class="sub-header-row">
            <div class="sub-header-black">INVOICE</div>
            <div class="sub-header-blue">#${invoiceId}</div>
          </div>
          <div class="info-row">
            <div class="client-info">
              <div class="section-label">To:</div>
              <div class="bold-text">${clientName}</div>
              <div>${getSafeValue(safeClient.address)}</div>
              <div>${getSafeValue(safeClient.email)}</div>
              <div>${getSafeValue(safeClient.phone)}</div>
              ${safeClient.taxNo ? `<div>Tax No: ${safeClient.taxNo}</div>` : ''}
            </div>
            <div class="invoice-info">
              <div><span class="bold-text">Invoice Date: </span>${new Date(startDate).toLocaleDateString()}</div>
              <div><span class="bold-text">Due Date: </span>${new Date(endDate).toLocaleDateString()}</div>
              ${selectedPaymentMethod ? `<div><span class="bold-text">Payment Method: </span>${selectedPaymentMethod}</div>` : ''}
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
          ${safeItems && safeItems.length > 0
            ? safeItems
                .map(
                  (item) => `
                    <div class="table-row">
                      <div class="cell description-cell">${getSafeValue(item.itemName)}</div>
                      <div class="cell qty-cell">${getSafeValue(item.quantity, 1)}</div>
                      <div class="cell price-cell">${formatCurrency(item.itemPrice)}</div>
                      <div class="cell discount-cell">${
                        item.discount
                          ? getSafeValue(item.discountType) === "Percentage"
                            ? `${item.discount}%`
                            : `₹${item.discount}`
                          : "0%"
                      }</div>
                      <div class="cell tax-cell">${getSafeValue(item.taxRate, 0)}%</div>
                      <div class="cell amount-cell">${formatCurrency(getSafeValue(item.amount, 0))}</div>
                    </div>
                  `
                )
                .join("")
            : `
                  <div class="table-row">
                    <div class="cell description-cell">${title}</div>
                    <div class="cell qty-cell">${quantity}</div>
                    <div class="cell price-cell">${formatCurrency(price)}</div>
                    <div class="cell discount-cell">${
                      discountValue
                        ? discountType === "flat"
                          ? `₹${discountValue}`
                          : `${discountValue}%`
                        : "0%"
                    }</div>
                    <div class="cell tax-cell">${taxRate}%</div>
                    <div class="cell amount-cell">${formatCurrency(total)}</div>
                  </div>
                `}
          <div class="summary">
            <div class="summary-row">
              <div>Sub total</div>
              <div>${formatCurrency(subtotal)}</div>
            </div>
            ${discountValue
              ? `<div class="summary-row"><div>${getDiscountDisplay()}</div><div>-${formatCurrency(discountAmount)}</div></div>`
              : ""}
            ${shipping
              ? `<div class="summary-row"><div>Shipping</div><div>+${formatCurrency(shippingAmount)}</div></div>`
              : ""}
            <div class="summary-row total-row">
              <div class="total-label">Total</div>
              <div class="total-value">${formatCurrency(total)}</div>
            </div>
          </div>
          ${selectedTerms
            ? `<div class="terms"><div class="section-label">Terms & Conditions:</div><div class="terms-text">${selectedTerms}</div></div>`
            : ""}
          <div class="signature-container">
            <div class="signature-wrapper">
              ${signatureBase64 ? `<img src="${signatureBase64}" class="signature-image" />` : ""}
              <div class="signature-line">Approval Signature</div>
            </div>
          </div>
          <div class="footer-blue">
            <div class="company-address">${getSafeValue(safeCompanyData.address)}</div>
          </div>
          <div class="footer-sky">
            <div class="footer-text">Tax No: ${getSafeValue(safeCompanyData.taxNo)}</div>
            <div class="footer-text">${getSafeValue(safeCompanyData.email)}</div>
            <div class="footer-text">${getSafeValue(safeCompanyData.phone)}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Separated share logic
  const shareInvoice = async () => {
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
          <Text style={styles.headerText}>{companyName}</Text>
          {safeCompanyData.logo && (
            <Image
              source={{ uri: safeCompanyData.logo }}
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
            <Text style={styles.invoiceNo}>#{invoiceId}</Text>
          </View>
        </View>
        {/* Info */}
        <View style={styles.infoRow}>
          <View style={styles.clientInfo}>
            <Text style={styles.sectionLabel}>To:</Text>
            <Text style={styles.boldText}>{clientName}</Text>
            <Text style={styles.infoText}>{getSafeValue(safeClient.address)}</Text>
            <Text style={styles.infoText}>{getSafeValue(safeClient.email)}</Text>
            <Text style={styles.infoText}>{getSafeValue(safeClient.phone)}</Text>
            {safeClient.taxNo && (
              <Text style={styles.infoText}>Tax No: {safeClient.taxNo}</Text>
            )}
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Invoice Date: </Text>
              {new Date(startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Due Date: </Text>
              {new Date(endDate).toLocaleDateString()}
            </Text>
            {selectedPaymentMethod && (
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Payment Method: </Text>
                {selectedPaymentMethod}
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
        {safeItems && safeItems.length > 0 ? (
          safeItems.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.cell1, styles.descriptionCell]}>{getSafeValue(item.itemName)}</Text>
              <Text style={[styles.cell1, styles.qtyCell]}>{getSafeValue(item.quantity, 1)}</Text>
              <Text style={[styles.cell1, styles.priceCell]}>{formatCurrency(item.itemPrice)}</Text>
              <Text style={[styles.cell1, styles.discountCell]}>
                {item.discount
                  ? getSafeValue(item.discountType) === "Percentage"
                    ? `${item.discount}%`
                    : `₹${item.discount}`
                  : "0%"}
              </Text>
              <Text style={[styles.cell1, styles.taxCell]}>{getSafeValue(item.taxRate, 0)}%</Text>
              <Text style={[styles.cell1, styles.amountCell]}>
                {formatCurrency(getSafeValue(item.amount, 0))}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.descriptionCell]}>{title}</Text>
            <Text style={[styles.cell, styles.qtyCell]}>{quantity}</Text>
            <Text style={[styles.cell, styles.priceCell]}>{formatCurrency(price)}</Text>
            <Text style={[styles.cell, styles.discountCell]}>
              {discountValue
                ? discountType === "flat"
                  ? `₹${discountValue}`
                  : `${discountValue}%`
                : "0%"}
            </Text>
            <Text style={[styles.cell, styles.taxCell]}>{taxRate}%</Text>
            <Text style={[styles.cell, styles.amountCell]}>{formatCurrency(total)}</Text>
          </View>
        )}
        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Sub total</Text>
            <Text>{formatCurrency(subtotal)}</Text>
          </View>
          {discountValue && (
            <View style={styles.summaryRow}>
              <Text>{getDiscountDisplay()}</Text>
              <Text>-{formatCurrency(discountAmount)}</Text>
            </View>
          )}
          {shipping && (
            <View style={styles.summaryRow}>
              <Text>Shipping</Text>
              <Text>+{formatCurrency(shippingAmount)}</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>
        {/* Terms */}
        {selectedTerms && (
          <View style={styles.terms}>
            <Text style={styles.sectionLabel}>Terms & Conditions:</Text>
            <Text style={styles.termsText}>{selectedTerms}</Text>
          </View>
        )}
        {/* Signature */}
        <View style={styles.signature}>
          {signatureUri && (
            <Image
              source={{ uri: signatureUri }}
              style={[styles.signatureImage, { tintColor: "black" }]}
              resizeMode="contain"
            />
          )}
          <Text style={styles.signatureText}>Approval Signature</Text>
        </View>
        {/* Footer */}
        <View style={styles.footerBlue}>
          <Text style={styles.companyAddress}>{getSafeValue(safeCompanyData.address)}</Text>
        </View>
        <View style={styles.footerSky}>
          <Text style={styles.footerText}>Tax No: {getSafeValue(safeCompanyData.taxNo)}</Text>
          <Text style={styles.footerText}>{getSafeValue(safeCompanyData.email)}</Text>
          <Text style={styles.footerText}>{getSafeValue(safeCompanyData.phone)}</Text>
        </View>
      </View>
      {/* Share button */}
      <TouchableOpacity style={styles.shareButton} onPress={shareInvoice}>
        <Ionicons name="share-outline" size={20} color="white" />
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
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