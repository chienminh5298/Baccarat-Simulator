import React, { useState, useEffect } from 'react';

import 'src/scss/dashboard.scss';
import chip1 from './image/chip1.png';
import chip2 from './image/chip2.png';
import chip3 from './image/chip3.png';

const Dashboard = ({ setBet, credit, setCredit }) => {
	function hide_dashboard() {
		$('#dashboard').css({
			left: '140%',
		});
		$('#show_button').toggleClass('d-none');
	}

	function show_dashboard() {
		$('#dashboard').css({
			left: '50%',
		});
		$('#show_button').toggleClass('d-none');
	}

	const handleChips = (value) => {
		$('.chip').removeClass('active');
		$(`.chip[value=${value}]`).addClass('active');
		setBet(value);
	};

	return (
		<div id='dashboard'>
			<div id='dashboard_container'>
				<div id='show_button' className='d-none' onClick={show_dashboard}>
					<i className='fa-solid fa-caret-left'></i>
				</div>
				<div id='hide_button' onClick={hide_dashboard}>
					<i className='fa-solid fa-caret-right'></i>
				</div>
				<div id='credit_container' className='dashboard_item'>
					Credit: <span>{credit}$</span>
				</div>
				<div id='won_container' className='dashboard_item'>
					Win: <span>0$</span>
				</div>
				<div id='bet_container' className='dashboard_item'>
					Bet
					<div id='chips'>
						<div
							value={5}
							onClick={() => {
								handleChips(5);
							}}
							className='chip active'
						>
							<img src={chip1} alt='5$' />
							<span>5</span>
						</div>
						<div
							value={10}
							onClick={() => {
								handleChips(10);
							}}
							className='chip'
						>
							<img src={chip2} alt='10$' />
							<span>10</span>
						</div>
						<div
							value={100}
							onClick={() => {
								handleChips(100);
							}}
							className='chip'
						>
							<img src={chip3} alt='100$' />
							<span>100</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
