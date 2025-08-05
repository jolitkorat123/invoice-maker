// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



// const ClientScreen = () => {
//   const navigation = useNavigation();

//   const handleClientPress = (clientName) => {
//     console.log('Tapped on client:', clientName);

//   };
//   const handleContinue = () => {
//     navigation.navigate('Add-client');
//   };

//   return (
//     <LinearGradient
//       colors={['#55d04c39', 'rgba(76, 208, 76, 0)']}
//       style={styles.container}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={28} color="#000000" />
//         </TouchableOpacity>


//         <Text style={styles.headerText}>Client</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <TouchableOpacity style={styles.addClientButton} onPress={handleContinue}>
//           <Text style={styles.addClientText}>+  Add New Client</Text>
//         </TouchableOpacity>

//         <Text style={styles.clientListTitle}>Client List :</Text>

//         {/* Touchable Client Card 1 */}
//         <TouchableOpacity
//           style={styles.clientCard}
//           onPress={() => handleClientPress('Androtech Solution')}
//         >
//           <View>
//             <Text style={styles.clientName}>Androtech Solution</Text>
//             <Text style={styles.clientDetails}>+91 12345 67890</Text>
//             <Text style={styles.clientDetails}>other</Text>
//           </View>
//           <Ionicons name="ellipsis-vertical" size={20} color="#000" />
//         </TouchableOpacity>

//         {/* Touchable Client Card 2 */}
//         <TouchableOpacity
//           style={styles.clientCard}
//           onPress={() => handleClientPress('Appin Technology')}
//         >
//           <View>
//             <Text style={styles.clientName}>Appin Technology</Text>
//             <Text style={styles.clientDetails}>+91 12345 67890</Text>
//             <Text style={styles.clientDetails}>other</Text>
//           </View>
//           <Ionicons name="ellipsis-vertical" size={20} color="#000" />
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// export default ClientScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   backButton: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   scrollContainer: {
//     padding: 15,
//   },
//   addClientButton: {
//     backgroundColor: '#000',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   addClientText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   clientListTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   clientCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   clientName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   clientDetails: {
//     marginTop: 2,
//     fontSize: 13,
//     color: '#000000',
//   },

// });
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation, useIsFocused } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { scale, verticalScale } from 'react-native-size-matters';
// import * as SQLite from 'expo-sqlite';

// const ClientScreen = () => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused(); // 👈 This ensures re-fetching when you return to this screen
//   const [clients, setClients] = useState([]);
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         const database = await SQLite.openDatabaseAsync('userdb.db');
//         setDb(database);
//         await loadClients(database);
//       } catch (err) {
//         console.error('DB Init Error:', err);
//       }
//     };

//     initDb();
//   }, []);

//   useEffect(() => {
//     if (db && isFocused) {
//       loadClients(db);
//     }
//   }, [isFocused]);

//   const loadClients = async (database) => {
//     try {
//       const rows = await database.getAllAsync(`SELECT * FROM clients`);
//       setClients(rows);
//     } catch (error) {
//       console.error('Error fetching clients:', error);
//     }
//   };

//   const handleClientPress = (clientName) => {
//     console.log('Tapped on client:', clientName);
//   };

//   const handleContinue = () => {
//     navigation.navigate('Add-client');
//   };

//   return (
//    <LinearGradient
//   colors={['#55d04c39', 'rgba(76, 208, 76, 0)']}
//   style={styles.container}
// >
//   {/* Header */}
//   <View style={styles.header}>
//     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//       <Ionicons name="chevron-back" size={28} color="#000000" />
//     </TouchableOpacity>
//     <Text style={styles.headerText}>Client</Text>
//     <View style={{ width: 24 }} />
//   </View>

//   {/* Fixed Add Button and Title */}
//   <View style={styles.fixedTop}>
//     <TouchableOpacity style={styles.addClientButton} onPress={handleContinue}>
//       <Text style={styles.addClientText}>+ Add New Client</Text>
//     </TouchableOpacity>
//     <Text style={styles.clientListTitle}>Client List :</Text>
//   </View>

//   {/* Scrollable List */}
//   <ScrollView contentContainerStyle={styles.scrollContainer}>
//     {clients.length === 0 ? (
//       <Text style={{ fontSize: 14, color: '#888', fontStyle: 'italic' }}>No clients found.</Text>
//     ) : (
//       clients.map((client) => (
//         <TouchableOpacity
//           key={client.id}
//           style={styles.clientCard}
//           onPress={() => handleClientPress(client.tradeName)}
//         >
//           <View>
//             <Text style={styles.clientName}>{client.tradeName}</Text>
//             <Text style={styles.clientDetails}>+91 {client.phone}</Text>
//             <Text style={styles.clientDetails}>{client.businessNature}</Text>
//           </View>
//           <Ionicons name="ellipsis-vertical" size={20} color="#000" />
//         </TouchableOpacity>
//       ))
//     )}
//   </ScrollView>
// </LinearGradient>


//   );
// };

// export default ClientScreen;

// // Keep styles the same as before (you already did a great job with that!)
// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   backButton: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   fixedTop: {
//   padding: 15,
//   backgroundColor: 'transparent',
//   zIndex: 10,
// },
// scrollContainer: {
//   paddingHorizontal: 15,
//   paddingBottom: 40,
// },

//   scrollContainer: {
//     padding: 15,
//   },
//   addClientButton: {
//     backgroundColor: '#000',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   addClientText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   clientListTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   clientCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   clientName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   clientDetails: {
//     marginTop: 2,
//     fontSize: 13,
//     color: '#000000',
//   },
// });
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';
import * as SQLite from 'expo-sqlite';

const ClientScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [clients, setClients] = useState([]);
  const [db, setDb] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null); // For dropdown

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db');
        setDb(database);
        await loadClients(database);
      } catch (err) {
        console.error('DB Init Error:', err);
      }
    };

    initDb();
  }, []);

  useEffect(() => {
    if (db && isFocused) {
      loadClients(db);
    }
  }, [isFocused]);

  const loadClients = async (database) => {
    try {
      const rows = await database.getAllAsync(`SELECT * FROM clients`);
      setClients(rows);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const toggleClientMenu = (clientId) => {
    setSelectedClientId((prevId) => (prevId === clientId ? null : clientId));
  };

  const handleEdit = (client) => {
    setSelectedClientId(null);
    navigation.navigate('Add-client', { client }); // Make sure this screen exists
  };

  const handleRemove = (clientId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this client?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.runAsync(`DELETE FROM clients WHERE id = ?`, [clientId]);
              setSelectedClientId(null);
              loadClients(db);
            } catch (error) {
              console.error('Failed to delete client:', error);
            }
          },
        },
      ]
    );
  };

  const handleContinue = () => {
    navigation.navigate('Add-client');
  };

  return (
    <LinearGradient
      colors={['#55d04c39', 'rgba(76, 208, 76, 0)']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Client</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Add Button and Title */}
      <View style={styles.fixedTop}>
        <TouchableOpacity style={styles.addClientButton} onPress={handleContinue}>
          <Text style={styles.addClientText}>+ Add New Client</Text>
        </TouchableOpacity>
        <Text style={styles.clientListTitle}>Client List :</Text>
      </View>

      {/* Scrollable List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {clients.length === 0 ? (
          <Text style={{ fontSize: 14, color: '#888', fontStyle: 'italic' }}>
            No clients found.
          </Text>
        ) : (
          clients.map((client) => (
            <View key={client.id} style={styles.clientWrapper}>
              <TouchableOpacity
                style={styles.clientCard}
                onPress={() => console.log('Tapped:', client.tradeName)}
              >
                <View>
                  <Text style={styles.clientName}>{client.tradeName}</Text>
                  <Text style={styles.clientDetails}>+91 {client.phone}</Text>
                  <Text style={styles.clientDetails}>{client.businessNature}</Text>
                </View>

                <TouchableOpacity onPress={() => toggleClientMenu(client.id)}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#000" />
                </TouchableOpacity>
              </TouchableOpacity>

              {selectedClientId === client.id && (
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={() => handleEdit(client)}>
                    <Text style={styles.dropdownItem}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRemove(client.id)}>
                    <Text style={[styles.dropdownItem, { color: 'red' }]}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default ClientScreen;
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#4CD04D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
    zIndex: 1,
  },
  fixedTop: {
    padding: 15,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  addClientButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addClientText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  clientListTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  clientCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    zIndex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
  },
  clientDetails: {
    marginTop: 2,
    fontSize: 13,
    color: '#000000',
  },
  clientWrapper: {
    marginBottom: 15,
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 15,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});
