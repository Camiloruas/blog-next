// A diretiva 'use client' é essencial aqui.
// Ela diz ao Next.js que este é um "Componente de Cliente",
// o que nos permite usar hooks do React (como useState e useServerInsertedHTML)
// e gerenciar o estado no lado do cliente.
'use client'

// Importações do React e do Next.js
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'

// Importações do Styled Components e do nosso tema/estilos globais
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';

// Este é o componente Registry, que funciona como nosso Provedor de Estilos.
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // O 'useState' aqui cria uma "folha de estilos" (StyleSheet) do Styled Components.
  // Isso é feito de forma "preguiçosa" (lazy), para que seja criado apenas uma vez.
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  // Este hook do Next.js é a mágica para a renderização no servidor (SSR).
  // Ele "pega" todos os estilos que foram gerados no servidor...
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    // ...e "limpa" a folha de estilos para a próxima renderização.
    styledComponentsStyleSheet.instance.clearTag()
    // Por fim, ele injeta os estilos coletados diretamente no HTML enviado ao navegador.
    return <>{styles}</>
  })

  // O StyleSheetManager e o ThemeProvider são "provedores de contexto".
  // Eles disponibilizam o tema e a capacidade de gerenciar estilos para todos os
  // componentes filhos (o 'children').
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}
