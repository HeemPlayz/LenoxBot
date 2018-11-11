function generateKey() {
	const tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
	let keyOut = '';

	// segments
	for (let i = 0; i < 5; i++) {
		for (let y = 0; y < 4; y++) {
			const random = Math.floor((Math.random() * 35) + 1);
			const char = tokens.charAt(random);
			keyOut += char;
		}

		if (i !== 4) {
			keyOut += '-';
		}
	}

	return keyOut;
}

exports.generateKey = generateKey;
