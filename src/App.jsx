import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home";
import ArticlesPage from "./pages/articles/arcticles";
import ArticlePage from "./pages/articles/article_id";
import AboutPage from "./pages/about/about";
import { AppProvider } from "./context/AppContext";
import { ContactUs } from "./pages/contact/contact";
import Navbar from "./Layouts/navbar";
import Footer from "./Layouts/footer";
import ErrorPage from "./pages/error";
import Formulaire from "./pages/formulaire/formulaire";
import Form from "./pages/formulaire/partials/form";
import ManagementRedirect from "./pages/management";
import { SponsorsForm } from "./pages/formulaire/SponsorsForm";

function App() {

  return (
    <>
      <AppProvider>
        <Navbar />
          <Routes>
            <Route path="/yes-backend" element={<ManagementRedirect />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/form" element={<Formulaire />} />
            {/* <Route path="/formulaire" element={<Form />} /> */}
            <Route path="/participants" element={<SponsorsForm/>} ></Route>
          </Routes>
        <Footer />
      </AppProvider>
    </>
  );
}

export default App;
