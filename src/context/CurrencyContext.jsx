// // CurrencyContext.js
// import React, { createContext, useState } from 'react';

// export const CurrencyContext = createContext();

// const currencyList = [
//   { country: 'Afghanistan', symbol: '$', code: 'AFN' },
//   { country: 'India', symbol: '₹', code: 'INR' },
//   { country: 'USA', symbol: '$', code: 'USD' },
//   { country: 'Europe', symbol: '€', code: 'EUR' },
//   { country: 'Japan', symbol: '¥', code: 'JPY' },
//   { country: 'UK', symbol: '£', code: 'GBP' },
// ].sort((a, b) =>
//   a.country.localeCompare(b.country, 'en', { sensitivity: 'base' })
// );

// export const CurrencyProvider = ({ children }) => {
//   const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);

//   return (
//     <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, currencyList }}>
//       {children}
//     </CurrencyContext.Provider>
//   );

// context/CurrencyContext.js
// import React, { createContext, useContext, useState } from "react";

// const CurrencyContext = createContext();
// const currencyList = [
//   { country: 'Afghanistan', symbol: '$', code: 'AFN' },
//   { country: 'India', symbol: '₹', code: 'INR' },
//   { country: 'USA', symbol: '$', code: 'USD' },
//   { country: 'Europe', symbol: '€', code: 'EUR' },
//   { country: 'Japan', symbol: '¥', code: 'JPY' },
//   { country: 'UK', symbol: '£', code: 'GBP' },
// ].sort((a, b) =>
//   a.country.localeCompare(b.country, 'en', { sensitivity: 'base' })
// );

// console.log("Available Currencies:", currencyList);

// export const CurrencyProvider = ({ children }) => {
//   const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);

//   return (
//     <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// // Custom hook
// export const useCurrency = () => {
//   const context = useContext(CurrencyContext);
//   if (!context) {
//     throw new Error("useCurrency must be used within a CurrencyProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState } from "react";

// Create Context
const CurrencyContext = createContext();

// Currency list
const currencyList = [
  { country: 'Afghanistan', symbol: '$', code: 'AFN' },
  { country: 'India', symbol: '₹', code: 'INR' },
  { country: 'USA', symbol: '$', code: 'USD' },
  { country: 'Europe', symbol: '€', code: 'EUR' },
  { country: 'Japan', symbol: '¥', code: 'JPY' },
  { country: 'UK', symbol: '£', code: 'GBP' },
].sort((a, b) =>
  a.country.localeCompare(b.country, 'en', { sensitivity: 'base' })
);
// Provider
export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, currencyList }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
