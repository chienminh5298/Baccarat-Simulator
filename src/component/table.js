import React, { useState, useEffect } from 'react';

import '../scss/table.scss';

const Table = () => {
	var [slot, setSlot] = useState(3);
	var [betTime, setBetTime] = useState(true);

	useEffect(() => {
		if (betTime) {
			$(`.choose_slot`).removeClass('d-none');
			$(`.player_slot`).removeClass('active');
			$(`.choose_slot:nth-child(${slot})`).addClass('d-none');
			$(`.player_slot:nth-child(${slot})`).addClass('active');
		}
	}, [slot]);

	return (
		<div id='table_container'>
			<div id='player_slot_container'>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div className='player_pair pair onActive'>
								<span>PAIR</span>
							</div>
							<div className='tie onActive'>
								<span>TIE</span>
							</div>
							<div className='banker_pair pair onActive'>
								<span>PAIR</span>
							</div>
						</div>
						<div className='play_banker onActive'>
							<span>BANKER</span>
						</div>
						<div className='play_player onActive'>
							<span>PLAYER</span>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div className='player_pair pair onActive'>
								<span>PAIR</span>
							</div>
							<div className='tie onActive'>
								<span>TIE</span>
							</div>
							<div className='banker_pair pair onActive'>
								<span>PAIR</span>
							</div>
						</div>
						<div className='play_banker onActive'>
							<span>BANKER</span>
						</div>
						<div className='play_player onActive'>
							<span>PLAYER</span>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div className='player_pair pair onActive'>
								<span>PAIR</span>
							</div>
							<div className='tie onActive'>
								<span>TIE</span>
							</div>
							<div className='banker_pair pair onActive'>
								<span>PAIR</span>
							</div>
						</div>
						<div className='play_banker onActive'>
							<span>BANKER</span>
						</div>
						<div className='play_player onActive'>
							<span>PLAYER</span>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div className='player_pair pair onActive'>
								<span>PAIR</span>
							</div>
							<div className='tie onActive'>
								<span>TIE</span>
							</div>
							<div className='banker_pair pair onActive'>
								<span>PAIR</span>
							</div>
						</div>
						<div className='play_banker onActive'>
							<span>BANKER</span>
						</div>
						<div className='play_player onActive'>
							<span>PLAYER</span>
						</div>
					</div>
				</div>
				<div className='player_slot'>
					<div className='play_container'>
						<div className='play_bonus'>
							<div className='player_pair pair onActive'>
								<span>PAIR</span>
							</div>
							<div className='tie onActive'>
								<span>TIE</span>
							</div>
							<div className='banker_pair pair onActive'>
								<span>PAIR</span>
							</div>
						</div>
						<div className='play_banker onActive'>
							<span>BANKER</span>
						</div>
						<div className='play_player onActive'>
							<span>PLAYER</span>
						</div>
					</div>
				</div>
				<div id='outner_trim'></div>
				<div id='inner_trim'>
					{/* <div id='show_time'>
						<span>15</span>
					</div> */}
					<div id='card_table_container'>
						<div id='card_side_container'>
							<div id='result'>
								<span>BANKER WIN</span>
							</div>
							<div id='card_player_side' className='card_side'>
								<span className='side'>PLAYER</span>
								<div className='card_container'>
									<div className='spawn_card card'></div>
									<div className='spawn_card card'></div>
									<div className='hit_card card'></div>
								</div>
								<span className='score'>6</span>
							</div>
							<div id='card_banker_side' className='card_side'>
								<span className='side'>BANKER</span>
								<div className='card_container'>
									<div className='spawn_card card'></div>
									<div className='spawn_card card'></div>
									<div className='hit_card card'></div>
								</div>
								<span className='score'>9</span>
							</div>
						</div>
					</div>
				</div>
				<div id='choose_slot_container'>
					<div
						className='choose_slot'
						onClick={() => {
							setSlot(1);
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							setSlot(2);
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							setSlot(3);
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							setSlot(4);
						}}
					>
						<div>
							<i className='fa-regular fa-plus'></i>
						</div>
					</div>
					<div
						className='choose_slot'
						onClick={() => {
							setSlot(5);
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
