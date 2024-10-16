import { TransText } from "../../../components";
import { useAppContext } from "../../../context/AppContext";

import ucgc from "../../../assets/images/sponsors/ucgc.jpg";
import lionsgeek from "../../../assets/images/sponsors/lionsgeek.png";
import jadara from "../../../assets/images/sponsors/Jadaralogo.png";
import smala from "../../../assets/images/sponsors/happylogo.webp";

export const OrganizatesSection = () => {
  const { selectedLanguage } = useAppContext();

  const organizers = [
    {
      logo: smala,
      title: "Happy S'mala",
      text: <TransText
        en="Happy S’mala is an innovation lab specialized in collaborative finance that experiments with new approaches to create high-impact innovation. Since 2014, Happy S’mala has been supporting public, private, and third-sector organizations in the design, deployment, and evaluation of innovative programs. It collaborates with stakeholders from the startup ecosystems, particularly in emerging countries, through strategic studies, coaching, monitoring, and project leader training. Happy S’mala supports the design and evaluation of technological projects focused on civic engagement (Civictech), education (Edtech), and financial inclusion (Fintech). The team consists of serial entrepreneurs with experience in innovation, finance, technology, education, and international cooperation. Happy S’mala leverages its experience in Europe, Africa, and North America to support strategic thinking and project implementation."
        ar="هابي سماﻻ هو مختبر ابتكار متخصص في التمويل التشاركي، يختبر أساليب جديدة لخلق الابتكار ذو التأثير الكبير. منذ عام 2014، تدعم هابي سماﻻ المنظمات العامة والخاصة ومنظمات القطاع الثالث في تصميم ونشر وتقييم البرامج المبتكرة. تتعاون مع الجهات الفاعلة في نظم الشركات الناشئة، لا سيما في البلدان النامية، من خلال الدراسات الاستراتيجية، والتوجيه، والمتابعة، وتدريب القادة في المشاريع. تدعم هابي سماﻻ تصميم وتقييم المشاريع التكنولوجية المرتبطة بالمشاركة المدنية (Civictech)، والتعليم (Edtech)، والشمول المالي (Fintech). يتكون الفريق من رواد أعمال متسلسلين ذوي خبرة في مجالات الابتكار، والمالية، والتكنولوجيا، والتعليم، والتعاون الدولي. هابي سماﻻ تقدم خبرتها في أوروبا وأفريقيا وأمريكا الشمالية لدعم التفكير الاستراتيجي وتنفيذ المشاريع."
      />
    },
    {
      logo: jadara,
      title: "Jadara Foundation",
      text: <TransText
        en="Ex-Fondation Marocaine de l'Étudiant is a Moroccan non-profit association recognized as serving the public good, created in 2002. Its mission is to allow every young person to choose and build their future with confidence and ambition, without being subjected to social, territorial, disability, or gender determinism. Every year, we search for, mobilize, and identify young people to inspire, guide, support them financially, provide them with a mentor, and develop their transversal skills. To achieve this, we deploy social ascent programs supported by educational partners, impact-driven companies, committed volunteers, and donors who are sensitive to our cause. The Foundation, with over two decades of experience, has developed a robust model that positions it today as a key player in the third sector. This long journey has been marked by impact and sustainable successes, allowing the Foundation to consolidate its reputation as a catalyst for social ascent in Morocco. Today, as a reliable third-sector actor, the Foundation continues to work with determination to contribute to significant and lasting changes, further strengthening its position as a trusted partner and engine for social progress that has transformed the lives of over 2,750 young people in Morocco."
        ar="منظمة سابقة باسم مؤسسة الطالب المغربي، هي جمعية مغربية غير ربحية معترف بها كمؤسسة ذات منفعة عامة، تأسست في عام 2002. مهمتها هي تمكين كل شاب من اختيار وبناء مستقبله بثقة وطموح، دون أن يكون خاضعًا للتحديدات الاجتماعية أو الجغرافية أو الإعاقة أو الجنس. كل عام، نبحث عن شباب، ونجمعهم، ونعرفهم لنبث فيهم الإلهام، ونوجههم، وندعمهم ماليًا، ونوفر لهم مرشدًا، ونعمل على تطوير مهاراتهم العابرة للتخصصات. لتحقيق ذلك، نشرع في تنفيذ برامج للارتقاء الاجتماعي بدعم من شركاء تربويين، وشركات تسعى لتحقيق التأثير، ومتطوعين ملتزمين، ومانحين مهتمين بقضيتنا. على مدار أكثر من عقدين من الخبرة، وضعت المؤسسة نموذجًا قويًا جعلها اليوم لاعبًا رئيسيًا في القطاع الثالث. لقد تميزت هذه المسيرة الطويلة بتأثيرها ونجاحاتها المستدامة، مما ساعد المؤسسة على تعزيز سمعتها كحافز للارتقاء الاجتماعي في المغرب. اليوم، بصفتها لاعبًا موثوقًا في القطاع الثالث، تواصل المؤسسة عملها بإصرار للمساهمة في إحداث تغييرات هامة ودائمة، مما يعزز مكانتها كشريك موثوق ومحرّك للتقدم الاجتماعي الذي غيّر حياة أكثر من 2750 شابًا في المغرب."
      />
    },
    {
      logo: lionsgeek,
      title: "LionsGeek",
      text: <TransText
        en="LionsGeek is the result of a partnership between 2M, MolenGeek, Charlewood, the Belgian Radio and Television RTBF; as well as the Ministry of Economic Inclusion, Small Business, Employment, and Skills, the Wallonia-Brussels Region, through the General Delegation of Wallonia-Brussels in Morocco, and the Association for the Promotion of Education and Training Abroad (APEFE). It is an association focused on an inclusive action in favor of young people in NEET (Not in Education, Employment, or Training) situations. LionsGeek offers diverse support tailored to the needs of each individual, centered around three main areas of intervention: a full-time training program, an incubator for project holders, and a coworking space.  LionsGeek aims to meet the various expectations of young people and the job market through long-term training, short courses, and certification programs in multimedia and digital fields."
        ar="LionsGeek هو ثمرة شراكة بين 2M، MolenGeek، Charlewood، وإذاعة التلفزيون البلجيكي RTBF؛ بالإضافة إلى وزارة الإدماج الاقتصادي، والمشاريع الصغيرة، والتوظيف، والمهارات، ومنطقة والونيا بروكسل، من خلال الوفد العام لوالونيا-بروكسل في المغرب، والجمعية من أجل تعزيز التعليم والتكوين في الخارج (APEFE). هي جمعية موجهة نحو العمل الشامل لصالح الشباب في وضع NEET (ليس في التعليم، أو العمل، أو التدريب). يقدم LionsGeek دعمًا متنوعًا ومناسبًا لاحتياجات كل فرد، مع التركيز على ثلاث محاور رئيسية: برنامج تدريب بدوام كامل، حاضنة لحاملي المشاريع، ومساحة للعمل المشترك. يهدف LionsGeek إلى تلبية مختلف توقعات الشباب وسوق العمل من خلال برامج تدريبية طويلة، ودورات قصيرة، وبرامج تدريب معتمدة في مجالات الوسائط المتعددة والرقمنة."
      />
    },
    {
      logo: ucgc,
      title: "CGLU Afrique",
      text: <TransText
        en="CGLU Africa is the umbrella organization and unified representative voice of local governments in Africa. It was founded in 2005 in Tshwane, South Africa, following the unification of three continental groups of local governments: the African Union of Local Authorities (AULA); the Union of African Cities (UVA); and the African Chapter of the Uniao dos Ciudades y Capitais Lusofonas Africana (UCCL AFRICA). Established as the African section of the global organization UCLG (United Cities and Local Governments), CGLU Africa now includes 44 national associations of local governments from all regions of Africa, as well as 2,000 cities with populations of over 100,000. In this capacity, the organization represents nearly 350 million African citizens. Its headquarters is located in Rabat, where it enjoys a..."
        ar="CGLU إفريقيا هي المنظمة الأم وتمثل الصوت الموحد والتمثيلي للحكومات المحلية في إفريقيا. تأسست في عام 2005 في مدينة تسواني بجنوب إفريقيا، بعد توحيد ثلاث مجموعات قارية من الحكومات المحلية: الاتحاد الإفريقي للسلطات المحلية (AULA)؛ اتحاد المدن الإفريقية (UVA)؛ والفصل الإفريقي لمنظمة Uniao dos Ciudades y Capitais Lusofonas Africana (UCCL AFRICA). تأسست كفرع إفريقي للمنظمة العالمية CGLU (المدن والحكومات المحلية المتحدة)، ويضم CGLU إفريقيا الآن 44 جمعية وطنية للحكومات المحلية من جميع مناطق إفريقيا، بالإضافة إلى 2000 مدينة يزيد عدد سكانها عن 100,000 نسمة. وبهذا الصدد، تمثل المنظمة ما يقرب من 350 مليون مواطن إفريقي. يقع مقرها الرئيسي في مدينة الرباط حيث تتمتع..."
      />

    }
   
  ]
  return (
    <>
      <section
        className={` lg:py-12 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${selectedLanguage == "ar" && "text-end"
          }` }
      >
        <h2 className="text-xl text-alpha font-medium tracking-tighter md:text-2xl lg:text-3xl/none  px-2 md:px-3 lg:px-4 py-4 md:py-5">
          <TransText en="The Organizers" ar="منظمون" />
        </h2>
        <div>
          {
            organizers.map((org, ind) => (
              <div key={ind} className={` px-6 md:px-10 lg:px-14 py-14 md:py-16 my-8 flex justify-between items-start gap-6 flex-col ${ind % 2 == 0 ? 'lg:flex-row bg-muted-background' : 'lg:flex-row-reverse bg-white'}`}>
                <div className={`flex items-center justify-center  md:bg-transparent w-full lg:w-[40%] sticky top-[75px] ${ind % 2 == 0 ? 'bg-muted-background' : 'bg-white'}`}>
                  <img src={org.logo} alt="" className={` ${org.logo == ucgc ? 'w-[210px]' : 'w-[120px] lg:w-[180px]'}`}/>
                </div>

                <div className="w-full lg:w-[50%] text-lg leading-7"><span className="font-bold text-xl">{org.title}: </span>
                  <p>
                    {org.text}
                  </p>
                </div>
              </div>
            ))
          }
        </div>

      </section>
    </>
  );
};
