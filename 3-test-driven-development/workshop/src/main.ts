export class Minesweeper {
  rows: number;
  cols: number;
  mines: number;
  solution: string[][];
  isGameRunning: boolean;
  status: string;
  userBoard: string[][];

  constructor(rows: number, cols: number, mines: number) {
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;

    if (Number.isNaN(this.rows) || this.rows <= 0) {
      throw new Error("Rows can not me negative or null");
    }

    if (Number.isNaN(this.cols) || this.cols <= 0) {
      throw new Error("Columns can not me negative or null");
    }

    if (Number.isNaN(this.mines) || this.mines <= 0) {
      throw new Error("Mines can not me negative or null");
    }

    if (Number.isNaN(this.mines) || this.mines > this.rows * this.cols) {
      throw new Error("Mines cannot be greater then (Rows*Columns)");
    }

    this.isGameRunning = true;
    this.status = "playing";
    this.solution = this.generateNumbers();
    this.userBoard = [...new Array(this.rows)].map(() => new Array(this.cols));
  }

  createBoard() {
    const table = document.createElement("table");
    table.classList.add("minesweeper");
    for (let i: number = 0; i < this.rows; i++) {
      const tr = document.createElement("tr");
      for (let j: number = 0; j < this.cols; j++) {
        const td = document.createElement("td");
        td.classList.add("cell");
        td.setAttribute("data-row", i.toString());
        td.setAttribute("data-col", j.toString());
        td.addEventListener("click", () => this.verifyAnswer(i, j));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  }

  // initGame() {
  //   const table: Array<any> = [];
  //   for (let i: number = 0; i < this.rows; i++) {
  //     const tr: Array<any> = [];
  //     for (let j: number = 0; j < this.cols; j++) {
  //       const td: Array<any> = [];
  //       tr.push();
  //     }
  //     table.appendChild(tr);
  //   }
  // }

  private generateBombs() {
    const schema = "0".repeat(this.cols * this.rows);
    let bombString = schema;

    for (let i: number = 0; i < this.mines; i++) {
      const index = Math.floor(Math.random() * schema.length);
      if (bombString[index] === "0") {
        bombString =
          bombString.substring(0, index) +
          "*" +
          bombString.substring(index + 1);
      } else {
        i--;
      }
    }

    const bombArray = [];

    for (let i: number = 0; i < this.rows; i++) {
      const row = bombString.substring(i * this.cols, (i + 1) * this.cols);
      bombArray.push(row.split(""));
    }

    return bombArray;
  }

  private generateNumbers() {
    const bombArray = this.generateBombs();
    let schema = bombArray;
    bombArray.forEach((row, rowI) => {
      row.forEach((cell, cellI) => {
        if (cell === "*") {
          schema = this.incrementSurroundingCells(schema, rowI, cellI);
        }
      });
    });

    return schema;
  }

  private incrementSurroundingCells(
    bombArray: string[][],
    rowI: number,
    cellI: number
  ) {
    // top left cell
    if (
      bombArray[rowI - 1] &&
      bombArray[rowI - 1][cellI - 1] &&
      bombArray[rowI - 1][cellI - 1] !== "*"
    ) {
      bombArray[rowI - 1][cellI - 1] = String(
        parseInt(bombArray[rowI - 1][cellI - 1]) + 1
      );
    }

    // top cell
    if (
      bombArray[rowI - 1] &&
      bombArray[rowI - 1][cellI] &&
      bombArray[rowI - 1][cellI] !== "*"
    ) {
      bombArray[rowI - 1][cellI] = String(
        parseInt(bombArray[rowI - 1][cellI]) + 1
      );
    }

    // top right cell
    if (
      bombArray[rowI - 1] &&
      bombArray[rowI - 1][cellI + 1] &&
      bombArray[rowI - 1][cellI + 1] !== "*"
    ) {
      bombArray[rowI - 1][cellI + 1] = String(
        parseInt(bombArray[rowI - 1][cellI + 1]) + 1
      );
    }

    // left cell
    if (bombArray[rowI][cellI - 1] && bombArray[rowI][cellI - 1] !== "*") {
      bombArray[rowI][cellI - 1] = String(
        parseInt(bombArray[rowI][cellI - 1]) + 1
      );
    }

    // right cell
    if (bombArray[rowI][cellI + 1] && bombArray[rowI][cellI + 1] !== "*") {
      bombArray[rowI][cellI + 1] = String(
        parseInt(bombArray[rowI][cellI + 1]) + 1
      );
    }

    // bottom left cell
    if (
      bombArray[rowI + 1] &&
      bombArray[rowI + 1][cellI - 1] &&
      bombArray[rowI + 1][cellI - 1] !== "*"
    ) {
      bombArray[rowI + 1][cellI - 1] = String(
        parseInt(bombArray[rowI + 1][cellI - 1]) + 1
      );
    }

    // bottom cell
    if (
      bombArray[rowI + 1] &&
      bombArray[rowI + 1][cellI] &&
      bombArray[rowI + 1][cellI] !== "*"
    ) {
      bombArray[rowI + 1][cellI] = String(
        parseInt(bombArray[rowI + 1][cellI]) + 1
      );
    }

    // bottom right cell
    if (
      bombArray[rowI + 1] &&
      bombArray[rowI + 1][cellI + 1] &&
      bombArray[rowI + 1][cellI + 1] !== "*"
    ) {
      bombArray[rowI + 1][cellI + 1] = String(
        parseInt(bombArray[rowI + 1][cellI + 1]) + 1
      );
    }

    return bombArray;
  }

  verifyAnswer(rowIndex: number, columnIndex: number) {
    console.log(document.querySelector("#app")?.parentNode);
    if (this.solution[rowIndex][columnIndex] === "*") {
      this.isGameRunning = false;
      this.status = "lost";

      return this.explode();
    }

    this.userBoard[rowIndex][columnIndex] =
      this.solution[rowIndex][columnIndex];

    if (this.isGameWon()) {
      this.isGameRunning = false;
      this.status = "won";

      return this.celebrate();
    }

    this.reRenderRow(rowIndex, columnIndex);
  }

  private isGameWon() {
    const isOnlyRemainingBombCell =
      this.userBoard.flatMap((row) => row.filter((cell) => cell)).length ===
      this.rows * this.cols - this.mines;
    return isOnlyRemainingBombCell;
  }

  private explode() {
    document.querySelector(
      "#app"
    )!.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center"><img src="./src/assets/explode.gif" style="width: 500px;" /> <h1>${this.status}!</h1> <button class="btn" id="replay">Play again</button></div>`;
    document
      .getElementById("replay")!
      .addEventListener("click", () => this.replay());
  }

  private celebrate() {
    document.querySelector(
      "#app"
    )!.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center"><img src="./src/assets/celebrate.gif" style="width: 500px;" /> <h1>${this.status}!</h1> <button class="btn" id="replay">Play again</button></div>`;
    document
      .getElementById("replay")!
      .addEventListener("click", () => this.replay());
  }

  private replay() {
    document.querySelector("#app")!.innerHTML = "";
    this.isGameRunning = true;
    this.status = "playing";
    this.solution = this.generateNumbers();
    this.userBoard = [...new Array(this.rows)].map(() => new Array(this.cols));
    document.querySelector("#app")!.appendChild(this.createBoard());
  }

  private reRenderRow(rowIndex: number, columnIndex: number) {
    const row = document.querySelectorAll("tr")[rowIndex];
    const cell = row.querySelectorAll("td")[columnIndex];
    cell.innerHTML = this.userBoard[rowIndex][columnIndex];
  }
}

const board = new Minesweeper(4, 4, 1);

document.querySelector("#app")?.appendChild(board.createBoard());
