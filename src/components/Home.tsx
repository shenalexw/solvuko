import { Component } from "react";
import Help from "./Help";
import Snackbar from "./Snackbar";
import Cell from "./Cell";
import Inputs from "./Inputs";
import Dropdown from "./Dropdown";
import { isValid, solve, newBoard } from "../util";
import Confetti from "react-confetti";
import { AiOutlineQuestion } from "react-icons/ai";
import "../css/Home.css";
type Props = {};

type State = {
  originalBoard: number[][];
  board: number[][];
  message: string;
  difficulty: string;
  win: boolean;
  displayHelp: boolean;
  isMobile: boolean;
  prevElementFocus: HTMLElement | null;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      originalBoard: [],
      board: [],
      message: "",
      difficulty: "Easy",
      win: false,
      displayHelp: false,
      isMobile: false,
      prevElementFocus: null,
    };

    this.handleClearMessage = this.handleClearMessage.bind(this);
    this.handleUpdateCell = this.handleUpdateCell.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.generateNewBoard = this.generateNewBoard.bind(this);
    this.handleDifficulty = this.handleDifficulty.bind(this);
    this.handleValidationofRed = this.handleValidationofRed.bind(this);
    this.handleBlank = this.handleBlank.bind(this);
    this.handleDisplayHelp = this.handleDisplayHelp.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  componentDidMount() {
    const brandNewBoard: number[][] = newBoard(this.state.difficulty);
    this.setState({
      originalBoard: brandNewBoard,
      board: brandNewBoard,
    });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.setState({ prevElementFocus: document.activeElement as HTMLElement });
    window.addEventListener("focusin", this.handleFocusChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("focusin", this.handleFocusChange);
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
      win: false,
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
    this.setState({ message: "" });
  }

  handleReset(): void {
    this.setState({
      board: this.state.originalBoard,
    });
    this.resetRed();
    this.handleChangeMessage("Board has been reset");
  }

  checkExistingNumbers(number: number): void{
    if(number !== 0){
      const gridBlocks = document.querySelectorAll('.grid-block:not(:empty)');
      const sameNumberedGridBlocks = Array.from(gridBlocks).filter((block) => block.innerHTML === String(number))
      sameNumberedGridBlocks.forEach((block) => block.classList.add("same"))
    }
  }

  uncheckExistingNumbers(): void{
    const gridBlocks = document.querySelectorAll('.same');
    gridBlocks.forEach((block) => block.classList.remove("same"))
  }

  handleUpdateCell(value: number, rowIndex: number, colIndex: number): void {
    if (value === this.state.board[rowIndex][colIndex] && value !== 0) {
      return;
    }
    const cell = document.getElementById(
      String(rowIndex) + ":" + String(colIndex)
    );

    if(cell!.innerHTML !== String(value)){
      this.uncheckExistingNumbers()
    }

    if (value === 0) {
      cell!.className = "grid-block";
    } else if (!isValid(this.state.board, rowIndex, colIndex, value)) {
      cell!.className = "grid-block red";
      this.checkExistingNumbers(value)
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
        if (value !== 0) {
          if (this.handleValidationofCompletion()) {
            this.handleChangeMessage("You Solved the Puzzle!");
            this.setState({
              originalBoard: this.state.board,
              win: true,
            });
            if (document.activeElement !== document.body) {
              (document.activeElement as HTMLElement)!.blur();
            }
          }
          return;
        }
        this.handleValidationofRed();
      }
    );
  }

  handleValidationofCompletion(): boolean {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.state.originalBoard[i][j] === 0) {
          if (!isValid(this.state.board, i, j, this.state.board[i][j])) {
            return false;
          }
        }
      }
    }
    return true;
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
    this.setState({
      difficulty: difficulty,
    }, () => {
      this.generateNewBoard();
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
      win: false,
      difficulty: "Blank"
    });
    this.handleChangeMessage("Board is now empty");
    this.resetRed();
  }

  handleDisplayHelp(): void {
    this.setState({
      displayHelp: !this.state.displayHelp,
    });
  }

  handleResize(): void {
    this.setState({ isMobile: window.innerWidth <= 480 ? true : false });
  }

  handleFocusChange(): void {
    this.setState({ prevElementFocus: document.activeElement as HTMLElement });
  }

  render() {
    return (
      <>
        <div className="title">Sulvoku</div>
        <div className="center-row-flex">
          <div className="space-between-flex">
            <Dropdown
             changeDifficulty={(difficulty: string) => this.handleDifficulty(difficulty)}
              generateBlank={this.handleBlank}
              currentDifficulty={this.state.difficulty}
            />
            <div>
              <button
                className="basic-button question"
                onClick={() => this.handleDisplayHelp()}
              >
                <AiOutlineQuestion />
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
                    prevElementFocus={this.state.prevElementFocus}
                    isMobile={this.state.isMobile}
                    checkExistingNumbers={(number: number) => this.checkExistingNumbers(number)}
                    uncheckExistingNumbers={() => this.uncheckExistingNumbers()}
                  />
                ))}
              </div>
            );
          })}
        </div>
        {this.state.isMobile ? (
          <Inputs prevElementFocus={this.state.prevElementFocus} />
        ) : (
          <></>
        )}
        <div className="center-row-flex">
          <button className="basic-button" onClick={() => this.handleSolve()}>
            Solve
          </button>
          <button className="basic-button" onClick={() => this.handleReset()}>
            Reset
          </button>
        </div>
        {this.state.displayHelp && (
          <Help handleCloseModal={() => this.handleDisplayHelp()}></Help>
        )}
        {this.state.win && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
        <Snackbar
          message={this.state.message}
          clearMessage={this.handleClearMessage}
        />
      </>
    );
  }
}
