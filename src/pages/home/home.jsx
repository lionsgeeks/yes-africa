import EventInfo from "./components/eventInfo";
import Hero from "./components/hero";
import HeroArticles from "./components/heroArticles";
import Sponsors from "./components/sponsors";
import Who from "./components/who";

const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* event info: time, date, etc */}
      <EventInfo />

      {/* sponsors */}
      <Sponsors />

      {/* who we are */}
      <Who />

      {/* articles */}
      <HeroArticles />

    </>
  );
};

export default HomePage;
