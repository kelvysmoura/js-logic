
let MDConverter;

function create() {
  if(!MDConverter) {
    MDConverter = new showdown.Converter();
  }
}

export default {

  toHtml(text) {
    create()
    return MDConverter.makeHtml(text);
  },

  trimStartLines(text) {
    return text.split("\n")
      .map(item => item.trimStart())
      .join('\n')
  }

}