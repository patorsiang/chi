import stateSet from '../../models/state.json'

const initState = {
    stateOfIN: ['Andaman and Nicobar Islands'],
    search: '',
    post: [],
    book: [],
    noti: [],
    diary: [],
    edit: [],
    isLoaded: false,
    err: null,
    success: null,
    theme: 'ALL',
    delete: false,
}

// In the following line, you should include the prefixes of implementations you want to test.
const inDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const bookDB = 'chi_db_book'
const version = 1

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'SIGNIN_SUCCESS':
            var Openreq = inDB.open(bookDB, version)
            Openreq.onupgradeneeded = function (e) {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('book')) {
                    const storeOS = db.createObjectStore('book',
                        { keyPath: 'id' });
                    storeOS.createIndex("data", "data", { unique: false });
                }
            };
            Openreq.onsuccess = function (e) {
                // Get a reference to the DB.
                // console.log('running onsuccess');
                const db = e.target.result;
                const transaction = db.transaction(['book'], 'readwrite');
                const store = transaction.objectStore('book');
                store.clear();
                if (action.book.length > 0) {
                    action.book.forEach(element => {
                        const item = {
                            id: element.id,
                            data: JSON.stringify(element.data)
                        }
                        store.add(item);
                    });
                }

                const request = store.getAll();
                // request.onerror = function (event) {
                //     console.log("error fetching data");
                // };
                request.onsuccess = function (event) {
                    initState.book = event.target.result.map(post => {
                        return {
                            id: post.id,
                            data: JSON.parse(post.data)
                        }
                    })
                };
            };
            break;
        case 'UPDATE_NAMEEMAILDOB_SUCCESS':
            state = { ...state, err: null, success: 'this updating is completed, then you have to re-login to update you profile' }
            break;
        case 'UPDATE_NAMEEMAILDOB_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'UPDATE_PWD_SUCCESS':
            state = { ...state, err: null, success: 'the reseting password email is already sent to your email., then you have to re-login to update you profile' }
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
            var req = indexedDB.open(bookDB, version);
            req.onsuccess = function (e) {
                // close the formerly blocked connection:
                const db = e.target.result;
                const transaction = db.transaction(['book'], 'readwrite');
                const store = transaction.objectStore('book');
                store.clear();
            };
            state = initState
            break;
        case 'GET_NOTIFICATION':
            state = { ...state, noti: action.noti }
            break;
        case 'GET_ALL_DIARY':
            state = { ...state, err: null, success: null, diary: action.result, isLoaded: false }
            break;
        case 'GET_DIARY':
            state = { ...state, err: null, success: null, edit: action.result, isLoaded: false }
            break;
        case 'POSTING_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'POSTING_SUCCESS':
            state = { ...state, err: null, success: 'The post is saved.' }
            break;
        case 'ROMOVE_SUCCESS':
            state = { ...state, err: null, success: action.result, delete: true }
            break;
        case 'ROMOVE_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'EDIT_SUCCESS':
            state = { ...state, err: null, success: action.result }
            break;
        case 'EDIT_ERROR':
            state = { ...state, err: action.err.message, success: null }
            break;
        case 'LOAD_POST':
            state = { ...state, isLoaded: true }
            break;
        case 'BOOK_SUCCESS':
            var BookOpenreq = inDB.open(bookDB)
            BookOpenreq.onupgradeneeded = function (e) {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('book')) {
                    const storeOS = db.createObjectStore('book',
                        { keyPath: 'id' });
                    storeOS.createIndex("data", "data", { unique: false });
                }
            };
            BookOpenreq.onsuccess = function (e) {
                // Get a reference to the DB.
                // console.log('running onsuccess');
                const db = e.target.result;
                const transaction = db.transaction(['book'], 'readwrite');
                const store = transaction.objectStore('book');
                store.clear();
                if (action.book.length > 0) {
                    action.book.forEach(element => {
                        const item = {
                            id: element.id,
                            data: JSON.stringify(element.data)
                        }
                        store.add(item);
                    });
                }

                const request = store.getAll();
                // request.onerror = function (event) {
                //     console.log("error fetching data");
                // };
                request.onsuccess = function (event) {
                    initState.book = event.target.result.map(post => {
                        return {
                            id: post.id,
                            data: JSON.parse(post.data)
                        }
                    })
                };
            };
            state = { ...state, book: initState.book }
            break;
        case 'GET_BOOK_SUCCESS':
            var getBookOpenreq = inDB.open(bookDB)
            getBookOpenreq.onupgradeneeded = function (e) {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('book')) {
                    const storeOS = db.createObjectStore('book',
                        { keyPath: 'id' });
                    storeOS.createIndex("data", "data", { unique: false });
                }
            };
            getBookOpenreq.onsuccess = function (e) {
                // Get a reference to the DB.
                // console.log('running onsuccess');
                const db = e.target.result;
                const transaction = db.transaction(['book'], 'readwrite');
                const store = transaction.objectStore('book');
                if (action.book.length > 0) {
                    store.clear();
                    action.book.forEach(element => {
                        const item = {
                            id: element.id,
                            data: JSON.stringify(element.data)
                        }
                        store.add(item);
                    });
                }

                const request = store.getAll();
                // request.onerror = function (event) {
                //     console.log("error fetching data");
                // };
                request.onsuccess = function (event) {
                    initState.book = event.target.result.map(post => {
                        return {
                            id: post.id,
                            data: JSON.parse(post.data)
                        }
                    })
                };
            };
            state = { ...state, book: initState.book }
            break;
        case 'CHANGE_STATE':
            state = { ...state, stateOfIN: [action.S], post: action.post, isLoaded: false, search: '', err: null }
            break;
        case 'SEARCH_BY_STATE':
            const INState = []
            stateSet.state.forEach(st => {
                if (st.toUpperCase().includes(action.S.toUpperCase())) {
                    INState.push(st)
                }
            })
            INState.sort();
            state = { ...state, search: action.S, stateOfIN: INState, post: [], isLoaded: false }
            break;
        case 'SEARCH_BY_TAG':
            const tagPost = []
            // action.post.map(p => p.data.ProTag.includes(action.T) || p.data.tag.includes(action.T) ? tagPost.push(p) : null)
            action.post.forEach(p => {
                // console.log(p.data.tag.includes(action.T), p.data.ProTag.includes(action.T));
                if (state.theme === "ALL") {
                    if (p.data.tag) {
                        if (p.data.tag.toString().toUpperCase().includes(action.T.toUpperCase())) {
                            tagPost.push(p)
                        }
                    }
                } else {
                    if (p.data.theme) {
                        if (p.data.theme.toString().toUpperCase().includes(state.theme.toUpperCase())) {
                            if (p.data.tag) {
                                if (p.data.tag.toString().toUpperCase().includes(action.T.toUpperCase())) {
                                    tagPost.push(p)
                                }
                            }
                        }
                    }
                }
            })
            state = { ...state, theme: 'ALL', post: tagPost, isLoaded: false, search: action.T, err: null }
            break;
        case 'SEARCH_BY_THEME':
            const themePost = []
            // action.post.map(p => p.data.ProTag.includes(action.T) || p.data.tag.includes(action.T) ? tagPost.push(p) : null)
            action.post.forEach(p => {
                // console.log(p.data.tag.includes(action.T), p.data.ProTag.includes(action.T));
                if (action.T.toUpperCase() === "ALL") {
                    themePost.push(p)
                } else {
                    if (p.data.theme) {
                        if (p.data.theme.toString().toUpperCase().includes(action.T.toUpperCase())) {
                            themePost.push(p)
                        }
                    }
                }
            })
            state = { ...state, theme: action.T, post: themePost, isLoaded: false, search: '', err: null }
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