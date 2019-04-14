export function handler(credentials) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().currentUser.updateEmail(credentials.newEmail).then(function () {
            // Update successful.
            firestore.collection('user').doc(credentials.uid).update({
                displayName: credentials.displayName,
                DOB: credentials.DOB,
            })
            dispatch({ type: 'UPDATE_NAMEEMAILDOB_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_NAMEEMAILDOB_ERROR', err })
        });
    }
}