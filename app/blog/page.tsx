// app/blog/page.tsx

import Link from "next/link";
import React from "react";

// --- INTERFACES (Tipagem para TypeScript) ---
interface ContentBlock {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

interface Post {
  id: number;
  title: string;
  content: ContentBlock[];
  // 🎯 CORREÇÃO 1: Adicionando o slug na interface para que ele exista!
  slug: string;
}

// --- FUNÇÃO DE BUSCA DE DADOS ---
async function getPosts(): Promise<{ data: Post[] }> {
  // 🎯 CORREÇÃO 2: Garantindo que o Strapi envie o SLUG e o TITLE (usando 'fields')
  // Se o seu Strapi não envia o slug por padrão, devemos forçar a busca dele aqui.
  // Note que se você não precisa do 'content' na lista, o Strapi deve retornar apenas os campos básicos.
  const FIELDS_TO_FETCH = "fields[0]=title&fields[1]=slug";

  const API_URL = `http://localhost:1337/api/posts?${FIELDS_TO_FETCH}`;

  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Erro na API Strapi: ${res.status} - ${res.statusText}`);
    throw new Error("Falha ao buscar os dados do blog. Verifique o Strapi e as Permissões.");
  }

  return res.json();
}

// Função auxiliar para extrair um resumo do conteúdo rico do Strapi
function getSummary(content: ContentBlock[]): string {
  // ATENÇÃO: Se o 'content' não for buscado na API (por causa do fields), ele pode vir vazio/indefinido
  if (!Array.isArray(content) || content.length === 0) return "Clique para ler o artigo completo.";

  // Encontra o primeiro bloco de parágrafo que tem texto e retorna um resumo.
  for (const block of content) {
    if (block.type === "paragraph" && block.children?.[0]?.text) {
      return block.children[0].text.substring(0, 150) + "...";
    }
  }

  return "Clique para ler o artigo completo.";
}

// --- COMPONENTE PRINCIPAL ---
export default async function BlogPage() {
  const postsResponse = await getPosts();
  const posts: Post[] = postsResponse.data ?? [];

  return (
    <main style={{ padding: "20px" }}>
      <h1>Conteúdo do Blog (Lista de Posts)</h1>

      {posts.length > 0 ? (
        <section>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                border: "1px solid #ccc",
                margin: "15px 0",
                padding: "10px",
                borderRadius: "8px",
                // Estilo para o cursor indicar que é clicável
                cursor: "pointer",
              }}
            >
              {/* 🎯 CORREÇÃO 3: O Link agora usa o post.slug que deve ter vindo da API */}
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "#0070f3" }}>
                <h2>{post.title}</h2>

                {/* O summary agora é mais seguro, pois sabemos que 'content' pode estar vazio */}
                <p style={{ color: "#333" }}>{getSummary(post.content)}</p>

                <span style={{ fontSize: "0.8em", color: "#888" }}>Clique para ler o artigo completo.</span>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <p>Ainda não há posts publicados, a resposta da API está vazia ou as permissões estão incorretas.</p>
      )}
    </main>
  );
}
