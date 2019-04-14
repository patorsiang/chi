export function handler(credentials) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        var auth = firebase.auth();
        var emailAddress = credentials.newEmail;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            dispatch({ type: 'UPDATE_PWD_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_PWD_ERROR', err })
        });
    }
}