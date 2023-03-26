# Sulvoku 🔢

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [How It Works](#how-it-works)
- [References](#references)
- [Learning Points](#learning-points)

---

## Description

As my first side project in computer science, I created a CLI Sudoku solver using Python and a backtracking algorithm. To reflect my progress in front-end development, I revived the project and gave it a fresh new look using React and TypeScript.

Old Project: https://github.com/shenalexw/Sudoku

---

## How To Use

Use the following link: https://shenalexw.github.io/solvuko/

#### Rules

- The game board is a 9x9 grid, divided into nine 3x3 sub-grids.
- The objective is to fill the grid with digits from 1 to 9 such that each row, column, and 3x3 sub-grid contains each digit exactly once.
- The board initially contains some numbers, called 'givens' or 'clues', which cannot be changed.
- To solve the puzzle, the player must fill in the remaining empty squares with digits that obey the above rules.
- Each puzzle has only one solution.

#### Generate

- The default board is generated at an easy difficulty level.
- To adjust the difficulty, select an option from the menu in the top left corner.
- To create a new puzzle, click on the 'Generate' button.
- Alternatively, if you prefer to start with a completely blank grid, click on the 'Blank' button to clear the board.

#### Play

- The puzzle is partially filled with numbers in each grid, these numbers cannot be changed.
- All of the blank cells in the puzzle can be filled with numbers from 1 to 9.
- Click on a cell to select it, it will be highlighted in a darker shade.
- You can input a number between 1 and 9, 0 or Backspace to clear the cell, or use the tab and arrow keys to navigate.
- If you input an invalid move, the cell will be outlined in red.
- Keep filling in the blank cells until the puzzle is complete with no red outlines.

#### Solve

- If you find the puzzle too difficult, click the 'Solve' button to fill in the solutions automatically.
- Ensure that no cells have red outlines or the solver won't be able to complete the puzzle.
- If you want to clear the solutions, click the 'Reset' button so you can try again.

---

## How It Works

The program's solver utilizes a backtracking algorithm that systematically fills in each empty cell with a valid number by recursively traversing the grid. The algorithm continues to fill in new inputs until there are no more valid options for an open cell. At this point, the algorithm backtracks to the last point where it had multiple valid solutions and tries the next option. By exhaustively exploring all possible options, the algorithm efficiently finds a solution to the puzzle.

#### Core Functions

```javaScript
function solve(board: number[][]): boolean {
  const location = findZero(board);
  if (location.row === -1) {
    return true;
  }
  for (let k = 1; k <= 9; k++) {
    if (isValid(board, location.row, location.col, k)) {
      board[location.row][location.col] = k;
      if (solve(board)) {
        return true;
      } else {
        board[location.row][location.col] = 0;
      }
    }
  }

  return false;
}

function findZero(board: number[][]): { row: number; col: number } {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return { row: i, col: j };
      }
    }
  }
  return { row: -1, col: -1 };
}

export function isValid(
  board: number[][],
  row: number,
  col: number,
  k: number
): boolean {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][i] === k ||
      board[i][col] === k ||
      board[m][n] === k
    ) {
      return false;
    }
  }
  return true;
}

// Some functions are altered to assist other functionalities of the page
```

## References

- [Async Await in TypeScript](https://blog.logrocket.com/async-await-in-typescript/)
- [Python Project Sudoku Solver](https://www.techwithtim.net/tutorials/python-programming/sudoku-solver-backtracking/)
- [How to generate a sudoku puzzle in javaScript](https://www.geeksforgeeks.org/program-sudoku-generator/)
- [React Confetti](https://www.npmjs.com/package/react-confetti)

## Learning Points

- When you map through an array and return a jsx component on each iteration, map will return an array of the jsx components that react will understand how to render.
- The :nth-child selector allows you to select one or more elements based on their source order, according to a formula

[Back To The Top](#read-me-template)
