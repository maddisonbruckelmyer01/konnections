const alertReducer = (state=[], action) => {
    switch(action.type) {
        case 'MESSAGE_BOARD_ADD' :
            alert('Board has been created!');
        case 'MESSAGE_SENT' :
            alert('Message has been sent!');
        case 'MESSAGE_NOT_SENT' :
            alert('That username is invalid');
        default :
            return state;
    }
}

export default alertReducer;


// ALERT FOR MESSAGE SENT NOT WORKING!!!!!!!!!!!!