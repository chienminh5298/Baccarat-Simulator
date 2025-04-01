import { useState, useEffect } from 'react';

import './App.scss';
import Table from './component/table';
import Dashboard from './component/dashboard';
import Analyze from './component/analyze';
import { generateHistory } from './helper';

function App() {
	var [result, setResult] = useState();
	var [history, setHistory] = useState(generateHistory());
	var [resultCol, setResultCol] = useState([0, -1]); //[Column, Row]
	var [prevResult, setPrevResult] = useState();
	var [bet, setBet] = useState(5);
	var [credit, setCredit] = useState(1000);
	var [countBanker, setCountBanker] = useState(0);
	var [countPlayer, setCountPlayer] = useState(0);
	var [countTie, setCountTie] = useState(0);

	useEffect(() => {
		if (result !== undefined) {
			if (checkResult(result) === 'tie') setCountTie(countTie + 1);
			else if (checkResult(result) === 'banker') setCountBanker(countBanker + 1);
			else if (checkResult(result) === 'player') setCountPlayer(countPlayer + 1);
		}
	}, [history]);

	function handleHistory(col, row, res) {
		var temp = [...history];
		temp[col][row] = res;
		setHistory(temp);
	}

	function checkResult(res) {
		switch (res) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				return 'tie';
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
				return 'banker';
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
				return 'player';
			default:
				return 'tie';
		}
	}
	function handlePrevResult(res) {
		switch (res) {
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
				setPrevResult('banker');
				break;
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
				setPrevResult('player');
				break;
			default:
				break;
		}
	}

	function getResult(res) {
		if (res !== undefined) {
			let check = checkResult(res);
			if (check !== prevResult && prevResult !== undefined && check !== undefined && prevResult !== 'tie' && check !== 'tie') {
				handlePrevResult(res);
				handleHistory(resultCol[0] + 1, 0, res);
				setResultCol([resultCol[0] + 1, 0]);
			} else {
				handleHistory(resultCol[0], resultCol[1] + 1, res);
				setResultCol([resultCol[0], resultCol[1] + 1]);
				handlePrevResult(res);
			}
		}
		setResult(res);
	}
	return (
		<div id='game_container'>
			<Table getResult={getResult} setHistory={setHistory} setResultCol={setResultCol} currentBet={bet} credit={credit} setCredit={setCredit} setCountBanker={setCountBanker} setCountPlayer={setCountPlayer} setCountTie={setCountTie} />
			<Dashboard setBet={setBet} credit={credit} setCredit={setCredit} />
			<Analyze history={history} countBanker={countBanker} countPlayer={countPlayer} countTie={countTie} />
		</div>
	);
}

export default App;
