// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const templates = [
//   { id: 1, name: "Template 1", image: require('../../../assets/template1.png'), screen: 'Template1' },
//   { id: 2, name: "Template 2", image: require('../../../assets/template2.png'), screen: 'Template2' },
//   { id: 3, name: "Template 3", image: require('../../../assets/template3.png'), screen: 'Template3' },
// ];

// export default function TemplateSelectorScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { invoiceData } = route.params;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Select a Template</Text>
      
//       <View style={styles.templateGrid}>
//         {templates.map((template) => (
//           <TouchableOpacity
//             key={template.id}
//             style={styles.templateBox}
//             onPress={() => navigation.navigate(template.screen, { 
//               invoiceData,
//               templateType: template.name 
//             })}
//           >
//             <Image source={template.image} style={styles.templateImage} />
//             <Text style={styles.templateName}>{template.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     padding: 20, 
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     minHeight: '100%',
//   },
//   title: { 
//     fontSize: 24, 
//     fontWeight: 'bold', 
//     marginBottom: 30,
//     color: '#333',
//   },
//   templateGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   templateBox: {
//     width: '45%',
//     height: 220,
//     marginBottom: 20,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     overflow: 'hidden',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   templateImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'cover',
//   },
//   templateName: {
//     padding: 10,
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
// });

import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert,
  Share
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const templates = [
  { id: 1, name: "Template 1", image: require('../../../assets/template1.png'), screen: 'Template1' },
  { id: 2, name: "Template 2", image: require('../../../assets/template2.png'), screen: 'Template2' },
  { id: 3, name: "Template 3", image: require('../../../assets/template3.png'), screen: 'Template3' },
];

export default function TemplateSelectorScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { 
    invoiceData, 
    mode = "preview",
    databaseId,
    ...invoiceProps 
  } = route.params;

  const invoice = invoiceData || invoiceProps;
  
  const isPreviewMode = mode === "preview";
  const isCreateMode = mode === "create";

  // Set header options based on mode
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {isPreviewMode && (
            <TouchableOpacity 
              style={{ marginRight: 15 }}
              onPress={() => {
                // Edit functionality - go back to edit
                navigation.goBack();
              }}
            >
              <Text style={{ color: '#007AFF', fontSize: 16 }}>Edit</Text>
            </TouchableOpacity>
          )}
          
          {isCreateMode && (
            <TouchableOpacity 
              style={{ marginRight: 15 }}
              onPress={handleShareInvoice}
            >
              <Text style={{ color: '#007AFF', fontSize: 16 }}>Share</Text>
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [navigation, mode]);

  // Share function for create mode
  const handleShareInvoice = async () => {
    try {
      const shareContent = {
        message: `Invoice ${invoice.invoiceId}\nTotal: ₹${invoice.total}\nClient: ${invoice.selectedClient?.tradeName || invoice.selectedClient?.clientName || 'N/A'}`,
        title: `Invoice ${invoice.invoiceId}`
      };

      const result = await Share.share(shareContent);
      
      if (result.action === Share.sharedAction) {
        Alert.alert("Success", "Invoice shared successfully!");
      }
    } catch (error) {
      console.error("Share error:", error);
      Alert.alert("Error", "Failed to share invoice");
    }
  };

  const handleTemplateSelect = (template) => {
    navigation.navigate(template.screen, { 
      invoiceData: invoice,
      templateType: template.name,
      mode: mode,
      databaseId: databaseId
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Mode Indicator */}
      {isPreviewMode && (
        <View style={[styles.modeIndicator, styles.previewIndicator]}>
          <Ionicons name="eye-outline" size={16} color="#FF9500" />
          <Text style={styles.previewText}>Preview Mode - Data not saved</Text>
        </View>
      )}

      {isCreateMode && (
        <View style={[styles.modeIndicator, styles.createIndicator]}>
          <Ionicons name="checkmark-circle" size={16} color="#4CD04D" />
          <Text style={styles.createText}>Invoice Created Successfully!</Text>
        </View>
      )}

      <Text style={styles.title}>Select a Template</Text>
      
      <View style={styles.templateGrid}>
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.templateBox}
            onPress={() => handleTemplateSelect(template)}
          >
            <Image source={template.image} style={styles.templateImage} />
            <Text style={styles.templateName}>{template.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Invoice Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Invoice Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Invoice Number:</Text>
          <Text style={styles.summaryValue}>{invoice.invoiceId}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Client:</Text>
          <Text style={styles.summaryValue}>
            {invoice.selectedClient?.tradeName || invoice.selectedClient?.clientName || 'No client selected'}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Amount:</Text>
          <Text style={styles.summaryValue}>₹{invoice.total?.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items:</Text>
          <Text style={styles.summaryValue}>{invoice.selectedItems?.length || 0}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {isPreviewMode && (
          <TouchableOpacity 
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to Edit</Text>
          </TouchableOpacity>
        )}

        {isCreateMode && (
          <TouchableOpacity 
            style={[styles.button, styles.doneButton]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100%',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30,
    color: '#333',
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  templateBox: {
    width: '45%',
    height: 220,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  templateImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  templateName: {
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  // Mode Indicators
  modeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
    width: '100%',
  },
  previewIndicator: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFEAA7',
    borderWidth: 1,
  },
  createIndicator: {
    backgroundColor: '#D4EDDA',
    borderColor: '#C3E6CB',
    borderWidth: 1,
  },
  previewText: {
    color: '#856404',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
  createText: {
    color: '#155724',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
  // Summary Card
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  // Action Buttons
  actionButtons: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#6c757d',
  },
  doneButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});