import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import PromptCategories from "./components/PromptCategories";
import CustomPrompt from "./components/CustomPrompt";
import Footer from "./components/Footer";

function App() {
  const { i18n } = useTranslation();

  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "pt";
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className="flex flex-col min-h-screen bg-primary text-textPrimary">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-accent">
            DevMind.ia
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto text-base md:text-lg">
            {i18n.t("heroDescription")}
          </p>
        </section>
        <PromptCategories />
        <CustomPrompt />
      </main>
      <Footer />
    </div>
  );
}

export default App;
