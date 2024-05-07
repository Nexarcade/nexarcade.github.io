const prod = localStorage.getItem("prod")

async function getGames() {
    const response = await fetch("/games.json");
    const data = await response.json();
    return data;
}

async function getGameDistributionGames() {

    var hugelist = []

    for (let i = 1; i <= 5; i++) {
        const response = await fetch(`/gdlists/${i.toString()}.json`);
        const data = await response.json();
        let ii = 0;
        while (ii < data.length) {
            hugelist.push(data[ii])
            ii++;
        }
    }

    return hugelist;
}

function makeButton(gameName, icon, path) {

    if (gameName.search("__DEV__") != -1 && prod != 'dev'){
        return
    }

    const newButton = document.createElement("a");
    newButton.href = path;
    newButton.style.borderRadius = "30%";
    
    const img = document.createElement("img");
    img.className = "gameButton";
    img.style.border = "20px solid transparent"
    img.alt = gameName;
    img.style.borderRadius = "30%";
    img.src = icon;
    img.width = 100;
    img.height = 100;
    
    newButton.appendChild(img);
    document.querySelector('.container').appendChild(newButton);
}

getGames().then(gameNames => {
    gameNames.forEach(
        gameName => function(){
            gameNameForPath = gameName.replace('__DEV__', '')
            makeButton(gameName, `/games/${gameNameForPath}/icon`, `play.html?game=${gameNameForPath}&icon=/games/${gameNameForPath}/icon`)
        }()
    )
});

getGameDistributionGames().then(gameDatas => {
    gameDatas.forEach(
        gameData => function(){
            makeButton(gameData["Title"], gameData["Asset"][0], `play.html?game=gdiframe&md5=${gameData['Md5']}&icon=${gameData["Asset"][0]}`)
        }()
    )
});
