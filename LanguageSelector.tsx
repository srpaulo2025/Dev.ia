import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  label: string;
  flag: string;
}

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const languages: Language[] = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "zh", label: "中文", flag: "🇨🇳" }
  ];
  
  // Find the current language object
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    setIsOpen(false);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="flex items-center space-x-2 bg-primary px-3 py-2 rounded-md hover:bg-opacity-80 transition"
        onClick={toggleMenu}
      >
        <span>{currentLanguage.label}</span>
        <i className="text-xs">▼</i>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-secondary rounded-md shadow-xl z-20 max-h-72 overflow-y-auto">
          {languages.map((language) => (
            <button 
              key={language.code}
              className={`block px-4 py-2 text-left w-full hover:bg-primary transition ${language.code === i18n.language ? 'text-accent' : ''}`}
              onClick={() => changeLanguage(language.code)}
            >
              <span className="mr-2">{language.flag}</span> {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
