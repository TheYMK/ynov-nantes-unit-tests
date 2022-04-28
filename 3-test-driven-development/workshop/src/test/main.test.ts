import { Minesweeper } from "../main";
import { JSDOM } from "jsdom";

let app: DocumentFragment;

describe("Minesweeper", () => {
  beforeEach(() => {
    app = JSDOM.fragment(`<div id='app'></div>`);
  });

  it("should be able to create a new board game", () => {
    const board = new Minesweeper(4, 4, 4);

    expect(board).toBeDefined();
    expect(board.rows).toBe(4);
    expect(board.cols).toBe(4);

    app.querySelector("#app")!.appendChild(board.createBoard());

    const table = app.querySelector("#app table")!;
    expect(table).toBeDefined();
    expect(table.querySelectorAll("tr").length).toBe(4);
    expect(table.querySelectorAll("td").length).toBe(16);
  });

  it("should be able to generate the pattern of mines and numbers", () => {
    const rows = 4,
      cols = 4,
      mines = 5;

    const board = new Minesweeper(rows, cols, mines);

    let foundBombs = 0;
    let foundNumbers = 0;

    console.log("[DEBUG] solution", board.solution);
    for (let i = 0; i < board.rows; i++) {
      for (let j = 0; j < board.cols; j++) {
        if (board.solution[i][j] === "*") {
          foundBombs++;
        } else {
          foundNumbers++;
        }
      }
    }
    console.log("[DEBUG] foundBombs: ", foundBombs);
    console.log("[DEBUG] foundNumbers: ", foundNumbers);
    expect(foundBombs).toBe(mines);
    expect(foundNumbers).toBe(rows * cols - mines);
  });

  it("should end the game and have a status of 'lost' if selected cell has a mine", () => {
    const rows = 4,
      cols = 4,
      mines = 5;
    const board = new Minesweeper(rows, cols, mines);

    app.querySelector("#app")!.appendChild(board.createBoard());

    console.log(app.querySelector("#app")!.parentNode);
    // const table = app.querySelector("#app")!.appendChild(board.createBoard());

    outer: for (let i = 0; i < board.rows; i++) {
      inner: for (let j = 0; j < board.cols; j++) {
        // If the cell has a mine, end the game
        if (board.solution[i][j] === "*") {
          board.verifyAnswer(i, j);
          expect(board.isGameRunning).toBe(false);
          expect(board.status).toBe("lost");
          break outer;
        }
      }
    }
  });

  it("should not start the game if negative rows or columns", () => {
    expect(() => new Minesweeper(-1, -1, -1)).toThrow(Error);
  });

  // it("should end the game and have a status of 'won' if all cells without mines are selected", () => {
  //   const rows = 4,
  //     cols = 4,
  //     mines = 5;
  //   const board = new Minesweeper(rows, cols, mines);

  //   outer: for (let i = 0; i < board.rows; i++) {
  //     inner: for (let j = 0; j < board.cols; j++) {
  //       // If the cell has a mine, end the game
  //       if (board.solution[i][j] === "*") {
  //         continue;
  //       }

  //       board.verifyAnswer(i, j);
  //       if (board.isGameRunning) {
  //         continue;
  //       }

  //       expect(board.isGameRunning).toBe(false);
  //       expect(board.status).toBe("won");
  //       break outer;
  //     }
  // }
  // });
});
