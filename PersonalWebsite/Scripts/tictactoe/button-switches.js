$(document).ready(function () {
    var position = false,
        buttons = document.getElementsByClassName("btn-switch"),
        guideMessage = document.getElementById("guide-message"),
        startGameBtn = document.getElementById("start-game-btn");
    // btnHolder = document.getElementsByClassName("switch-holder");
    for (var x = 0; x < buttons.length; x++) {
        buttons[x].addEventListener("click", clickEvents, false)
    }

    function clickEvents() {
        var element = document.getElementById(this.id);
        element.style.float = (position == false) ? "right" : "left";
        if (position == false) {
            element.parentElement.style.backgroundColor = "#5cb85c";
            element.innerText = "ON";
            guideMessage.innerText = "Click start game";
            $(startGameBtn).prop("disabled", false);
            for (var x = 0; x < buttons.length; x++) {
                var tempName = document.getElementById(buttons[x].id);
                if (tempName.innerText == "OFF") {
                    tempName.style.color = "grey";
                    tempName.style.pointerEvents = "none";
                }
            }
        } else {

            location.reload();
        }

        position = (position == false) ? true : false;
    }
});