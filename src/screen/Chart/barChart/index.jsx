// import React, { useState } from 'react';
// import {
//   View,
//   Dimensions,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// const clients = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E', 'Client F', 'Client G', 'Client H', 'Client I', 'Client J'];
// const clientData = [120, 80, 160,80, 200, 150, 90, 110, 130, 170];

// const MyBarChart = () => {
//   const [selectedClientIndex, setSelectedClientIndex] = useState(null);

//   // Construct custom color array based on selected index
//   const barColors = clientData.map((_, index) => () =>
//     selectedClientIndex === index
//       ? 'rgba(76, 208, 77, 1)' // Highlighted green
//       : 'rgba(200, 200, 200, 1)' // Default grey
//   );
//   const handleClientPress = (index) => {
//   setSelectedClientIndex(index);
// };

//   const data = {
//     labels: clients,
//     datasets: [
//       {
//         data: clientData,
//         colors: barColors,
//       },
//     ],
//   };

//   const chartConfig = {
//     backgroundGradientFrom: '#ffffff',
//     backgroundGradientTo: '#ffffff',
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     barPercentage: 0.5,
//     propsForBackgroundLines: {
//       stroke: '#4cd04c21',
//       strokeWidth: 1,
//     },
//     propsForLabels: {
//       fontSize: 10,
//     },
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bar Chart</Text>

//       <View>
//         <BarChart
//           data={data}
//           width={screenWidth - 40}
//           height={220}
//           chartConfig={chartConfig}
//           fromZero
//           showValuesOnTopOfBars
//           withInnerLines={true}
//           withHorizontalLabels={true}
//           withVerticalLabels={true}
//           style={styles.chart}
//           withCustomBarColorFromData={true}
//           flatColor={true}
//         />

//         {/* Touchable overlays for each bar */}
// <View style={styles.clientsContainer}>
//   {clients.map((client, index) => (
//     <TouchableOpacity
//       key={index}
//       onPress={() => handleClientPress(index)}
//       style={styles.clientTouchable}
//     >
//       <Text
//         style={[
//           styles.clientText,
//           selectedClientIndex === index && styles.selectedClient
//         ]}
//       >
//         {client}
//       </Text>
//     </TouchableOpacity>
//   ))}
// </View>
//       </View>
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
//     marginHorizontal: 20,
//     marginTop: 20,
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginBottom: 10,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   chart: {
//     borderRadius: 20,
//   },
//   touchOverlayContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 20,
//     height: 220,
//     flexDirection: 'row',
//   },
//   touchOverlay: {
//     position: 'absolute',
//     height: 220,
//     backgroundColor: 'transparent',
//   },
//   selectedClient: {
//   color: '#4CD04D',
//   fontWeight: 'bold',
// },
// clientText: {
//   fontSize: 12,
//     color: '#666',
// },
// clientsContainer: {
//   // Your container styles
// },
// clientTouchable: {
//   flex: 1,
//   alignItems: 'center',
// }
// });

// export default MyBarChart;
//working
// import React, { useState } from 'react';
// import {
//   View,
//   Dimensions,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;
// const barCount = 10;
// const barSpacing = 40;
// const chartWidth = barCount * barSpacing * 2; // Adjust based on bar width and spacing

// const clients = [
//   'Client A', 'Client B', 'Client C', 'Client D', 'Client E',
//   'Client F', 'Client G', 'Client H', 'Client I', 'Client J'
// ];
// const clientData = [120, 80, 160, 80, 200, 150, 90, 110, 130, 170];

// const MyBarChart = () => {
//   const [selectedClientIndex, setSelectedClientIndex] = useState(null);

//   const barColors = clientData.map((_, index) => () =>
//     selectedClientIndex === index
//       ? 'rgba(76, 208, 77, 1)'
//       : 'rgba(200, 200, 200, 1)'
//   );

//   const handleClientPress = (index) => {
//     setSelectedClientIndex(index);
//   };

//   const data = {
//     labels: clients.map(() => ''), // hide default X labels
//     datasets: [
//       {
//         data: clientData,
//         colors: barColors,
//       },
//     ],
//   };

//   const chartConfig = {
//     backgroundGradientFrom: '#ffffff',
//     backgroundGradientTo: '#ffffff',
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     barPercentage: 0.5,
//     propsForBackgroundLines: {
//       stroke: '#e0e0e0',
//       strokeWidth: 1,
//     },
//     formatYLabel: (y) => `${y}`,
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bar Chart</Text>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <View>
//           <BarChart
//             data={data}
//             width={chartWidth}
//             height={240}
//             chartConfig={chartConfig}
//             fromZero
//             showValuesOnTopOfBars
//             withInnerLines
//             withHorizontalLabels
//             withVerticalLabels
//             withCustomBarColorFromData
//             flatColor
//             style={styles.chart}
//             yAxisInterval={40}
//           />

//           {/* Perfectly aligned labels */}
//           <View style={[styles.clientsContainer, { width: chartWidth }]}>
//             {clients.map((client, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => handleClientPress(index)}
//                 style={styles.clientTouchable}
//               >
//                 <Text
//                   style={[
//                     styles.clientText,
//                     selectedClientIndex === index && styles.selectedClient
//                   ]}
//                 >
//                   {client}
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
//     marginHorizontal: 20,
//     marginTop: 30,
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginBottom: 10,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   chart: {
//     borderRadius: 20,
//     paddingRight: 40,
//   },
//   clientsContainer: {
//     flexDirection: 'row',
//     marginTop: -30,
//   },
//   clientTouchable: {
//     width: barSpacing * 2,
//     alignItems: 'center',
//   },
//   clientText: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//   },
//   selectedClient: {
//     color: '#4CD04D',
//     fontWeight: 'bold',
//   },
// });

// export default MyBarChart;
import React, { useState } from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// ✅ Your original data structure
const data = {
  labels: ['Client A', 'Client B', 'Client C', 'Client D', 'Client E',
    'Client F', 'Client G', 'Client H', 'Client I', 'Client J'],
  datasets: [
    {
      data: [120, 80, 160, 80, 200, 150, 90, 110, 130, 170],
    },
  ],
};

const barWidth = 60;
const spaceBetweenBars = 40;
const chartWidth = (barWidth + spaceBetweenBars) * data.labels.length;

const MyBarChart = () => {
  const [selectedClientIndex, setSelectedClientIndex] = useState(null);

  // ✅ Create colors array based on selected index
  const barColors = data.datasets[0].data.map((_, index) => () =>
    selectedClientIndex === index ? 'rgba(76, 208, 77, 1)' : 'rgba(180, 180, 180, 1)'
  );

  // ✅ Clone original data and inject custom colors
  const chartData = {
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        colors: barColors,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    barPercentage: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      stroke: '#e0e0e0',
    },
  };

  const handleClientPress = (index) => {
    setSelectedClientIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client Report</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <BarChart
            data={chartData}
            width={chartWidth}
            height={260}
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars
            withCustomBarColorFromData
            flatColor
            withInnerLines
            withHorizontalLabels
            withVerticalLabels={false}
            style={styles.chart}
          />

          {/* Client Labels */}
          <View style={[styles.labelsContainer, { width: chartWidth }]}>
            {data.labels.map((client, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: barWidth, alignItems: 'center' }}
                onPress={() => handleClientPress(index)}
              >
                <Text
                  style={[
                    styles.clientLabel,
                    selectedClientIndex === index && styles.selectedLabel,
                  ]}
                >
                  {client}
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
    marginHorizontal: 20,
    marginTop: 30,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
  labelsContainer: {
    flexDirection: 'row',
    marginTop: -20,
  },
  clientLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#4CD04D',
    fontWeight: 'bold',
  },
});

export default MyBarChart;
