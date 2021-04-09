import Player from "./player.js";

export default class Lottery {
  constructor(people) {
    this.people = people;
    this.players = [];
    this.winningCombination = [];
  }

  getLotteryNumbers() {
    let lotteryNumbers = [];

    while (lotteryNumbers.length < 4) {
      const number = Math.floor(Math.random() * 7) + 1; //floor nam sluzi za zaokruzivanje, *7 znaci da generira brojve do 100

      if (lotteryNumbers.indexOf(number) === -1) {
        //Ako je -1 onda ne postoji u polju
        lotteryNumbers.push(number); //Dodavanje u polje
      }
    }

    lotteryNumbers.sort();
    return lotteryNumbers;
  }

  generatePlayers() {
    this.people.map((person) => {
      const name = person.name;
      const surname = person.surname;
      const lotteryNumbers = this.getLotteryNumbers();

      const player = new Player(name, surname, lotteryNumbers); //Kreiranje playera preko konstruktora player klase

      this.players.push(player);
    });
  }
  //Metodom Map prolazimo kroz polje i za svaki objekt generiramo playera

  getWinningCombination() {
    this.winningCombination = this.getLotteryNumbers();
  }

  startDrawing() {
    this.generatePlayers();
    this.getWinningCombination();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const winners = this.players.filter((player) =>
          player.lotteryNumbers.every(
            (val, index) => val === this.winningCombination[index]
          )
        );

        const result = {
          winningCombinatio: this.winningCombination,
          winners: winners,
        };

        if (winners.length > 0) {
          resolve(result);
        } else {
          reject(result);
        }
      }, 2000);
    });
  }
}
