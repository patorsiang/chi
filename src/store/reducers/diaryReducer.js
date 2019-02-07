const initState = {
    err: null,
    success: null,
    diary: [],
    edit: null,
    err2: null,
    success2: null,
    delete: false
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
            state = { ...state, err: null, success: null, edit: action.result }
            break;
        case 'ROMOVE_SUCCESS':
            state = { ...state, success2: action.result, err2: null, delete: true }
            break;
        case 'ROMOVE_ERROR':
            state = { ...state, err2: action.err.message, success2: null }
            break;
        case 'EDIT_SUCCESS':
            state = { ...state, success2: action.result, err2: null }
            break;
        case 'EDIT_ERROR':
            state = { ...state, err2: action.err.message, success2: null }
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default diaryReducer