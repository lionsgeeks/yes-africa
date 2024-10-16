import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import africa1 from "../assets/images/africa1.jpg";
import africa2 from "../assets/images/africa2.jpg";
import africa3 from "../assets/images/africa3.jpg";
import africa4 from "../assets/images/africa4.jpg";
import africa5 from "../assets/images/africa5.jpg";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const path = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const savedSelectedLanguage = localStorage.getItem("selectedLanguage");
  const [selectedLanguage, setSelectedLanguage] = useState(
    savedSelectedLanguage ?? "en"
  );

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage ?? "en");
  }, [selectedLanguage]);

  const blogs = [
    {
      title: {
        en: "Number of youth not in employment, education, or training (NEET) a cause for concern, despite falling jobless rate",
        ar: "عدد الشباب غير الملتحقين بالعمل أو التعليم أو التدريب مصدر قلق، على الرغم من انخفاض معدل البطالة",
      },
      description: {
        ar: `يجد تقرير جديد أن نسبًا عالية من الشباب، بالإضافة إلى فجوات إقليمية وجندرية، وقلق متزايد بين الشباب بشأن العمل، على الرغم من الاتجاهات المشجعة لانخفاض البطالة العالمية للشباب. تحسنت الآفاق العالمية لسوق العمل بالنسبة للشباب في السنوات الأربع الماضية، ومن المتوقع أن يستمر الاتجاه التصاعدي لعامين آخرين، وفقًا لتقرير جديد. ومع ذلك، يحذر التقرير من أن عدد الشباب الذين تتراوح أعمارهم بين 15 و24 عامًا الذين لا يعملون ولا يتعلمون ولا يتدربون يثير القلق، وأن تعافي العمالة بعد جائحة كوفيد-19 لم يكن شاملاً. لم يستفد الشباب في بعض المناطق والعديد من الشابات من الانتعاش الاقتصادي. وبلغ معدل بطالة الشباب في عام 2023 نسبة 13%، وهو ما يعادل 64.9 مليون شخص، وهو أدنى مستوى منذ 15 عامًا وانخفاض من معدل ما قبل الجائحة البالغ 13.8% في عام 2019. ومن المتوقع أن ينخفض أكثر إلى 12.8% هذا العام والعام المقبل. ومع ذلك، فإن الصورة ليست متساوية عبر المناطق. ففي الدول العربية، وشرق آسيا وجنوب شرق آسيا والمحيط الهادئ، كانت معدلات بطالة الشباب في عام 2023 أعلى مما كانت عليه في 2019. كما يحذر تقرير من أن الشباب يواجهون تحديات أخرى في العثور على النجاح في عالم العمل. ويشير إلى أن عددًا كبيرًا جدًا من الشباب حول العالم هم، وأن فرص الوصول إلى وظائف لائقة لا تزال محدودة في الاقتصادات الناشئة والنامية. واحد من كل خمسة شباب، أو 20.4%، على مستوى العالم كان في عام 2023. وكان اثنان من كل ثلاثة من هؤلاء من النساء. بالنسبة للشباب الذين يعملون، يشير التقرير إلى عدم إحراز تقدم في الحصول على وظائف لائقة. على الصعيد العالمي، أكثر من نصف العمال الشباب يعملون في وظائف غير رسمية. وفقط في الاقتصادات ذات الدخل المرتفع والمتوسط العلوي يتمتع غالبية العمال الشباب اليوم بوظائف منتظمة وآمنة. وفي البلدان ذات الدخل المنخفض، يحصل ثلاثة من كل أربعة من العمال الشباب على عمل ذاتي أو وظيفة مؤقتة فقط. ويحذر التقرير من أن استمرار ارتفاع معدلات والنمو غير الكافي للوظائف اللائقة يسبب قلقًا متزايدًا بين الشباب اليوم، الذين يشكلون أيضًا الجيل الأكثر تعليماً في التاريخ. "لا يمكن لأي منا أن يتطلع إلى مستقبل مستقر عندما لا يتمتع ملايين الشباب حول العالم بعمل لائق، ونتيجة لذلك، يشعرون بعدم الأمان وغير قادرين على بناء حياة أفضل لأنفسهم ولأسرهم. تعتمد المجتمعات السلمية على ثلاثة مكونات أساسية: الاستقرار، الشمول، والعدالة الاجتماعية؛ والعمل اللائق للشباب هو في صميم هذه المكونات الثلاثة"، أوضح المدير العام. علاوة على ذلك، يجد التقرير أن الشباب الذكور استفادوا أكثر من تعافي سوق العمل مقارنة بالشابات. وكانت معدلات بطالة الشباب والشابات في عام 2023 متساوية تقريبًا (بنسبة 12.9% للشابات و13% للشباب)، على عكس السنوات التي سبقت الجائحة عندما كانت نسبة الشباب الذكور أعلى. وكان معدل العالمي للشابات ضعف معدل الشباب (28.1% مقابل 13.1% على التوالي) في عام 2023. "يذكرنا التقرير بأن الفرص للشباب غير متساوية بشكل كبير؛ حيث لا تزال العديد من الشابات، والشباب الذين يملكون وسائل مالية محدودة أو من أي خلفية أقلية يكافحون. بدون فرص متساوية للتعليم ووظائف لائقة، يخسر ملايين الشباب فرصهم لمستقبل أفضل"، أضاف. يدعو تقرير إلى مزيد من الاهتمام بتعزيز أسس العمل اللائق كمسار لمواجهة قلق الشباب بشأن عالم العمل وتعزيز أملهم في مستقبل مشرق. في رسالة إلى القراء الشباب، يطلب مؤلفو التقرير منهم إضافة أصواتهم إلى الدعوات للتغيير. "لديك القدرة على التأثير على السياسات والدعوة إلى العمل اللائق للجميع. اعرف حقوقك واستمر في الاستثمار في مهاراتك"، تقول الرسالة. "كن جزءًا من التغيير الذي نحتاجه جميعًا لضمان عالم عادل وشامل اجتماعياً." يحتفل هذا الإصدار الـ12 بالذكرى العشرين للتقرير. ويستعرض ما تم تحقيقه في هذا القرن لتحسين آفاق العمل للشباب ويأخذ في الاعتبار مستقبل توظيف الشباب "في عصر يتسم بالأزمات وعدم اليقين". بالنظر إلى الاتجاهات طويلة المدى، يستنتج التقرير أن:  النمو في الخدمات وفي وظائف التصنيع للشباب كان محدودًا، على الرغم من أنه يمكن جلب التحديث للقطاعات التقليدية من خلال الرقمنة والذكاء الاصطناعي.  لا توجد وظائف كافية ذات مهارات عالية لتلبية العرض من الشباب المتعلمين، خاصة في البلدان ذات الدخل المتوسط.  الحفاظ على تطوير المهارات على نفس الوتيرة مع الطلبات المتغيرة للمهارات الخضراء والرقمية سيكون أمرًا حاسمًا للحد من عدم التوافق في التعليم.  العدد المتزايد من النزاعات يهدد سبل عيش الشباب في المستقبل ويمكن أن يدفعهم إلى الهجرة أو التطرف.  تعني الاتجاهات الديموغرافية، ولا سيما في إفريقيا، أن خلق عدد كافٍ من الوظائف اللائقة سيكون أمرًا حاسمًا للعدالة الاجتماعية والاقتصاد العالمي. يدعو التقرير إلى زيادة الاستثمار بشكل فعال، بما في ذلك تعزيز خلق الوظائف مع استهداف محدد على الوظائف للشابات، وتعزيز المؤسسات التي تدعم الشباب في انتقالاتهم في سوق العمل بما في ذلك الشباب، ودمج العمل والحماية الاجتماعية للشباب، ومعالجة الفجوات العالمية من خلال تحسين التعاون الدولي والشراكات بين القطاعين العام والخاص وتمويل التنمية. `,
        en: `New ILO report finds high shares of youth NEETs, regional and gender gaps, and growing youth anxiety about work, despite encouraging global youth unemployment trends.
GENEVA (ILO News) – The global labour market outlook for young people has improved in the last four years, and the upward trend is expected to continue for two more, according to a new International Labour Organization (ILO) report.
However, the report, titled Global Employment Trends for Youth 2024 (GET for Youth), cautions that the number of 15- to 24-year-olds who are not in employment, education or training (NEET) is concerning, and that the post-COVID 19 pandemic employment recovery has not been universal. Young people in certain regions and many young women are not seeing the benefits of the economic recovery.
The 2023 youth unemployment rate, at 13 per cent, equivalent to 64.9 million people, represents a 15-year low and a fall from the pre-pandemic rate of 13.8 per cent in 2019. It is expected to fall further to 12.8 per cent this year and next. The picture, however, is not the same across regions. In the Arab States, East Asia and South-East Asia and the Pacific, youth unemployment rates were higher in 2023 than in 2019.
The GET for Youth also cautions that young people face other “headwinds” in finding success in the world of work. It notes that too many young people across the globe are NEET and opportunities to access decent jobs remain limited in emerging and developing economies. One in five young people, or 20.4 per cent, globally were NEET in 2023. Two in three of these NEETs were female.
For the youth who do work, the report notes the lack of progress in gaining decent jobs. Globally, more than half of young workers are in informal employment. Only in high- and upper-middle-income economies are the majority of young workers today in a regular, secure job. And three in four young workers in low-income countries will get only a self-employed or temporary paid job.
The report cautions that the continuing high NEET rates and insufficient growth of decent jobs are causing growing anxiety among today’s youth, who are also the most educated youth cohort ever.
“None of us can look forward to a stable future when millions of young people around the world do not have decent work and as a result, are feeling insecure and unable to build a better life for themselves and their families. Peaceful societies rely on three core ingredients: stability, inclusion, and social justice; and decent work for the youth is at the heart of all three,” explained Gilbert F. Houngbo, ILO Director-General.
Moreover, the report finds that young men have benefited more from the labour market recovery than young women. The youth unemployment rates of young women and young men in 2023 were nearly equal (at 12.9 per cent for young women and 13 per cent for young men), unlike the pre-pandemic years when the rate for young men was higher. And the global youth NEET rate of young women doubled that of young men (at 28.1 per cent and 13.1 per cent, respectively) in 2023.
“The report reminds us that opportunities for young people are highly unequal; with many young women, young people with limited financial means or from any minority background still struggling. Without equal opportunities to education and decent jobs, millions of young people are missing out on their chances for a better future,” added Houngbo.
The ILO report calls for greater attention on strengthening the foundations of decent work as a pathway to countering young people’s anxieties about the world of work and reinforcing their hope for a brighter future.
In a message to young readers, the report’s authors ask them to add their voices to calls for change. “You have the possibility to influence policy and to advocate for decent work for all. Know your rights and continue investing in your skills,” the message says. “Be a part of the change that we all need to ensure a socially just and inclusive world.”
This 12th edition of the GET for Youth marks the report’s 20-year anniversary. It looks back at what has been achieved in this century to improve young people’s working prospects and considers the future for youth employment “in an era characterized by crises and uncertainties”. Looking at longer-term trends, the report concludes that:
Growth in “modern” services and in manufacturing jobs for youth has been limited, although modernization can be brought to traditional sectors through digitalization and AI.
There are not enough high-skill jobs for the supply of educated youth, especially in middle-income countries.
Keeping skills development on pace with evolving demands for green and digital skills will be critical to reducing education mismatches. 
The growing number of conflicts threatens young people’s future livelihoods and can push them into migration or towards extremism.
Demographic trends, notably the African ‘youthquake’ means creating enough decent jobs, will be critical for social justice and the global economy.
The report calls for increased and more effective investment, including in boosting job creation with a specific target on jobs for young women, strengthening the institutions that support young people through their labour market transitions including young NEETs, integrating employment and social protection for youth, and tackling global inequalities through improved international cooperation, public-private partnerships and financing for development. :
Source : https://www.ilo.org/resource/news/number-youth-not-employment-education-or-training-neet-cause-concern `,
      },
      image: africa1,
      author: "Ahmed Alaoui",
      date: "May 1, 2023",
      tags: [
        { en: "Youth Civil Society", ar: "المجتمع المدني الشبابي" },
        { en: "YouthEmployment", ar: "توظيف_الشباب  " },
        { en: "DecentWork", ar: " العمل_اللائق" },
        { en: "GenderEquality", ar: "المساواة_بين_الجنسين" },
        { en: "SocialJustice", ar: "العدالة_الاجتماعية" },
      ],
    },
    {
      title: {
        en: "The Status of NEET. A quantitative analysis of A Quantitative Analysis of Youth Not in Employment, Education or Training (NEET) (15 – 24 years old)",
        ar: "وضع الشباب غير الملتحقين بالعمل أو التعليم أو التدريب: تحليل كمي للشباب غير الملتحقين بالعمل أو التعليم أو التدريب (15 – 24 سنة)",
      },
      description: {
        ar: `الهدف السادس من أهداف التنمية المستدامة 8 يسعى إلى خفض نسبة الشباب غير الملتحقين بالعمل أو التعليم أو التدريب بشكل كبير بحلول عام 2020. يرتبط هذا الهدف بشكل جيد مع حملة الأمم المتحدة للمرأة الرائدة والمتعددة الأجيال: "جيل المساواة: تحقيق حقوق المرأة من أجل مستقبل متساوٍ". لضمان أن التعافي من جائحة كوفيد-19 يسهم أيضًا في تقليل عدد الشباب غير الملتحقين بالعمل أو التعليم أو التدريب، وخاصة الشابات، كلفت هيئة الأمم المتحدة للمرأة في شرق وجنوب إفريقيا بإجراء بحث كمي شمل تسع دول في المنطقة: بوتسوانا، إثيوبيا، كينيا، مالاوي، موزمبيق، ناميبيا، رواندا، جنوب إفريقيا، وأوغندا. ترتبط معدلات الشباب غير الملتحقين بالعمل أو التعليم أو التدريب ارتباطًا وثيقًا بما يحدث في الاقتصاد وسوق العمل لكل دولة. وتوضح نتائج الدراسة أن النساء الشابات في معظم البلدان، باستثناء إثيوبيا ومالاوي، أكثر عرضة من الرجال للعيش في فقر مدقع. وعلى الرغم من أن بوتسوانا، جنوب إفريقيا، ناميبيا، وكينيا لديها أعلى ناتج محلي إجمالي للفرد، إلا أن بوتسوانا وكينيا فقط لديهما معدلات نمو اقتصادي متوقعة تظهر بعض الأمل في خلق فرص عمل للشباب. وبالنظر إلى الاعتماد الكبير على الزراعة في معظم الدول المدرجة في الدراسة، من المتوقع أن يوفر القطاع الزراعي الأسري معظم فرص العمل الجديدة خلال العقد القادم. معدلات الشباب غير الملتحقين بالعمل أو التعليم أو التدريب للشباب الذين تتراوح أعمارهم بين 15-19 عامًا تشمل في الغالب أولئك الذين تسربوا من النظام التعليمي. وتتجاوز معدلات الشباب غير الملتحقين بالعمل أو التعليم أو التدريب في هذه الفئة العمرية 30% في بوتسوانا، إثيوبيا، وموزمبيق، بينما تتراوح بين 20% و30% في مالاوي، ناميبيا، أوغندا، ورواندا. منذ بداية جائحة كوفيد-19 وما تلاها من تدهور اقتصادي عالمي، شهدت منطقة شرق وجنوب إفريقيا خسائر في الوظائف وزيادة في الفقر، وانقطاعات في الخدمات الصحية، وتراجعًا في مستويات التغذية. وقد عانى الشباب الذين غالبًا ما تكون مشاركتهم في سوق العمل غير رسمية ومؤقتة وضعيفة من خسائر أكبر في الوظائف والدخل مقارنة بآبائهم. وضمن جهود ضمان أن التعافي الاقتصادي يسهم أيضًا في تقليل عدد الشباب، وخاصة النساء الشابات، غير الملتحقين بالعمل أو التعليم أو التدريب، كلفت هيئة الأمم المتحدة للمرأة في منطقة شرق وجنوب إفريقيا بإجراء دراسة كمية عن وضع الشباب غير الملتحقين بالعمل أو التعليم أو التدريب للشباب الذين تتراوح أعمارهم بين 15 و24 عامًا في تسع دول في المنطقة. يلخص هذا التقرير نتائج كل دولة ويقدم تحليلًا تفصيليًا للبيانات المتاحة عن الشباب غير الملتحقين بالعمل أو التعليم أو التدريب للشباب بهدف دعم السياسات المستندة إلى الأدلة والدعوة إلى اتخاذ إجراءات في هذا المجال.

تغطي الدراسة بوتسوانا، إثيوبيا، كينيا، مالاوي، موزمبيق، ناميبيا، رواندا، جنوب إفريقيا، وأوغندا. `,
        en: `Target 6 of SDG 8 aims to substantially reduce the proportion of youth not in employment, education or training (NEET) by 2020. This links well with UN Women’s groundbreaking, multigenerational campaign: “Generation Equality: Realizing Women’s Rights for an Equal Future”. To ensure that recovery from the COVID-19 pandemic also impacts on reducing the number of youth NEET, especially young women, UN Women East and Southern Africa commissioned quantitative research covering nine countries in the region: Botswana, Ethiopia, Kenya, Malawi, Mozambique, Namibia, Rwanda, South Africa, and Uganda.
NEET rates are intimately associated and connected with what is happening in the economy and labour market of a particular country. The contextual findings of the study suggest that in all countries except Ethiopia and Malawi, young women are more likely than men to live in extreme poverty. While Botswana, South Africa, Namibia, and Kenya have the highest GDP per capita of countries in this study, only Botswana and Kenya have anticipated economic growth rates that show some promise for substantial youth employment creation. Given the strong dependence on agriculture in most countries included in the study, the household agricultural sector is likely to provide most new employment in the coming decade. NEET rates for youth aged 15-19 years largely comprise young people who have dropped out of the education system. NEET rates in this age group are higher than 30 per cent in Botswana, Ethiopia, and Mozambique and between 20 and 30 per cent in Malawi, Namibia, Uganda and Rwanda.
Since the onset of the COVID-19 pandemic and associated worldwide economic decline, East and Southern Africa (ESA) has suffered job losses and an increase in poverty, interruptions in healthcare services, and declined nutrition levels. Young adults whose place in the labor market is often informal, temporary, and tenuous at best have suffered greater job and income losses than their parents.
As part of ensuring that recovery efforts also reduce the number of youth, especially young women, not in employment, education, or training (NEET), UN Women in ESA commissioned a quantitative study on the NEET status of youth aged 15-24 years in nine countries in the region.
This report summarizes the country findings and provides a detailed analysis of available NEET data for youth aged 15-24 years with a view to supporting evidence-based policy advocacy and action in this area. This study covers Botswana, Ethiopia, Kenya, Malawi, Mozambique, Namibia, Rwanda, South Africa, and Uganda.
Source : https://africa.unwomen.org/en/digital-library/publications/2022/10/the-status-of-neet-a-quantitative-analysis-of-youth-not-in-employment-education-or-training `,
      },
      image: africa2,
      // author: "Ahmed Alaoui",
      date: "May 1, 2023",
      tags: [
        { en: "Youth Civil Society", ar: "المجتمع المدني الشبابي" },
        { en: "Community Development", ar: "المجتمع المدني الشبابي" },
        { en: "Grassroots Organisations", ar: " المنظمات القاعدية " },
        { en: "Access to Funding", ar: "المجتمع المدني الشبابي" },
        { en: "Decision-Making Power", ar: "قوة اتخاذ القرار" },
      ],
    },
    {
      title: { en: "Young people who are not working, not in school, and not undergoing any training (NEET): What are the prospects for economic and social inclusion?", ar: "شباب لا يشتغلون، ليسوا بالمدرسة، ولا يتابعون أي تكوين “NEET”: أي آفاق للإدماج الاقتصادي والاجتماعي ؟" },
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: `Young people who are not working, not in school, and not undergoing any training (NEET): What are the prospects for economic and social inclusion? This opinion, prepared by the Economic, Social, and Environmental Council, under a self-referral framework, highlights the situation of young people aged 15 to 24 who are outside the education and training system and the job market. It also recommends various pathways to elevate this vulnerable group. This opinion was unanimously approved during the council's general assembly held on November 30, 2023.`,
      },
      image: africa3,
      // author: "Ahmed Alaoui",
      date: "May 1, 2023",
      tags: [
        { en: "YouthNEET", ar: "شباب_NEET  " },
        { en: "EconomicInclusion", ar: " الإدماج_الاقتصادي" },
        { en: "SocialInclusion", ar: "الإدماج_الاجتماعي" },
        { en: "YouthEmpowerment", ar: "تمكين_الشباب" },
      ],
    },
    // {
    //   title: "Yes Africa",
    //   description: {
    //     ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
    //     en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
    //   },
    //   image: africa4,
    //   author: "Ahmed Alaoui",
    //   date: "May 1, 2023",
    // },
    // {
    //   title: "Yes Africa",
    //   description: {
    //     ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
    //     en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
    //   },
    //   image: africa5,
    //   author: "Ahmed Alaoui",
    //   date: "May 1, 2023",
    // },
  ];

  return (
    <>
      <AppContext.Provider
        value={{ blogs, selectedLanguage, setSelectedLanguage }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
