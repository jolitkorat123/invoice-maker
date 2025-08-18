// import React from 'react';
// import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// const chartData = {
//   labels: [
//      'Client A', 'Client B', 'Client C', 'Client D', 'Client E',
//   'Client F', 'Client G', 'Client H', 'Client I', 'Client J'
//   ],
//   datasets: [
//     {
//       data: [
//         708, 580, 306, 462, 520,
//         669, 493, 857, 925, 712
//       ]
//     }
//   ]
// };

// const chartConfig = {
//    backgroundGradientFrom: '#fff',
//   backgroundGradientTo: '#fff',
//   color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`, // green bars
//   labelColor: (opacity = 1) => `rgba(44, 122, 46, ${opacity})`, // ✅ label color #4CD04D
//   barPercentage: 0.9,
//   decimalPlaces: 0,
//   propsForBackgroundLines: {
//     strokeDasharray: '',
//     stroke: '#e0e0e058',
//   },
// };

// const CustomBarChart = () => {
//   return (
//     <ScrollView horizontal>
//       <BarChart
//         data={chartData}
//         width={chartData.labels.length * 60} // Width based on number of bars
//         height={350}
//         chartConfig={chartConfig}
//         showValuesOnTopOfBars={true}
//         fromZero={true}
//         style={styles.chartStyle}
//         verticalLabelRotation={0}
//         withInnerLines={true}
//         segments={5}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   chartStyle: {
//     margin: 20,
//     borderRadius: 10,
//     padding: 20,
//   },
// });

// export default CustomBarChart;
// import React from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';

// const chartData = {
//   labels: [
//     'Client A', 'Client B', 'Client C', 'Client D', 'Client E',
//     'Client F', 'Client G', 'Client H', 'Client I', 'Client J'
//   ],
//   datasets: [
//     {
//       data: [708, 580, 306, 462, 520, 669, 493, 857, 925, 712],
//     },
//   ],
// };

// const chartConfig = {
//   backgroundGradientFrom: '#fff',
//   backgroundGradientTo: '#fff',
//   color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`, // Green bars
//   labelColor: (opacity = 1) => `rgba(44, 122, 46, ${opacity})`, // Dark green labels
//   barPercentage: 0.9,
//   decimalPlaces: 0,
//   propsForBackgroundLines: {
//     strokeDasharray: '',
//     stroke: '#e0e0e058',
//   },
// };

// const CustomBarChart = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View style={styles.chartPaddingWrapper}>
//             <BarChart
//               data={chartData}
//               width={chartData.labels.length * 60}
//               height={350}
//               chartConfig={chartConfig}
//               showValuesOnTopOfBars={true}
//               fromZero={true}
//               verticalLabelRotation={0}
//               withInnerLines={true}
//               segments={5}
//               style={styles.chartStyle}
//             />
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//   borderRadius: 12,
//   padding: 8,
//   // elevation: 2,
//   // shadowColor: '#000',
//   // shadowOpacity: 0.08,
//   // shadowOffset: { width: 0, height: 1 },
//   shadowRadius: 4,
//   width: Dimensions.get('window').width - 40,
//   },
//   chartPaddingWrapper: {
//     paddingTop: 30, // ✅ Adds top space above bars/labels
//   },
//   chartStyle: {
//     borderRadius: 10,
//   },
// });

// export default CustomBarChart;
//working
// import React from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   Text,
// } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';
// import Svg, { Line } from 'react-native-svg';

// const chartData = {
//   labels: [
//     'Client A', 'Client B', 'Client C', 'Client D', 'Client E',
//     'Client F', 'Client G', 'Client H', 'Client I', 'Client J'
//   ],
//   datasets: [
//     {
//       data: [708, 580, 306, 462, 520, 669, 493, 857, 925, 712],
//     },
//   ],
// };

// const screenWidth = Dimensions.get('window').width;
// const chartWidth = chartData.labels.length * 70;
// const chartHeight = 340;

// const chartConfig = {
//   backgroundGradientFrom: '#fff',
//   backgroundGradientTo: '#fff',
//   color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(44, 122, 46, ${opacity})`,
//   barPercentage: 0.9,
//   decimalPlaces: 0,
//   propsForBackgroundLines: {
//     stroke: '#ccc',
//     strokeWidth: 1,
//   },
//   propsForLabels: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   formatXLabel: (label) => `\n${label}`,
// };

// const yAxisLabels = [925, 694, 463, 231, 0];

// const CustomBarChart = () => {
//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       <View style={[styles.card, { width: chartWidth + 60 }]}>
//         <View style={styles.chartPaddingWrapper}>
//           <View style={{ flexDirection: 'row' }}>
//             {/* Y-axis labels */}
//             <View style={styles.yAxisLabelsContainer}>
//               {yAxisLabels.map((label, index) => (
//                 <View key={index} style={{ flex: 1, justifyContent: 'center' }}>
//                   <Text style={styles.yAxisLabel}>{label}</Text>
//                 </View>
//               ))}
//             </View>

//             {/* Chart */}
//             <View>
//               <BarChart
//                 data={chartData}
//                 width={chartWidth}
//                 height={chartHeight}
//                 chartConfig={chartConfig}
//                 showValuesOnTopOfBars={true}
//                 fromZero={true}
//                 verticalLabelRotation={0}
//                 withInnerLines={false}
//                 withHorizontalLabels={false}
//                 withVerticalLabels={true}
//                 style={styles.chartStyle}
//               />

//               {/* Axes */}
//               <Svg height={chartHeight} width={chartWidth} style={StyleSheet.absoluteFill}>
//                 {/* Y-axis line */}
//                 <Line x1="40" y1="0" x2="40" y2={chartHeight - 60} stroke="#333" strokeWidth="1.5" />
//                 {/* X-axis line */}
//                 <Line x1="40" y1={chartHeight - 60} x2={chartWidth} y2={chartHeight - 60} stroke="#333" strokeWidth="1.5" />
//               </Svg>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 30,
//     marginVertical: 10,
//     marginHorizontal: 10,
//     height: 350,
//     alignSelf: 'flex-start', 
//   },
//   chartPaddingWrapper: {
//     paddingBottom: 10,
//     paddingRight: 10,
//   },
//   chartStyle: {
//     borderRadius: 10,
//   },
//   yAxisLabelsContainer: {
//     width: 35,
//     height: chartHeight - 60,
//     paddingTop: 20,
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//   },
//   yAxisLabel: {
//     fontSize: 12,
//     color: '#2c7a2e',
//     textAlign: 'right',
//     fontWeight: 'bold',
//   },
// });

// export default CustomBarChart;

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Svg, { Line } from 'react-native-svg';

const rawData = [708, 580, 306, 462, 520, 669, 493, 857, 925, 712];
const labels = [
  'Client A', 'Client B', 'Client C', 'Client D', 'Client E',
  'Client F', 'Client G', 'Client H', 'Client I', 'Client J'
];

// Format data for react-native-gifted-charts
const chartData = rawData.map((value, index) => ({
  value,
  label: labels[index],
  frontColor: '#42b942ff', // bar color
}));

const chartHeight = 300;
const chartWidth = chartData.length * 70; // width for horizontal scroll

const yAxisLabels = [925, 694, 463, 231, 0];

const CustomBarChart = () => {
  return (
    <View style={styles.card}>
      <View style={styles.chartWrapper}>
        {/* Y-axis labels */}
        <View style={styles.yAxisLabelsContainer}>
          {yAxisLabels.map((label, index) => (
            <View key={index} style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.yAxisLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Scrollable chart */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ width: chartWidth }}>
            <BarChart
              data={chartData}
              barWidth={30}
              spacing={30}
              yAxisThickness={0}       // no y-axis line from library
              xAxisThickness={0}       // no default x-axis line
              hideYAxisText            // hide gifted-charts' y-axis labels
              showValuesOnTopOfBars
              noOfSections={4}
              maxValue={925}
              height={chartHeight - 52}
              xAxisLabelTextStyle={styles.xAxisLabel}
              initialSpacing={20}      // keeps first bar away from axis
            />


            {/* Axes */}
            <Svg
              height={chartHeight}
              width={chartWidth}
              style={StyleSheet.absoluteFill}
            >
              {/* Y-axis line */}
              <Line
                x1="0"
                y1="0"
                x2="0"
                y2={chartHeight - 40}
                stroke="#333"
                strokeWidth="1.5"
              />
              {/* X-axis line */}
              <Line
                x1="0"
                y1={chartHeight - 40}
                x2={chartWidth}
                y2={chartHeight - 40}
                stroke="#333"
                strokeWidth="1.5"
              />
            </Svg>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    height: 350,
    padding: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  chartWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  yAxisLabelsContainer: {
    width: 40,
    height: chartHeight - 40,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#000000ff',
    fontWeight: 'bold',
  },
  xAxisLabel: {
    fontSize: 10,
    color: '#333',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default CustomBarChart;
