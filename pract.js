const btns = document.querySelectorAll(".btn");
const bet = document.querySelector("#bet");
const amt = document.querySelector(".Amount");
const cal = document.querySelector(".calculate");
const profit = document.querySelector("#total");
const mine = document.querySelector("#mines");
const cashOut = document.querySelector("#cashOut");
let bal = document.querySelector(".currency-amount");
let betamt = document.querySelector(".betamt");
let half = document.querySelector("#half");
let double = document.querySelector("#twice");

half.addEventListener("click", () => {
    betamt.value = (parseFloat(betamt.value) * 0.5).toFixed(2);
});

double.addEventListener("click", () => {
    betamt.value = (parseFloat(betamt.value) * 2).toFixed(2);
});

let mines = 1;
let gems = 25;
let add = 0;
let arr = [];
let count = 0;
let gameActive = false;

mine.addEventListener('change', () => {
    mines = parseInt(mine.value);
});

bet.addEventListener("click", () => {
    if (betamt.value !== "") {
        if (parseFloat(betamt.value) <= parseFloat(bal.textContent)) {
            cal.classList.remove("hidden");
            amt.classList.add("hidden");
            playGame(gems, mines, generateRandom(mines, arr), parseFloat(betamt.value));
        } else {
            alert("Insufficient balance");
        }
    } else {
        alert("Enter the amount");
    }
});

cashOut.addEventListener('click', () => {
    amt.classList.remove("hidden");
    cal.classList.add("hidden");
    btns.forEach((btn) => {
        btn.disabled = true;
        btn.innerText = "";
    });
    bal.innerText = (parseFloat(bal.innerText) + add).toFixed(2);
    add = 0;
    gameActive = false;
});

function playGame(gems, mines, num, balance) {
    gameActive = true;
    count = 0;
    bal.innerText = (parseFloat(bal.innerText) - balance).toFixed(2);

    const gems1 = document.querySelector("#calgems");
    const mines1 = document.querySelector("#calmines");
    const amount = document.querySelector("#amt");
    const total = document.querySelector("#total");

    amount.innerText = betamt.value;
    gems -= mines;
    gems1.textContent = gems;
    mines1.textContent = mines;
    total.innerText = balance;

    btns.forEach((btn) => {
        btn.disabled = false;
        btn.innerText = "";
    });
}

function handleClick(e) {
    if (!gameActive) return;

    count += 1;
    const btn = e.target;
    const num = parseInt(btn.value);

    if (arr.includes(num)) {
        btn.textContent = "💣";
        disableBox();
        setTimeout(gameOver, 500);
    } else if (count === gems) {
        setTimeout(() => {
            winner(parseFloat(document.querySelector("#total").innerText));
        }, 500);
    } else {
        btn.disabled = true;
        btn.textContent = "💎";
        const total = document.querySelector("#total");
        total.innerText = (parseFloat(total.innerText) * 1.2).toFixed(2);
        add = parseFloat(total.innerText);
    }
}

btns.forEach((btn) => {
    btn.addEventListener("click", handleClick);
});

function disableBox() {
    btns.forEach((btn) => {
        btn.disabled = true;
    });
    setTimeout(() => {
        amt.classList.remove("hidden");
        cal.classList.add("hidden");
    }, 1000);
}

function winner(text) {
    disableBox();
    bal.innerText = (parseFloat(bal.innerText) + text).toFixed(2);
    amt.classList.remove("hidden");
    cal.classList.add("hidden");
    btns.forEach((btn) => {
        btn.disabled = true;
        btn.innerText = "";
    });
    gameActive = false;
}

function gameOver() {
    disableBox();
    amt.classList.remove("hidden");
    cal.classList.add("hidden");
    btns.forEach((btn) => {
        btn.disabled = true;
        btn.innerText = "";
    });
    gameActive = false;
}

function generateRandom(mines, arr) {
    arr.length = 0;
    let c = 0;
    while (c < mines) {
        let num = Math.floor((Math.random() * 25) + 1);
        if (!arr.includes(num)) {
            arr.push(num);
            c += 1;
        }
    }
    return arr;
}
