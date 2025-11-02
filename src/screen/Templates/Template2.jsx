// InvoicePrintScreen.jsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("window");

// Add this function to handle missing values
const getSafeValue = (value, defaultValue = "") => {
  return value !== undefined && value !== null ? value : defaultValue;
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
    // Determine MIME type based on file extension
    const extension = uri.split(".").pop().toLowerCase();
    const mimeType = extension === "png" ? "image/png" : "image/jpeg";
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
};

function formatCurrency(val) {
  // display two decimals with rupee symbol
  return `₹${Number(val).toFixed(2)}`;
}

function calculateTotals(items, shipping = 0) {
  let subTotal = 0;
  let totalTax = 0;
  let totalDiscount = 0;

  items.forEach((it) => {
    const lineTotal = it.qty * it.price;
    const discountValue = (lineTotal * (it.discountPct || 0)) / 100;
    const taxable = lineTotal - discountValue;
    const taxValue = (taxable * (it.taxPct || 0)) / 100;

    subTotal += lineTotal;
    totalDiscount += discountValue;
    totalTax += taxValue;
  });

  const total = subTotal - totalDiscount + totalTax + shipping;
  return {
    subTotal,
    totalTax,
    totalDiscount,
    shipping,
    total,
  };
}

export default function InvoicePrintScreen() {
  const route = useRoute();
  const { invoiceData } = route.params || {};
  
  const [generating, setGenerating] = useState(false);
  const lastPdfUriRef = useRef(null);

  // Safely extract data with fallbacks
  const safeInvoiceData = invoiceData || {};
  const safeCompanyData = safeInvoiceData.companyData || {};
  const safeClient = safeInvoiceData.selectedClient || {};
  const safeItems = safeInvoiceData.selectedItems || [];

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

  // Use sample data if no invoice data provided
  const invoiceNo = getSafeValue(invoiceId, "#00001");
  const date = getSafeValue(startDate, "17-09-2025");
  
  const toData = {
    name: getSafeValue(clientName, "Diversity"),
    addressLine1: getSafeValue(safeClient.address, "Mota varachha, surat"),
    email: getSafeValue(safeClient.email, "divercity1@gmail.com"),
    phone: getSafeValue(safeClient.phone, "+00 1234 567 89"),
    taxNo: getSafeValue(safeClient.taxNo, "09AAACH7409"),
  };

  const fromData = {
    name: getSafeValue(companyName, "Androtech"),
    addressLine1: getSafeValue(safeCompanyData.address, "2067, Silver Business point, Uttran, Surat"),
    email: getSafeValue(safeCompanyData.email, "androtech@gmail.com"),
    phone: getSafeValue(safeCompanyData.phone, "+00 1234 567 89"),
    taxNo: getSafeValue(safeCompanyData.taxNo, "0AS2067"),
  };

  // Prepare items data
  let itemsData = [];
  if (safeItems && safeItems.length > 0) {
    itemsData = safeItems.map(item => ({
      description: getSafeValue(item.itemName, "Item"),
      qty: getSafeValue(item.quantity, 1),
      price: getSafeValue(item.itemPrice, 0),
      discountPct: item.discount && getSafeValue(item.discountType) === "Percentage" ? 
                   getSafeValue(item.discount, 0) : 0,
      taxPct: getSafeValue(item.taxRate, 0),
    }));
  } else {
    // Fallback to single item if no items array
    itemsData = [{
      description: title,
      qty: quantity,
      price: price,
      discountPct: discountType === "percent" ? discountValue : 0,
      taxPct: taxRate,
    }];
  }

  const shippingCost = shipping ? shippingAmount : 0;
  const dueDate = getSafeValue(endDate, "30/09/2025");
  const paymentMethod = getSafeValue(selectedPaymentMethod, "Cash");
  const notes = getSafeValue(selectedTerms, "Payment time 15 days");

  const totals = calculateTotals(itemsData, shippingCost);

  const generateHTML = async (data) => {
    let signatureBase64 = null;
    if (signatureUri) {
      signatureBase64 = await convertImageToBase64(signatureUri);
    }

    const itemsRowsHtml = data.items
      .map((it) => {
        const lineTotal = it.qty * it.price;
        return `
        <tr class="item-row">
          <td class="desc">${it.description}</td>
          <td class="qty">${it.qty}</td>
          <td class="price">₹${Number(it.price).toFixed(2)}</td>
          <td class="disc">${it.discountPct || 0}%</td>
          <td class="tax">${it.taxPct || 0}%</td>
          <td class="amount">₹${Number(lineTotal).toFixed(2)}</td>
        </tr>
        `;
      })
      .join("");

    // HTML template
    return `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Invoice ${data.invoiceNo}</title>
<style>
  :root{
    --accent:#ffd400; /* yellow used in the sample */
    --black:#111;
    --muted:#666;
    --table-border:#e5e5e5;
    --footer-bg:#111;
    --white:#fff;
  }
  html,body{
    margin:0;
    padding:0;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color:var(--black);
    -webkit-print-color-adjust: exact;
  }
  .page{
    width:210mm; /* A4 */
    min-height:297mm;
    padding:28mm 18mm;
    box-sizing:border-box;
    background:#fff;
  }

  /* Header */
  .header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-bottom:18px;
  }
  .title{
    font-size:48px;
    font-weight:700;
    letter-spacing:1px;
  }
  .invoice-box{
    text-align:right;
  }
  .invoice-no{
    background:var(--accent);
    display:inline-block;
    padding:10px 18px;
    font-weight:700;
    border-radius:2px;
  }
  .date{
    margin-top:8px;
    font-size:12px;
    color:var(--muted);
  }

  /* Addresses */
  .addresses{
    display:flex;
    justify-content:space-between;
    margin-top:20px;
    margin-bottom:18px;
  }
  .addr-block{
    width:48%;
    font-size:12px;
  }
  .addr-label{
    font-weight:700;
    margin-bottom:6px;
  }
  .addr-line{
    color:var(--muted);
    margin:2px 0;
  }

  /* Table header bar */
  .table-header{
    background:var(--accent);
    padding:10px 12px;
    font-weight:700;
    display:grid;
    grid-template-columns: 1fr 60px 90px 70px 60px 90px;
    gap:10px;
    align-items:center;
    margin-top:18px;
  }
  .table{
    width:100%;
    border-collapse:collapse;
    margin-top:6px;
  }
  .table th, .table td{
    padding:14px 12px;
    border-bottom:1px solid var(--table-border);
    font-size:12px;
  }
  .item-row td{
    padding-top:18px;
    padding-bottom:18px;
  }
  .desc{ text-align:left; }
  .qty{ text-align:center; }
  .price{ text-align:right; }
  .disc{ text-align:right; }
  .tax{ text-align:right; }
  .amount{ text-align:right; font-weight:700; }

  /* Summary block */
  .summary{
    display:flex;
    justify-content:space-between;
    margin-top:18px;
    gap:20px;
  }
  .summary-left{
    width:60%;
    font-size:12px;
  }
  .summary-right{
    width:40%;
    font-size:12px;
  }
  .summary-right table{ width:100%; }
  .summary-right td{ padding:6px 8px; }
  .summary-right .label{ color:var(--muted); }
  .summary-right .value{ text-align:right; font-weight:700; }

  /* Footer area (notes & signature) */
  .lower{
    display:flex;
    justify-content:space-between;
    margin-top:40px;
    align-items:flex-end;
  }
  .terms{
    width:50%;
    font-size:12px;
  }
  .signature{
    width:40%;
    text-align:right;
  }
  .signature .sig-img{
    display:inline-block;
    width:120px;
    height:50px;
    border-bottom:2px solid #75a3ff;
    margin-bottom: 5px;
  }
  .signature-image {
    width: 120px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 5px;
    filter: grayscale(100%) contrast(200%) brightness(0);
  }
  .signature .sig-label{ font-size:12px; color:var(--muted); margin-top:6px; }

  /* Bottom black strip */
  .bottom-bar{
    background:var(--footer-bg);
    color:var(--white);
    display:flex;
    justify-content:space-between;
    padding:10px 18px;
    margin-top:30px;
    font-size:12px;
  }

  /* Small helpers */
  .muted{ color:var(--muted); font-size:12px; }
  .bold{ font-weight:700; }

  @media print {
    .page{ padding:12mm; }
  }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <div class="title">Invoice.</div>
      </div>
      <div class="invoice-box">
        <div class="invoice-no">${data.invoiceNo}</div>
        <div class="date">${data.date}</div>
      </div>
    </div>

    <div class="addresses">
      <div class="addr-block">
        <div class="addr-label">To : <span style="font-weight:700">${data.to.name}</span></div>
        <div class="addr-line">${data.to.addressLine1}</div>
        <div class="addr-line">${data.to.email}</div>
        <div class="addr-line">${data.to.phone}</div>
        <div class="addr-line">Tax No: ${data.to.taxNo}</div>
      </div>

      <div class="addr-block" style="text-align:right;">
        <div class="addr-label">From : <span style="font-weight:700">${data.from.name}</span></div>
        <div class="addr-line">${data.from.addressLine1}</div>
        <div class="addr-line">${data.from.email}</div>
        <div class="addr-line">${data.from.phone}</div>
      </div>
    </div>

    <div class="table-header">
      <div>Description</div>
      <div>Qty</div>
      <div>Price</div>
      <div>Discount</div>
      <div>Tax</div>
      <div>Amount</div>
    </div>

    <table class="table" role="presentation">
      <tbody>
        ${itemsRowsHtml}
      </tbody>
    </table>

    <div class="summary">
      <div class="summary-left">
        <div class="muted"><strong>Due Date:</strong> ${data.dueDate}</div>
        <div class="muted"><strong>Payment Method:</strong> ${data.paymentMethod}</div>
      </div>

      <div class="summary-right">
        <table role="presentation">
          <tr>
            <td class="label">Sub total</td>
            <td class="value">₹${Number(totals.subTotal).toFixed(2)}</td>
          </tr>
          ${discountValue ? `
          <tr>
            <td class="label">${getDiscountDisplay()}</td>
            <td class="value">-₹${Number(discountAmount).toFixed(2)}</td>
          </tr>
          ` : ''}
          ${shipping ? `
          <tr>
            <td class="label">Shipping</td>
            <td class="value">+₹${Number(shippingAmount).toFixed(2)}</td>
          </tr>
          ` : ''}
          <tr>
            <td class="label">Tax</td>
            <td class="value">₹${Number(totals.totalTax).toFixed(2)}</td>
          </tr>
          <tr style="font-size:16px;">
            <td class="label bold">Total</td>
            <td class="value bold">₹${Number(totals.total).toFixed(2)}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="lower">
      <div class="terms">
        <div class="bold">Terms & Conditions :</div>
        <div class="muted">${data.notes}</div>
      </div>

      <div class="signature">
        ${signatureBase64 ? `<img src="${signatureBase64}" class="signature-image" />` : '<div class="sig-img"></div>'}
        <div class="sig-label">Approval Signature</div>
      </div>
    </div>

    <div class="bottom-bar">
      <div>Tax No: ${data.from.taxNo}</div>
      <div>${data.from.email}</div>
      <div>${data.from.phone}</div>
    </div>
  </div>
</body>
</html>
    `;
  };

  const onPrint = async () => {
    setGenerating(true);
    try {
      const data = {
        invoiceNo: invoiceNo,
        date: typeof date === 'string' ? date : new Date(date).toLocaleDateString(),
        to: toData,
        from: fromData,
        items: itemsData,
        shipping: shippingCost,
        dueDate: typeof dueDate === 'string' ? dueDate : new Date(dueDate).toLocaleDateString(),
        paymentMethod: paymentMethod,
        notes: notes,
      };

      const html = await generateHTML(data);
      // printToFileAsync returns { uri }
      const { uri } = await Print.printToFileAsync({ html });
      lastPdfUriRef.current = uri;

      // Optionally save to cache / persistent location
      const fileName = `${FileSystem.documentDirectory}invoice_${Date.now()}.pdf`;
      await FileSystem.copyAsync({ from: uri, to: fileName });

      Alert.alert("PDF Generated", "Invoice PDF saved to app storage.", [
        { text: "OK" },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not generate PDF. See console for details.");
    } finally {
      setGenerating(false);
    }
  };

  const onShare = async () => {
    try {
      // If not generated previously, generate now
      let uri = lastPdfUriRef.current;
      if (!uri) {
        const data = {
          invoiceNo: invoiceNo,
          date: typeof date === 'string' ? date : new Date(date).toLocaleDateString(),
          to: toData,
          from: fromData,
          items: itemsData,
          shipping: shippingCost,
          dueDate: typeof dueDate === 'string' ? dueDate : new Date(dueDate).toLocaleDateString(),
          paymentMethod: paymentMethod,
          notes: notes,
        };
        const html = await generateHTML(data);
        const res = await Print.printToFileAsync({ html });
        uri = res.uri;
        lastPdfUriRef.current = uri;
      }

      // On some devices Sharing.shareAsync expects a file:// URI
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert("Sharing not available on this device");
        return;
      }
      await Sharing.shareAsync(uri);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not share PDF. See console for details.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.box}>
        <Text style={styles.mainTitle}>Invoice — Preview</Text>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.invoiceTitle}>Invoice.</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.invoiceNo}>
              <Text style={{ fontWeight: "700" }}>{invoiceNo}</Text>
            </View>
            <Text style={styles.dateText}>
              {typeof date === 'string' ? date : new Date(date).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.addrRow}>
          <View style={styles.addrBlock}>
            <Text style={styles.addrLabel}>To : <Text style={{fontWeight:'700'}}>{toData.name}</Text></Text>
            <Text style={styles.addrLine}>{toData.addressLine1}</Text>
            <Text style={styles.addrLine}>{toData.email}</Text>
            <Text style={styles.addrLine}>{toData.phone}</Text>
            <Text style={styles.addrLine}>Tax No: {toData.taxNo}</Text>
          </View>

          <View style={[styles.addrBlock, { alignItems: "flex-end" }]}>
            <Text style={styles.addrLabel}>From : <Text style={{fontWeight:'700'}}>{fromData.name}</Text></Text>
            <Text style={styles.addrLine}>{fromData.addressLine1}</Text>
            <Text style={styles.addrLine}>{fromData.email}</Text>
            <Text style={styles.addrLine}>{fromData.phone}</Text>
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: "700", marginBottom: 6 }}>Items</Text>
          {itemsData.map((it, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={{flex:1}}>{it.description}</Text>
              <Text style={{width:48, textAlign:'center'}}>{it.qty}</Text>
              <Text style={{width:80, textAlign:'right'}}>{formatCurrency(it.price)}</Text>
              <Text style={{width:70, textAlign:'right'}}>{it.discountPct}%</Text>
              <Text style={{width:60, textAlign:'right'}}>{it.taxPct}%</Text>
              <Text style={{width:90, textAlign:'right', fontWeight:'700'}}>{formatCurrency(it.qty * it.price)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryLeft}>
            <Text style={styles.muted}><Text style={styles.bold}>Due Date:</Text> {typeof dueDate === 'string' ? dueDate : new Date(dueDate).toLocaleDateString()}</Text>
            <Text style={styles.muted}><Text style={styles.bold}>Payment Method:</Text> {paymentMethod}</Text>
          </View>

          <View style={styles.summaryRight}>
            <View style={styles.summaryRow}>
              <Text>Sub total</Text>
              <Text>{formatCurrency(totals.subTotal)}</Text>
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
            <View style={styles.summaryRow}>
              <Text>Tax</Text>
              <Text>{formatCurrency(totals.totalTax)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(totals.total)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.lower}>
          <View style={styles.terms}>
            <Text style={styles.bold}>Terms & Conditions :</Text>
            <Text style={styles.muted}>{notes}</Text>
          </View>

          <View style={styles.signature}>
            {signatureUri && (
              <Image
                source={{ uri: signatureUri }}
                style={styles.signatureImage}
                resizeMode="contain"
              />
            )}
            <Text style={styles.signatureText}>Approval Signature</Text>
          </View>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.btn} onPress={onPrint} disabled={generating}>
            <Text style={styles.btnText}>{generating ? "Generating..." : "Print / Save PDF"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={onShare}>
            <Text style={[styles.btnText, { color: "#333" }]}>Share PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },
  box: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  mainTitle: { fontSize: 18, marginBottom: 10, fontWeight: "700" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  invoiceTitle: { fontSize: 42, fontWeight: "700" },
  invoiceNo: {
    backgroundColor: "#ffd400",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  dateText: { marginTop: 6, color: "#666", fontSize: 12 },
  addrRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 14 },
  addrBlock: { width: "48%" },
  addrLabel: { fontWeight: "700" },
  addrLine: { color: "#666", marginVertical: 2 },
  itemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomColor: "#eee", borderBottomWidth: 1 },
  
  summary: { flexDirection: "row", justifyContent: "space-between", marginTop: 18, gap: 20 },
  summaryLeft: { width: "60%" },
  summaryRight: { width: "40%" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  totalRow: { borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, marginTop: 5 },
  totalLabel: { fontWeight: "bold", fontSize: 16, color: "#4A5BFF" },
  totalValue: { fontWeight: "bold", fontSize: 14 },
  muted: { color: "#666", fontSize: 12 },
  bold: { fontWeight: "700" },
  
  lower: { flexDirection: "row", justifyContent: "space-between", marginTop: 40, alignItems: "flex-end" },
  terms: { width: "50%" },
  signature: { width: "40%", alignItems: "flex-end" },
  signatureImage: { width: 120, height: 60, marginBottom: 5, tintColor: "black" },
  signatureText: { fontWeight: "bold", fontSize: 12, borderTopWidth: 1, borderTopColor: "#1C1F26", paddingTop: 5, width: 150, textAlign: "center" },
  
  buttonsRow: { flexDirection: "row", marginTop: 18, gap: 12 },
  btn: { backgroundColor: "#111", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "700" },
  btnOutline: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" },
});