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
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const chartData = {
  labels: [
    'Client A', 'Client B', 'Client C', 'Client D', 'Client E',
    'Client F', 'Client G', 'Client H', 'Client I', 'Client J'
  ],
  datasets: [
    {
      data: [708, 580, 306, 462, 520, 669, 493, 857, 925, 712],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`, // Green bars
  labelColor: (opacity = 1) => `rgba(44, 122, 46, ${opacity})`, // Dark green labels
  barPercentage: 0.9,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: '#e0e0e058',
  },
};

const CustomBarChart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartPaddingWrapper}>
            <BarChart
              data={chartData}
              width={chartData.labels.length * 60}
              height={350}
              chartConfig={chartConfig}
              showValuesOnTopOfBars={true}
              fromZero={true}
              verticalLabelRotation={0}
              withInnerLines={true}
              segments={5}
              style={styles.chartStyle}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
  borderRadius: 12,
  padding: 8,
  elevation: 2,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 4,
  width: Dimensions.get('window').width - 40,
  },
  chartPaddingWrapper: {
    paddingTop: 30, // ✅ Adds top space above bars/labels
  },
  chartStyle: {
    borderRadius: 10,
  },
});

export default CustomBarChart;
