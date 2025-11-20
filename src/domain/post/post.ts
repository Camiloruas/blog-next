/**
 * Interfaces de Tipagem para a Estrutura de Documentos JSON, seguindo o padrão
 * "export type".
 */

// --- Tipos Primitivos Comuns ---

/** Representa uma string de data e hora no formato ISO 8601. */
export type DateString = string;

// --- Estrutura de Conteúdo (Rich Text) ---

/**
 * Representa um nó de texto simples dentro de um bloco de conteúdo.
 */
export type ContentTextNode = {
  /** O texto contido no nó. */
  text: string;
  /** Tipo fixo para nó de texto. */
  type: "text";
};

/**
 * Representa um elemento de bloco de conteúdo (parágrafo, título, etc.).
 */
export type ContentBlock = {
  /** O tipo do bloco (ex: 'paragraph'). Pode incluir outros tipos de rich text. */
  type: "paragraph" | "heading" | "list-item" | string;
  /** Array de nós filhos dentro do bloco (atualmente apenas ContentTextNode). */
  children: ContentTextNode[];
};

// --- Estrutura de Documento (Item de Dados) ---

/**
 * Representa a estrutura de um único item de documento (post, artigo, etc.).
 */
export type DocumentData = {
  /** ID numérico do item. */
  id: number;
  /** ID do documento (string alfanumérica única). */
  documentId: string;
  /** Título do documento. */
  title: string;
  /** Array contendo o conteúdo estruturado do documento. */
  content: ContentBlock[];
  /** Slug amigável do documento. */
  slug: string;
  /** Data e hora de criação (ISO 8601 string). */
  createdAt: DateString;
  /** Data e hora da última atualização (ISO 8601 string). */
  updatedAt: DateString;
  /** Data e hora da publicação (ISO 8601 string). */
  publishedAt: DateString;
};

export type PostData = DocumentData;

// --- Estrutura de Paginação (Meta) ---

/**
 * Representa os detalhes da paginação.
 */
export type PaginationMeta = {
  /** Número da página atual. */
  page: number;
  /** Tamanho máximo da página. */
  pageSize: number;
  /** Contagem total de páginas. */
  pageCount: number;
  /** Número total de itens. */
  total: number;
};

/**
 * Representa a seção de metadados da resposta da API.
 */
export type ResponseMeta = {
  /** Informações de paginação. */
  pagination: PaginationMeta;
};

// --- Estrutura de Resposta Completa ---

/**
 * Representa a estrutura completa da resposta da API que contém os dados e metadados.
 */
export type DocumentResponse = {
  /** O array principal de itens de dados (documentos). */
  data: DocumentData[];
  /** Metadados da resposta, incluindo paginação. */
  meta: ResponseMeta;
};
