import React, { Component } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import helpJson from "../data/help";
import "../css/Help.css";

type Props = {
  handleCloseModal: () => void;
};

type State = {
  index: number;
};

export default class Help extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.handleMoveIndexLeft = this.handleMoveIndexLeft.bind(this);
    this.handleMoveIndexRight = this.handleMoveIndexRight.bind(this);
  }

  handleMoveIndexLeft(): void {
    this.setState({
      index: this.state.index - 1,
    });
  }

  handleMoveIndexRight(): void {
    this.setState({
      index: this.state.index + 1,
    });
  }

  render() {
    return (
      <>
        <div className="dark"></div>
        <div className="modal">
          <button
            className="basic-button"
            onClick={this.props.handleCloseModal}
          >
            <AiOutlineClose />
          </button>
          <div className="title">{helpJson["titles"][this.state.index]}</div>
          <div className="space-between-col">
            <div className="list">
              <ul>
                {helpJson["list"][helpJson["titles"][this.state.index]].map(
                  (line, index) => (
                    <li key={index}>{line}</li>
                  )
                )}
              </ul>
            </div>
            <div className="center-row-flex">
              {this.state.index !== 0 && (
                <button
                  className="basic-button"
                  onClick={this.handleMoveIndexLeft}
                >
                  <AiOutlineLeft />
                </button>
              )}

              {this.state.index !== helpJson["titles"].length - 1 && (
                <button
                  className="basic-button"
                  onClick={this.handleMoveIndexRight}
                >
                  <AiOutlineRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
