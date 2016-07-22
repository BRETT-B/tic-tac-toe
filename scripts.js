// N size grid
var whosTurn = 1; //start with player 1 turn
// 1. Build a winners array.

var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
var winners = [];
var diag1 = [];
var diag2 = [];
var gridSize = 5; //var gridSize is the 'n'
// We want A0,A1, A2, A3,...A'n'
// B0, B1, B2, B3...B'n'
for (var i = 0; i<gridSize; i++){
	diag1.push(alph[i] + (gridSize - i));//diagonal 1
	diag2.push(alph[i] + i);//diagonal 2
	var winnersInsideH = [];//verticle array
	var winnersInsideV = [];//horizontal array
	for (var j = 0; j<gridSize; j++){
		// Setup horizontal winner
		winnersInsideH.push(alph[j] + i);
		// Setup verticle winner
		winnersInsideV.push(alph[i] + j);
	}
	winners.push(winnersInsideH);
	winners.push(winnersInsideV);
}
winners.push(diag1);
winners.push(diag2);

// JS to build board
var htmlForTheBoard;
var boxWidth = (100/gridSize) - (gridSize - 1);
for (var i = 0; i<gridSize; i++){
	htmlForTheBoard += '<div class="board-row' + i + ' board-row">';
		for (var j=0; j<gridSize; j++){
			htmlForTheBoard += '<button id="' + alph[i] + j + '" class="box" style="width:'+boxWidth+'%" onClick="markSquare(this)">-</button>';
		}
	htmlForTheBoard += '</div>';
}
document.getElementsByClassName('game-wrapper')[0].innerHTML = htmlForTheBoard;

var player1 = [];//Arrays to hold the players moves
var player2 = [];
var someoneWon = false;
function markSquare(square){
	if(someoneWon){
		console.log("Someone Already Won");
	}
	//check to see if this square is in either players array...if so, goodbye
	else if((player1.indexOf(square.id) == -1) && (player2.indexOf(square.id) == -1)){
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
			if(rowCount === gridSize){
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
}
function gameOver(whoWon, winningCombo){
	document.getElementById('message');
	message.innerHTML = "Congrats Player " + whoWon + ", You Won!!" + " Combo was: " 
	+ winningCombo.join(", ");
	for(i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winner';	
	}
	someoneWon = true;
}