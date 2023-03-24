import { Component} from "react";
import Snackbar from "./Snackbar"
import Cell from "./Cell";
import { isValid, solve, newBoard } from "../util";
import "../css/Home.css";
type Props = {};

type State = {
  originalBoard: number[][]
  board: number[][];
  message: string;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      originalBoard: [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7],
      ],
      board: [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7],
      ],
      message: "",
    };
    this.handleClearMessage = this.handleClearMessage.bind(this);
    this.handleUpdateCell = this.handleUpdateCell.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.generateNewBoard = this.generateNewBoard.bind(this);
  }

  resetRed(): void{
    const gridBlocks = document.querySelectorAll(".grid-block.red");
    for (let i = 0; i < gridBlocks.length; i++) {
      gridBlocks[i].className = "grid-block";
    }
  }

  handleSolve(): void {
    // Make a deepcopy
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    const boolSolved : Boolean = solve(newBoard)
    if (boolSolved){
      this.resetRed();
      this.handleChangeMessage("Puzzle has been Solved");
      this.setState({ board: newBoard });
      return
    }
    this.handleChangeMessage("Puzzle in Unsolvable");
  }

  generateNewBoard(): void {
    const brandNewBoard: number[][] = newBoard();
    this.setState({
      originalBoard: brandNewBoard,
      board: brandNewBoard,
    });
    this.handleChangeMessage("Puzzle has been generated")
  }

  handleChangeMessage(message: string): void{
    this.setState({message: message })
  }

  handleClearMessage(): void{
    console.log("message cleared")
    this.setState({message: ""})
  }

  handleReset(): void{
    this.setState({
      board: this.state.originalBoard
    })
    this.resetRed();
    this.handleChangeMessage("Board has been reset")
  }

  handleUpdateCell(value: number, rowIndex: number, colIndex: number): void{
    const cell = document.getElementById(String(rowIndex) + ":" + String(colIndex));
    // if(Number(cell!.innerHTML) === value){return}
    
    if (value === 0) {
      cell!.className = "grid-block" 
    } else if (!isValid(this.state.board, rowIndex, colIndex, value)){
      cell!.className = "grid-block red" 
    } else {
      cell!.className = "grid-block" 
    }
    
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    newBoard[rowIndex][colIndex] = value
    this.setState({
      board: newBoard
    })
  }

  handleValidation():void {
    let validBool = true
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.state.originalBoard[i][j] === 0){
          const check = isValid(this.state.board, i, j, this.state.board[i][j])
          if(!check){
            const cell = document.getElementById(String(i) + ":" + String(j));
            cell!.className = "grid-block red" ;
            validBool = false
          }
        }
     }
    }
    this.handleChangeMessage(validBool ? "Board contains all valid moves" : "Board contains invalid moves")
   }


  render() {
    return (
      <>
        <h1 className="title">Sulvoku</h1>
        <div className="grid">
          {this.state.board.map((row, rowIndex) => {
            return (
              <div className="grid-row" key={rowIndex}>
                {row.map((num, colIndex) => (
                  <Cell key={colIndex} rowIndex={rowIndex} colIndex={colIndex} number={num} handleCellUpdate={this.handleUpdateCell} static={this.state.originalBoard[rowIndex][colIndex] !== 0 ? true : false}/>
                ))}
              </div>
            );
          })}
        </div>
        <div className="button-options">
          <button className="basic-button" onClick={() => this.handleValidation()}>Validate</button>
          <button className="basic-button" onClick={() => this.handleSolve()}>Solve</button>
          <button className="basic-button" onClick={() => this.generateNewBoard()}>Generate</button>
          <button className="basic-button" onClick={() => this.handleReset()}>Reset</button>
        </div>
        <Snackbar message={this.state.message} clearMessage={this.handleClearMessage}/>
      </>
    );
  }
}
