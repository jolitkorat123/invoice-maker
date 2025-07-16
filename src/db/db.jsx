import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('company.db');

export const createTable = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS company (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          logo TEXT,
          companyName TEXT,
          email TEXT,
          phone TEXT,
          address TEXT,
          taxNo TEXT,
          taxType TEXT,
          businessNature TEXT
        );`,
        [],
        () => console.log('✅ Table created'),
        (_, error) => {
          console.error('❌ Table creation error:', error);
          return true;
        }
      );
    },
    error => console.error('❌ DB transaction error:', error)
  );
};

export const insertCompany = (data, onSuccess, onError) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `INSERT INTO company 
        (logo, companyName, email, phone, address, taxNo, taxType, businessNature)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.logo,
          data.companyName,
          data.email,
          data.phone,
          data.address,
          data.taxNo,
          data.taxType,
          data.businessNature,
        ],
        (_, result) => {
          console.log('✅ Data inserted');
          if (onSuccess) onSuccess(result);
        },
        (_, error) => {
          console.error('❌ Insert error:', error);
          if (onError) onError(error);
          return true;
        }
      );
    },
    error => console.error('❌ Insert transaction error:', error)
  );
};

export default db;
