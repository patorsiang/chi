const initState = {
    err: null,
    success: null
}

const diaryReducer = (state, action) => {
    switch (action.type) {
        case 'POSTING_ERROR':
            state = { ...state, err: action.err.message ,success: null }
            break;
        case 'POSTING_SUCCESS':
            state = { ...state, err: null ,success: "success" }
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default diaryReducer