import React, {Component} from 'react';

class CreateDirectMessage extends Component {
    render() {
        return (
            <div>
                <input placeholder="Username" type="text" />
                <input placeholder="New Message" type="text" />
                <button>Send</button>
            </div>
        )
    }
}

export default CreateDirectMessage;