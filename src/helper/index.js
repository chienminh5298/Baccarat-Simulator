function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export const generateCard = () => {
	var card = [];
	for (var i = 1; i <= 4; i++) {
		for (var j = 1; j <= 52; j++) {
			card.push(j);
		}
	}
	return shuffle(card);
};

export const checkValue = (num) => {
	const value = [
		[1, 14, 27, 40],
		[13, 26, 39, 52],
		[12, 25, 38, 51],
		[11, 24, 37, 50],
		[10, 23, 36, 49],
		[9, 22, 35, 48],
		[8, 21, 34, 47],
		[7, 20, 33, 46],
		[6, 19, 32, 45],
		[2, 3, 4, 5, 15, 16, 17, 18, 28, 29, 30, 31, 41, 42, 43, 44],
	];
	for (var i = 0; i < value.length; i++) {
		if (value[i].includes(num)) return i + 1;
	}
};

export const checkWin = (arr) => {
	var player = (checkValue(arr[0]) + checkValue(arr[2])) % 10;
	var banker = (checkValue(arr[1]) + checkValue(arr[3])) % 10;
	if (player === 8 || player === 9 || banker === 8 || banker === 9) {
		if (player === banker) return 0;
		else if (banker > player) return -1;
		else return 1;
	} else if (player >= 6 && banker >= 6) {
		if (player === banker) return 0;
		else if (banker > player) return -1;
		else return 1;
	}

	const player_draw = checkValue(arr[4]);
	const banker_draw = player >= 6 ? checkValue(arr[4]) : checkValue(arr[5]);

	player = player < 6 ? (player + player_draw) % 10 : player;

	if (banker === 0 || banker === 1 || banker === 2) {
		banker = (banker + banker_draw) % 10;
	} else if (banker === 3 && player_draw !== 8) {
		banker = (banker + banker_draw) % 10;
	} else if (banker === 4) {
		if (player_draw === 2 || player_draw === 3 || player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) {
			banker = (banker + banker_draw) % 10;
		}
	} else if (banker === 5) {
		if (player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) {
			banker = (banker + banker_draw) % 10;
		}
	} else if (banker === 6) {
		if (player_draw === 6 || player_draw === 7) {
			banker = (banker + banker_draw) % 10;
		}
	}

	if (player === banker) return 0;
	else if (banker > player) return -1;
	else return 1;
};
