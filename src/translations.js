import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  // Function to update translations
  const updateTranslations = (language, newTranslations) => {
    setCurrentLanguage(language);
    setTranslations(newTranslations);
  };

  useEffect(() => {
    // Fetch or load translations based on currentLanguage
    // For example, using i18next: i18n.getResourceBundle(currentLanguage, "translation")
    const newTranslations = {}; // Replace this with your translation loading logic
    updateTranslations(currentLanguage, newTranslations);
  }, [currentLanguage]); // Trigger when the language changes

  return (
    <TranslationContext.Provider value={{ currentLanguage, translations, updateTranslations }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};
