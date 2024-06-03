import docs from "../src/docs.js";

let getDate = Date.prototype.getDate;
let getMonth = Date.prototype.getMonth;
let getFullYear = Date.prototype.getFullYear;
let override = true;


export default {
  username: "kelvysmoura",

  title: "Data atual",

  details: `

Neste desafio você vai precisando retornar a data atual no formato dd/mm/aaaa 
(dia/mês/ano), usando uma instância de de Date.

**Requisitos**
- Criar uma função \`dataAtual\`
- A função deve ser capaz de retornar a data atual no formato dd/mm/aaaa (dia/mês/ano)
- A função deve ter pelo menos uma instância de Date
- A função deve chamar pelo menos uma vez as seguintes funções de Date
    - getDate()
    - getMonth()
    - getFullYear()
- Os dias e meses menores 10 devem iniciar com o um 0 (zero) na frente

**Links que podem ajudar**
- ${docs.newDate}
- ${docs.getDate}
- ${docs.getMonth}
- ${docs.getFullYear}

`,
  expectFunctions: [],

  beforeExecute() {
    this.expectFunctions = [
      getDate.name,
      getMonth.name,
      getFullYear.name
    ];

    Date.prototype.getDate = () => {
      if (override) {
        this.expectFunctions = this.expectFunctions
          .filter(func => func !== getDate.name)
      }

      return getDate.call(new Date());
    }

    Date.prototype.getMonth = () => {
      if (override) {
        this.expectFunctions = this.expectFunctions
          .filter(func => func !== getMonth.name)
      }

      return getMonth.call(new Date());
    }

    Date.prototype.getFullYear = () => {
      if (override) {
        this.expectFunctions = this.expectFunctions
          .filter(func => func !== getFullYear.name)
      }

      return getFullYear.call(new Date());
    }
  },

  exceptionDispatcher() {
    this.expectFunctions.forEach(func => {
      throw new Error(`É obrigatório o uso da função ${func}()`);
    })
  },

  tests: [
    {
      params: [],
      expect() {
        override = false;

        let date = new Date();
        let day = date.getDate()
        let month = date.getMonth()

        day = Number(day) > 9 ? day : `0${day}`;
        month = Number(month) > 9 ? month : `0${month}`;

        override = true;

        return `${day}/${month}/${date.getFullYear()}`;
      }
    }
  ]
}