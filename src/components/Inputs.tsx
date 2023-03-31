import React, { Component } from "react";
import "../css/Inputs.css";
import { BsEraser } from "react-icons/bs";

type Props = {
  prevElementFocus: HTMLElement | null;
};

type State = {
  inputs: number[];
};

export default class Inputs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleOnClick(value: number): void {
    if (
      this.props.prevElementFocus !== null &&
      this.props.prevElementFocus.classList.contains("grid-block")
    ) {
      this.props.prevElementFocus!.focus();
      console.log(this.props.prevElementFocus);
      this.props.prevElementFocus!.dispatchEvent(
        new KeyboardEvent("keydown", { key: String(value), bubbles: true })
      );
    }
  }

  handleKeyDown(): void {}

  render() {
    return (
      <div className="inputs">
        {this.state.inputs.map((num) => (
          <div
            key={num}
            className="input-block"
            onClick={() => this.handleOnClick(num)}
          >
            {num === 0 ? <BsEraser /> : num}
          </div>
        ))}
      </div>
    );
  }
}
