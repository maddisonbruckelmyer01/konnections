import React, { Component } from 'react';
import {connect} from 'react-redux';

class DirectMessage extends Component {

    componentDidMount () {
        this.getDirectMessages();
    }//end componentDidMount

    //get direct messages from the database
    getDirectMessages = () => {
        this.props.dispatch({
            type: 'FETCH_DIRECT_MESSAGES'
        })
    }//end getDirectMessages

    //go to create new direct message page
    handleClick = () => {
        console.log('clicked')
        this.props.history.push('/createNewDirectMessage')
    }//end handleClick

    render() {
        // let messagesToDom = this.props.messages.map((text) => {
        //     return <p>{text.message}</p>
        // })
        
        return (
            <div>  
                {JSON.stringify(this.props.messages)}
                <button onClick={this.handleClick}>Create New Direct Message</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.directMessagesReducer
    }
}

export default connect(mapStateToProps)(DirectMessage); 


// {
//     this.props.messages.map((text) => {
//         return <p>{text}</p>
//     })
// }