import { TransText } from "../../../components";
import { useAppContext } from "../../../context/AppContext";

import ucgc from "../../../assets/images/sponsors/ucgc.jpg";
import lionsgeek from "../../../assets/images/sponsors/lionsgeek.png";
import jadara from "../../../assets/images/sponsors/Jadaralogo.png";
import epic from "../../../assets/images/sponsors/epic-afric.jpg";
import pan from "../../../assets/images/sponsors/pan.jpeg";
// import smala from "../../../assets/images/sponsors/";

export const OrganizatesSection = () => {
  const { selectedLanguage } = useAppContext();

  const organizers = [
    {
      logo: jadara,
      title: "Fondation Jadara",
      text: (
        <TransText
          en="Ex-Fondation Marocaine de l'Étudiant is a Moroccan non-profit association recognized as serving the public good, created in 2002. Its mission is to allow every young person to choose and build their future with confidence and ambition, without being subjected to social, territorial, disability, or gender determinism. Every year, we search for, mobilize, and identify young people to inspire, guide, support them financially, provide them with a mentor, and develop their transversal skills. To achieve this, we deploy social ascent programs supported by educational partners, impact-driven companies, committed volunteers, and donors who are sensitive to our cause. The Foundation, with over two decades of experience, has developed a robust model that positions it today as a key player in the third sector. This long journey has been marked by impact and sustainable successes, allowing the Foundation to consolidate its reputation as a catalyst for social ascent in Morocco. Today, as a reliable third-sector actor, the Foundation continues to work with determination to contribute to significant and lasting changes, further strengthening its position as a trusted partner and engine for social progress that has transformed the lives of over 2,750 young people in Morocco."
          ar="منظمة سابقة باسم مؤسسة الطالب المغربي، هي جمعية مغربية غير ربحية معترف بها كمؤسسة ذات منفعة عامة، تأسست في عام 2002. مهمتها هي تمكين كل شاب من اختيار وبناء مستقبله بثقة وطموح، دون أن يكون خاضعًا للتحديدات الاجتماعية أو الجغرافية أو الإعاقة أو الجنس. كل عام، نبحث عن شباب، ونجمعهم، ونعرفهم لنبث فيهم الإلهام، ونوجههم، وندعمهم ماليًا، ونوفر لهم مرشدًا، ونعمل على تطوير مهاراتهم العابرة للتخصصات. لتحقيق ذلك، نشرع في تنفيذ برامج للارتقاء الاجتماعي بدعم من شركاء تربويين، وشركات تسعى لتحقيق التأثير، ومتطوعين ملتزمين، ومانحين مهتمين بقضيتنا. على مدار أكثر من عقدين من الخبرة، وضعت المؤسسة نموذجًا قويًا جعلها اليوم لاعبًا رئيسيًا في القطاع الثالث. لقد تميزت هذه المسيرة الطويلة بتأثيرها ونجاحاتها المستدامة، مما ساعد المؤسسة على تعزيز سمعتها كحافز للارتقاء الاجتماعي في المغرب. اليوم، بصفتها لاعبًا موثوقًا في القطاع الثالث، تواصل المؤسسة عملها بإصرار للمساهمة في إحداث تغييرات هامة ودائمة، مما يعزز مكانتها كشريك موثوق ومحرّك للتقدم الاجتماعي الذي غيّر حياة أكثر من 2750 شابًا في المغرب."
          fr="Ex-Fondation Marocaine de l'Étudiant est une association marocaine à but non lucratif reconnue d’utilité publique, créée en 2002. Sa mission est de permettre à chaque jeune de choisir et de construire son avenir avec confiance et ambition, sans être soumis aux déterminismes sociaux, territoriaux, du handicap ou du genre. Chaque année, nous recherchons, mobilisons et identifions des jeunes pour les inspirer, les guider, les soutenir financièrement, leur fournir un mentor et développer leurs compétences transversales. Pour ce faire, nous déployons des programmes d'ascension sociale soutenus par des partenaires éducatifs, des entreprises à impact, des bénévoles engagés et des donateurs sensibles à notre cause. Forte de plus de vingt ans d'expérience, la Fondation a développé un modèle robuste qui en fait aujourd’hui un acteur clé du secteur tertiaire. Ce long parcours a été marqué par des impacts et des succès durables, permettant à la Fondation de consolider sa réputation de catalyseur de l'ascension sociale au Maroc. Aujourd'hui, en tant qu'acteur fiable du secteur tertiaire, la Fondation continue de travailler avec détermination pour contribuer à des changements significatifs et durables, renforçant ainsi sa position de partenaire de confiance et moteur du progrès social qui a transformé la vie de plus de 2 750 jeunes au Maroc."
        />
      ),
    },
    {
      logo: lionsgeek,
      title: "LionsGeek",
      text: (
        <TransText
          en="LionsGeek is the result of a partnership between 2M, MolenGeek, Charlewood, the Belgian Radio and Television RTBF; as well as the Ministry of Economic Inclusion, Small Business, Employment, and Skills, the Wallonia-Brussels Region, through the General Delegation of Wallonia-Brussels in Morocco, and the Association for the Promotion of Education and Training Abroad (APEFE). It is an association focused on an inclusive action in favor of young people in NEET (Not in Education, Employment, or Training) situations. LionsGeek offers diverse support tailored to the needs of each individual, centered around three main areas of intervention: a full-time training program, an incubator for project holders, and a coworking space.  LionsGeek aims to meet the various expectations of young people and the job market through long-term training, short courses, and certification programs in multimedia and digital fields."
          ar="LionsGeek هو ثمرة شراكة بين 2M، MolenGeek، Charlewood، وإذاعة التلفزيون البلجيكي RTBF؛ بالإضافة إلى وزارة الإدماج الاقتصادي، والمشاريع الصغيرة، والتوظيف، والمهارات، ومنطقة والونيا بروكسل، من خلال الوفد العام لوالونيا-بروكسل في المغرب، والجمعية من أجل تعزيز التعليم والتكوين في الخارج (APEFE). هي جمعية موجهة نحو العمل الشامل لصالح الشباب في وضع NEET (ليس في التعليم، أو العمل، أو التدريب). يقدم LionsGeek دعمًا متنوعًا ومناسبًا لاحتياجات كل فرد، مع التركيز على ثلاث محاور رئيسية: برنامج تدريب بدوام كامل، حاضنة لحاملي المشاريع، ومساحة للعمل المشترك. يهدف LionsGeek إلى تلبية مختلف توقعات الشباب وسوق العمل من خلال برامج تدريبية طويلة، ودورات قصيرة، وبرامج تدريب معتمدة في مجالات الوسائط المتعددة والرقمنة."
          fr="LionsGeek est le résultat d'un partenariat entre 2M, MolenGeek, Charlewood, la Radio et Télévision belge RTBF, ainsi que le Ministère de l'Inclusion économique, des Petites entreprises, de l'Emploi et des Compétences, la Région Wallonie-Bruxelles, à travers la Délégation générale Wallonie-Bruxelles au Maroc, et l'Association pour la Promotion de l'Éducation et de la Formation à l'Étranger (APEFE). Il s'agit d'une association axée sur une action inclusive en faveur des jeunes en situation NEET (Ni en éducation, ni en emploi, ni en formation). LionsGeek offre un soutien diversifié adapté aux besoins de chaque individu, centré sur trois principaux domaines d'intervention : un programme de formation à temps plein, un incubateur pour les porteurs de projets, et un espace de coworking. LionsGeek vise à répondre aux différentes attentes des jeunes et du marché du travail à travers des formations longues, des cours courts et des programmes de certification dans les domaines des médias et du numérique."
        />
      ),
    },
    {
      logo: epic,
      title: "EPIC-Africa",
      text: (
        <TransText
          en="EPIC-Africa is a nonprofit organization dedicated to strengthening African civil society by promoting transparency, accountability, and collaboration. It supports civil society organizations (CSOs) through research, data analysis, and initiatives like the African CSO Platform. EPIC-Africa fosters partnerships to enhance the impact of CSOs in building a better future for Africa. Recognized as a thought leader, the organization has contributed to global discussions on the role of international NGOs and locally-led development. Its intellectual leadership is reflected in its publications, including research reports, articles, book chapters, and interviews."
          ar="EPIC-Africa هي منظمة غير ربحية مكرسة لتعزيز المجتمع المدني الأفريقي من خلال تعزيز الشفافية والمساءلة والتعاون. تدعم المنظمة منظمات المجتمع المدني (OSC) عبر الأبحاث وتحليل البيانات ومبادرات مثل منصة المنظمات المدنية الأفريقية. تعزز EPIC-Africa الشراكات لزيادة تأثير المنظمات المدنية في بناء مستقبل أفضل لأفريقيا.
معروفة كجهة فكرية رائدة، ساهمت المنظمة في مناقشات عالمية حول دور المنظمات الدولية غير الحكومية والتنمية المحلية. يظهر قيادتها الفكرية من خلال منشوراتها، بما في ذلك تقارير الأبحاث والمقالات وفصول الكتب و المقابلات."
          fr="EPIC-Africa est une organisation à but non lucratif dédiée au renforcement de la société civile africaine en promouvant la transparence, la responsabilité et la collaboration. Elle soutient les organisations de la société civile (OSC) à travers la recherche, l'analyse de données et des initiatives telles que la Plateforme des OSC africaines. EPIC-Africa favorise les partenariats pour accroître l'impact des OSC dans la construction d'un avenir meilleur pour l'Afrique. Reconnu comme un leader d'opinion, l'organisation a contribué à des discussions mondiales sur le rôle des ONG internationales et le développement dirigé localement. Son leadership intellectuel se reflète dans ses publications, telles que des rapports de recherche, des articles, des chapitres de livres et des interviews."
        />
      ),
    },
    {
      logo: ucgc,
      title: "CGLU Afrique",
      text: (
        <TransText
          en="CGLU Africa is the umbrella organization and unified representative voice of local governments in Africa. It was founded in 2005 in Tshwane, South Africa, following the unification of three continental groups of local governments: the African Union of Local Authorities (AULA); the Union of African Cities (UVA); and the African Chapter of the Uniao dos Ciudades y Capitais Lusofonas Africana (UCCL AFRICA). Established as the African section of the global organization UCLG (United Cities and Local Governments), CGLU Africa now includes 44 national associations of local governments from all regions of Africa, as well as 2,000 cities with populations of over 100,000. In this capacity, the organization represents nearly 350 million African citizens. Its headquarters is located in Rabat, where it enjoys a..."
          ar="CGLU إفريقيا هي المنظمة الأم وتمثل الصوت الموحد والتمثيلي للحكومات المحلية في إفريقيا. تأسست في عام 2005 في مدينة تسواني بجنوب إفريقيا، بعد توحيد ثلاث مجموعات قارية من الحكومات المحلية: الاتحاد الإفريقي للسلطات المحلية (AULA)؛ اتحاد المدن الإفريقية (UVA)؛ والفصل الإفريقي لمنظمة Uniao dos Ciudades y Capitais Lusofonas Africana (UCCL AFRICA). تأسست كفرع إفريقي للمنظمة العالمية CGLU (المدن والحكومات المحلية المتحدة)، ويضم CGLU إفريقيا الآن 44 جمعية وطنية للحكومات المحلية من جميع مناطق إفريقيا، بالإضافة إلى 2000 مدينة يزيد عدد سكانها عن 100,000 نسمة. وبهذا الصدد، تمثل المنظمة ما يقرب من 350 مليون مواطن إفريقي. يقع مقرها الرئيسي في مدينة الرباط حيث تتمتع..."
          fr="CGLU Afrique est l'organisation parapluie et la voix représentative unifiée des gouvernements locaux en Afrique. Elle a été fondée en 2005 à Tshwane, en Afrique du Sud, suite à l'unification de trois groupes continentaux de gouvernements locaux : l'Union Africaine des Autorités Locales (AULA), l'Union des Villes Africaines (UVA) et le Chapitre Africain de l'Uniao dos Ciudades y Capitais Lusofonas Africana (UCCL AFRICA). Établie en tant que section africaine de l'organisation mondiale CGLU (United Cities and Local Governments), CGLU Afrique regroupe désormais 44 associations nationales de gouvernements locaux de toutes les régions de l'Afrique, ainsi que 2 000 villes de plus de 100 000 habitants. À ce titre, l'organisation représente près de 350 millions de citoyens africains. Son siège est situé à Rabat, où il jouit..."
        />
      ),
    },
    {
      logo: pan,
      title: "Pan-African Youth Center",
      text: (
        <TransText en="The Pan-African Union of Youth was founded under the name of Pan-African Youth Movement on April 26, 1962, in Conakry, Guinea, under the impulse of the heads of state, as a special vehicle intended to mobilize youth for the decolonization of Africa. The movement played a strategic role in mobilizing political support for the independence of African states.
The Pan-African Union of Youth, as a continental coordination institution, does not only bring together national youth councils and equivalent structures across the African continent, but also gathers youth-led and youth-focused civil society organizations, as well as regional platforms of the regional economic commissions. The UPJ also works with ministries of youth and other development partners in African countries.
The Union strives to support and strengthen the values and ideals of the African Union (AU) in promoting unity, peace, democracy, sustainable development, and African integration since 1962, then known as the Pan-African Youth Movement (MPJ).
The current structure of the Pan-African Union of Youth (UPJ) is the result of a deep and rigorous transformation and revitalization of the MPJ, with the main objective of adapting to the evolving challenges faced by youth and those arising from the post-colonial political scene, while keeping in mind the challenges to come."
          fr="L'Union Panafricaine de la Jeunesse a été fondée sous le nom de Mouvement panafricain de la jeunesse le 26 avril 1962 en Guinée Conakry, sous l'impulsion des chefs d'État, en tant que véhicule spécial destiné à mobiliser les jeunes pour la décolonisation de l'Afrique. Le mouvement a joué un rôle stratégique dans la mobilisation du soutien politique en faveur de l'indépendance des États africains.
L'Union panafricaine de la jeunesse, en tant qu'institution de coordination continentale, ne se contente pas de fédérer les conseils nationaux de la jeunesse et les structures équivalentes à travers le continent africain, mais rassemble également les OSC dirigées par des jeunes et centrées sur les jeunes, ainsi que les plateformes régionales des commissions économiques régionales. L'UPJ travaille aussi avec les ministères de la jeunesse et d'autres partenaires de développement dans les pays africains.
L'Union s'efforce de soutenir et de renforcer les valeurs et les idéaux de l'Union africaine (UA) dans la promotion de l'unité, de la paix, de la démocratie, du développement durable et de l'intégration africaine depuis 1962, alors connue sous le nom de Mouvement panafricain de la jeunesse (MPJ).
La structure actuelle de l'Union panafricaine de la jeunesse (UPJ) est le résultat d'une transformation et d'une revitalisation profondes et rigoureuses du MPJ, avec pour objectif principal de s'adapter à l'évolution des défis auxquels les jeunes sont confrontés et à ceux qui découlent de la scène politique post-coloniale, tout en gardant à l'esprit les défis à venir."
          ar="تم تأسيس الاتحاد الأفريقي للشباب تحت اسم حركة الشباب الإفريقية في 26 أبريل 1962 في كوناكري، غينيا، بتوجيه من رؤساء الدول، كآلية خاصة تهدف إلى حشد الشباب من أجل إنهاء الاستعمار في إفريقيا. لعبت الحركة دورًا استراتيجيًا في حشد الدعم السياسي من أجل استقلال الدول الأفريقية.
الاتحاد الأفريقي للشباب، كهيئة تنسيق قارية، لا يقتصر على توحيد مجالس الشباب الوطنية والهياكل المماثلة في القارة الإفريقية فحسب، بل يجمع أيضًا المنظمات المدنية التي يقودها الشباب والتي تركز على الشباب، بالإضافة إلى المنصات الإقليمية للجان الاقتصادية الإقليمية. كما يعمل الاتحاد مع وزارات الشباب وشركاء التنمية الآخرين في الدول الأفريقية.
يسعى الاتحاد إلى دعم وتعزيز القيم والمثل العليا للاتحاد الإفريقي (UA) في تعزيز الوحدة والسلام والديمقراطية والتنمية المستدامة والتكامل الإفريقي منذ عام 1962، حين كان يعرف باسم حركة الشباب الإفريقية (MPJ).
الهيكل الحالي للاتحاد الأفريقي للشباب (UPJ) هو نتيجة لتحول وتجديد عميقين ودقيقين لـ MPJ، بهدف رئيسي هو التكيف مع التحديات المتطورة التي يواجهها الشباب وتلك التي تنبع من المشهد السياسي ما بعد الاستعماري، مع مراعاة التحديات المقبلة."
        />

      )
    }
  ];


  return (
    <>
      <section
        className={`lg:py-12 flex flex-col justify-center gap-3 md:gap-2  ${selectedLanguage == "ar" && "text-end"
          }`}
      >
        <h2 className="text-3xl md:text-5xl lg:text-5xl/none  text-alpha font-bold tracking-tighter px-2 md:px-3 lg:px-14 py-4 md:py-5">
          <TransText en="The Organizers" ar="منظمون" fr="Organisateurs" />
        </h2>
        <div>
          {organizers.map((org, ind) => (
            <div
              key={ind}
              className={` px-6 md:px-10 lg:px-14 py-14 md:py-10 my-8 flex justify-between items-start gap-6 flex-col ${ind % 2 == 1
                ? "lg:flex-row bg-muted-background"
                : "lg:flex-row-reverse bg-white"
                }`}
            >
              <div
                className={`flex items-center justify-center  md:bg-transparent w-full lg:w-[40%] sticky top-[75px] ${ind % 2 == 1 ? "bg-muted-background" : "bg-white"
                  }`}
              >
                <img
                  src={org.logo}
                  alt=""
                  className={` ${org.logo == ucgc ? "w-[210px]" : org.logo == epic ? "w-[400px]  " : "w-[120px] lg:w-[180px]"
                    }`}
                />
              </div>

              <div className="w-full lg:w-[50%] text-lg leading-7">
                <span className="font-bold text-xl">{org.title}: </span>
                <p>{org.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
