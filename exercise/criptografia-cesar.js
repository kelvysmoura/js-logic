let errorMsg = "Função aceita apenas strings e números.";

export default {
  username: "jacogois ",

  title: "Criptografia de César",

  details: `
        A Criptografia de César é uma das técnicas de criptografia mais simples e antigas conhecidas, datando dos tempos do antigo Império Romano. É um tipo de criptografia por substituição, na qual cada letra do texto é substituída por outra letra que se apresenta no alfabeto abaixo dela um número fixo de vezes.

        Por exemplo, com um deslocamento (ou "shift") de 1, 'A' seria substituído por 'B', 'B' se tornaria 'C', 'Z' se tornaria 'A', e assim por diante. O número de posições que cada letra é deslocada é determinado pelo parâmetro de deslocamento fornecido.

        ### Implementação da Criptografia de César

        **1. Requisitos da Função**
           - A função deve receber dois argumentos: uma string para ser cifrada e um número representando o deslocamento.
           - Deve retornar a string cifrada usando a criptografia de César.
           - Deve preservar a capitalização das letras.
           - Caracteres não alfabéticos não devem ser modificados.
           - Se um argumento não for uma string ou o deslocamento não for um número, a função deve retornar uma mensagem de erro:
           \`"Função aceita apenas strings e números."\`

           **2. Processo de Cifragem**
           - Para cada caractere na string fornecida:
             - Se o caractere é uma letra do alfabeto, determina-se seu índice no alfabeto.
             - Aplica-se o deslocamento a esse índice.
             - Se o índice resultante estiver fora dos limites do alfabeto, ajusta-se o índice para que ele caiba no intervalo válido.
             - Substitui-se o caractere pela letra correspondente ao novo índice no alfabeto.

        **3. Exemplo**
           - Com uma string "HELLO" e um deslocamento de 3, "H" seria substituído por "K", "E" seria substituído por "H", e assim por diante, resultando em "KHOOR".
        
        **4. Você vai precisar saber**
        - [typeof](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/typeof)
        - [if...else](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/if...else)
        - [for](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for)
        - [String.indexOf()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
        - [String.toUpperCase()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
        - [String.toLowerCase()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
        - [String.length](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/length)
        - [isNaN()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/isNaNj)
    `,

  tests: [
    {
      params: [],
      expect: errorMsg,
    },
    {
      params: ["ABC", 1],
      expect: "BCD",
    },
    {
      params: ["XYZ", 1],
      expect: "YZA",
    },
    {
      params: ["Hello, World!", 5],
      expect: "Mjqqt, Btwqi!",
    },
    {
      params: ["Testando 123", 3],
      expect: "Whvwdqgr 123",
    },
    {
      params: [123, "Testando"],
      expect: errorMsg,
    },
    {
      params: ["Testando", "abc"],
      expect: errorMsg,
    },
    {
      params: [{}, 5],
      expect: errorMsg,
    },
  ],
};
