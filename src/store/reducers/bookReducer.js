const initState = {
    post: []
}

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'BOOK_POST':
            state = { ...state, post: action.result}
            break;

        default:
            state = initState
            break;
    }
    return state
}

export default bookReducer