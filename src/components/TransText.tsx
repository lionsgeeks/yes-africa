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

  const allowedLanguages = ["ar", "fr", "en", "sw", "pr"];

  if (!allowedLanguages.includes(selectedLanguage)) {
    throw new Error(
      `Invalid language: ${selectedLanguage}. Supported languages are: ${allowedLanguages.join(
        ", "
      )}`
    );
  }

  const text = props[selectedLanguage] ? props[selectedLanguage] : props["en"];

  return (
    <span dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br />") }} />
  );
};

export default TransText;
