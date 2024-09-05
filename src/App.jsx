import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home";
import ArticlesPage from "./pages/articles/arcticles";
import ArticlePage from "./pages/articles/article_id";
import AboutPage from "./pages/about/about";
import { AppProvider } from "./context/AppContext";
import { ContactUs } from "./pages/contact/contact";
import Navbar from "./Layouts/navbar";
import Footer from "./Layouts/footer";

function App() {
  return (
    <>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </AppProvider>
    </>
  );
}

export default App;
