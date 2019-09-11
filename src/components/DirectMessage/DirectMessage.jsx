import React, { Component } from 'react';
import {connect} from 'react-redux';

class DirectMessage extends Component {

    //go to create new direct message page
    handleClick = () => {
        // console.log('clicked')
        this.props.history.push('/createNewDirectMessage')
    }//end handleClick

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Create New Direct Message</button>
            </div>
        )
    }
}

export default connect()(DirectMessage); 