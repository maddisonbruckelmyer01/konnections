const specificBoardReducer = (state = {
    id: 0,
    board_name: '',
    description: ''
}, action) => {
    switch(action.type) {
        case 'SET_SPECIFIC_BOARD' :
            return action.payload
        default :
            return state;
    }
}

export default specificBoardReducer;