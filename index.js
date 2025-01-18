const gamesContainer = document.getElementById("games-container");

let lastCreatedItem = null;

async function onFetchGamesClick() {
    const response = await fetch ("http://localhost:3000/games");
    const gameList = await response.json();
        console.log(gameList)
    showGames(gameList)
}

let allGames = ``;

function showGames(games){
    for(let game of games){
        allGames+=`
        <div class="card rounded mt-5">
        <h3>${game.title}</h3>
        <p>${game.stars}</p>
        </div>
        `
    }
    let div= document.getElementById("show-games")
    div.innerHTML = allGames 
    console.log(allGames)
}

async function onCreateGamesClick() {
    const testGame = { title: "Test", genreId: 1}
    const response = await fetch("http://localhost:3000/games", {
        method: "POST", //CREATING
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(testGame)
    })
    const newlyCreatedItem = await response.json()
    lastCreatedItem = newlyCreatedItem
}

