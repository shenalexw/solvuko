import React, { Component } from "react";
import "../css/Dropdown.css"
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
          displayDrop: false
        };
    
        this.handleDropDownClick = this.handleDropDownClick.bind(this);
      }

    handleDropDownClick(): void {
        this.setState({
            displayDrop: !this.state.displayDrop
        })
    }

    handleChoiceClick(event: React.MouseEvent<HTMLButtonElement>): void{
        const value = event.currentTarget.getAttribute('data-value')!
        value === "blank" ? this.props.generateBlank() : this.props.changeDifficulty(value)
        this.handleDropDownClick()
    }

  render() {
    return (
      <div className="drop-down">
        <div className="drop-down-current" onClick={this.handleDropDownClick}>
            <div>{this.props.currentDifficulty}</div>
            <div>{this.state.displayDrop ? <AiOutlineDown/> : <AiOutlineUp/>}</div>
        </div>
        {this.state.displayDrop ? <div className="drop-down-button-col">
          <button className="drop-down-button" data-value="Easy" onClick={(event) => this.handleChoiceClick(event)}>Easy</button>
          <button className="drop-down-button" data-value="Medium" onClick={(event) => this.handleChoiceClick(event)}>Medium</button>
          <button className="drop-down-button" data-value="Hard" onClick={(event) => this.handleChoiceClick(event)}>Hard</button>
          <button className="drop-down-button" data-value="blank" onClick={(event) => this.handleChoiceClick(event)}>Blank</button>
        </div> : null}
      </div>
    );
  }
}
