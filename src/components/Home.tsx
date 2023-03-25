import { Component } from "react";
import Snackbar from "./Snackbar";
import Cell from "./Cell";
import { isValid, solve, newBoard } from "../util";
import "../css/Home.css";
type Props = {};

type State = {
  originalBoard: number[][];
  board: number[][];
  message: string;
  difficulty: string;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      originalBoard: [],
      board: [],
      message: "",
      difficulty: "Easy",
    };

    this.handleClearMessage = this.handleClearMessage.bind(this);
    this.handleUpdateCell = this.handleUpdateCell.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.generateNewBoard = this.generateNewBoard.bind(this);
    this.handleDifficulty = this.handleDifficulty.bind(this);
    this.handleValidationofRed = this.handleValidationofRed.bind(this);
    this.handleBlank = this.handleBlank.bind(this);
  }

  componentDidMount() {
    const myElement = document.getElementById("difficulty-buttons");
    const firstChild = myElement!.children[0];
    firstChild.className = "basic-button selected";
    const brandNewBoard: number[][] = newBoard(this.state.difficulty);
    this.setState({
      originalBoard: brandNewBoard,
      board: brandNewBoard,
    });
  }

  resetRed(): void {
    const gridBlocks = document.querySelectorAll(".grid-block.red");
    for (let i = 0; i < gridBlocks.length; i++) {
      gridBlocks[i].className = "grid-block";
    }
  }

  handleSolve(): void {
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    const boolSolved: Boolean = solve(newBoard);
    if (boolSolved) {
      this.resetRed();
      this.handleChangeMessage("Puzzle has been Solved");
      this.setState({ board: newBoard });
      return;
    }
    this.handleChangeMessage("Puzzle in Unsolvable");
  }

  generateNewBoard(): void {
    const brandNewBoard: number[][] = newBoard(this.state.difficulty);
    this.setState({
      originalBoard: brandNewBoard,
      board: brandNewBoard,
    });
    this.handleChangeMessage(
      this.state.difficulty + " puzzle has been generated"
    );
    this.resetRed();
  }

  handleChangeMessage(message: string): void {
    this.setState({ message: message });
  }

  handleClearMessage(): void {
    console.log("message cleared");
    this.setState({ message: "" });
  }

  handleReset(): void {
    this.setState({
      board: this.state.originalBoard,
    });
    this.resetRed();
    this.handleChangeMessage("Board has been reset");
  }

  handleUpdateCell(value: number, rowIndex: number, colIndex: number): void {
    if (value === this.state.board[rowIndex][colIndex] && value !== 0) {
      return;
    }

    const cell = document.getElementById(
      String(rowIndex) + ":" + String(colIndex)
    );

    if (value === 0) {
      cell!.className = "grid-block";
    } else if (!isValid(this.state.board, rowIndex, colIndex, value)) {
      cell!.className = "grid-block red";
    } else {
      cell!.className = "grid-block";
    }

    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    newBoard[rowIndex][colIndex] = value;
    this.setState(
      {
        board: newBoard,
      },
      () => {
        if (value === 0) {
          this.handleValidationofRed();
        }
      }
    );
  }

  handleValidationofRed(): void {
    let redBlocks = document.getElementsByClassName("red");
    for (let i = 0; i < redBlocks.length; i++) {
      const indexArr = redBlocks[i].id.split(":");
      if (
        isValid(
          this.state.board,
          Number(indexArr[0]),
          Number(indexArr[1]),
          Number(redBlocks[i].innerHTML)
        )
      ) {
        redBlocks[i].className = "grid-block";
      }
    }
  }

  handleDifficulty(difficulty: string): void {
    const wordIndexDict: { [char: string]: number } = {
      Easy: 0,
      Medium: 1,
      Hard: 2,
    };
    const currentlySelected = document.getElementsByClassName("selected");
    currentlySelected[0].className = "basic-button";
    const myElement = document.getElementById("difficulty-buttons");
    const firstChild = myElement!.children[
      wordIndexDict[difficulty]
    ] as HTMLElement;
    firstChild.className = "basic-button selected";
    this.setState({
      difficulty: difficulty,
    });
  }

  handleBlank(): void {
    this.setState({
      originalBoard: Array(9)
        .fill(null)
        .map(() => new Array(9).fill(0)),
      board: Array(9)
        .fill(null)
        .map(() => new Array(9).fill(0)),
    });
    this.handleChangeMessage("Board is now empty");
    this.resetRed();
  }

  render() {
    return (
      <>
        <div className="title">Sulvoku</div>
        <div className="center-row-flex">
          <div className="space-between-flex">
            <div id="difficulty-buttons">
              <button
                className="basic-button"
                onClick={() => this.handleDifficulty("Easy")}
              >
                Easy
              </button>
              <button
                className="basic-button"
                onClick={() => this.handleDifficulty("Medium")}
              >
                Medium
              </button>
              <button
                className="basic-button"
                onClick={() => this.handleDifficulty("Hard")}
              >
                Hard
              </button>
              
            </div>
            <div>
            <button
                className="basic-button"
                onClick={() => this.generateNewBoard()}
              >
                Generate
              </button>
              <button className="basic-button" onClick={() => this.handleBlank()}>
              Blank
            </button>
            </div>
          </div>
        </div>

        <div className="grid">
          {this.state.board.map((row, rowIndex) => {
            return (
              <div className="grid-row" key={rowIndex}>
                {row.map((num, colIndex) => (
                  <Cell
                    key={colIndex}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    number={num}
                    handleCellUpdate={this.handleUpdateCell}
                    static={
                      this.state.originalBoard[rowIndex][colIndex] !== 0
                        ? true
                        : false
                    }
                  />
                ))}
              </div>
            );
          })}
        </div>

            <div className="center-row-flex">
            <button className="basic-button" onClick={() => this.handleSolve()}>
              Solve
            </button>
            <button className="basic-button" onClick={() => this.handleReset()}>
              Reset
            </button>
            </div>
            
        
        <Snackbar
          message={this.state.message}
          clearMessage={this.handleClearMessage}
        />
      </>
    );
  }
}
