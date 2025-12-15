import React from "react";
import PropTypes from 'prop-types';
import { LanguageContext } from "./LanguageContext";

// --- STEP 2: Create the Provider Component ---
export const LanguageProvider = ({ children }) => {
    // default language is English ('en')
    const [language, setLanguage] = React.useState("en");

    // Function to toggle between 'en' and 'es'
    const toggleLanguage = React.useCallback(() => {
        setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"));
    }, []);

    const value = React.useMemo(() => ({ language, toggleLanguage }), [language, toggleLanguage]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

LanguageProvider.propTypes = {
  children: PropTypes.node
};