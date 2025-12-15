import React from "react";
import { LanguageContext } from "./LanguageContext";

// --- A Simple Translation Dictionary ---
const translations = {
  en: {
    welcome: "Welcome to our App",
    changeBtn: "Change Language",
    status: "Current Language is English"
  },
  es: {
    welcome: "Bienvenido a nuestra aplicación",
    changeBtn: "Cambiar idioma",
    status: "El idioma actual es español"
  }
};

// --- STEP 3: Consume the Context (The Child Component) ---
export const Header = () => {
    const { language, toggleLanguage } = React.useContext(LanguageContext);
    const { welcome, changeBtn, status } = translations[language];
    return (
        <div className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-indigo-200/20 to-purple-200/20 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                    </svg>
                </div>

                {/* Welcome text */}
                <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-linear-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    {welcome}
                </h2>

                {/* Status indicator */}
                <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-sm font-medium text-green-700">{status}</p>
                </div>

                {/* Language toggle button */}
                <button
                    onClick={toggleLanguage}
                    className="group relative inline-flex items-center px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <span className="relative z-10 mr-2">{changeBtn}</span>
                    <svg className="w-5 h-5 relative z-10 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l3-3m0 0l3 3m-3-3h12M4 4h16l-3 3m0 0l3 3m-3-3V4"></path>
                    </svg>
                </button>

                {/* Language indicators */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <div className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${language === 'en' ? 'bg-blue-100 text-blue-800 shadow-md' : 'bg-gray-100 text-gray-600'}`}>
                        <span className="mr-1">🇺🇸</span> EN
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${language === 'es' ? 'bg-blue-100 text-blue-800 shadow-md' : 'bg-gray-100 text-gray-600'}`}>
                        <span className="mr-1">🇪🇸</span> ES
                    </div>
                </div>
            </div>
        </div>
    );
};