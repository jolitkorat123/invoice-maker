// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import * as SQLite from 'expo-sqlite';

// const templates = [
//   { id: 1, image: require('../../../assets/template1.png'), screen: 'Template1' },
//   { id: 2, image: require('../../../assets/template2.png'), screen: 'Template2' },
//   { id: 3, image: require('../../../assets/template3.png'), screen: 'Template3' },
// ];


// export default function TemplateSelectorScreen() {
//   const navigation = useNavigation();
//   const [items, setItems] = useState([]);
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db', {
//           useNewConnection: true
//         });
//         setDb(database);
//         await fetchItems(database);
//       } catch (err) {
//         console.error('❌ Template DB Init Error:', err);
//       }
//     };

//     initDb();
//   }, []);

//   const fetchItems = async (database) => {
//     if (!database) return;
//     try {
//       const rows = await database.getAllAsync('SELECT * FROM items');
//       setItems(rows);
//     } catch (error) {
//       console.error('❌ Fetch Items Error:', error);
//     }
//   };

//   // Format items for invoice display
//   const invoiceData = {
//     company: 'Jolit Pvt Ltd',
//     date: new Date().toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     }),
//     items: items.map(item => ({
//       name: item.itemName,
//       price: parseFloat(item.itemPrice),
//       qty: 1, // Default quantity
//       unit: item.unit,
//       description: item.description,
//     })),
//     total: items.reduce((sum, item) => sum + parseFloat(item.itemPrice), 0),
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Templates</Text>
      
//       {/* Display added items preview */}
//       {/* {items.length > 0 && (
//         <View style={styles.itemsPreview}>
//           <Text style={styles.previewTitle}>Your Items:</Text>
//           {items.map((item, index) => (
//             <View key={index} style={styles.itemPreview}>
//               <Text style={styles.itemText}>
//                 {item.itemName} - ₹{item.itemPrice} ({item.unit})
//               </Text>
//             </View>
//           ))}
//           <Text style={styles.totalText}>Total: ₹{invoiceData.total}</Text>
//         </View>
//       )} */}

//       <View style={styles.templateGrid}>
//         {templates.map((template) => (
//           <TouchableOpacity
//             key={template.id}
//             style={styles.templateBox}
//             onPress={() => navigation.navigate(template.screen, { invoiceData })}
//           >
//             <Image source={template.image} style={styles.templateImage} />
//             <Text style={styles.templateName}>Template {template.id}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     padding: 20, 
//     alignItems: 'center' 
//   },
//   title: { 
//     fontSize: 24, 
//     fontWeight: 'bold', 
//     marginBottom: 20 
//   },
//   itemsPreview: {
//     width: '100%',
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//   },
//   previewTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   itemPreview: {
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   itemText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: '#4CD04D',
//   },
//   templateGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   templateBox: {
//     width: 150,
//     height: 220,
//     margin: 10,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     overflow: 'hidden',
//     alignItems: 'center',
//   },
//   templateImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'cover',
//   },
//   templateName: {
//     padding: 5,
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const templates = [
  { id: 1, name: "Template 1", image: require('../../../assets/template1.png'), screen: 'Template1' },
  { id: 2, name: "Template 2", image: require('../../../assets/template2.png'), screen: 'Template2' },
  { id: 3, name: "Template 3", image: require('../../../assets/template3.png'), screen: 'Template3' },
];

export default function TemplateSelectorScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { invoiceData } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select a Template</Text>
      
      <View style={styles.templateGrid}>
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.templateBox}
            onPress={() => navigation.navigate(template.screen, { 
              invoiceData,
              templateType: template.name 
            })}
          >
            <Image source={template.image} style={styles.templateImage} />
            <Text style={styles.templateName}>{template.name}</Text>
          </TouchableOpacity>
        ))}
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
});