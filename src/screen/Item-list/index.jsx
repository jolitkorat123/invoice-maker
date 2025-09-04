import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const ItemListScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const isSelectionMode = route.params?.isSelectionMode || false;
  const onItemsSelected = route.params?.onItemsSelected;

  const [db, setDb] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('userdb.db', {
          useNewConnection: true,
        });
        setDb(database);
      } catch (err) {
        console.error('❌ DB Init Error:', err);
      }
    };
    initDb();
  }, []);

  useEffect(() => {
    if (db) fetchItems();
  }, [db, isFocused]);

  const fetchItems = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM items');
      setItems(result);
    } catch (err) {
      console.error('❌ Fetch Items Error:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM items WHERE id = ?', [id]);
      fetchItems();
      setDeleteModalVisible(false);
    } catch (err) {
      console.error('❌ Delete Item Error:', err);
    }
  };

  const deleteAllItems = async () => {
    try {
      await db.runAsync('DELETE FROM items');
      fetchItems();
      Alert.alert('Success', 'All items have been deleted.');
    } catch (err) {
      console.error('❌ Delete All Items Error:', err);
    }
  };

  const confirmDeleteAll = () => {
    Alert.alert(
      'Delete All Items',
      'Are you sure you want to delete ALL items? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: deleteAllItems },
      ]
    );
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setDeleteModalVisible(true);
  };

  const editItem = (item) => {
    navigation.navigate('Add-item', { item });
  };

  const toggleItemSelection = (item) => {
    if (isSelectionMode) {
      const isSel = selectedItems.some(s => s.id === item.id);
      setSelectedItems(isSel ? selectedItems.filter(s => s.id !== item.id) : [...selectedItems, item]);
    } else {
      setSelectedItem(selectedItem === item.id ? null : item.id);
    }
  };

  const confirmSelection = () => {
    if (onItemsSelected && selectedItems.length > 0) {
      onItemsSelected(selectedItems);
    }
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    const isSelected = isSelectionMode && selectedItems.some(s => s.id === item.id);
    const isMenuOpen = !isSelectionMode && selectedItem === item.id;

    return (
      // 👇 Wrapper keeps this row on top when menu is open
      <View style={{ position: 'relative', zIndex: isMenuOpen ? 999 : 1, elevation: isMenuOpen ? 999 : 1 }}>
        <TouchableOpacity
          activeOpacity={isSelectionMode ? 0.7 : 1}
        >
          <View style={[
            styles.itemBox,
            isSelected && styles.selectedItemBox
          ]}>
            {isSelectionMode && (
              <TouchableOpacity onPress={() => toggleItemSelection(item)}>
              <View style={styles.selectionIndicator} >
                <Ionicons
                  name={isSelected ? "checkbox" : "square-outline"}
                  size={20}
                  color={isSelected ? "#41d152" : "#ccc"}
                />
              </View>
            </TouchableOpacity>
            )}

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemPrice}>₹{item.itemPrice}</Text>
            </View>

            {!isSelectionMode && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(isMenuOpen ? null : item.id)
                  toggleItemSelection(item)
                }}
                style={styles.menuButton}
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        {/* 👇 Absolute menu that stays above other rows */}
        {isMenuOpen && (
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(null);
                editItem(item);
              }}
              style={styles.menuItem}
            >
              <Ionicons name="create-outline" size={16} color="#333" />
              <Text style={styles.menuOption}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(null);
                confirmDelete(item);
              }}
              style={[styles.menuItem, styles.deleteMenuItem]}
            >
              <Ionicons name="trash-outline" size={16} color="#e74c3c" />
              <Text style={[styles.menuOption, styles.deleteOption]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Invoice-m")}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isSelectionMode ? 'Select Items' : 'Item'}
        </Text>

        {!isSelectionMode ? (
          <TouchableOpacity onPress={confirmDeleteAll}>
            <Image
              source={require('../../../assets/item-list/Delete-icon.png')}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={confirmSelection}
            disabled={selectedItems.length === 0}
          >
            <Image
              source={require('../../../assets/item-list/done.png')}
              style={[
                styles.doneImage,
                selectedItems.length === 0 && styles.doneImageDisabled
              ]}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        style={{ position: 'relative' }}
        // 👇 IMPORTANT: avoid clipping behind next rows
        removeClippedSubviews={false}
      />

      {/* Add Button */}
      {!isSelectionMode && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Add-item')}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      )}

      {/* Selection info bar */}
      {isSelectionMode && selectedItems.length > 0 && (
        <View style={styles.selectionInfo}>
          <Text style={styles.selectionText}>
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
          </Text>
        </View>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDeleteModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Ionicons name="warning" size={24} color="#e74c3c" />
                  <Text style={styles.modalTitle}>Delete Item</Text>
                </View>
                <Text style={styles.modalMessage}>
                  Are you sure you want to delete "{itemToDelete?.itemName}"? This action cannot be undone.
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setDeleteModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={() => deleteItem(itemToDelete?.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fff9' },
  header: {
    backgroundColor: '#41d152',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),
    borderRadius: scale(100),
    zIndex: 1,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  deleteIcon: { width: 24, height: 24 },
  doneImage: { width: 70, height: 30, resizeMode: 'contain' },
  doneImageDisabled: { opacity: 0.5 },

  itemBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',    // keep relative for inside positioning

  },
  selectedItemBox: { borderWidth: 2, borderColor: '#41d152', backgroundColor: '#f0fff0' },
  selectionIndicator: { marginRight: 10 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '500' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#41d152' },
  menuButton: { padding: 5 },

  menu: {
    position: 'absolute',
    top: 45,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,           // higher elevation for Android
    zIndex: 999,             // higher zIndex for iOS
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: 120,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  deleteMenuItem: { borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  menuOption: { fontSize: 14, marginLeft: 8, color: '#333' },
  deleteOption: { color: '#e74c3c' },

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#41d152',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 6 },
  selectionInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#41d152',
    padding: 15,
    alignItems: 'center',
  },
  selectionText: { color: '#fff', fontWeight: 'bold' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: { backgroundColor: 'white', borderRadius: 12, padding: 20, width: '100%', maxWidth: 320 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  modalMessage: { fontSize: 16, color: '#555', marginBottom: 20, lineHeight: 22 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalButton: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6, marginLeft: 10 },
  cancelButton: { backgroundColor: '#f0f0f0' },
  deleteButton: { backgroundColor: '#e74c3c' },
  cancelButtonText: { color: '#333', fontWeight: '600' },
  deleteButtonText: { color: 'white', fontWeight: '600' },
});

export default ItemListScreen;






