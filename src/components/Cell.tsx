import React from "react";

type Props = {
  static: boolean;
  number: number;
  notes: boolean[];
  rowIndex: number;
  colIndex: number;
  handleCellUpdate: (value: number, rowIndex: number, colIndex: number) => void;
  handleUpdateNotes: (
    indexUpdate: number,
    rowIndex: number,
    colIndex: number
  ) => void;
  checkExistingNumbers: (number: number, incorrect: boolean) => void;
  uncheckExistingNumbers: () => void;
  prevElementFocus: HTMLElement | null;
  isMobile: boolean;
  isNoteMode: boolean;
};

type State = {};

export default class Cell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNoteWriting = this.handleNoteWriting.bind(this);
  }

  handleNoteWriting(keyPress: string): void {
    if (keyPress === "0" || this.props.number !== 0) {
      return;
    }
    const indexUpdate = Number(keyPress) - 1;
    this.props.handleUpdateNotes(
      indexUpdate,
      this.props.rowIndex,
      this.props.colIndex
    );
  }
  handleFocus(): void {
    const cell = document.getElementById(
      `${this.props.rowIndex}:${this.props.colIndex}`
    );
    this.props.checkExistingNumbers(
      this.props.number,
      cell!.classList.contains("red")
    );
  }

  handleBlur(): void {
    this.props.uncheckExistingNumbers();
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    const keyPress = event.key.toLowerCase();
    if (
      keyPress === "arrowup" ||
      keyPress === "arrowdown" ||
      keyPress === "arrowleft" ||
      keyPress === "arrowright" ||
      keyPress === "w" ||
      keyPress === "s" ||
      keyPress === "a" ||
      keyPress === "d"
    ) {
      let newRowIndex = this.props.rowIndex;
      let newColIndex = this.props.colIndex;

      switch (keyPress) {
        case "arrowup":
        case "w":
          newRowIndex -= 1;
          break;
        case "arrowdown":
        case "s":
          newRowIndex += 1;
          break;
        case "arrowright":
        case "d":
          newColIndex += 1;
          break;
        case "arrowleft":
        case "a":
          newColIndex -= 1;
          break;
        default:
          return;
      }

      if (newColIndex < 0 || newColIndex > 8) {
        return;
      }

      const cellId =
        newRowIndex < 0
          ? "drop-down-menu"
          : newRowIndex > 8
          ? "note-mode-toggle"
          : `${newRowIndex}:${newColIndex}`;

      const cell = document.getElementById(cellId);
      if (cell !== null) {
        cell!.focus();
        return;
      }
    }
    if (this.props.static) {
      return;
    }
    if (keyPress === "backspace") {
      this.props.handleCellUpdate(0, this.props.rowIndex, this.props.colIndex);
    } else if (keyPress === "tab") {
    } else if (/^\d$/.test(keyPress)) {
      this.props.isNoteMode
        ? this.handleNoteWriting(keyPress)
        : this.props.handleCellUpdate(
            Number(keyPress),
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
        {this.props.number === 0 ? (
          this.props.notes.some((bool) => bool === true) ? (
            <div className="notes">
              {this.props.notes.map((note, i) =>
                note ? (
                  <div
                    key={`${this.props.rowIndex}:${this.props.colIndex}:${i}`}
                    className="note-block"
                  >
                    {i + 1}
                  </div>
                ) : (
                  <div
                    key={`${this.props.rowIndex}:${this.props.colIndex}:${i}`}
                    className="note-block"
                  ></div>
                )
              )}
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.number
        )}
      </div>
    );
  }
}
