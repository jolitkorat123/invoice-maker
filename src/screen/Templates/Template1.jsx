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
//   const { invoiceData } = route.params || {};

//   // Safely extract data with fallbacks
//   const safeInvoiceData = invoiceData || {};
//   const safeCompanyData = safeInvoiceData.companyData || {};
//   const safeClient = safeInvoiceData.selectedClient || {};
//   const safeItems = safeInvoiceData.selectedItems || [];

//   // Helpers
//   const getSafeValue = (value, defaultValue = "") =>
//     value !== undefined && value !== null ? value : defaultValue;

//   const companyName = getSafeValue(safeCompanyData.companyName, "Company Name");
//   const clientName = getSafeValue(safeClient.tradeName || safeClient.clientName, "Client Name");
//   const invoiceId = getSafeValue(safeInvoiceData.invoiceId, "0001");
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

//   const formatCurrency = (amount) => {
//     try {
//       return new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency: "INR",
//         minimumFractionDigits: 2,
//       }).format(amount || 0);
//     } catch (e) {
//       // Fallback
//       return `₹${Number(amount || 0).toFixed(2)}`;
//     }
//   };

//   const getDiscountDisplay = () => {
//     if (!discountValue) return null;
//     if (discountType === "flat") return `Discount (Flat)`;
//     if (discountType === "percent") return `Discount (${discountValue}%)`;
//     return `Discount`;
//   };

//   const isWebUri = (uri) =>
//     uri && (uri.startsWith("http://") || uri.startsWith("https://"));

//   // Convert local file URI to base64 for embedding in PDF (or pass web URI unchanged)
//   const convertImageToBase64 = async (uri) => {
//     try {
//       if (!uri) return null;
//       if (uri.startsWith("data:image/")) return uri;
//       if (isWebUri(uri)) return uri;
//       // assume local file uri
//       const base64 = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       const extension = uri.split(".").pop().toLowerCase();
//       const mimeType = extension === "png" ? "image/png" : "image/jpeg";
//       return `data:${mimeType};base64,${base64}`;
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   // Generate HTML content (yellow header + red accent design)
//   const generateHTMLContent = async () => {
//     let companyLogoBase64 = null;
//     let signatureBase64 = null;

//     if (safeCompanyData.logo) {
//       companyLogoBase64 = await convertImageToBase64(safeCompanyData.logo);
//     }
//     if (signatureUri) {
//       signatureBase64 = await convertImageToBase64(signatureUri);
//     }

//     // small helper inside template to render items if none provided
//     const itemsHtml =
//       safeItems && safeItems.length > 0
//         ? safeItems
//             .map(
//               (item, i) => `
//             <tr>
//               <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${i + 1}</td>
//               <td style="padding:10px;border-bottom:1px solid #eee;">${getSafeValue(item.itemName, item.description || "")}</td>
//               <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${getSafeValue(item.quantity, 1)}</td>
//               <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(item.itemPrice || item.rate || 0)}</td>
//               <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(getSafeValue(item.amount, (item.itemPrice || item.rate || 0) * (item.quantity || 1)))}</td>
//             </tr>`
//             )
//             .join("")
//         : `
//           <tr>
//             <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">1</td>
//             <td style="padding:10px;border-bottom:1px solid #eee;">${title}</td>
//             <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${quantity}</td>
//             <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(price)}</td>
//             <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(total)}</td>
//           </tr>
//         `;

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Invoice #${invoiceId}</title>
//       <style>
//         @media print {
//           @page { margin: 0; }
//           body { margin: 0; }
//         }
//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 0;
//           color: #333;
//           font-size: 12px;
//           background: #fff;
//         }
//         .page {
//           width: 100%;
//           min-height: ${A4_HEIGHT}px;
//           display: flex;
//           flex-direction: column;
//           background: white;
//         }
//         /* Header: yellow with red accent on left */
//         .header {
//           position: relative;
//           background: linear-gradient(90deg, #f6c600 0%, #f7d94c 100%);
//           padding: 36px 40px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }
//         .red-accent {
//           position: absolute;
//           top: 0;
//           left: 0;
//           background: #d62828;
//           width: 170px;
//           height: 100%;
//           clip-path: polygon(0 0, 100% 0, 60% 100%, 0 100%);
//           z-index: 1;
//         }
//         .header .left, .header .right {
//           position: relative;
//           z-index: 2;
//         }
//         .company-name {
//           font-size: 28px;
//           font-weight: 700;
//           margin: 0 0 6px 0;
//         }
//         .company-address {
//           margin: 0;
//           font-size: 12px;
//         }
//         .invoice-meta {
//           text-align: right;
//         }
//         .invoice-meta h2 {
//           margin: 0;
//           font-size: 22px;
//           letter-spacing: 1px;
//         }
//         .invoice-meta p {
//           margin: 4px 0;
//           font-size: 13px;
//         }

//         .title-bar {
//           background: #fdf4cc;
//           padding: 16px 20px;
//           text-align: center;
//           font-weight: 600;
//           font-size: 20px;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }

//         .info-row {
//           display: flex;
//           justify-content: space-between;
//           padding: 22px 40px;
//           gap: 20px;
//         }
//         .info-col { width: 48%; }
//         .info-col h4 {
//           margin: 0 0 6px 0;
//           font-size: 14px;
//           border-bottom: 2px solid #f6c600;
//           display: inline-block;
//         }
//         .info-col p { margin: 4px 0; font-size: 13px; }

//         table { width: calc(100% - 80px); margin: 0 40px; border-collapse: collapse; }
//         thead th {
//           background: #f6c600;
//           padding: 12px;
//           font-weight: 700;
//           font-size: 13px;
//           text-transform: uppercase;
//           border-bottom: 2px solid #ddd;
//         }
//         tbody td {
//           padding: 10px;
//           font-size: 13px;
//           border-bottom: 1px solid #eee;
//         }
//         tbody tr:nth-child(even) { background: #faf9f6; }

//         .totals {
//           padding: 20px 40px 40px 40px;
//           display: flex;
//           justify-content: flex-end;
//         }
//         .totals table { width: 320px; border-collapse: collapse; }
//         .totals td { padding: 8px; font-size: 13px; }
//         .totals tr.total-row td { font-weight: 800; border-top: 2px solid #222; font-size: 16px; }

//         .terms {
//           padding: 0 40px 20px 40px;
//           font-size: 12px;
//         }

//         .signature {
//           display: flex;
//           justify-content: flex-end;
//           padding: 10px 40px 0 40px;
//           align-items: center;
//           gap: 12px;
//         }
//         .signature img { width: 150px; height: auto; object-fit: contain; filter: grayscale(100%) contrast(200%) brightness(0); }

//         .footer {
//           margin-top: auto;
//           background: #d62828;
//           color: #fff;
//           padding: 12px 40px;
//           display: flex;
//           justify-content: space-between;
//           font-weight: 700;
//           font-size: 12px;
//         }

//       </style>
//     </head>
//     <body>
//       <div class="page">
//         <div class="header">
//           <div class="red-accent"></div>
//           <div class="left">
//             ${companyLogoBase64 ? `<img src="${companyLogoBase64}" style="width:90px;height:auto;border-radius:6px;object-fit:contain;margin-bottom:8px;" />` : ""}
//             <div class="company-name">${companyName}</div>
//             <div class="company-address">${getSafeValue(safeCompanyData.address)}</div>
//           </div>
//           <div class="right invoice-meta">
//             <h2>INVOICE</h2>
//             <p><strong>Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
//             <p><strong>Invoice #:</strong> ${invoiceId}</p>
//             ${selectedPaymentMethod ? `<p><strong>Payment:</strong> ${selectedPaymentMethod}</p>` : ""}
//           </div>
//         </div>

//         <div class="title-bar">Tax Invoice</div>

//         <div class="info-row">
//           <div class="info-col">
//             <h4>Bill To:</h4>
//             <p><strong>${clientName}</strong></p>
//             <p>${getSafeValue(safeClient.address)}</p>
//             <p>${getSafeValue(safeClient.email)}</p>
//             <p>${getSafeValue(safeClient.phone)}</p>
//             ${safeClient.taxNo ? `<p>Tax No: ${safeClient.taxNo}</p>` : ""}
//           </div>
//           <div class="info-col">
//             <h4>Details:</h4>
//             <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
//             <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</p>
//             ${selectedTerms ? `<p><strong>Terms:</strong> ${selectedTerms}</p>` : ""}
//           </div>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th style="width:6%;">#</th>
//               <th style="width:54%;">Description</th>
//               <th style="width:12%;">Qty</th>
//               <th style="width:14%;">Rate</th>
//               <th style="width:14%;">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${itemsHtml}
//           </tbody>
//         </table>

//         <div class="totals">
//           <table>
//             <tr><td>Subtotal:</td><td style="text-align:right;">${formatCurrency(subtotal)}</td></tr>
//             ${discountValue ? `<tr><td>${getDiscountDisplay()}</td><td style="text-align:right;">-${formatCurrency(discountAmount)}</td></tr>` : ""}
//             ${shipping ? `<tr><td>Shipping</td><td style="text-align:right;">${formatCurrency(shippingAmount)}</td></tr>` : ""}
//             <tr class="total-row"><td>Total:</td><td style="text-align:right;">${formatCurrency(total)}</td></tr>
//           </table>
//         </div>

//         ${selectedTerms ? `<div class="terms"><strong>Terms & Conditions:</strong><div>${selectedTerms}</div></div>` : ""}

//         <div class="signature">
//           ${signatureBase64 ? `<img src="${signatureBase64}" alt="signature" />` : ""}
//           <div style="text-align:center;font-weight:700;border-top:1px solid #111;width:180px;padding-top:6px;">Approval Signature</div>
//         </div>

//         <div class="footer">
//           <div>${getSafeValue(safeCompanyData.address)}</div>
//           <div>Tax No: ${getSafeValue(safeCompanyData.taxNo)} | ${getSafeValue(safeCompanyData.email)} | ${getSafeValue(safeCompanyData.phone)}</div>
//         </div>
//       </div>
//     </body>
//     </html>
//     `;
//   };

//   // Share / Print using generateHTMLContent
//   const shareInvoice = async () => {
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

//   // Render on-screen view with the same yellow/red style
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.page}>
//         {/* Header (yellow + red accent) */}
//         <View style={styles.header}>
//           <View style={styles.redAccent} />
//           <View style={styles.headerLeft}>
//             {safeCompanyData.logo ? (
//               <Image source={{ uri: safeCompanyData.logo }} style={styles.companyLogo} resizeMode="contain" />
//             ) : null}
//             <Text style={styles.companyName}>{companyName}</Text>
//             <Text style={styles.companyAddressText}>{getSafeValue(safeCompanyData.address)}</Text>
//           </View>
//           <View style={styles.headerRight}>
//             <Text style={styles.invoiceTitleLarge}>INVOICE</Text>
//             <Text style={styles.metaText}><Text style={styles.metaBold}>Date: </Text>{new Date(startDate).toLocaleDateString()}</Text>
//             <Text style={styles.metaText}><Text style={styles.metaBold}>Invoice #: </Text>{invoiceId}</Text>
//             {selectedPaymentMethod ? <Text style={styles.metaText}><Text style={styles.metaBold}>Payment: </Text>{selectedPaymentMethod}</Text> : null}
//           </View>
//         </View>

//         <View style={styles.titleBar}>
//           <Text style={styles.titleBarText}>Tax Invoice</Text>
//         </View>

//         <View style={styles.infoRow}>
//           <View style={styles.infoCol}>
//             <Text style={styles.infoHeader}>Bill To:</Text>
//             <Text style={styles.infoName}>{clientName}</Text>
//             <Text style={styles.infoText}>{getSafeValue(safeClient.address)}</Text>
//             <Text style={styles.infoText}>{getSafeValue(safeClient.email)}</Text>
//             <Text style={styles.infoText}>{getSafeValue(safeClient.phone)}</Text>
//             {safeClient.taxNo ? <Text style={styles.infoText}>Tax No: {safeClient.taxNo}</Text> : null}
//           </View>
//           <View style={styles.infoCol}>
//             <Text style={styles.infoHeader}>Details:</Text>
//             <Text style={styles.infoText}><Text style={styles.metaBold}>Start Date: </Text>{new Date(startDate).toLocaleDateString()}</Text>
//             <Text style={styles.infoText}><Text style={styles.metaBold}>End Date: </Text>{new Date(endDate).toLocaleDateString()}</Text>
//             {selectedTerms ? <Text style={[styles.infoText, {marginTop:6}]}><Text style={styles.metaBold}>Terms: </Text>{selectedTerms}</Text> : null}
//           </View>
//         </View>

//         {/* Table header */}
//         <View style={styles.tableHeader}>
//           <Text style={[styles.cell, styles.thSmall]}>#</Text>
//           <Text style={[styles.cell, styles.thDescription]}>Description</Text>
//           <Text style={[styles.cell, styles.thQty]}>Qty</Text>
//           <Text style={[styles.cell, styles.thRate]}>Rate</Text>
//           <Text style={[styles.cell, styles.thAmount]}>Amount</Text>
//         </View>

//         {/* Table rows */}
//         {safeItems && safeItems.length > 0 ? (
//           safeItems.map((item, i) => (
//             <View key={i} style={styles.tableRow}>
//               <Text style={[styles.cell1, styles.thSmall]}>{i + 1}</Text>
//               <Text style={[styles.cell1, styles.thDescription]}>{getSafeValue(item.itemName, item.description)}</Text>
//               <Text style={[styles.cell1, styles.thQty]}>{getSafeValue(item.quantity, 1)}</Text>
//               <Text style={[styles.cell1, styles.thRate]}>{formatCurrency(item.itemPrice || item.rate)}</Text>
//               <Text style={[styles.cell1, styles.thAmount]}>{formatCurrency(getSafeValue(item.amount, (item.itemPrice || item.rate) * (item.quantity || 1)))}</Text>
//             </View>
//           ))
//         ) : (
//           <View style={styles.tableRow}>
//             <Text style={[styles.cell, styles.thSmall]}>1</Text>
//             <Text style={[styles.cell, styles.thDescription]}>{title}</Text>
//             <Text style={[styles.cell, styles.thQty]}>{quantity}</Text>
//             <Text style={[styles.cell, styles.thRate]}>{formatCurrency(price)}</Text>
//             <Text style={[styles.cell, styles.thAmount]}>{formatCurrency(total)}</Text>
//           </View>
//         )}

//         {/* Summary */}
//         <View style={styles.summary}>
//           <View style={styles.summaryRow}>
//             <Text>Sub total</Text>
//             <Text>{formatCurrency(subtotal)}</Text>
//           </View>
//           {discountValue ? (
//             <View style={styles.summaryRow}>
//               <Text>{getDiscountDisplay()}</Text>
//               <Text>-{formatCurrency(discountAmount)}</Text>
//             </View>
//           ) : null}
//           {shipping ? (
//             <View style={styles.summaryRow}>
//               <Text>Shipping</Text>
//               <Text>+{formatCurrency(shippingAmount)}</Text>
//             </View>
//           ) : null}
//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
//           </View>
//         </View>

//         {/* Terms */}
//         {selectedTerms ? (
//           <View style={styles.terms}>
//             <Text style={styles.termsHeader}>Terms & Conditions:</Text>
//             <Text style={styles.termsText}>{selectedTerms}</Text>
//           </View>
//         ) : null}

//         {/* Signature */}
//         <View style={styles.signature}>
//           {signatureUri ? (
//             <Image source={{ uri: signatureUri }} style={styles.signatureImage} resizeMode="contain" />
//           ) : null}
//           <Text style={styles.signatureText}>Approval Signature</Text>
//         </View>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>{getSafeValue(safeCompanyData.address)}</Text>
//           <Text style={styles.footerText}>Tax No: {getSafeValue(safeCompanyData.taxNo)} | {getSafeValue(safeCompanyData.email)} | {getSafeValue(safeCompanyData.phone)}</Text>
//         </View>
//       </View>

//       {/* Share Button */}
//       <TouchableOpacity style={styles.shareButton} onPress={shareInvoice}>
//         <Ionicons name="share-outline" size={20} color="white" />
//         <Text style={styles.shareButtonText}>Share</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // Styles for on-screen view (matching yellow/red theme)
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 10,
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   page: {
//     width: width - 20,
//     minHeight: A4_HEIGHT,
//     backgroundColor: "white",
//     elevation: 5,
//     paddingBottom: 10,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 28,
//     backgroundColor: "#f6c600",
//     height: 140,
//     position: "relative",
//     overflow: "hidden",
//   },
//   redAccent: {
//     position: "absolute",
//     left: 0,
//     top: 0,
//     width: 140,
//     height: "100%",
//     backgroundColor: "#d62828",
//     transform: [{ skewY: "-6deg" }],
//   },
//   headerLeft: {
//     zIndex: 2,
//     paddingLeft: 8,
//   },
//   companyLogo: {
//     width: 90,
//     height: 60,
//     borderRadius: 6,
//     marginBottom: 8,
//   },
//   companyName: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#111",
//   },
//   companyAddressText: {
//     fontSize: 12,
//     color: "#111",
//     marginTop: 4,
//     maxWidth: width * 0.5,
//   },
//   headerRight: {
//     zIndex: 2,
//     alignItems: "flex-end",
//   },
//   invoiceTitleLarge: {
//     fontSize: 20,
//     fontWeight: "700",
//   },
//   metaText: {
//     fontSize: 12,
//   },
//   metaBold: {
//     fontWeight: "700",
//   },

//   titleBar: {
//     backgroundColor: "#fdf4cc",
//     paddingVertical: 10,
//     alignItems: "center",
//   },
//   titleBarText: {
//     fontWeight: "600",
//     fontSize: 16,
//     textTransform: "uppercase",
//   },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     gap: 10,
//   },
//   infoCol: {
//     width: "48%",
//   },
//   infoHeader: {
//     fontSize: 14,
//     fontWeight: "700",
//     borderBottomWidth: 2,
//     borderBottomColor: "#f6c600",
//     alignSelf: "flex-start",
//     paddingBottom: 4,
//     marginBottom: 6,
//   },
//   infoName: {
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   infoText: {
//     fontSize: 12,
//     marginTop: 4,
//   },

//   tableHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     marginTop: 14,
//     backgroundColor: "#faf8f3",
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },

//   cell: {
//     textAlign: "center",
//     fontSize: 12,
//   },
//   cell1: {
//     textAlign: "center",
//     fontSize: 12,
//   },

//   thSmall: { flex: 0.6, textAlign: "center" },
//   thDescription: { flex: 4, textAlign: "left", paddingLeft: 6 },
//   thQty: { flex: 1, textAlign: "center" },
//   thRate: { flex: 1.6, textAlign: "right" },
//   thAmount: { flex: 1.8, textAlign: "right" },

//   summary: {
//     paddingHorizontal: 20,
//     paddingTop: 14,
//     borderTopWidth: 1,
//     borderTopColor: "#ddd",
//     marginTop: 6,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//     fontWeight: "700",
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     borderTopColor: "#111",
//     paddingTop: 8,
//   },
//   totalLabel: {
//     fontWeight: "800",
//     fontSize: 16,
//     color: "#111",
//   },
//   totalValue: {
//     fontWeight: "800",
//     fontSize: 16,
//   },

//   terms: {
//     paddingHorizontal: 20,
//     marginTop: 12,
//   },
//   termsHeader: {
//     fontWeight: "700",
//     marginBottom: 6,
//   },
//   termsText: {
//     fontSize: 12,
//   },

//   signature: {
//     alignItems: "flex-end",
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     gap: 10,
//     marginTop: 8,
//   },
//   signatureImage: {
//     width: 150,
//     height: 60,
//     tintColor: "black",
//   },
//   signatureText: {
//     fontWeight: "700",
//     fontSize: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#111",
//     paddingTop: 6,
//     width: 180,
//     textAlign: "center",
//   },

//   footer: {
//     height: 44,
//     backgroundColor: "#d62828",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 12,
//     marginTop: 16,
//   },
//   footerText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 12,
//   },

//   shareButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f6c600",
//     padding: 10,
//     borderRadius: 6,
//     marginTop: 14,
//   },
//   shareButtonText: {
//     color: "#000",
//     marginLeft: 8,
//     fontWeight: "700",
//   },
// });


// Template4Screen.jsx
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
// const A4_HEIGHT = width * 1.414; // approximate A4 ratio

// export default function Template4Screen() {
//   const route = useRoute();
//   const { invoiceData } = route.params || {};

//   // safe destructuring
//   const safeInvoiceData = invoiceData || {};
//   const company = safeInvoiceData.companyData || {};
//   const client = safeInvoiceData.selectedClient || {};
//   const items = safeInvoiceData.selectedItems || [];

//   const getSafe = (v, d = "") => (v !== undefined && v !== null ? v : d);

//   const companyName = getSafe(company.companyName, "Androtech");
//   const invoiceId = getSafe(safeInvoiceData.invoiceId, "INVNV0001");
//   const startDate = getSafe(safeInvoiceData.startDate, new Date());
//   const subtotal = Number(getSafe(safeInvoiceData.subtotal, 0));
//   const discountAmount = Number(getSafe(safeInvoiceData.discountAmount, 0));
//   const shippingAmount = Number(getSafe(safeInvoiceData.shippingAmount, 0));
//   const taxAmount = Number(getSafe(safeInvoiceData.taxAmount, 0));
//   const total = Number(getSafe(safeInvoiceData.total, subtotal - discountAmount + shippingAmount + taxAmount));
//   const paymentMethod = getSafe(safeInvoiceData.selectedPaymentMethod, "");
//   const terms = getSafe(safeInvoiceData.selectedTerms, "");
//   const signatureUri = getSafe(safeInvoiceData.signatureUri, "");
//   const companyLogo = getSafe(company.logo, "");
//   const companyAddress = getSafe(company.address, "");
//   const companyEmail = getSafe(company.email, "");
//   const companyPhone = getSafe(company.phone, "");
//   const companyTaxNo = getSafe(company.taxNo, "");

//   const formatCurrency = (amount) => {
//     try {
//       return new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency: "INR",
//         minimumFractionDigits: 2,
//       }).format(Number(amount || 0));
//     } catch (e) {
//       return `₹${Number(amount || 0).toFixed(2)}`;
//     }
//   };

//   const isWebUri = (uri) =>
//     typeof uri === "string" && (uri.startsWith("http://") || uri.startsWith("https://") || uri.startsWith("data:"));

//   // convert local file to base64 for embedding in HTML (PDF)
//   const convertImageToBase64 = async (uri) => {
//     try {
//       if (!uri) return null;
//       if (uri.startsWith("data:")) return uri;
//       if (isWebUri(uri)) return uri;
//       const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
//       const ext = uri.split(".").pop().toLowerCase();
//       const mime = ext === "png" ? "image/png" : "image/jpeg";
//       return `data:${mime};base64,${base64}`;
//     } catch (err) {
//       console.warn("convertImageToBase64 failed", err);
//       return null;
//     }
//   };

//   const generateHTMLContent = async () => {
//     const logoBase64 = companyLogo ? await convertImageToBase64(companyLogo) : null;
//     const sigBase64 = signatureUri ? await convertImageToBase64(signatureUri) : null;

//     // items HTML (with Discount & Tax columns)
//     const itemsHtml =
//       items && items.length
//         ? items
//             .map((it, idx) => {
//               const name = getSafe(it.itemName, it.description || "");
//               const qty = Number(getSafe(it.quantity, 1));
//               const rate = Number(getSafe(it.itemPrice || it.rate, 0));
//               const discount = Number(getSafe(it.discount || it.itemDiscount || 0));
//               const tax = Number(getSafe(it.tax || it.itemTax || 0));
//               const amount = Number(getSafe(it.amount, (rate * qty) - discount + tax));
//               // format discount/tax as either percentage or flat: we assume flat numbers passed here
//               return `
//                 <tr>
//                   <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;">${idx + 1}</td>
//                   <td style="padding:8px 10px;border-bottom:1px solid #eee;">${name}</td>
//                   <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;">${qty}</td>
//                   <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(rate)}</td>
//                   <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(discount)}</td>
//                   <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(tax)}</td>
//                   <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;"><strong>${formatCurrency(amount)}</strong></td>
//                 </tr>
//               `;
//             })
//             .join("")
//         : `
//           <tr>
//             <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;">1</td>
//             <td style="padding:8px 10px;border-bottom:1px solid #eee;">Service</td>
//             <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;">1</td>
//             <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(0)}</td>
//             <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(0)}</td>
//             <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(0)}</td>
//             <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;"><strong>${formatCurrency(0)}</strong></td>
//           </tr>
//         `;

//     // HTML - closely styled to match the image (yellow header, red left shield, big INVOICE)
//     const html = `
//     <!doctype html>
//     <html>
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width,initial-scale=1" />
//         <title>Invoice ${invoiceId}</title>
//         <style>
//           @page { margin: 0; }
//           body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #222; }
//           .paper {
//             width: 100%;
//             min-height: ${A4_HEIGHT}px;
//             display: flex;
//             flex-direction: column;
//           }

//           /* header */
//           .header {
//             background: linear-gradient(90deg, #f6c600 0%, #f6c600 100%);
//             padding: 30px 36px;
//             display: flex;
//             align-items: center;
//             position: relative;
//           }
//           .left-shield {
//             position: absolute;
//             left: 0;
//             top: 0;
//             bottom: 0;
//             width: 170px;
//             background: #d62828;
//             clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
//             display:flex;
//             align-items:center;
//             justify-content:center;
//             padding-left: 12px;
//             box-sizing: border-box;
//           }
//           .shield-logo {
//             width: 64px;
//             height: 64px;
//             border-radius: 8px;
//             object-fit:contain;
//             background:white;
//           }
//           .company-block {
//             margin-left: 160px;
//           }
//           .company-title {
//             font-weight: 800;
//             font-size: 26px;
//             color: #222;
//             margin-bottom: 6px;
//           }
//           .company-sub {
//             font-size: 12px;
//             color: #222;
//           }
//           .invoice-big {
//             margin-left: auto;
//             text-align: right;
//           }
//           .invoice-big h1 {
//             margin: 0;
//             font-size: 60px;
//             font-weight: 900;
//             letter-spacing: 2px;
//             color: #075e3a; /* dark green like image */
//           }
//           .invoice-meta { margin-top: 6px; font-size: 13px; color: #222; }

//           /* yellow strip title */
//           .tax-bar {
//             background: #fff3c9;
//             padding: 12px 24px;
//             text-align: center;
//             font-weight: 700;
//             letter-spacing: 1px;
//           }

//           /* info two columns */
//           .info {
//             display: flex;
//             justify-content: space-between;
//             padding: 18px 36px;
//             gap: 12px;
//           }
//           .info-col { width: 48%; }
//           .info-col h4 { margin: 0 0 6px 0; font-size: 14px; font-weight: 800; }
//           .info-col p { margin: 4px 0; font-size: 13px; color: #333; }

//           /* table */
//           .items {
//             width: calc(100% - 72px);
//             margin: 0 36px;
//             border-collapse: collapse;
//             border: 0;
//           }
//           .items thead th {
//             background: #f6c600;
//             padding: 12px;
//             font-weight: 800;
//             font-size: 13px;
//             text-transform: uppercase;
//             border-bottom: 2px solid #e6e6e6;
//           }
//           .items td {
//             padding: 8px 10px;
//             border-bottom: 1px solid #eee;
//             font-size: 13px;
//           }
//           .items tbody tr:nth-child(even) { background: #faf8f3; }

//           /* totals box like image */
//           .totals-wrap {
//             width: 100%;
//             display:flex;
//             justify-content:flex-end;
//             padding: 14px 36px 0 36px;
//             box-sizing: border-box;
//           }
//           .totals {
//             width: 320px;
//             border-collapse: collapse;
//             font-size: 13px;
//           }
//           .totals td { padding: 8px; }
//           .totals .label { text-align:left; }
//           .totals .value { text-align:right; }
//           .totals .grand { font-weight:900; font-size:18px; border-top: 3px solid #222; padding-top:10px; }

//           /* terms & signature */
//           .bottom {
//             display:flex;
//             justify-content:space-between;
//             padding: 18px 36px 40px 36px;
//             gap: 12px;
//           }
//           .terms { width: 48%; font-size: 12px; color: #333; }
//           .sig { width: 48%; display:flex; justify-content:flex-end; align-items:center; gap:12px; flex-direction:column; }
//           .sig img { width: 160px; height:auto; object-fit:contain; filter: grayscale(100%) contrast(200%) brightness(0); }

//           /* footer red curve / block */
//           .footer {
//             margin-top:auto;
//             position:relative;
//             background: #fff;
//           }
//           .footer .red-curve {
//             height: 90px;
//             background: linear-gradient(180deg, #d62828 0%, #d62828 100%);
//             border-top-left-radius: 60px;
//             border-top-right-radius: 300px;
//             margin-top: 28px;
//           }
//           .footer .info {
//             display:none;
//           }

//           /* responsive small fix */
//           @media (max-width:800px) {
//             .invoice-big h1 { font-size: 40px; }
//             .company-title { font-size: 20px; }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="paper">
//           <div class="header">
//             <div class="left-shield">
//               ${logoBase64 ? `<img src="${logoBase64}" class="shield-logo" />` : `<div style="width:48px;height:48px;background:#fff;border-radius:6px;"></div>`}
//             </div>

//             <div class="company-block">
//               <div class="company-title">${companyName}</div>
//               <div class="company-sub">${companyAddress}</div>
//             </div>

//             <div class="invoice-big">
//               <h1>INVOICE</h1>
//               <div class="invoice-meta">
//                 <div><strong>#${invoiceId}</strong></div>
//                 <div>${new Date(startDate).toLocaleDateString()}</div>
//                 ${paymentMethod ? `<div>Payment: ${paymentMethod}</div>` : ""}
//               </div>
//             </div>
//           </div>

//           <div class="tax-bar">Tax Invoice</div>

//           <div class="info">
//             <div class="info-col">
//               <h4>To :</h4>
//               <p><strong>${getSafe(client.tradeName || client.clientName, "Client Name")}</strong></p>
//               <p>${getSafe(client.address)}</p>
//               <p>${getSafe(client.email)}</p>
//               <p>${getSafe(client.phone)}</p>
//               ${client.taxNo ? `<p>Tax No: ${client.taxNo}</p>` : ""}
//             </div>

//             <div class="info-col">
//               <h4>Details :</h4>
//               <p><strong>Due Date:</strong> ${getSafe(safeInvoiceData.dueDate ? new Date(safeInvoiceData.dueDate).toLocaleDateString() : "")}</p>
//               <p><strong>Payment Method:</strong> ${paymentMethod}</p>
//               ${terms ? `<p><strong>Terms:</strong> ${terms}</p>` : ""}
//             </div>
//           </div>

//           <table class="items" cellpadding="0" cellspacing="0">
//             <thead>
//               <tr>
//                 <th style="width:6%;">#</th>
//                 <th style="width:40%;">Description</th>
//                 <th style="width:8%;">Qty</th>
//                 <th style="width:12%;">Price</th>
//                 <th style="width:10%;">Discount</th>
//                 <th style="width:10%;">Tax</th>
//                 <th style="width:14%;">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${itemsHtml}
//             </tbody>
//           </table>

//           <div class="totals-wrap">
//             <table class="totals">
//               <tr><td class="label">Sub total</td><td class="value">${formatCurrency(subtotal)}</td></tr>
//               ${discountAmount ? `<tr><td class="label">Discount</td><td class="value">-${formatCurrency(discountAmount)}</td></tr>` : ""}
//               ${shippingAmount ? `<tr><td class="label">Shipping</td><td class="value">${formatCurrency(shippingAmount)}</td></tr>` : ""}
//               ${taxAmount ? `<tr><td class="label">Tax</td><td class="value">${formatCurrency(taxAmount)}</td></tr>` : ""}
//               <tr class="grand"><td class="label">Total</td><td class="value">${formatCurrency(total)}</td></tr>
//             </table>
//           </div>

//           <div class="bottom">
//             <div class="terms">
//               <strong>Terms & Conditions :</strong>
//               <div style="margin-top:8px;font-size:12px;">${terms || "Payment time 15 days"}</div>
//               <div style="margin-top:12px;font-size:12px;color:#666;">
//                 Tax No: ${companyTaxNo} <br/>
//                 ${companyPhone} <br/>
//                 ${companyEmail} <br/>
//                 ${companyAddress}
//               </div>
//             </div>

//             <div class="sig">
//               ${sigBase64 ? `<img src="${sigBase64}" alt="signature" />` : `<div style="height:60px;width:160px;"></div>`}
//               <div style="border-top:1px solid #111;padding-top:6px;font-weight:700;">Approval Signature</div>
//             </div>
//           </div>

//           <div class="footer">
//             <div class="red-curve"></div>
//           </div>
//         </div>
//       </body>
//     </html>
//     `;

//     return html;
//   };

//   const shareInvoice = async () => {
//     try {
//       const html = await generateHTMLContent();
//       const { uri } = await Print.printToFileAsync({
//         html,
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
//     } catch (err) {
//       console.error("PDF generation error:", err);
//       Alert.alert("Error", "Failed to generate PDF");
//     }
//   };

//   // On-screen rendering (approximate look)
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.page}>
//         <View style={styles.header}>
//           <View style={styles.leftShield}>
//             {companyLogo ? (
//               <Image source={{ uri: companyLogo }} style={styles.shieldLogo} resizeMode="contain" />
//             ) : (
//               <View style={styles.shieldPlaceholder} />
//             )}
//           </View>

//           <View style={styles.companyBlock}>
//             <Text style={styles.companyTitle}>{companyName}</Text>
//             <Text style={styles.companySub}>{companyAddress}</Text>
//           </View>

//           <View style={styles.invoiceBig}>
//             <Text style={styles.invoiceBigText}>INVOICE</Text>
//             <Text style={styles.invoiceMeta}><Text style={styles.bold}>#{invoiceId}</Text></Text>
//             <Text style={styles.invoiceMeta}>{new Date(startDate).toLocaleDateString()}</Text>
//             {paymentMethod ? <Text style={styles.invoiceMeta}>{paymentMethod}</Text> : null}
//           </View>
//         </View>

//         <View style={styles.taxBar}>
//           <Text style={styles.taxBarText}>Tax Invoice</Text>
//         </View>

//         <View style={styles.info}>
//           <View style={styles.infoCol}>
//             <Text style={styles.infoTitle}>To :</Text>
//             <Text style={styles.infoName}>{getSafe(client.tradeName || client.clientName, "Client Name")}</Text>
//             <Text style={styles.infoText}>{getSafe(client.address)}</Text>
//             <Text style={styles.infoText}>{getSafe(client.email)}</Text>
//             <Text style={styles.infoText}>{getSafe(client.phone)}</Text>
//             {client.taxNo ? <Text style={styles.infoText}>Tax No: {client.taxNo}</Text> : null}
//           </View>

//           <View style={styles.infoCol}>
//             <Text style={styles.infoTitle}>Details :</Text>
//             <Text style={styles.infoText}><Text style={styles.bold}>Due Date: </Text>{getSafe(safeInvoiceData.dueDate ? new Date(safeInvoiceData.dueDate).toLocaleDateString() : "")}</Text>
//             <Text style={styles.infoText}><Text style={styles.bold}>Payment Method: </Text>{paymentMethod}</Text>
//             {terms ? <Text style={[styles.infoText,{marginTop:6}]}><Text style={styles.bold}>Terms: </Text>{terms}</Text> : null}
//           </View>
//         </View>

//         {/* table header */}
//         <View style={styles.tableHeader}>
//           <Text style={[styles.cell, styles.h1]}>#</Text>
//           <Text style={[styles.cell, styles.hDesc]}>Description</Text>
//           <Text style={[styles.cell, styles.hQty]}>Qty</Text>
//           <Text style={[styles.cell, styles.hRate]}>Price</Text>
//           <Text style={[styles.cell, styles.hDisc]}>Discount</Text>
//           <Text style={[styles.cell, styles.hTax]}>Tax</Text>
//           <Text style={[styles.cell, styles.hAmt]}>Amount</Text>
//         </View>

//         {/* rows */}
//         {items && items.length ? (
//           items.map((it, idx) => {
//             const name = getSafe(it.itemName, it.description || "");
//             const qty = getSafe(it.quantity, 1);
//             const rate = Number(getSafe(it.itemPrice || it.rate, 0));
//             const disc = Number(getSafe(it.discount || it.itemDiscount || 0));
//             const tax = Number(getSafe(it.tax || it.itemTax || 0));
//             const amt = Number(getSafe(it.amount, (rate * qty) - disc + tax));
//             return (
//               <View key={idx} style={styles.tableRow}>
//                 <Text style={[styles.cell, styles.c1]}>{idx + 1}</Text>
//                 <Text style={[styles.cell, styles.cDesc]}>{name}</Text>
//                 <Text style={[styles.cell, styles.cQty]}>{qty}</Text>
//                 <Text style={[styles.cell, styles.cRate]}>{formatCurrency(rate)}</Text>
//                 <Text style={[styles.cell, styles.cDisc]}>{formatCurrency(disc)}</Text>
//                 <Text style={[styles.cell, styles.cTax]}>{formatCurrency(tax)}</Text>
//                 <Text style={[styles.cell, styles.cAmt]}>{formatCurrency(amt)}</Text>
//               </View>
//             );
//           })
//         ) : (
//           <View style={styles.tableRow}>
//             <Text style={[styles.cell, styles.c1]}>1</Text>
//             <Text style={[styles.cell, styles.cDesc]}>Service</Text>
//             <Text style={[styles.cell, styles.cQty]}>1</Text>
//             <Text style={[styles.cell, styles.cRate]}>{formatCurrency(0)}</Text>
//             <Text style={[styles.cell, styles.cDisc]}>{formatCurrency(0)}</Text>
//             <Text style={[styles.cell, styles.cTax]}>{formatCurrency(0)}</Text>
//             <Text style={[styles.cell, styles.cAmt]}>{formatCurrency(0)}</Text>
//           </View>
//         )}

//         {/* summary */}
//         <View style={styles.summaryWrap}>
//           <View style={styles.summaryBox}>
//             <View style={styles.summaryRow}><Text>Sub total</Text><Text>{formatCurrency(subtotal)}</Text></View>
//             {discountAmount ? <View style={styles.summaryRow}><Text>Discount</Text><Text>-{formatCurrency(discountAmount)}</Text></View> : null}
//             {shippingAmount ? <View style={styles.summaryRow}><Text>Shipping</Text><Text>{formatCurrency(shippingAmount)}</Text></View> : null}
//             {taxAmount ? <View style={styles.summaryRow}><Text>Tax</Text><Text>{formatCurrency(taxAmount)}</Text></View> : null}
//             <View style={[styles.summaryRow, styles.grandRow]}><Text style={styles.grandLabel}>Total</Text><Text style={styles.grandValue}>{formatCurrency(total)}</Text></View>
//           </View>
//         </View>

//         <View style={styles.bottom}>
//           <View style={styles.termsBox}>
//             <Text style={styles.termsTitle}>Terms & Conditions :</Text>
//             <Text style={styles.termsText}>{terms || "Payment time 15 days"}</Text>
//             <Text style={[styles.termsText, {marginTop:10}]}>Tax No: {companyTaxNo}</Text>
//             <Text style={styles.termsText}>{companyPhone}</Text>
//             <Text style={styles.termsText}>{companyEmail}</Text>
//             <Text style={styles.termsText}>{companyAddress}</Text>
//           </View>

//           <View style={styles.signBox}>
//             {signatureUri ? <Image source={{ uri: signatureUri }} style={styles.signatureImage} resizeMode="contain" /> : <View style={{height:60,width:160}} />}
//             <Text style={styles.sigLabel}>Approval Signature</Text>
//           </View>
//         </View>

//         <View style={styles.redFooter}>
//           <View style={styles.redCurve} />
//         </View>

//         <TouchableOpacity style={styles.shareButton} onPress={shareInvoice}>
//           <Ionicons name="share-outline" size={18} color="#111" />
//           <Text style={styles.shareText}>Share</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 12, backgroundColor: "#f5f5f5", alignItems: "center" },
//   page: { width: width - 24, minHeight: A4_HEIGHT, backgroundColor: "#fff", paddingBottom: 32 },
//   header: { flexDirection: "row", alignItems: "center", padding: 22, backgroundColor: "#f6c600", position: "relative", overflow: "hidden" },
//   leftShield: { position: "absolute", left: 0, top: 0, bottom: 0, width: 140, backgroundColor: "#d62828", justifyContent: "center", alignItems: "center" },
//   shieldLogo: { width: 64, height: 64, borderRadius: 8, backgroundColor: "#fff" },
//   shieldPlaceholder: { width: 48, height: 48, backgroundColor: "#fff", borderRadius: 6 },
//   companyBlock: { marginLeft: 140, paddingLeft: 12 },
//   companyTitle: { fontSize: 22, fontWeight: "800", color: "#111" },
//   companySub: { fontSize: 12, marginTop: 6, color: "#111", maxWidth: width * 0.45 },
//   invoiceBig: { marginLeft: "auto", alignItems: "flex-end" },
//   invoiceBigText: { fontSize: 46, fontWeight: "900", color: "#075e3a" },
//   invoiceMeta: { fontSize: 12 },
//   taxBar: { backgroundColor: "#fff3c9", paddingVertical: 8, alignItems: "center" },
//   taxBarText: { fontWeight: "700" },
//   info: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, paddingTop: 12, gap: 10 },
//   infoCol: { width: "48%" },
//   infoTitle: { fontSize: 14, fontWeight: "800", marginBottom: 6 },
//   infoName: { fontSize: 14, fontWeight: "700" },
//   infoText: { fontSize: 12, marginTop: 4, color: "#333" },
//   bold: { fontWeight: "700" },

//   tableHeader: { flexDirection: "row", backgroundColor: "#faf8f3", paddingVertical: 10, paddingHorizontal: 6, marginTop: 12 },
//   tableRow: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   cell: { fontSize: 12, textAlign: "center" },

//   h1: { flex: 0.6 },
//   hDesc: { flex: 4, textAlign: "left", paddingLeft: 8 },
//   hQty: { flex: 1 },
//   hRate: { flex: 1.4, textAlign: "right" },
//   hDisc: { flex: 1.2, textAlign: "right" },
//   hTax: { flex: 1.2, textAlign: "right" },
//   hAmt: { flex: 1.6, textAlign: "right" },

//   c1: { flex: 0.6, textAlign: "center" },
//   cDesc: { flex: 4, textAlign: "left", paddingLeft: 8 },
//   cQty: { flex: 1, textAlign: "center" },
//   cRate: { flex: 1.4, textAlign: "right" },
//   cDisc: { flex: 1.2, textAlign: "right" },
//   cTax: { flex: 1.2, textAlign: "right" },
//   cAmt: { flex: 1.6, textAlign: "right" },

//   summaryWrap: { paddingHorizontal: 12, paddingTop: 16, alignItems: "flex-end" },
//   summaryBox: { width: 320, borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 8 },
//   summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
//   grandRow: { borderTopWidth: 1, borderTopColor: "#111", paddingTop: 10, marginTop: 6 },
//   grandLabel: { fontWeight: "900", fontSize: 16 },
//   grandValue: { fontWeight: "900", fontSize: 16 },

//   bottom: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, marginTop: 18, gap: 12 },
//   termsBox: { width: "48%" },
//   termsTitle: { fontWeight: "700", marginBottom: 6 },
//   termsText: { fontSize: 12, color: "#444" },

//   signBox: { width: "48%", alignItems: "flex-end" },
//   signatureImage: { width: 160, height: 60, tintColor: "#000" },
//   sigLabel: { borderTopWidth: 1, borderTopColor: "#111", paddingTop: 6, fontWeight: "700", marginTop: 6 },

//   redFooter: { marginTop: 24 },
//   redCurve: { height: 90, backgroundColor: "#d62828", borderTopLeftRadius: 60, borderTopRightRadius: 300 },

//   shareButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#f6c600", padding: 10, borderRadius: 6, alignSelf: "center", marginTop: 16 },
//   shareText: { marginLeft: 8, fontWeight: "700" },
// });


import React, { useEffect } from "react";
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
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("window");

const InvoiceTemplate = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { invoiceData } = route.params || {};

  // ✅ Generate HTML for the invoice
  const generateHTMLContent = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${invoiceData.title || "Invoice"}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
        h1 { text-align: center; }
        .section { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        .total { text-align: right; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>${invoiceData.title || "Invoice"}</h1>
      <div class="section">
        <h3>Company Details</h3>
        <p><strong>${invoiceData.companyData?.companyName || ""}</strong></p>
        <p>${invoiceData.companyData?.address || ""}</p>
        <p>${invoiceData.companyData?.email || ""}</p>
        <p>${invoiceData.companyData?.phone || ""}</p>
      </div>
      <div class="section">
        <h3>Client Details</h3>
        <p><strong>${invoiceData.selectedClient?.tradeName || invoiceData.selectedClient?.clientName || ""}</strong></p>
        <p>${invoiceData.selectedClient?.address || ""}</p>
        <p>${invoiceData.selectedClient?.email || ""}</p>
        <p>${invoiceData.selectedClient?.phone || ""}</p>
      </div>
      <div class="section">
        <h3>Items</h3>
        <table>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
          ${invoiceData.selectedItems
            .map(
              (item) => `
              <tr>
                <td>${item.itemName}</td>
                <td>${item.quantity}</td>
                <td>₹${item.itemPrice}</td>
                <td>₹${item.amount}</td>
              </tr>`
            )
            .join("")}
        </table>
      </div>
      <div class="section total">
        <p>Subtotal: ₹${invoiceData.subtotal}</p>
        <p>Total: ₹${invoiceData.total}</p>
      </div>
    </body>
    </html>
  `;

  // ✅ Handle PDF Share
  const handleShare = async () => {
    try {
      const html = generateHTMLContent();
      const { uri } = await Print.printToFileAsync({ html });
      const pdfName = `${FileSystem.documentDirectory}invoice_${invoiceData.invoiceId}.pdf`;
      await FileSystem.moveAsync({ from: uri, to: pdfName });
      await Sharing.shareAsync(pdfName, {
        mimeType: "application/pdf",
        dialogTitle: "Share Invoice",
        UTI: "com.adobe.pdf",
      });
    } catch (error) {
      console.error("Error sharing invoice:", error);
      Alert.alert("Error", "Failed to generate or share invoice.");
    }
  };

  // ✅ Auto Share after create
  useEffect(() => {
    if (invoiceData?.mode === "created") {
      handleShare();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titleText}>{invoiceData.title || "Invoice"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Company Details</Text>
          <Text style={styles.text}>{invoiceData.companyData?.companyName}</Text>
          <Text style={styles.text}>{invoiceData.companyData?.address}</Text>
          <Text style={styles.text}>{invoiceData.companyData?.email}</Text>
          <Text style={styles.text}>{invoiceData.companyData?.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Client Details</Text>
          <Text style={styles.text}>
            {invoiceData.selectedClient?.tradeName ||
              invoiceData.selectedClient?.clientName}
          </Text>
          <Text style={styles.text}>{invoiceData.selectedClient?.address}</Text>
          <Text style={styles.text}>{invoiceData.selectedClient?.email}</Text>
          <Text style={styles.text}>{invoiceData.selectedClient?.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Items</Text>
          {invoiceData.selectedItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemDetails}>
                {item.quantity} × ₹{item.itemPrice}
              </Text>
              <Text style={styles.itemAmount}>₹{item.amount}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.totalLabel}>Total: ₹{invoiceData.total}</Text>
        </View>
      </ScrollView>

      {/* ✅ Bottom Action Button */}
      {invoiceData?.mode === "preview" ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.shareButton, { backgroundColor: "#ccc" }]}
        >
          <Ionicons name="create-outline" size={18} color="#111" />
          <Text style={styles.shareText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={18} color="#111" />
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InvoiceTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 6,
  },
  itemName: {
    fontSize: 14,
    color: "#000",
  },
  itemDetails: {
    fontSize: 13,
    color: "#555",
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  totalLabel: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 16,
    color: "#111",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CD04D",
    paddingVertical: 12,
    borderRadius: 10,
    margin: 16,
  },
  shareText: {
    marginLeft: 6,
    fontWeight: "bold",
    color: "#111",
    fontSize: 15,
  },
});
