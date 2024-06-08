function primeiraLetraMaiuscula(text) {
    if (typeof text !== 'string') {
        return 'Argumento inválido!';
    }

    text = text.toLowerCase().split(' ');
    return text.map(word => {
        first = word.slice(0, 1);
        return `${first.toUpperCase()}${word.slice(1)}`
    }).join(' ');
}