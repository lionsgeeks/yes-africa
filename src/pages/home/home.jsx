import EventInfo from "./components/eventInfo";
import Hero from "./components/hero";
import HeroArticles from "./components/heroArticles";
import MeetFaces from "./components/meetFaces";
import Sponsors from "./components/sponsors";
import Who from "./components/who";

const HomePage = () => {
  
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* event info: time, date, etc */}
      <EventInfo />

      {/* meet the faces */}
      {/* <MeetFaces/> */}

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
