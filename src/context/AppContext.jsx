import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const path = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const savedSelectedLanguage = localStorage.getItem("selectedLanguage");
  const [selectedLanguage, setSelectedLanguage] = useState(savedSelectedLanguage ?? "en");

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage ?? "en");
  }, [selectedLanguage]);

  return (
    <>
      <AppContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
