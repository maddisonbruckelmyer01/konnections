const counselorReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COUSELORS':
            return action.payload;
        default: 
            return state;
    }
}

export default counselorReducer;