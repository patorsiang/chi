import stateSet from '../../models/state.json'

const initState = {
    valueState: ['Andaman and Nicobar Islands'],
    valueSearch: '',
    Query: '',
    search: false,
    Menu: '/',
    post: []
}

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_STATE':
            state = { ...state, valueState: [action.S], valueSearch: '', search: false, post: action.result }
            break;

        case 'CHANGE_MENU':
            state = { ...state, Menu: action.S }
            break;

        case 'SEARCH_MAP':
            const result = []
            stateSet.state.sort();
            stateSet.state.map(s => s.toUpperCase().search(action.S.toUpperCase()) > -1 ? result.push(s) : null)
            if (result.length === 0) {
                result.push('')
            }
            result.sort();
            state = { ...state, valueSearch: action.S, valueState: result, search: true, Query: action.S, post: [] }
            break;

        default:
            state = initState
            break;
    }
    return state
}

export default projectReducer