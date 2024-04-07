let errorMsg = 'Função aceita apenas string como argumento!';

export default {
  username: "kelvysmoura",

  title: "Hello world",
  
  details: `
          Desafio incial para entender a dinâmica do jogo.

          Requisitos
          - Criar uma função com o nome \`helloWorld\`
          - Quando função não receber nenhum argumento deve retornar a frase "Hello World!"
          - Quando a função receber um argumento deve retornar uma frase iniciando com a palavra "Hello" e terminando com o argumento recebido mais um sinal de exclamação.
          - Nos casos em que o argumento passado não for do tipo texto, a função deve retornar a frase "Função aceita apenas string como argumento!"
          - A função deve retorna uma string com a frase "Hello World!"
  `,
  tests: [
    {
      params: [],
      expect: "Hello World!"
    },
    {
      params: ["Dev"],
      expect: "Hello Dev!"
    },
    {
      params: [10],
      expect: errorMsg
    },
    {
      params: [[]],
      expect: errorMsg
    },
    {
      params: [{}],
      expect: errorMsg
    },
    {
      params: [null],
      expect: errorMsg
    },
    {
      params: [undefined],
      expect: "Hello World!"
    }
    ,
    {
      params: [true],
      expect: errorMsg
    },
    {
      params: [false],
      expect: errorMsg
    } ]
}
