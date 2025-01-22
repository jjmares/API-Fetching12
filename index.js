const API_URL = "http://localhost:3000/games";

// Fetch and display games
function fetchGames() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tableBody = $("#games-table");
            tableBody.empty();
            data.forEach(game => {
                tableBody.append(`
                    <tr id="game-${game.id}">
                        <td>${game.id}</td>
                        <td>${game.title}</td>
                        <td>${game.stars}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${game.id}">Delete</button>
                        </td>
                    </tr>
                `);
            });
        })
        .catch(error => console.error("Error fetching games:", error));
}

// Create a new game
$("#create-form").on("submit", function (e) {
    e.preventDefault();
    const title = $("#game-title").val();
    const stars = parseInt($("#game-stars").val());

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, stars }),
    })
        .then(response => response.json())
        .then(() => {
            fetchGames();
            $("#game-title").val("");
            $("#game-stars").val("");
        })
        .catch(error => console.error("Error adding game:", error));
});

// Delete a game
$(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
            $(`#game-${id}`).remove();
        })
        .catch(error => console.error("Error deleting game:", error));
});

// Edit a game
$(document).on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    const title = prompt("Enter new title:", $(this).data("title"));
    const stars = prompt("Enter new stars (1-5):", $(this).data("stars"));

    if (title && stars) {
        fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, stars: parseInt(stars) }),
        })
            .then(() => fetchGames())
            .catch(error => console.error("Error updating game:", error));
    }
});

// Initial fetch of games
fetchGames();



// const reviewStarsSelect = document.getElementById("review-stars-select")
// const gamesContainer = document.getElementById("games-container");

// let lastCreatedItem = null;

/*async function onFetchGamesClick() {
    const response = await fetch ("http://localhost:3000/games");
    const gameList = await response.json();
        console.log(gameList)
    showGames(gameList)
}/*

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

/*async function onCreateGamesClick() {
    const testGame = { title: "Test", stars: 1}
    const response = await fetch("http://localhost:3000/games", {
        method: "POST", //CREATING
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(testGame)
    })
    const newlyCreatedItem = await response.json()
    lastCreatedItem = newlyCreatedItem
    return data;
}*/

/*async function onDeleteGamesClick() {
    if(lastCreatedItem === null) {
        console.log("Nothing yet to delete")
        return
    }
    fetch("http://localhost:3000/games" + lastCreatedItem.id + lastCreatedItem.stars, {
        method: "DELETE",
    })
}*/


