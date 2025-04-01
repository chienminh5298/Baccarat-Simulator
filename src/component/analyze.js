import React, { Fragment } from 'react';
import $ from "jquery";
import './analyze.scss';
import payout from './image/payout.png';

const Analyze = ({ history, countPlayer, countBanker, countTie }) => {
	function hide_dashboard() {
		$('#analyze_container').css({
			left: '-23%',
		});
		$('#analyze_container #show_button').toggleClass('d-none');
	}

	function show_dashboard() {
		$('#analyze_container').css({
			left: '4%',
		});
		$('#analyze_container #show_button').toggleClass('d-none');
	}
	var renderHistory = history.map((col, index) => {
		var temp = col.map((result, ind) => {
			switch (result) {
				case 0:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'></div>
						</div>
					);
				case 1:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 2:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 3:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'>
								<div className='banker-pair'></div>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 4:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'>
								<div className='natural'></div>
							</div>
						</div>
					);
				case 5:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'>
								<div className='natural'></div>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 6:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'>
								<div className='natural'></div>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 7:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-tie'>
								<div className='natural'></div>
								<div className='player-pair'></div>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 8:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'></div>
						</div>
					);
				case 9:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 10:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 11:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'>
								<div className='banker-pair'></div>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 12:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'>
								<div className='natural'></div>
							</div>
						</div>
					);
				case 13:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'>
								<div className='natural'></div>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 14:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'>
								<div className='natural'></div>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 15:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-banker'>
								<div className='natural'></div>
								<div className='banker-pair'></div>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 16:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'></div>
						</div>
					);
				case 17:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 18:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 19:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'>
								<div className='player-pair'></div>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 20:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'>
								<div className='natural'></div>
							</div>
						</div>
					);
				case 21:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'>
								<div className='natural'></div>
								<div className='banker-pair'></div>
							</div>
						</div>
					);
				case 22:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'>
								<div className='natural'></div>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				case 23:
					return (
						<div className='round_container' key={ind}>
							<div className='round bg-player'>
								<div className='natural'></div>
								<div className='banker-pair'></div>
								<div className='player-pair'></div>
							</div>
						</div>
					);
				default:
					return <div className='round_container' key={ind}></div>;
			}
		});
		return (
			<div className='history_col' key={index}>
				{temp}
			</div>
		);
	});

	function toggleImg() {
		$('#payout_img').toggleClass('d-none');
	}

	return (
		<Fragment>
			<div id='payout_img' className='d-none'>
				<div id='close_payout' onClick={toggleImg}>
					<i className='fa-solid fa-circle-xmark'></i>
				</div>
				<img src={payout} alt='Payout' />
			</div>
			<div id='analyze_container'>
				<div id='history_container'>
					<div id='show_button' className='d-none' onClick={show_dashboard}>
						<i className='fa-solid fa-caret-right'></i>
					</div>
					<div id='hide_button' onClick={hide_dashboard}>
						<i className='fa-solid fa-caret-left'></i>
					</div>
					<div id='col_container'>{renderHistory}</div>
				</div>
				<div id='count_container'>
					<div id='count_banker' className='count'>
						<span>BANKER: {countBanker}</span>
					</div>
					<div id='count_tie' className='count'>
						<span>TIE: {countTie}</span>
					</div>
					<div id='count_player' className='count'>
						<span>PLAYER: {countPlayer}</span>
					</div>
				</div>
				<div id='payout_container'>
					<div id='how_to_play'>
						<a href='https://www.casinocity.com/rule/baccarat.htm' target='_blank'>
							How to play
						</a>
					</div>
					<div id='payout' onClick={toggleImg}>
						<span>Payout</span>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Analyze;
