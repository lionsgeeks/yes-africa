import { TransText } from "../../../components";
import { useAppContext } from "../../../context/AppContext";

export const AboutSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <div
        className={`w-full h-[50vh] bg-muted-background  relative -z-20 text-white lg:px-16 flex flex-col justify-center gap-3 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/africa2.jpg')] ${selectedLanguage == "ar" ? "text-right items-end" : ""
          }`}
      >
        <div className="inset-0 absolute bg-gradient-to-r from-black via-[#53450ab5] via-50%  to-alpha opacity-85 -z-10"></div>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl/none">
          <TransText
            en="Youth Empowerment Summit Africa"
            ar="قمة تمكين الشباب في أفريقيا"
            fr="Sommet de l'Autonomisation des Jeunes en Afrique" />
        </h1>
        <p className="lg:text-2xl text-2xl lg:w-[62.5%] ">
          <TransText
            ar="من 70 مليون شاب أفريقي خارج التعليم أو العمل إلى 70 مليون صانع"
            en="From 70 Million African NEETs to 70 Million Doers"
            fr="De 70 Millions de NEETs Africains à 70 Millions de Faiseurs"
          />

        </p>
      </div>
      <section
        className={`px-8 md:px-12 bg-muted-background lg:px-16 py-16 md:py-20 lg:py-10 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${selectedLanguage == "ar" && "text-end"
          }`}
      >
        <h1 className="text-3xl text-alpha font-bold tracking-tighter md:text-5xl lg:text-6xl/none">
          <TransText en="About Us" ar="حولنا" fr="À propos de nous" />
        </h1>

        <div
          className={`flex flex-wrap gap-4 md:gap-6 lg:gap-12 ${selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
            }`}
        >
          <div className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
            <h2 className="text-xl text-beta font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
              <TransText en="Our Mission" ar="مهمتنا" fr="Notre mission" />
            </h2>
            <p className="text-muted-foreground md:text-base/relaxed lg:text-lg/snug">
              <TransText
                en="Jadara's mission is to empower underserved youth by providing them with the skills, resources, and opportunities necessary to build a brighter future. We are dedicated to fostering an inclusive environment where young individuals can thrive, regardless of their social, economic, or geographical backgrounds. By promoting education, skill development, and entrepreneurship, Jadara aims to break the cycle of poverty and create pathways to success for young people."
                ar="مهمة جدارة هي تمكين الشباب المحرومين من خلال تزويدهم بالمهارات والموارد والفرص اللازمة لبناء مستقبل مشرق. نحن ملتزمون بتعزيز بيئة شاملة يمكن أن يزدهر فيها الشباب، بغض النظر عن خلفياتهم الاجتماعية أو الاقتصادية أو الجغرافية. من خلال تعزيز التعليم وتطوير المهارات وريادة الأعمال، تهدف جدارة إلى كسر حلقة الفقر وخلق طرق للنجاح للشباب"
                fr="La mission de Jadara est d'autonomiser les jeunes défavorisés en leur fournissant les compétences, les ressources et les opportunités nécessaires pour construire un avenir meilleur. Nous sommes déterminés à promouvoir un environnement inclusif où les jeunes peuvent prospérer, indépendamment de leurs origines sociales, économiques ou géographiques. En favorisant l'éducation, le développement des compétences et l'entrepreneuriat, Jadara vise à briser le cycle de la pauvreté et à créer des voies vers le succès pour les jeunes."
              />

            </p>
          </div>

          <div className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
            <h2 className="text-xl text-beta font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
              <TransText en="Our vision" ar="رؤيتنا" fr="Notre vision" />
            </h2>
            <p className="text-muted-foreground md:text-base/relaxed lg:text-lg/snug">
              <TransText
                en="Our vision is to be a leading force in transforming the lives of young people across the region, enabling them to become active contributors to their communities and the global economy. We strive to inspire and cultivate the next generation of leaders, innovators, and changemakers who will drive social progress and development."
                ar="رؤيتنا هي أن نكون قوة رائدة في تحويل حياة الشباب في المنطقة، وتمكينهم من أن يصبحوا مساهمين نشطين في مجتمعاتهم والاقتصاد العالمي. نحن نسعى لإلهام وتنمية الجيل القادم من القادة والمبتكرين وصانعي التغيير الذين سيدفعون عجلة التقدم الاجتماعي والتنمية"
                fr="Notre vision est d'être une force de premier plan dans la transformation des vies des jeunes de la région, leur permettant de devenir des contributeurs actifs à leurs communautés et à l'économie mondiale. Nous nous efforçons d'inspirer et de cultiver la prochaine génération de leaders, d'innovateurs et de créateurs de changement qui propulseront le progrès social et le développement."
              />

            </p>
          </div>

          <div className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
            <h2 className="text-xl text-beta font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
              <TransText en="Our Approach" ar="نهجنا" fr="Notre approche" />
            </h2>
            <p className="text-muted-foreground md:text-base/relaxed lg:text-lg/snug">
              <TransText
                en="Since our inception in 2002, Jadara has focused on creating impactful programs and initiatives that address the specific needs of young people. We engage with local communities, educational institutions, and partners to develop tailored solutions that empower youth and promote sustainable development. Through our various programs, we aim to inspire confidence, resilience, and a sense of purpose among the youth we serve."
                ar="منذ تأسيسنا في عام 2002، ركزت جدارة على إنشاء برامج ومبادرات مؤثرة تعالج الاحتياجات المحددة للشباب. نحن نتواصل مع المجتمعات المحلية والمؤسسات التعليمية والشركاء لتطوير حلول مخصصة تمكّن الشباب وتعزز التنمية المستدامة. من خلال برامجنا المتنوعة، نهدف إلى إلهام الثقة والمرونة وإحساس بالهدف لدى الشباب الذين نخدمهم"
                fr="Depuis notre création en 2002, Jadara se concentre sur la création de programmes et d'initiatives impactants qui répondent aux besoins spécifiques des jeunes. Nous collaborons avec les communautés locales, les institutions éducatives et les partenaires pour développer des solutions sur mesure qui autonomisent les jeunes et favorisent le développement durable. À travers nos différents programmes, nous visons à inspirer la confiance, la résilience et un sens de l'objectif chez les jeunes que nous servons."
              />

            </p>
          </div>
        </div>
      </section>
    </>
  );
};
