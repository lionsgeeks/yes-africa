import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home";
import ArticlesPage from "./pages/articles/arcticles";
import ArticlePage from "./pages/articles/article_id";
import AboutPage from "./pages/about/about";
import { AppProvider } from "./context/AppContext";
import { ContactUs } from "./pages/contact/contact";
import Navbar from "./Layouts/navbar";
import Footer from "./Layouts/footer";
import ErrorPage from "./pages/error";
import save from "./assets/saveDate.jpeg"
import Formulaire from "./pages/formulaire/formulaire";

function App() {
  return (
    <>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/form" element={<Formulaire />} />
        </Routes>
        <Footer />
      </AppProvider>
      {/* <img className="h-screen w-full  bg-center bg-cover" src={save} alt="" /> */}
    </>
  );
}

export default App;
