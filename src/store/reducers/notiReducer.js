const initState = {
    noti: []
}

const notiReducer = (state, action) => {
    switch (action.type) {
        case 'NOTI_INITIAL':
            state = { ...state, noti: action.result}
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default notiReducer