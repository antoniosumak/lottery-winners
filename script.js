import Lottery from "./modules/lottery.js";
import { politicians, folk } from "./data/data.js";

const buttonStartLottery = document.querySelector(".button-start-lottery");
const lottteryResultsEl = document.querySelector(".lottery-results");
const winningCombinationEl = document.querySelector(".winning-combination");
const winningMessageEl = document.querySelector(".winners-message");
const winnersEl = document.querySelector(".winners");
const ikonaX = document.querySelector(".fas");

const lottery = new Lottery(politicians);

buttonStartLottery.addEventListener("click", () => {
  buttonStartLottery.disabled = true;
  buttonStartLottery.innerHTML = "Lottery drawing in progress...";
  lottteryResultsEl.style.display = "none";
  lottery
    .startDrawing()
    .then((rezultat) => {
      winningCombinationEl.innerHTML = `Winning combination was: ${rezultat.winningCombinatio}`;
      let winnersList = "";
      rezultat.winners.forEach((player) => {
        winnersList += `<li>${player.getPlayerDetails()}</li>`;
        winnersEl.innerHTML = winnersList;
        winningMessageEl.innerHTML = "Winners:";
        ikonaX.style.display = "none";
      });
    })
    .catch((rezultat) => {
      console.log(rezultat);
      winningMessageEl.innerHTML = "There are no winners!";

      ikonaX.style.display = "block";
    })
    .finally(() => {
      buttonStartLottery.disabled = false;
      buttonStartLottery.innerHTML = "Start lottery drawing";
      lottteryResultsEl.style.display = "block";
    });
});
