const initState = {
    choice: 'ALL',
    post: []
}

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'SPECIAL_THEME':
            state = { ...state, choice: action.choice, post: action.result}
            break;

        default:
            state = initState
            break;
    }
    return state
}

export default bookReducer