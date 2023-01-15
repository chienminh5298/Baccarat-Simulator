import React, { useState, useEffect } from 'react';

import 'src/scss/dashboard.scss';
import chip1 from './image/chip1.png';
import chip2 from './image/chip2.png';
import chip3 from './image/chip3.png';

const Dashboard = ({ winningNumber, setBet, credit }) => {
	var [history, setHistory] = useState([]);

	useEffect(() => {
		if (winningNumber) {
			let temp = [...history];
			temp.unshift(winningNumber);
			setHistory(temp);
		}
	}, [winningNumber]);

	var renderHistory = history.slice(0, 44).map((number, index) => {
		return (
			<div className={`history_number ${number.color}`} key={index}>
				<span>{number.number}</span>
			</div>
		);
	});

	const handleChips = (value) => {
		$('.chip').removeClass('active');
		$(`.chip[value=${value}]`).addClass('active');
		setBet(value);
	};

	return (
		<div id='dashboard_container'>
			<div id='credit_container' className='dashboard_item'>
				Credit: <span>1000$</span>
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
			<div id='history_container' className='dashboard_item'>
				{renderHistory}
			</div>
		</div>
	);
};

export default Dashboard;
