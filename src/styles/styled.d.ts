// Este é um arquivo de "Declaração de Tipos" do TypeScript (identificado por .d.ts).
// Ele não contém código que executa, mas sim "informações de tipo" para ajudar o TypeScript.

// Importa a declaração de tipos original do styled-components.
import 'styled-components';
// Importa nosso objeto 'theme' para que possamos extrair o tipo dele.
import { theme } from './theme';

// Aqui, estamos inferindo (descobrindo) o tipo do nosso objeto 'theme'.
// O 'Theme' (com 'T' maiúsculo) se torna um tipo que tem exatamente a mesma "forma" do nosso objeto.
type Theme = typeof theme;

// O 'declare module' permite "aumentar" ou "estender" um módulo que já existe.
// Estamos dizendo ao TypeScript: "Ei, eu quero adicionar algo ao módulo 'styled-components'".
declare module 'styled-components' {
  // Dentro do módulo, estamos estendendo a interface 'DefaultTheme'.
  // O styled-components usa essa interface para saber como é o objeto 'theme'.
  // Ao estendê-la com o nosso tipo 'Theme', o TypeScript passa a saber que nosso tema
  // tem propriedades como 'colors' e 'font', ativando o autocomplete e a verificação de tipos.
  export interface DefaultTheme extends Theme {}
}
