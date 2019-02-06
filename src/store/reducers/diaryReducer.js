const initState = {
    err: null,
    success: null,
    diary: [],
    edit: null
}

const diaryReducer = (state, action) => {
    switch (action.type) {
        case 'POSTING_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'POSTING_SUCCESS':
            state = { ...state, err: null, success: "success" }
            break;
        case 'GET_ALL_DIARY':
            state = { ...state, err: null, success: null, diary: action.result }
            break;
        case 'GET_DIARY':
            state = { ...state, err: null, success: null, edit:  action.result }
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default diaryReducer