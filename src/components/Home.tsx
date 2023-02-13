import React, { Component } from "react";
import Snackbar from "../components/Snackbar"
import { solve, findZero} from "../util";
import "../css/Home.css";
type Props = {};

type State = {
  board: number[][];
  message: string;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
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
      message: ""
    };

    this.handleClearMessage = this.handleClearMessage.bind(this);
  }

  handleSolve(): void {
    // Make a deepcopy
    var newBoard = JSON.parse(JSON.stringify(this.state.board));
    const boolSolved : Boolean = solve(newBoard)
    console.log(boolSolved);
    this.handleChangeMessage( boolSolved ? "Puzzle has been Solved!" : "Uh Oh something went wrong :(");
    this.setState({ board: newBoard });
  }

  handleGenerate(): void {
    this.handleChangeMessage( "Puzzle has been generated!");
  }

  handleChangeMessage(message: string): void{
    this.setState({message: message })
  }

  handleClearMessage(): void{
    console.log("message cleared")
    this.setState({message: ""})
  }

  render() {
    return (
      <>
        <h1 className="title">Solvoku</h1>
        <div className="grid">
          {this.state.board.map((row, rowIndex) => {
            return (
              <div className="grid-row" key={rowIndex}>
                {row.map((num, colIndex) => (
                  <div className="grid-block" key={colIndex}>{num}</div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="button-options">
          <button className="basic-button" onClick={() => this.handleGenerate()}>Generate</button>
          <button className="basic-button" onClick={() => this.handleSolve()}>Solve</button>
        </div>
        <Snackbar message={this.state.message} clearMessage={this.handleClearMessage}/>
      </>
    );
  }
}
