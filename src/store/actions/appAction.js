const uuidv1 = require('uuid/v1');

function compare(a, b) {
    if (a.data.date > b.date)
        return -1;
    if (a.data.date < b.date)
        return 1;
    return 0;
}

export const changeState = (S) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const searchState = firebase.functions().httpsCallable('searchPostByState')
        searchState({ state: S }).then(result => {
            const userInfo = firebase.functions().httpsCallable('getUser')
            if (result.data.length === 0) {
                return dispatch({ type: 'CHANGE_STATE', S, post: [] })
            }
            result.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                data.data.idWriter = data.data.writer
                data.data.writer = writer.data
                return data.data
            }).then(data => {
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []
                data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                }).then(() => { return dispatch({ type: 'CHANGE_STATE', S, post: result.data.sort(compare) }) }))
            }))
        })
            .catch(error => { return dispatch({ type: 'CHANGE_STATE', S, post: [] }) })
        return dispatch({ type: 'CHANGE_STATE', S, post: [] })
    }
}

export const loadPost = () => {
    return (dispatch, getState) => {
        return dispatch({ type: 'LOAD_POST' })
    }
}

export const searchByState = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SEARCH_BY_STATE', S })
    }
}

export const searchByTag = (T) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const searchAllPost = firebase.functions().httpsCallable('getAllPost')
        searchAllPost().then(result => {
            const userInfo = firebase.functions().httpsCallable('getUser')
            if (result.data.length === 0) {
                return dispatch({ type: 'SEARCH_BY_TAG', T, post: [] })
            }
            result.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                data.data.idWriter = data.data.writer
                data.data.writer = writer.data
                return data.data
            }).then(data => {
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []

                data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                    return dispatch({ type: 'SEARCH_BY_TAG', T, post: result.data.sort(compare) })
                }))
            }))
        }).catch(error => { return dispatch({ type: 'SEARCH_BY_TAG', T, post: [] }) })
        return dispatch({ type: 'SEARCH_BY_TAG', T, post: [] })
    }
}

export const searchByTheme = (T) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()

        if (T === "ALL") {
            const searchAllPost = firebase.functions().httpsCallable('getAllPost')
            searchAllPost().then(result => {
                const userInfo = firebase.functions().httpsCallable('getUser')
                if (result.data.length === 0) {
                    return dispatch({ type: 'SEARCH_BY_THEME', T, post: [] })
                }
                result.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                    data.data.idWriter = data.data.writer
                    data.data.writer = writer.data
                    return data.data
                }).then(data => {
                    const metadata = firebase.functions().httpsCallable('getMetadata')
                    const safe = []
                    const tags = []
                    const themes = []

                    data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                        return dispatch({ type: 'SEARCH_BY_THEME', T, post: result.data.sort(compare) })
                    }))
                }))
            }).catch(error => { return dispatch({ type: 'SEARCH_BY_THEME', T, post: [] }) })
            return dispatch({ type: 'SEARCH_BY_THEME', T, post: [] })
        } else {
            const searchAllPost = firebase.functions().httpsCallable('getAllPost')
            searchAllPost().then(result => {
                const userInfo = firebase.functions().httpsCallable('getUser')
                if (result.data.length === 0) {
                    return dispatch({ type: 'SEARCH_BY_THEME', T, post: [] })
                }
                result.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                    data.data.idWriter = data.data.writer
                    data.data.writer = writer.data
                    return data.data
                }).then(data => {
                    const metadata = firebase.functions().httpsCallable('getMetadata')
                    const safe = []
                    const tags = []
                    const themes = []

                    data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                        return dispatch({
                            type: 'SEARCH_BY_THEME', T, post: result.data.filter(data => {
                                if (data.data.ProTheme) {
                                    if (!data.data.ProTheme.includes(T)) {
                                        return false
                                    }
                                    return true
                                } else {
                                    if (T === "OTHER") {
                                        return true
                                    }
                                    return false
                                }
                            }).sort(compare)
                        })
                    }))
                }))
            }).catch(error => { return dispatch({ type: 'SEARCH_BY_THEME', T, post: [] }) })
            return dispatch({ type: 'SEARCH_BY_THEME', T, post: [] })
        }
    }
}

export const like = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const state = getState()
        const notid = uuidv1();
        const uid = state.firebase.auth.uid

        const PostRef = firestore.collection('diary').doc(id)

        PostRef.get().then(snapshot => {
            if (snapshot.data().like) {
                if (snapshot.data().like.includes(uid)) {
                    PostRef.update({
                        "like": firestore.FieldValue.arrayRemove(uid)
                    })
                } else {
                    const name = state.firebase.profile.displayName
                    const photo = state.firebase.profile.Photo
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'like',
                        content: `${name} save your diary, ${snapshot.data().title} of ${new Date()}`,
                        read: false,
                        linked: '/diary',
                        name: name,
                        photo: photo,
                        date: Date()
                    });
                    PostRef.update({
                        "like": firestore.FieldValue.arrayUnion(uid)
                    })
                }
            } else {
                PostRef.set({
                    "like": [uid]
                }, { merge: true })
            }
        });
    }
}

export const book = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const firebase = getFirebase()
        const state = getState()
        const uid = state.firebase.auth.uid
        const notid = uuidv1();

        const PostRef = firestore.collection('diary').doc(id)
        PostRef.get().then(snapshot => {
            if (snapshot.data().book) {
                if (snapshot.data().book.includes(uid)) {
                    PostRef.update({
                        "book": firestore.FieldValue.arrayRemove(uid)
                    }).then(() => {
                        const BookRef = firebase.functions().httpsCallable('getAllBookPost')
                        BookRef().then(book => {
                            const userInfo = firebase.functions().httpsCallable('getUser')
                            if (book.data.length === 0) {
                                return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                            }
                            book.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                data.data.idWriter = data.data.writer
                                data.data.writer = writer.data
                                data.data.photo.forEach(photo => {
                                    const httpsReference = firebase.storage().refFromURL(photo)
                                    // Create file metadata to update
                                    var newMetadata = {
                                        cacheControl: 'public,max-age=10000000000',
                                    }

                                    // Update metadata properties
                                    httpsReference.updateMetadata(newMetadata).then(function (metadata) {
                                        // Updated metadata for 'images/forest.jpg' is returned in the Promise
                                        // console.log(metadata);
                                    }).catch(function (error) {
                                        // Uh-oh, an error occurred!
                                    });
                                })
                                return data.data
                            }).then(data => {
                                const metadata = firebase.functions().httpsCallable('getMetadata')
                                const safe = []
                                const tags = []
                                const themes = []

                                data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                                    return dispatch({ type: 'BOOK_SUCCESS', book: book.data.sort(compare) })
                                }))
                            }))
                        })
                    })
                } else {
                    const name = state.firebase.profile.displayName
                    const photo = state.firebase.profile.Photo
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'book',
                        content: `${name} save your diary, ${snapshot.data().title} of ${new Date()}`,
                        read: false,
                        linked: '/diary',
                        name: name,
                        photo: photo,
                        date: Date()
                    });
                    PostRef.update({
                        "book": firestore.FieldValue.arrayUnion(uid)
                    }).then(() => {
                        const BookRef = firebase.functions().httpsCallable('getAllBookPost')
                        BookRef().then(book => {
                            const userInfo = firebase.functions().httpsCallable('getUser')
                            if (book.data.length === 0) {
                                return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                            }
                            book.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                data.data.idWriter = data.data.writer
                                data.data.writer = writer.data
                                data.data.photo.forEach(photo => {
                                    const httpsReference = firebase.storage().refFromURL(photo)
                                    // Create file metadata to update
                                    var newMetadata = {
                                        cacheControl: 'public,max-age=10000000000',
                                    }

                                    // Update metadata properties
                                    httpsReference.updateMetadata(newMetadata).then(function (metadata) {
                                        // Updated metadata for 'images/forest.jpg' is returned in the Promise
                                        // console.log(metadata);
                                    }).catch(function (error) {
                                        // Uh-oh, an error occurred!
                                    });
                                })
                                return data.data
                            }).then(data => {
                                const metadata = firebase.functions().httpsCallable('getMetadata')
                                const safe = []
                                const tags = []
                                const themes = []

                                data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                                    return dispatch({ type: 'BOOK_SUCCESS', book: book.data.sort(compare) })
                                }))
                            }))
                        })
                    })
                }
            } else {
                PostRef.set({
                    "book": [uid]
                }, { merge: true }).then(() => {
                    const BookRef = firebase.functions().httpsCallable('getAllBookPost')
                    BookRef().then(book => {
                        const userInfo = firebase.functions().httpsCallable('getUser')
                        if (book.data.length === 0) {
                            return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                        }
                        book.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                            data.data.idWriter = data.data.writer
                            data.data.writer = writer.data
                            data.data.photo.forEach(photo => {
                                const httpsReference = firebase.storage().refFromURL(photo)
                                // Create file metadata to update
                                var newMetadata = {
                                    cacheControl: 'public,max-age=10000000000',
                                }

                                // Update metadata properties
                                httpsReference.updateMetadata(newMetadata).then(function (metadata) {
                                    // Updated metadata for 'images/forest.jpg' is returned in the Promise
                                    // console.log(metadata);
                                }).catch(function (error) {
                                    // Uh-oh, an error occurred!
                                });
                            })
                            return data.data
                        }).then(data => {
                            const metadata = firebase.functions().httpsCallable('getMetadata')
                            const safe = []
                            const tags = []
                            const themes = []

                            data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                                return dispatch({ type: 'BOOK_SUCCESS', book: book.data.sort(compare) })
                            }))
                        }))
                    })
                })
            }
        })
    }
}

export const getBook = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const BookRef = firebase.functions().httpsCallable('getAllBookPost')
        BookRef().then(book => {
            const userInfo = firebase.functions().httpsCallable('getUser')
            if (book.data.length === 0) {
                return dispatch({ type: 'GET_BOOK_SUCCESS', book: [] })
            }
            book.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                data.data.idWriter = data.data.writer
                data.data.writer = writer.data
                data.data.photo.forEach(photo => {
                    const httpsReference = firebase.storage().refFromURL(photo)
                    // Create file metadata to update
                    var newMetadata = {
                        cacheControl: 'public,max-age=10000000000',
                    }

                    // Update metadata properties
                    httpsReference.updateMetadata(newMetadata).then(function (metadata) {
                        // Updated metadata for 'images/forest.jpg' is returned in the Promise
                        // console.log(metadata);
                    }).catch(function (error) {
                        // Uh-oh, an error occurred!
                    });
                })
                return data.data
            }).then(data => {
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []

                data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                    return dispatch({ type: 'GET_BOOK_SUCCESS', book: book.data.sort(compare) })
                }))
            }))
        })
        return dispatch({ type: 'GET_BOOK_SUCCESS', book:[]})
    }
}

export const report = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const state = getState()
        const notid = uuidv1();
        const uid = state.firebase.auth.uid

        const PostRef = firestore.collection('diary').doc(id)

        PostRef.get().then(snapshot => {
            if (snapshot.data().report) {
                if (snapshot.data().report.includes(uid)) {
                    PostRef.update({
                        "report": firestore.FieldValue.arrayRemove(uid)
                    })
                } else {
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'report',
                        content: `your diary was reported, ${snapshot.data().title} of ${new Date()}`,
                        read: false,
                        linked: '/diary',
                        date: Date()
                    });
                    PostRef.update({
                        "report": firestore.FieldValue.arrayUnion(uid)
                    })
                }
            } else {
                PostRef.set({
                    "report": [uid]
                }, { merge: true })
            }
        });
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
                });
            }
            const BookRef = firebase.functions().httpsCallable('getAllBookPost')
            BookRef().then(book => {
                const userInfo = firebase.functions().httpsCallable('getUser')
                if (book.data.length === 0) {
                    return dispatch({ type: 'SIGNIN_SUCCESS', book: [] })
                }
                book.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                    data.data.idWriter = data.data.writer
                    data.data.writer = writer.data
                    data.data.photo.forEach(photo => {
                        const httpsReference = firebase.storage().refFromURL(photo)
                        // Create file metadata to update
                        var newMetadata = {
                            cacheControl: 'public,max-age=10000000000',
                        }

                        // Update metadata properties
                        httpsReference.updateMetadata(newMetadata).then(function (metadata) {
                            // Updated metadata for 'images/forest.jpg' is returned in the Promise
                            // console.log(metadata);
                        }).catch(function (error) {
                            // Uh-oh, an error occurred!
                        });
                    })
                    return data.data
                }).then(data => {
                    const metadata = firebase.functions().httpsCallable('getMetadata')
                    const safe = []
                    const tags = []
                    const themes = []

                    data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                }))
            })
            return dispatch({ type: 'SIGNIN_SUCCESS', book: book.data.sort(compare) })
        }).catch(err => {
            return dispatch({ type: 'SIGNIN_ERROR', err, book: [] })
        })
    }
}

export const SigninByEmailNPWD = (U) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(U.Email, U.Password).then(() => {
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
                const userInfo = firebase.functions().httpsCallable('getUser')
                if (book.data.length === 0) {
                    return dispatch({ type: 'SIGNIN_SUCCESS', book: [] })
                }
                book.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                    data.data.idWriter = data.data.writer
                    data.data.writer = writer.data
                    data.data.photo.forEach(photo => {
                        const httpsReference = firebase.storage().refFromURL(photo)
                        // Create file metadata to update
                        var newMetadata = {
                            cacheControl: 'public,max-age=10000000000',
                        }

                        // Update metadata properties
                        httpsReference.updateMetadata(newMetadata).then(function (metadata) {
                            // Updated metadata for 'images/forest.jpg' is returned in the Promise
                            // console.log(metadata);
                        }).catch(function (error) {
                            // Uh-oh, an error occurred!
                        });
                    })
                    return data.data
                }).then(data => {
                    const metadata = firebase.functions().httpsCallable('getMetadata')
                    const safe = []
                    const tags = []
                    const themes = []

                    data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
                }))
            })
            return dispatch({ type: 'SIGNIN_SUCCESS', book: book.data.sort(compare) })
        }).catch(function (err) {
            dispatch({ type: 'SIGNIN_ERROR', err, book: [] })
        });
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
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS', book: [] })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err, book: [] })
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
            dispatch({ type: 'UPDATE_NAMEEMAILDOB_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_NAMEEMAILDOB_ERROR', err })
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
            dispatch({ type: 'UPDATE_PWD_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_PWD_ERROR', err })
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

export const signout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}
