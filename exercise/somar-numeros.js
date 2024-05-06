
let errorMsg = "Função aceita apenas números ou valores que podem ser convertidos em números.";

export default {
  username: "kelvysmoura",

  title: "Somar números",
  
  details: `
Neste desafio você vai criar uma função capaz de receber dois argumentos e retornar a soma entre eles. Também vai precisar fazer validações para garantir que está somando parâmetros do tipo numérico ou de outros tipos que podem ser convertidos em números.

Você vai precisar saber
- [Number](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Number.isNaN()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
- [if...else](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/if...else)

Requisitos
- Criar uma função com o nome \`somarNumeros\`
- Quando a função for executada com dois argumentos do tipo numérico, deve ser retornado a soma entre os argumentos
- A função deve ser capaz de fazer soma entre números positivos, negativos, inteiros e decimais
- A função deve ser capaz de fazer soma entre números que chegam como string e garantir que vai retornar um número e não uma string concatenada
- Quando um dos parâmetros não puder ser convertidos para um tipo numérico, a função deve retornar a mensagem: 
\`"Função aceita apenas números ou valores que podem ser convertidos em números."\`
`,
  tests: [
    {
      params: [],
      expect: errorMsg
    },
    {
      params: [10, 10],
      expect: 20
    },
    {
      params: [-10, +5],
      expect: -5
    },
    {
      params: [5.7, 6],
      expect: 11.7
    },
    {
      params: ["50", 45],
      expect: 95
    },
    {
      params: ["texto com numero 2"],
      expect: errorMsg
    },
    {
      params: [true, false],
      expect: 1
    }
    ,
    {
      params: [0, 0],
      expect: 0
    },
    {
      params: [{}, []],
      expect: errorMsg
    }, 
    {
      params: [[], {}],
      expect: errorMsg
    },
    {
      params: ['a', 'b'],
      expect: errorMsg
    },
    {
      params: [1, []],
      expect: errorMsg
    },
    {
      params: [{}, 10],
      expect: errorMsg
    },
  ]
}
