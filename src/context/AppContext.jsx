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
  const [selectedLanguage, setSelectedLanguage] = useState(savedSelectedLanguage ?? "en");

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage ?? "en");
  }, [selectedLanguage]);

  const blogs = [
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa1,
      author: "Ahmed Alaoui",
      date: "May 1, 2023",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa2,
      author: "Ahmed Alaoui",
      date: "May 1, 2023",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa3,
      author: "Ahmed Alaoui",
      date: "May 1, 2023",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa4,
      author: "Ahmed Alaoui",
      date: "May 1, 2023",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa5,
      author: "Ahmed Alaoui",
      date: "May 1, 2023",
    },
  ];

  return (
    <>
      <AppContext.Provider value={{ blogs, selectedLanguage, setSelectedLanguage }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
