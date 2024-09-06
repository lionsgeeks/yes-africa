import { TransText } from "../../../components";
import { useAppContext } from "../../../context/AppContext";

export const AboutSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <div
        className={`w-full h-[50vh]  relative -z-20 text-white lg:px-16 flex flex-col justify-center gap-3 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/africa2.jpg')] ${
          selectedLanguage == "ar" ? "text-right items-end" : ""
        }`}
      >
        <div className="inset-0 absolute bg-gradient-to-r from-black via-[#53450ab5] via-50%  to-alpha opacity-85 -z-10"></div>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl/none">
          <TransText en="In-Depth Knowledge, Expert" ar="معارف عميقة وتحليلات متخصصة" />
        </h1>
        <p className="lg:text-2xl text-2xl lg:w-[62.5%] ">
          <TransText
            ar="اكتشف عالمًا جديدًا من المعرفة والتحليل. انغمس في قصصنا الملهمة والرؤى القيمة"
            en="Discover a new world of knowledge and analysis. Immerse yourself in our inspiring stories and valuable insights."
          />
        </p>
      </div>
      <section
        className={`px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${
          selectedLanguage == "ar" && "text-end"
        }`}
      >
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none">
          <TransText en="About Us" ar="حولنا" />
        </h1>

        <div
          className={`flex flex-col gap-4 md:gap-6 lg:gap-12 ${
            selectedLanguage == "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          <div className="gap-2 flex flex-col">
            <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
              <TransText en="Our Mission" ar="مهمتنا" />
            </h2>
            <p className="text-muted-foreground md:text-base/relaxed lg:text-lg/snug">
              <TransText
                en="Our mission is to bring together the brightest minds in the field of science and technology to drive innovation and progress. We are committed to fostering a collaborative environment where ideas can flourish and solutions can be found to the world's most pressing challenges."
                ar="مهمتنا هي جمع أذكى العقول في مجال العلوم والتكنولوجيا لدفع الابتكار والتقدم. نحن ملتزمون بتعزيز بيئة تعاونية حيث يمكن للأفكار أن تزدهر ويمكن العثور على حلول للتحديات الأكثر إلحاحًا في العالم"
              />
            </p>
          </div>

          <div className="gap-2 flex flex-col">
            <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
              <TransText en="Our vision" ar="رؤيتنا" />
            </h2>
            <p className="text-muted-foreground md:text-base/relaxed lg:text-lg/snug">
              <TransText
                en="Our vision is to be a leading hub for scientific and technological advancement, where the most innovative thinkers and doers come together to push the boundaries of what's possible. We aim to inspire and empower the next generation of scientists, engineers, and entrepreneurs to create a better future for all."
                ar="مهمتنا هي جمع أذكى العقول في مجال العلوم والتكنولوجيا لدفع الابتكار والتقدم. نحن ملتزمون بتعزيز بيئة تعاونية حيث يمكن للأفكار أن تزدهر ويمكن العثور على حلول للتحديات الأكثر إلحاحًا في العالم"
              />
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
