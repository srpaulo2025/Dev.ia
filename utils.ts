import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Função para solicitar ao usuário que insira uma chave de API
 * Esta é uma implementação temporária, pois no ambiente real seria substituída pela função ask_secrets do sistema
 */
export function ask_secrets(keys: string[], message: string): void {
  // Exibir uma mensagem para o usuário configurar a chave de API
  console.log(`Por favor, configure as seguintes chaves de API: ${keys.join(', ')}`);
  console.log(message);
  
  // No ambiente real, esta função abriria um modal ou interface para o usuário inserir a chave
  // Por enquanto, apenas mostramos um alerta
  alert(`É necessário configurar a chave de API (${keys.join(', ')}) para continuar usando o DevMind.ia.\n\nPor favor, adicione sua chave de API nas configurações do servidor.`);
}
