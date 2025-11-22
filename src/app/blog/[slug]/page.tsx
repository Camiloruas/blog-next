// app/blog/[slug]/page.tsx

import LikeButton from "../../../components/LikeButton";
import React from "react";

// --- NOVAS TIPAGENS PARA DADOS ANINHADOS (RELACIONAMENTOS DO STRAPI) ---
interface ImageAttributes {
  url: string;
  alternativeText: string | null;
}

interface Image {
  id: number;
  attributes: ImageAttributes;
}

interface Author {
  // Assumindo que o campo de autor é um componente simples ou uma relação com campo 'name'
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: any[];
  slug: string;
  publishedAt: string; // Adicionado para exibir a data

  // Relações com dados aninhados
  author?: { data: { id: number; attributes: Author } };
  coverImage?: { data: Image };
}

interface PostDetailPageProps {
  params: {
    slug: string;
  };
}
// --------------------------------------------------------

// --- FUNÇÃO DE CONVERSÃO DE CONTEÚDO ---
function renderContent(content: any[]): React.ReactNode {
  if (!content) return null;

  return content.map((block, index) => {
    // Verifica se o bloco é um parágrafo
    if (block.type === "paragraph") {
      // Lógica para extrair texto (e futuro suporte a negrito/italico, que não faremos agora)
      const text = block.children?.[0]?.text || "";

      return (
        <p
          key={index}
          style={{
            marginBottom: "15px",
            lineHeight: "1.6",
            fontSize: "1.1em",
            color: "#333", // Estilização básica
          }}
        >
          {text}
        </p>
      );
    }
    return null;
  });
}
// --------------------------------------------------------

// --- FUNÇÃO DE BUSCA DE DADOS ---
async function getPost(slug: string): Promise<{ data: Post[] }> {
  // 🎯 ATUALIZAÇÃO CRÍTICA: Usamos populate=* para garantir que o Strapi envie
  // os dados de relações (como coverImage e author)
  const API_URL = `http://localhost:1337/api/posts?filters[slug][$eq]=${slug}&populate=*`;

  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar o post detalhado. Verifique o Strapi e o status da rede.");
  }
  return res.json();
}
// --------------------------------------------------------

// --- COMPONENTE PRINCIPAL ---
export default async function PostDetailPage({ params }: PostDetailPageProps) {
  let currentParams = params;

  // CORREÇÃO CRÍTICA (FORÇADA): Para resolver o erro "params is a Promise" no seu ambiente
  try {
    currentParams = await (params as any);
  } catch (e) {
    console.error("Erro ao tentar fazer await em params, usando o objeto original.", e);
  }

  // 1. Acesso Seguro ao Slug
  const slug = currentParams?.slug;

  if (!slug) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>Erro de Roteamento</h1>
        <p>Não foi possível encontrar o slug na URL.</p>
      </main>
    );
  }

  // 2. Chamando a função de busca
  const postResponse = await getPost(slug);

  // 3. Extração do Post
  const postData = postResponse.data?.[0];

  if (!postData) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>Post não encontrado.</h1>
        <p>Verifique as permissões públicas do Strapi ou se o post está publicado.</p>
      </main>
    );
  }

  // Desestruturando o postData
  const { title, content, author, coverImage, publishedAt } = postData;

  // 🎯 EXTRAÇÃO SEGURA DE DADOS RELACIONADOS
  // Autor: Acessa o campo aninhado 'attributes.name'
  const authorName = author?.data?.attributes?.name ?? "Autor Desconhecido";

  // Imagem: Acessa o campo aninhado 'attributes.url'
  const imageUrl = coverImage?.data?.attributes?.url;
  const imageAlt = coverImage?.data?.attributes?.alternativeText ?? title;

  // Data: Formata a data para melhor leitura
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString("pt-BR", { dateStyle: "long" }) : "Data Desconhecida";

  // Assumindo um valor inicial para os likes
  const initialLikes = 12;

  // 4. Renderização do conteúdo com estilização e metadados
  return (
    <main
      style={{
        padding: "30px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* 5. Metadados do Post */}
      <div
        style={{
          fontSize: "1em",
          color: "#666",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0 }}>
          Por: <strong>{authorName}</strong>
        </p>
        <p style={{ margin: 0 }}>Publicado em: <span suppressHydrationWarning>{formattedDate}</span></p>
      </div>

      {/* Título do Post */}
      <h1
        style={{
          fontSize: "2.5em",
          marginBottom: "15px",
          color: "#1a1a1a",
          lineHeight: "1.2",
        }}
      >
        {title}
      </h1>

      {/* Imagem de Capa (se existir) */}
      {imageUrl && (
        <div style={{ marginBottom: "30px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          {/* O Strapi geralmente serve a partir do root (/) ou /uploads/ */}
          <img src={`http://localhost:1337${imageUrl}`} alt={imageAlt} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      )}

      {/* Botão de Like (Client Component) */}
      <div style={{ margin: "20px 0", borderBottom: "1px solid #ddd", paddingBottom: "20px" }}>
        <LikeButton initialLikes={initialLikes} />
      </div>

      {/* Conteúdo do Artigo */}
      <div style={{ marginTop: "30px" }}>{renderContent(content)}</div>
    </main>
  );
}
