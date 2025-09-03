
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
        <Text
          style={styles.valueText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value.length > 20 ? `${value.substring(0, 20)}...` : value}
        </Text>
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

  // ✅ Add selectedItems state
  const [selectedItems, setSelectedItems] = useState([]);

  // ✅ Add selectedPaymentMethod state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // ✅ Add selectedTerms state
  const [selectedTerms, setSelectedTerms] = useState("");

  // ✅ Add selectedSignature state
  const [selectedSignature, setSelectedSignature] = useState(null);

  // ✅ Extract parameters from route
  const {
    invoiceId = 1,
    invoiceData = {}
  } = route.params || {};

  const invoiceNumber = `${String(invoiceId).padStart(5, "0")}`;
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

  // ✅ Set selected payment method from route params if available
  useEffect(() => {
    if (route.params?.selectedPaymentMethod) {
      setSelectedPaymentMethod(route.params.selectedPaymentMethod);
    }
  }, [route.params?.selectedPaymentMethod]);

  // ✅ Set selected terms from route params if available
  useEffect(() => {
    if (route.params?.selectedTerms) {
      setSelectedTerms(route.params.selectedTerms);
      navigation.setParams({ selectedTerms: undefined });
    }
  }, [route.params?.selectedTerms]);

  // ✅ Set selected signature from route params if available
  useEffect(() => {
    if (route.params?.selectedSignature) {
      setSelectedSignature(route.params.selectedSignature);
      navigation.setParams({ selectedSignature: undefined });
    }
  }, [route.params?.selectedSignature]);

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
            paymentMethod TEXT,
            termsConditions TEXT,
            itemsData TEXT,
            templateType TEXT DEFAULT 'template1',
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

  // ✅ CALCULATION FUNCTIONS - FIXED
  const calculateSubtotal = () => {
    let subtotal = 0;
    
    if (selectedItems.length > 0) {
      // Calculate subtotal for all selected items
      selectedItems.forEach(item => {
        const itemQuantity = parseFloat(item.quantity)|| 1 ;
        const itemPrice = parseFloat(item.itemPrice) || 0;
        subtotal =itemQuantity * itemPrice;
        console.log(subtotal, item ,  itemPrice)
      });
    } else {
      // Manual entry fallback (single item)
      const qty = parseFloat(quantity) || 0;
      const prc = parseFloat(price) || 0;
      subtotal = qty * prc;
    }
    
    return subtotal;
  };

  const calculateDiscountAmount = (subtotal) => {
    if (!discountValue) return 0;
    
    return discountType === "flat" 
      ? parseFloat(discountValue) 
      : subtotal * (parseFloat(discountValue) / 100);
  };

  const calculateShippingAmount = () => {
    return parseFloat(shipping) || 0;
  };

  
  // ✅ Get all calculated values
  const getCalculatedValues = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount(subtotal);
    const shippingAmount = calculateShippingAmount();
    const total = subtotal - discountAmount + shippingAmount;
    
    return {
      subtotal,
      discountAmount,
      shippingAmount,
      total
    };
  };

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

  // ✅ Navigate to item selection
  const navigateToItemSelection = () => {
    navigation.navigate("Item-list", {
      isSelectionMode: true,
      onItemsSelected: (items) => {
        setSelectedItems(items);

        if (items.length === 1) {
          const item = items[0];
          setQuantity("1");
          setPrice(item.itemPrice.toString());
        }
      }
    });
  };

  // ✅ Handle Preview - Navigate to Template Selector
  const handlePreview = () => {
    if (!companyData) {
      Alert.alert("Error", "Company information is required");
      return;
    }

    if ((!quantity || !price) && selectedItems.length === 0) {
      Alert.alert("Error", "Please fill in required fields (quantity and price) or select items");
      return;
    }

    const calculatedValues = getCalculatedValues();
    
    // Prepare invoice data for preview
    const previewData = {
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
      selectedItems,
      selectedPaymentMethod,
      selectedTerms,
      signatureUri: selectedSignature,
      ...calculatedValues
    };
    
    // Navigate to template selector with the data
    navigation.navigate("TemplateSelector", { invoiceData: previewData });
  };

  // ✅ Handle Create - Save to Database
  const handleCreate = async () => {
    if (!db) {
      Alert.alert("Error", "Database not initialized");
      return;
    }

    if ((!quantity || !price) && selectedItems.length === 0) {
      Alert.alert("Error", "Please fill in required fields (quantity and price) or select items");
      return;
    }

    if (!companyData) {
      Alert.alert("Error", "Company information is required");
      return;
    }

    try {
      const calculatedValues = getCalculatedValues();

      // Prepare items data as JSON string
      const itemsJson = JSON.stringify(selectedItems);

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
          clientDetail,
          signatureUri,
          paymentMethod,
          termsConditions,
          itemsData,
          templateType
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
          calculatedValues.subtotal,
          calculatedValues.total,
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
          selectedSignature || null,
          selectedPaymentMethod || "",
          selectedTerms || "",
          itemsJson,
          "template1"
        ]
      );

      Alert.alert("Success", "Invoice created successfully!", [
        { text: "OK" }
      ]);
      handlePreview()
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

  // ✅ Navigate to signature selection
  const navigateToSignature = () => {
    navigation.navigate("Signature-list", {
      from: "invoice",
      onSignatureSave: (signatureUri) => {
        setSelectedSignature(signatureUri);
      }
    });
  };

  // ✅ Navigate to payment method selection
  const navigateToPayment = () => {
    navigation.navigate("Payment-method-list", {
      from: "invoice",
      onPaymentMethodSave: (method) => setSelectedPaymentMethod(method)
    });
  };

  // ✅ Navigate to terms selection
  const navigateToTerms = () => {
    navigation.navigate("Terms-Condition-list", {
      from: "invoice",
      onTermsSave: (terms) => {
        setSelectedTerms(terms);
      }
    });
  };

  // ✅ Get calculated values for display
  const calculatedValues = getCalculatedValues();

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
            onPress={navigateToItemSelection}
          >
            <View style={styles.iconLabel}>
              <Image
                source={require("../../../assets/screen-14/i.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Items</Text>
            </View>
            <View style={styles.rightSection}>
              {selectedItems.length > 0 ? (
                <Text style={styles.valueText}>
                  {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                </Text>
              ) : (
                <View style={styles.addButton}>
                  <Ionicons name="add" size={18} color="white" />
                </View>
              )}
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
          <TouchableOpacity style={styles.sectionRow} onPress={navigateToPayment}>
            <View style={styles.iconLabel}>
              <Image
                source={require("../../../assets/screen-14/debit-card.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Payment Method</Text>
            </View>
            <View style={styles.rightSection}>
              {selectedPaymentMethod && (
                <Text style={styles.valueText}>{selectedPaymentMethod}</Text>
              )}

              <Ionicons name="chevron-forward" size={18} color="#000" />
            </View>
          </TouchableOpacity>

          {/* ✅ Calculation Summary */}
          <View style={styles.calculationSection}>
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Subtotal:</Text>
              <Text style={styles.calculationValue}>
                ₹{calculatedValues.subtotal.toFixed(2)}
              </Text>
            </View>
            
            {discountValue ? (
              <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>
                  Discount {discountType === "percent" ? `(${discountValue}%)` : ""}:
                </Text>
                <Text style={styles.calculationValue}>
                  -₹{calculatedValues.discountAmount.toFixed(2)}
                </Text>
              </View>
            ) : null}
            
            {shipping ? (
              <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>Shipping:</Text>
                <Text style={styles.calculationValue}>
                  +₹{calculatedValues.shippingAmount.toFixed(2)}
                </Text>
              </View>
            ) : null}
            
            <View style={[styles.calculationRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>
                ₹{calculatedValues.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* ✅ Terms & Signature */}
        <View style={styles.sectionCard}>
          {/* ✅ Terms & Conditions UI */}
          <SectionItem
            icon={require("../../../assets/screen-14/terms-and-conditions.png")}
            label="Terms & Condition"
            value={selectedTerms}
            onPress={navigateToTerms}
            showValue={!!selectedTerms}
          />

          {/* ✅ Signature UI */}
          <SectionItem
            icon={require("../../../assets/screen-14/signature.png")}
            label="Signature"
            onPress={navigateToSignature}
            isSignature={true}
            showValue={false}
            signatureUri={selectedSignature}
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

  // ✅ Calculation Section
  calculationSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  calculationLabel: {
    fontSize: 14,
    color: '#555',
  },
  calculationValue: {
    fontSize: 14,
    color: '#555',
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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