import { useAppContext } from "../../context/AppContext";
import Description from "./partials/description";

const Formulaire = () => {
  const { setSelectedLanguage } = useAppContext();
  const formLanguages = [
    { language: "English", code: "en" },
    { language: "Français", code: "fr" },
    { language: "Portugais", code: "pr" },
    { language: "Arabic", code: "ar" },
    { language: "Swahili", code: "sw" },
  ];
  return (
    <>
      <div className="flex gap-3 items-center p-3 bg-gray-300">
        {formLanguages.map(({ language, code }, index) => (
          <button
            onClick={() => setSelectedLanguage(code)}
            className="bg-white py-2 w-[20%] rounded font-medium hover:bg-alpha hover:text-white"
          >
            {language}
          </button>
        ))}
      </div>
      <Description />
    </>
  );
};

export default Formulaire;
