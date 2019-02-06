import mapReducer from './mapReducer'
import authReducer from './authReducer'
import imgReducer from './imgReducer'
import diaryReducer from './diaryReducer'
import notiReducer from './notiReducer';
import bookReducer from './bookReducer';
import feedReducer from './feedReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    img: imgReducer,
    map: mapReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    diary: diaryReducer,
    noti: notiReducer,
    book: bookReducer,
    feed: feedReducer
})

export default rootReducer