const directMessagesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_DIRECT_MESSAGES' :
            return action.payload;
        default :
            return state; 
    }
}

export default directMessagesReducer;