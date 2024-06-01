let errorMsg = 'Data inválida!';

export default {
  username: "kelvysmoura",

  title: "Converter data BR para ISO",

  details: `

Os bancos de dados geralmente guardam as datas no forma [ISO 8601](https://pt.wikipedia.org/wiki/ISO_8601), 
que é o padrão \`aaaa-mm-dd\` (ano-mês-dia).
Então quando pegamos uma informações de data do banco precisamos converter para o padrão brasileiro que é 
\`dd/mm/aaaa\` (dia/mês/ano), e quando precisamos salvar uma data no banco convertemos do padrão brasileiro
para o padrão ISO 8601.

Neste desafio você vai precisar criar um função que recebe uma data no formato BR e devolve a mesma
data no formato ISO.

**Requisitos**
- Criar uma função \`converterDataParaIso\`
- A função deve ser capaz de receber um argumento string no formato de data BR e devolver o mesmo valor no formato de data ISO
- Quando a função receber como argumento um valor que não está no padrão BR, deverá retornar a mensagem de erro "${errorMsg}"

**Links que podem ajudar**
- [typeof](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/typeof)
- [Array.split](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [Array.reverse](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [Array.join](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
`,

  beforeExecute() {
  },

  afterExecute() {
  },

  tests: [
    {
      params: [],
      expect: errorMsg
    },
    {
      params: ["12/09/2024"],
      expect: "2024-09-12"
    },
    {
      params: ["2024/09"],
      expect: errorMsg
    },
    {
      params: ["09/13"],
      expect: errorMsg
    },
    {
      params: ["13/09/2024"],
      expect: "2024-09-13"
    },
    {
      params: ["22/09/13"],
      expect: errorMsg
    },
    {
      params: ["2020-09/13"],
      expect: errorMsg
    },
    {
      params: ["13-09-2024"],
      expect: errorMsg
    },
    {
      params: ["data"],
      expect: errorMsg
    },
    {
      params: [123],
      expect: errorMsg
    },
    {
      params: [{}],
      expect: errorMsg
    },
    {
      params: [[]],
      expect: errorMsg
    },
    {
      params: [true],
      expect: errorMsg
    },
    {
      params: [false],
      expect: errorMsg
    }
  ]
}