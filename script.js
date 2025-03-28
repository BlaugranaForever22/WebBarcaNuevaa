async function getScores() {
    try {
        const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: { 'X-Auth-Token': 'd15d8dfbbcc54dc5a0362a59c305e83d' }
        });
        if (!response.ok) {
            throw new Error('API falló: ' + response.status);
        }
        const data = await response.json();
        
        const barcaGames = data.matches.filter(game => 
            game.homeTeam.name === "FC Barcelona" || game.awayTeam.name === "FC Barcelona"
        );
        
        const scores = document.getElementById('scores');
        if (barcaGames.length > 0) {
            scores.innerHTML = barcaGames.map(game => 
                game.homeTeam.name + " " + (game.score.fullTime.home || '-') + " - " + (game.score.fullTime.away || '-') + " " + game.awayTeam.name
            ).join('<br>');
        } else {
            scores.innerHTML = "No hay partidos del FC Barcelona ahora. Próximo juego: domingo 30 de marzo.";
        }
    } catch (error) {
        document.getElementById('scores').innerHTML = "Error: " + error.message;
    }
}

getScores();