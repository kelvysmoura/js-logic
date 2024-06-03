import docs from "../src/docs.js";

let errorMsg = 'Argumento inválido!';

let originaltoUpperCase = String.prototype.toUpperCase;

const beforeExecute = () => {
  let msg = 'Não é permitido o uso da função';
  String.prototype.toUpperCase = function () {
    throw new Error(`${msg} String.toUpperCase()`);
  }
}

const afterExecute = () => {
  String.prototype.toUpperCase = originaltoUpperCase;
}

export default {
  username: "kelvysmoura",

  title: "Minúsculo para maiúsculo",

  details: `

Neste desafio você vai receber um texto qualquer e precisará retornar o mesmo texto
porém com todas as letras e maiúsculas

**Requisitos**
- Criar uma função \`minusculoParaMaiusculo\`
- A função deve ser capaz de receber um texto como argumento e retornar o mesmo texto com todas as letras maiúsculas.
- A função deve retornar a mensagem de erro "${errorMsg}" quando receber um argumento diferente de string

**Links que podem ajudar**
- ${docs.ifelse}
- ${docs.typeof}
- ${docs.split}
- ${docs.map}
- ${docs.charCodeAt}
- ${docs.fromCharCode}
- ${docs.join}
- ${docs.destructuring}

`,

  beforeExecute,
  afterExecute,
  tests: [
    {
      params: [],
      expect: errorMsg
    },
    {
      params: ["katchau!"],
      expect: "KATCHAU!"
    },
    {
      params: [123],
      expect: errorMsg
    },
    {
      params: ["Texto em letras maiúsculas"],
      expect: "TEXTO EM LETRAS MAIÚSCULAS"
    },
    {
      params: [["Texto"]],
      expect: errorMsg
    },
    {
      params: ["CONTEÚDO DE TEXTO"],
      expect: "CONTEÚDO DE TEXTO"
    },
    {
      params: [{}],
      expect: errorMsg
    },
    {
      params: [false],
      expect: errorMsg
    },
    {
      params: ["0123456789"],
      expect: "0123456789"
    },
    {
      params: [true],
      expect: errorMsg
    }
  ]
}