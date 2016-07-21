var whosTurn = 1; //start with player 1 turn
var winners = [
	["a1", "a2", "a3"],
	["b1", "b2", "b3"],
	["c1", "c2", "c3"],
	["a1", "b2", "c3"],
	["a3", "b2", "c1"],
	["a1", "b1", "c1"],
	["a2", "b2", "c2"],
	["a3", "b3", "c3"]
];
var player1 = [];//Arrays to hold the players moves
var player2 = [];
var someoneWon = false;
function markSquare(square){
	if(someoneWon){
		console.log("Someone Already Won");
	}
	//check to see if this square is in either players array...if so, ggodbye
	else if((player1.indexOf(square.id) == -1) && (player2.indexOf(square.id) == -1)) {
		if(whosTurn == 1){
			square.innerHTML = 'X';
			whosTurn = 2;
			player1.push(square.id);
			checkWin(player1, 1);
		}
		else{
			square.innerHTML = 'O';
			whosTurn = 1;
			player2.push(square.id);
			checkWin(player2, 2);	
		}
	}
	else{
		console.log("Already filled")
	}
}
function checkWin(currentPlayersSquares, whoJustMarked){
	var rowCount = 0;
	for(i = 0; i < winners.length; i++){
		rowCount = 0;
		for(j = 0; j < winners[i].length; j++){
			if(currentPlayersSquares.indexOf(winners[i][j]) > -1){
				rowCount++;
			}
			if(rowCount == 3){
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
}
function gameOver(whoWon, winningCombo){
	document.getElementById('message');
	message.innerHTML = "Congrats Player " + whoWon + ", You Won!!" + " Combo was: " + winningCombo.join(", ");
	for(i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winner';	
	}
	someoneWon = true;
}