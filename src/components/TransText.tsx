import React, { useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";

interface TextProps {
  ar: string;
  fr: string;
  en: string;
  sw?: string;
  pr?: string;
}

const TransText: React.FC<TextProps> = (props) => {
  const { selectedLanguage } = useAppContext();
  const prevCountRef = useRef(null);
  useEffect(() => {
    /**
     * assign the latest render value of count to the ref
     * However, assigning a value to ref doesn't re-render the app
     * So, prevCountRef.current in the return statement displays the
     * last value in the ref at the time of render i.e., the previous state value.
     */
    prevCountRef.current = selectedLanguage;
  }, [selectedLanguage]);

  const allowedLanguages = ["ar", "fr", "en","sw",'pr'];

  if (!allowedLanguages.includes(selectedLanguage)) {
    throw new Error(
      `Invalid language: ${selectedLanguage}. Supported languages are: ${allowedLanguages.join(
        ", "
      )}`
    );
  }

  return props[selectedLanguage] ? props[selectedLanguage] : props["en"];
};

export default TransText;
