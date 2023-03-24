const difficultyDict: { [char: string]: number } = {
  Easy: 33,
  Medium: 40,
  Hard: 50,
};

export function isValid(
  board: number[][],
  row: number,
  col: number,
  k: number
): boolean {
  let newBoard = board;
  if (board[row][col] !== 0) {
    newBoard = [...board]
    newBoard[row][col] = 0
  }
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      newBoard[row][i] === k ||
      newBoard[i][col] === k ||
      newBoard[m][n] === k
    ) {
      return false;
    }
  }
  return true;
}

export function solve(board: number[][]): boolean {
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

export function findZero(board: number[][]): { row: number; col: number } {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return { row: i, col: j };
      }
    }
  }
  return { row: -1, col: -1 };
}

export function newBoard(difficulty: string): number[][] {
  let grid = new Array(9).fill(null).map(() => new Array(9).fill(0));
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          if (k === l) {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            while (numbers.length > 0) {
              const index = Math.floor(Math.random() * numbers.length);
              const num = numbers[index];
              if (isValid(grid, k, l, num)) {
                grid[k][l] = num;
              }
              numbers.splice(index, 1);
            }
          }
        }
      }
    }
  }
  solve(grid);
  randomFillZero(grid, difficultyDict[difficulty]);
  return grid;
}

function randomFillZero(board: number[][], amount: number): void {
  if (amount === undefined) {
    return;
  }
  while (true) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (amount !== 0 && board[i][j] !== 0) {
          if (Math.floor(Math.random() * 4) < 1) {
            board[i][j] = 0;
            amount -= 1;
          }
          if (amount === 0) {
            return;
          }
        }
      }
    }
  }
}
