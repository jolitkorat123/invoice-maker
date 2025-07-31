// // db.js
// import * as SQLite from 'expo-sqlite';

// const openDatabase = () => {
//   const db = SQLite.openDatabase('invoicemaker.db');
  
//   // Initialize tables if they don't exist
//   db.transaction(tx => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS company (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         companyName TEXT NOT NULL,
//         email TEXT NOT NULL,
//         phone TEXT NOT NULL,
//         address TEXT NOT NULL,
//         taxNo TEXT,
//         taxType TEXT,
//         businessNature TEXT,
//         logo TEXT
//       );`,
//       [],
//       () => console.log('Company table created/verified'),
//       (_, error) => {
//         console.error('Error creating company table:', error);
//         return false;
//       }
//     );
//   });

//   return db;
// };

// const database = openDatabase();
// export default database;

// db.js
import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  const db = SQLite.openDatabase('invoicemaker.db');
  
  // Initialize tables if they don't exist
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
      () => console.log('Company table created/verified'),
      (_, error) => {
        console.error('Error creating company table:', error);
        return false;
      }
    );
  });

  return db;
};

const database = openDatabase();
export default database;