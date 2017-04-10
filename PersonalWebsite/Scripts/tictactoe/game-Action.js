$(document).ready(function () {
    var boardIds = [
        ["top-l", "top-m", "top-r"],
        ["mid-l", "mid-m", "mid-r"],
        ["bot-l", "bot-m", "bot-r"],
    ];

    var playableBoxes = [],
        classname = document.getElementsByClassName("box-content"),
        resetGame = document.getElementById("reset-game-btn"),
        startGameBtn = document.getElementById("start-game-btn"),
        clickBoard = document.getElementById("game-area"),
        scoreHolderX = document.getElementById("player-x"),
        humanCpuButton = document.getElementById("human-cpu-mode"),
        scoreHolderO = document.getElementById("player-o"),
        playingLetter = "X",
        winner = false,
        moveCounter = 0;

    var gameModeSelected,
        scoreX = 0,
        scoreO = 0,
        humanCpuMode = false;

    scoreHolderX.innerText = scoreX;
    scoreHolderO.innerText = scoreO;

    var gameBoard = [
        ["~", "~", "~"],
        ["~", "~", "~"],
        ["~", "~", "~"]
    ];

    var startButton = document.getElementById("start-game-btn");
    startButton.addEventListener("click", function () {
        $(startGameBtn).prop("disabled", true);
        getGameMode();
        luanchGameMode();
    });

    var getGameMode = function getGameMode() {
        var allButtons = document.getElementsByClassName("btn-switch");
        for (var x = 0; x < allButtons.length; x++) {
            var button = document.getElementById(allButtons[x].id)
            if (button.innerText == "ON") {
                gameModeSelected = button.id;
            }
        }
    };

    var luanchGameMode = function luanchGameMode() {
        switch (gameModeSelected) {
            case "human-cpu-mode":
                humanCpuMode();
                break;
            case "cpu-cpu-mode":
                cpuCpuMode();
                break;
            default:
                humanHumanMode();
                break;
        }
    };

    var humanHumanMode = function humanHumanMode() {
        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('click', gameControl, false);
            playableBoxes.push(classname[i].id);
        }

        function gameControl() {
            moveCounter++;
            modifyBox(this);
            trackGameMoves(this.id);
            checkWinStatus();
            playingLetter = (playingLetter == "X") ? playingLetter = "O" : "X";
            if (moveCounter == 9) {
                noWinners();
            }
        }
    };

    var humanCpuMode = function humanCpuMode() {
        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('click', gameControl, false);
            playableBoxes.push(classname[i].id);
        }

        function gameControl() {
            moveCounter++;
            modifyBox(this);
            trackGameMoves(this.id);
            checkWinStatus();
            playingLetter = (playingLetter == "X") ? playingLetter = "O" : "X";
            if (moveCounter == 9) {
                noWinners();
            }
            if (playingLetter == "O" && winner == false) {
                cpuTurnToPick();
            }
        }
    };

    var cpuCpuMode = function cpuCpuMode() {
        for (var i = 0; i < classname.length; i++) {
            playableBoxes.push(classname[i].id);
        }
        var intervalID = window.setInterval(myCallback, 800);

        function myCallback() {
            if (winner == false) {
                cpuTurnToPick();
            }
        };
    };

    var cpuTurnToPick = function cpuTurnToPick() {
        var delayTime = window.setTimeout(delayCpuMove, 400);

        function delayCpuMove() {
            moveCounter++;
            var randomSelection = Math.floor(Math.random() * (playableBoxes.length - 0)) + 0;
            var element = document.getElementById(playableBoxes[randomSelection]);
            element.innerText = playingLetter;
            element.classList.remove("hover-over");
            element.style.pointerEvents = "none";
            trackGameMoves(playableBoxes[randomSelection]);
            checkWinStatus();
            playableBoxes.splice(randomSelection, 1);
            playingLetter = (playingLetter == "X") ? "O" : "X";
            if (moveCounter == 9) {
                noWinners();
            }
        };
    }

    var noWinners = function noWinners() {
        if (winner == false) {
            for (var i = 0; i < classname.length; i++) {
                var element = document.getElementById(classname[i].id);
                element.style.color = "#d9534f";
            }
        };
        clearForNextGame();
    }

    function gameOver(letter) {
        if (letter == "O") {
            scoreHolderO.innerText = ++scoreO;
            scoreHolderO.style.color = "#5cb85c";
        } else {
            scoreHolderX.innerText = ++scoreX;
            scoreHolderX.style.color = "#5cb85c";
        }
        clickBoard.style.pointerEvents = "none";
        winner = true;
        for (var i = 0; i < classname.length; i++) {
            var element = document.getElementById(classname[i].id);
            element.style.pointerEvents = "none";
        }
        clearForNextGame();
    }

    function checkMatch(box1, box2, box3) {
        var matchStatus = (box1 == box2 && box1 == box3) ? true : false;
        return matchStatus;
    }

    function addColorToWinner(winnerList) {
        for (var x in winnerList) {
            var element = document.getElementById(winnerList[x]);
            element.style.color = "#5cb85c";
        }
        clickBoard.style.color = "grey";
    };

    var modifyBox = function modifyBox(clickedBox) {
        clickedBox.innerText = playingLetter;
        clickedBox.classList.remove("hover-over");
        clickedBox.style.pointerEvents = "none";
        playableBoxes.splice(playableBoxes.indexOf(clickedBox.id), 1);
    }

    var trackGameMoves = function trackGameMoves(clickedId) {
        var column = "",
            row = "";
        for (var x in boardIds) {
            boardIds[x].includes(clickedId) ? column = x : "";
        }
        row = boardIds[column].indexOf(clickedId);
        gameBoard[column][row] = playingLetter;
    }

    var clearForNextGame = function clearForNextGame() {
        var delayTime = window.setTimeout(delayClear, 2000);

        function delayClear() {
            for (var i = 0; i < classname.length; i++) {
                var element = document.getElementById(classname[i].id);
                element.innerText = "";
                element.style.color = "black";
                element.style.pointerEvents = "auto";
                playableBoxes.push(classname[i].id);
            }
            winner = false;
            moveCounter = 0;
            gameBoard = [
                ["~", "~", "~"],
                ["~", "~", "~"],
                ["~", "~", "~"]
            ];
            playingLetter = "X";
            playableBoxes = [];

            for (var i = 0; i < classname.length; i++) {
                playableBoxes.push(classname[i].id);
            }
            scoreHolderO.style.color = "black";
            scoreHolderX.style.color = "black";
        }
    };

    var checkWinStatus = function checkWinStatus() {
        // Check rows and columns for winner
        for (var x in gameBoard) {
            if (!gameBoard[x][0].includes("~")) {
                if (checkMatch(gameBoard[x][0], gameBoard[x][1], gameBoard[x][2])) {
                    addColorToWinner(boardIds[x]);
                    gameOver(gameBoard[x][0]);
                }
            }
            if (![gameBoard[0][x], gameBoard[1][x], gameBoard[2][x]].includes("~")) {
                if (checkMatch(gameBoard[0][x], gameBoard[1][x], gameBoard[2][x])) {
                    addColorToWinner([boardIds[0][x], boardIds[1][x], boardIds[2][x]]);
                    gameOver(gameBoard[0][x]);
                }
            }
        };

        // Check diagnols for winner 
        if (![gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]].includes("~")) {
            if (checkMatch(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
                addColorToWinner([boardIds[0][0], boardIds[1][1], boardIds[2][2]]);
                gameOver(gameBoard[0][0]);
            }
        }
        if (![gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]].includes("~")) {
            if (checkMatch(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])) {
                addColorToWinner([boardIds[0][2], boardIds[1][1], boardIds[2][0]]);
                gameOver(gameBoard[0][2]);
            }
        }
    };

    resetGame.addEventListener("click", function () {
        location.reload();
    });
});