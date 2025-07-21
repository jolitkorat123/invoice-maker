import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { launchImageLibrary } from 'react-native-image-picker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SignatureScreenComponent = () => {
  const navigation = useNavigation();
  const [signature, setSignature] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const signRef = useRef();

  const handleSignature = signature => {
    setSignature(signature);
  };

  const handleClear = () => {
    signRef.current.clearSignature();
    setSignature(null);
  };

  const handleGalleryPick = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
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

          <SignatureScreen
            ref={signRef}
            onOK={handleSignature}
            autoClear={false}
            webStyle={stylePad}
            imageType="image/png"
            backgroundColor="transparent"
            penColor="#4CD04D" 
          />

          <TouchableOpacity style={styles.eraserIconWrapper} onPress={handleClear}>
            <Image
              source={require('../../../assets/screen-25/eraser.png')}
              style={styles.eraserIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
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
    marginRight: scale(30), // adjust for right icon spacing
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
