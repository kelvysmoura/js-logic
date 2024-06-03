function minusculoParaMaiusculo(text) {
	if (typeof text !== 'string') {
		return "Argumento inválido!"
	}

	let textCharCodes = text
		.split('')
		.map(char => {
			let charcode = char.charCodeAt();
			if (
				charcode >= 'à'.charCodeAt() ||
				charcode >= 'a'.charCodeAt() &&
				charcode <= 'z'.charCodeAt()
			) {
				charcode -= 32;
			}
			return charcode

		});

	return String.fromCharCode(...textCharCodes);
}