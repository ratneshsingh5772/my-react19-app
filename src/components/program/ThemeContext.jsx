import React, {createContext,useState,useContext} from "react";
import PropTypes from "prop-types";

// --- STEP 1: Create the Context ---
// We define the shape of our context: the theme string and a function to toggle it.
const ThemeContext = createContext({
    theme: "light", // default value
    toggleTheme: () => {}, // placeholder function
});

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light");

    // Function to toggle between 'light' and 'dark' themes
    const toggleTheme = React.useCallback(() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, []);

    const value = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// --- STEP 3: Consume the Context (The Child Component) ---
const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <div className={`p-8 rounded-2xl shadow-xl transition-all duration-500 ${
            theme === "light"
                ? "bg-white border border-gray-200"
                : "bg-gray-800 border border-gray-700"
        }`}>
            <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    theme === "light" ? "bg-blue-100" : "bg-gray-700"
                }`}>
                    {theme === "light" ? (
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                    ) : (
                        <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                        </svg>
                    )}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                }`}>
                    Current Theme
                </h2>
                <p className={`text-lg font-semibold capitalize ${
                    theme === "light" ? "text-blue-600" : "text-purple-400"
                }`}>
                    {theme} Mode
                </p>
            </div>

            <button
                onClick={toggleTheme}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    theme === "light"
                        ? "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        : "bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                }`}
            >
                <div className="flex items-center justify-center">
                    <svg className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                        theme === "light" ? "rotate-0" : "rotate-180"
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </div>
            </button>
        </div>
    );
};

export default Header;
export { ThemeContext };