// src/components/LikeButton.tsx
'use client'; // <--- A LINHA MÁGICA!

import React, { useState } from 'react';

// 1. O componente é um Client Component porque usa 'useState'
export default function LikeButton({ initialLikes }: { initialLikes: number }) {

  // 2. Usando o estado interno para rastrear as curtidas
  const [likes, setLikes] = useState(initialLikes);

  // 3. Função que será executada no navegador (onClick)
  const handleLike = () => {
    setLikes(likes + 1);
    // Em um projeto real, aqui você faria uma requisição para o Strapi atualizar o contador
  };

  return (
    <button 
      onClick={handleLike} 
      style={{ 
        padding: '10px 20px', 
        backgroundColor: '#0070f3', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
      }}
    >
      ❤️ Curtir ({likes})
    </button>
  );
}