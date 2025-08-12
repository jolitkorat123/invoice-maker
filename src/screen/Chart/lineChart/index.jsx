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

// import React, { useState } from 'react';
// import {
//   View,
//   Dimensions,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
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
//                       },
//                     ]}
//                   >
//                     <View style={styles.dotInner} />
//                     <Text style={styles.valueText}>{values[index]}</Text>
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
//                     selectedMonthIndex === index && styles.selectedMonthLabel,
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
//     // backgroundColor: '#fff',
//     // padding: 20,
//     paddingBottom: 40,
//     borderRadius: 20,
//     // elevation: 3,
//     // shadowColor: '#000',
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.1,
//     // shadowRadius: 4,
//     overflow: 'hidden',
//     marginTop: 10,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center', // ✅ center horizontally
//   },
//   chartContainer: {
//     alignSelf: 'center', // ✅ center the chart inside ScrollView
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
//     left: 10,
//     width: chartWidth,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 30,
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
//working11
// import React, { useState } from 'react';
// import {
//   View,
//   Dimensions,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import { LineChart as LineCharts } from 'react-native-chart-kit';
// import Svg, { Line as SvgLine } from 'react-native-svg';

// const screenWidth = Dimensions.get('window').width;
// const chartPadding = 40;
// const chartWidth = screenWidth * 1.5;
// const chartHeight = 270;

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

  // const chartConfig = {
  //   backgroundGradientFrom: '#ffffff',
  //   backgroundGradientTo: '#ffffff',
  //   decimalPlaces: 0,
  //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   fillShadowGradientOpacity: 0,
  //   propsForBackgroundLines: {
  //     stroke: '#4cd04c21',
  //     strokeWidth: 1,
  //   },
  //   propsForDots: {
  //     r: '4',
  //     strokeWidth: '1',
  //     stroke: 'white',
  //     fill: '#4CD04D',
  //   },
  //   propsForLabels: {
  //     fontSize: 10,
  //   },
  //   style: {
  //     borderRadius: 16,
  //   },
  //   withHorizontalLines: true,
  //   withVerticalLines: false,
  //   withVerticalLabels: false,
  //   withHorizontalLabels: false,
  // };

//   const handleMonthPress = (index) => {
//     setSelectedMonthIndex(selectedMonthIndex === index ? null : index);
//   };

//   return (
//     <View style={styles.outerCard}>
//       <View style={styles.card}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContainer}
//           snapToInterval={screenWidth - chartPadding}
//           decelerationRate="fast"
//         >
//           <View style={styles.chartContainer}>
//             {/* Y-Axis Labels */}
//             <View style={styles.yAxisLabelsContainer}>
//               {[70, 56, 42, 28, 14, 0].map((label, index) => (
//                 <Text key={index} style={styles.yAxisLabel}>
//                   {label}
//                 </Text>
//               ))}
//             </View>

//             {/* Chart */}
//             <LineCharts
            //   data={data}
            //   width={chartWidth}
            //   height={chartHeight}
            //   chartConfig={chartConfig}
            //   withDots={true}
            //   withShadow={false}
            //   withInnerLines={true}
            //   withOuterLines={true}
            //   bezier={true}
            //   style={styles.chart}
            //   fromZero={true}
            //   segments={5}
            //   formatYLabel={() => ''}
            //   renderDotContent={({ x, y, index }) => {
            //     if (index === selectedMonthIndex) {
            //       return (
            //         <View
            //           key={index}
            //           style={[
            //             styles.dotHighlight,
            //             {
            //               top: y - 12,
            //               left: x - 12,
            //             },
            //           ]}
            //         >
            //           <View style={styles.dotInner} />
            //           <Text style={styles.valueText}>{values[index]}</Text>
            //         </View>
            //       );
            //     }
            //     return null;
            //   }}
            // />

//             {/* Green Axis Lines */}
//             <Svg
//               height={chartHeight}
//               width={chartWidth}
//               style={StyleSheet.absoluteFill}
//             >
//               {/* Y-axis line */}
//               <SvgLine
//                 x1="40"
//                 y1="0"
//                 x2="40"
//                 y2={chartHeight}
//                 stroke="#4CD04D"
//                 strokeWidth="2"
//               />
//               {/* X-axis line */}
//               <SvgLine
//                 x1="40"
//                 y1={chartHeight}
//                 x2={chartWidth - 20}
//                 y2={chartHeight}
//                 stroke="#4CD04D"
//                 strokeWidth="2"
//               />
//             </Svg>

//             {/* Custom Month Labels */}
//             <View style={styles.monthLabelsContainer}>
//               {months.map((month, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => handleMonthPress(index)}
//                   style={styles.monthLabelTouchable}
//                 >
//                   <Text
//                     style={[
//                       styles.monthLabelText,
//                       selectedMonthIndex === index && styles.selectedMonthLabel,
//                     ]}
//                   >
//                     {month}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   outerCard: {
//     paddingHorizontal: 16,
//   },
//   card: {
    
//     borderRadius: 30,
//     marginVertical: 10,
//     marginHorizontal: 30,
//     height: 350,
//     width: 325,
//     alignSelf: 'center',
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   chartContainer: {
//     alignSelf: 'center',
//     position: 'relative',
//     width: chartWidth,
//   },
//   yAxisLabelsContainer: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     height: chartHeight,
//     justifyContent: 'space-between',
//     paddingVertical: 0,
//     width: 40,
//     zIndex: 10,
//   },
//   yAxisLabel: {
//     fontSize: 13,
//     color: '#000',
//     textAlign: 'right',
//     marginRight: 8,
//   },
//   monthLabelsContainer: {
//     position: 'absolute',
//     top: chartHeight + 1,
//     left: 10,
//     width: chartWidth,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 30,
//     pointerEvents: 'box-none',
//   },
//   monthLabelTouchable: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   monthLabelText: {
//     fontSize: 13,
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
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#4CD04D',
//   },
// });

// export default Line;
import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Svg, { Line as SvgLine } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 1.5;
const chartHeight = 270;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const values = [20, 35, 30, 40, 38, 50, 60, 55, 45, 70, 60, 48];

const Line = () => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

  const chartData = values.map((v, i) => ({
    value: v,
    label: months[i],
    customDataPoint: () => {
      if (selectedMonthIndex === i) {
        return (
          <View style={styles.dotHighlight}>
            <View style={styles.dotInner} />
          </View>
        );
      }
      return <View style={styles.dotInner} />;
    },
    dataPointLabelComponent: () => {
      if (selectedMonthIndex === i) {
        return <Text style={styles.valueText}>{v}</Text>;
      }
      return null;
    },
  }));

  const handleMonthPress = (index) => {
    setSelectedMonthIndex(selectedMonthIndex === index ? null : index);
  };

  return (
    <View style={styles.outerCard}>
      <View style={styles.card}>
        {/* Main Row: Y-axis fixed + Scrollable Chart */}
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Fixed Y-axis */}
          <View style={styles.yAxisLabelsContainer}>
            {[70, 56, 42, 28, 14, 0].map((label, index) => (
              <Text key={index} style={styles.yAxisLabel}>
                {label}
              </Text>
            ))}
          </View>

          {/* Scrollable Chart + X-axis */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.chartArea}>
              {/* Line Chart */}
              <LineChart
                data={chartData}
                width={chartWidth}
                height={chartHeight}
                withDots={true}
                withShadow={false}
                withInnerLines={true}
                withOuterLines={true}
                bezier={true}
                style={styles.chart}
                fromZero={true}
                segments={5}
                formatYLabel={() => ''}
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

              {/* Green Axis Lines */}
              <Svg
                height={chartHeight}
                width={chartWidth}
                style={StyleSheet.absoluteFill}
              >
                <SvgLine
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={chartHeight}
                  stroke="#4CD04D"
                  strokeWidth="2"
                />
                <SvgLine
                  x1="0"
                  y1={chartHeight}
                  x2={chartWidth - 20}
                  y2={chartHeight}
                  stroke="#4CD04D"
                  strokeWidth="2"
                />
              </Svg>

              {/* Custom Month Labels */}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCard: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginVertical: 50,
    paddingVertical: 20,
    height: 350,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  chartArea: {
    position: 'relative',
    width: chartWidth,
  },
  yAxisLabelsContainer: {
    justifyContent: 'space-between',
    height: chartHeight,
    width: 40,
    paddingRight: 5,
    alignItems: 'flex-end',
  },
  yAxisLabel: {
    fontSize: 13,
    color: '#000',
    textAlign: 'right',
  },
  monthLabelsContainer: {
    position: 'absolute',
    top: chartHeight + 1,
    left: 0,
    width: chartWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  monthLabelTouchable: {
    flex: 1,
    alignItems: 'center',
  },
  monthLabelText: {
    fontSize: 13,
    color: '#666',
  },
  selectedMonthLabel: {
    color: '#4CD04D',
    fontWeight: 'bold',
  },
  dotHighlight: {
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CD04D',
  },
});

export default Line;
