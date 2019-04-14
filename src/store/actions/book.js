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