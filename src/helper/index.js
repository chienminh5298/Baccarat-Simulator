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

export const generateHistory = () => {
	var arr = [];
	for (var i = 0; i < 22; i++) {
		arr.push(new Array(10).fill(''));
	}
	return arr;
};

const checkNature = (c1, c2) => {
	if ((checkValue(c1) + checkValue(c2)) % 10 >= 8) return true;
	return false;
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

export const payout = (arr, result, slot) => {
	var isBankerWin = false;
	var isPlayerWin = false;
	var isTie = false;
	var isBankerPair = false;
	var isPlayerPair = false;

	if (result === 0 || result === 1 || result === 2 || result === 3 || result === 4 || result === 5 || result === 6 || result === 7) isTie = true;
	if (result === 8 || result === 9 || result === 10 || result === 11 || result === 12 || result === 13 || result === 14 || result === 15) isBankerWin = true;
	if (result === 16 || result === 17 || result === 18 || result === 19 || result === 20 || result === 21 || result === 22 || result === 23) isPlayerWin = true;
	if (result === 1 || result === 3 || result === 6 || result === 7 || result === 9 || result === 11 || result === 13 || result === 15 || result === 17 || result === 19 || result === 21 || result === 23) isBankerPair = true;
	if (result === 2 || result === 3 || result === 5 || result === 7 || result === 10 || result === 11 || result === 14 || result === 15 || result === 18 || result === 19 || result === 22 || result === 23) isPlayerPair = true;

	var total = 0;
	for (let i = 0; i < arr.length; i++) {
		let bet = arr[i];
		if (bet !== 0) {
			switch (i) {
				case 0:
				case 5:
				case 10:
				case 15:
				case 20:
					if (isPlayerPair) {
						$(`div[location=${i}]`).addClass('won_effect');
						total += bet * 12;
					}
					break;
				case 2:
				case 7:
				case 12:
				case 17:
				case 22:
					if (isBankerPair) {
						$(`div[location=${i}]`).addClass('won_effect');
						total += bet * 12;
					}
					break;
				case 1:
				case 6:
				case 11:
				case 16:
				case 21:
					if (isTie) {
						$(`div[location=${i}]`).addClass('won_effect');
						total += bet * 9;
					}
					break;
				case 3:
				case 8:
				case 13:
				case 18:
				case 23:
					if (isBankerWin) {
						$(`div[location=${i}]`).addClass('won_effect');
						total += bet * 1.95;
					}
					if (isTie) {
						total += bet;
					}
					break;
				default:
					if (isPlayerWin) {
						$(`div[location=${i}]`).addClass('won_effect');
						total += bet * 2;
					}
					if (isTie) {
						total += bet;
					}
					break;
			}
		}
	}

	return total;
};

export const checkWin = (arr) => {
	var player = (checkValue(arr[0]) + checkValue(arr[2])) % 10;
	var banker = (checkValue(arr[1]) + checkValue(arr[3])) % 10;

	let pair_player = checkPair(arr[0], arr[2]);
	let pair_banker = checkPair(arr[1], arr[3]);
	let natural_player = checkNature(arr[0], arr[2]);
	let natural_banker = checkNature(arr[1], arr[3]);

	if (player >= 8 || banker >= 8) {
		if (player === banker) {
			if (natural_player) {
				if (pair_player && pair_banker) return 7;
				else if (pair_player && !pair_banker) {
					return 5;
				} else if (!pair_player && pair_banker) {
					return 6;
				}
				return 4;
			}
		} else if (banker > player) {
			if (natural_banker) {
				if (pair_player && pair_banker) return 15;
				else if (pair_player && !pair_banker) {
					return 14;
				} else if (!pair_player && pair_banker) {
					return 13;
				}
				return 12;
			}
		} else if (player > banker) {
			if (natural_player) {
				if (pair_player && pair_banker) return 23;
				else if (pair_player && !pair_banker) {
					return 22;
				} else if (!pair_player && pair_banker) {
					return 21;
				}
				return 20;
			}
		}
	}

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
	 * 4. Natural tie
	 * 5. Natural tie player pair
	 * 6. Natural tie banker pair
	 * 7. Natural tie banker and player pair
	 * 8. Normal banker win
	 * 9. Banker win with banker pair
	 * 10. Banker win with player pair
	 * 11. Banker win with banker and player pair
	 * 12. Natural banker win
	 * 13. Natural banker win with banker pair
	 * 14. Natural banker win with player pair
	 * 15. Natural banker win with banker and player pair
	 * 16. Normal player win
	 * 17. Player win with banker pair
	 * 18. Player win with player pair
	 * 19. Player win with banker and player pair
	 * 20. Natural player win
	 * 21. Natural player win with banker pair
	 * 22. Natural player win with player pair
	 * 23. Natural player win with banker and player pair
	 */

	if (player === banker) {
		if (pair_player && pair_banker) return 3;
		else if (pair_player && !pair_banker) {
			return 2;
		} else if (!pair_player && pair_banker) {
			return 1;
		}
		return 0;
	} else if (banker > player) {
		if (pair_player && pair_banker) return 11;
		else if (pair_player && !pair_banker) {
			return 10;
		} else if (!pair_player && pair_banker) {
			return 9;
		}
		return 8;
	} else if (player > banker) {
		if (pair_player && pair_banker) return 19;
		else if (pair_player && !pair_banker) {
			return 18;
		} else if (!pair_player && pair_banker) {
			return 17;
		}
		return 16;
	}
};
