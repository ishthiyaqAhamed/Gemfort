'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './CurrencyDropdown.module.css';

const currencies = [
  { code: 'USD', prefix: 'us', name: 'US Dollar ($)' },
  { code: 'LKR', prefix: 'lk', name: 'Sri Lankan Rupee (Rs.)' },
  { code: 'EUR', prefix: 'eu', name: 'Euro (€)' },
  { code: 'GBP', prefix: 'gb', name: 'British Pound (£)' },
  { code: 'AED', prefix: 'ae', name: 'UAE Dirham (AED)' }
];

export default function CurrencyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currencies[0]);
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

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={styles.triggerBtn} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.prefix}>{selected.prefix}</span>
        <span className={styles.code}>{selected.code}</span>
        <ChevronDown size={14} className={isOpen ? styles.iconOpen : styles.icon} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.menuHeader}>Select Currency</div>
          <ul className={styles.menuList}>
            {currencies.map((curr) => (
              <li 
                key={curr.code} 
                className={`${styles.menuItem} ${selected.code === curr.code ? styles.selectedItem : ''}`}
                onClick={() => { setSelected(curr); setIsOpen(false); }}
              >
                <span className={styles.itemPrefix}>{curr.prefix.toUpperCase()}</span>
                <div className={styles.itemDetails}>
                  <span className={styles.itemCode}>{curr.code}</span>
                  <span className={styles.itemName}>{curr.name}</span>
                </div>
                {selected.code === curr.code && (
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
