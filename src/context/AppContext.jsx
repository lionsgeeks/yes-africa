import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import africa1 from "../assets/images/africa1.jpg";
import africa2 from "../assets/images/africa2.jpg";
import africa3 from "../assets/images/africa3.jpg";
import africa4 from "../assets/images/africa4.jpg";
import africa5 from "../assets/images/africa5.jpg";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const path = useLocation();
  const [articles, setArticles] = useState();
  const url = "https://management.youthempowermentsummit.africa";
  const IMAGEURL = "https://management.youthempowermentsummit.africa/storage/images/"
  // const url = "http://172.28.0.109:8002";
  // const IMAGEURL = "http://172.28.0.109:8000/storage/images/"

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticles = async () => {
      try {
        const response = await axios.get(url + "/api/articles");
        // const articles = await response; 
        // console.log(response.data.data);

        setArticles(response?.data.data);
      } catch (error) {
        window.location.href = "https://management.youthempowermentsummit.africa?redirect=true";
        console.log("Error fetching articles", error);
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
