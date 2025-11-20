// src/lib/Registry.tsx
"use client"; // IMPORTANTE: Este componente deve ser um Client Component

import React, { useState, ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  // Cria uma nova folha de estilo por solicitação para o SSR
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  // Hook que injeta o CSS coletado pelo servidor no <head> do HTML
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.seal(); // Finaliza a coleta
    return <>{styles}</>;
  });

  // Envolve o conteúdo com o gerenciador de estilos
  return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>;
}
