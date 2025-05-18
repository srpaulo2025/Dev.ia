// Funções para interagir com nossa API interna

export interface GenerateIdeaParams {
  promptCategory: string;
  promptType: string;
  customInput?: string;
  language: string;
}

export interface ApiResponse {
  result?: string;
  error?: string;
}

/**
 * Função para enviar uma solicitação para gerar uma ideia usando a IA
 */
export async function generateIdea(params: GenerateIdeaParams): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/generate-idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Ocorreu um erro ao gerar a ideia');
    }
    
    return data;
  } catch (error: any) {
    console.error('Erro ao chamar API:', error);
    return { error: error.message || 'Erro desconhecido' };
  }
}

/**
 * Verifica se a chave da API OpenAI está configurada no servidor
 */
export async function checkApiKeyStatus(): Promise<boolean> {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    
    return data.apiKeyConfigured || false;
  } catch (error) {
    console.error('Erro ao verificar status da API:', error);
    return false;
  }
}