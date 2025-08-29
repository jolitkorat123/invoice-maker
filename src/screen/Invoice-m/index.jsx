import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import invoice from '../../../assets/screen-13/invoice-placeholder.png';
import estimate from '../../../assets/screen-13/bill.png';
import client from '../../../assets/screen-13/Mask-group.png';
import item from '../../../assets/screen-13/box.png';
import { Calendar } from 'react-native-calendars';
import CustomBarChart from '../Chart/barChart';
import Line from '../Chart/lineChart';
import { useCurrency } from '../../context/CurrencyContext';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';



const InvoiceScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState('All');
  const [selectedTab, setSelectedTab] = useState('invoice');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [frequency, setFrequency] = useState('Monthly');
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showInvoiceStatusModal, setShowInvoiceStatusModal] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [tempStatus, setTempStatus] = useState(null);
  const [items, setItems] = useState([]);
  const [db, setDb] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const frequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const [invoices, setInvoices] = useState([
    {
      id: 'INV00001',
      clientName: 'Divyesh Shah',
      amount: 56050,
      status: 'Unpaid',
      dueDate: '17/05/2025',
      message: t('unpaid'),
    },
    {
      id: 'INV00002',
      clientName: 'Shivangi Rathi',
      amount: 8000,
      status: 'Paid',
      dueDate: '17/05/2025',
      message: t('paid'),
    },
    {
      id: 'INV00003',
      clientName: 'Karan Patel',
      amount: 12000,
      status: 'Unpaid',
      dueDate: '20/06/2025',
      message: t('unpaid'),
    },
    {
      id: 'INV00004',
      clientName: 'Nirali Mehta',
      amount: 24500,
      status: 'Paid',
      dueDate: '15/06/2025',
      message: t('paid'),
    },
  ]);

  const [estimates, setEstimates] = useState([
    {
      id: 'EST00001',
      clientName: 'Divyesh Shah',
      amount: 15200,
      status: 'Pending',
      dueDate: '10/08/2025',
      message: t('pending'),
    },
    {
      id: 'EST00002',
      clientName: 'Shivangi Rathi',
      amount: 8000,
      status: 'Approved',
      dueDate: '15/08/2025',
      message: t('approved'),
    },
    {
      id: 'EST00003',
      clientName: 'Karan Patel',
      amount: 9500,
      status: 'Overdue',
      dueDate: '01/08/2025',
      message: t('overdue'),
    },
    {
      id: 'EST00004',
      clientName: 'Pooja Nair',
      amount: 12000,
      status: 'Cancel',
      dueDate: '20/08/2025',
      message: t('cancel'),
    },
  ]);

  useFocusEffect(
  useCallback(() => {
    if (db) {
      loadItems(db);
    }
  }, [db])
);


  // Initialize database and load items
  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true,
        });
        setDb(database);
        await loadItems(database);
      } catch (err) {
        console.error('❌ DB Init Error:', err);
      }
    };

    initDb();
  }, []);

  const loadItems = async (database) => {
    try {
      const result = await database.getAllAsync('SELECT * FROM items');
      setItems(result);
    } catch (error) {
      console.error('❌ Load Items Error:', error);
    }
  };

  const deleteItem = async (id) => {
    if (!db) return;

    try {
      await db.runAsync('DELETE FROM items WHERE id = ?', [id]);
      await loadItems(db);
      setShowDeleteModal(false);
      Alert.alert('Success', 'Item deleted successfully');
    } catch (error) {
      console.error('❌ Delete Item Error:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const CustomDatePicker = ({ visible, date, onSelect, onClose }) => (
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
            minDate={'1001-01-01'}
            maxDate={'3000-12-31'}
            onDayPress={(day) => {
              onSelect(new Date(day.dateString));
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

  const formatAmount = (amount) => {
    if (!selectedCurrency) return amount.toLocaleString();
    return `${selectedCurrency.symbol}${amount.toLocaleString()}`;
  };

  const totalSales = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalReceived = invoices
    .filter(invoice => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const RedirectNewInvoiceScreen = () => navigation.navigate('New-invoice', {
    invoiceId: `INV${String(invoices.length + 1).padStart(5, '0')}`
  });

  const RedirectEstimateScreen = () => navigation.navigate('Estimate-screen', {
    invoiceId: `EST${String(estimates.length + 1).padStart(5, '0')}`
  });

  const RedirectClientScreen = () => navigation.navigate('Client-Screen');
  const RedirectAdditemScreen = () => navigation.navigate('Add-item');
  const RedirectEditItemScreen = (item) => navigation.navigate('Add-item', { item });

  const getHeaderTitle = () => {
    switch (selectedTab) {
      case 'invoice':
        return t('invoice');
      case 'estimate':
        return t('estimate');
      case 'client':
        return t('client');
      case 'report':
        return t('report');
      case 'item':
        return t('item');
      default:
        return t('invoice_maker');
    }
  };

  const handleInvoiceStatusChange = (newStatus) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(invoice =>
        invoice.id === selectedInvoice.id
          ? {
            ...invoice,
            status: newStatus,
            message: t(newStatus.toLowerCase())
          }
          : invoice
      )
    );
    setShowInvoiceStatusModal(false);
  };

  const handleEstimateStatusChange = (newStatus) => {
    setEstimates(prevEstimates =>
      prevEstimates.map(estimate =>
        estimate.id === selectedEstimate.id
          ? {
            ...estimate,
            status: newStatus,
            message: t(newStatus.toLowerCase())
          }
          : estimate
      )
    );
    setShowStatusModal(false);
  };

  const openInvoiceStatusModal = (invoice) => {
    setSelectedInvoice(invoice);
    setTempStatus(invoice.status);
    setShowInvoiceStatusModal(true);
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.greenHeader}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings-screen')}>
            <Ionicons name="settings-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      {(selectedTab === 'invoice' || selectedTab === 'report') && (
        <View style={styles.statContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{t('total_sales')}</Text>
            <Text style={styles.statValueGreen}>{formatAmount(totalSales)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{t('total_received')}</Text>
            <Text style={styles.statValueRed}>{formatAmount(totalReceived)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{t('total_overdue')}</Text>
            <Text style={styles.statValueBlack}>{formatAmount(0)}</Text>
          </View>
        </View>
      )}

      {/* Tabs */}
      {(selectedTab === 'invoice' || selectedTab === 'estimate' || selectedTab === 'report') && (
        <View style={styles.tabs}>
          {(selectedTab === 'invoice'
            ? ['All', 'Paid', 'Unpaid']
            : selectedTab === 'estimate'
              ? ['All', 'Pending', 'Approved', 'Overdue', 'Cancel']
              : ['Sales', 'Received', 'Receivable']
          ).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
                {t(tab.toLowerCase())}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Invoice Tab Content */}
      {selectedTab === 'invoice' && (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {invoices.filter(item => activeTab === 'All' || item.status === activeTab).length > 0 ? (
              invoices
                .filter(item => activeTab === 'All' || item.status === activeTab)
                .map((item, index) => (
                  <View key={index} style={styles.card}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.invoiceId}>{item.id}</Text>
                      <Text style={styles.clientName}>{item.clientName}</Text>
                    </View>
                    <View style={styles.rowBetween}>
                      <Text style={styles.date}>{item.dueDate}</Text>
                      <Text style={styles.amount}>{formatAmount(item.amount)}</Text>
                    </View>
                    <View style={styles.rowBetween}>
                      <Text style={styles.message}>{item.message}</Text>
                      <TouchableOpacity onPress={() => openInvoiceStatusModal(item)}>
                        <View style={[styles.statusBadge, {
                          backgroundColor: item.status === 'Paid' ? '#E0F5E9' : '#FFEAEA',
                        }]}>
                          <Text style={[styles.statusText, {
                            color: item.status === 'Paid' ? '#4CAF50' : '#FF3B30',
                          }]}>
                            {t(item.status.toLowerCase())}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
            ) : (
              <View style={styles.content}>
                <Image source={invoice} style={styles.placeholderIcon} />
                <Text style={styles.noInvoiceText}>
                  {t('no_invoice_message') + '\n' + t('create_invoice_prompt')}
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.bottomTab}>
            <TouchableOpacity style={styles.createBtn} onPress={RedirectNewInvoiceScreen}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.createBtnText}>{t('create_new_invoice')}</Text>
            </TouchableOpacity>
          </View>

          {/* Invoice Status Modal */}
          <Modal transparent visible={showInvoiceStatusModal} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Mark as</Text>

                <TouchableOpacity
                  style={styles.statusOption}
                  onPress={() => setTempStatus('Unpaid')}
                >
                  <Text style={styles.statusOptionText}>Unpaid</Text>
                  {tempStatus === 'Unpaid' && (
                    <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.statusOption}
                  onPress={() => setTempStatus('Paid')}
                >
                  <Text style={styles.statusOptionText}>Paid</Text>
                  {tempStatus === 'Paid' && (
                    <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowInvoiceStatusModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={() => handleInvoiceStatusChange(tempStatus)}
                  >
                    <Text style={styles.changeButtonText}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {/* Estimate Tab Content */}
      {selectedTab === 'estimate' && (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {estimates.filter(item => activeTab === 'All' || item.status === activeTab).length > 0 ? (
              estimates
                .filter(item => activeTab === 'All' || item.status === activeTab)
                .map((item, index) => (
                  <View key={index} style={styles.card}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.invoiceId}>{item.id}</Text>
                      <Text style={styles.clientName}>{item.clientName}</Text>
                    </View>
                    <View style={styles.rowBetween}>
                      <Text style={styles.date}>{item.dueDate}</Text>
                      <Text style={styles.amount}>{formatAmount(item.amount)}</Text>
                    </View>
                    <View style={styles.rowBetween}>
                      <Text style={styles.message}>{item.message}</Text>
                      <TouchableOpacity onPress={() => {
                        setSelectedEstimate(item);
                        setTempStatus(item.status);
                        setShowStatusModal(true);
                      }}>
                        <View style={[styles.statusBadge, {
                          backgroundColor:
                            item.status === 'Approved'
                              ? '#E0F5E9'
                              : item.status === 'Overdue'
                                ? '#FFF3E0'
                                : item.status === 'Cancel'
                                  ? '#FFEBEE'
                                  : '#E3F2FD',
                        }]}>
                          <Text style={[styles.statusText, {
                            color:
                              item.status === 'Approved'
                                ? '#4CAF50'
                                : item.status === 'Overdue'
                                  ? '#FB8C00'
                                  : item.status === 'Cancel'
                                    ? '#F44336'
                                    : '#2196F3',
                          }]}>
                            {t(item.status.toLowerCase())}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
            ) : (
              <View style={styles.content}>
                <Image source={estimate} style={styles.placeholderIcon} />
                <Text style={styles.noInvoiceText}>
                  {t('no_estimate_message') + '\n' + t('create_estimate_prompt')}
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.bottomTab}>
            <TouchableOpacity style={styles.createBtn} onPress={RedirectEstimateScreen}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.createBtnText}>{t('create_estimate')}</Text>
            </TouchableOpacity>
          </View>

          {/* Estimate Status Modal */}
          <Modal transparent visible={showStatusModal} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Mark as</Text>

                <TouchableOpacity
                  style={styles.statusOption}
                  onPress={() => setTempStatus('Pending')}
                >
                  <Text style={styles.statusOptionText}>Pending</Text>
                  {tempStatus === 'Pending' && (
                    <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.statusOption}
                  onPress={() => setTempStatus('Approved')}
                >
                  <Text style={styles.statusOptionText}>Approved</Text>
                  {tempStatus === 'Approved' && (
                    <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.statusOption}
                  onPress={() => setTempStatus('Overdue')}
                >
                  <Text style={styles.statusOptionText}>Overdue</Text>
                  {tempStatus === 'Overdue' && (
                    <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.statusOption}
                  onPress={() => setTempStatus('Cancel')}
                >
                  <Text style={styles.statusOptionText}>Cancel</Text>
                  {tempStatus === 'Cancel' && (
                    <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowStatusModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={() => handleEstimateStatusChange(tempStatus)}
                  >
                    <Text style={styles.changeButtonText}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {/* Client Tab Content */}
      {selectedTab === 'client' && (
        <View style={styles.content}>
          <Image source={client} style={styles.placeholderIcon} />
          <Text style={styles.noInvoiceText}>
            {t('client_message') + '\n' + t('create_client_prompt')}
          </Text>
          <TouchableOpacity style={styles.createBtn} onPress={RedirectClientScreen}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.createBtnText}>{t('add_new_client')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Report Tab Content */}
      {selectedTab === 'report' && (
        <ScrollView style={{ flex: 1 }}>
          {/* Date & Frequency Select */}
          <View style={styles.reportControls}>
            <TouchableOpacity style={styles.dropdownBox} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dropdownText}>
                {selectedDate.toLocaleDateString()}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownBox} onPress={() => setShowFrequencyModal(true)}>
              <Text style={styles.dropdownText}>{frequency}</Text>
              <Ionicons name="chevron-down" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.reportPlaceholderBox}>
            <CustomBarChart />
          </View>
          <View style={styles.reportPlaceholderBox}>
            <Line />
          </View>

          {/* Custom Date Picker */}
          <CustomDatePicker
            visible={showDatePicker}
            date={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
            }}
            onClose={() => setShowDatePicker(false)}
          />

          {/* Frequency Modal */}
          <Modal transparent visible={showFrequencyModal} animationType="fade">
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
              onPress={() => setShowFrequencyModal(false)}
            >
              <View
                style={{
                  marginTop: 'auto',
                  backgroundColor: '#fff',
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                {frequencyOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={{ paddingVertical: 12 }}
                    onPress={() => {
                      setFrequency(option);
                      setShowFrequencyModal(false);
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      )}

      {/* Item Tab Content */}
      {selectedTab === 'item' && (
         <View style={styles.content}>
           <Image source={item} style={styles.placeholderIcon} />
           <Text style={styles.noInvoiceText}>
             {t('item_message') + '\n' + t('create_item_prompt')}
           </Text>
           <TouchableOpacity style={styles.createBtn} onPress={RedirectAdditemScreen}>
             <Ionicons name="add" size={20} color="#fff" />
             <Text style={styles.createBtnText}>{t('add_item')}</Text>
           </TouchableOpacity>
         </View>
       )}


      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { name: 'invoice', icon: require('../../../assets/screen-13/1.png') },
          { name: 'estimate', icon: require('../../../assets/screen-13/2.png') },
          { name: 'client', icon: require('../../../assets/screen-13/3.png') },
          { name: 'report', icon: require('../../../assets/screen-13/4.png') },
          { name: 'item', icon: require('../../../assets/screen-13/5.png') },
        ].map(tab => {
          const isActive = selectedTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => setSelectedTab(tab.name)}
              style={styles.navItemWrapper}
            >
              {isActive ? (
                <LinearGradient
                  colors={['#4cd04c3d', 'rgba(76, 208, 76, 0)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.activeNavBox}
                >
                  <Image
                    source={tab.icon}
                    style={[styles.iconImage, { tintColor: '#4CD04D' }]}
                  />
                  <Text style={[styles.navLabel, { color: '#4CD04D', fontWeight: '700' }]}>
                    {t(tab.name)}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.navIconBox}>
                  <Image
                    source={tab.icon}
                    style={[styles.iconImage, { tintColor: '#D9D9D9' }]}
                  />
                  <Text style={styles.navLabel}>{t(tab.name)}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FCF8'
  },
  greenHeader: {
    backgroundColor: '#4CAF50',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -39,
    paddingHorizontal: 10,
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    elevation: 4,
    overflow: 'hidden',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 14,
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center',
  },
  statValueGreen: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  statValueRed: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  statValueBlack: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginTop: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  activeTab: { backgroundColor: '#4CAF50' },
  tabText: { color: '#555', fontWeight: '600' },
  activeTabText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 17,
    padding: 16,
    margin: 10,
    elevation: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: '#888',
  },
  message: {
    fontSize: 12,
    color: '#666',
    marginTop: 15,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  placeholderIcon: {
    width: 120,
    height: 120,
    tintColor: '#ccc',
    marginBottom: 16,
  },
  noInvoiceText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginBottom: 24,
  },
  bottomTab: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtn: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  iconImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  navItemWrapper: { alignItems: 'center', flex: 1 },
  navIconBox: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    width: 70,
  },
  activeNavBox: {
    alignItems: 'center',
    padding: 10,
    width: 70,
  },
  invoiceId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
    marginBottom: 12,
  },
  navLabel: {
    fontSize: 12,
    color: '#D9D9D9',
    fontWeight: '500',
  },
  reportControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    width: '48%',
  },
  clientName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  reportPlaceholderBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginVertical: 10,
    marginHorizontal: 30,
    height: 350,
    width: 325,
    alignSelf: 'center',
    elevation: 3,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusOptionText: {
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  changeButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  changeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  datePickerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarStyle: {
    borderRadius: 10,
    elevation: 4,
    width: '100%',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  itemUnit: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  deleteMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});

export default InvoiceScreen;