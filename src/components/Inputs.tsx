import React, { Component } from "react";
import "../css/Inputs.css";
import { BsEraser } from "react-icons/bs";

type Props = {
  prevElementFocus: HTMLElement | null;
  isMobile: boolean;
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
  }

  handleOnClick(value: number): void {
    if (
      this.props.prevElementFocus !== null &&
      this.props.prevElementFocus.classList.contains("grid-block")
    ) {
      this.props.prevElementFocus!.focus();
      this.props.prevElementFocus!.dispatchEvent(
        new KeyboardEvent("keydown", { key: String(value), bubbles: true })
      );
    }
  }

  render() {
    return (
      <div className={!this.props.isMobile ? "inputs-sidebar" : "inputs"}>
        {this.state.inputs.map((num) => (
          <div
            key={num}
            className={!this.props.isMobile ? "inputs-sidebar-block" : "input-block"}
            onClick={() => this.handleOnClick(num)}
          >
            {num === 0 ? <BsEraser /> : num}
          </div>
        ))}
      </div>
    );
  }
}
