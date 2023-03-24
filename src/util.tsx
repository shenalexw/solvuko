const EASY = 33
const MEDIUM = 40
const HARD = 61

export function isValid(board : number[][], row: number, col: number, k: number) : boolean{
    let newBoard = board
    if (k !== 0){
      newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][col] = 0
    }
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (newBoard[row][i] === k || newBoard[i][col] === k || newBoard[m][n] === k) {
          return false;
        }
    }
    return true;
}


export function solve (board: number[][]) :  boolean{
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

export function findZero(board: number[][]) : {row: number, col: number}{
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === 0) {
           return {row: i, col: j};
         }
       }
     }
    return {row: -1, col: -1}
}

export function newBoard(): number[][]{
  let grid = new Array(9).fill(null).map(() => new Array(9).fill(0));
  // for (let i = 0; i < 3; i ++) {
  //   let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  //   while (numbers.length !== 0){
  //     const idx = Math.floor(Math.random() * numbers.length);
  //     const num = numbers[idx];
  //     if(isValid(grid, i, 9 - numbers.length, num)){
  //       numbers.splice(idx, 1);
  //       grid[i][8 - numbers.length] = num;
  //     }
  //   }
  // }


  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          if (k === l) { // check if cell is on diagonal
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            while (numbers.length > 0) {
              const idx = Math.floor(Math.random() * numbers.length);
              const num = numbers[idx];
              if (isValid(grid, k, l, num)) {
                grid[k][l] = num;
              }
              numbers.splice(idx, 1);
            }
          }
        }
      }
    }
  }
  solve(grid)
  randomFillZero(grid, EASY)
  return grid
}

function randomFillZero(board: number[][], amount: number): void{
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (amount !== 0 && board[i][j] !== 0){
        if(Math.floor(Math.random() * 4) < 1){
          board[i][j] = 0
          amount -= 1
        }
        if (amount === 0) {
          return
        }
      }
   }
 }
}
