/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, scores, roundScore, gamePlaying;


init()


//roll button

document.querySelector('.btn-roll').addEventListener('click', function() {
		  if (gamePlaying) {
				var dice, diceDom;
				//1. random value for dice
				 dice = Math.floor(Math.random() * 6) + 1;

				//2. display the dice and choose the image
				 dicDom = document.querySelector('.dice');

				dicDom.style.display = 'block';    
				dicDom.src = 'dice-' + dice + '.png';

				//3.update the round score 

				if(dice !== 1){
						//update score
					roundScore += dice;        
					document.getElementById('current-' + activePlayer).textContent = roundScore;

				}else{
					nextPlayer();
				}

		  }
	
});

//hold button

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
			//Update the Current score to the global score
			scores[activePlayer] += roundScore;
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];	
			
			if(scores[activePlayer] >= 100)
					{
							//check if win

							document.getElementById('name-' + activePlayer).textContent = 'Winner!';
							document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
							document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
							document.querySelector('.dice').style.display = 'none';
							gamePlaying = false;
					}else
						{

							//next player

							nextPlayer();    

						}

	
			}
      
    
});


//new game button

document.querySelector('.btn-new').addEventListener('click', init);

//next player

function nextPlayer () {
    //Next Player
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        
        
        activePlayer = activePlayer === 0 ? 1 : 0;
        //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        
        
        //4. Hide the dice 
        
        setTimeout( function () {
				document.querySelector('.dice').style.display = 'none';
			    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
				
								
								} , 300);
        
}

function init () {
	
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.getElementById('score-0').textContent = scores[0];
	document.getElementById('score-1').textContent = scores[1];
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.btn-roll').style.display = 'block';
	document.querySelector('.btn-hold').style.display = 'block';
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.getElementById('name-0').textContent = 'PLAYER 1';
	document.getElementById('name-1').textContent = 'PLAYER 2';

	
}
