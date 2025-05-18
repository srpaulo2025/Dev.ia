import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="bg-secondary py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo section */}
        <div className="flex items-center space-x-2">
          <div className="text-accent text-2xl md:text-3xl font-bold flex items-center">
            <span className="mr-2">🚀</span>
            <span>DevMind.ia</span>
          </div>
        </div>
        
        {/* Language selector */}
        <LanguageSelector />
      </div>
    </header>
  );
}
