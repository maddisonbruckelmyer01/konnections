import React, {Component} from 'react';

class Messages extends Component {

    componentDidMount = () => {
        this.getBoards()
        this.getMessages()
    }//end componentDidMount

    //get specific board that has been clicked on
    getBoards = (id) => {
        let action = {
            type: 'FETCH_BOARDS',
            payload: this.props.match.params.id
        }
        this.props.dispatch(action)

    }//end getBoards

    render() {
        return (
            <div>
                {this.props.}
            </div>
        )
    }
}

export default Messages;