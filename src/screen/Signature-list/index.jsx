// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';

// const Signaturelist = ({ navigation }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);

//    const handleContinue = () => {
//     navigation.navigate('Signature-screen');
//   };

//   const renderItem = ({ item, index }) => {
//     const isSelected = index === selectedIndex;

//     return (
//       <TouchableOpacity
//         style={styles.optionContainer}
//         onPress={() => setSelectedIndex(index)}
//       >
//         <Text style={styles.optionText}>{item}</Text>
//         <Image
//           source={require('../../../assets/screen-27/select.png')}
//           style={[
//             styles.checkIcon,
//             { tintColor: isSelected ? '#00C851' : '#C4C4C4' },
//           ]}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={['#8aea8a27', 'rgba(76, 208, 76, 0)']}
//         style={styles.gradientBackground}
//       >
//         <View style={{ flex: 1 }}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.backButton}
//             >
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Signature</Text>
//           </View>

//           {/* New Signature Button */}
//           <View style={styles.fixedTop}>
//             <TouchableOpacity style={styles.newSignatureCard} onPress={handleContinue}>
//               <View style={styles.leftContent}>
//                 <Image
//                   source={require('../../../assets/screen-25/signature.png')}
//                   style={styles.signatureIcon}
//                 />
//                 <Text style={styles.newSignatureText}>New Signature</Text>
//               </View>
//               <View style={styles.plusCircle}>
//                 <Text style={styles.plusText}>+</Text>
//               </View>
//             </TouchableOpacity>

//             <Text style={styles.signaturelist}>Signature List :</Text>
//           </View>
//         </View>

//         {/* Save Button */}
//         <TouchableOpacity style={styles.saveButton}>
//           <Text style={styles.saveText}>Save</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradientBackground: {
//     flex: 1,
//     padding: scale(16),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(25),
//     fontWeight: 'bold',
//     marginRight: scale(28),
//     color: '#333',
//   },
//   // New Signature Card Style
//   newSignatureCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 9,
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     marginBottom: 18,
//     elevation: 2,
//     shadowColor: '#4CD04D',
//   },
//   leftContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   signatureIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     marginRight: 12,
//   },
//   newSignatureText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//   },
//   plusCircle: {
//     width: 25,
//     height: 25,
//     borderRadius: 14,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   signaturelist: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: verticalScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   optionText: {
//     fontSize: scale(17),
//     color: '#333',
//   },
//   checkIcon: {
//     width: scale(20),
//     height: scale(20),
//     resizeMode: 'contain',
//   },
//   saveButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 12,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   saveText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(5),
//     paddingVertical: verticalScale(5),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
// });

// export default Signaturelist;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   FlatList,
//   Alert,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
// import * as SQLite from 'expo-sqlite';

// // open DB
// const db = SQLite.openDatabaseSync('userdb.db', {
//   useNewConnection: true,
// });

// const Signaturelist = () => {
//   const navigation = useNavigation();
//   const [signatures, setSignatures] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   // fetch saved signatures from DB
//   const fetchSignatures = async () => {
//     try {
//       const result = await db.getAllAsync('SELECT * FROM signatures ORDER BY id DESC;');
//       setSignatures(result);
//     } catch (err) {
//       console.error('Fetch Error:', err);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchSignatures();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const handleContinue = () => {
//     navigation.navigate('Signature-screen');
//   };

//   const handleSaveSelection = () => {
//     if (!selectedId) return;

//     const selected = signatures.find((sig) => sig.id === selectedId);

//     if (selected) {
//       navigation.goBack();
//       // send selected signature back if needed
//       if (navigation.getState().routes) {
//         const prevRoute = navigation.getState().routes.at(-2);
//         if (prevRoute?.params?.onSignatureSave) {
//           prevRoute.params.onSignatureSave(selected.fileUri);
//         }
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     Alert.alert(
//       'Delete Signature',
//       'Are you sure you want to delete this signature?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await db.runAsync('DELETE FROM signatures WHERE id = ?;', [id]);
//               fetchSignatures();
//               if (id === selectedId) {
//                 setSelectedId(null);
//               }
//             } catch (err) {
//               console.error('Delete Error:', err);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const renderItem = ({ item }) => {
//     const isSelected = item.id === selectedId;

//     return (
//       <View style={[styles.signatureCard, isSelected && styles.selectedCard]}>
//         <TouchableOpacity
//           style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
//           onPress={() => setSelectedId(item.id)}
//         >
//           <Image
//             source={{ uri: item.fileUri }}
//             style={styles.signatureImage}
//             resizeMode="contain"
//           />
//           <Image
//             source={require('../../../assets/screen-27/select.png')}
//             style={[
//               styles.checkIcon,
//               { tintColor: isSelected ? '#00C851' : '#C4C4C4' },
//             ]}
//           />
//         </TouchableOpacity>

//         {/* Delete Button */}
//         <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
//           <Ionicons name="trash" size={20} color="#ff4444" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={['#8aea8a27', 'rgba(76, 208, 76, 0)']}
//         style={styles.gradientBackground}
//       >
//         <View style={{ flex: 1 }}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.backButton}
//             >
//               <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Signature</Text>
//           </View>

//           {/* New Signature Button */}
//           <View style={styles.fixedTop}>
//             <TouchableOpacity style={styles.newSignatureCard} onPress={handleContinue}>
//               <View style={styles.leftContent}>
//                 <Image
//                   source={require('../../../assets/screen-25/signature.png')}
//                   style={styles.signatureIcon}
//                 />
//                 <Text style={styles.newSignatureText}>New Signature</Text>
//               </View>
//               <View style={styles.plusCircle}>
//                 <Text style={styles.plusText}>+</Text>
//               </View>
//             </TouchableOpacity>

//             <Text style={styles.signaturelist}>Signature List :</Text>
//           </View>

//           {/* List of saved signatures */}
//           <FlatList
//             data={signatures}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             contentContainerStyle={{ paddingBottom: 100 }}
//           />
//         </View>

//         {/* Save Button */}
//         <TouchableOpacity style={styles.saveButton} onPress={handleSaveSelection}>
//           <Text style={styles.saveText}>Save</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   gradientBackground: { flex: 1, padding: scale(16) },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: verticalScale(50),
//     marginBottom: verticalScale(10),
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(25),
//     fontWeight: 'bold',
//     marginRight: scale(28),
//     color: '#333',
//   },
//   newSignatureCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 9,
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     marginBottom: 18,
//     elevation: 2,
//     shadowColor: '#4CD04D',
//   },
//   leftContent: { flexDirection: 'row', alignItems: 'center' },
//   signatureIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     marginRight: 12,
//   },
//   newSignatureText: { fontSize: 16, fontWeight: '500', color: '#000' },
//   plusCircle: {
//     width: 25,
//     height: 25,
//     borderRadius: 14,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   signaturelist: { fontSize: 16, fontWeight: '500', marginBottom: 10 },
//   signatureCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: verticalScale(10),
//     paddingHorizontal: scale(12),
//     borderRadius: 10,
//     marginBottom: 12,
//     elevation: 1,
//   },
//   selectedCard: { borderColor: '#00C851', borderWidth: 2 },
//   signatureImage: { flex: 1, height: 60 },
//   checkIcon: {
//     width: scale(20),
//     height: scale(20),
//     resizeMode: 'contain',
//     marginLeft: 10,
//   },
//   deleteBtn: {
//     marginLeft: 10,
//     padding: 5,
//   },
//   saveButton: {
//     backgroundColor: '#4CD04D',
//     paddingVertical: 12,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   saveText: { color: '#fff', fontSize: 20, fontWeight: '600' },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(5),
//     paddingVertical: verticalScale(5),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
// });

// export default Signaturelist;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('userdb.db', {
  useNewConnection: true,
});

const Signaturelist = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [signatures, setSignatures] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fromScreen = route.params?.from || "";
  

  const fetchSignatures = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM signatures ORDER BY id DESC;');
      setSignatures(result);
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSignatures();
    });
    return unsubscribe;
  }, [navigation]);

  const handleContinue = () => {
    navigation.navigate('Signature-screen');
  };

  const handleSaveSelection = () => {
    if (!selectedId) return;
    const selected = signatures.find((sig) => sig.id === selectedId);

    if (selected) {
      navigation.goBack();
      if (navigation.getState().routes) {
        const prevRoute = navigation.getState().routes.at(-2);
        if (prevRoute?.params?.onSignatureSave) {
          prevRoute.params.onSignatureSave(selected.fileUri);
        }
      }
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Delete Signature', 'Are you sure you want to delete this signature?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await db.runAsync('DELETE FROM signatures WHERE id = ?;', [id]);
            fetchSignatures();
            if (id === selectedId) {
              setSelectedId(null);
            }
          } catch (err) {
            console.error('Delete Error:', err);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;

    return (
      <View style={[styles.signatureCard, isSelected && styles.selectedCard]}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => fromScreen === 'invoice' && setSelectedId(item.id)}
        >
          <Image
            source={{ uri: item.fileUri }}
            style={styles.signatureImage}
            resizeMode="contain"
          />

          {fromScreen === 'invoice' && (
            <Image
              source={require('../../../assets/screen-27/select.png')}
              style={[
                styles.checkIcon,
                { tintColor: isSelected ? '#00C851' : '#C4C4C4' },
              ]}
            />
          )}
        </TouchableOpacity>

        {fromScreen === 'settings' && (
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
            <Ionicons name="trash" size={20} color="#ff4444" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#8aea8a27', 'rgba(76, 208, 76, 0)']}
        style={styles.gradientBackground}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Signature</Text>
          </View>

          <View style={styles.fixedTop}>
            <TouchableOpacity style={styles.newSignatureCard} onPress={handleContinue}>
              <View style={styles.leftContent}>
                <Image
                  source={require('../../../assets/screen-25/signature.png')}
                  style={styles.signatureIcon}
                />
                <Text style={styles.newSignatureText}>New Signature</Text>
              </View>
              <View style={styles.plusCircle}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.signaturelist}>Signature List :</Text>
          </View>

          <FlatList
            data={signatures}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>

        {fromScreen === 'invoice' && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveSelection}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1, padding: scale(16) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(10),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    marginRight: scale(28),
    color: '#333',
  },
  newSignatureCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 9,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#4CD04D',
  },
  leftContent: { flexDirection: 'row', alignItems: 'center' },
  signatureIcon: { width: 24, height: 24, marginRight: 12, resizeMode: 'contain' },
  newSignatureText: { fontSize: 16, fontWeight: '500', color: '#000' },
  plusCircle: {
    width: 25,
    height: 25,
    borderRadius: 14,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signaturelist: { fontSize: 16, fontWeight: '500', marginBottom: 10 },
  signatureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  selectedCard: { borderColor: '#00C851', borderWidth: 2 },
  signatureImage: { flex: 1, height: 60 },
  checkIcon: { width: scale(20), height: scale(20), marginLeft: 10, resizeMode: 'contain' },
  deleteBtn: { marginLeft: 10, padding: 5 },
  saveButton: {
    backgroundColor: '#4CD04D',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderRadius: scale(100),
    zIndex: 1,
  },
});

export default Signaturelist;
