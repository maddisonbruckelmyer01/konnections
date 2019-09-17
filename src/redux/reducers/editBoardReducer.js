const editBoardReducer = (state = {
    board_name: '',
    description: '',
    id: 0
}, action) => {
    switch(action.type) {
        case 'GET_ALL' :
            return action.payload
        case 'EDIT_BOARD_NAME' :
            return {...state, board_name: action.payload}
        case 'EDIT_BOARD_DESCRIPTION' :
            return {...state, description: action.payload}
        default:
            return state
    }
}

export default editBoardReducer;