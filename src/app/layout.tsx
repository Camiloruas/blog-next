// Importações de tipos e fontes do Next.js
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Importa nosso Registry, que é o componente que configura o Styled Components para o Next.js
import StyledComponentsRegistry from '../lib/registry';

// A fonte 'Inter' do Google Fonts, otimizada pelo Next.js
const inter = Inter({ subsets: ['latin'] });

// 'metadata' é um objeto especial do Next.js.
// As informações que você coloca aqui (como title e description)
// são usadas para o SEO da página, aparecendo na aba do navegador e nos resultados de busca.
export const metadata: Metadata = {
  title: 'Blog Next',
  description: 'Um blog criado com Next.js',
};

// Este é o Layout Principal da sua aplicação.
// Todas as páginas serão renderizadas dentro deste componente.
// O 'children' é o conteúdo da página atual que está sendo exibida.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // A tag <html> com o idioma definido para português do Brasil.
    <html lang="pt-BR">
      {/* A tag <body> com a classe da fonte 'Inter' aplicada. */}
      <body className={inter.className}>
        {/*
          O StyledComponentsRegistry é o nosso "Provedor de Estilos".
          Ele envolve toda a aplicação para garantir que o Styled Components funcione
          corretamente com a renderização no servidor do Next.js.
        */}
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
