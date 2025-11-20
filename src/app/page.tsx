// Importa os componentes estilizados.
import { Wrapper, Title, Description } from '../components/Main';
// Importa a tipagem dos posts e da resposta da API.
import { PostData, DocumentResponse } from '../domain/post/post';

/**
 * Função para buscar os posts da API Strapi.
 * @returns {Promise<PostData[]>} Uma promessa que resolve para um array de posts.
 */
const getPosts = async (): Promise<PostData[]> => {
  const response = await fetch('http://localhost:1337/api/posts', { cache: 'no-store' });
  // O Strapi v4+ encapsula a resposta em um objeto 'data'.
  const jsonResponse: { data: PostData[] } = await response.json();
  return jsonResponse.data;
};

// Este é o componente da Página Inicial (rota "/"), agora como um Server Component.
export default async function Home() {
  // Busca os dados no servidor.
  const posts = await getPosts();

  return (
    <Wrapper>
      {/* Mapeia e renderiza os posts */}
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}

      <Title>Blog com Next.js</Title>
      <Description>
        Um boilerplate para começar a programar com Next.js e Styled Components.
      </Description>
    </Wrapper>
  );
}
