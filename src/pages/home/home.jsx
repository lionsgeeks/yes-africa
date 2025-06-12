import EventInfo from "./components/eventInfo";
import Hero from "./components/hero";
import HeroArticles from "./components/heroArticles";
import MeetFaces from "./components/meetFaces";
import MobileApp from "./components/mobileApp";
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

      {/* mobile app */}
      <MobileApp/>
      
      {/* articles */}
      <HeroArticles />

    </>
  );
};

export default HomePage;
