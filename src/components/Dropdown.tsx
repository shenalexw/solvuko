import React, { Component } from "react";
import "../css/Dropdown.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

type Props = {
  changeDifficulty: (difficulty: string) => void;
  generateBlank: () => void;
  currentDifficulty: string;
};

type State = {
  displayDrop: boolean;
};

export default class Dropdown extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayDrop: false,
    };

    this.handleDropDownClick = this.handleDropDownClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleDropDownClick(): void {
    this.setState({
      displayDrop: !this.state.displayDrop,
    });
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void{
    if (event.key === "Enter"){
      this.handleDropDownClick()
    }
  }

  handleChoiceClick(event: React.MouseEvent<HTMLButtonElement>): void {
    const value = event.currentTarget.getAttribute("data-value")!;
    value === "blank"
      ? this.props.generateBlank()
      : this.props.changeDifficulty(value);
    this.handleDropDownClick();
  }

  render() {
    return (
      <div className="drop-down">
        <div
          tabIndex={0}
          className={`drop-down-current ${
            !this.state.displayDrop ? "bottom-fill" : "bottom-round"
          }`}
          onClick={this.handleDropDownClick}
          onKeyDown={this.handleKeyDown}
          id={"drop-down-menu"}
        >
          <div>{this.props.currentDifficulty}</div>
          <div>
            {this.state.displayDrop ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
        </div>
        {this.state.displayDrop ? (
          <div className="drop-down-button-col">
            <button
              className="drop-down-button"
              data-value="Easy"
              onClick={(event) => this.handleChoiceClick(event)}
            >
              Easy
            </button>
            <button
              className="drop-down-button"
              data-value="Medium"
              onClick={(event) => this.handleChoiceClick(event)}
            >
              Medium
            </button>
            <button
              className="drop-down-button"
              data-value="Hard"
              onClick={(event) => this.handleChoiceClick(event)}
            >
              Hard
            </button>
            <button
              className="drop-down-button"
              data-value="blank"
              onClick={(event) => this.handleChoiceClick(event)}
            >
              Blank
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
