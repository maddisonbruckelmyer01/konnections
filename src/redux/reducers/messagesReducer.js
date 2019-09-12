const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_MESSAGE' :
            return action.payload
        case 'GET_SPECIFIC_USER' :
            return action.payload
        default :
            return state
    }
}

export default messagesReducer;