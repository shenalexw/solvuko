import React, { Component} from 'react'
import "../css/Snackbar.css"

type Props = {
    message: string
    clearMessage: () => void
}

type State = {
    timer: NodeJS.Timeout | null;
    visible: boolean;
}

export default class Snackbar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    
        this.state = {
            timer: null,
            visible: false
        };
      }

    componentDidUpdate(prevProps: Props) {
      if (this.props.message !== prevProps.message) {
        clearTimeout(this.state.timer!);
        this.setState({ visible: true , timer: setTimeout(() => {
            this.setState({ visible: false });
            this.props.clearMessage();
          }, 4000)});
      }
    }
  
    componentWillUnmount() {
      clearTimeout(this.state.timer!);
      this.props.clearMessage();
    }
  
    render() {
      return this.state.visible && this.props.message !== "" ? <div className="snackbar">
        {this.props.message}
        <div className='close-snackbar'>X</div>
      </div> : null;
    }
}