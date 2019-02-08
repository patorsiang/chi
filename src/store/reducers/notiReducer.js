const initState = {
    noti: [],
    num: 0
}

const notiReducer = (state, action) => {
    switch (action.type) {
        case 'NOTI_INITIAL':
            state = { ...state, noti: action.result }
            break;
        case 'NOTI_NUM':
            state = { ...state, num: action.result }
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default notiReducer