// import React, { useState } from 'react';
// import { View, Dimensions, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
// import { LineChart as LineCharts } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;
// const chartPadding = 40;
// const chartWidth = screenWidth * 1.5;
// const chartHeight = 220;

// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const values = [20, 35, 30, 40, 38, 50, 60, 55, 45, 70, 60, 48];

// const Line = () => {
//   const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

//   const data = {
//     labels: [],
//     datasets: [
//       {
//         data: values,
//         strokeWidth: 2,
//         color: (opacity = 1) => `rgba(76, 208, 77, ${opacity})`, 
//         withDots: true,
//       },
//     ],
//   };

//   const chartConfig = {
//     backgroundGradientFrom: '#ffffff',
//     backgroundGradientTo: '#ffffff',
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     fillShadowGradientOpacity: 0,
//     paddingTop: 20,
//     propsForBackgroundLines: {
//       stroke: '#4cd04c21',
//       strokeWidth: 1,
//     },
//     propsForDots: {
//       r: '4',
//       strokeWidth: '1',
//       stroke: 'white',
//       fill: '#4CD04D',
//     },
//     propsForLabels: {
//       fontSize: 10,
//     },
//     style: {
//       borderRadius: 16,
//     },
//     withHorizontalLines: true,
//     withVerticalLines: false,
//     withVerticalLabels: false,
//     withHorizontalLabels: true,
//   };

//   const handleMonthPress = (index) => {
//     setSelectedMonthIndex(selectedMonthIndex === index ? null : index);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView 
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer}
//         snapToInterval={screenWidth - chartPadding}
//         decelerationRate="fast"
//       >
//         <View style={styles.chartContainer}>
//           <LineCharts
//             data={data}
//             width={chartWidth}
//             height={chartHeight}
//             chartConfig={chartConfig}
//             withDots={true}
//             withShadow={false}
//             withInnerLines={true}
//             withOuterLines={true}
//             bezier={true}
//             style={styles.chart}
//             fromZero={true}
//             segments={5}
//             renderDotContent={({ x, y, index }) => {
//               if (index === selectedMonthIndex) {
//                 return (
//                   <View
//                     key={index}
//                     style={[
//                       styles.dotHighlight,
//                       {
//                         top: y - 12,
//                         left: x - 12,
//                       }
//                     ]}
//                   >
//                     <View style={styles.dotInner} />
//                     <Text style={styles.valueText}>
//                       {values[index]}
//                     </Text>
//                   </View>
//                 );
//               }
//               return null;
//             }}
//           />

//           {/* Custom clickable month labels */}
//           <View style={styles.monthLabelsContainer}>
//             {months.map((month, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => handleMonthPress(index)}
//                 style={styles.monthLabelTouchable}
//               >
//                 <Text
//                   style={[
//                     styles.monthLabelText,
//                     selectedMonthIndex === index && styles.selectedMonthLabel
//                   ]}
//                 >
//                   {month}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 20,
//     paddingBottom: 40,
//     borderRadius: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     overflow: 'hidden',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   chartContainer: {
//     position: 'relative',
//     width: chartWidth,
//   },
//   chart: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     marginTop: 30,
//   },
//   monthLabelsContainer: {
//     position: 'absolute',
//     top: chartHeight - 1,
//     left: 0,
//     width: chartWidth,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 50,
//     pointerEvents: 'box-none',
//   },
//   monthLabelTouchable: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   monthLabelText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   selectedMonthLabel: {
//     color: '#4CD04D',
//     fontWeight: 'bold',
//   },
//   dotHighlight: {
//     position: 'absolute',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: 'rgba(81, 255, 7, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dotInner: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#4CD04D',
//   },
//   valueText: {
//     position: 'absolute',
//     top: -24,
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#4CD04D',
//   },
// });

// export default Line;
// // [
// //   { "month": "Jan", "value": 30 },
// //   { "month": "Feb", "value": 70 },
// //   { "month": "March", "value": 20 }
// // ]

import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LineChart as LineCharts } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const chartPadding = 40;
const chartWidth = screenWidth * 1.5;
const chartHeight = 220;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const values = [20, 35, 30, 40, 38, 50, 60, 55, 45, 70, 60, 48];

const Line = () => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

  const data = {
    labels: [],
    datasets: [
      {
        data: values,
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(76, 208, 77, ${opacity})`,
        withDots: true,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradientOpacity: 0,
    paddingTop: 20,
    propsForBackgroundLines: {
      stroke: '#4cd04c21',
      strokeWidth: 1,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: 'white',
      fill: '#4CD04D',
    },
    propsForLabels: {
      fontSize: 10,
    },
    style: {
      borderRadius: 16,
    },
    withHorizontalLines: true,
    withVerticalLines: false,
    withVerticalLabels: false,
    withHorizontalLabels: true,
  };

  const handleMonthPress = (index) => {
    setSelectedMonthIndex(selectedMonthIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={screenWidth - chartPadding}
        decelerationRate="fast"
      >
        <View style={styles.chartContainer}>
          <LineCharts
            data={data}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            withDots={true}
            withShadow={false}
            withInnerLines={true}
            withOuterLines={true}
            bezier={true}
            style={styles.chart}
            fromZero={true}
            segments={5}
            renderDotContent={({ x, y, index }) => {
              if (index === selectedMonthIndex) {
                return (
                  <View
                    key={index}
                    style={[
                      styles.dotHighlight,
                      {
                        top: y - 12,
                        left: x - 12,
                      },
                    ]}
                  >
                    <View style={styles.dotInner} />
                    <Text style={styles.valueText}>{values[index]}</Text>
                  </View>
                );
              }
              return null;
            }}
          />

          {/* Custom clickable month labels */}
          <View style={styles.monthLabelsContainer}>
            {months.map((month, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleMonthPress(index)}
                style={styles.monthLabelTouchable}
              >
                <Text
                  style={[
                    styles.monthLabelText,
                    selectedMonthIndex === index && styles.selectedMonthLabel,
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    marginTop: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // ✅ center horizontally
  },
  chartContainer: {
    alignSelf: 'center', // ✅ center the chart inside ScrollView
    position: 'relative',
    width: chartWidth,
  },
  chart: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
  },
  monthLabelsContainer: {
    position: 'absolute',
    top: chartHeight - 1,
    left: 10,
    width: chartWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    pointerEvents: 'box-none',
  },
  monthLabelTouchable: {
    flex: 1,
    alignItems: 'center',
  },
  monthLabelText: {
    fontSize: 12,
    color: '#666',
  },
  selectedMonthLabel: {
    color: '#4CD04D',
    fontWeight: 'bold',
  },
  dotHighlight: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(81, 255, 7, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CD04D',
  },
  valueText: {
    position: 'absolute',
    top: -24,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CD04D',
  },
});

export default Line;
