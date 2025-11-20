// 'use client' indica que este é um Componente de Cliente.
// É uma boa prática marcar componentes que usam qualquer tipo de interatividade
// ou hooks do React (mesmo que aqui não estejamos usando hooks complexos).
'use client'

// Importa a função 'styled' da biblioteca styled-components.
import styled from 'styled-components'

// Aqui estamos criando um componente chamado 'Wrapper' que será renderizado como uma tag <main> no HTML.
// Os estilos dentro das crases (``) são aplicados a essa tag.
export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 3rem;
`

// Cria um componente 'Title' que será renderizado como um <h1>.
export const Title = styled.h1`
  font-size: 4rem;
  /*
    Aqui está a mágica do ThemeProvider!
    A função que recebe o objeto 'theme' como argumento nos permite acessar
    as propriedades do tema que definimos (como cores e fontes).
    Isso é injetado pelo componente <ThemeProvider> que está no nosso layout.
  */
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
`

// Cria um componente 'Description' que será renderizado como um <p>.
export const Description = styled.p`
  font-size: 2rem;
`
