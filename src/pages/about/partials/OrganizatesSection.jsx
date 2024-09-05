import { TransText } from "../../../components";
import { Imgs } from "../../../constants";
import { useAppContext } from "../../../context/AppContext";

export const OrganizatesSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <section
        className={`px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${
          selectedLanguage == "ar" && "text-end"
        }`}
      >
        <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
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
              image: "Desire-Koussawo.jpg",
            },
            {
              name: "Dr. Kaoutar El Maghraoui",
              job: { en: "Co-founder", ar: "الشريك المؤسس" },
              image: "Dr.-Kaoutar-El-Maghraoui.png",
            },
            {
              name: "Dr. Kaoutar El Maghraoui",
              job: { en: "Co-founder", ar: "الشريك المؤسس" },
              image: "Dr.-Kaoutar-El-Maghraoui.png",
            },
            {
              name: "Kahi Lumumba",
              job: { en: "Executive Director", ar: "المدير التنفيذي" },
              image: "Kahi-Lumumba.png",
            },
            {
              name: "Osamede UWUBANMWEN",
              job: { en: "Program Manager", ar: "مدير البرنامج" },
              image: "Osamede-UWUBANMWEN.jpg",
            },
            {
              name: "Oscar Pierre",
              job: { en: "Program Manager", ar: "مدير البرنامج" },
              image: "Oscar-Pierre.jpg",
            },
          ].map(({ image, job, name }, index) => (
            <div
              key={index}
              className="flex flex-col w-full md:w-[calc(calc(100%-calc(2*1.5rem))/3)] lg:w-[calc(calc(100%-calc(4*3rem))/5)]"
            >
              <img
                className="mb-3 aspect-[1/1.25] object-cover border rounded"
                src={Imgs.getImageUrl(image, "organizates")}
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
