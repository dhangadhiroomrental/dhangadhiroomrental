import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'np' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (npText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('dhn_rental_lang');
    return (saved === 'en' || saved === 'np') ? saved : 'np';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('dhn_rental_lang', newLang);
  };

  const t = (npText: string, enText: string): string => {
    return lang === 'np' ? npText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
