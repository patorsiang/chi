function compare(a, b) {
    if (a.data.date > b.date)
        return -1;
    if (a.data.date < b.date)
        return 1;
    return 0;
}

export function handler() {
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
                        admin: false,
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
                });
            }
            const BookRef = firebase.functions().httpsCallable('getAllBookPost')
            BookRef().then(book => {
                if (book.data.length === 0) {
                    return dispatch({ type: 'SIGNIN_SUCCESS', book: [] })
                }
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []

                book.data.map(data => {
                    return data.photo.map(file => metadata({ file }).then(res => {
                        if (res.data.safe) {
                            safe.push(res.data.safe)
                            if (safe.includes("bad")) {
                                data.safe = "bad"
                            } else if (safe.includes("safe")) {
                                data.safe = "safe"
                            } else {
                                data.safe = "maybe"
                            }
                        } else {
                            data.safe = "maybe"
                        }

                        if (res.data.tags) {
                            res.data.tags.map(tag => tags.push(tag))
                        }

                        if (res.data.themes) {
                            res.data.themes.map(theme => themes.push(theme))
                        }
                        return { safe, tags, themes }
                    }).then(obj => {
                        data.ProTag = [...new Set(obj.tags)]
                        data.ProTheme = [...new Set(obj.themes, data.theme)]
                        return data
                    }).then(() => {
                        return dispatch({ type: 'SIGNIN_SUCCESS', book: book.data.sort(compare) })
                    }))
                })
            })
            return dispatch({ type: 'SIGNIN_SUCCESS', book: [] })
        }).catch(err => {
            return dispatch({ type: 'SIGNIN_ERROR', err})
        })
    }
}