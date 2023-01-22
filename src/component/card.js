import React, { useState, Fragment, useEffect } from 'react';

import { checkValue, checkWin } from 'src/helper';
const Card = ({ cardArr, result, handlePayout }) => {
	var [render_banker_draw_card, setRender_banker_draw_card] = useState(cardArr[4]);

	function show_result(time) {
		setTimeout(() => {
			$('#result').css('display', 'block');
			handlePayout(result);
		}, time);
	}
	function banker_draw_flip(isPlayerDraw) {
		setTimeout(
			() => {
				$('#card_6')
					.animate(
						{
							top: '10%',
							right: '10%',
						},
						500,
						'linear',
						function () {
							$('#card_6').css('transform', 'rotate(-90deg)');
							$('#card_6 .card_flip').css({
								transform: 'rotateY(180deg)',
								transition: '1s',
							});
						}
					)
					.promise()
					.done(() => {
						show_result();
					});
			},
			isPlayerDraw ? 1500 : 500
		);
	}

	useEffect(() => {
		$('#card_1').animate(
			{
				top: '10%',
				left: '10%',
			},
			500,
			'linear',
			function () {
				$('#card_2').animate(
					{
						top: '10%',
						right: '32%',
					},
					500,
					'linear',
					function () {
						$('#card_3').animate(
							{
								top: '10%',
								left: '20%',
							},
							500,
							'linear',
							function () {
								$('#card_4').animate(
									{
										top: '10%',
										right: '22%',
									},
									500,
									'linear',
									function () {
										$('#card_1 .card_flip').css({
											transform: 'rotateY(180deg)',
											transition: '1s',
										});
										$('#card_2 .card_flip').css({
											transform: 'rotateY(180deg)',
											transition: '1s',
										});
										$('#card_3 .card_flip').css({
											transform: 'rotateY(180deg)',
											transition: '1s',
										});
										$('#card_4 .card_flip').css({
											transform: 'rotateY(180deg)',
											transition: '1s',
										});
									}
								);
							}
						);
					}
				);
			}
		);
		/** Draw another card */
		setTimeout(() => {
			var isPlayerDraw = false;
			var isBankerDraw = false;
			var player = (checkValue(cardArr[0]) + checkValue(cardArr[2])) % 10;
			var banker = (checkValue(cardArr[1]) + checkValue(cardArr[3])) % 10;
			setRender_banker_draw_card(player >= 6 ? cardArr[4] : cardArr[5]);
			const player_draw = checkValue(cardArr[4]);
			const banker_draw = player >= 6 ? checkValue(cardArr[4]) : checkValue(cardArr[5]);

			if (banker < 8 && player < 8) {
				if (player < 6) {
					player = (player + player_draw) % 10;
					isPlayerDraw = true;

					$('#card_5').animate(
						{
							top: '10%',
							left: '32%',
						},
						500,
						'linear',
						function () {
							$('#card_5').css('transform', 'rotate(-90deg)');
							$('#card_5 .card_flip').css({
								transform: 'rotateY(180deg)',
								transition: '1s',
							});
						}
					);
				}

				if (banker === 0 || banker === 1 || banker === 2) {
					banker_draw_flip(isPlayerDraw);
					isBankerDraw = true;
				} else if (banker === 3) {
					if (isPlayerDraw && player_draw !== 8) {
						banker_draw_flip(isPlayerDraw);
						isBankerDraw = true;
					} else if (!isPlayerDraw) {
						banker_draw_flip(isPlayerDraw);
						isBankerDraw = true;
					}
				} else if (banker === 4) {
					if (isPlayerDraw) {
						if (player_draw === 2 || player_draw === 3 || player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) {
							banker_draw_flip(isPlayerDraw);
							isBankerDraw = true;
						}
					} else {
						banker_draw_flip(isPlayerDraw);
						isBankerDraw = true;
					}
				} else if (banker === 5) {
					if (isPlayerDraw) {
						if (player_draw === 4 || player_draw === 5 || player_draw === 6 || player_draw === 7) {
							banker_draw_flip(isPlayerDraw);
							isBankerDraw = true;
						}
					} else {
						banker_draw_flip(isPlayerDraw);
						isBankerDraw = true;
					}
				} else if (banker === 6) {
					if (isPlayerDraw) {
						if (player_draw === 6 || player_draw === 7) {
							banker_draw_flip(isPlayerDraw);
							isBankerDraw = true;
						}
					}
				} else {
					show_result(2000);
				}

				if (isPlayerDraw && isBankerDraw) {
					show_result(10000);
				} else if ((isPlayerDraw && !isBankerDraw) || (!isPlayerDraw && isBankerDraw)) show_result(2000);
				else {
					show_result(1000);
				}
			} else {
				show_result(1000);
			}
		}, 3500);
	}, []);
	var renderResult = () => {
		switch (result) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				return (
					<div id='result' className='tie'>
						<span>TIE</span>
					</div>
				);
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
				return (
					<div id='result' className='bankerWin'>
						<span>BANKER WIN</span>
					</div>
				);
			default:
				return (
					<div id='result' className='playerWin'>
						<span>PLAYER WIN</span>
					</div>
				);
		}
	};
	return (
		<Fragment>
			{renderResult()}
			<div id='side_text'>
				<span>PLAYER</span>
				<span>BANKER</span>
			</div>
			<div id='card_container'>
				<div id='card_1' className='card player_card'>
					<div className='card_flip'>
						<div className='front'>
							<img src={`./image/card/${cardArr[0]}.png`} alt='frontcard' />
						</div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_3' className='card player_card'>
					<div className='card_flip'>
						<div className='front'>
							<img src={`./image/card/${cardArr[2]}.png`} alt='frontcard' />
						</div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_5' className='card player_card'>
					<div className='card_flip'>
						<div className='front'>
							<img src={`./image/card/${cardArr[4]}.png`} alt='frontcard' />
						</div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_2' className='card banker_card'>
					<div className='card_flip'>
						<div className='front'>
							<img src={`./image/card/${cardArr[1]}.png`} alt='frontcard' />
						</div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_4' className='card banker_card'>
					<div className='card_flip'>
						<div className='front'>
							<img src={`./image/card/${cardArr[3]}.png`} alt='frontcard' />
						</div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_6' className='card banker_card'>
					<div className='card_flip'>
						<div className='front'>
							<img src={`./image/card/${render_banker_draw_card}.png`} alt='frontcard' />
						</div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Card;
