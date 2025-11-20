// A diretiva 'use client' é necessária porque `createGlobalStyle` pode injetar
// estilos dinamicamente no lado do cliente.
"use client";

// Importa a função `createGlobalStyle` do styled-components
import { createGlobalStyle } from "styled-components";

// `createGlobalStyle` é uma função que cria um componente especial
// que, quando renderizado, injeta os estilos dentro dele globalmente na página.
const GlobalStyles = createGlobalStyle`
  /*
    Isto é um "CSS Reset".
    Navegadores diferentes têm estilos padrão diferentes para os elementos HTML.
    O reset remove essas inconsistências, zerando margens, preenchimentos, etc.
    Isso garante que sua estilização comece de uma base limpa e consistente.
  */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // Define o tamanho da fonte base no HTML para facilitar o uso de 'rem'.
  // Com 62.5%, 1rem se torna igual a 10px (16px * 0.625 = 10px),
  // o que torna os cálculos mais fáceis (ex: 2.4rem = 24px).
  html {
    font-size: 62.5%;
  }

  // Define uma fonte padrão para o corpo do documento.
  // Aqui, estamos acessando o tema que foi provido pelo ThemeProvider.
  // Isso mostra como até os estilos globais podem usar as variáveis do seu tema.
  body {
    font-family: ${({ theme }) => theme.font.family};
    background: yellow;
  }
`;

// Exporta o componente de estilos globais para ser usado no layout principal.
export default GlobalStyles;
