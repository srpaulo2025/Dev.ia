import { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateIdea } from "../lib/api";
import IdeaResult from "./IdeaResult";
import { ask_secrets } from "../lib/utils";

export default function CustomPrompt() {
  const { t, i18n } = useTranslation();
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideaResult, setIdeaResult] = useState("");
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const handleCustomPrompt = async () => {
    if (customPrompt.trim()) {
      try {
        // Iniciar a geração
        setIsGenerating(true);
        setShowResult(true);
        setError("");
        
        // Chamar nossa API interna
        const response = await generateIdea({
          promptCategory: "custom",
          promptType: "custom",
          customInput: customPrompt,
          language: i18n.language
        });
        
        if (response.error) {
          setError(response.error);
        } else {
          setIdeaResult(response.result || "");
          setCustomPrompt(""); // Limpar após enviar
        }
      } catch (error: any) {
        console.error("Erro ao gerar ideia:", error);
        setError(error.message || t('genericError'));
      } finally {
        setIsGenerating(false);
      }
    }
  };
  
  const closeResult = () => {
    setShowResult(false);
    setIdeaResult("");
    setError("");
  };
  
  return (
    <>
      <section className="bg-secondary rounded-xl p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {t('customPromptTitle')}
        </h2>
        <p className="text-textSecondary mb-4 text-sm">
          {t('customPromptDescription')}
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <textarea 
            id="custom-prompt" 
            className="w-full bg-primary border border-gray-700 rounded-md p-3 text-textPrimary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            rows={3}
            placeholder={t('customPromptPlaceholder')}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleCustomPrompt();
              }
            }}
          />
          <button 
            id="submit-custom-prompt"
            className="bg-accent text-primary font-medium px-6 py-3 rounded-md hover:bg-opacity-80 transition whitespace-nowrap"
            onClick={handleCustomPrompt}
          >
            <i className="mr-2">📤</i>
            <span>{t('sendButton')}</span>
          </button>
        </div>
      </section>
      
      {showResult && (
        <IdeaResult 
          result={ideaResult}
          isLoading={isGenerating}
          error={error}
          onClose={closeResult}
        />
      )}
    </>
  );
}
