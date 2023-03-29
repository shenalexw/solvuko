import React from "react";

type Props = {
  static: boolean;
  number: number;
  rowIndex: number;
  colIndex: number;
  handleCellUpdate: (value: number, rowIndex: number, colIndex: number) => void;
  prevElementFocus: HTMLElement | null
};

type State = {
  focused: boolean;
};

export default class Cell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { focused: false };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleFocus(): void {
    this.setState({ focused: true });
  }

  handleBlur(): void {
    this.setState({ focused: false });
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (!this.state.focused) {
      return;
    }

    console.log(event.key)

    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      let newRowIndex = this.props.rowIndex;
      let newColIndex = this.props.colIndex;

      switch (event.key) {
        case "ArrowUp":
          newRowIndex -= 1;
          break;
        case "ArrowDown":
          newRowIndex += 1;
          break;
        case "ArrowRight":
          newColIndex += 1;
          break;
        case "ArrowLeft":
          newColIndex -= 1;
          break;
        default:
          return;
      }

      if (
        newRowIndex < 0 ||
        newRowIndex > 8 ||
        newColIndex < 0 ||
        newColIndex > 8
      ) {
        return;
      }

      const cell = document.getElementById(`${newRowIndex}:${newColIndex}`);
      if (cell !== null) {
        cell!.focus();
        return;
      }
    }
    if (this.props.static) {
      return;
    }
    if (event.key === "Backspace") {
      this.props.handleCellUpdate(0, this.props.rowIndex, this.props.colIndex);
    } else if (event.key === "Tab") {
      this.setState({
        focused: false,
      });
    } else if (/^\d$/.test(event.key)) {
      this.props.handleCellUpdate(
        Number(event.key),
        this.props.rowIndex,
        this.props.colIndex
      );
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div
        id={String(this.props.rowIndex) + ":" + String(this.props.colIndex)}
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        className={this.props.static ? "grid-block bold" : "grid-block"}
      >
        {this.props.number === 0 ? "" : this.props.number}
      </div>
    );
  }
}
