import React, { useState, Fragment, useEffect } from 'react';
import $ from "jquery";
import { checkValue, checkWin } from '../helper';

const Card = ({ cardArr, result, handlePayout, setCardArr }) => {
	let tempCardArr = [...cardArr];
	function show_result() {
		setTimeout(() => {
			$('#result').css('display', 'block');
			handlePayout(result);
			setCardArr(tempCardArr);
		}, 1000);
	}

	function flip(selector) {
		$(`${selector} .card_flip`).css({
			transform: 'rotateY(180deg)',
			transition: '1s',
		});
	}

	function flop(id, callback = () => {}) {
		let top = $(id).attr('top');
		let left = $(id).attr('left');
		$(id).animate(
			{
				top: top,
				left: left,
			},
			500,
			'linear',
			function () {
				callback();
			}
		);
		$(`${id} .front`).html(`<img src=./image/card/${tempCardArr[0]}.png alt='frontcard' />`);
		tempCardArr.shift(); // Remove card from card array
	}

	useEffect(() => {
		let isPlayerDraw = false;
		let isBankerDraw = false;
		let player = (checkValue(tempCardArr[0]) + checkValue(tempCardArr[2])) % 10;
		let banker = (checkValue(tempCardArr[1]) + checkValue(tempCardArr[3])) % 10;
		let playerDraw = checkValue(tempCardArr[4]);

		flop('#card_1', () => {
			flop('#card_2', () => {
				flop('#card_3', () => {
					flop('#card_4', () => {
						flip('#card_1');
						flip('#card_2');
						flip('#card_3');
						flip('#card_4');
						setTimeout(() => {
							if (player < 8 && banker < 8) {
								if (player < 6) {
									isPlayerDraw = true;
									flop('#card_5', () => {
										flip('#card_5');
										$('#card_5').css('transform', 'rotate(-90deg)');
										if (banker === 0 || banker === 1 || banker === 2 || (banker === 3 && playerDraw !== 8) || (banker === 3 && !isPlayerDraw)) {
											flop('#card_6', () => {
												flip('#card_6');
												$('#card_6').css('transform', 'rotate(-90deg)');
												show_result();
											});
										} else if (banker === 4) {
											if (playerDraw !== 0 && playerDraw !== 1 && playerDraw !== 8 && playerDraw !== 9) {
												flop('#card_6', () => {
													flip('#card_6');
													$('#card_6').css('transform', 'rotate(-90deg)');
													show_result();
												});
											} else show_result();
										} else if (banker === 5) {
											if (playerDraw !== 0 && playerDraw !== 1 && playerDraw !== 2 && playerDraw !== 3 && playerDraw !== 8 && playerDraw !== 9) {
												flop('#card_6', () => {
													flip('#card_6');
													$('#card_6').css('transform', 'rotate(-90deg)');
													show_result();
												});
											} else show_result();
										} else if (banker === 6) {
											if (isPlayerDraw) {
												if (playerDraw === 6 || playerDraw === 7) {
													flop('#card_6', () => {
														flip('#card_6');
														$('#card_6').css('transform', 'rotate(-90deg)');
														show_result();
													});
												} else show_result();
											} else show_result();
										} else {
											show_result();
										}
									});
								} else {
									if (banker === 0 || banker === 1 || banker === 2) {
										flop('#card_6', () => {
											flip('#card_6');
											$('#card_6').css('transform', 'rotate(-90deg)');
											show_result();
										});
									} else {
										show_result();
									}
								}
							} else show_result();
						}, 1000);
					});
				});
			});
		});
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
				<div id='card_1' top='10%' left='10%' className='card player_card'>
					<div className='card_flip'>
						<div className='front'></div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_3' top='10%' left='20%' className='card player_card'>
					<div className='card_flip'>
						<div className='front'></div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_5' top='10%' left='32%' className='card player_card'>
					<div className='card_flip'>
						<div className='front'></div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_2' top='10%' left='59%' className='card banker_card'>
					<div className='card_flip'>
						<div className='front'></div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_4' top='10%' left='69%' className='card banker_card'>
					<div className='card_flip'>
						<div className='front'></div>
						<div className='back'>
							<img src='./image/card/backcard.png' alt='backcard' />
						</div>
					</div>
				</div>
				<div id='card_6' top='10%' left='81%' className='card banker_card'>
					<div className='card_flip'>
						<div className='front'></div>
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
