import React from 'react';

function ChatBox() {
  const handlePrompt = (type) => {
    let prompt = '';
    if (type === 'game') prompt = 'Crie uma ideia de jogo completa com história, personagens e mecânicas.';
    else if (type === 'app') prompt = 'Descreva um app inovador e útil que ainda não existe.';
    else if (type === 'character') prompt = 'Crie um personagem completo para um jogo (nome, aparência, habilidades).';
    else if (type === 'ui') prompt = 'Sugira a interface de um jogo/app com base em uma ideia criativa.';

    window.open(`https://chat.openai.com/?prompt=${encodeURIComponent(prompt)}`, '_blank');
  };

  return (
    <div className="chat-box">
      <button onClick={() => handlePrompt('game')}>🎮 Criar Jogo</button>
      <button onClick={() => handlePrompt('app')}>📱 Criar App</button>
      <button onClick={() => handlePrompt('character')}>👤 Criar Personagem</button>
      <button onClick={() => handlePrompt('ui')}>🎨 Sugerir Visual</button>
    </div>
  );
}

export default ChatBox;