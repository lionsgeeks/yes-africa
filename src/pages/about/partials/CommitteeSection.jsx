import { TransText } from "../../../components";
import { Imgs } from "../../../constants";
import { useAppContext } from "../../../context/AppContext";

export const CommitteeSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <section
        className={`bg-muted-background px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${
          selectedLanguage == "ar" && "text-end"
        }`}
      >
        <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
          <TransText en="The Scientific Committee" ar="اللجنة العلمية" />
        </h2>
        <div
          className={`flex flex-wrap gap-4 md:gap-6 lg:gap-12 ${
            selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {[
            {
              name: "Dr. Rachel Lim",
              job: { en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" },
              image: "Thebe-Ikalafeng.jpg",
            },
            {
              name: "Prof. Jian Park",
              job: { en: "Quantum Computing", ar: "الحوسبة الكمومية" },
              image: "Toba-Tanama.jpg",
            },
            {
              name: "Dr. Ty Heath",
              job: { en: "Materials Science", ar: "علم المواد" },
              image: "Ty-Heath.jpg",
            },
          ].map(({ name, job, image }, index) => (
            <div
              key={index}
              className="flex items-center flex-col w-full md:w-[calc(calc(100%-calc(2*3rem))/3)] lg:w-[calc(calc(100%-calc(4*3rem))/5)]"
            >
              <img
                className="mb-3 aspect-square object-cover w-1/2 border rounded-full"
                src={Imgs.getImageUrl(image, "comittee-scientifique")}
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
