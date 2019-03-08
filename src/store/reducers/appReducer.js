import stateSet from '../../models/state.json'

const initState = {
    stateOfIN: ['Andaman and Nicobar Islands'],
    search: '',
    post: [],
    isLoaded: false,
    err: null,
    success: null,
    theme: 'ALL'
}

// In the following line, you should include the prefixes of implementations you want to test.
const inDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const bookDB = 'chi_db_book'
const notiDB = 'chi_db_noti'
const version = 1

const appReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_STATE':
            state = { ...state, stateOfIN: [action.S], post: action.post, isLoaded: false, search: '', err: null }
            break;
        case 'LOAD_POST':
            state = { ...state, isLoaded: true }
            break;
        case 'SEARCH_BY_STATE':
            const result = []
            stateSet.state.sort();
            stateSet.state.map(s => s.toUpperCase().search(action.S.toUpperCase()) > -1 ? result.push(s) : null)
            if (result.length === 0) {
                result.push('')
            }
            result.sort();
            state = { ...state, search: action.S, stateOfIN: result, post: [], isLoaded: false }
            break;
        case 'SEARCH_BY_THEME':
            state = { ...state, theme: action.T, post: action.post, isLoaded: false, search: '', err: null}
            break;
        case 'SIGNIN_SUCCESS':
            var Openreq = inDB.open(bookDB, version)
            Openreq.onsuccess = function (e) {
                // Get a reference to the DB.
            };
            Openreq = inDB.open(notiDB, version)
            Openreq.onsuccess = function (e) {
                // Get a reference to the DB.
            };
            state = { ...state, err: null, success: null }
            break;
        case 'SIGNIN_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'UPDATE_NAMEEMAILDOB_SUCCESS':
            state = { ...state, err: null, success: 'this updating is completed, then you have to re-login to update you profile'}
            break;
        case 'UPDATE_NAMEEMAILDOB_ERROR':
            state = { ...state, err: action.err.message, success: null}
            break;
        case 'UPDATE_PWD_SUCCESS':
            state = { ...state, err: null, success: 'the reseting password email is already sent to your email., then you have to re-login to update you profile'}
            break;
        case 'UPDATE_PWD_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'UPDATE_PHOTO_SUCCESS':
            state = { ...state, err: null, success: 'the profile photo updating is completed, then you have to re-login to update you profile' }
            break;
        case 'UPDATE_PHOTO_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'SIGNOUT_SUCCESS':
            var Delreq = inDB.deleteDatabase(bookDB);
            Delreq.onsuccess = function () {
                console.log("Deleted database successfully");
            };
            Delreq.onerror = function () {
                console.log("Couldn't delete database");
            };
            Delreq.onblocked = function () {
                console.log("Couldn't delete database due to the operation being blocked");
            };
            Delreq = inDB.deleteDatabase(notiDB);
            Delreq.onsuccess = function () {
                console.log("Deleted database successfully");
            };
            Delreq.onerror = function () {
                console.log("Couldn't delete database");
            };
            Delreq.onblocked = function () {
                console.log("Couldn't delete database due to the operation being blocked");
            };
            state = { ...state, err: null }
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