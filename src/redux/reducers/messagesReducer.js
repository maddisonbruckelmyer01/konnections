const messagesReducer = (state=[], action) => {
    switch (action.type) {
        case 'SEND_MESSAGE' :
            return action.payload
        case 'GET_MESSAGE' :
            return action.payload
        default :
            return state
    }
}

export default messagesReducer;