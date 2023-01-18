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

const checkPair = (c1, c2) => {
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
		[5, 18, 31, 44],
		[4, 17, 30, 43],
		[3, 16, 29, 42],
		[2, 15, 28, 41],
	];
	for (var i = 0; i < value.length; i++) {
		if (value[i].includes(c1) && value[i].includes(c2)) return true;
	}
	return false;
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

	var isPlayerDraw = false;
	const player_draw = checkValue(arr[4]);
	const banker_draw = player >= 6 ? checkValue(arr[4]) : checkValue(arr[5]);

	if (player < 6) {
		player = (player + player_draw) % 10;
		isPlayerDraw = true;
	}

	if (banker === 0 || banker === 1 || banker === 2) {
		banker = (banker + banker_draw) % 10;
	} else if (banker === 3) {
		if (isPlayerDraw && player_draw !== 8) {
			banker = (banker + banker_draw) % 10;
		} else if (!isPlayerDraw) {
			banker = (banker + banker_draw) % 10;
		}
	} else if (banker === 4) {
		if (isPlayerDraw) {
			if (player_draw === 2 || player_draw === 3 || player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) {
				banker = (banker + banker_draw) % 10;
			}
		} else {
			banker = (banker + banker_draw) % 10;
		}
	} else if (banker === 5) {
		if (isPlayerDraw) {
			if (player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) {
				banker = (banker + banker_draw) % 10;
			}
		} else {
			banker = (banker + banker_draw) % 10;
		}
	} else if (banker === 6) {
		if (isPlayerDraw) {
			if (player_draw === 6 || player_draw === 7) {
				banker = (banker + banker_draw) % 10;
			}
		}
	}

	/**
	 * 0. Normal tie
	 * 1. Tie with banker pair
	 * 2. Tie with player pair
	 * 3. Tie with banker and player pair
	 * 4. Normal banker win
	 * 5. Banker win with banker pair
	 * 6. Banker win with player pair
	 * 7. Banker win with banker and player pair
	 * 8. Normal player win
	 * 9. Player win with banker pair
	 * 10. Player win with player pair
	 * 11. Player win with banker and player pair
	 */
	let pair_player = checkPair(arr[0], arr[2]);
	let pair_banker = checkPair(arr[1], arr[3]);
	if (player === banker) {
		if (pair_player && pair_banker) return 3;
		else if (pair_player && !pair_banker) {
			return 2;
		} else if (!pair_player && pair_banker) {
			return 1;
		} else return 0;
	} else if (banker > player) {
		if (pair_player && pair_banker) return 7;
		else if (pair_player && !pair_banker) {
			return 6;
		} else if (!pair_player && pair_banker) {
			return 5;
		} else return 4;
	} else if (player > banker) {
		if (pair_player && pair_banker) return 11;
		else if (pair_player && !pair_banker) {
			return 10;
		} else if (!pair_player && pair_banker) {
			return 9;
		} else return 8;
	}
};
