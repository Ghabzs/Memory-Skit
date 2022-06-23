<?php
/*
Template Name: template-MemoSkit
*/
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memo'Skit</title>
    <link href="/wp-content/themes/one-page-express/assets/css/memoSkit-style.css" rel="stylesheet">
</head>
<body>
	<div class="site hidden">
		<button onclick="window.location.href = 'https://skit.fr/jeu/';">Revenir sur le site</button>
		<p class="has-text-align-center" style="margin-top: 20px;">Pour nous aider dans notre démarche, répondez à <a href="https://www.modalisa9-drop.com/Memoskit_0A784831847/Skit.html">cette enquête</a> rapide ! Merci pour votre soutiens :)</p>
	</div>
	<div class="game">
				<div class="controls">
					<button class="start">Commencer</button>
					<button class="restart hidden">Recommencer</button>
					<div class="stats">
						<div class="moves">0 mouvement(s)</div>
						<div class="timer">chrono : 0 sec</div>
					</div>
				</div>
				<div class="board-container">
					<div class="board" data-dimension="4"></div>
					<div class="win">Vous avez gagné!</div>
				</div>	
	</div>
	
<script type="text/javascript" src="game.js"></script>
</body>
</html>