
let errorMsg = "Função aceita apenas números inteiros positivos";

export default {
  username: "kelvysmoura",

  title: "Somar ímpares",

  details: `
Para esse desafio você vai precisar criar uma função capaz de receber como argumento um número inteiro positivo e retornar a soma de todos os números ímpares entre 1 e o argumento recebido.

###### Links que podem ajudar
- [for](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for)
- [Remainder](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
- [Addition assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment)
- [if...else](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/if...else)
- [Number.isInteger()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)

###### Requisitos
- Criar uma função com o nome \`somarImpares\`
- A função deve ser capaz de somar todo os números ímpares entre 1 e o número recebido como argumento
- A mensagem de erro "${errorMsg}" deve ser retornada quando:
  - A função receber como argumentos tipos diferentes de *string* e *number*
  - A função receber como argumento um valor negativo ou igual a 0
  - A função receber como argumento um valor que não pode ser convertido para o tipo number
  - A função receber como argumento um valor decimal
`,
  tests: [
    {
      params: [],
      expect: errorMsg
    },
    {
      params: [100],
      expect: 2500
    },
    {
      params: [-50],
      expect: errorMsg
    },
    {
      params: [null],
      expect: errorMsg
    },
    {
      params: [2.75],
      expect: errorMsg
    },
    {
      params: [0],
      expect: errorMsg
    },
    {
      params: ["10"],
      expect: 25
    },
    {
      params: ["15 números"],
      expect: errorMsg
    },
    {
      params: [[]],
      expect: errorMsg
    },
    {
      params: [{}],
      expect: errorMsg
    }
  ]
}
