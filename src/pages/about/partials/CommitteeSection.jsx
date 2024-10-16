import { TransText } from "../../../components";
import { useAppContext } from "../../../context/AppContext";

import diop from "../../../assets/images/comittee-scientifique/DIOP.jpg";
import benelfadil from "../../../assets/images/comittee-scientifique/BENELAFDIL.jpg";
import boujanoui from "../../../assets/images/comittee-scientifique/BOUJANOUI.jpg";
import boutzil from "../../../assets/images/comittee-scientifique/BOUTZIL.jpg";
import diedhiou from "../../../assets/images/comittee-scientifique/DIEDHIOU.webp";
import mbassi from "../../../assets/images/comittee-scientifique/Mbassi.jpg";
import santos from "../../../assets/images/comittee-scientifique/SANTOS.jpg";

export const CommitteeSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <section
        className={`bg-muted-background mt-12 px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${selectedLanguage == "ar" && "text-end"
          }`}
      >
        <h2 className="text-xl text-alpha font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
          <TransText en="The Scientific Committee" ar="اللجنة العلمية" />
        </h2>
        <div>
          <p className="text-lg">
            <TransText
              en="The scientific committee of Y.E.S Africa, primarily comprised of African experts in youth empowerment and impact financing, is tasked with the following responsibilities:"
              ar="اللجنة العلمية لـ Y.E.S Africa، التي تتكون أساسًا من خبراء أفارقة في تمكين الشباب وتمويل الأثر، مُكلفة بالمسؤوليات التالية:"
            />
          </p>
          <ul className={`${selectedLanguage == 'ar' ? '' : 'list-disc'}`}>
            <li className="my-1">
              <TransText
                en="Defining the intervention themes and selecting the speakers;"
                ar="تحديد موضوعات التدخل واختيار المتحدثين؛"
              />
            </li>
            <li className="my-1">
              <TransText
                en="Developing the application model for African stakeholders;"
                ar="تطوير نموذج التطبيق للجهات المعنية الأفريقية؛"
              />
            </li>
            <li className="my-1">
              <TransText
                en="Identifying the African empowerment actors who could present their projects to funders."
                ar="تحديد الفاعلين في تمكين الشباب الأفارقة الذين يمكنهم عرض مشاريعهم على الممولين."
              />
            </li>
          </ul>

        </div>
        <div
          className={`flex flex-wrap gap-4 mt-4 md:gap-6 lg:gap-12 ${selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
            }`}
        >
          {[
            {
              name: "M. Jean Pierre ELONG MBASSI",
              job: { en: "Secrétaire Général des Cités et Gouvernements Locaux d'Afrique - Président du Comité Scientifique", ar: "الذكاء الاصطناعي" },
              image: mbassi,
              linkedin: "https://www.linkedin.com/in/jean-pierre-elong-mbassi-9b2b3ab9",
            },
            {
              name: "M. Hamid BEN ELAFDIL",
              job: { en: "Révélateur de Talents et de Startups & Entrepreneur Social & Président de Jadara Foundation", ar: "الحوسبة الكمومية" },
              image: benelfadil,
              linkedin: "https://www.linkedin.com/in/hamidbenelafdil",

            },
            {
              name: "M. Cheikh MAMINA DIEDHIOU",
              job: { en: "Responsable Principal ESG - AFRICA 50", ar: "علم المواد" },
              image: diedhiou,
              linkedin: "https://www.linkedin.com/in/cheikh-mamina-diedhiou-14b2931a",

            },
            {
              name: "Mme. Ileana SANTOS",
              job: { en: "Consultante en stratégie et Co-fondatrice de Je M’engage pour l’Afrique", ar: "علم المواد" },
              image: santos,
              linkedin: "https://www.linkedin.com/in/ileana-santos-243b31108",

            },
            {
              name: "M. Abdou SOULEYE DIOP",
              job: { en: "Managing Partner - FORVIS MAZARS", ar: "علم المواد" },
              image: diop,
              linkedin: "https://www.linkedin.com/in/abdoudiop",

            },
            {
              name: "Mme Hasnaâ BOUTZIL",
              job: { en: "Conférencière, formatrice, modératrice, coach, conseillère en stratégie et développement", ar: "علم المواد" },
              image: boutzil,
              linkedin: "https://www.linkedin.com/in/hasna%C3%A2-boutzil-9787ab24",

            },
            {
              name: "Mme Khadija BOUJANOUI",
              job: { en: "Directrice du Pôle Support de 2M, Présidente du Comité Parité et Diversité - Présidente de Lions Geek", ar: "علم المواد" },
              image: boujanoui,
              linkedin: "https://www.linkedin.com/in/khadija-boujanoui",

            },

          ].map(({ name, job, image }, index) => (
            <div
              key={index}
              className="flex items-center flex-col w-full md:w-[calc(calc(100%-calc(2*3rem))/3)] lg:w-[calc(calc(100%-calc(4*3rem))/5)]"
            >
              <img
                loading="lazy"
                className="mb-3 aspect-square object-cover w-1/2 border rounded-full"
                src={image}
                alt={`${name}'s image`}
              />
              <h2 className="text-base capitalize font-medium tracking-tighter md:text-lg lg:text-xl/none text-center">
                {name}
              </h2>
              <p className="text-muted-foreground text-sm/relaxed text-balance lg:text-base/snug text-center mt-3">
                <TransText {...job} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

{/* {
              name: "M. Jean Yves BARBA",
              job: { en: "Conseiller Technique - Organisation International du Travail (OIT/ILO)", ar: "علم المواد" },
              image: boujanoui,
              linkedin: "https://www.linkedin.com/in/khadija-boujanoui",

            }, */}