import { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateIdea } from "../lib/api";
import IdeaResult from "./IdeaResult";
import { ask_secrets } from "../lib/utils";

interface PromptButton {
  id: string;
  translationKey: string;
}

interface PromptCategory {
  id: string;
  icon: string;
  translationTitleKey: string;
  translationDescKey: string;
  prompts: PromptButton[];
}

export default function PromptCategories() {
  const { t, i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideaResult, setIdeaResult] = useState("");
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const promptCategories: PromptCategory[] = [
    {
      id: 'game',
      icon: '🎮',
      translationTitleKey: 'categories.game.title',
      translationDescKey: 'categories.game.description',
      prompts: [
        { id: 'game-concept', translationKey: 'prompts.gameIdea' },
        { id: 'game-mechanics', translationKey: 'prompts.gameMechanics' },
        { id: 'game-progression', translationKey: 'prompts.gameProgression' },
      ]
    },
    {
      id: 'app',
      icon: '📱',
      translationTitleKey: 'categories.app.title',
      translationDescKey: 'categories.app.description',
      prompts: [
        { id: 'app-concept', translationKey: 'prompts.appIdea' },
        { id: 'app-features', translationKey: 'prompts.appFeatures' },
        { id: 'app-userflow', translationKey: 'prompts.appUserflow' },
      ]
    },
    {
      id: 'character',
      icon: '👤',
      translationTitleKey: 'categories.character.title',
      translationDescKey: 'categories.character.description',
      prompts: [
        { id: 'character-concept', translationKey: 'prompts.characterConcept' },
        { id: 'character-backstory', translationKey: 'prompts.characterBackstory' },
        { id: 'character-abilities', translationKey: 'prompts.characterAbilities' },
      ]
    },
    {
      id: 'ui',
      icon: '🎨',
      translationTitleKey: 'categories.ui.title',
      translationDescKey: 'categories.ui.description',
      prompts: [
        { id: 'ui-mockup', translationKey: 'prompts.uiMockup' },
        { id: 'ui-color-scheme', translationKey: 'prompts.uiColorScheme' },
        { id: 'ui-ux-flow', translationKey: 'prompts.uiUserflow' },
      ]
    }
  ];
  
  const handlePrompt = async (promptId: string) => {
    // Extrair a categoria e o tipo do ID do prompt
    const [category, promptType] = promptId.split('-');
    
    try {
      // Iniciar a geração
      setIsGenerating(true);
      setShowResult(true);
      setError("");
      
      // Chamar nossa API interna
      const response = await generateIdea({
        promptCategory: category,
        promptType: promptId,
        language: i18n.language
      });
      
      if (response.error) {
        setError(response.error);
      } else {
        setIdeaResult(response.result || "");
      }
    } catch (error: any) {
      console.error("Erro ao gerar ideia:", error);
      setError(error.message || t('genericError'));
    } finally {
      setIsGenerating(false);
    }
  };
  
  const closeResult = () => {
    setShowResult(false);
    setIdeaResult("");
    setError("");
  };
  
  return (
    <>
      <section className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          {t('categoriesTitle')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promptCategories.map((category) => (
            <div key={category.id} className="bg-secondary rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-accent/20 group">
              <div className="text-4xl mb-4 text-accent">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2">{t(category.translationTitleKey)}</h3>
              <p className="text-textSecondary mb-4 text-sm h-20">
                {t(category.translationDescKey)}
              </p>
              <div className="space-y-2">
                {category.prompts.map((prompt) => (
                  <button 
                    key={prompt.id}
                    className="w-full text-left px-4 py-2 rounded-md bg-primary hover:bg-accent hover:text-primary transition text-sm flex justify-between items-center"
                    onClick={() => handlePrompt(prompt.id)}
                  >
                    <span>{t(prompt.translationKey)}</span>
                    <i className="fas fa-brain">🧠</i>
                  </button>
                ))}
              </div>
            </div>
          ))}
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
