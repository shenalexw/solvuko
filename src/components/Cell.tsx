import React, { RefObject } from 'react';

type Props = {
    static: boolean
    number: number
    rowIndex: number
    colIndex: number
    handleCellUpdate: (value: number, rowIndex: number, colIndex: number) => void
}

type State = {
  focused: boolean;
}

export default class Cell extends React.Component<Props, State> {
  private myRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef<HTMLDivElement>();
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
      return
    }

    if (event.key === "Backspace") {
      this.props.handleCellUpdate(0, this.props.rowIndex, this.props.colIndex);
    } else if (/^\d$/.test(event.key)) {
      this.props.handleCellUpdate(Number(event.key), this.props.rowIndex, this.props.colIndex);
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
       this.props.static ? 
       <div className='grid-block bold'>{this.props.number}</div>:
       <div 
        onClick={(): void => this.myRef.current?.focus()}
        ref={this.myRef}
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        className="grid-block" 
      >
        {this.props.number}{/* {this.state.focused ? 'Focused' : this.props.number} */}
      </div> 
    );
  }
}