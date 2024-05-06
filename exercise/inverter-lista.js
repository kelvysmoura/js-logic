let errorMsg = 'Função aceita apenas array como argumento.';

let originalPush = Array.prototype.push;
let originalReverse = Array.prototype.reverse;
let originalSort = Array.prototype.sort;

export default {
  username: "kelvysmoura",

  title: "Inverter Lista",

  details: `
Invertendo lista.

Para esse desafio você vai precisar criar uma função que seja capaz de receber um array como argumento e retorna esse mesmo array porém na ordem inversa.
Para os casos em que sua função receber um argumento diferente de array, deverá ser retornada uma mensagem de erro.

**Requisitos**
- Criar uma função \`inverterLista\`
- Sua função deve ser capaz de receber pelo menos um argumento
- Quando a função receber como argumento um array, deverá retornar os mesmo array recebido porém na ordem invertida
- Quando a função receber qualquer outro argumento diferente de um array, deverá retornar a frase "${errorMsg}"

**Links que podem ajudar**
- [O que é um array?](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/Arrays)
- [for](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for)
- [Array.isArray](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
`,

  beforeExecute() {
    let msg = 'Não é permitido o uso da função';

    Array.prototype.reverse = function () {
      throw new Error(`${msg} Array.reverse()`);
    }

    Array.prototype.push = function () {
      throw new Error(`${msg} Array.push()`);
    }

    Array.prototype.sort = function () {
      throw new Error(`${msg} Array.sort()`);
    }
  },

  afterExecute() {
    Array.prototype.reverse = originalReverse;
    Array.prototype.push = originalPush;
    Array.prototype.sort = originalSort;
  },

  tests: [
    {
      params: [],
      expect: errorMsg
    },
    {
      params: [["HTML", "CSS", "JS", "ReactJS"]],
      expect: ["ReactJS", "JS", "CSS", "HTML"]
    },
    {
      params: ["array list"],
      expect: errorMsg
    },
    {
      params: [[{ type: 'Frontend' }, { type: 'Backend' }]],
      expect: [{ type: 'Backend' }, { type: 'Frontend' }]
    },
    {
      params: [{}],
      expect: errorMsg
    },
    {
      params: [[]],
      expect: []
    },
    {
      params: [10],
      expect: errorMsg
    },
  ]
}