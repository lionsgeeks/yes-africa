import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import africa1 from "../assets/images/africa1.jpg";
import africa2 from "../assets/images/africa2.jpg";
import africa3 from "../assets/images/africa3.jpg";
import africa4 from "../assets/images/africa4.jpg";
import africa5 from "../assets/images/africa5.jpg";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const path = useLocation();
  const [articles, setArticles] = useState();
  const url = "https://managment.youthempowermentsummit.africa/";
  const IMAGEURL = "https://managment.youthempowermentsummit.africa/storage/images/"

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticles = async () => {
      try {
        const response = await fetch(url + "/api/articles/");
        const articles = await response.json(); 

        setArticles(articles.data);
      } catch (error) {
        console.log("error fetching articles", error)
      }
    }

    fetchArticles()
  }, [path]);

  const savedSelectedLanguage = localStorage.getItem("selectedLanguage");
  const [selectedLanguage, setSelectedLanguage] = useState(
    savedSelectedLanguage ?? "en"
  );

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage ?? "en");
  }, [selectedLanguage]);


  return (
    <>
      <AppContext.Provider
        value={{ articles, selectedLanguage, setSelectedLanguage, url, IMAGEURL }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
