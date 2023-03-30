import React, { Component } from "react";
import "../css/Inputs.css";
import { BsEraser } from "react-icons/bs";

type Props = {
  prevElementFocus: HTMLElement | null;
};

type State = {};

export default class Inputs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleOnClick(value: number): void {
    if (this.props.prevElementFocus !== null && this.props.prevElementFocus.classList.contains("grid-block")) {
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
        {Array.from(Array(10), (e, i) => {
          return (
            <div
              key={i}
              className="input-block"
              onClick={() => this.handleOnClick(i)}
            >
              {i === 0 ? <BsEraser /> : i}
            </div>
          );
        })}
      </div>
    );
  }
}
