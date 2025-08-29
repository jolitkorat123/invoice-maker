import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SQLite from 'expo-sqlite';

const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  po: Yup.string().required('P.O. is required'),
  title: Yup.string().required('Invoice title is required'),
});

const CustomDatePicker = ({ visible, date, onSelect, onClose, minDate }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.datePickerContainer}>
        <View style={styles.datePickerHeader}>
          <Text style={styles.datePickerHeaderText}>Select Date</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <Calendar
          style={styles.calendarStyle}
          current={date.toISOString().split('T')[0]}
          minDate={minDate || '1001-01-01'}
          maxDate={'3000-12-31'}
          onDayPress={(day) => {
            const selected = new Date(day.dateString);
            if (minDate && selected < new Date(minDate)) {
              Alert.alert('Invalid Date', 'End date cannot be before start date.');
              return;
            }
            onSelect(selected);
            onClose();
          }}
          renderArrow={(direction) => (
            <Ionicons
              name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
              size={24}
              color="#4CD04D"
            />
          )}
          markedDates={{
            [date.toISOString().split('T')[0]]: {
              selected: true,
              selectedColor: '#4CD04D'
            }
          }}
        />
      </View>
    </View>
  </Modal>
);

const InvoiceInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { invoiceId = 1 } = route.params || {};
  const invoiceNumber = `INV${String(invoiceId).padStart(5, '0')}`;
  const [invoiceNo] = useState(invoiceNumber);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState(7);
  const [showCustomStartPicker, setShowCustomStartPicker] = useState(false);
  const [showCustomEndPicker, setShowCustomEndPicker] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [db, setDb] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true
        });
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            invoiceNo TEXT NOT NULL,
            startDate TEXT NOT NULL,
            endDate TEXT NOT NULL,
            po TEXT NOT NULL,
            title TEXT NOT NULL
          );
        `);
        setDb(database);
        await refreshInvoiceList(database);
      } catch (err) {
        console.error('❌ Invoice DB Init Error:', err);
      }
    };

    initDb();
    handleDurationChange(duration);
  }, []);

  const refreshInvoiceList = async (database = db) => {
    if (!database) return;
    try {
      const rows = await database.getAllAsync(`SELECT * FROM invoices`);
      setInvoiceData(rows);
    } catch (error) {
      console.error('❌ Fetch Invoices Error:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshInvoiceList();
    setRefreshing(false);
  };

  const handleDurationChange = (days) => {
    setDuration(days);
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + days);
    setEndDate(newEndDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flex}>
          <LinearGradient colors={['#E3FCE9', '#ffffff']} style={styles.container}>
            <Formik
              initialValues={{ po: '', title: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if (!db) {
                  Alert.alert('Database not ready');
                  return;
                }

                try {
                  const existing = await db.getAllAsync(
                    'SELECT * FROM invoices WHERE invoiceNo = ?',
                    [invoiceNo]
                  );

                  if (existing.length > 0) {
                    Alert.alert(
                      'Invoice Exists',
                      'Are you sure you want to update this invoice info?',
                      [
                        { text: 'No', style: 'cancel' },
                        {
                          text: 'Yes',
                          onPress: async () => {
                            try {
                              await db.runAsync(
                                `UPDATE invoices 
                                 SET startDate = ?, endDate = ?, po = ?, title = ?
                                 WHERE invoiceNo = ?`,
                                [
                                  startDate.toISOString(),
                                  endDate.toISOString(),
                                  values.po,
                                  values.title,
                                  invoiceNo,
                                ]
                              );
                              Alert.alert('Updated', 'Invoice updated successfully', [
                                { 
                                  text: 'OK', 
                                  onPress: () => navigation.navigate('New-invoice', { 
                                    invoiceId: invoiceId,
                                    invoiceData: {
                                      invoiceNo,
                                      startDate: startDate.toISOString(),
                                      endDate: endDate.toISOString(),
                                      po: values.po,
                                      title: values.title
                                    }
                                  })
                                }
                              ]);
                              refreshInvoiceList();
                            } catch (err) {
                              console.error('❌ Update Error:', err);
                              Alert.alert('Error', 'Failed to update invoice.');
                            }
                          },
                        },
                      ]
                    );
                  } else {
                    await db.runAsync(
                      `INSERT INTO invoices (invoiceNo, startDate, endDate, po, title) VALUES (?, ?, ?, ?, ?)`,
                      [
                        invoiceNo,
                        startDate.toISOString(),
                        endDate.toISOString(),
                        values.po,
                        values.title,
                      ]
                    );
                    Alert.alert('Success', 'Invoice saved successfully', [
                      { 
                        text: 'OK', 
                        onPress: () => navigation.navigate('New-invoice', { 
                          invoiceId: invoiceId,
                          invoiceData: {
                            invoiceNo,
                            startDate: startDate.toISOString(),
                            endDate: endDate.toISOString(),
                            po: values.po,
                            title: values.title
                          }
                        })
                      }
                    ]);
                    refreshInvoiceList();
                  }
                } catch (err) {
                  console.error('❌ Save Error:', err);
                  Alert.alert('Error', 'Something went wrong.');
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView
                  contentContainerStyle={{ paddingBottom: verticalScale(160) }}
                  keyboardShouldPersistTaps="handled"
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={['#4CD04D']}
                      tintColor="#4CD04D"
                    />
                  }
                >
                  <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                      <Ionicons name="chevron-back" size={scale(28)} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Invoice Info</Text>
                  </View>

                  <View style={styles.card}>
                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/screen-15/invoice-no.png')} style={styles.icon} />
                      <TextInput value={invoiceNo} style={styles.input} editable={false} />
                    </View>

                    <TouchableOpacity style={styles.inputRow} onPress={() => setShowCustomStartPicker(true)}>
                      <Image source={require('../../../assets/screen-15/start-date.png')} style={styles.icon} />
                      <Text style={styles.input}>{formatDate(startDate)}</Text>
                      <Ionicons name="calendar" size={20} color="#4CD04D" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputRow} onPress={() => setShowDurationModal(true)}>
                      <Image source={require('../../../assets/screen-15/duration.png')} style={styles.icon} />
                      <Text style={styles.input}>{`${duration} Days`}</Text>
                      <Ionicons name="chevron-down" size={18} color="#4CD04D" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputRow} onPress={() => setShowCustomEndPicker(true)}>
                      <Image source={require('../../../assets/screen-15/end-date.png')} style={styles.icon} />
                      <Text style={styles.input}>{formatDate(endDate)}</Text>
                      <Ionicons name="calendar" size={20} color="#4CD04D" />
                    </TouchableOpacity>

                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/screen-15/p.o.png')} style={styles.icon} />
                      <TextInput
                        value={values.po}
                        onChangeText={handleChange('po')}
                        onBlur={handleBlur('po')}
                        style={styles.input}
                        placeholder="P.O."
                        placeholderTextColor="#ccc"
                      />
                    </View>
                    {touched.po && errors.po && (
                      <Text style={{ color: 'red', marginLeft: scale(10) }}>{errors.po}</Text>
                    )}

                    <View style={styles.inputRow}>
                      <Image source={require('../../../assets/screen-15/title-name.png')} style={styles.icon} />
                      <TextInput
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        style={styles.input}
                        placeholder="Invoice Title"
                        placeholderTextColor="#ccc"
                      />
                    </View>
                    {touched.title && errors.title && (
                      <Text style={{ color: 'red', marginLeft: scale(10) }}>{errors.title}</Text>
                    )}
                  </View>

                  <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </Formik>
          </LinearGradient>

          {/* Start Date Picker */}
          <CustomDatePicker
            visible={showCustomStartPicker}
            date={startDate}
            onSelect={(date) => {
              setStartDate(date);
              handleDurationChange(duration); // recalculate endDate
            }}
            onClose={() => setShowCustomStartPicker(false)}
          />

          {/* End Date Picker with minDate set to startDate */}
          <CustomDatePicker
            visible={showCustomEndPicker}
            date={endDate}
            minDate={startDate.toISOString().split('T')[0]} // ✅ restrict earlier date
            onSelect={(date) => {
              setEndDate(date);
              const diffTime = date - startDate;
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              setDuration(diffDays);
            }}
            onClose={() => setShowCustomEndPicker(false)}
          />

          {/* Duration Modal */}
          <Modal visible={showDurationModal} transparent animationType="slide">
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setShowDurationModal(false)}
              activeOpacity={1}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderText}>Select Duration</Text>
                  <TouchableOpacity onPress={() => setShowDurationModal(false)}>
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {[...Array(150).keys()].map((_, i) => {
                    const day = i + 1;
                    return (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.modalOption,
                          duration === day && { backgroundColor: '#4CD04D' },
                        ]}
                        onPress={() => {
                          handleDurationChange(day);
                          setShowDurationModal(false);
                        }}
                      >
                        <Text
                          style={{
                            color: duration === day ? '#fff' : '#000',
                            fontSize: moderateScale(16),
                          }}
                        >
                          {day} Days
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: scale(20) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(10),
  },
  backButton: {
    backgroundColor: '#4CD04D',
    padding: scale(5),
    borderRadius: scale(100),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#333',
    marginRight: scale(28),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: scale(16),
    padding: scale(20),
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: scale(8),
    marginBottom: verticalScale(20),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#ccc',
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(4),
  },
  icon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#000',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: verticalScale(30),
    left: scale(10),
    right: scale(10),
  },
  saveButton: {
    backgroundColor: '#4CD04D',
    paddingVertical: verticalScale(14),
    borderRadius: scale(30),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    elevation: 1,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    maxHeight: height * 0.6,
    width: width * 0.9,
    borderRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalHeaderText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: width * 0.9,
    overflow: 'hidden',
    elevation: 5,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarStyle: {
    paddingBottom: 15,
  },
});

export default InvoiceInfoScreen;