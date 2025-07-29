// company.js
import db from './../db';

// Create company table if it doesn't exist
export const createCompanyTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyName TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        taxNo TEXT,
        taxType TEXT,
        businessNature TEXT,
        logo TEXT
      );`
    );
  });
};

// Insert new company data
export const insertCompany = (data, onSuccess, onError) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.companyName,
        data.email,
        data.phone,
        data.address,
        data.taxNo,
        data.taxType,
        data.businessNature,
        data.logo,
      ],
      (_, result) => onSuccess && onSuccess(result),
      (_, error) => {
        onError && onError(error);
        return false;
      }
    );
  });
};

// Fetch the latest company profile
export const getLatestCompany = (onSuccess, onError) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM company ORDER BY id DESC LIMIT 1',
      [],
      (_, { rows }) => onSuccess && onSuccess(rows._array[0]),
      (_, error) => {
        onError && onError(error);
        return false;
      }
    );
  });
};
