import React, { useState, useEffect } from 'react';

import '../scss/table.scss';
import chip1 from './image/chip1.png';
import chip2 from './image/chip2.png';
import chip3 from './image/chip3.png';
import { generateCard, checkValue, checkWin } from 'src/helper';

const Table = ({ currentBet = 5 }) => {
	var [activeSlot, setActiveSlot] = useState(1);
	var [isBetTime, setIsBetTime] = useState(true);
	var [betTime, setBetTime] = useState(5);
	var [betArr, setBetArr] = useState(new Array(25).fill(0));
	var [cardArr, setCardArr] = useState(generateCard());
	var [result, setResult] = useState(0);
	function flop(i, animation) {
		setTimeout(() => {
			var location = $(`#location_card_${i}`).position();
			$(`#card_${i}`).css({
				transform: 'none',
				left: animation === 'cardRotate' ? location.left : location.left + 5,
				top: location.top,
				transition: '2s',
				animation: `${animation} 1s linear forwards`,
			});
		}, 500 * i);
	}
	var renderResult = () => {
		if (result === 0) {
			return (
				<div id='result' className='tie'>
					<span>TIE</span>
				</div>
			);
		} else if (result === -1) {
			return (
				<div id='result' className='bankerWin'>
					<span>BANKER WIN</span>
				</div>
			);
		}
		return (
			<div id='result' className='playerWin'>
				<span>PLAYER WIN</span>
			</div>
		);
	};

	useEffect(() => {
		var interval = setInterval(() => {
			if (betTime === 0) {
				clearInterval(interval);
				// setIsBetTime(false);
				$('#show_time').toggleClass('d-none');
				for (var i = 1; i <= 4; i++) {
					flop(i, 'cardRotate');
				}
				/** prevent cheating */
				$('#card_1').html(`<img src='./image/card/${cardArr[0]}.png' alt='card' />`);
				$('#card_2').html(`<img src='./image/card/${cardArr[1]}.png' alt='card' />`);
				$('#card_3').html(`<img src='./image/card/${cardArr[2]}.png' alt='card' />`);
				$('#card_4').html(`<img src='./image/card/${cardArr[3]}.png' alt='card' />`);
				if ((checkValue(cardArr[0]) + checkValue(cardArr[2])) % 10 >= 6) {
					$('#card_6').html(`<img src='./image/card/${cardArr[4]}.png' alt='card' />`);
				} else {
					$('#card_5').html(`<img src='./image/card/${cardArr[4]}.png' alt='card' />`);
					$('#card_6').html(`<img src='./image/card/${cardArr[5]}.png' alt='card' />`);
				}

				var player = (checkValue(cardArr[0]) + checkValue(cardArr[2])) % 10;
				var banker = (checkValue(cardArr[1]) + checkValue(cardArr[3])) % 10;
				const player_draw = checkValue(cardArr[4]);
				const banker_draw = player >= 6 ? checkValue(cardArr[4]) : checkValue(cardArr[5]);

				if (banker < 8 && player < 8) {
					if (player < 6) flop(5, 'hitcardRotate');
					if (banker === 0 || banker === 1 || banker === 2 || (banker === 3 && player_draw !== 8)) flop(6, 'hitcardRotate');
					else if (banker === 4) {
						if (player_draw === 2 || player_draw === 3 || player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) flop(6, 'hitcardRotate');
					} else if (banker === 5) {
						if (player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) flop(6, 'hitcardRotate');
					} else if (banker === 6) {
						if (player_draw === 6 || player_draw === 7) flop(6, 'hitcardRotate');
					}
					setTimeout(() => {
						$('#result').css('display', 'block');
					}, 5500);
				} else {
					setTimeout(() => {
						$('#result').css('display', 'block');
					}, 4500);
				}

				setResult(checkWin(cardArr.slice(0, 6)));

				cardArr.splice(0, 6);
				setCardArr(cardArr);
				setTimeout(() => {}, 1000);
			} else {
				setBetTime(betTime - 1);
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [betTime]);

	useEffect(() => {
		if (isBetTime) {
			$(`.choose_slot`).removeClass('d-none');
			$(`.player_slot`).removeClass('active');
			$(`.choose_slot:nth-child(${activeSlot})`).addClass('d-none');
			$(`.player_slot:nth-child(${activeSlot})`).addClass('active');
			/**clear chip on table when change slot */
			setBetArr(new Array(25).fill(0));
			$('.bet_chips').html(`<div className='bet_chips'></div>`);
		}
	}, [activeSlot]);

	function handleBetChip(slot, location) {
		if (activeSlot === slot && isBetTime) {
			let chipPath = chip1;
			let temp = betArr[location] + currentBet;
			if (temp > 5 && temp < 100) chipPath = chip2;
			else if (temp >= 100) chipPath = chip3;

			$(`.play_container div[location=${location}] .bet_chips`).html(`<img src='${chipPath}' alt='bet chip' />
			<span className='show_bet_chip'>${temp}</span>`);

			let newArr = [...betArr];
			newArr[location] = temp;
			setBetArr(newArr);
		}
	}

	return (
		<div id='table_container'>
			<div id='player_slot_container'>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div
								className='player_pair pair onActive'
								location={0}
								onClick={() => {
									handleBetChip(1, 0);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='tie onActive'
								location={1}
								onClick={() => {
									handleBetChip(1, 1);
								}}
							>
								<span>TIE</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='banker_pair pair onActive'
								location={2}
								onClick={() => {
									handleBetChip(1, 2);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
						</div>
						<div
							className='play_banker onActive'
							location={3}
							onClick={() => {
								handleBetChip(1, 3);
							}}
						>
							<span>BANKER</span>
							<div className='bet_chips'></div>
						</div>
						<div
							className='play_player onActive'
							location={4}
							onClick={() => {
								handleBetChip(1, 4);
							}}
						>
							<span>PLAYER</span>
							<div className='bet_chips'></div>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div
								className='player_pair pair onActive'
								location={5}
								onClick={() => {
									handleBetChip(2, 5);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='tie onActive'
								location={6}
								onClick={() => {
									handleBetChip(2, 6);
								}}
							>
								<span>TIE</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='banker_pair pair onActive'
								location={7}
								onClick={() => {
									handleBetChip(2, 7);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
						</div>
						<div
							className='play_banker onActive'
							location={8}
							onClick={() => {
								handleBetChip(2, 8);
							}}
						>
							<span>BANKER</span>
							<div className='bet_chips'></div>
						</div>
						<div
							className='play_player onActive'
							location={9}
							onClick={() => {
								handleBetChip(2, 9);
							}}
						>
							<span>PLAYER</span>
							<div className='bet_chips'></div>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div
								className='player_pair pair onActive'
								location={10}
								onClick={() => {
									handleBetChip(3, 10);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='tie onActive'
								location={11}
								onClick={() => {
									handleBetChip(3, 11);
								}}
							>
								<span>TIE</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='banker_pair pair onActive'
								location={12}
								onClick={() => {
									handleBetChip(3, 12);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
						</div>
						<div
							className='play_banker onActive'
							location={13}
							onClick={() => {
								handleBetChip(3, 13);
							}}
						>
							<span>BANKER</span>
							<div className='bet_chips'></div>
						</div>
						<div
							className='play_player onActive'
							location={14}
							onClick={() => {
								handleBetChip(3, 14);
							}}
						>
							<span>PLAYER</span>
							<div className='bet_chips'></div>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div
								className='player_pair pair onActive'
								location={15}
								onClick={() => {
									handleBetChip(4, 15);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='tie onActive'
								location={16}
								onClick={() => {
									handleBetChip(4, 16);
								}}
							>
								<span>TIE</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='banker_pair pair onActive'
								location={17}
								onClick={() => {
									handleBetChip(4, 17);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
						</div>
						<div
							className='play_banker onActive'
							location={18}
							onClick={() => {
								handleBetChip(4, 18);
							}}
						>
							<span>BANKER</span>
							<div className='bet_chips'></div>
						</div>
						<div
							className='play_player onActive'
							location={19}
							onClick={() => {
								handleBetChip(4, 19);
							}}
						>
							<span>PLAYER</span>
							<div className='bet_chips'></div>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div
								className='player_pair pair onActive'
								location={20}
								onClick={() => {
									handleBetChip(5, 20);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='tie onActive'
								location={21}
								onClick={() => {
									handleBetChip(5, 21);
								}}
							>
								<span>TIE</span>
								<div className='bet_chips'></div>
							</div>
							<div
								className='banker_pair pair onActive'
								location={22}
								onClick={() => {
									handleBetChip(5, 22);
								}}
							>
								<span>PAIR</span>
								<div className='bet_chips'></div>
							</div>
						</div>
						<div
							className='play_banker onActive'
							location={23}
							onClick={() => {
								handleBetChip(5, 23);
							}}
						>
							<span>BANKER</span>
							<div className='bet_chips'></div>
						</div>
						<div
							className='play_player onActive'
							location={24}
							onClick={() => {
								handleBetChip(5, 24);
							}}
						>
							<span>PLAYER</span>
							<div className='bet_chips'></div>
						</div>
					</div>
				</div>

				<div id='outner_trim'></div>
				<div id='inner_trim'>
					<div id='show_time'>
						<span>{betTime}</span>
					</div>
					<div id='card_table_container'>
						<div id='card_side_container'>
							{renderResult()}
							<div id='card_player_side' className='card_side'>
								<span className='side'>PLAYER</span>
								<div className='card_container'>
									<div className='card' id='card_1'></div>
									<div className='card' id='card_3'>
										<img src={`./image/card/${cardArr[2]}.png`} alt='card' />
									</div>
									<div className='card' id='card_5'>
										<img src={`./image/card/${cardArr[0]}.png`} alt='card' />
									</div>
									<div className='spawn_card location_card' id='location_card_1'></div>
									<div className='spawn_card location_card' id='location_card_3'></div>
									<div className='hit_card location_card' id='location_card_5'></div>
								</div>
							</div>
							<div id='card_banker_side' className='card_side'>
								<span className='side'>BANKER</span>
								<div className='card_container'>
									<div className='card' id='card_2'>
										<img src={`./image/card/${cardArr[1]}.png`} alt='card' />
									</div>
									<div className='card' id='card_4'>
										<img src={`./image/card/${cardArr[3]}.png`} alt='card' />
									</div>
									<div className='card' id='card_6'>
										<img src={`./image/card/${cardArr[0]}.png`} alt='card' />
									</div>
									<div className='spawn_card location_card' id='location_card_2'></div>
									<div className='spawn_card location_card' id='location_card_4'></div>
									<div className='hit_card location_card' id='location_card_6'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id='choose_slot_container'>
					<div
						className='choose_slot'
						onClick={() => {
							if (isBetTime) {
								setActiveSlot(1);
							}
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							if (isBetTime) {
								setActiveSlot(2);
							}
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							if (isBetTime) {
								setActiveSlot(3);
							}
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							if (isBetTime) {
								setActiveSlot(4);
							}
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							if (isBetTime) {
								setActiveSlot(5);
							}
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
