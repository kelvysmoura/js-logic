import docs from "../src/docs.js";

let errorMsg = 'Argumento inválido!';

export default {
  username: "kelvysmoura",

  title: "Primeira letra maiúscula",

  details: `

Neste desafio você vai receber um texto qualquer e precisará retornar o mesmo texto 
em letras minúsculas mas com a primeira letra de cada palavra maiúscula.

**Requisitos**
- Criar uma função \`primeiraLetraMaiuscula\`
- A função deve ser capaz de receber um texto como argumento e retornar o mesmo texto com todas as letras minusculas
a primera letra de cada palavra em maipusculo
- A função deve retornar a mensagem de erro "${errorMsg}" quando receber um argumento diferente de string

**Links que podem ajudar**
- ${docs.ifelse}
- ${docs.typeof}
- ${docs.split}
- ${docs.map}
- ${docs.join}
- ${docs.slice}

`,

  tests: [
    {
      params: [],
      expect: errorMsg
    },
    {
      params: ["Katchau!"],
      expect: "Katchau!"
    },
    {
      params: [123],
      expect: errorMsg
    },
    {
      params: ["texto em letras maiúsculas"],
      expect: "Texto Em Letras Maiúsculas"
    },
    {
      params: [["Texto"]],
      expect: errorMsg
    },
    {
      params: ["cONTEÚDO de tEXTO"],
      expect: "Conteúdo De Texto"
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