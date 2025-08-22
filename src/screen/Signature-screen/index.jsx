// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import SignatureScreen from 'react-native-signature-canvas';
// import * as ImagePicker from 'expo-image-picker';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';

// const SignatureScreenComponent = () => {
//   const navigation = useNavigation();
//   const [signature, setSignature] = useState(null);
//   const [imageUri, setImageUri] = useState(null);
//   const signRef = useRef();

//   const handleSignature = signature => {
//     setSignature(signature);
//   };

//   const handleClear = () => {
//     signRef.current.clearSignature();
//     setSignature(null);
//   };

//   const handleGalleryPick =async () => {
//      const result = await ImagePicker.launchImageLibraryAsync({
//           allowsEditing: true,
//           quality: 1,
//           selectionLimit: 1,
//         });
    
//         if (!result.canceled) {
//           setLogo(result.assets[0].uri);
//         }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Signature</Text>
//         <TouchableOpacity onPress={()=>handleGalleryPick()}>
//           <Image
//             source={require('../../../assets/screen-25/gallery.png')}
//             style={styles.galleryIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Main Content */}
//       <View style={styles.content}>
//         <LinearGradient
//           colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']}
//           style={styles.card}
//         >
//           {imageUri && (
//             <Image source={{ uri: imageUri }} style={styles.backgroundImage} />
//           )}

//           <SignatureScreen
//             ref={signRef}
//             onOK={handleSignature}
//             autoClear={false}
//             webStyle={stylePad}
//             imageType="image/png"
//             backgroundColor="transparent"
//             penColor="#4CD04D" 
//           />

//           <TouchableOpacity style={styles.eraserIconWrapper} onPress={handleClear}>
//             <Image
//               source={require('../../../assets/screen-25/eraser.png')}
//               style={styles.eraserIcon}
//             />
//           </TouchableOpacity>
//         </LinearGradient>
//       </View>

//       {/* Save Button */}
//       <TouchableOpacity style={styles.saveButton}>
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const stylePad = `
//   .m-signature-pad--footer {display: none; margin: 0px;}
//   .m-signature-pad {box-shadow: none; border: none;}
//   body,html {
//     width: 100%; height: 100%; margin: 0; padding: 0;
//   }
// `;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8FAEC',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     paddingTop: verticalScale(10),
//     paddingBottom: verticalScale(12),
//   },
//   headerTitle: {
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     color: '#000',
//     flex: 1,
//     textAlign: 'center',
//     marginRight: scale(30), // adjust for right icon spacing
//   },
//   galleryIcon: {
//     width: scale(24),
//     height: scale(24),
//     tintColor: '#000000',
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     padding: scale(8),
//     borderRadius: scale(100),
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: scale(16),
//     borderRadius: scale(16),
//     height: verticalScale(300),
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     elevation: 4,
//     overflow: 'hidden',
//   },
//   backgroundImage: {
//     ...StyleSheet.absoluteFillObject,
//     resizeMode: 'contain',
//   },
//   eraserIconWrapper: {
//     position: 'absolute',
//     top: scale(12),
//     right: scale(12),
//     backgroundColor: '#fff',
//     padding: scale(4),
//     borderRadius: scale(20),
//   },
//   eraserIcon: {
//     width: scale(20),
//     height: scale(20),
//     tintColor: '#00C851',
//   },
//   saveButton: {
//     backgroundColor: '#00C851',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(14),
//     marginHorizontal: scale(20),
//     marginBottom: verticalScale(20),
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '600',
//   },
// });

// export default SignatureScreenComponent;

////full working

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import SignatureScreen from 'react-native-signature-canvas';
// import * as ImagePicker from 'expo-image-picker';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as SQLite from 'expo-sqlite';

// // open DB
// const db = SQLite.openDatabaseSync('userdb.db');

// const SignatureScreenComponent = () => {
//   const navigation = useNavigation();
//   const [signature, setSignature] = useState(null);
//   const [imageUri, setImageUri] = useState(null);
//   const signRef = useRef();

//   // create table if not exists
//   useEffect(() => {
//     const initDb = async () => {
//       try {
//         await db.execAsync(`
//           CREATE TABLE IF NOT EXISTS signatures (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             fileUri TEXT
//           );
//         `);
//       } catch (err) {
//         console.error("DB Init Error:", err);
//       }
//     };
//     initDb();
//   }, []);

//   // when drawing ends, fetch base64
//   const handleEnd = () => {
//     if (signRef.current) {
//       signRef.current.readSignature(); // triggers onOK
//     }
//   };

//   // fires after readSignature() returns Base64
//   const handleSignature = async (sig) => {
//     try {
//       if (!sig || sig === "data:,") return; // ignore empty
//       setSignature(sig);
//       setImageUri(null);

//       await db.runAsync(
//         'INSERT INTO signatures (fileUri) VALUES (?);',
//         [sig]
//       );
//     } catch (err) {
//       console.error("Auto-Save Error:", err);
//     }
//   };

//   const handleClear = () => {
//     if (signRef.current) {
//       signRef.current.clearSignature();
//     }
//     setSignature(null);
//   };

//   const handleGalleryPick = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//       base64: false,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//       setSignature(null); // clear signature if image selected
//     }
//   };

//   const handleSave = async () => {
//     try {
//       let finalData = null;

//       if (signature) {
//         finalData = signature; // already auto-saved
//       } else if (imageUri) {
//         finalData = imageUri; // uri from gallery
//       }

//       if (!finalData) {
//         Alert.alert("No Data", "Please draw a signature or select an image.");
//         return;
//       }

//       // only insert if image picked (signatures already saved)
//       if (imageUri) {
//         await db.runAsync(
//           'INSERT INTO signatures (fileUri) VALUES (?);',
//           [finalData]
//         );
//       }

//       Alert.alert("Success", "Signature saved successfully!");
//       navigation.goBack();
//     } catch (err) {
//       console.error("Save Error:", err);
//       Alert.alert("Error", "Failed to save signature.");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Signature</Text>
//         <TouchableOpacity onPress={handleGalleryPick}>
//           <Image
//             source={require('../../../assets/screen-25/gallery.png')}
//             style={styles.galleryIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Main Content */}
//       <View style={styles.content}>
//         <LinearGradient
//           colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']}
//           style={styles.card}
//         >
//           {imageUri && (
//             <Image source={{ uri: imageUri }} style={styles.backgroundImage} />
//           )}

//           {!imageUri && (
//             <SignatureScreen
//               ref={signRef}
//               onEnd={handleEnd}          // detects when drawing ends
//               onOK={handleSignature}     // gets Base64 after readSignature
//               autoClear={false}
//               webStyle={stylePad}
//               imageType="image/png"
//               backgroundColor="transparent"
//               penColor="#4CD04D"
//             />
//           )}

//           <TouchableOpacity style={styles.eraserIconWrapper} onPress={handleClear}>
//             <Image
//               source={require('../../../assets/screen-25/eraser.png')}
//               style={styles.eraserIcon}
//             />
//           </TouchableOpacity>
//         </LinearGradient>
//       </View>

//       {/* Save Button */}
//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const stylePad = `
//   .m-signature-pad--footer {display: none; margin: 0px;}
//   .m-signature-pad {box-shadow: none; border: none;}
//   body,html {
//     width: 100%; height: 100%; margin: 0; padding: 0;
//   }
// `;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8FAEC',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     paddingTop: verticalScale(10),
//     paddingBottom: verticalScale(12),
//   },
//   headerTitle: {
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     color: '#000',
//     flex: 1,
//     textAlign: 'center',
//     marginRight: scale(30),
//   },
//   galleryIcon: {
//     width: scale(24),
//     height: scale(24),
//     tintColor: '#000000',
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     padding: scale(8),
//     borderRadius: scale(100),
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: scale(16),
//     borderRadius: scale(16),
//     height: verticalScale(300),
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     elevation: 4,
//     overflow: 'hidden',
//   },
//   backgroundImage: {
//     ...StyleSheet.absoluteFillObject,
//     resizeMode: 'contain',
//   },
//   eraserIconWrapper: {
//     position: 'absolute',
//     top: scale(12),
//     right: scale(12),
//     backgroundColor: '#fff',
//     padding: scale(4),
//     borderRadius: scale(20),
//   },
//   eraserIcon: {
//     width: scale(20),
//     height: scale(20),
//     tintColor: '#00C851',
//   },
//   saveButton: {
//     backgroundColor: '#00C851',
//     borderRadius: scale(30),
//     paddingVertical: verticalScale(14),
//     marginHorizontal: scale(20),
//     marginBottom: verticalScale(20),
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '600',
//   },
// });

// export default SignatureScreenComponent;

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import * as ImagePicker from 'expo-image-picker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SQLite from 'expo-sqlite';

// open DB
const db = SQLite.openDatabaseSync('userdb.db', {
  useNewConnection: true,
});

const SignatureScreenComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [signature, setSignature] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // ✅ to prevent duplicate save
  const signRef = useRef();

  // create table if not exists
  useEffect(() => {
    const initDb = async () => {
      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS signatures (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fileUri TEXT,
            createdAt TEXT DEFAULT (datetime('now', 'localtime'))
          );
        `);
      } catch (err) {
        console.error("DB Init Error:", err);
      }
    };
    initDb();
  }, []);

  // when drawing ends, fetch base64
  const handleEnd = () => {
    if (signRef.current) {
      signRef.current.readSignature(); // triggers onOK
    }
  };

  // fires after readSignature() returns Base64
  const handleSignature = async (sig) => {
    try {
      if (!sig || sig === "data:,") return; // ignore empty
      setSignature(sig);
      setImageUri(null);
      setIsSaved(false); // reset save status when new signature created
    } catch (err) {
      console.error("Signature Error:", err);
    }
  };

  const handleClear = () => {
    if (signRef.current) {
      signRef.current.clearSignature();
    }
    setSignature(null);
    setIsSaved(false);
  };

  const handleGalleryPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setSignature(null); 
      setIsSaved(false);
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        Alert.alert("Already Saved", "This signature is already saved.");
        return;
      }

      let finalData = null;

      if (signature) {
        finalData = signature;
      } else if (imageUri) {
        finalData = imageUri;
      }

      if (!finalData) {
        Alert.alert("No Data", "Please draw a signature or select an image.");
        return;
      }

      // ✅ Insert only once
      await db.runAsync(
        'INSERT INTO signatures (fileUri) VALUES (?);',
        [finalData]
      );

      setIsSaved(true); // mark as saved
      Alert.alert("Success", "Signature saved successfully!");

      // Return the signature data to the previous screen
      if (route.params?.onSignatureSave) {
        route.params.onSignatureSave(finalData);
      }

      navigation.goBack();
    } catch (err) {
      console.error("Save Error:", err);
      Alert.alert("Error", "Failed to save signature.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fdfffdff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Signature</Text>
        <TouchableOpacity onPress={handleGalleryPick}>
          <Image
            source={require('../../../assets/screen-25/gallery.png')}
            style={styles.galleryIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <LinearGradient
          colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']}
          style={styles.card}
        >
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.backgroundImage} />
          )}

          {!imageUri && (
            <SignatureScreen
              ref={signRef}
              onEnd={handleEnd}
              onOK={handleSignature}
              autoClear={false}
              webStyle={stylePad}
              imageType="image/png"
              backgroundColor="transparent"
              penColor="#4CD04D"
            />
          )}

          <TouchableOpacity style={styles.eraserIconWrapper} onPress={handleClear}>
            <Image
              source={require('../../../assets/screen-25/eraser.png')}
              style={styles.eraserIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const stylePad = `
  .m-signature-pad--footer {display: none; margin: 0px;}
  .m-signature-pad {box-shadow: none; border: none;}
  body,html {
    width: 100%; height: 100%; margin: 0; padding: 0;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FAEC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(12),
  },
  headerTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: scale(30),
  },
  galleryIcon: {
    width: scale(24),
    height: scale(24),
    tintColor: '#000000',
  },
  backButton: {
    backgroundColor: '#4CD04D',
    padding: scale(8),
    borderRadius: scale(100),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: scale(16),
    borderRadius: scale(16),
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  eraserIconWrapper: {
    position: 'absolute',
    top: scale(12),
    right: scale(12),
    backgroundColor: '#fff',
    padding: scale(4),
    borderRadius: scale(20),
  },
  eraserIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#00C851',
  },
  saveButton: {
    backgroundColor: '#00C851',
    borderRadius: scale(30),
    paddingVertical: verticalScale(14),
    marginHorizontal: scale(20),
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
});

export default SignatureScreenComponent;
