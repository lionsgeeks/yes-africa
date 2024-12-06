import React from 'react';
import { TransText } from '../../components';
import { useAppContext } from '../../context/AppContext';
import Ngosparticipate from './partials/Ngosparticipate';

export const SponsorsForm = () => {
    const { selectedLanguage, setSelectedLanguage } = useAppContext();
    const formLanguages = [
        { language: "English", code: "en" },
        { language: "Français", code: "fr" },
        { language: "Português", code: "pr" },
        { language: "العربية", code: "ar" },
        { language: "Swahili", code: "sw" },
    ]
    return (
        <>
            <div className="flex gap-3 items-center px-8 py-3 bg-gray-200">
                {formLanguages.map(({ language, code }, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedLanguage(code)}
                        className={`py-2 w-[20%] rounded font-medium hover:bg-alpha hover:text-white ${selectedLanguage === code ? "bg-alpha text-white" : "bg-white"
                            }`}
                    >
                        {language}
                    </button>
                ))}
            </div>
            <Ngosparticipate/>
            
        </>
    );
};

