$(document).ready(function () {
    var enterButton = document.getElementById("enter-button"),
        resetButton = document.getElementById("reset-button"),
        winnerHolder = document.getElementById("winner-holder"),
        listHolder = document.getElementById("total-list"),
        wonList = document.getElementById("won-list"),
        winnerBox = document.getElementById("winner"),
        getMin = document.getElementById("setMin"),
        getMax = document.getElementById("setMax"),
        allNums = [],
        firstTime = true,
        wonNums = [];

    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)]
    }

    enterButton.addEventListener("click", function () {

        if (firstTime == true) {
            var min = Math.ceil(getMin.value)
                max = Math.floor(getMax.value);
            for (var x = min; x <= max; x++) {
                allNums.push(x)
            };
        }

        updateArrays();
        renderArrays();
        winnerHolder.classList.remove("hidden");
    });

    var updateArrays = function updateArrays() {
        if (allNums.length) {
            var getNum = allNums.random();
            winnerBox.innerText = getNum;
            wonNums.push(getNum);
            var location = allNums.indexOf(getNum);
            allNums.splice(location, 1);
        } else {
            winnerBox.innerText = "Done";
        }
    }

    var renderArrays = function renderArrays() {
        listHolder.innerHTML = " ";
        wonList.innerHTML = " ";

        if (allNums.length) {
            for (var x = 0; x < allNums.length; x++) {
                var item = document.createElement("li");
                item.classList.add("list-group-item");
                item.innerText = allNums[x];
                item.classList.add("list-group-item-danger");
                listHolder.appendChild(item);
            };
        } else {
            listHolder.innerText = "All numbers have won";
        };


        for (var x = 0; x < wonNums.length; x++) {
            var item = document.createElement("li");
            item.classList.add("list-group-item");
            item.innerText = wonNums[x];
            item.classList.add("list-group-item-success");
            wonList.appendChild(item);
        }

        firstTime = false;
    }

    resetButton.addEventListener("click", function () {
        winnerHolder.classList.add("hidden");
        allNums = [];
        listHolder.innerHTML = "";
        wonNums = [];
        wonList.innerHTML = "";
        firstTime = true;
        getMin.value = "";
        getMax.value = "";
    })
});