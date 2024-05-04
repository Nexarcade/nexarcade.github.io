const prod = localStorage.getItem("prod")

async function getGames() {
    const response = await fetch("/games.json");
    const data = await response.json();
    return data;
}

function makeButton(gameName) {

    if (gameName.search("__DEV__") != -1 && prod != 'dev'){
        return
    }

    gameName = gameName.replace('__DEV__', '')

    const newButton = document.createElement("a");
    newButton.href = `play.html?game=${gameName}`;
    newButton.style.borderRadius = "30%";
    
    const img = document.createElement("img");
    img.className = "gameButton";
    img.style.border = "20px solid transparent"
    img.alt = gameName;
    img.style.borderRadius = "30%";
    img.src = "/games/" + gameName + "/icon";
    img.width = 100;
    img.height = 100;
    
    newButton.appendChild(img);
    document.querySelector('.container').appendChild(newButton);
}

getGames().then(gameNames => {
    gameNames.forEach(gameName => makeButton(gameName));
});
