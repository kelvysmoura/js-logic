function dataAtual() {
  let date = new Date();

  let day = date.getDate()
  day = Number(day) > 9 ? day : `0${day}`;

  let month = date.getMonth()
  month = Number(month) > 9 ? month : `0${month}`;

  return `${day}/${month}/${date.getFullYear()}`
}