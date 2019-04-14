export function handler(U) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            U.Email,
            U.Password,
        ).then((resp) => {
            if (U.Photo) {
                var storageRef = firebase.storage().ref(`profile/${resp.user.uid}` + U.Photo.name);

                //Upload file
                var task = storageRef.put(U.Photo);

                return task.on('state_changed',
                    function progress(snapshot) {

                    },
                    function error(err) {
                        dispatch({ type: 'POSTING_ERROR', err })
                    },
                    function complete() {
                        storageRef.getDownloadURL().then(function (url) {
                            return firestore.collection('user').doc(resp.user.uid).set({
                                displayName: U.Name,
                                DOB: U.DOB,
                                Photo: url,
                                created: Date(),
                                token: 0
                            })
                        })
                    }
                );
            } else {
                return firestore.collection('user').doc(resp.user.uid).set({
                    displayName: U.Name,
                    DOB: U.DOB,
                    Photo: null,
                    created: Date(),
                    token: 0
                })
            }
        }).then(() => {
            var user = firebase.auth().currentUser;
            if (!user.emailVerified) {
                user.sendEmailVerification().then(function () {
                    // Email sent.
                }).catch(function (err) {
                    // An error happened.
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS', book: [] })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err, book: [] })
        })
    }
}