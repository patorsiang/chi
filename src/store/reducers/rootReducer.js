import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    app: appReducer
})

export default rootReducer