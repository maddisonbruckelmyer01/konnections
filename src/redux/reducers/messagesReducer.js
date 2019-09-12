const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_MESSAGE' :
            return action.payload
        default :
            return state
    }
}

export default messagesReducer;