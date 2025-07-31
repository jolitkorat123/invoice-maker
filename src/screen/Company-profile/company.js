// // company.js
// import db from './../db';

// // Create company table if it doesn't exist
// export const createCompanyTable = () => {
//   db.transaction(tx => {
    // tx.executeSql(
      // `CREATE TABLE IF NOT EXISTS company (
      //   id INTEGER PRIMARY KEY AUTOINCREMENT,
      //   companyName TEXT,
      //   email TEXT,
      //   phone TEXT,
      //   address TEXT,
      //   taxNo TEXT,
      //   taxType TEXT,
      //   businessNature TEXT,
      //   logo TEXT
      // );`
    // );
//   });
// };

// // Insert new company data
// export const insertCompany = (data, onSuccess, onError) => {
//   db.transaction(tx => {
//     tx.executeSql(
      // `INSERT INTO company (companyName, email, phone, address, taxNo, taxType, businessNature, logo)
      //  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      // [
      //   data.companyName,
      //   data.email,
      //   data.phone,
      //   data.address,
      //   data.taxNo,
      //   data.taxType,
      //   data.businessNature,
      //   data.logo,
      // ],
//       (_, result) => onSuccess && onSuccess(result),
//       (_, error) => {
//         onError && onError(error);
//         return false;
//       }
//     );
//   });
// };

// // Fetch the latest company profile
// export const getLatestCompany = (onSuccess, onError) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'SELECT * FROM company ORDER BY id DESC LIMIT 1',
//       [],
//       (_, { rows }) => onSuccess && onSuccess(rows._array[0]),
//       (_, error) => {
//         onError && onError(error);
//         return false;
//       }
//     );
//   });
// };


// company.js
import db from './../db';

// Debug function to log all company data
export const logAllCompanies = async () => {
  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM company',
        [],
        (_, { rows }) => {
          console.log('All company data:', JSON.stringify(rows._array, null, 2));
          resolve(rows._array);
        },
        (_, error) => {
          console.error('Error fetching companies:', error);
          resolve([]);
        }
      );
    });
  });
};

// Create company table if it doesn't exist
export const createCompanyTable = () => {
  console.log('Creating/verifying company table...');
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyName TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        taxNo TEXT,
        taxType TEXT,
        businessNature TEXT,
        logo TEXT
      );`,
      [],
      () => console.log('Company table ready'),
      (_, error) => console.error('Error creating table:', error)
    );
  });
};

// Insert new company data
export const insertCompany = async (data) => {
  console.log('Inserting company data:', data);
  return new Promise((resolve, reject) => {
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
        (_, result) => {
          console.log('Insert successful, ID:', result.insertId);
          resolve(result);
        },
        (_, error) => {
          console.error('Insert failed:', error);
          reject(error);
        }
      );
    });
  });
};

// Fetch the latest company profile
export const getLatestCompany = async () => {
  console.log('Fetching latest company...');
  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM company ORDER BY id DESC LIMIT 1',
        [],
        (_, { rows }) => {
          const company = rows._array[0];
          console.log('Latest company:', company);
          resolve(company);
        },
        (_, error) => {
          console.error('Error fetching company:', error);
          resolve(null);
        }
      );
    });
  });
};