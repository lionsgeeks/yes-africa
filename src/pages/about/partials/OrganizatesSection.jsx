import { TransText } from "../../../components";
import { useAppContext } from "../../../context/AppContext";

import african1 from "../../../assets/images/organizates/Desire-Koussawo.jpg";
import african2 from "../../../assets/images/organizates/Dr.-Kaoutar-El-Maghraoui.png";
import african3 from "../../../assets/images/organizates/Kahi-Lumumba.png";
import african4 from "../../../assets/images/organizates/Osamede-UWUBANMWEN.jpg";
import african5 from "../../../assets/images/organizates/Oscar-Pierre.jpg";

export const OrganizatesSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <section
        className={`px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${
          selectedLanguage == "ar" && "text-end"
        }`}
      >
        <h2 className="text-xl text-alpha font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
          <TransText en="The Organizers" ar="منظمون" />
        </h2>
        <div
          className={`flex flex-wrap gap-4 md:gap-6 lg:gap-12 ${
            selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {[
            {
              name: "Desire Koussawo",
              job: { en: "Co-founder", ar: "الشريك المؤسس" },
              image: african1,
            },
            {
              name: "Dr. Kaoutar El Maghraoui",
              job: { en: "Co-founder", ar: "الشريك المؤسس" },
              image: african2,
            },
            {
              name: "Kahi Lumumba",
              job: { en: "Executive Director", ar: "المدير التنفيذي" },
              image: african3,
            },
            {
              name: "Osamede UWUBANMWEN",
              job: { en: "Program Manager", ar: "مدير البرنامج" },
              image: african4,
            },
            {
              name: "Oscar Pierre",
              job: { en: "Program Manager", ar: "مدير البرنامج" },
              image: african5,
            },
          ].map(({ image, job, name }, index) => (
            <div
              key={index}
              className="flex flex-col w-full md:w-[calc(calc(100%-calc(2*1.5rem))/3)] lg:w-[calc(calc(100%-calc(4*3rem))/5)]"
            >
              <img
                loading="lazy"
                className="mb-3 aspect-[1/1.25] object-cover border rounded"
                src={image}
                alt={`${name}'s image`}
              />
              <h2 className="text-base capitalize font-medium tracking-tighter md:text-lg lg:text-xl/none">
                {name}
              </h2>
              <p className="text-muted-foreground text-sm/relaxed text-balance lg:text-base/snug">
                <TransText {...job} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
