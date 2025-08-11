
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Invoice',
    subtitle: 'Create professional invoices in seconds',
    image: require('../../../assets/i1.png'),
  },
  {
    id: '2',
    title: 'Template',
    subtitle: 'Pick a template that fits your business style',
    image: require('../../../assets/i2.png'),
  },
  {
    id: '3',
    title: 'Details',
    subtitle: 'Fill in the details to create your best invoice',
    image: require('../../../assets/i3.png'),
  },
];

const Slider = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
const { t, i18n } = useTranslation();
  const handleContinue = () => {
    navigation.navigate('language-selector');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      } else {
        flatListRef.current.scrollToIndex({ index: 0 });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView
        style={styles.safeArea}
        edges={['left', 'right', 'bottom']} // Skip top padding
      >
    
        <View style={styles.container}>
          <FlatList
            data={slides}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewConfigRef.current}
            ref={flatListRef}
            snapToAlignment="center"
            decelerationRate="fast"
          />

          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#4CD04D',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    paddingHorizontal: scale(20),
  },
  image: {
    width: width,
    height: verticalScale(370),
    marginTop: 0,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginTop: verticalScale(50),
    color: '#000',
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: '#444',
    marginTop: verticalScale(5),
    textAlign: 'center',
    paddingHorizontal: scale(20),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  dot: {
    height: scale(9),
    width: scale(9),
    borderRadius: scale(4),
    backgroundColor: '#ccc',
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: '#4CD04D',
    width: scale(9),
  },
  button: {
    backgroundColor: '#4CD04D',
    paddingVertical: verticalScale(14),
    borderRadius: scale(30),
    marginHorizontal: scale(30),
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
});

export default Slider;

