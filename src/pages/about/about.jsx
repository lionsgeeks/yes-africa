import {
  AboutSection,
  CommitteeSection,
  HistorySection,
  OrganizatesSection,
  SponsorsSection,
} from "./partials";


const AboutPage = () => {

  return (
    <>
      <main>
      
        <AboutSection />
        <HistorySection />
        <OrganizatesSection />
        <CommitteeSection />
        {/* <SponsorsSection /> */}
      </main>
    </>
  );
};

export default AboutPage;
