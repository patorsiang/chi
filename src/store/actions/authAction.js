export const initial = () => {
    return (dispatch) => {
        dispatch({ type: 'INITIAL' })
    }
}

export const register = (U) => {
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
                    dispatch({ type: 'VERIFY_ERROR', err })
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signinwithfb = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then(({ user }) => {
            firestore.collection('user').doc(user.uid).get().then(u => {
                if (!u.exists) {
                    return firestore.collection('user').doc(user.uid).set({
                        displayName: user.displayName,
                        DOB: null,
                        Photo: user.photoURL,
                        created: Date(),
                        token: 0
                    })
                }
            })
        }).then(() => {
            var user = firebase.auth().currentUser;
            if (!user.emailVerified) {
                user.sendEmailVerification().then(function () {
                    // Email sent.
                }).catch(function (err) {
                    // An error happened.
                    dispatch({ type: 'VERIFY_ERROR', err })
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signin = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.Email,
            credentials.Password
        ).then(() => {
            var user = firebase.auth().currentUser;
            if (!user.emailVerified) {
                user.sendEmailVerification().then(function () {
                    // Email sent.
                }).catch(function (err) {
                    // An error happened.
                    dispatch({ type: 'VERIFY_ERROR', err })
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const updateNameEmailDOB = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().currentUser.updateEmail(credentials.newEmail).then(function () {
            // Update successful.
            firestore.collection('user').doc(credentials.uid).update({
                displayName: credentials.displayName,
                DOB: credentials.DOB,
            })
            dispatch({ type: 'UPDATE_EMAIL_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_EMAIL_ERROR', err })
        });
    }
}

export const updatePWD = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        var auth = firebase.auth();
        var emailAddress = credentials.newEmail;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            dispatch({ type: 'UPDATE_EMAIL_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_EMAIL_ERROR', err })
        });
    }
}

export const updateProImg = (S) => {
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

