'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyCode = 'USD' | 'LKR' | 'EUR' | 'GBP' | 'AED';

interface Currency {
  code: CurrencyCode;
  prefix: string;
  name: string;
  rateToUSD: number; // Conversion rate relative to USD
  symbol: string;
}

export const currencies: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', prefix: 'us', name: 'US Dollar ($)', rateToUSD: 1, symbol: '$' },
  LKR: { code: 'LKR', prefix: 'lk', name: 'Sri Lankan Rupee (Rs.)', rateToUSD: 300, symbol: 'Rs.' },
  EUR: { code: 'EUR', prefix: 'eu', name: 'Euro (€)', rateToUSD: 0.94, symbol: '€' },
  GBP: { code: 'GBP', prefix: 'gb', name: 'British Pound (£)', rateToUSD: 0.79, symbol: '£' },
  AED: { code: 'AED', prefix: 'ae', name: 'UAE Dirham (AED)', rateToUSD: 3.67, symbol: 'AED ' }
};

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrentCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCurrencyCode, setCurrentCurrencyCode] = useState<CurrencyCode>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('gemfort_currency') as CurrencyCode;
    if (saved && currencies[saved]) {
      setCurrentCurrencyCode(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrentCurrencyCode(code);
    localStorage.setItem('gemfort_currency', code);
  };

  const formatPrice = (priceInUSD: number) => {
    const curr = currencies[currentCurrencyCode];
    const converted = priceInUSD * curr.rateToUSD;
    
    return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currentCurrency: currencies[currentCurrencyCode], 
      setCurrentCurrencyCode: setCurrency,
      formatPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
