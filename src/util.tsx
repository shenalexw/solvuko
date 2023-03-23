export function isValid(board : number[][], row: number, col: number, k: number) : boolean{
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
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
