import uuidv1 from 'uuid/v1';

function compare(a, b) {
    if (a.data.date > b.date)
        return -1;
    if (a.data.date < b.date)
        return 1;
    return 0;
}

export function handler(id) {
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
                            if (book.data.length === 0) {
                                return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                            }
                            return book.data.map(data => {
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
                            })
                        }).then(data => {
                            const metadata = firebase.functions().httpsCallable('getMetadata')
                            const safe = []
                            const tags = []
                            const themes = []

                            data.photo.map(file => metadata({ file }).then(res => {
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
                            }).then(book => {
                                return dispatch({ type: 'BOOK_SUCCESS', book: book.data.sort(compare) })
                            }))
                        })
                    })
                }
            } else {
                const name = state.firebase.profile.displayName
                const Photo = state.firebase.profile.Photo
                const notiRef = firestore.collection('notification').doc(notid);
                notiRef.set({
                    owner: snapshot.data().writer,
                    type: 'book',
                    content: `save your diary, ${snapshot.data().title}`,
                    read: false,
                    linked: '/diary',
                    participant: {
                        User_UID: uid,
                        name: name,
                        Photo: Photo
                    },
                    date: Date()
                });
                PostRef.update({
                    "book": firestore.FieldValue.arrayUnion(uid)
                }).then(() => {
                    const BookRef = firebase.functions().httpsCallable('getAllBookPost')
                    BookRef().then(data => {
                        if (data.data.length === 0) {
                            return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                        }

                        const metadata = firebase.functions().httpsCallable('getMetadata')
                        const safe = []
                        const tags = []
                        const themes = []
                        return data.data.map(book => {
                            return book.photo.map(file => metadata({ file }).then(res => {
                                if (res.data.safe) {
                                    safe.push(res.data.safe)
                                    if (safe.includes("bad")) {
                                        book.data.safe = "bad"
                                    } else if (safe.includes("safe")) {
                                        book.safe = "safe"
                                    } else {
                                        book.safe = "maybe"
                                    }
                                } else {
                                    book.safe = "maybe"
                                }

                                if (res.data.tags) {
                                    res.data.tags.map(tag => tags.push(tag))
                                }

                                if (res.data.themes) {
                                    res.data.themes.map(theme => themes.push(theme))
                                }
                                return { safe, tags, themes }
                            }))
                        })
                    })
                })
            }
        })
    }
}