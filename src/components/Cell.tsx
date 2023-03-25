import React, { RefObject } from "react";

type Props = {
  static: boolean;
  number: number;
  rowIndex: number;
  colIndex: number;
  handleCellUpdate: (value: number, rowIndex: number, colIndex: number) => void;
};

type State = {
  focused: boolean;
};

export default class Cell extends React.Component<Props, State> {
  private myRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = { focused: false };
    this.myRef = React.createRef<HTMLDivElement>();
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
    
    if(event.key==="ArrowUp"){
      let newRowIndex = this.props.rowIndex
      while(newRowIndex !== 0){
        newRowIndex -= 1
        if (0 > newRowIndex || newRowIndex > 8){return}
        const cell = document.getElementById(String(newRowIndex) + ":" + String(this.props.colIndex))
        if (cell !== null){
          cell.focus()
          return
        }
      }
    } else if(event.key==="ArrowDown") {
      let newRowIndex = this.props.rowIndex
      while(newRowIndex !== 8){
        newRowIndex += 1
        if (0 > newRowIndex || newRowIndex > 8){return}
        const cell = document.getElementById(String(newRowIndex) + ":" + String(this.props.colIndex))
        if (cell !== null){
          cell.focus()
          return
        }
      }
    } else if(event.key==="ArrowRight") {
      let newColIndex = this.props.colIndex
      while(newColIndex !== 8){
        newColIndex += 1
        if (0 > newColIndex || newColIndex> 8){return}
        const cell = document.getElementById(String(this.props.rowIndex) + ":" + String(newColIndex))
        if (cell !== null){
          cell.focus()
          return
        }
      }
    } else if(event.key==="ArrowLeft") {
      let newColIndex = this.props.colIndex
      while(newColIndex !== 0){
        newColIndex -= 1
        if (0 > newColIndex || newColIndex> 8){return}
        const cell = document.getElementById(String(this.props.rowIndex) + ":" + String(newColIndex))
        if (cell !== null){
          cell.focus()
          return
        }
      }
    }


    if (event.key === "Backspace") {
      this.props.handleCellUpdate(0, this.props.rowIndex, this.props.colIndex);
    } else if (event.key === "Tab") {
      this.setState({
        focused: false,
      });
      this.myRef.current?.blur();
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
    return this.props.static ? (
      <div className="grid-block bold">{this.props.number}</div>
    ) : (
      <div
        id={String(this.props.rowIndex) + ":" + String(this.props.colIndex)}
        onClick={(): void => this.myRef.current?.focus()}
        ref={this.myRef}
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        className="grid-block"
      >
        {this.props.number === 0 ? "" : this.props.number}
      </div>
    );
  }
}
