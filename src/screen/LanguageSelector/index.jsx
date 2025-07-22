import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = [
  { code: 'en', name: 'English', flag: require('../../../assets/flags/en.png') },
  { code: 'hi', name: 'Hindi', flag: require('../../../assets/flags/hi.png') },
  { code: 'id', name: 'Indonesian', flag: require('../../../assets/flags/id.png') },
  { code: 'ko', name: 'Korean', flag: require('../../../assets/flags/ko.png') },
  { code: 'pt', name: 'Portuguese', flag: require('../../../assets/flags/pt.png') },
  { code: 'ru', name: 'Russian', flag: require('../../../assets/flags/ru.png') },
  { code: 'fr', name: 'French', flag: require('../../../assets/flags/fr.png') },
  { code: 'de', name: 'German', flag: require('../../../assets/flags/de.png') },
];

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();


  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('user-language');
        if (savedLang) {
          setSelectedLang(savedLang);
          if (i18n.language !== savedLang) {
            await i18n.changeLanguage(savedLang);
          }
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };

    loadLanguage();
  }, [isFocused]);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('user-language');
        if (savedLang) {
          setSelectedLang(savedLang);
          i18n.changeLanguage(savedLang);
        } else {
          // If no language is saved, use device language or default to English
          const deviceLang = i18n.language || 'en';
          setSelectedLang(deviceLang);
          i18n.changeLanguage(deviceLang);
        }
      } catch (error) {
        console.error('Error loading language:', error);
        setSelectedLang('en');
        i18n.changeLanguage('en');
      }
    };

    if (isFocused) {
      loadSavedLanguage();
    }
  }, [isFocused]);

  const handleContinue = () => {
    navigation.navigate('company-profile');
  };

  const selectLanguage = async (langCode) => {
    try {
      setSelectedLang(langCode);
      await i18n.changeLanguage(langCode);
      await AsyncStorage.setItem('user-language', langCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const renderItem = ({ item, index }) => {
    const isSelected = item.code === selectedLang;
    const isLast = index === languages.length - 1;

    return (
      // <TouchableOpacity
      //   style={[styles.languageItem, isLast && { borderBottomWidth: 0 }]}
      //   onPress={() => selectLanguage(item.code)}
      // >
      //   <Image source={item.flag} style={styles.flag} />
      //   <Text style={styles.languageText}>{item.name}</Text>
      //   <Image
      //     source={require('../../../assets/flags/select.png')}
      //     style={[
      //       styles.checkIcon,
      //       { tintColor: isSelected ? '#00C851' : '#C4C4C4' },
      //     ]}
      //   />
      // </TouchableOpacity>
      <TouchableOpacity
  style={[styles.languageItem, isLast && { borderBottomWidth: 0 }]}
  onPress={() => selectLanguage(item.code)}
>
  <Image source={item.flag} style={styles.flag} />
  <Text style={styles.languageText}>{item.name}</Text>

  <Image
    source={
      isSelected
        ? require('../../../assets/flags/select2.png')
        : require('../../../assets/flags/select1.png')
    }
    style={[
      styles.checkIcon,
      isSelected ? styles.bigIcon : styles.normalIcon,
    ]}
  />
</TouchableOpacity>

    );
  };

  return (
    <LinearGradient
      colors={['#C5EFC5', '#EAFBEA', '#F9FFF9']}
      style={styles.container2}
    >
      <View style={styles.headingRow}>
        <Text style={styles.heading} numberOfLines={1}>
          {t('choose_language')}
        </Text>
      </View>

      <View style={styles.card2}>
        <FlatList
          data={languages}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          extraData={selectedLang} // This ensures re-render when selectedLang changes
        />
      </View>
      <Pressable style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>{t('continue')}</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(25),
  },
  card2: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: scale(16),
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  flag: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    marginRight: scale(12),
  },
  // checkIcon: {
  //   width: scale(22),
  //   height: scale(22),
  //   resizeMode: 'contain',
  // },
  checkIcon: {
  resizeMode: 'contain',
  marginLeft: 10,
},

normalIcon: {
  width: 20,
  height: 20,
},

bigIcon: {
  width: 30,
  height: 30,
},

  languageText: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
  },
  checkbox: {
    fontSize: moderateScale(18),
  },
  continueButton: {
    backgroundColor: '#4CD04D',
    paddingVertical: verticalScale(14),
    borderRadius: scale(50),
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  continueText: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'center', // center horizontally
    alignItems: 'center',
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(5),
  },
  heading: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',

  },

});

export default LanguageSelector;