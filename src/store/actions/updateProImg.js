export function handler(S) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const state = getState()
        if (S.Photo) {
            var storageRef = firebase.storage().ref(`profile/${state.firebase.auth.uid}` + S.Photo.name);

            //Upload file
            var task = storageRef.put(S.Photo);

            return task.on('state_changed',
                function progress(snapshot) {

                },
                function error(err) {
                    dispatch({ type: 'UPDATE_PHOTO_ERROR', err })
                },
                function complete() {
                    storageRef.getDownloadURL().then(function (url) {
                        return firestore.collection('user').doc(state.firebase.auth.uid).update({
                            Photo: url
                        }).then(function () {
                            // Email sent.
                            dispatch({ type: 'UPDATE_PHOTO_SUCCESS' })
                        }).catch(function (err) {
                            // An error happened.
                            dispatch({ type: 'UPDATE_PHOTO_ERROR', err })
                        });
                    })
                }
            );
        }
    }
}