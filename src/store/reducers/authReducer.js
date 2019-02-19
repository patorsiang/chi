const initState = {
    errsignin: null,
    errverify: null,
    errprofile: null,
    erremail: null,
    success: null,
    errproimg: null,
    // post: []
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            state = { ...state, errsignup: null, errsignin: null, errprofile: null, erremail: null, }
            break;
        case 'SIGNIN_ERROR':
            state = { ...state, errsignin: action.err.message }
            break;
        case 'VERIFY_ERROR':
            state = { ...state, errverify: action.err.message }
            break;
        case 'UPDATE_PROFILE_ERROR':
            state = { ...state, errprofile: action.err.message }
            break;
        case 'UPDATE_EMAIL_ERROR':
            state = { ...state, erremail: action.err.message }
            break;
        case 'UPDATE_EMAIL_SUCCESS':
            state = { ...state, erremail: null, success: 'the action is full, then you have to re-login to update you profile' }
            break;
        case 'UPDATE_PHOTO_SUCCESS':
            state = { ...state, errproimg: null, success: 'the action is full, then you have to re-login to update you profile' }
            break;
        case 'UPDATE_PHOTO_ERROR':
            state = { ...state, errproimg: action.err.message }
            break;
        case 'SIGNOUT_SUCCESS':
            state = initState
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default authReducer