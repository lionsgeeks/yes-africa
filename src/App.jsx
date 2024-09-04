import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home";
import ArticlesPage from "./pages/articles/arcticles";
import ArticlePage from "./pages/articles/article_id";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";
import AboutPage from "./pages/about/about";
import { AppProvider } from "./context/AppContext";

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
        </Routes>
        <Footer />
      </AppProvider>
    </>
  );
}

export default App;
