let errorMsg = 'Função aceita apenas número inteiro positivo como argumento.';

export default {
  username: "kelvysmoura",

  title: "Fatorial",

  details: `
No desafio fatorial você vai precisar criar uma função que seja capaz de fazer um cálculo fatorial com o número
recebido como argumento. A função também deve retornar uma mensagem de erro quando o argumento não estiver correto.

**Requisitos**
- Criar uma função \`fatorial\`
- Sua função deve ser capaz de receber um número inteiro positivo como argumento e retornar o cálculo fatorial desse número
- Quando a função receber como argumento qualquer outro valor diferente de um número inteiro positivo, deve retornar a mensagem de erro ${errorMsg}

**Links que podem ajudar**
- [while](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/while)
- [do...while](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/do...while)
- [for](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for)
- [Number.isInterger](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
- [Condicionais](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Building_blocks/conditionals)
`,

  beforeExecute() { },

  afterExecute() { },

  tests: [
    {
      params: [],
      expect: errorMsg
    },
    {
      params: [5],
      expect: 120
    },
    {
      params: ["3"],
      expect: errorMsg
    },
    {
      params: [0],
      expect: 1
    },
    {
      params: [{}],
      expect: errorMsg
    },
    {
      params: [1],
      expect: 1
    },
    {
      params: [[]],
      expect: errorMsg
    },
    {
      params: [-2],
      expect: errorMsg
    },
    {
      params: ["texto"],
      expect: errorMsg
    }
  ]
}