'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './CurrencyDropdown.module.css';
import { useCurrency, currencies } from '@/context/CurrencyContext';

export default function CurrencyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentCurrency, setCurrentCurrencyCode } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currencyList = Object.values(currencies);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={styles.triggerBtn} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.prefix}>{currentCurrency.prefix}</span>
        <span className={styles.code}>{currentCurrency.code}</span>
        <ChevronDown size={14} className={isOpen ? styles.iconOpen : styles.icon} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.menuHeader}>Select Currency</div>
          <ul className={styles.menuList}>
            {currencyList.map((curr) => (
              <li 
                key={curr.code} 
                className={`${styles.menuItem} ${currentCurrency.code === curr.code ? styles.selectedItem : ''}`}
                onClick={() => { setCurrentCurrencyCode(curr.code as any); setIsOpen(false); }}
              >
                <span className={styles.itemPrefix}>{curr.prefix.toUpperCase()}</span>
                <div className={styles.itemDetails}>
                  <span className={styles.itemCode}>{curr.code}</span>
                  <span className={styles.itemName}>{curr.name}</span>
                </div>
                {currentCurrency.code === curr.code && (
                  <Check size={18} className={styles.checkIcon} strokeWidth={2.5} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
