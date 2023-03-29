import React, { Component } from "react";
import "../css/Inputs.css";
import { BsEraser } from "react-icons/bs";

type Props = {
  prevElementFocus: HTMLElement | null
};

type State = {};

export default class Inputs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};

    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick(value: number): void {
    if (this.props.prevElementFocus !== null) {
      this.props.prevElementFocus!.focus();
      this.props.prevElementFocus!.dispatchEvent(new KeyboardEvent('keydown', {'key': String(value)}));
    }
  }

  render() {
    return (
        <div className="inputs">
          {Array.from(Array(10), (e, i) => {
            return <div className="input-block" onClick={() => this.handleOnClick(i)}>{i === 0 ? <BsEraser/> : i}</div>
          })}
        </div>
    );
  }
}
