// import React from 'react';
// import { View, Text, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   datasets: [
//     {
//       data: [30, 70, 20, 40, 50, 60, 0, 80, 45, 65, 55, 75],
//       strokeWidth: 2,
//     },
//   ],
// };

// const chartConfig = {
//   backgroundGradientFrom: '#ffffff',
//   backgroundGradientTo: '#ffffff',
//   decimalPlaces: 0,
//   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   propsForDots: {
//     r: '4',
//     strokeWidth: '2',
//     stroke: '#2b6cb0',
//   },
//   fillShadowGradientOpacity: 0, // Remove fill under the line
//   propsForBackgroundLines: {
//     stroke: 'transparent',
//   },
// };

// const LineChart = () => {
//   return (
//     <View style={{ padding: 10 }}>
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 20,
//           marginVertical: 10,
//           fontWeight: 'bold',
//         }}
//       >
//         Line Chart
//       </Text>
//       <LineChart
//         data={data}
//         width={screenWidth - 40}
//         height={220}
//         chartConfig={chartConfig}
//         withInnerLines={false}
//         withOuterLines={false}
//         style={{
//           marginHorizontal: 20,
//           borderRadius: 16,
//         }}
//       />
//     </View>
//   );
// };

// export default LineChart;

// // [
// //   { "month": "Jan", "value": 30 },
// //   { "month": "Feb", "value": 70 },
// //   { "month": "March", "value": 20 }
// // ]
//working
// import React from 'react';
// import { View, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   datasets: [
//     {
//       data: [20, 35, 30, 40, 38, 50, 60, 55],
//       strokeWidth: 2,
//       color: () => 'blue',
//       withDots: false,
//       withShadow: false, // ✅ Disable gray fill under the line
//     },
//   ],
// };

// const chartConfig = {
//   backgroundGradientFrom: '#ffffff',
//   backgroundGradientTo: '#ffffff',
//   decimalPlaces: 0,
//   color: () => '#000',
//   labelColor: () => '#000',
//   fillShadowGradientOpacity: 0, // ✅ Ensure fill is fully transparent
//   propsForBackgroundLines: {
//     stroke: 'transparent',
//   },
// };

// const LineChart = () => {
//   return (
//     <View style={{ backgroundColor: '#fff', padding: 10 }}>
//       <LineChart
//         data={data}
//         width={screenWidth - 40}
//         height={200}
//         chartConfig={chartConfig}
//         withDots={false}
//         withShadow={false}
//         withInnerLines={false}
//         withOuterLines={false}
//         bezier={true}
//         style={{
//       borderTopLeftRadius: 20,
//       borderTopRightRadius: 20,
//     }}
//       />
//     </View>
//   );
// };

// export default LineChart;
// import React, { useState } from 'react';
// import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;
// const chartPadding = 40;
// const chartWidth = screenWidth - chartPadding;
// const chartHeight = 200;

// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const values = [20, 35, 30, 40, 38, 50, 60, 55, 45, 70, 60, 48]; // 12 values

// const LineChart = () => {
//   const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

//   const data = {
//     labels: [], // Hide default month labels
//     datasets: [
//       {
//         data: values,
//         strokeWidth: 2,
//         color: () => 'blue',
//         withDots: true,
//       },
//     ],
//   };

//   const chartConfig = {
//     backgroundGradientFrom: '#ffffff',
//     backgroundGradientTo: '#ffffff',
//     decimalPlaces: 0,
//     color: () => '#000',
//     labelColor: () => '#000',
//     fillShadowGradientOpacity: 0,
//     propsForBackgroundLines: {
//       stroke: 'transparent',
//     },
//     propsForDots: {
//       r: '4',
//       strokeWidth: '2',
//       stroke: 'white',
//     },
//   };

//   return (
//     <View style={{ backgroundColor: '#fff', padding: 20, paddingBottom: 40 }}>
//       <View>
//         <LineChart
//           data={data}
//           width={chartWidth}
//           height={chartHeight}
//           chartConfig={chartConfig}
//           withDots={true}
//           withShadow={false}
//           withInnerLines={false}
//           withOuterLines={false}
//           bezier={true}
//           style={{
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//           }}
//           renderDotContent={({ x, y, index }) => {
//             if (index === selectedMonthIndex) {
//               return (
//                 <View
//                   key={index}
//                   style={{
//                     position: 'absolute',
//                     top: y - 12,
//                     left: x - 12,
//                     width: 24,
//                     height: 24,
//                     borderRadius: 12,
//                     backgroundColor: 'rgba(0, 122, 255, 0.3)',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: 'blue' }} />
//                 </View>
//               );
//             }
//             return null;
//           }}
//         />

//         {/* Custom clickable month labels */}
//         <View
//           style={{
//             position: 'absolute',
//             top: chartHeight - 10,
//             left: 0,
//             width: chartWidth,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             paddingHorizontal: 10,
//           }}
//           pointerEvents="box-none"
//         >
//           {months.map((month, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => setSelectedMonthIndex(index)}
//               style={{ flex: 1, alignItems: 'center' }}
//             >
//               <Text
//                 style={{
//                   fontSize: 10,
//                   color: selectedMonthIndex === index ? 'blue' : 'black',
//                   fontWeight: selectedMonthIndex === index ? 'bold' : 'normal',
//                 }}
//               >
//                 {month}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default LineChart;
// import React, { useState } from 'react';
// import { View, Dimensions, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;
// const chartPadding = 40;
// const chartWidth = screenWidth * 1.5; // Wider chart for scrolling
// const chartHeight = 220;

// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const values = [20, 35, 30, 40, 38, 50, 60, 55, 45, 70, 60, 48];

// const LineChart = () => {
//   const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

//   const data = {
//     labels: [], // Hide default month labels
//     datasets: [
//       {
//         data: values,
//         strokeWidth: 2,
//         color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
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
//     propsForBackgroundLines: {
//       stroke: '#e0e0e0',
//     },
//     propsForDots: {
//       r: '4',
//       strokeWidth: '2',
//       stroke: 'white',
//     },
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
//         snapToInterval={screenWidth - chartPadding} // Snap to screen width
//         decelerationRate="fast"
//       >
//         <View style={styles.chartContainer}>
//           <LineChart
//             data={data}
//             width={chartWidth}
//             height={chartHeight}
//             chartConfig={chartConfig}
//             withDots={true}
//             withShadow={false}
//             withInnerLines={false}
//             withOuterLines={false}
//             bezier={true}
//             style={styles.chart}
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
//     overflow: 'hidden', // Ensure shadows aren't clipped
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
//   },
//   monthLabelsContainer: {
//     position: 'absolute',
//     top: chartHeight - 10,
//     left: 0,
//     width: chartWidth,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     pointerEvents: 'box-none',
//   },
//   monthLabelTouchable: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   monthLabelText: {
//     fontSize: 10,
//     color: '#666',
//   },
//   selectedMonthLabel: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
//   dotHighlight: {
//     position: 'absolute',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: 'rgba(0, 122, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dotInner: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'blue',
//   },
//   valueText: {
//     position: 'absolute',
//     top: -20,
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: 'blue',
//   },
// });

// export default LineChart;

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
//         color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
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
//     paddingTop: 20, // Added to give top padding
//     propsForBackgroundLines: {
//       stroke: '#e0e0e0',
//     },
//     propsForDots: {
//       r: '4',
//       strokeWidth: '2',
//       stroke: 'white',
//     },
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
//             withInnerLines={false}
//             withOuterLines={false}
//             bezier={true}
//             style={styles.chart}
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
//     marginTop: 30, // Added to avoid clipping top values
//   },
//   monthLabelsContainer: {
//     position: 'absolute',
//     top: chartHeight - 1,
//     left: 0,
//     width: chartWidth,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 40,
//     pointerEvents: 'box-none',
//   },
//   monthLabelTouchable: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   monthLabelText: {
//     fontSize: 10,
//     color: '#666',
//   },
//   selectedMonthLabel: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
//   dotHighlight: {
//     position: 'absolute',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: 'rgba(0, 122, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dotInner: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'blue',
//   },
//   valueText: {
//     position: 'absolute',
//     top: -24, // Increased to give more space for top label
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: 'blue',
//   },
// });

// export default Line;
import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
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
                      }
                    ]}
                  >
                    <View style={styles.dotInner} />
                    <Text style={styles.valueText}>
                      {values[index]}
                    </Text>
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
                    selectedMonthIndex === index && styles.selectedMonthLabel
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
  },
  scrollContainer: {
    flexGrow: 1,
  },
  chartContainer: {
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
    left: 0,
    width: chartWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
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
