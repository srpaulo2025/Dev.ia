import OpenAI from "openai";

// O modelo mais recente da OpenAI é "gpt-4o", lançado em 13 de maio de 2024.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface GenerateIdeaParams {
  promptCategory: string;
  promptType: string;
  customInput?: string;
  language: string;
}

/**
 * Gera uma ideia criativa com base no prompt fornecido
 */
export async function generateIdea({ 
  promptCategory, 
  promptType, 
  customInput, 
  language 
}: GenerateIdeaParams): Promise<string> {
  try {
    // Estrutura básica do prompt com base na categoria e tipo
    let promptBase = "";
    
    if (customInput && customInput.trim()) {
      // Usar entrada personalizada se fornecida
      promptBase = customInput;
    } else {
      // Construir prompt com base na categoria e tipo
      switch(promptCategory) {
        case "game":
          if (promptType === "game-concept") {
            promptBase = getTranslatedPrompt("gameIdea", language);
          } else if (promptType === "game-mechanics") {
            promptBase = getTranslatedPrompt("gameMechanics", language);
          } else if (promptType === "game-progression") {
            promptBase = getTranslatedPrompt("gameProgression", language);
          }
          break;
        case "app":
          if (promptType === "app-concept") {
            promptBase = getTranslatedPrompt("appIdea", language);
          } else if (promptType === "app-features") {
            promptBase = getTranslatedPrompt("appFeatures", language);
          } else if (promptType === "app-userflow") {
            promptBase = getTranslatedPrompt("appUserflow", language);
          }
          break;
        case "character":
          if (promptType === "character-concept") {
            promptBase = getTranslatedPrompt("characterConcept", language);
          } else if (promptType === "character-backstory") {
            promptBase = getTranslatedPrompt("characterBackstory", language);
          } else if (promptType === "character-abilities") {
            promptBase = getTranslatedPrompt("characterAbilities", language);
          }
          break;
        case "ui":
          if (promptType === "ui-mockup") {
            promptBase = getTranslatedPrompt("uiMockup", language);
          } else if (promptType === "ui-color-scheme") {
            promptBase = getTranslatedPrompt("uiColorScheme", language);
          } else if (promptType === "ui-ux-flow") {
            promptBase = getTranslatedPrompt("uiUserflow", language);
          }
          break;
        default:
          promptBase = getTranslatedPrompt("default", language);
      }
    }

    // Fazer a solicitação para a API da OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: getSystemPrompt(language)
        },
        {
          role: "user",
          content: promptBase
        }
      ],
      temperature: 1,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || "Não foi possível gerar uma ideia.";
  } catch (error) {
    console.error("Erro ao gerar ideia:", error);
    
    // Retornar mensagem de erro adequada com base no idioma
    if (language === "pt") {
      return "Ocorreu um erro ao gerar a ideia. Por favor, verifique a chave da API ou tente novamente mais tarde.";
    } else if (language === "es") {
      return "Ocurrió un error al generar la idea. Por favor, verifique la clave de API o inténtelo de nuevo más tarde.";
    } else if (language === "fr") {
      return "Une erreur s'est produite lors de la génération de l'idée. Veuillez vérifier la clé API ou réessayer plus tard.";
    } else if (language === "de") {
      return "Bei der Generierung der Idee ist ein Fehler aufgetreten. Bitte überprüfen Sie den API-Schlüssel oder versuchen Sie es später erneut.";
    } else if (language === "it") {
      return "Si è verificato un errore durante la generazione dell'idea. Controlla la chiave API o riprova più tardi.";
    } else if (language === "ja") {
      return "アイデアの生成中にエラーが発生しました。APIキーを確認するか、後でもう一度お試しください。";
    } else if (language === "zh") {
      return "生成想法时出错。请检查 API 密钥或稍后重试。";
    } else {
      return "An error occurred while generating the idea. Please check the API key or try again later.";
    }
  }
}

/**
 * Obtém o prompt de sistema adequado para o idioma
 */
function getSystemPrompt(language: string): string {
  switch(language) {
    case "pt":
      return "Você é um assistente criativo especializado em gerar ideias para jogos, aplicativos, personagens e design. Forneça respostas detalhadas, criativas e práticas que ajudem o usuário a desenvolver seus projetos.";
    case "es":
      return "Eres un asistente creativo especializado en generar ideas para juegos, aplicaciones, personajes y diseño. Proporciona respuestas detalladas, creativas y prácticas que ayuden al usuario a desarrollar sus proyectos.";
    case "fr":
      return "Vous êtes un assistant créatif spécialisé dans la génération d'idées pour les jeux, les applications, les personnages et le design. Fournissez des réponses détaillées, créatives et pratiques qui aident l'utilisateur à développer ses projets.";
    case "de":
      return "Sie sind ein kreativer Assistent, der auf die Generierung von Ideen für Spiele, Anwendungen, Charaktere und Design spezialisiert ist. Geben Sie detaillierte, kreative und praktische Antworten, die dem Benutzer bei der Entwicklung seiner Projekte helfen.";
    case "it":
      return "Sei un assistente creativo specializzato nella generazione di idee per giochi, applicazioni, personaggi e design. Fornisci risposte dettagliate, creative e pratiche che aiutino l'utente a sviluppare i suoi progetti.";
    case "ja":
      return "あなたはゲーム、アプリケーション、キャラクター、デザインのアイデアを生成することに特化したクリエイティブアシスタントです。ユーザーがプロジェクトを開発するのに役立つ、詳細で創造的で実用的な回答を提供してください。";
    case "zh":
      return "您是专门为游戏、应用程序、角色和设计生成创意的创意助手。提供详细、有创意且实用的回答，帮助用户开发他们的项目。";
    default:
      return "You are a creative assistant specialized in generating ideas for games, applications, characters, and design. Provide detailed, creative, and practical responses that help the user develop their projects.";
  }
}

/**
 * Retorna o texto do prompt adequado para cada tipo de prompt e idioma
 * Nota: Idealmente, isso usaria os arquivos de tradução diretamente
 */
function getTranslatedPrompt(promptKey: string, language: string): string {
  // Definimos prompts básicos para cada tipo e idioma
  const prompts: Record<string, Record<string, string>> = {
    // Prompts em inglês (padrão)
    "en": {
      "gameIdea": "Create a complete game idea with genre, story, main characters, and game mechanics. The game should have a unique and innovative concept.",
      "gameMechanics": "Develop detailed game mechanics for a game. Include combat systems, environment interaction, progression, and economy.",
      "gameProgression": "Create a progression system for a game, including levels, unlockable abilities, rewards, and difficulty curve.",
      "appIdea": "Suggest an innovative app idea that solves a real problem. Include value proposition, target audience, and main features.",
      "appFeatures": "List and detail the main features for an app. Describe how each feature benefits the user.",
      "appUserflow": "Describe the user journey in an app, from first use to becoming a regular user. Include onboarding, main interactions, and retention.",
      "characterConcept": "Create a complete character for a game, including name, age, appearance, personality, motivations, and role in the story.",
      "characterBackstory": "Develop a detailed origin story for a game character, including formative events, relationships, and traumas that shaped their current personality.",
      "characterAbilities": "Create a set of unique abilities and powers for a game character. Include active, passive, and ultimate abilities.",
      "uiMockup": "Describe the user interface for an app or game, including layout, UI elements, color scheme, and overall visual style.",
      "uiColorScheme": "Create a color scheme for an app or game aimed at a specific target audience. Include primary, secondary, and accent colors with their hexadecimal codes.",
      "uiUserflow": "Detail the user interaction flow for a specific feature in an app or game, including screens, transitions, and feedback.",
      "default": "Generate a creative idea for a project."
    },
    // Prompts em português
    "pt": {
      "gameIdea": "Crie uma ideia de jogo completa com gênero, história, personagens principais e mecânicas de jogo. O jogo deve ter um conceito único e inovador.",
      "gameMechanics": "Desenvolva mecânicas de jogo detalhadas para um jogo. Inclua sistemas de combate, interação com o ambiente, progressão e economia.",
      "gameProgression": "Crie um sistema de progressão para um jogo, incluindo níveis, habilidades desbloqueáveis, recompensas e curva de dificuldade.",
      "appIdea": "Sugira uma ideia de aplicativo inovador que resolva um problema real. Inclua proposta de valor, público-alvo e funcionalidades principais.",
      "appFeatures": "Liste e detalhe as principais funcionalidades para um aplicativo. Descreva como cada funcionalidade beneficia o usuário.",
      "appUserflow": "Descreva a jornada do usuário em um aplicativo, desde o primeiro uso até se tornar um usuário regular. Inclua onboarding, interações principais e retenção.",
      "characterConcept": "Crie um personagem completo para um jogo, incluindo nome, idade, aparência, personalidade, motivações e papel na história.",
      "characterBackstory": "Desenvolva uma história de origem detalhada para um personagem de jogo, incluindo eventos formadores, relacionamentos e traumas que moldaram sua personalidade atual.",
      "characterAbilities": "Crie um conjunto de habilidades e poderes únicos para um personagem de jogo. Inclua habilidades ativas, passivas e ultimate.",
      "uiMockup": "Descreva a interface de usuário para um aplicativo ou jogo, incluindo layout, elementos de UI, esquema de cores e estilo visual geral.",
      "uiColorScheme": "Crie um esquema de cores para um aplicativo ou jogo voltado para um público-alvo específico. Inclua cores primárias, secundárias e de destaque com seus códigos hexadecimais.",
      "uiUserflow": "Detalhe o fluxo de interação do usuário para uma funcionalidade específica em um aplicativo ou jogo, incluindo telas, transições e feedback.",
      "default": "Gere uma ideia criativa para um projeto."
    },
    // Outros idiomas seguiriam o mesmo padrão...
  };

  // Verificar se temos o idioma solicitado, caso contrário usar inglês
  const promptsForLanguage = prompts[language] || prompts["en"];
  
  // Retornar o prompt específico ou o prompt padrão
  return promptsForLanguage[promptKey] || promptsForLanguage["default"];
}