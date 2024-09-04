import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home";
import ArticlesPage from "./pages/articles/arcticles";
import ArticlePage from "./pages/articles/article_id";
import Navbar from "./Layouts/navbar";
import Footer from "./Layouts/footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
