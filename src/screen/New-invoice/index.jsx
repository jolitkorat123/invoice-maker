// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const iconSize = 24;

// const SectionItem = ({ icon, label, onPress, isVisible }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{isVisible ? label : '***'}</Text>
//     </View>
//     <Ionicons name="chevron-forward" size={18} color="#000" />
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const [isVisible, setIsVisible] = useState(true);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   const renderText = (text) => {
//     return isVisible ? text : '***';
//   };

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity>
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.title}>New Invoice</Text>
//           <TouchableOpacity onPress={toggleVisibility}>
//             <Ionicons 
//               name={isVisible ? "eye-outline" : "eye-off-outline"} 
//               size={24} 
//               color="black" 
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.invoiceInfoCard}>
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{renderText('Invoice Info')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Date - 16/05/2025')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Due - 23/05/2025')}</Text>
//           </View>
//           <Text style={styles.invoiceNumber}>{renderText('INV0001')}</Text>
//         </TouchableOpacity>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/briefcase.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Business Info')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/Mask group.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Client')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/i.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Items')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem 
//             icon={require('../../../assets/screen-14/hand.png')} 
//             label="Quantity" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/price-tag.png')} 
//             label="Price" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/discount.png')} 
//             label="Discount" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/delivery.png')} 
//             label="Shipping Charges" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/money.png')} 
//             label="Currency" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/debit-card.png')} 
//             label="Payment Method" 
//             isVisible={isVisible}
//           />
//         </View>
        
//         <View style={styles.sectionCard}>
//           <SectionItem 
//             icon={require('../../../assets/screen-14/terms-and-conditions.png')} 
//             label="Terms & Condition" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/signature.png')} 
//             label="Signature" 
//             isVisible={isVisible}
//           />
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   invoiceInfoCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   invoiceInfoDate: {
//     fontSize: 12,
//     color: '#555',
//   },
//   invoiceNumber: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   sectionCard: {
//     backgroundColor: '#fcfcfcff',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   iconLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 12,
//     resizeMode: 'contain',
//   },
//   label: {
//     fontSize: 14,
//   },
//   addButton: {
//     backgroundColor: '#000000ff',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   hiddenContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   hiddenText: {
//     fontSize: 18,
//     color: '#888',
//   },
// });

///working
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale } from 'react-native-size-matters';


// const SectionItem = ({ icon, label, onPress, isVisible }) => (
//   <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
//     <View style={styles.iconLabel}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.label}>{isVisible ? label : '***'}</Text>
//     </View>
//     <Ionicons name="chevron-forward" size={18} color="#000" />
//   </TouchableOpacity>
// );

// export default function NewInvoiceScreen() {
//   const [isVisible, setIsVisible] = useState(true);
//     const navigation = useNavigation();
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   const renderText = (text) => {
//     return isVisible ? text : '***';
//   };
  

//   return (
//     <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                         <Ionicons name="chevron-back" size={20} color="#fdfffdff" />
//                       </TouchableOpacity>
//           <Text style={styles.title}>New Invoice</Text>
//           <TouchableOpacity onPress={toggleVisibility}>
//             <Ionicons 
//               name={isVisible ? "eye-outline" : "eye-off-outline"} 
//               size={24} 
//               color="black" 
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.invoiceInfoCard}>
//           <View>
//             <Text style={styles.invoiceInfoTitle}>{renderText('Invoice Info')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Date - 16/05/2025')}</Text>
//             <Text style={styles.invoiceInfoDate}>{renderText('Due - 23/05/2025')}</Text>
//           </View>
//           <Text style={styles.invoiceNumber}>{renderText('INV0001')}</Text>
//         </TouchableOpacity>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/briefcase.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Business Info')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/Mask group.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Client')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.sectionCard}>
//           <TouchableOpacity style={styles.sectionRow}>
//             <View style={styles.iconLabel}>
//               <Image
//                 source={require('../../../assets/screen-14/i.png')}
//                 style={styles.icon}
//               />
//               <Text style={styles.label}>{renderText('Items')}</Text>
//             </View>
//             <View style={styles.addButton}>
//               <Ionicons name="add" size={18} color="white" />
//             </View>
//           </TouchableOpacity>

//           <SectionItem 
//             icon={require('../../../assets/screen-14/hand.png')} 
//             label="Quantity" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/price-tag.png')} 
//             label="Price" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/discount.png')} 
//             label="Discount" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/delivery.png')} 
//             label="Shipping Charges" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/money.png')} 
//             label="Currency" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/debit-card.png')} 
//             label="Payment Method" 
//             isVisible={isVisible}
//           />
//         </View>
        
//         <View style={styles.sectionCard}>
//           <SectionItem 
//             icon={require('../../../assets/screen-14/terms-and-conditions.png')} 
//             label="Terms & Condition" 
//             isVisible={isVisible}
//           />
//           <SectionItem 
//             icon={require('../../../assets/screen-14/signature.png')} 
//             label="Signature" 
//             isVisible={isVisible}
//           />
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   backButton: {
//     backgroundColor: '#4CD04D',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(9),
//     borderRadius: scale(100),
//     zIndex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   invoiceInfoCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     elevation: 2,
//   },
//   invoiceInfoTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   invoiceInfoDate: {
//     fontSize: 12,
//     color: '#555',
//   },
//   invoiceNumber: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   sectionCard: {
//     backgroundColor: '#fcfcfcff',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 20,
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   iconLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 12,
//     resizeMode: 'contain',
//   },
//   label: {
//     fontSize: 14,
//   },
//   addButton: {
//     backgroundColor: '#000000ff',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
 

const SectionItem = ({ icon, label, onPress, isVisible }) => (
  <TouchableOpacity style={styles.sectionRow} onPress={onPress}>
    <View style={styles.iconLabel}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{isVisible ? label : '***'}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#000" />
  </TouchableOpacity>
);

export default function NewInvoiceScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isVisible, setIsVisible] = useState(true);

  const invoiceNo = route.params?.invoiceNo || 'INV0001';
  const startDate = route.params?.startDate ? new Date(route.params.startDate) : new Date('2025-05-16');
  const endDate = route.params?.endDate ? new Date(route.params.endDate) : new Date('2025-05-23');

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const renderText = (text) => (isVisible ? text : '***');

  const formatDate = (date) => date.toLocaleDateString('en-GB');

  const handleContinue = () => {
    navigation.navigate('Invoice-info-screen');
  };

  return (
    <LinearGradient colors={['#4cd04c27', 'rgba(76, 208, 76, 0)']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#fdfffdff" />
          </TouchableOpacity>
          <Text style={styles.title}>New Invoice</Text>
          <TouchableOpacity onPress={toggleVisibility}>
            <Ionicons
              name={isVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Invoice Info Card */}
        <TouchableOpacity
          style={styles.invoiceInfoCard}
          onPress={handleContinue}
        >
          <View>
            <Text style={styles.invoiceInfoTitle}>{renderText('Invoice Info')}</Text>
            <Text style={styles.invoiceInfoDate}>{renderText(`Date - ${formatDate(startDate)}`)}</Text>
            <Text style={styles.invoiceInfoDate}>{renderText(`Due - ${formatDate(endDate)}`)}</Text>
          </View>
          <Text style={styles.invoiceNumber}>{renderText(invoiceNo)}</Text>
        </TouchableOpacity>

        {/* Other Sections */}
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.sectionRow}>
            <View style={styles.iconLabel}>
              <Image source={require('../../../assets/screen-14/briefcase.png')} style={styles.icon} />
              <Text style={styles.label}>{renderText('Business Info')}</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionRow}>
            <View style={styles.iconLabel}>
              <Image source={require('../../../assets/screen-14/Mask group.png')} style={styles.icon} />
              <Text style={styles.label}>{renderText('Client')}</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.sectionRow}>
            <View style={styles.iconLabel}>
              <Image source={require('../../../assets/screen-14/i.png')} style={styles.icon} />
              <Text style={styles.label}>{renderText('Items')}</Text>
            </View>
            <View style={styles.addButton}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <SectionItem icon={require('../../../assets/screen-14/hand.png')} label="Quantity" isVisible={isVisible} />
          <SectionItem icon={require('../../../assets/screen-14/price-tag.png')} label="Price" isVisible={isVisible} />
          <SectionItem icon={require('../../../assets/screen-14/discount.png')} label="Discount" isVisible={isVisible} />
          <SectionItem icon={require('../../../assets/screen-14/delivery.png')} label="Shipping Charges" isVisible={isVisible} />
          <SectionItem icon={require('../../../assets/screen-14/money.png')} label="Currency" isVisible={isVisible} />
          <SectionItem icon={require('../../../assets/screen-14/debit-card.png')} label="Payment Method" isVisible={isVisible} />
        </View>

        <View style={styles.sectionCard}>
          <SectionItem icon={require('../../../assets/screen-14/terms-and-conditions.png')} label="Terms & Condition" isVisible={isVisible} />
          <SectionItem icon={require('../../../assets/screen-14/signature.png')} label="Signature" isVisible={isVisible} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4CD04D',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  invoiceInfoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 2,
  },
  invoiceInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  invoiceInfoDate: {
    fontSize: 12,
    color: '#555',
  },
  invoiceNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionCard: {
    backgroundColor: '#fcfcfcff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#000000ff',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
