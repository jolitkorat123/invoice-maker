////full working


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Modal,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import * as SQLite from "expo-sqlite";

// // ✅ SectionItem Component
// const SectionItem = ({ icon, label, value, onPress, showValue = true }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{label}</Text>
//     </View>
//     <View style={styles.rightSection}>
//       {showValue && value ? <Text style={styles.valueText}>{value}</Text> : null}
//       <Ionicons name="chevron-forward" size={18} color="#000" />
//     </View>
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [showInvoiceNumber, setShowInvoiceNumber] = useState(true);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalType, setModalType] = useState(null);

//   // ✅ Current values
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [discountType, setDiscountType] = useState("flat");
//   const [discountValue, setDiscountValue] = useState("");
//   const [shipping, setShipping] = useState("");

//   // ✅ Temp values (used in modals)
//   const [tempValue, setTempValue] = useState("");
//   const [tempDiscountType, setTempDiscountType] = useState("flat");

//   // ✅ DB fields
//   const [db, setDb] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [terms, setTerms] = useState("");
//   const [companyData, setCompanyData] = useState(null);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [latestSignature, setLatestSignature] = useState(null); // ✅ New state for signature

//   const {
//     invoiceId = `INV${String(1).padStart(5, "0")}`,
//     startDate = new Date(),
//     endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     po = "",
//     title = "Invoice Info",
//     selectedClient: routeClient = null,
//   } = route.params || {};

//   // ✅ Set selected client from route params
//   useEffect(() => {
//     if (routeClient) {
//       setSelectedClient(routeClient);
//     }
//   }, [routeClient]);

//   const toggleVisibility = () => setShowInvoiceNumber(!showInvoiceNumber);
//   const formatDate = (date) => date.toLocaleDateString("en-GB");

//   const openModal = (type) => {
//     setModalType(type);
//     // set temp values from current states
//     if (type === "quantity") setTempValue(quantity);
//     if (type === "price") setTempValue(price);
//     if (type === "discount") {
//       setTempValue(discountValue);
//       setTempDiscountType(discountType);
//     }
//     if (type === "shipping") setTempValue(shipping);
//     if (type === "paymentMethod") setTempValue(paymentMethod);
//     if (type === "terms") setTempValue(terms);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalType(null);
//   };

//   // ✅ DB INIT
//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync("userdb.db", {
//           useNewConnection: true,
//         });

//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS invoiceMeta (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             paymentMethod TEXT,
//             terms TEXT
//           );
          
//           CREATE TABLE IF NOT EXISTS company (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             companyName TEXT,
//             email TEXT,
//             phone TEXT,
//             address TEXT,
//             taxNo TEXT,
//             taxType TEXT,
//             businessNature TEXT,
//             logo TEXT
//           );
          
//           CREATE TABLE IF NOT EXISTS invoices (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             invoiceId TEXT,
//             startDate TEXT,
//             endDate TEXT,
//             po TEXT,
//             quantity REAL,
//             price REAL,
//             discountType TEXT,
//             discountValue REAL,
//             shipping REAL,
//             subtotal REAL,
//             total REAL,
//             paymentMethod TEXT,
//             terms TEXT,
//             companyName TEXT,
//             companyEmail TEXT,
//             companyPhone TEXT,
//             companyAddress TEXT,
//             companyTaxNo TEXT,
//             companyTaxType TEXT,
//             companyBusinessNature TEXT,
//             companyLogo TEXT,
//             clientId INTEGER,
//             clientName TEXT,
//             clientEmail TEXT,
//             clientPhone TEXT,
//             clientAddress TEXT,
//             clientShippingAddress TEXT,
//             clientTaxNo TEXT,
//             clientTaxType TEXT,
//             clientBusinessNature TEXT,
//             clientDetail TEXT,
//             signatureUri TEXT, 
//             createdAt TEXT DEFAULT (datetime('now', 'localtime'))
//           );

//           CREATE TABLE IF NOT EXISTS signatures (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             fileUri TEXT,
//             createdAt TEXT DEFAULT (datetime('now', 'localtime'))
//           );
//         `);

//         setDb(database);

//         const result = await database.getFirstAsync(
//           "SELECT * FROM invoiceMeta ORDER BY id DESC LIMIT 1"
//         );

//         if (result) {
//           setPaymentMethod(result.paymentMethod || "");
//           setTerms(result.terms || "");
//         }

//         // Load company data if exists
//         const companyResult = await database.getFirstAsync(
//           "SELECT * FROM company ORDER BY id DESC LIMIT 1"
//         );
//         if (companyResult) {
//           setCompanyData(companyResult);
//         }

//         // ✅ Fetch latest signature
//         const signatureResult = await database.getFirstAsync(
//           "SELECT * FROM signatures ORDER BY id DESC LIMIT 1"
//         );
//         if (signatureResult) {
//           setLatestSignature(signatureResult.fileUri);
//         }
//       } catch (err) {
//         console.error("DB Init Error:", err);
//       }
//     };
//     initDb();
//   }, []);

//   // ✅ Save handler
//   const handleSave = async () => {
//     if (modalType === "quantity") setQuantity(tempValue);
//     if (modalType === "price") setPrice(tempValue);
//     if (modalType === "discount") {
//       setDiscountValue(tempValue);
//       setDiscountType(tempDiscountType);
//     }
//     if (modalType === "shipping") setShipping(tempValue);

//     if (modalType === "paymentMethod" && db) {
//       await db.runAsync(
//         `INSERT INTO invoiceMeta (paymentMethod, terms) VALUES (?, ?)`,
//         [tempValue, terms]
//       );
//       setPaymentMethod(tempValue);
//     }

//     if (modalType === "terms" && db) {
//       await db.runAsync(
//         `INSERT INTO invoiceMeta (paymentMethod, terms) VALUES (?, ?)`,
//         [paymentMethod, tempValue]
//       );
//       setTerms(tempValue);
//     }

//     closeModal();
//   };

//   // ✅ Handle Preview
//   const handlePreview = () => {
//     if (!companyData) {
//       Alert.alert("Error", "Company information is required");
//       return;
//     }
    
//     navigation.navigate("InvoicePreview", {
//       invoiceData: {
//         invoiceId,
//         startDate,
//         endDate,
//         po,
//         quantity,
//         price,
//         discountType,
//         discountValue,
//         shipping,
//         paymentMethod,
//         terms,
//         companyData,
//         selectedClient,
//         signature: latestSignature // ✅ Pass signature to preview
//       }
//     });
//   };

//   // ✅ Handle Create
//   const handleCreate = async () => {
//     if (!db) {
//       Alert.alert("Error", "Database not initialized");
//       return;
//     }

//     if (!quantity || !price) {
//       Alert.alert("Error", "Please fill in required fields (quantity and price)");
//       return;
//     }

//     if (!companyData) {
//       Alert.alert("Error", "Company information is required");
//       return;
//     }

//     try {
//       // Calculate totals
//       const subtotal = parseFloat(quantity) * parseFloat(price);
//       const discountAmount = discountType === "flat" 
//         ? parseFloat(discountValue || 0) 
//         : subtotal * (parseFloat(discountValue || 0) / 100);
//       const total = subtotal - discountAmount + parseFloat(shipping || 0);

//       // Save invoice data with client information and signature
//       await db.runAsync(
//         `INSERT INTO invoices (
//           invoiceId, 
//           startDate, 
//           endDate, 
//           po, 
//           quantity, 
//           price, 
//           discountType, 
//           discountValue, 
//           shipping, 
//           subtotal, 
//           total,
//           paymentMethod,
//           terms,
//           companyName,
//           companyEmail,
//           companyPhone,
//           companyAddress,
//           companyTaxNo,
//           companyTaxType,
//           companyBusinessNature,
//           companyLogo,
//           clientId,
//           clientName,
//           clientEmail,
//           clientPhone,
//           clientAddress,
//           clientShippingAddress,
//           clientTaxNo,
//           clientTaxType,
//           clientBusinessNature,
//           clientDetail,
//           signatureUri
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           invoiceId,
//           startDate.toISOString(),
//           endDate.toISOString(),
//           po,
//           quantity,
//           price,
//           discountType,
//           discountValue,
//           shipping,
//           subtotal,
//           total,
//           paymentMethod,
//           terms,
//           companyData.companyName,
//           companyData.email,
//           companyData.phone,
//           companyData.address,
//           companyData.taxNo,
//           companyData.taxType,
//           companyData.businessNature,
//           companyData.logo || null,
//           selectedClient?.id || null,
//           selectedClient?.tradeName || "",
//           selectedClient?.email || "",
//           selectedClient?.phone || "",
//           selectedClient?.address || "",
//           selectedClient?.shippingAddress || "",
//           selectedClient?.taxNo || "",
//           selectedClient?.taxType || "",
//           selectedClient?.businessNature || "",
//           selectedClient?.clientDetail || "",
//           latestSignature || null // ✅ Save signature with invoice
//         ]
//       );

//       Alert.alert("Success", "Invoice created successfully!", [
//         { text: "OK", onPress: () => navigation.goBack() }
//       ]);
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//       Alert.alert("Error", "Failed to create invoice");
//     }
//   };

//   // ✅ Navigate to client selection
//   const navigateToClientSelection = () => {
//     navigation.navigate("Client-Screen", { 
//       onSelectClient: (client) => {
//         setSelectedClient(client);
//       } 
//     });
//   };

//   // ✅ Navigate to signature screen
//   const navigateToSignature = () => {
//     navigation.navigate("Signature-screen", {
//       onSignatureSave: (signatureUri) => {
//         setLatestSignature(signatureUri);
//       }
//     });
//   };

//   return (
//     <LinearGradient
//       colors={["#4cd04c27", "rgba(76, 208, 76, 0)"]}
//       style={styles.background}
//     >
//       {/* ✅ Custom Header */}
//       <View style={styles.customHeader}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Ionicons name="chevron-back" size={20} color="#ffffff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Invoice</Text>
//         <TouchableOpacity onPress={toggleVisibility}>
//           <Ionicons
//             name={showInvoiceNumber ? "eye-outline" : "eye-off-outline"}
//             size={22}
//             color="#000"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* ✅ Main Content */}
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Invoice Info Card */}
//         <TouchableOpacity
//           style={styles.invoiceInfoCard}
//           onPress={() =>
//             navigation.navigate("Invoice-info-screen", {
//               invoiceId,
//               startDate: startDate.toISOString(),
//               endDate: endDate.toISOString(),
//               po,
//               title,
//             })
//           }
//         >
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{title}</Text>
//             <Text style={styles.invoiceInfoDate}>
//               {`Date - ${formatDate(new Date(startDate))}`}
//             </Text>
//             <Text style={styles.invoiceInfoDate}>
//               {`Due - ${formatDate(new Date(endDate))}`}
//             </Text>
//             {po ? (
//               <Text style={styles.invoiceInfoDate}>{`PO - ${po}`}</Text>
//             ) : null}
//           </View>
//           <Text style={styles.invoiceNumber}>
//             {showInvoiceNumber ? invoiceId : "********"}
//           </Text>
//         </TouchableOpacity>

//         {/* Business & Client */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={() => navigation.navigate("company-profile")}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/briefcase.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Business Info</Text>
//             </View>
//             <View style={styles.rightSection}>
//               {companyData ? (
//                 <Text style={styles.valueText}>{companyData.companyName}</Text>
//               ) : (
//                 <View style={styles.addButton}>
//                   <Ionicons name="add" size={18} color="white" />
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={navigateToClientSelection}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/Mask group.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Client</Text>
//             </View>
//             <View style={styles.rightSection}>
//               {selectedClient ? (
//                 <Text style={styles.valueText}>{selectedClient.tradeName}</Text>
//               ) : (
//                 <View style={styles.addButton}>
//                   <Ionicons name="add" size={18} color="white" />
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Items & Charges */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={() => navigation.navigate("Add-item")}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/i.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Items</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem
//             icon={require("../../../assets/screen-14/hand.png")}
//             label="Quantity"
//             value={quantity}
//             onPress={() => openModal("quantity")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/price-tag.png")}
//             label="Price"
//             value={price ? `₹${price}` : ""}
//             onPress={() => openModal("price")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/discount.png")}
//             label="Discount"
//             value={
//               discountValue
//                 ? discountType === "flat"
//                   ? `₹${discountValue}`
//                   : `${discountValue}%`
//                 : ""
//             }
//             onPress={() => openModal("discount")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/delivery.png")}
//             label="Shipping Charges"
//             value={shipping ? `₹${shipping}` : ""}
//             onPress={() => openModal("shipping")}
//           />

//           {/* ✅ Payment Method from DB */}
//           <SectionItem
//             icon={require("../../../assets/screen-14/debit-card.png")}
//             label="Payment Method"
//             onPress={() => openModal("paymentMethod")}
//           />
//         </View>

//         {/* ✅ Terms & Signature */}
//         <View style={styles.sectionCard}>
//           <SectionItem
//             icon={require("../../../assets/screen-14/terms-and-conditions.png")}
//             label="Terms & Condition"
//             onPress={() => openModal("terms")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/signature.png")}
//             label="Signature"
//             value={latestSignature ? "✓ Added" : ""} // ✅ Show checkmark if signature exists
//             onPress={navigateToSignature} // ✅ Use the new navigation function
//           />
//         </View>
//       </ScrollView>

//       {/* ✅ Bottom Action Buttons */}
//       <View style={styles.actionButtonsContainer}>
//         <TouchableOpacity 
//           style={styles.previewButton}
//           onPress={handlePreview}
//         >
//           <Text style={styles.buttonTextWhite}>Preview</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={styles.createButton}
//           onPress={handleCreate}
//         >
//           <Text style={styles.buttonTextWhite}>Create</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ✅ MODALS */}
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalBox}>
//             {modalType === "quantity" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Quantity</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 1"
//                 />
//               </>
//             )}
//             {modalType === "price" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Price (INR)</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 1000"
//                 />
//               </>
//             )}
//             {modalType === "discount" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Discount</Text>
//                 <View style={styles.discountRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.discountOption,
//                       tempDiscountType === "flat" && styles.discountSelected,
//                     ]}
//                     onPress={() => setTempDiscountType("flat")}
//                   >
//                     <Text>Flat Amount</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[
//                       styles.discountOption,
//                       tempDiscountType === "percent" && styles.discountSelected,
//                     ]}
//                     onPress={() => setTempDiscountType("percent")}
//                   >
//                     <Text>Percentage</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 10"
//                 />
//               </>
//             )}
//             {modalType === "shipping" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Shipping Charges</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 200"
//                 />
//               </>
//             )}
//             {modalType === "paymentMethod" && (
//               <>
//                 <Text style={styles.modalLabel}>Payment Detail</Text>
//                 <View style={styles.textAreaWrapper}>
//                   <TextInput
//                     style={styles.textArea}
//                     value={tempValue}
//                     onChangeText={(text) => {
//                       if (text.length <= 500) setTempValue(text);
//                     }}
//                     placeholder="e.g. Bank Transfer, UPI, Cash..."
//                     multiline
//                     numberOfLines={5}
//                     textAlignVertical="top"
//                   />
//                   <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
//                 </View>
//               </>
//             )}
//             {modalType === "terms" && (
//               <>
//                 <Text style={styles.modalLabel}>Terms & Conditions</Text>
//                 <View style={styles.textAreaWrapper}>
//                   <TextInput
//                     style={styles.textArea}
//                     value={tempValue}
//                     onChangeText={(text) => {
//                       if (text.length <= 500) setTempValue(text);
//                     }}
//                     placeholder="Enter terms and conditions..."
//                     multiline
//                     numberOfLines={5}
//                     textAlignVertical="top"
//                   />
//                   <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
//                 </View>
//               </>
//             )}

//             {/* ✅ Buttons */}
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//                 <Text style={styles.buttonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { padding: 20, paddingBottom: 100 },

//   // ✅ Header
//   customHeader: {
//     backgroundColor: "#E3F8E3",
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
//   backButton: { backgroundColor: "#4CD04D", padding: 8, borderRadius: 20 },

//   // ✅ Invoice Info Card
//   invoiceInfoCard: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: { fontWeight: "bold", fontSize: 16 },
//   invoiceInfoDate: { fontSize: 12, color: "#555" },
//   invoiceNumber: { fontWeight: "bold", fontSize: 16 },

//   // ✅ Section Card
//   sectionCard: {
//     backgroundColor: "#fcfcfcff",
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: "#ccc",
//   },
//   iconLabel: { flexDirection: "row", alignItems: "center" },
//   icon: { width: 20, height: 20, marginRight: 12, resizeMode: "contain" },
//   label: { fontSize: 14 },
//   valueText: { fontSize: 12, color: "#888", marginRight: 4 },
//   rightSection: { flexDirection: "row", alignItems: "center" },
//   addButton: {
//     backgroundColor: "#000000ff",
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // ✅ Modal
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//   },
//   modalLabel: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 20,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   cancelButton: {
//     backgroundColor: "#000000ff",
//     padding: 10,
//     borderRadius: 6,
//     flex: 1,
//     alignItems: "center",
//     marginRight: 5,
//   },
//   saveButton: {
//     backgroundColor: "#4CD04D",
//     padding: 10,
//     borderRadius: 6,
//     flex: 1,
//     alignItems: "center",
//     marginLeft: 5,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   // ✅ Discount Options
//   discountRow: { flexDirection: "row", marginBottom: 10 },
//   discountOption: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 8,
//     marginRight: 10,
//     width: 100,
//     alignItems: "center",
//   },
//   discountSelected: { backgroundColor: "#4CD04D33", borderColor: "#4CD04D" },

//   // ✅ TextArea (Payment / Terms)
//   textAreaWrapper: {
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     borderRadius: 8,
//     backgroundColor: "#F9FAFB",
//     padding: 10,
//     minHeight: 120,
//     marginBottom: 15,
//   },
//   textArea: {
//     fontSize: 14,
//     color: "#111827",
//     lineHeight: 20,
//     minHeight: 100,
//   },
//   charCount: {
//     alignSelf: "flex-end",
//     fontSize: 12,
//     color: "#9CA3AF",
//     marginTop: 4,
//   },

//   // ✅ Bottom Action Buttons
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   previewButton: {
//     backgroundColor: '#000',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   createButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     flex: 1,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   buttonTextWhite: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


///signature update

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Modal,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import * as SQLite from "expo-sqlite";

// // ✅ SectionItem Component - Updated to show signature preview
// const SectionItem = ({ 
//   icon, 
//   label, 
//   value, 
//   onPress, 
//   showValue = true, 
//   isSignature = false, 
//   signatureUri = null 
// }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{label}</Text>
//     </View>
//     <View style={styles.rightSection}>
//       {showValue && value && !isSignature ? (
//         <Text style={styles.valueText}>{value}</Text>
//       ) : null}
      
//       {isSignature && signatureUri ? (
//         <Image 
//           source={{ uri: signatureUri }} 
//           style={styles.signaturePreview}
//           resizeMode="contain"
//         />
//       ) : null}
      
//       <Ionicons name="chevron-forward" size={18} color="#000" />
//     </View>
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [showInvoiceNumber, setShowInvoiceNumber] = useState(true);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalType, setModalType] = useState(null);

//   // ✅ Current values
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [discountType, setDiscountType] = useState("flat");
//   const [discountValue, setDiscountValue] = useState("");
//   const [shipping, setShipping] = useState("");

//   // ✅ Temp values (used in modals)
//   const [tempValue, setTempValue] = useState("");
//   const [tempDiscountType, setTempDiscountType] = useState("flat");

//   // ✅ DB fields
//   const [db, setDb] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [terms, setTerms] = useState("");
//   const [companyData, setCompanyData] = useState(null);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [latestSignature, setLatestSignature] = useState(null); // ✅ New state for signature

//   const {
//     invoiceId = `INV${String(1).padStart(5, "0")}`,
//     startDate = new Date(),
//     endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     po = "",
//     title = "Invoice Info",
//     selectedClient: routeClient = null,
//   } = route.params || {};

//   // ✅ Set selected client from route params
//   useEffect(() => {
//     if (routeClient) {
//       setSelectedClient(routeClient);
//     }
//   }, [routeClient]);

//   const toggleVisibility = () => setShowInvoiceNumber(!showInvoiceNumber);
//   const formatDate = (date) => date.toLocaleDateString("en-GB");

//   const openModal = (type) => {
//     setModalType(type);
//     // set temp values from current states
//     if (type === "quantity") setTempValue(quantity);
//     if (type === "price") setTempValue(price);
//     if (type === "discount") {
//       setTempValue(discountValue);
//       setTempDiscountType(discountType);
//     }
//     if (type === "shipping") setTempValue(shipping);
//     if (type === "paymentMethod") setTempValue(paymentMethod);
//     if (type === "terms") setTempValue(terms);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalType(null);
//   };

//   // ✅ DB INIT
//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync("userdb.db", {
//           useNewConnection: true,
//         });

//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS invoiceMeta (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             paymentMethod TEXT,
//             terms TEXT
//           );
          
//           CREATE TABLE IF NOT EXISTS company (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             companyName TEXT,
//             email TEXT,
//             phone TEXT,
//             address TEXT,
//             taxNo TEXT,
//             taxType TEXT,
//             businessNature TEXT,
//             logo TEXT
//           );
          
//           CREATE TABLE IF NOT EXISTS invoices (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             invoiceId TEXT,
//             startDate TEXT,
//             endDate TEXT,
//             po TEXT,
//             quantity REAL,
//             price REAL,
//             discountType TEXT,
//             discountValue REAL,
//             shipping REAL,
//             subtotal REAL,
//             total REAL,
//             paymentMethod TEXT,
//             terms TEXT,
//             companyName TEXT,
//             companyEmail TEXT,
//             companyPhone TEXT,
//             companyAddress TEXT,
//             companyTaxNo TEXT,
//             companyTaxType TEXT,
//             companyBusinessNature TEXT,
//             companyLogo TEXT,
//             clientId INTEGER,
//             clientName TEXT,
//             clientEmail TEXT,
//             clientPhone TEXT,
//             clientAddress TEXT,
//             clientShippingAddress TEXT,
//             clientTaxNo TEXT,
//             clientTaxType TEXT,
//             clientBusinessNature TEXT,
//             clientDetail TEXT,
//             signatureUri TEXT, 
//             createdAt TEXT DEFAULT (datetime('now', 'localtime'))
//           );

//           CREATE TABLE IF NOT EXISTS signatures (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             fileUri TEXT,
//             createdAt TEXT DEFAULT (datetime('now', 'localtime'))
//           );
//         `);

//         setDb(database);

//         const result = await database.getFirstAsync(
//           "SELECT * FROM invoiceMeta ORDER BY id DESC LIMIT 1"
//         );

//         if (result) {
//           setPaymentMethod(result.paymentMethod || "");
//           setTerms(result.terms || "");
//         }

//         // Load company data if exists
//         const companyResult = await database.getFirstAsync(
//           "SELECT * FROM company ORDER BY id DESC LIMIT 1"
//         );
//         if (companyResult) {
//           setCompanyData(companyResult);
//         }

//         // ✅ Fetch latest signature
//         const signatureResult = await database.getFirstAsync(
//           "SELECT * FROM signatures ORDER BY id DESC LIMIT 1"
//         );
//         if (signatureResult) {
//           setLatestSignature(signatureResult.fileUri);
//         }
//       } catch (err) {
//         console.error("DB Init Error:", err);
//       }
//     };
//     initDb();
//   }, []);

//   // ✅ Save handler
//   const handleSave = async () => {
//     if (modalType === "quantity") setQuantity(tempValue);
//     if (modalType === "price") setPrice(tempValue);
//     if (modalType === "discount") {
//       setDiscountValue(tempValue);
//       setDiscountType(tempDiscountType);
//     }
//     if (modalType === "shipping") setShipping(tempValue);

//     if (modalType === "paymentMethod" && db) {
//       await db.runAsync(
//         `INSERT INTO invoiceMeta (paymentMethod, terms) VALUES (?, ?)`,
//         [tempValue, terms]
//       );
//       setPaymentMethod(tempValue);
//     }

//     if (modalType === "terms" && db) {
//       await db.runAsync(
//         `INSERT INTO invoiceMeta (paymentMethod, terms) VALUES (?, ?)`,
//         [paymentMethod, tempValue]
//       );
//       setTerms(tempValue);
//     }

//     closeModal();
//   };

//   // ✅ Handle Preview
//   const handlePreview = () => {
//     if (!companyData) {
//       Alert.alert("Error", "Company information is required");
//       return;
//     }
    
//     navigation.navigate("InvoicePreview", {
//       invoiceData: {
//         invoiceId,
//         startDate,
//         endDate,
//         po,
//         quantity,
//         price,
//         discountType,
//         discountValue,
//         shipping,
//         paymentMethod,
//         terms,
//         companyData,
//         selectedClient,
//         signature: latestSignature // ✅ Pass signature to preview
//       }
//     });
//   };

//   // ✅ Handle Create
//   const handleCreate = async () => {
//     if (!db) {
//       Alert.alert("Error", "Database not initialized");
//       return;
//     }

//     if (!quantity || !price) {
//       Alert.alert("Error", "Please fill in required fields (quantity and price)");
//       return;
//     }

//     if (!companyData) {
//       Alert.alert("Error", "Company information is required");
//       return;
//     }

//     try {
//       // Calculate totals
//       const subtotal = parseFloat(quantity) * parseFloat(price);
//       const discountAmount = discountType === "flat" 
//         ? parseFloat(discountValue || 0) 
//         : subtotal * (parseFloat(discountValue || 0) / 100);
//       const total = subtotal - discountAmount + parseFloat(shipping || 0);

//       // Save invoice data with client information and signature
//       await db.runAsync(
//         `INSERT INTO invoices (
//           invoiceId, 
//           startDate, 
//           endDate, 
//           po, 
//           quantity, 
//           price, 
//           discountType, 
//           discountValue, 
//           shipping, 
//           subtotal, 
//           total,
//           paymentMethod,
//           terms,
//           companyName,
//           companyEmail,
//           companyPhone,
//           companyAddress,
//           companyTaxNo,
//           companyTaxType,
//           companyBusinessNature,
//           companyLogo,
//           clientId,
//           clientName,
//           clientEmail,
//           clientPhone,
//           clientAddress,
//           clientShippingAddress,
//           clientTaxNo,
//           clientTaxType,
//           clientBusinessNature,
//           clientDetail,
//           signatureUri
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           invoiceId,
//           startDate.toISOString(),
//           endDate.toISOString(),
//           po,
//           quantity,
//           price,
//           discountType,
//           discountValue,
//           shipping,
//           subtotal,
//           total,
//           paymentMethod,
//           terms,
//           companyData.companyName,
//           companyData.email,
//           companyData.phone,
//           companyData.address,
//           companyData.taxNo,
//           companyData.taxType,
//           companyData.businessNature,
//           companyData.logo || null,
//           selectedClient?.id || null,
//           selectedClient?.tradeName || "",
//           selectedClient?.email || "",
//           selectedClient?.phone || "",
//           selectedClient?.address || "",
//           selectedClient?.shippingAddress || "",
//           selectedClient?.taxNo || "",
//           selectedClient?.taxType || "",
//           selectedClient?.businessNature || "",
//           selectedClient?.clientDetail || "",
//           latestSignature || null // ✅ Save signature with invoice
//         ]
//       );

//       Alert.alert("Success", "Invoice created successfully!", [
//         { text: "OK", onPress: () => navigation.goBack() }
//       ]);
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//       Alert.alert("Error", "Failed to create invoice");
//     }
//   };

//   // ✅ Navigate to client selection
//   const navigateToClientSelection = () => {
//     navigation.navigate("Client-Screen", { 
//       onSelectClient: (client) => {
//         setSelectedClient(client);
//       } 
//     });
//   };

//   // ✅ Navigate to signature screen
//   const navigateToSignature = () => {
//     navigation.navigate("Signature-screen", {
//       onSignatureSave: (signatureUri) => {
//         setLatestSignature(signatureUri);
//       }
//     });
//   };

//   return (
//     <LinearGradient
//       colors={["#4cd04c27", "rgba(76, 208, 76, 0)"]}
//       style={styles.background}
//     >
//       {/* ✅ Custom Header */}
//       <View style={styles.customHeader}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Ionicons name="chevron-back" size={20} color="#ffffff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Invoice</Text>
//         <TouchableOpacity onPress={toggleVisibility}>
//           <Ionicons
//             name={showInvoiceNumber ? "eye-outline" : "eye-off-outline"}
//             size={22}
//             color="#000"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* ✅ Main Content */}
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Invoice Info Card */}
//         <TouchableOpacity
//           style={styles.invoiceInfoCard}
//           onPress={() =>
//             navigation.navigate("Invoice-info-screen", {
//               invoiceId,
//               startDate: startDate.toISOString(),
//               endDate: endDate.toISOString(),
//               po,
//               title,
//             })
//           }
//         >
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{title}</Text>
//             <Text style={styles.invoiceInfoDate}>
//               {`Date - ${formatDate(new Date(startDate))}`}
//             </Text>
//             <Text style={styles.invoiceInfoDate}>
//               {`Due - ${formatDate(new Date(endDate))}`}
//             </Text>
//             {po ? (
//               <Text style={styles.invoiceInfoDate}>{`PO - ${po}`}</Text>
//             ) : null}
//           </View>
//           <Text style={styles.invoiceNumber}>
//             {showInvoiceNumber ? invoiceId : "********"}
//           </Text>
//         </TouchableOpacity>

//         {/* Business & Client */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={() => navigation.navigate("company-profile")}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/briefcase.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Business Info</Text>
//             </View>
//             <View style={styles.rightSection}>
//               {companyData ? (
//                 <Text style={styles.valueText}>{companyData.companyName}</Text>
//               ) : (
//                 <View style={styles.addButton}>
//                   <Ionicons name="add" size={18} color="white" />
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={navigateToClientSelection}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/Mask group.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Client</Text>
//             </View>
//             <View style={styles.rightSection}>
//               {selectedClient ? (
//                 <Text style={styles.valueText}>{selectedClient.tradeName}</Text>
//               ) : (
//                 <View style={styles.addButton}>
//                   <Ionicons name="add" size={18} color="white" />
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Items & Charges */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={() => navigation.navigate("Add-item")}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/i.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Items</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem
//             icon={require("../../../assets/screen-14/hand.png")}
//             label="Quantity"
//             value={quantity}
//             onPress={() => openModal("quantity")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/price-tag.png")}
//             label="Price"
//             value={price ? `₹${price}` : ""}
//             onPress={() => openModal("price")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/discount.png")}
//             label="Discount"
//             value={
//               discountValue
//                 ? discountType === "flat"
//                   ? `₹${discountValue}`
//                   : `${discountValue}%`
//                 : ""
//             }
//             onPress={() => openModal("discount")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/delivery.png")}
//             label="Shipping Charges"
//             value={shipping ? `₹${shipping}` : ""}
//             onPress={() => openModal("shipping")}
//           />

//           {/* ✅ Payment Method from DB */}
//           <SectionItem
//             icon={require("../../../assets/screen-14/debit-card.png")}
//             label="Payment Method"
//             onPress={() => openModal("paymentMethod")}
//           />
//         </View>

//         {/* ✅ Terms & Signature */}
//         <View style={styles.sectionCard}>
//           <SectionItem
//             icon={require("../../../assets/screen-14/terms-and-conditions.png")}
//             label="Terms & Condition"
//             onPress={() => openModal("terms")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/signature.png")}
//             label="Signature"
//             onPress={navigateToSignature}
//             isSignature={true}
//             signatureUri={latestSignature}
//             showValue={false}
//           />
//         </View>
//       </ScrollView>

//       {/* ✅ Bottom Action Buttons */}
//       <View style={styles.actionButtonsContainer}>
//         <TouchableOpacity 
//           style={styles.previewButton}
//           onPress={handlePreview}
//         >
//           <Text style={styles.buttonTextWhite}>Preview</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={styles.createButton}
//           onPress={handleCreate}
//         >
//           <Text style={styles.buttonTextWhite}>Create</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ✅ MODALS */}
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalBox}>
//             {modalType === "quantity" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Quantity</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 1"
//                 />
//               </>
//             )}
//             {modalType === "price" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Price (INR)</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 1000"
//                 />
//               </>
//             )}
//             {modalType === "discount" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Discount</Text>
//                 <View style={styles.discountRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.discountOption,
//                       tempDiscountType === "flat" && styles.discountSelected,
//                     ]}
//                     onPress={() => setTempDiscountType("flat")}
//                   >
//                     <Text>Flat Amount</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[
//                       styles.discountOption,
//                       tempDiscountType === "percent" && styles.discountSelected,
//                     ]}
//                     onPress={() => setTempDiscountType("percent")}
//                   >
//                     <Text>Percentage</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 10"
//                 />
//               </>
//             )}
//             {modalType === "shipping" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Shipping Charges</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 200"
//                 />
//               </>
//             )}
//             {modalType === "paymentMethod" && (
//               <>
//                 <Text style={styles.modalLabel}>Payment Detail</Text>
//                 <View style={styles.textAreaWrapper}>
//                   <TextInput
//                     style={styles.textArea}
//                     value={tempValue}
//                     onChangeText={(text) => {
//                       if (text.length <= 500) setTempValue(text);
//                     }}
//                     placeholder="e.g. Bank Transfer, UPI, Cash..."
//                     multiline
//                     numberOfLines={5}
//                     textAlignVertical="top"
//                   />
//                   <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
//                 </View>
//               </>
//             )}
//             {modalType === "terms" && (
//               <>
//                 <Text style={styles.modalLabel}>Terms & Conditions</Text>
//                 <View style={styles.textAreaWrapper}>
//                   <TextInput
//                     style={styles.textArea}
//                     value={tempValue}
//                     onChangeText={(text) => {
//                       if (text.length <= 500) setTempValue(text);
//                     }}
//                     placeholder="Enter terms and conditions..."
//                     multiline
//                     numberOfLines={5}
//                     textAlignVertical="top"
//                   />
//                   <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
//                 </View>
//               </>
//             )}

//             {/* ✅ Buttons */}
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//                 <Text style={styles.buttonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { padding: 20, paddingBottom: 100 },

//   // ✅ Header
//   customHeader: {
//     backgroundColor: "#E3F8E3",
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
//   backButton: { backgroundColor: "#4CD04D", padding: 8, borderRadius: 20 },

//   // ✅ Invoice Info Card
//   invoiceInfoCard: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: { fontWeight: "bold", fontSize: 16 },
//   invoiceInfoDate: { fontSize: 12, color: "#555" },
//   invoiceNumber: { fontWeight: "bold", fontSize: 16 },

//   // ✅ Section Card
//   sectionCard: {
//     backgroundColor: "#fcfcfcff",
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: "#ccc",
//   },
//   iconLabel: { flexDirection: "row", alignItems: "center" },
//   icon: { width: 20, height: 20, marginRight: 12, resizeMode: "contain" },
//   label: { fontSize: 14 },
//   valueText: { fontSize: 12, color: "#888", marginRight: 4 },
//   rightSection: { flexDirection: "row", alignItems: "center" },
//   addButton: {
//     backgroundColor: "#000000ff",
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   signaturePreview: {
//     width: 40,
//     height: 20,
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 3,
//   },

//   // ✅ Modal
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//   },
//   modalLabel: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 20,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   cancelButton: {
//     backgroundColor: "#000000ff",
//     padding: 10,
//     borderRadius: 6,
//     flex: 1,
//     alignItems: "center",
//     marginRight: 5,
//   },
//   saveButton: {
//     backgroundColor: "#4CD04D",
//     padding: 10,
//     borderRadius: 6,
//     flex: 1,
//     alignItems: "center",
//     marginLeft: 5,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   // ✅ Discount Options
//   discountRow: { flexDirection: "row", marginBottom: 10 },
//   discountOption: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 8,
//     marginRight: 10,
//     width: 100,
//     alignItems: "center",
//   },
//   discountSelected: { backgroundColor: "#4CD04D33", borderColor: "#4CD04D" },

//   // ✅ TextArea (Payment / Terms)
//   textAreaWrapper: {
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     borderRadius: 8,
//     backgroundColor: "#F9FAFB",
//     padding: 10,
//     minHeight: 120,
//     marginBottom: 15,
//   },
//   textArea: {
//     fontSize: 14,
//     color: "#111827",
//     lineHeight: 20,
//     minHeight: 100,
//   },
//   charCount: {
//     alignSelf: "flex-end",
//     fontSize: 12,
//     color: "#9CA3AF",
//     marginTop: 4,
//   },

//   // ✅ Bottom Action Buttons
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   previewButton: {
//     backgroundColor: '#000',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   createButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     flex: 1,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   buttonTextWhite: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Modal,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import * as SQLite from "expo-sqlite";
// // ✅ SectionItem Component - Updated to show signature preview
// const SectionItem = ({ 
//   icon, 
//   label, 
//   value, 
//   onPress, 
//   showValue = true, 
//   isSignature = false, 
//   signatureUri = null 
// }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{label}</Text>
//     </View>
//     <View style={styles.rightSection}>
//       {showValue && value && !isSignature ? (
//         <Text style={styles.valueText}>{value}</Text>
//       ) : null}
      
//       {isSignature && signatureUri ? (
//         <Image 
//           source={{ uri: signatureUri }} 
//           style={styles.signaturePreview}
//           resizeMode="contain"
//         />
//       ) : null}
      
//       <Ionicons name="chevron-forward" size={18} color="#000" />
//     </View>
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [showInvoiceNumber, setShowInvoiceNumber] = useState(true);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalType, setModalType] = useState(null);

//   // ✅ Current values
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [discountType, setDiscountType] = useState("flat");
//   const [discountValue, setDiscountValue] = useState("");
//   const [shipping, setShipping] = useState("");

//   // ✅ Temp values (used in modals)
//   const [tempValue, setTempValue] = useState("");
//   const [tempDiscountType, setTempDiscountType] = useState("flat");

//   // ✅ DB fields
//   const [db, setDb] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [terms, setTerms] = useState("");
//   const [companyData, setCompanyData] = useState(null);
//   const [selectedClient, setSelectedClient] = useState(null);

//   const navigateToSignature = () => {
//     navigation.navigate("Signature-list", { from: "invoice" });
//   };

//   const {
//     invoiceId = `INV${String(1).padStart(5, "0")}`,
//     startDate = new Date(),
//     endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     po = "",
//     title = "Invoice Info",
//     selectedClient: routeClient = null,
//   } = route.params || {};

//   // ✅ Set selected client from route params
//   useEffect(() => {
//     if (routeClient) {
//       setSelectedClient(routeClient);
//     }
//   }, [routeClient]);

//   const toggleVisibility = () => setShowInvoiceNumber(!showInvoiceNumber);
//   const formatDate = (date) => date.toLocaleDateString("en-GB");

//   const openModal = (type) => {
//     setModalType(type);
//     // set temp values from current states
//     if (type === "quantity") setTempValue(quantity);
//     if (type === "price") setTempValue(price);
//     if (type === "discount") {
//       setTempValue(discountValue);
//       setTempDiscountType(discountType);
//     }
//     if (type === "shipping") setTempValue(shipping);
//     if (type === "paymentMethod") setTempValue(paymentMethod);
//     if (type === "terms") setTempValue(terms);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalType(null);
//   };

//   // ✅ DB INIT
//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync("userdb.db", {
//           useNewConnection: true,
//         });

//         await database.execAsync(`
//           CREATE TABLE IF NOT EXISTS invoiceMeta (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             paymentMethod TEXT,
//             terms TEXT
//           );
          
//           CREATE TABLE IF NOT EXISTS company (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             companyName TEXT,
//             email TEXT,
//             phone TEXT,
//             address TEXT,
//             taxNo TEXT,
//             taxType TEXT,
//             businessNature TEXT,
//             logo TEXT
//           );
          
//           CREATE TABLE IF NOT EXISTS invoices (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             invoiceId TEXT,
//             startDate TEXT,
//             endDate TEXT,
//             po TEXT,
//             quantity REAL,
//             price REAL,
//             discountType TEXT,
//             discountValue REAL,
//             shipping REAL,
//             subtotal REAL,
//             total REAL,
//             paymentMethod TEXT,
//             terms TEXT,
//             companyName TEXT,
//             companyEmail TEXT,
//             companyPhone TEXT,
//             companyAddress TEXT,
//             companyTaxNo TEXT,
//             companyTaxType TEXT,
//             companyBusinessNature TEXT,
//             companyLogo TEXT,
//             clientId INTEGER,
//             clientName TEXT,
//             clientEmail TEXT,
//             clientPhone TEXT,
//             clientAddress TEXT,
//             clientShippingAddress TEXT,
//             clientTaxNo TEXT,
//             clientTaxType TEXT,
//             clientBusinessNature TEXT,
//             clientDetail TEXT,
//             signatureUri TEXT, 
//             createdAt TEXT DEFAULT (datetime('now', 'localtime'))
//           );
//         `);

//         setDb(database);

//         const result = await database.getFirstAsync(
//           "SELECT * FROM invoiceMeta ORDER BY id DESC LIMIT 1"
//         );

//         if (result) {
//           setPaymentMethod(result.paymentMethod || "");
//           setTerms(result.terms || "");
//         }

//         // Load company data if exists
//         const companyResult = await database.getFirstAsync(
//           "SELECT * FROM company ORDER BY id DESC LIMIT 1"
//         );
//         if (companyResult) {
//           setCompanyData(companyResult);
//         }
//       } catch (err) {
//         console.error("DB Init Error:", err);
//       }
//     };
//     initDb();
//   }, []);


//   // ✅ Save handler
//   const handleSave = async () => {
//     if (modalType === "quantity") setQuantity(tempValue);
//     if (modalType === "price") setPrice(tempValue);
//     if (modalType === "discount") {
//       setDiscountValue(tempValue);
//       setDiscountType(tempDiscountType);
//     }
//     if (modalType === "shipping") setShipping(tempValue);

//     if (modalType === "paymentMethod" && db) {
//       await db.runAsync(
//         `INSERT INTO invoiceMeta (paymentMethod, terms) VALUES (?, ?)`,
//         [tempValue, terms]
//       );
//       setPaymentMethod(tempValue);
//     }

//     if (modalType === "terms" && db) {
//       await db.runAsync(
//         `INSERT INTO invoiceMeta (paymentMethod, terms) VALUES (?, ?)`,
//         [paymentMethod, tempValue]
//       );
//       setTerms(tempValue);
//     }

//     closeModal();
//   };

//   // ✅ Handle Preview
//   const handlePreview = () => {
//     if (!companyData) {
//       Alert.alert("Error", "Company information is required");
//       return;
//     }
    
//     navigation.navigate("InvoicePreview", {
//       invoiceData: {
//         invoiceId,
//         startDate,
//         endDate,
//         po,
//         quantity,
//         price,
//         discountType,
//         discountValue,
//         shipping,
//         paymentMethod,
//         terms,
//         companyData,
//         selectedClient,
//       }
//     });
//   };

//   // ✅ Handle Create
//   const handleCreate = async () => {
//     if (!db) {
//       Alert.alert("Error", "Database not initialized");
//       return;
//     }

//     if (!quantity || !price) {
//       Alert.alert("Error", "Please fill in required fields (quantity and price)");
//       return;
//     }

//     if (!companyData) {
//       Alert.alert("Error", "Company information is required");
//       return;
//     }

//     try {
//       // Calculate totals
//       const subtotal = parseFloat(quantity) * parseFloat(price);
//       const discountAmount = discountType === "flat" 
//         ? parseFloat(discountValue || 0) 
//         : subtotal * (parseFloat(discountValue || 0) / 100);
//       const total = subtotal - discountAmount + parseFloat(shipping || 0);

      
//       await db.runAsync(
//         `INSERT INTO invoices (
//           invoiceId, 
//           startDate, 
//           endDate, 
//           po, 
//           quantity, 
//           price, 
//           discountType, 
//           discountValue, 
//           shipping, 
//           subtotal, 
//           total,
//           paymentMethod,
//           terms,
//           companyName,
//           companyEmail,
//           companyPhone,
//           companyAddress,
//           companyTaxNo,
//           companyTaxType,
//           companyBusinessNature,
//           companyLogo,
//           clientId,
//           clientName,
//           clientEmail,
//           clientPhone,
//           clientAddress,
//           clientShippingAddress,
//           clientTaxNo,
//           clientTaxType,
//           clientBusinessNature,
//           clientDetail,
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           invoiceId,
//           startDate.toISOString(),
//           endDate.toISOString(),
//           po,
//           quantity,
//           price,
//           discountType,
//           discountValue,
//           shipping,
//           subtotal,
//           total,
//           paymentMethod,
//           terms,
//           companyData.companyName,
//           companyData.email,
//           companyData.phone,
//           companyData.address,
//           companyData.taxNo,
//           companyData.taxType,
//           companyData.businessNature,
//           companyData.logo || null,
//           selectedClient?.id || null,
//           selectedClient?.tradeName || "",
//           selectedClient?.email || "",
//           selectedClient?.phone || "",
//           selectedClient?.address || "",
//           selectedClient?.shippingAddress || "",
//           selectedClient?.taxNo || "",
//           selectedClient?.taxType || "",
//           selectedClient?.businessNature || "",
//           selectedClient?.clientDetail || "",
//         ]
//       );

//       Alert.alert("Success", "Invoice created successfully!", [
//         { text: "OK", onPress: () => navigation.goBack() }
//       ]);
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//       Alert.alert("Error", "Failed to create invoice");
//     }
//   };

//   // ✅ Navigate to client selection
//   const navigateToClientSelection = () => {
//     navigation.navigate("Client-Screen", { 
//       onSelectClient: (client) => {
//         setSelectedClient(client);
//       } 
//     });
//   };


//   return (
//     <LinearGradient
//       colors={["#4cd04c27", "rgba(76, 208, 76, 0)"]}
//       style={styles.background}
//     >
//       {/* ✅ Custom Header */}
//       <View style={styles.customHeader}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Ionicons name="chevron-back" size={20} color="#ffffff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Invoice</Text>
//         <TouchableOpacity onPress={toggleVisibility}>
//           <Ionicons
//             name={showInvoiceNumber ? "eye-outline" : "eye-off-outline"}
//             size={22}
//             color="#000"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* ✅ Main Content */}
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Invoice Info Card */}
//         <TouchableOpacity
//           style={styles.invoiceInfoCard}
//           onPress={() =>
//             navigation.navigate("Invoice-info-screen", {
//               invoiceId,
//               startDate: startDate.toISOString(),
//               endDate: endDate.toISOString(),
//               po,
//               title,
//             })
//           }
//         >
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{title}</Text>
//             <Text style={styles.invoiceInfoDate}>
//               {`Date - ${formatDate(new Date(startDate))}`}
//             </Text>
//             <Text style={styles.invoiceInfoDate}>
//               {`Due - ${formatDate(new Date(endDate))}`}
//             </Text>
//             {po ? (
//               <Text style={styles.invoiceInfoDate}>{`PO - ${po}`}</Text>
//             ) : null}
//           </View>
//           <Text style={styles.invoiceNumber}>
//             {showInvoiceNumber ? invoiceId : "********"}
//           </Text>
//         </TouchableOpacity>

//         {/* Business & Client */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={() => navigation.navigate("company-profile")}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/briefcase.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Business Info</Text>
//             </View>
//             <View style={styles.rightSection}>
//               {companyData ? (
//                 <Text style={styles.valueText}>{companyData.companyName}</Text>
//               ) : (
//                 <View style={styles.addButton}>
//                   <Ionicons name="add" size={18} color="white" />
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={navigateToClientSelection}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/Mask group.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Client</Text>
//             </View>
//             <View style={styles.rightSection}>
//               {selectedClient ? (
//                 <Text style={styles.valueText}>{selectedClient.tradeName}</Text>
//               ) : (
//                 <View style={styles.addButton}>
//                   <Ionicons name="add" size={18} color="white" />
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Items & Charges */}
//         <View style={styles.sectionCard}>
//           <TouchableOpacity
//             style={styles.sectionRow}
//             onPress={() => navigation.navigate("Add-item")}
//           >
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require("../../../assets/screen-14/i.png")}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>Items</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem
//             icon={require("../../../assets/screen-14/hand.png")}
//             label="Quantity"
//             value={quantity}
//             onPress={() => openModal("quantity")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/price-tag.png")}
//             label="Price"
//             value={price ? `₹${price}` : ""}
//             onPress={() => openModal("price")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/discount.png")}
//             label="Discount"
//             value={
//               discountValue
//                 ? discountType === "flat"
//                   ? `₹${discountValue}`
//                   : `${discountValue}%`
//                 : ""
//             }
//             onPress={() => openModal("discount")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/delivery.png")}
//             label="Shipping Charges"
//             value={shipping ? `₹${shipping}` : ""}
//             onPress={() => openModal("shipping")}
//           />

//           {/* ✅ Payment Method from DB */}
//           <SectionItem
//             icon={require("../../../assets/screen-14/debit-card.png")}
//             label="Payment Method"
//             onPress={() => openModal("paymentMethod")}
//           />
//         </View>

//         {/* ✅ Terms & Signature */}
//         <View style={styles.sectionCard}>
//           <SectionItem
//             icon={require("../../../assets/screen-14/terms-and-conditions.png")}
//             label="Terms & Condition"
//             onPress={() => openModal("terms")}
//           />
//           <SectionItem
//             icon={require("../../../assets/screen-14/signature.png")}
//             label="Signature"
//             onPress={navigateToSignature}
//             isSignature={true}
//             showValue={false}
//           />
//         </View>
//       </ScrollView>

//       {/* ✅ Bottom Action Buttons */}
//       <View style={styles.actionButtonsContainer}>
//         <TouchableOpacity 
//           style={styles.previewButton}
//           onPress={handlePreview}
//         >
//           <Text style={styles.buttonTextWhite}>Preview</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={styles.createButton}
//           onPress={handleCreate}
//         >
//           <Text style={styles.buttonTextWhite}>Create</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ✅ MODALS */}
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalBox}>
//             {modalType === "quantity" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Quantity</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 1"
//                 />
//               </>
//             )}
//             {modalType === "price" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Price</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 1000"
//                 />
//               </>
//             )}
//             {modalType === "discount" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Discount</Text>
//                 <View style={styles.discountRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.discountOption,
//                       tempDiscountType === "flat" && styles.discountSelected,
//                     ]}
//                     onPress={() => setTempDiscountType("flat")}
//                   >
//                     <Text>Flat Amount</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[
//                       styles.discountOption,
//                       tempDiscountType === "percent" && styles.discountSelected,
//                     ]}
//                     onPress={() => setTempDiscountType("percent")}
//                   >
//                     <Text>Percentage</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 10"
//                 />
//               </>
//             )}
//             {modalType === "shipping" && (
//               <>
//                 <Text style={styles.modalLabel}>Enter Shipping Charges</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={tempValue}
//                   onChangeText={setTempValue}
//                   placeholder="e.g. 200"
//                 />
//               </>
//             )}
//             {modalType === "paymentMethod" && (
//               <>
//                 <Text style={styles.modalLabel}>Payment Detail</Text>
//                 <View style={styles.textAreaWrapper}>
//                   <TextInput
//                     style={styles.textArea}
//                     value={tempValue}
//                     onChangeText={(text) => {
//                       if (text.length <= 500) setTempValue(text);
//                     }}
//                     placeholder="e.g. Bank Transfer, UPI, Cash..."
//                     multiline
//                     numberOfLines={5}
//                     textAlignVertical="top"
//                   />
//                   <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
//                 </View>
//               </>
//             )}
//             {modalType === "terms" && (
//               <>
//                 <Text style={styles.modalLabel}>Terms & Conditions</Text>
//                 <View style={styles.textAreaWrapper}>
//                   <TextInput
//                     style={styles.textArea}
//                     value={tempValue}
//                     onChangeText={(text) => {
//                       if (text.length <= 500) setTempValue(text);
//                     }}
//                     placeholder="Enter terms and conditions..."
//                     multiline
//                     numberOfLines={5}
//                     textAlignVertical="top"
//                   />
//                   <Text style={styles.charCount}>{`${tempValue.length}/500`}</Text>
//                 </View>
//               </>
//             )}

//             {/* ✅ Buttons */}
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//                 <Text style={styles.buttonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { padding: 20, paddingBottom: 100 },

//   // ✅ Header
//   customHeader: {
//     backgroundColor: "#E3F8E3",
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
//   backButton: { backgroundColor: "#4CD04D", padding: 8, borderRadius: 20 },

//   // ✅ Invoice Info Card
//   invoiceInfoCard: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: { fontWeight: "bold", fontSize: 16 },
//   invoiceInfoDate: { fontSize: 12, color: "#555" },
//   invoiceNumber: { fontWeight: "bold", fontSize: 16 },

//   // ✅ Section Card
//   sectionCard: {
//     backgroundColor: "#fcfcfcff",
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: "#ccc",
//   },
//   iconLabel: { flexDirection: "row", alignItems: "center" },
//   icon: { width: 20, height: 20, marginRight: 12, resizeMode: "contain" },
//   label: { fontSize: 14 },
//   valueText: { fontSize: 12, color: "#888", marginRight: 4 },
//   rightSection: { flexDirection: "row", alignItems: "center" },
//   addButton: {
//     backgroundColor: "#000000ff",
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   signaturePreview: {
//     width: 40,
//     height: 20,
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 3,
//   },

//   // ✅ Modal
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//   },
//   modalLabel: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 20,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   cancelButton: {
//     backgroundColor: "#000000ff",
//     padding: 10,
//     borderRadius: 6,
//     flex: 1,
//     alignItems: "center",
//     marginRight: 5,
//   },
//   saveButton: {
//     backgroundColor: "#4CD04D",
//     padding: 10,
//     borderRadius: 6,
//     flex: 1,
//     alignItems: "center",
//     marginLeft: 5,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   // ✅ Discount Options
//   discountRow: { flexDirection: "row", marginBottom: 10 },
//   discountOption: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 8,
//     marginRight: 10,
//     width: 100,
//     alignItems: "center",
//   },
//   discountSelected: { backgroundColor: "#4CD04D33", borderColor: "#4CD04D" },

//   // ✅ TextArea (Payment / Terms)
//   textAreaWrapper: {
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     borderRadius: 8,
//     backgroundColor: "#F9FAFB",
//     padding: 10,
//     minHeight: 120,
//     marginBottom: 15,
//   },
//   textArea: {
//     fontSize: 14,
//     color: "#111827",
//     lineHeight: 20,
//     minHeight: 100,
//   },
//   charCount: {
//     alignSelf: "flex-end",
//     fontSize: 12,
//     color: "#9CA3AF",
//     marginTop: 4,
//   },

//   // ✅ Bottom Action Buttons
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   previewButton: {
//     backgroundColor: '#000',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   createButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     flex: 1,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   buttonTextWhite: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

// ✅ SectionItem Component - Updated to show signature preview
const SectionItem = ({ 
  icon, 
  label, 
  value, 
  onPress, 
  showValue = true, 
  isSignature = false, 
  signatureUri = null 
}) => (
  <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
    <View style={styles.iconLabel}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.rightSection}>
      {showValue && value && !isSignature ? (
        <Text style={styles.valueText}>{value}</Text>
      ) : null}
      
      {isSignature && signatureUri ? (
        <Image 
          source={{ uri: signatureUri }} 
          style={styles.signaturePreview}
          resizeMode="contain"
        />
      ) : null}
      
      <Ionicons name="chevron-forward" size={18} color="#000" />
    </View>
  </TouchableOpacity>
);

export default function NewInvoiceScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [showInvoiceNumber, setShowInvoiceNumber] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  // ✅ Current values
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("flat");
  const [discountValue, setDiscountValue] = useState("");
  const [shipping, setShipping] = useState("");

  // ✅ Temp values (used in modals)
  const [tempValue, setTempValue] = useState("");
  const [tempDiscountType, setTempDiscountType] = useState("flat");

  // ✅ DB fields
  const [db, setDb] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // ✅ Extract parameters from route
  const {
    invoiceId = 1,
    invoiceData = {}
  } = route.params || {};

  const invoiceNumber = `INV${String(invoiceId).padStart(5, "0")}`;
  const { 
    startDate = new Date(), 
    endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    po = "", 
    title = "Invoice Info" 
  } = invoiceData;

  // ✅ Set selected client from route params if available
  useEffect(() => {
    if (route.params?.selectedClient) {
      setSelectedClient(route.params.selectedClient);
    }
  }, [route.params?.selectedClient]);

  const toggleVisibility = () => setShowInvoiceNumber(!showInvoiceNumber);
  const formatDate = (date) => {
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleDateString("en-GB", {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const openModal = (type) => {
    setModalType(type);
    // set temp values from current states
    if (type === "quantity") setTempValue(quantity);
    if (type === "price") setTempValue(price);
    if (type === "discount") {
      setTempValue(discountValue);
      setTempDiscountType(discountType);
    }
    if (type === "shipping") setTempValue(shipping);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  // ✅ DB INIT
  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync("userdb.db", {
          useNewConnection: true,
        });

        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS company (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyName TEXT,
            email TEXT,
            phone TEXT,
            address TEXT,
            taxNo TEXT,
            taxType TEXT,
            businessNature TEXT,
            logo TEXT
          );
          
          CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            invoiceNo TEXT,
            startDate TEXT,
            endDate TEXT,
            po TEXT,
            title TEXT,
            quantity REAL,
            price REAL,
            discountType TEXT,
            discountValue REAL,
            shipping REAL,
            subtotal REAL,
            total REAL,
            companyName TEXT,
            companyEmail TEXT,
            companyPhone TEXT,
            companyAddress TEXT,
            companyTaxNo TEXT,
            companyTaxType TEXT,
            companyBusinessNature TEXT,
            companyLogo TEXT,
            clientId INTEGER,
            clientName TEXT,
            clientEmail TEXT,
            clientPhone TEXT,
            clientAddress TEXT,
            clientShippingAddress TEXT,
            clientTaxNo TEXT,
            clientTaxType TEXT,
            clientBusinessNature TEXT,
            clientDetail TEXT,
            signatureUri TEXT, 
            createdAt TEXT DEFAULT (datetime('now', 'localtime'))
          );
        `);

        setDb(database);

        // Load company data if exists
        const companyResult = await database.getFirstAsync(
          "SELECT * FROM company ORDER BY id DESC LIMIT 1"
        );
        if (companyResult) {
          setCompanyData(companyResult);
        }
      } catch (err) {
        console.error("DB Init Error:", err);
      }
    };
    initDb();
  }, []);

  // ✅ Save handler for modal inputs
  const handleSave = async () => {
    if (modalType === "quantity") setQuantity(tempValue);
    if (modalType === "price") setPrice(tempValue);
    if (modalType === "discount") {
      setDiscountValue(tempValue);
      setDiscountType(tempDiscountType);
    }
    if (modalType === "shipping") setShipping(tempValue);

    closeModal();
  };

  // ✅ Handle Preview
  const handlePreview = () => {
    if (!companyData) {
      Alert.alert("Error", "Company information is required");
      return;
    }
    
    navigation.navigate("InvoicePreview", {
      invoiceData: {
        invoiceId: invoiceNumber,
        startDate,
        endDate,
        po,
        title,
        quantity,
        price,
        discountType,
        discountValue,
        shipping,
        companyData,
        selectedClient,
      }
    });
  };

  // ✅ Handle Create
  const handleCreate = async () => {
    if (!db) {
      Alert.alert("Error", "Database not initialized");
      return;
    }

    if (!quantity || !price) {
      Alert.alert("Error", "Please fill in required fields (quantity and price)");
      return;
    }

    if (!companyData) {
      Alert.alert("Error", "Company information is required");
      return;
    }

    try {
      // Calculate totals
      const subtotal = parseFloat(quantity) * parseFloat(price);
      const discountAmount = discountType === "flat" 
        ? parseFloat(discountValue || 0) 
        : subtotal * (parseFloat(discountValue || 0) / 100);
      const total = subtotal - discountAmount + parseFloat(shipping || 0);

      await db.runAsync(
        `INSERT INTO invoices (
          invoiceNo, 
          startDate, 
          endDate, 
          po, 
          title,
          quantity, 
          price, 
          discountType, 
          discountValue, 
          shipping, 
          subtotal, 
          total,
          companyName,
          companyEmail,
          companyPhone,
          companyAddress,
          companyTaxNo,
          companyTaxType,
          companyBusinessNature,
          companyLogo,
          clientId,
          clientName,
          clientEmail,
          clientPhone,
          clientAddress,
          clientShippingAddress,
          clientTaxNo,
          clientTaxType,
          clientBusinessNature,
          clientDetail
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          invoiceNumber,
          typeof startDate === 'string' ? startDate : startDate.toISOString(),
          typeof endDate === 'string' ? endDate : endDate.toISOString(),
          po,
          title,
          quantity,
          price,
          discountType,
          discountValue,
          shipping,
          subtotal,
          total,
          companyData.companyName,
          companyData.email,
          companyData.phone,
          companyData.address,
          companyData.taxNo,
          companyData.taxType,
          companyData.businessNature,
          companyData.logo || null,
          selectedClient?.id || null,
          selectedClient?.tradeName || selectedClient?.clientName || "",
          selectedClient?.email || "",
          selectedClient?.phone || "",
          selectedClient?.address || "",
          selectedClient?.shippingAddress || "",
          selectedClient?.taxNo || "",
          selectedClient?.taxType || "",
          selectedClient?.businessNature || "",
          selectedClient?.clientDetail || "",
        ]
      );

      Alert.alert("Success", "Invoice created successfully!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Error creating invoice:", error);
      Alert.alert("Error", "Failed to create invoice");
    }
  };

  // ✅ Navigate to client selection
  const navigateToClientSelection = () => {
    navigation.navigate("Client-Screen", { 
      onSelectClient: (client) => {
        setSelectedClient(client);
      } 
    });
  };

  // ✅ Navigate to invoice info screen
  const navigateToInvoiceInfo = () => {
    navigation.navigate("Invoice-info-screen", {
      invoiceId,
      invoiceData: {
        startDate: typeof startDate === 'string' ? startDate : startDate.toISOString(),
        endDate: typeof endDate === 'string' ? endDate : endDate.toISOString(),
        po,
        title
      }
    });
  };

  const navigateToSignature = () => {
    navigation.navigate("Signature-list", { from: "invoice" });
  };
  const navigateToPayment = () => {
    navigation.navigate("Payment-method-list", { from: "invoice" });
  };
  const navigateToTerms = () => {
    navigation.navigate("Terms-Condition-list", { from: "invoice" });
  };

  return (
    <LinearGradient
      colors={["#4cd04c27", "rgba(76, 208, 76, 0)"]}
      style={styles.background}
    >
      {/* ✅ Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Invoice</Text>
        <TouchableOpacity onPress={toggleVisibility}>
          <Ionicons
            name={showInvoiceNumber ? "eye-outline" : "eye-off-outline"}
            size={22}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Invoice Info Card */}
        <TouchableOpacity
          style={styles.invoiceInfoCard}
          onPress={navigateToInvoiceInfo}
        >
          <View>
            <Text style={styles.invoiceInfoTitle}>{title}</Text>
            <Text style={styles.invoiceInfoDate}>
              {`Date - ${formatDate(startDate)}`}
            </Text>
            <Text style={styles.invoiceInfoDate}>
              {`Due - ${formatDate(endDate)}`}
            </Text>
            {po ? (
              <Text style={styles.invoiceInfoDate}>{`PO - ${po}`}</Text>
            ) : null}
          </View>
          <Text style={styles.invoiceNumber}>
            {showInvoiceNumber ? invoiceNumber : "********"}
          </Text>
        </TouchableOpacity>

        {/* Business & Client */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.sectionRow}
            onPress={() => navigation.navigate("company-profile")}
          >
            <View style={styles.iconLabel}>
              <Image
                source={require("../../../assets/screen-14/briefcase.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Business Info</Text>
            </View>
            <View style={styles.rightSection}>
              {companyData ? (
                <Text style={styles.valueText}>{companyData.companyName}</Text>
              ) : (
                <View style={styles.addButton}>
                  <Ionicons name="add" size={18} color="white" />
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionRow}
            onPress={navigateToClientSelection}
          >
            <View style={styles.iconLabel}>
              <Image
                source={require("../../../assets/screen-14/Mask group.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Client</Text>
            </View>
            <View style={styles.rightSection}>
              {selectedClient ? (
                <Text style={styles.valueText}>{selectedClient.tradeName || selectedClient.clientName}</Text>
              ) : (
                <View style={styles.addButton}>
                  <Ionicons name="add" size={18} color="white" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Items & Charges */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.sectionRow}
            onPress={() => navigation.navigate("Item-list")}
          >
            <View style={styles.iconLabel}>
              <Image
                source={require("../../../assets/screen-14/i.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Items</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <SectionItem
            icon={require("../../../assets/screen-14/hand.png")}
            label="Quantity"
            value={quantity}
            onPress={() => openModal("quantity")}
          />
          <SectionItem
            icon={require("../../../assets/screen-14/price-tag.png")}
            label="Price"
            value={price ? `₹${price}` : ""}
            onPress={() => openModal("price")}
          />
          <SectionItem
            icon={require("../../../assets/screen-14/discount.png")}
            label="Discount"
            value={
              discountValue
                ? discountType === "flat"
                  ? `₹${discountValue}`
                  : `${discountValue}%`
                : ""
            }
            onPress={() => openModal("discount")}
          />
          <SectionItem
            icon={require("../../../assets/screen-14/delivery.png")}
            label="Shipping Charges"
            value={shipping ? `₹${shipping}` : ""}
            onPress={() => openModal("shipping")}
          />

          {/* ✅ Payment Method UI */}
          <SectionItem
            icon={require("../../../assets/screen-14/debit-card.png")}
            label="Payment Method"
            onPress={navigateToPayment}
          />
        </View>

        {/* ✅ Terms & Signature */}
        <View style={styles.sectionCard}>
          {/* ✅ Terms & Conditions UI */}
          <SectionItem
            icon={require("../../../assets/screen-14/terms-and-conditions.png")}
            label="Terms & Condition"
            onPress={navigateToTerms}
          />
          <SectionItem
            icon={require("../../../assets/screen-14/signature.png")}
            label="Signature"
            onPress={navigateToSignature}
            isSignature={true}
            showValue={false}
          />
        </View>
      </ScrollView>

      {/* ✅ Bottom Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.previewButton}
          onPress={handlePreview}
        >
          <Text style={styles.buttonTextWhite}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreate}
        >
          <Text style={styles.buttonTextWhite}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ MODALS */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            {modalType === "quantity" && (
              <>
                <Text style={styles.modalLabel}>Enter Quantity</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={tempValue}
                  onChangeText={setTempValue}
                  placeholder="e.g. 1"
                />
              </>
            )}
            {modalType === "price" && (
              <>
                <Text style={styles.modalLabel}>Enter Price</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={tempValue}
                  onChangeText={setTempValue}
                  placeholder="e.g. 1000"
                />
              </>
            )}
            {modalType === "discount" && (
              <>
                <Text style={styles.modalLabel}>Enter Discount</Text>
                <View style={styles.discountRow}>
                  <TouchableOpacity
                    style={[
                      styles.discountOption,
                      tempDiscountType === "flat" && styles.discountSelected,
                    ]}
                    onPress={() => setTempDiscountType("flat")}
                  >
                    <Text>Flat Amount</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.discountOption,
                      tempDiscountType === "percent" && styles.discountSelected,
                    ]}
                    onPress={() => setTempDiscountType("percent")}
                  >
                    <Text>Percentage</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={tempValue}
                  onChangeText={setTempValue}
                  placeholder="e.g. 10"
                />
              </>
            )}
            {modalType === "shipping" && (
              <>
                <Text style={styles.modalLabel}>Enter Shipping Charges</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={tempValue}
                  onChangeText={setTempValue}
                  placeholder="e.g. 200"
                />
              </>
            )}

            {/* ✅ Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 100 },

  // ✅ Header
  customHeader: {
    backgroundColor: "#E3F8E3",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  backButton: { backgroundColor: "#4CD04D", padding: 8, borderRadius: 20 },

  // ✅ Invoice Info Card
  invoiceInfoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    elevation: 2,
  },
  invoiceInfoTitle: { fontWeight: "bold", fontSize: 16 },
  invoiceInfoDate: { fontSize: 12, color: "#555" },
  invoiceNumber: { fontWeight: "bold", fontSize: 16 },

  // ✅ Section Card
  sectionCard: {
    backgroundColor: "#fcfcfcff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  iconLabel: { flexDirection: "row", alignItems: "center" },
  icon: { width: 20, height: 20, marginRight: 12, resizeMode: "contain" },
  label: { fontSize: 14 },
  valueText: { fontSize: 12, color: "#888", marginRight: 4 },
  rightSection: { flexDirection: "row", alignItems: "center" },
  addButton: {
    backgroundColor: "#000000ff",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  signaturePreview: {
    width: 40,
    height: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
  },

  // ✅ Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalLabel: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#000000ff",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: "#4CD04D",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },

  // ✅ Discount Options
  discountRow: { flexDirection: "row", marginBottom: 10 },
  discountOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginRight: 10,
    width: 100,
    alignItems: "center",
  },
  discountSelected: { backgroundColor: "#4CD04D33", borderColor: "#4CD04D" },

  // ✅ Bottom Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  previewButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#4CD04D',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});