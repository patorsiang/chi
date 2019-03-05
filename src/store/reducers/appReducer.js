// import stateSet from '../../models/state.json'

const initState = {
    stateOfIN: ['Andaman and Nicobar Islands'],
    search: '',
    post: [],
    isLoaded: false,
}

const appReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_STATE':
            state = { ...state, stateOfIN: [action.S], post: action.post, isLoaded: false}
            break;
        case 'LOAD_POST':
            state = { ...state, isLoaded: true }
            break;
        default:
            // state = {...state,
            //     stateOfIN: initState.stateOfIN,
            //     searchState: initState.searchState,
            //     post: initState.post,
            // }
            state = initState
            break;
    }
    return state
}
export default appReducer